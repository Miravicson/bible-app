import { migrate } from './migrate';
import { runSeed } from './seed';

export async function configureDatabase() {
  try {
    await migrate();
    await runSeed();
  } catch (error) {
    console.log(error);
  }
}
