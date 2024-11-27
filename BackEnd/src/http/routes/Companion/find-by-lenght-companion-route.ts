import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { findlenghtCompanions } from "../../../functions/Companion/find-lenght-companions";

export const getGuestsByLengtCompanion: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/companion/lenght/:id",
		{
			schema: {
				params: z.object({
					id: z.string(),
				}),
			},
		},
		async (request, reply) => {
			const { id } = request.params;
			const guest = await findlenghtCompanions(id);
			reply.send(guest);
		},
	);
};
