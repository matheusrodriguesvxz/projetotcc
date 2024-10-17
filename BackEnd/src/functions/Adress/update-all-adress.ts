<<<<<<< HEAD
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
=======
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { Adress } from "../../db/schemas/adress";
import type { AdressRequest } from "./create-adress";

export const updateAdress = async (
	adressRequest: AdressRequest,
	id: string,
) => {
	const [updatedAdress] = await db
		.update(Adress)
		.set({
			cep: adressRequest.cep,
			street: adressRequest.street,
			number: adressRequest.number,
			city: adressRequest.city,
			state: adressRequest.state,
			complement: adressRequest.complement,
			neighborhood: adressRequest.neighborhood,
			country: adressRequest.country,
		})
		.where(eq(Adress.id, id))
		.returning();

    return updatedAdress;
};
>>>>>>> dc06e18e60f99ca0b38636969b89dcdf26ec82ae
