import { pgTable, text } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const Kitty = pgTable('Vaquinha', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  goal: text('meta').notNull(),
  descriptions: text('descricao').notNull(),
})
