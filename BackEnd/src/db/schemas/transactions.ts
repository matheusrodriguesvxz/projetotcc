import {
	decimal,
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { payments } from "./payments";
import { createId } from "@paralleldrive/cuid2";
import { text } from "drizzle-orm/pg-core";

export const transactions = pgTable("transactions", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	paymentId: text("payment_id")
		.notNull()
		.references(() => payments.id),
	transactionId: varchar("transaction_id", { length: 255 }).notNull(),
	transactionAmount: decimal("transaction_amount", {
		precision: 10,
		scale: 2,
	}).notNull(),
	status: varchar("status", { length: 50 }).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date()),
});
