import { db } from "../../db";
import { Guests } from "../../db/schemas/guests";

interface GuestRequest {
	name: string;
	age: number;
	contact: string;
	sexy: string;
}

export async function createGuest({ name, age, contact, sexy }: GuestRequest) {
	const [createdGuestData] = await db.insert(Guests).values({
		name,
		age,
		contact,
		sexy,
	});
	return createdGuestData;
}
