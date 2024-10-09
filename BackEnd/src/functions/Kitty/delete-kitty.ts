import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { Kitty } from '../../db/schemas/kitty'
import { Events } from '../../db/schemas/events'

export async function deleteKitty(id: string) {
  const deletedEventsKitty = await db.delete(Events).where(eq(Events.id_kitty, id))
  const [deletedKitty] = await db.delete(Kitty).where(eq(Kitty.id, id)).returning();

  return deletedKitty;
}
