import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getAllEvents } from '../../../functions/Events/get-all-events'

export const getAllEventss: FastifyPluginAsyncZod = async app => {
  app.get('/getAllEvents', async (_request, reply) => {
    const getAllEvent = await getAllEvents()
    JSON.stringify(getAllEvent)
    reply.send(getAllEvent);
  })
}
