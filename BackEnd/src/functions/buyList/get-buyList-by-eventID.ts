import { eq, sql } from "drizzle-orm";
import { db } from "../../db";
import { buyList } from "../../db/schemas/buyList";

export const getBuyListUserId = async (eventID: string) => {
	const buyLists = await db
		.select({
			id: buyList.id,
			name: buyList.name,
			status: buyList.status,
			id_events: buyList.id_events,
			quantity: buyList.quantity,
			totalPrice: buyList.totalPrice,
		})
		.from(buyList).where(eq(buyList.id_events, eventID));

		
	return buyLists;
};
