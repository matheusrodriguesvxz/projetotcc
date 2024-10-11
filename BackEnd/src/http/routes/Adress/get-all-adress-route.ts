import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getAllAdress } from "../../../functions/Adress/get-all-adress";

export const getAdresss: FastifyPluginAsyncZod = async app => {
    app.get('/adress', async (req,reply) => {

            const adress = await getAllAdress();
            reply.status(200).send(adress);
    })



}