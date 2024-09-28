import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { Events } from '../../db/schemas/events'
import { buyList } from '../../db/schemas/buyList'
import { eventsAndGuests } from '../../db/schemas/eventsAndGuests'

const deleteEvent = async (id: string) => {
  await db.delete(eventsAndGuests).where(eq(eventsAndGuests.id_events, id))
  await db.delete(buyList).where(eq(buyList.id_events, id))
  await db.delete(Events).where(eq(Events.id, id))
}

export default deleteEvent
