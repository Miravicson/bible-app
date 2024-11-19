import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  age: integer('age').default(18),
  city: text('city').default('NULL'),
  created_at: text('created_at').default('CURRENT_TIMESTAMP'),
  deleted_at: text('deleted_at').default('NULL'),
  email: text('email').unique(),
  id: integer('id').primaryKey().unique(),
  name: text('name'),
  updated_at: text('updated_at').default('CURRENT_TIMESTAMP'),
});

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
