import { pgTable, text } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { Events } from './events'

export const buyList = pgTable('Lista_de_Compras', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('nome').notNull(),
  status: text('status').notNull(),
  id_events: text('id_eventos')
    .references(() => Events.id)
    .notNull(),
})
