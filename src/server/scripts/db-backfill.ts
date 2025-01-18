// scripts/db-backfill.ts
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { clerkClient } from "@clerk/express";
import * as schema from "../db/schema"; // Adjust path to your schema file
import { config } from "dotenv";
import { eq } from "drizzle-orm";

// Load environment variables
config();

if (!process.env.DATABASE_URL || !process.env.DATABASE_AUTH_TOKEN) {
  throw new Error("Database credentials not found in environment variables");
}

// Initialize database connection
const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const db = drizzle(client, { schema });

async function getUserFromClerk(userId: string) {
  try {
    const user = await clerkClient.users.getUser(userId);
    return user;
  } catch (error) {
    console.error(`Error fetching user ${userId} from Clerk:`, error);
    return null;
  }
}

async function main() {
  try {
    console.log("Starting backfill operation...");
    const skippedUsers = [];
    let backfilledUserCount = 0;
    const users = await db.select().from(schema.users);
    console.log("Found", users.length, "users in database");
    for (const user of users) {
      const clerkUser = await getUserFromClerk(user.userId);

      if (!clerkUser) {
        skippedUsers.push(user.userId);
        continue;
      }

      const publicMetadata =
        clerkUser.publicMetadata as CustomJwtSessionClaims["metadata"];

      // Perform the update
      try {
        await db
          .update(schema.users)
          .set({
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            username: clerkUser.username,
            hasImage: clerkUser.hasImage,
            imageUrl: clerkUser.imageUrl,
            primaryEmailAddressId: clerkUser.primaryEmailAddressId,
            emailAddresses: JSON.parse(
              JSON.stringify(clerkUser.emailAddresses),
            ),
            publicMetadata: JSON.parse(
              JSON.stringify(clerkUser.publicMetadata),
            ),
            role: publicMetadata.role,
            onBoarded: publicMetadata.onBoarded,
          })
          .where(eq(schema.users.userId, user.userId))
          .execute();
      } catch (error) {
        console.error(`Error updating user ${user.userId}:`, error);
        continue;
      }

      backfilledUserCount += 1;

      // Optional: Add some progress logging
      if (backfilledUserCount % 10 === 0) {
        console.log(`Processed ${backfilledUserCount} users...`);
      }
    }

    console.log("\nBackfill Summary:");
    console.log("----------------");
    console.log(`Total users: ${users.length}`);
    console.log(`Successfully backfilled: ${backfilledUserCount}`);
    console.log(`Skipped users: ${skippedUsers.length}`);
    if (skippedUsers.length > 0) {
      console.log("Skipped User IDs:", skippedUsers);
    }
  } catch (error) {
    console.error("Error during backfill:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Run the script
main();
