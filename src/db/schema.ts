import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const defaultBibleBooks = sqliteTable('default-bible-books', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique(),
  bookNumber: integer('bookNumber').unique(),
  book: text('book').unique(),
});

export const defaultBibleBooksRelations = relations(
  defaultBibleBooks,
  ({ many }) => ({
    bibleVerses: many(defaultBibleVerses),
  }),
);

export const defaultBibleVerses = sqliteTable('default-bible-verses', {
  id: integer('id').primaryKey({ autoIncrement: true }).unique(),
  bookId: integer('bookId').references(() => defaultBibleBooks.bookNumber),
  chapter: integer('chapter'),
  verseNumber: integer('verseNumber'),
  verseText: text('verseText'),
  verseId: text('verseId').unique(),
  verseGlobalNumber: integer('verseGlobalNumber').unique(),
});

export const defaultBibleRelations = relations(
  defaultBibleVerses,
  ({ one }) => ({
    book: one(defaultBibleBooks, {
      fields: [defaultBibleVerses.bookId],
      references: [defaultBibleBooks.id],
    }),
  }),
);
