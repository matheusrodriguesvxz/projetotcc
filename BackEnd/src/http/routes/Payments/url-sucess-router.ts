import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { sendNotification } from "./create-preferences-router";



export const getSucessPayment: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/payment/success",
		{
			schema: {
				querystring: z.object({
					payment_id: z.string({ message: "payment_id é obrigatório" }),
					status: z.string({ message: "status é obrigatório" }),
					merchant_order_id: z.string({
						message: "merchant_order_id é obrigatório",
					}),
				}),
			},
		},
		async (request, reply) => {
			const { payment_id, status, merchant_order_id, userID } = request.query;

      if (status === "approved") {
        const message = `Pagamento de ${merchant_order_id} foi aprovado com sucesso!`;
        await sendNotification(userID, message);
      }

			reply.header("Warning", "ngrok-skip-browser-warning");

			console.log("Pagamento bem-sucedido:", {
				payment_id,
				status,
				merchant_order_id,
			});

				return reply.send("Pagamento realizado com sucesso!");
			} )}