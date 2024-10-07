import z from 'zod'
import { app } from '../../server'
import { createGuest } from "../../../functions/Guests/create-guest";
import { updateEvent } from '../Events/update-event';
import { updateGuest } from '../../../functions/Guests/update-guests';

export const updatesGuests = async () => {
    app.put("/UpdateGuests/:id", {
        schema: {
            params: z.object({
                id: z.string(),
            }),
            body: z.object({
                name: z.string({ message: 'Guest name is required' }),
                age: z.number({ message: 'Age is required' }),
                contact: z.string({ message: 'Contact is required' }),
                sexy: z.enum(["M", "F"], {
                    invalid_type_error: "Sexo é obrigatório",
                    required_error: "Sexo é obrigatório"
                })
            }),
        },
    }, async (request, reply) => {

        const { name, age, contact, sexy } = request.body
        const { id } = request.params;
        const createdGuest = await updateGuest({id,name,age,contact,sexy});
        reply.status(201).send({
            message: "Convidado atualizado com sucesso",
            data: createdGuest,
        });
    }
    )
}