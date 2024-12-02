import { Payment, MercadoPagoConfig } from "mercadopago";
import z from "zod";
import { app } from "../../server";

const client = new MercadoPagoConfig({
	accessToken:
		"TEST-8048658731564938-112221-863ea1d711cb170d79a25b1e76aef50a-2111820299",
});
const payment = new Payment(client);

export const createPaymentPix = async () => {
	app.post(
		"/payment/pix",
		{
			schema: {
				body: z.object({
					transaction_amount: z.number({
						message: "transaction_amount is required",
					}),
					description: z.string({ message: "description is required" }),
					payment_method_id: z.string({ message: "Contact is required" }),
					email: z.string({ message: "email is required" }),
					type: z.string({ message: "type is required" }),
					number: z.string({ message: "number is required" }),
				}),
			},
		},
		async (request, reply) => {
			const {
				transaction_amount,
				description,
				payment_method_id,
				email,
				type,
				number,
			} = request.body;

			await payment
				.create({
					body: {
						transaction_amount: transaction_amount,
						description: description,
						payment_method_id: payment_method_id,
						payer: {
							email: email,
							identification: {
								type: type,
								number: number,
							},
						},
					},
					requestOptions: {
						idempotencyKey: "0d5020ed-1af6-469c-ae06-c3bec19954bb",
					},
				})
				.then((result) => {
					console.log(result.point_of_interaction);
					reply.status(201).send({
						message: "Pagamento criado com sucesso",
						qr_code_base64: result.point_of_interaction?.transaction_data?.qr_code_base64,
						qr_code: result.point_of_interaction?.transaction_data?.qr_code,
						data: result,
					});
				})
				.catch((error) => console.log(error));
		},
	);
};
