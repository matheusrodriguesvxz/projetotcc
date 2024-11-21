import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { findByIdGuest } from "../../../functions/Guests/find-by-id-guests";
import { findByIdGuestCompanion } from "../../../functions/Companion/find-by-id-Companion";

export const getGuestsByIDCompanion: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/companion/:id",
		{
			schema: {
				params: z.object({
					id: z.string(),
				}),
			},
		},
		async (request, reply) => {
			const { id } = request.params;
			const guest = await findByIdGuestCompanion(id);
			reply.send(guest);
		},
	);
};
