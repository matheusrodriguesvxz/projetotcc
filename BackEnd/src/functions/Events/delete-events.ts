import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { Events } from '../../db/schemas/events'
import { buyList } from '../../db/schemas/buyList'
import { eventsAndGuests } from '../../db/schemas/eventsAndGuests'
import { Adress } from '../../db/schemas/adress'

const deleteEvent = async (id: string) => {
  await db.delete(Adress).where(eq(Adress.id, id))
  await db.delete(eventsAndGuests).where(eq(eventsAndGuests.id_events, id))
  await db.delete(buyList).where(eq(buyList.id_events, id))
  await db.delete(Events).where(eq(Events.id, id))
}

export default deleteEvent
