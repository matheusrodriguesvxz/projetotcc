import { eq } from "drizzle-orm"
import { db } from "../../db"
import { Guests } from "../../db/schemas/guests"
import { EnumValues } from "zod";
import { Companion } from "../../db/schemas/companion";



interface CompanionGuestsRequest {
    id: string,
    name: string,
    age: number,
    contact: string,
    sexy: "M" | "F";
}



export async function updateCompanion({ id, name, age, contact, sexy }: CompanionGuestsRequest) {
    const resultUpdate = await db.update(Companion).set({
        name,
        age,
        contact,
        sexy,
    }).where(eq(Companion.id, id)).returning();


    const [updateGuest] = resultUpdate;
    return updateGuest;
}