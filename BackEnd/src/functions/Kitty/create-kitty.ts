import { db } from "../../db";
import { Kitty } from "../../db/schemas/kitty";

interface KittyRequest {
  goal: string,
  descriptions: string,
}



export async function createKitty({goal, descriptions}: KittyRequest) {
  const [createdKitty] = await db.insert(Kitty).values({
    goal,
    descriptions,
  }).returning();

  return createdKitty.id;
}