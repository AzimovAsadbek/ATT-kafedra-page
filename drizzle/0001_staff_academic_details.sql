ALTER TABLE `staff` ADD `employment_type` text DEFAULT 'Asosiy' NOT NULL;--> statement-breakpoint
ALTER TABLE `staff` ADD `rate` real DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `staff` ADD `birth_year` integer;--> statement-breakpoint
ALTER TABLE `staff` ADD `degree_specialty` text;--> statement-breakpoint
ALTER TABLE `staff` ADD `degree_year` integer;--> statement-breakpoint
ALTER TABLE `staff` ADD `academic_title` text;--> statement-breakpoint
ALTER TABLE `staff` ADD `title_specialty` text;--> statement-breakpoint
ALTER TABLE `staff` ADD `title_year` integer;