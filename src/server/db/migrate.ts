import "dotenv/config";
import { resolve } from "node:path";
import { db } from ".";
import { migrate } from "drizzle-orm/libsql/migrator";

void (async () => {
  await migrate(db, { migrationsFolder: resolve(__dirname, "./drizzle") });
})();
