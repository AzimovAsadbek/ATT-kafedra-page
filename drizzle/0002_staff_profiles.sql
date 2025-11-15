CREATE TABLE `program_coordinators` (
	`program_id` integer NOT NULL,
	`staff_id` integer NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`program_id`, `staff_id`),
	FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`staff_id`) REFERENCES `staff`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `program_coordinators_staff_idx` ON `program_coordinators` (`staff_id`);--> statement-breakpoint
ALTER TABLE `staff` ADD `slug` text DEFAULT '' NOT NULL;--> statement-breakpoint
UPDATE `staff` SET `slug` = 'xodim-' || `id`;--> statement-breakpoint
ALTER TABLE `staff` ADD `department_role` text;--> statement-breakpoint
ALTER TABLE `staff` ADD `specialization` text;--> statement-breakpoint
ALTER TABLE `staff` ADD `research_area` text;--> statement-breakpoint
ALTER TABLE `staff` ADD `achievements` text;--> statement-breakpoint
ALTER TABLE `staff` ADD `work_experience` text;--> statement-breakpoint
CREATE UNIQUE INDEX `staff_slug_unique` ON `staff` (`slug`);