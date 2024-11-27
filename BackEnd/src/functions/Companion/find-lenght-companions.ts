import { db } from "../../db";
import { sql, eq } from "drizzle-orm";

import { Companion } from "../../db/schemas/companion";

export async function findlenghtCompanions(idGuest: string) {
	const [result] = await db
		.select({
			count: sql<number>`COUNT(*)`, 
		})
		.from(Companion)
		.where(eq(Companion.id_guest, idGuest)); 

	return result?.count || 0;
}
