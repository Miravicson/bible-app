import { getBibleVerses } from '@/api/bible';
import { predictBibleBook } from '@/lib/utils';
import { appDataDir } from '@tauri-apps/api/path';
import { useEffect } from 'react';

/**
 *
 * This component exists solely for testing and debugging.
 * If you want to test and log your functions without cluttering any component, this is the place to do it
 * @returns an empty span that is hidden with css
 */
export function Debug({ show }: { show?: boolean }) {
  useEffect(() => {
    if (show) {
      appDataDir().then((out) => console.log(`Data dir: ${out}`));
      getBibleVerses({
        book: 'genesis',
        chapter: 1,
        startVerse: 1,
        endVerse: 2,
      }).then((verses) => {
        console.log(`Retrieved verses`, verses[1].verseText);
      });
      console.log(predictBibleBook('haba'));
    }
  }, [show]);
  return <span className="hidden" />;
}
