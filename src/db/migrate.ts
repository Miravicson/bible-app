import { DirEntry, readDir, readTextFile } from '@tauri-apps/plugin-fs';
import { resourceDir } from '@tauri-apps/api/path';
import { sqlite } from './database';
import { ExecuteMigrationsOptions } from '@/lib/types';

export type ProxyMigrator = (migrationQueries: string[]) => Promise<void>;

/**
 * Executes database migrations.
 *
 * @param db The database instance.
 * @returns A promise that resolves when the migrations are complete.
 */
export async function migrate() {
  const resourcePath = await resourceDir();
  const files = await readDir(`${resourcePath}/migrations`);
  const migrations = files.filter((file) => file.name?.endsWith('.sql'));
  sortMigrationsByName(migrations);

  await createMigrationsTable();
  await executeMigrations({ migrations, migrationResourcePath: resourcePath });
  return Promise.resolve();
}

function sortMigrationsByName(migrations: DirEntry[]) {
  migrations.sort((a, b) => {
    const aHash = a.name?.replace('.sql', '').slice(0, 4);
    const bHash = b.name?.replace('.sql', '').slice(0, 4);

    if (aHash && bHash) {
      return aHash.localeCompare(bHash);
    }

    return 0;
  });
}

async function createMigrationsTable() {
  const migrationTableCreate = /*sql*/ `
  CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          hash text NOT NULL UNIQUE,
    created_at numeric
  )
`;
  await sqlite.execute(migrationTableCreate, []);
}

async function executeMigrations(options: ExecuteMigrationsOptions) {
  for (const migration of options.migrations) {
    const hash = migration.name?.replace('.sql', '');

    const dbMigrations = (await sqlite.select(
      /*sql*/ `SELECT id, hash, created_at FROM "__drizzle_migrations" ORDER BY created_at DESC`,
    )) as unknown as { id: number; hash: string; created_at: number }[];

    const hasBeenRun = (hash: string) =>
      dbMigrations.find((dbMigration) => {
        return dbMigration?.hash === hash;
      });

    if (hash && hasBeenRun(hash) === undefined) {
      const sql = await readTextFile(
        `${options.migrationResourcePath}/migrations/${migration.name}`,
      );

      sqlite.execute(sql, []);
      sqlite.execute(
        /*sql*/ `INSERT INTO "__drizzle_migrations" (hash, created_at) VALUES ($1, $2)`,
        [hash, Date.now()],
      );
    }
  }
}
