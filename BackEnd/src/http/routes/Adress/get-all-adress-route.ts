<<<<<<< HEAD
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getAllAdress } from "../../../functions/Adress/get-all-adress";

export const getAdresss: FastifyPluginAsyncZod = async app => {
    app.get('/adress', async (req,reply) => {

            const adress = await getAllAdress();
            reply.status(200).send(adress);
    })



}
=======
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { app } from "../../server";
import { getAllAdress } from "../../../functions/Adress/get-all-adress";

export const getAdress: FastifyPluginAsyncZod = async (app) => {
	app.get("/adress", async (_req, reply) => {
		const getAllAdresss = await getAllAdress();
		reply.status(200).send(getAllAdresss);
	});
};
>>>>>>> dc06e18e60f99ca0b38636969b89dcdf26ec82ae
