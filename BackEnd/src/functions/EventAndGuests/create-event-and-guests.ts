import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { Adress } from "../../db/schemas/adress";
import { Events } from "../../db/schemas/events";
import { eventsAndGuests } from "../../db/schemas/eventsAndGuests";
import { Guests } from "../../db/schemas/guests";

export interface EventAndGuestsRequest {
 id_guests: string
 id_events: string
 userID : string
}

export const CreateEventAndGuests = async ({id_guests, id_events, userID }: EventAndGuestsRequest) => {
	const [dataEventAndGuests] = await db
		.insert(eventsAndGuests)
		.values({
			id_guests,
			userID,
			id_events,
		})
		.returning();		
	return dataEventAndGuests.id;
};
