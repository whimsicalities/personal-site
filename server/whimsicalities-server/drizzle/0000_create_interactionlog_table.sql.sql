CREATE TABLE "interactionlog" (
	"log_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message" text,
	"time" timestamp
);
