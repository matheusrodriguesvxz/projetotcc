import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { findEventById } from "../../../functions/Events/find-by-id-events";
import { getBuyListUserId } from "../../../functions/buyList/get-buyList-by-eventID";

export const getBuyListByUserID: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/buyList/:idEvent",
		{
			schema: {
				params: z.object({
					idEvent: z.string(),
				}),
			},
		},
		async (req, reply) => {
			const { idEvent } = req.params;
			const buyList = await getBuyListUserId(idEvent);
			reply.send(buyList);
		},
	);
};
