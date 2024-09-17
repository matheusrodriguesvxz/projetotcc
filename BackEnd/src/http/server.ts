import fastify from 'fastify'
import { getAllEventss } from './routes/Events/get-all-events'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createEvent } from './routes/Events/create-event'
import { updateEvent } from './routes/Events/update-event'
import { DeleteEvent } from './routes/Events/delete-events'

export const app = fastify().withTypeProvider<ZodTypeProvider>()
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server run')
  })

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(getAllEventss)
app.register(createEvent)
app.register(updateEvent)
app.register(DeleteEvent)
