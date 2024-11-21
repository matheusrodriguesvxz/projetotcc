import z from 'zod'
import { app } from '../../server'
import { updateGuest } from '../../../functions/Guests/update-guests'
import { updateCompanion } from '../../../functions/Companion/update-Companion'

export const updatesCompanion = async () => {
  app.put(
    '/companion/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          name: z.string({ message: 'Guest name is required' }),
          age: z.number({ message: 'Age is required' }),
          contact: z.string({ message: 'Contact is required' }),
          sexy: z.enum(['M', 'F'], {
            invalid_type_error: 'Sexy is required',
            required_error: 'Sexy is required',
          }),
        }),
      },
    },
    async (request, reply) => {
      const { name, age, contact, sexy } = request.body
      const { id } = request.params
      const createdGuest = await updateCompanion({ id, name, age, contact, sexy })
      reply.status(201).send({
        message: 'Convidado atualizado com sucesso',
        data: createdGuest,
      })
    }
  )
}
