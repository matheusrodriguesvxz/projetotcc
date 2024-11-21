import { client, db } from "../../db/index";
import { Companion } from "../../db/schemas/companion";
import { Guests } from "../../db/schemas/guests";

export const getAllCompanion = async () => {
	const getAllGuestData = await db
		.select({
			id: Companion.id,
			name: Companion.name,
			age: Companion.age,
			contact: Companion.contact,
			sexy: Companion.sexy,
		})
		.from(Companion);

	return getAllGuestData;
};






