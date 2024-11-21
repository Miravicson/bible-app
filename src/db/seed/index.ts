import { seedBibleBooks } from './bible-books';
import { seedBibleVerses } from './bible-verses';

export async function runSeed() {
  await seedBibleBooks();
  await seedBibleVerses();
}
