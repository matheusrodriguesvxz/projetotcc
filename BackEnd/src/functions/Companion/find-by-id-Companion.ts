import { eq } from "drizzle-orm";
import { db } from "../../db";
import { Guests } from "../../db/schemas/guests";
import { Companion } from "../../db/schemas/companion";

export const findByIdGuestCompanion = async (id: string) => {
	const guests = await db
		.select({
			id: Companion.id,
			name: Companion.name,
			age: Companion.age,
			contact: Companion.contact,
			sexy: Companion.sexy,
		})
		.from(Companion)
		.where(eq(Companion.id_guest, id));

	return guests;
};
