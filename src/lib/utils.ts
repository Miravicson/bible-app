import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BibleBooks, ShortformMap } from './types';
import { bibleBooks } from '@/db/seed/bible-books';
import { closest } from 'fastest-levenshtein';
import { bibleBooksShortForms } from '@/db/seed/bible-books-shortform-map';

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

export function createShortformMap() {
  const shortformMap: ShortformMap = bibleBooksShortForms.reduce(
    (acc, curr) => {
      const { name, abbreviations } = curr;
      abbreviations.forEach((abbr) => {
        acc[abbr] = name;
      });
      acc[name] = name;
      return acc;
    },
    {} as ShortformMap,
  );

  return shortformMap;
}

export function predictBibleBook(inputString: string): BibleBooks | undefined {
  const needle = inputString.toLocaleLowerCase();
  const bibleShortFormMap = createShortformMap();
  const haystack = Object.keys(bibleShortFormMap);
  const predictedKey = closest(needle, haystack);
  return predictedKey == null ? undefined : bibleShortFormMap[predictedKey];
}
