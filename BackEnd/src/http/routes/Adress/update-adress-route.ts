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