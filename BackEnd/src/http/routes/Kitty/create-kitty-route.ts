import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createKitty } from '../../../functions/Kitty/create-kitty'

export const createKittys: FastifyPluginAsyncZod = async app => {
  app.post(
    '/createKitty',
    {
      schema: {
        body: z.object({
          goal: z.string({ message: 'goal is required' }),
          descriptions: z.string({ message: 'descriptions is required' }),
        }),
      },
    },
    async (request, reply) => {
      const { goal, descriptions } = request.body
      const createdKitty = await createKitty({ goal, descriptions })
      reply.status(201).send({
        message: 'Kitty criado com sucesso',
        id: createdKitty,
      })
    }
  )
}
