import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getAllGuests } from "../../../functions/Guests/get-all-guests";
import z from "zod";

export const getPendingPayment: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/payment/pending",
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
			const { payment_id, status, merchant_order_id } = request.query;
      reply.header("Warning", "ngrok-skip-browser-warning");

			console.log("Pagamento pendente:", {
				payment_id,
				status,
				merchant_order_id,
			});

			return reply.send("Seu pagamento está pendente. Aguarde a confirmação.");
		},
	);
};
