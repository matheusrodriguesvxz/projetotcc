CREATE TABLE IF NOT EXISTS "Acompanhantes" (
	"id" text PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"idade" integer NOT NULL,
	"contato" text NOT NULL,
	"sexo" char(1) NOT NULL,
	"id_hospede" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Acompanhantes" ADD CONSTRAINT "Acompanhantes_id_hospede_Convidados_id_fk" FOREIGN KEY ("id_hospede") REFERENCES "public"."Convidados"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
