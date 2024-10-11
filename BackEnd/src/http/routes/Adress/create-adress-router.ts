import z from "zod";
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