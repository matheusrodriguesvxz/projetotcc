ALTER TABLE "transactions" DROP CONSTRAINT "transactions_payment_id_payments_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "payment_id" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
