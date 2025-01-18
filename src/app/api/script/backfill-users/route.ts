import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { clerkClient } from "@clerk/nextjs/server";
import type { EmailAddress } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

function convertEmailAddressesToJSON(emailAddresses: EmailAddress[]) {
  return emailAddresses.map((emailAddress) => ({
    id: emailAddress.id,
    emailAddress: emailAddress.emailAddress,
    verification: emailAddress.verification,
    linkedTo: emailAddress.linkedTo.map((linkedTo) => ({
      id: linkedTo.id,
      type: linkedTo.type,
    })),
  }));
}

export async function GET(req: Request) {
  // if env is production, return 404
  // if (process.env.NODE_ENV === "production") {
  //   return new Response("Not found", { status: 404 });
  // }
  const outputLog = [];
  // Get all users from database
  const usersFromDB = await db.query.users.findMany();
  outputLog.push(`Found ${usersFromDB.length} users in database`);

  for (const user of usersFromDB) {
    const userId = user.userId;
    outputLog.push(`Syncing: ${userId}`);

    // Fetch user data from Clerk
    const userFromClerk = await clerkClient.users.getUser(userId);

    const publicMetadata =
      userFromClerk.publicMetadata as CustomJwtSessionClaims["metadata"];
    // console.log("publicMetadata", publicMetadata);
    // console.log("emailAddresses", userFromClerk.emailAddresses);
    // console.log(
    //   "emailAddresses json",
    //   JSON.stringify(userFromClerk.emailAddresses),
    // );

    // Update user in database with new data
    try {
      await db
        .update(users)
        .set({
          firstName: userFromClerk.firstName,
          lastName: userFromClerk.lastName,
          username: userFromClerk.username,
          hasImage: userFromClerk.hasImage,
          imageUrl: userFromClerk.imageUrl,
          primaryEmailAddressId: userFromClerk.primaryEmailAddressId,
          emailAddresses: JSON.parse(
            JSON.stringify(userFromClerk.emailAddresses),
          ),
          publicMetadata: JSON.parse(
            JSON.stringify(userFromClerk.publicMetadata),
          ),
          role: publicMetadata.role,
          onBoarded: publicMetadata.onBoarded,
        })
        .where(eq(users.userId, userId))
        .execute();

      outputLog.push(`✅ Updated user ${userId}`);
    } catch (error) {
      outputLog.push(`❌ Error updating user ${userId}: ${error}`);
    }
  }
  console.log(outputLog.join("\n"));

  // Return outputLog
  return new Response(outputLog.join("\n"), {
    headers: {
      "content-type": "text/plain",
    },
  });
}
