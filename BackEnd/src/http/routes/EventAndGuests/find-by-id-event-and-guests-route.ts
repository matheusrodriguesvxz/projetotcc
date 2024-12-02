import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { findbyIDEventAndGuests } from "../../../functions/EventAndGuests/find-by-id-event-and-guests";

export const getByIdEventsAndGuests: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/eventsAndGuests/:idEvent",
		{
			schema: {
				params: z.object({
					idEvent: z.string(),
				}),
			},
		},
		async (req, reply) => {
			const { idEvent } = req.params;
			const guestsAndEvents = await findbyIDEventAndGuests(idEvent);
			reply.send(guestsAndEvents);
		},
	);
};
