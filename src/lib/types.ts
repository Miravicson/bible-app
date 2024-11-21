import { bibleBooks } from '@/db/seed/bible-books';
import { defaultBibleBooks, defaultBibleVerses } from '@/db/schema';
import { DirEntry } from '@tauri-apps/plugin-fs';

export interface verseType {
  verse: string;
  message: string;
}

export type BibleBooks = Lowercase<(typeof bibleBooks)[number]>;

export type DefaultBibleBook = typeof defaultBibleBooks.$inferSelect;

export type DefaultBibleVerse = typeof defaultBibleVerses.$inferSelect;

export type BibleBookOptions = {
  book: BibleBooks;
  chapter: number;
  startVerse: number;
  endVerse?: number;
};

export type ExecuteMigrationsOptions = {
  migrations: DirEntry[];
  migrationResourcePath: string;
};
