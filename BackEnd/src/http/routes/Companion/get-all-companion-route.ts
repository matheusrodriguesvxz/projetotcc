import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getAllEvents } from '../../../functions/Events/get-all-events'
import { getAllGuests } from '../../../functions/Guests/get-all-guests'
import { getAllCompanion } from '../../../functions/Companion/get-all-Companion'

export const getCompanion: FastifyPluginAsyncZod = async app => {
  app.get('/companions', async (_request, response) => {
    const dataGuests = await getAllCompanion()
    response.send(dataGuests)
  })
}
