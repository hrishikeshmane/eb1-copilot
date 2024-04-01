// import Database from "better-sqlite3";
// import { drizzle } from "drizzle-orm/better-sqlite3";

// import { env } from "@/env";
// import * as schema from "./schema";

// /**
//  * Cache the database connection in development. This avoids creating a new connection on every HMR
//  * update.
//  */
// const globalForDb = globalThis as unknown as {
//   conn: Database.Database | undefined;
// };

// export const conn =
//   globalForDb.conn ?? new Database(env.DATABASE_URL, { fileMustExist: false });
// if (env.NODE_ENV !== "production") globalForDb.conn = conn;

// export const db = drizzle(conn, { schema });

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import { env } from "@/env";
import * as schema from "./schema";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
