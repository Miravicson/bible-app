import chunk from 'lodash/chunk';
import { db } from '../database';
import { defaultBibleVerses } from '../schema';
import verses from './verses.json';
import { DefaultBibleVerse } from '@/lib/types';

export async function seedBibleVerses() {
  const verse = await db.query.defaultBibleVerses.findFirst();

  if (verse) return;

  const versesChunks = chunk(verses as unknown[], 100);
  console.log(`First verse chunk`, versesChunks[0]);

  await Promise.all(
    versesChunks.map((verses1) => {
      return db
        .insert(defaultBibleVerses)
        .values(verses1 as DefaultBibleVerse[])
        .returning({ id: defaultBibleVerses.verseGlobalNumber });
    }),
  );
}
