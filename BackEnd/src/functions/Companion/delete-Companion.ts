import { eq } from "drizzle-orm"
import { db } from "../../db"
import { Guests } from "../../db/schemas/guests"
import { eventsAndGuests } from "../../db/schemas/eventsAndGuests"
import { Companion } from "../../db/schemas/companion"



export const deleteCompanion = async (id: string) => {
    await db.delete(Companion).where(eq(Companion.id, id));
}


