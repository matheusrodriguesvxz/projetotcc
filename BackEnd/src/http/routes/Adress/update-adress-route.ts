<<<<<<< HEAD
import z from "zod"
import { app } from "../../server"
import { updateAdress } from "../../../functions/Adress/update-all-adress";


export const UpdateAdress = async () => {

    app.put('/adress/:id', {
        schema: {
            params:
                z.object({
                    id: z.string(),


                }),

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
        },

    },

        async (req, reply) => {

            const { id } = req.params;
            const { cep, city, complement, country, neighborhood, number, state, street } = req.body

            const updatedAdress = await updateAdress({ cep, street, number, city, state, complement, neighborhood, country, id });

            reply.status(201).send({
                message: "Endereco Atualizado com Sucesso",
                data: updatedAdress
            })
        }
    )


}
=======
import z from "zod";
import { app } from "../../server";
import { updateAdress } from "../../../functions/Adress/update-all-adress";

export const updatesAdress = async () => {
	app.put(
		"/adress/:id",
		{
			schema: {
				params: z.object({
					id: z.string({ message: "id is required" }),
				}),
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
		async (request, reply) => {
			const { id } = request.params;
			const {
				cep,
				street,
				number,
				city,
				state,
				complement,
				neighborhood,
				country,
			} = request.body;
			const updatedAdress = await updateAdress(
				{ cep, street, number, city, state, complement, neighborhood, country },
				id,
			);

      reply.status(204).send({
        message: "Endereco atualizado com sucesso",
        data: updatedAdress,
      });
		},
	);
};
>>>>>>> dc06e18e60f99ca0b38636969b89dcdf26ec82ae
