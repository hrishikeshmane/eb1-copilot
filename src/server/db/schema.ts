// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `eb1-copilot_${name}`);

export const users = createTable("userInfo", {
  userId: text("userId", { length: 128 }).primaryKey().notNull(),

  //personal info
  name: text("name", { length: 256 }),
  email: text("email", { length: 256 }),
  phone: text("phone", { length: 256 }),
  linkedIn: text("linkedIn", { length: 256 }),
  highestEducation: text("highestEducation", { length: 256 }),
  major: text("major", { length: 256 }),
  brithCountry: text("brithCountry", { length: 256 }),
  nationalityCountry: text("nationalityCountry", { length: 256 }),
  hearAboutUs: text("hearAboutUs", { length: 256 }),

  createdAt: int("createdAt", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }),
});

export const posts = createTable(
  "post",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
