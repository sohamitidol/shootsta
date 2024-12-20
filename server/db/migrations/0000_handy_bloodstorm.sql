CREATE TABLE `ambulances` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`contact` text(20),
	`description` text(512),
	`location` text,
	`image_file_key` text DEFAULT 'default.jpg',
	`is_deleted` integer DEFAULT false,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`deletedAt` text
);
--> statement-breakpoint
CREATE TABLE `doctors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`age` integer NOT NULL,
	`specialty` text(512),
	`contact` text(20),
	`description` text(512),
	`location` text,
	`image_file_key` text DEFAULT 'default.jpg',
	`is_deleted` integer DEFAULT false,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`deletedAt` text
);
