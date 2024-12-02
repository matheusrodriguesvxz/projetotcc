import z from "zod";
import { app } from "../../server";
import { createGuest } from "../../../functions/Guests/create-guest";
import { CreateEventAndGuests } from "../../../functions/EventAndGuests/create-event-and-guests";

export const createsGuestAndEvent = async () => {
	app.post(
		"/eventAndGuests",
		{
			schema: {
				body: z.object({
					id_events: z.string({ message: "Guest name is required" }),
					id_guests: z.string({ message: "Age is required" }),
					userID: z.string({ message: "User ID is required" }),
				}),
			},
		},
		async (request, reply) => {
			const { userID, id_events, id_guests } = request.body;
			const createdGuest = await CreateEventAndGuests({
				userID,
				id_events,
				id_guests,
			});
			reply.status(201).send({
				message: "Convidado criado com sucesso",
				id: createdGuest,
			});
		},
	);
};
