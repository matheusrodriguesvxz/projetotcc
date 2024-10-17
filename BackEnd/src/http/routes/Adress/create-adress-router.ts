import z from "zod";
<<<<<<< HEAD
import schema from "../../../db/schemas/schema";
import { app } from "../../server";
import { createAdress } from "../../../functions/Adress/create-adress";


export const CreateAdresss = async () => {

    app.post('/adress', {

        schema: {
            body: z.object({
                cep: z.string(),
                street: z.string(),
                number: z.number(),
                city: z.string(),
                state: z.string(),
                complement: z.string(),
                neighborhood: z.string(),
                country: z.string(),
            })
        }
    }, async (request, reply) => {

        const { cep, city, complement, country, neighborhood, number, state, street } = request.body
        const createdAdress = await createAdress({ cep, street, number, city, state, complement, neighborhood, country })

        reply.status(201).send({
            message: "Endereco Cadastrado com Sucesos",
            data: createdAdress
        })

    })
}
=======
import { createAdress } from "../../../functions/Adress/create-adress";
import { app } from "../../server";

export const createdAdress = async () => {
	app.post(
		"/adress",
		{
			schema: {
				body: z.object({
					cep: z.string({ message: "cep is required" }),
					street: z.string({ message: "street is required" }),
					number: z.number({ message: "number is required" }),
					city: z.string({ message: "city is required" }),
					state: z.string({ message: "state is required" }),
					complement: z.string({ message: "complement is required" }),
					neighborhood: z.string({ message: "neighborhood is required" }),
					country: z.string({ message: "country is required" }),
				}),
			},
		},
		async (req, reply) => {
			const {
				cep,
				street,
				number,
				city,
				state,
				complement,
				neighborhood,
				country,
			} = req.body;
			const createdAdress = await createAdress({
				cep,
				street,
				number,
				city,
				state,
				complement,
				neighborhood,
				country,
			});
			reply
				.status(201)
				.send({ message: "Adress created successfully", id: createdAdress });
		},
	);
};
>>>>>>> dc06e18e60f99ca0b38636969b89dcdf26ec82ae
