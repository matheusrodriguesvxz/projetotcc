import { eq } from "drizzle-orm"
import { db } from "../../db"
import { Adress } from "../../db/schemas/adress"



interface UpdateAdressRequest {
    id: string
    cep: string
    street: string
    number: number
    city: string
    state: string
    complement: string
    neighborhood: string
    country: string
}

export const updateAdress = async ({ cep, street, number, city, state, complement, neighborhood, country, id }: UpdateAdressRequest) => {

    const updated = await db.update(Adress).set({
        cep,
        street,
        number,
        city,
        state,
        complement,
        neighborhood,
        country
    }).where(eq(Adress.id, id)).returning();


    return updated;
}