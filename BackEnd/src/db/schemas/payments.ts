import { decimal, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { timestamp } from "drizzle-orm/pg-core";

export const payments = pgTable("payments", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	userId: text("user_id").notNull(),
	amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
	currency: varchar("currency", { length: 3 }).notNull(),
	status: varchar("status", { length: 50 }).notNull(),
	paymentMethod: varchar("payment_method", { length: 100 }).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date()),
});