import { Webhook } from "svix";
import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";
import { db } from "@/server/db";
import { env } from "@/env";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${evt.data.id} and type of ${eventType}`);
  //   console.log("Webhook body:", body);

  if (eventType === "user.created") {
    const { id } = evt.data;
    console.log("$$$$$$$$$ user created", id);

    await clerkClient.users.updateUserMetadata(id, {
      publicMetadata: {
        role: "customer",
        onBoarded: false,
      },
    });

    await db
      .insert(users)
      .values({
        userId: id,
        role: "customer",
        onBoarded: false,
      })
      .onConflictDoNothing()
      .execute();
  }

  if (eventType === "user.updated") {
    const { id } = evt.data;
    // check if user in db
    const user = await db.query.users.findFirst({
      where: eq(users.userId, id),
    });
    if (!user) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          role: "customer",
          onBoarded: false,
        },
      });
      // create new and return
      await db
        .insert(users)
        .values({
          userId: id,
          role: "customer",
          onBoarded: false,
        })
        .onConflictDoNothing()
        .execute();

      return new Response("", { status: 200 });
    }

    const publicMetadata = evt.data
      .public_metadata as CustomJwtSessionClaims["metadata"];

    await db
      .update(users)
      .set({
        role: publicMetadata.role,
        onBoarded: publicMetadata.onBoarded,
      })
      .where(eq(users.userId, id))
      .execute();
  }

  return new Response("", { status: 200 });
}
