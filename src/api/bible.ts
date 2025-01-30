import { db } from '@/db/database';
import { BibleBookOptions } from '@/lib/types';
import { getVerseGlobalNumber } from '@/lib/utils';

export async function getBibleBooks() {
  const books = await db.query.defaultBibleBooks.findMany().execute();
  return books;
}

export async function getBibleVerses({
  book,
  chapter,
  startVerse,
  endVerse,
}: BibleBookOptions) {
  const verseStartGlobalNumber = getVerseGlobalNumber({
    book,
    chapter,
    verse: startVerse,
  });

  const verseEndGlobalNumber = endVerse
    ? getVerseGlobalNumber({
        book,
        chapter,
        verse: endVerse,
      })
    : verseStartGlobalNumber;
  const verses = await db.query.defaultBibleVerses
    .findMany({
      where: (verse, { between }) =>
        between(
          verse.verseGlobalNumber,
          verseStartGlobalNumber,
          verseEndGlobalNumber,
        ),
    })
    .execute();

  return verses;
}
