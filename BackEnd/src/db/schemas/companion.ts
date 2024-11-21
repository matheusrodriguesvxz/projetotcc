import { pgTable, text, integer, char } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { name } from 'drizzle-orm'
import { Guests } from './guests'

export const Companion = pgTable('Acompanhantes', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('nome').notNull(),
  age: integer('idade').notNull(),
  contact: text('contato').notNull(),
  sexy: char('sexo', 
  { length: 1 }).notNull(),
  id_guest: text('id_hospede').notNull().references(() => Guests.id, { onDelete: 'cascade' }).notNull()
})