import { db } from '../../db'
import { Adress } from '../../db/schemas/adress'

interface CreateAdressRequest {
  cep: string
  street: string
  number: number
  city: string
  state: string
  complement: string
  neighborhood: string
  country: string
}
export async function createAdress({
  cep,
  street, 
  number, 
  city,
  state,
  complement,
  neighborhood,
  country,
}: CreateAdressRequest){
  const resultAdress = await db
    .insert(Adress)
    .values({
      cep,
      street, 
      number, 
      city,
      state,
      complement,
      neighborhood,
      country,
    })
    .returning()

  const adress = resultAdress[0]
  return {
    adress,
  }
}