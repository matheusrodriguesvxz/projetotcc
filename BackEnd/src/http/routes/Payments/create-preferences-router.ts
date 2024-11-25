import { MercadoPagoConfig, Preference } from "mercadopago";
import z from "zod";
import { app } from "../../server";
import admin from "firebase-admin";

const client = new MercadoPagoConfig({
	accessToken:
		"TEST-8048658731564938-112221-863ea1d711cb170d79a25b1e76aef50a-2111820299",
});
const preference = new Preference(client);

export const sendNotification = async (userID: string, message: string) => {
	try {
		const userRef = admin.firestore().collection("users").doc(userID);
		const doc = await userRef.get();

		if (doc.exists) {
			const user = doc.data();
			const userToken = user?.notificationToken;

			if (userToken) {
				const payload = {
					notification: {
						title: "Pagamento Aprovado",
						body: message,
					},
				};

				await admin.messaging().send({ token: userToken, ...payload });
			}
		}
	} catch (error) {
		console.error("Erro ao enviar notificação:", error);
	}
};

// Função para criar uma Preference
export const createPaymentPreference = async () => {
	app.post(
		"/payment/preference",
		{
			schema: {
				body: z.object({
					title: z.string({ message: "title é obrigatório" }),
					quantity: z.number({ message: "quantity é obrigatória" }),
					unit_price: z.number({ message: "unit_price é obrigatório" }),
					currency_id: z.string({ message: "currency_id é obrigatório" }),
					first_name: z.string({ message: "first_name é obrigatório" }),
					last_name: z.string({ message: "last_name é obrigatório" }),
				}),
			},
		},
		async (request, reply) => {
			const {
				title,
				quantity,
				unit_price,
				currency_id,
				first_name,
				last_name,
			} = request.body;

			try {
				const result = await preference.create({
					body: {
						items: [
							{
								id: "1234",
								title: title,
								quantity: quantity,
								unit_price: unit_price,
								currency_id: currency_id,
							},
						],
						payer: {
							name: first_name,
							surname: last_name,
						},
						back_urls: {
							success:
								"https://8999-2804-14d-78a6-830d-a14c-f807-4d78-b7bf.ngrok-free.app/payment/success",
							failure:
								"https://8999-2804-14d-78a6-830d-a14c-f807-4d78-b7bf.ngrok-free.app/payment/failure",
							pending:
								"https://8999-2804-14d-78a6-830d-a14c-f807-4d78-b7bf.ngrok-free.app/payment/pending",
						},
						auto_return: "approved",
					},
				});

				reply.status(201).send({
					message: "Preference criada com sucesso",
					data: result,
					url: result.sandbox_init_point,
				});
				console.log(
					"Preference criada com sucesso:",
					result.sandbox_init_point,
				);
			} catch (error) {
				console.error("Erro ao criar a preference:", error);
				reply.status(500).send({
					message: "Erro ao criar a preference",
					error: error,
				});
			}
		},
	);
};
