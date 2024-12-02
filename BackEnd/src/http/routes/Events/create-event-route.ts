import z from "zod";
import { createEvents } from "../../../functions/Events/create-event";
import { app } from "../../server";

export const createEvent = async () => {
	app.post(
		"/event",
		{
			schema: {
				body: z.object({
					id_adress: z.string(),
					id_kitty: z.string().optional(),
					initial_date:z.string(),
					final_date: z.string(),
					name: z.string(),
					userID: z.string(),
					type: z.string(),
					description: z.string(),
					budget: z.string(),
					pix: z.string(),
					olderOfAge: z.boolean(),
				}),
			},
		},
		async (request, reply) => {
			const {
				name,
				userID,
				budget,
				description,
				final_date,
				id_adress,
				id_kitty,
				initial_date,
				olderOfAge,
				pix,
				type,
			} = request.body;
			console.log("Dados recebidos:", request.body); 
			const idEvent = await createEvents({
				id_adress,
				id_kitty,
				name,
				userID,
				description,
				final_date,
				initial_date,
				budget,
				pix,
				type,
				olderOfAge,
			});

			reply.status(201).send({
				message: "Evento criado com sucesso",
				id: idEvent,
			});
		},
	);
};
