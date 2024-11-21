import { bibleBooks } from '@/db/seed/bible-books';
import { defaultBibleBooks, defaultBibleVerses } from '@/db/schema';

export interface verseType {
  verse: string;
  message: string;
}

export type BibleBooks = Lowercase<(typeof bibleBooks)[number]>;

export type DefaultBibleBook = typeof defaultBibleBooks.$inferSelect;

export type DefaultBibleVerse = typeof defaultBibleVerses.$inferSelect;
