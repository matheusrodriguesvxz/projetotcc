import { db } from "../../db";
import { Companion } from "../../db/schemas/companion";
import { Guests } from "../../db/schemas/guests";

interface GuestRequest {
	name: string;
	age: number;
	contact: string;
	sexy: string;
	id_guest: string;
}

export async function createCompanion({ name, age, contact, sexy, id_guest }: GuestRequest) {
	const [createdGuest] = await db
		.insert(Companion)
		.values({
			name,
			age,
			id_guest,
			contact,
			sexy,
		})
		.returning();
	return createdGuest.id;
}
