import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { Adress } from '../../db/schemas/adress'


const deleteAdress = async (id: string) => {
    await db.delete(Adress).where(eq(Adress.id, id))
}

export default deleteAdress