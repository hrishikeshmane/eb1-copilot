import { Webhook } from "svix";
import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";
import { db } from "@/server/db";
import { env } from "@/env";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
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

    await clerkClient.users.updateUserMetadata(id, {
      publicMetadata: {
        role: "customer",
        onBoarded: false,
      },
    });

    // const customer: Stripe.Customer = await stripe.customers.create({
    //   email: email_addresses[0].email_address,
    // });

    //     await db.transaction(async (tx) => {
    //       await tx
    //         .insert(users)
    //         .values({
    //           userId: id,
    //           defaultResumeId: "placeholder default resume id",
    //         })
    //         .onConflictDoNothing();

    //       const resume = await tx
    //         .insert(resumes)
    //         .values({
    //           userId: id,
    //           content: newResumeObj,
    //           resumeName: "Default Resume",
    //         })
    //         .returning();

    //       await tx.insert(credits).values({
    //         userId: id,
    //         amount: NEW_USER_CREDITS,
    //         memo: "New user credits",
    //       });

    //       await tx.update(users).set({
    //         totalCredits: NEW_USER_CREDITS,
    //         defaultResumeId: resume[0].resumeId,
    //       });
    //     });
  }

  return new Response("", { status: 200 });
}
