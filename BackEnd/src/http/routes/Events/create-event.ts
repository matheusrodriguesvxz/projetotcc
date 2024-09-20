import z from 'zod'
import { createEvents } from '../../../functions/Events/create-event'
import { app } from '../../server'

export const createEvent = async () => {
  app.post(
    '/createEvent',
    {
      schema: {
        body: z.object({
          id_adress: z.string(),
          id_kitty: z.string().optional(),
          initial_date: z.preprocess(arg => {
            if (typeof arg === 'string') {
              const date = new Date(arg)
              if (!Number.isNaN(date.getTime())) {
                return date
              }
            }
            return arg
          }, z.date()),
          final_date: z.preprocess(arg => {
            if (typeof arg === 'string') {
              const date = new Date(arg)
              if (!Number.isNaN(date.getTime())) {
                return date
              }
            }
            return arg
          }, z.date()),
          name: z.string(),
          type: z.string(),
          description: z.string(),
          budget: z.string(),
          pix: z.string(),
          olderOfAge: z.boolean(),
        }),
      },
    },
    async (request, reply) => {
      const {
        name,
        budget,
        description,
        final_date,
        id_adress,
        id_kitty,
        initial_date,
        olderOfAge,
        pix,
        type,
      } = request.body

      const idEvent = await createEvents({
        id_adress,
        id_kitty,
        name,
        description,
        final_date,
        initial_date,
        budget,
        pix,
        type,
        olderOfAge,
      })

      reply.send(`Evento criado com Sucesso\nID:${idEvent.event}`)
    }
  )
}
