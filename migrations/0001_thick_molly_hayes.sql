CREATE TABLE "email_templates" (
	"tid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"design" jsonb NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "email_templates_tid_unique" UNIQUE("tid"),
	CONSTRAINT "email_templates_email_unique" UNIQUE("email")
);
