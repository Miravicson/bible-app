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
	`verseId` text,
	`verseGlobalNumber` integer,
	FOREIGN KEY (`bookId`) REFERENCES `default-bible-books`(`bookNumber`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `default-bible-verses_id_unique` ON `default-bible-verses` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `default-bible-verses_verseId_unique` ON `default-bible-verses` (`verseId`);--> statement-breakpoint
CREATE UNIQUE INDEX `default-bible-verses_verseGlobalNumber_unique` ON `default-bible-verses` (`verseGlobalNumber`);