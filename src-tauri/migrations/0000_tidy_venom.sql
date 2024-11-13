CREATE TABLE `default-bible-books` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`bookNumber` integer,
	`book` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `default-bible-books_id_unique` ON `default-bible-books` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `default-bible-books_bookNumber_unique` ON `default-bible-books` (`bookNumber`);--> statement-breakpoint
CREATE UNIQUE INDEX `default-bible-books_book_unique` ON `default-bible-books` (`book`);--> statement-breakpoint
CREATE TABLE `default-bible-verses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`bookId` integer,
	`chapter` integer,
	`verseNumber` integer,
	`verseText` text,
	FOREIGN KEY (`bookId`) REFERENCES `default-bible-books`(`bookNumber`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `default-bible-verses_id_unique` ON `default-bible-verses` (`id`);--> statement-breakpoint
CREATE TABLE `users` (
	`age` integer DEFAULT 18,
	`city` text DEFAULT 'NULL',
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`deleted_at` text DEFAULT 'NULL',
	`email` text,
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);