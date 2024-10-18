import { db } from '../../db'
import { Adress } from '../../db/schemas/adress'

export interface AdressRequest {
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
<<<<<<< HEAD
}: CreateAdressRequest){
=======
}: AdressRequest){
>>>>>>> dc06e18e60f99ca0b38636969b89dcdf26ec82ae
  const [resultAdress] = await db
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

<<<<<<< HEAD
  const adress = resultAdress
  return adress.id
=======
  return resultAdress.id
>>>>>>> dc06e18e60f99ca0b38636969b89dcdf26ec82ae
}