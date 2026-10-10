ALTER TABLE "messages" ADD COLUMN "submission_id" text;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_submission_id_unique" UNIQUE("submission_id");