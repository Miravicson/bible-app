import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BibleBooks } from './types';
import { bibleBooks } from '@/db/seed/bible-books';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getVerseGlobalNumber(options: {
  book: BibleBooks;
  chapter: number;
  verse: number;
}) {
  const { book, chapter, verse } = options;
  const bibleBookNumber = bibleBooks
    .map((book) => book.toLowerCase())
    .indexOf(book);
  const bookStr = `${bibleBookNumber}`.padStart(2, '0');
  const chapterStr = `${chapter - 1}`.padStart(3, '0');
  const verseStr = `${verse - 1}`.padStart(3, '0');

  return Number.parseInt(`${bookStr}${chapterStr}${verseStr}`, 10);
}
