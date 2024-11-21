import z from "zod";
import { app } from "../../server";
import { createGuest } from "../../../functions/Guests/create-guest";
import { createCompanion } from "../../../functions/Companion/create-companion";

export const createsCompanion = async () => {
	app.post(
		"/companion",
		{
			schema: {
				body: z.object({
					name: z.string({ message: "Guest name is required" }),
					age: z.number({ message: "Age is required" }),
					id_guest: z.string({ message: "User ID is required" }),
					contact: z.string({ message: "Contact is required" }),
					sexy: z.enum(["M", "F"], {
						invalid_type_error: "Sexo é obrigatório",
						required_error: "Sexo é obrigatório",
					}),
				}),
			},
		},
		async (request, reply) => {
			const { name, age, contact, sexy, id_guest } = request.body;
			const createdGuest = await createCompanion({
				name,
				age,
				contact,
				sexy,
				id_guest,
			});
			reply.status(201).send({
				message: "Convidado criado com sucesso",
				id: createdGuest,
			});
		},
	);
};
