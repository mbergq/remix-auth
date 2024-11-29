ALTER TABLE "token" DROP CONSTRAINT "token_id_app_user_id_fk";
--> statement-breakpoint
ALTER TABLE "token" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "token" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "token" ADD COLUMN "user_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_user_id_app_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
