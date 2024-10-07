import { db } from '../../db'
import { Guests } from '../../db/schemas/guests'

interface GuestRequest {
  name: string
  age: number
  contact: string
  sexy: string
}

export async function createGuest({ name, age, contact, sexy }: GuestRequest) {
  const [createdGuest] = await db.insert(Guests).values({
    name,
    age,
    contact,
    sexy,
  }).returning()
  return createdGuest.id
}
