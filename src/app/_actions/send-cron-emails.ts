"use server";

import ReminderEmail from "@/components/email-templates/reminder";
import { Resend } from "resend";
import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { renderToStaticMarkup } from "react-dom/server";

const FROM_EMAIL = "Greencard Inc <hello@greencard.inc>";
const RESEND_KEY = process.env.RESEND_KEY;
const BATCH_SIZE = 250;

interface UserWithInfo {
  id: string;
  email: string | undefined;
  name: string;
  priorityCallSheduled: boolean | null;
  onBoarded: boolean | null;
}

export async function sendEmail() {
  const resend = new Resend(RESEND_KEY);

  try {
    const client = await clerkClient();
    const allUsers = await client.users.getUserList({
      orderBy: "-created_at",
      limit: 500,
    });

    const usersWithInfo = await db.query.users.findMany({
      with: {
        userInfo: true,
      },
    });

    const usersWithAdditionalInfo: UserWithInfo[] = allUsers.data
      .filter((user) => user.publicMetadata.role === "customer")
      .map((user) => {
        const userInfo = usersWithInfo.find((info) => info.userId === user.id);
        return {
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          name: user.firstName || user.lastName || user.username || "User",
          priorityCallSheduled: userInfo?.priorityCallSheduled ?? null,
          onBoarded: userInfo?.onBoarded ?? null,
        };
      });

    const usersWithoutPriorityCall = usersWithAdditionalInfo.filter(
      (user) => user.onBoarded === true && user.priorityCallSheduled === false,
    );

    const usersNotOnboarded = usersWithAdditionalInfo.filter(
      (user) => user.onBoarded === false,
    );

    console.log(
      `Found ${usersWithoutPriorityCall.length} users without a priority call not scheduled:`,
    );
    // console.log(usersWithoutPriorityCall);

    console.log(`Found ${usersNotOnboarded.length} users not onboarded:`);
    // console.log(usersNotOnboarded);

    const sendEmailsInBatches = async (
      users: UserWithInfo[],
      subject: string,
      message: string,
      link: string,
      linkText: string,
    ): Promise<void> => {
      const usersLength = users.length;
      const emailBatches = [];

      while (users.length) {
        const batch = users.splice(0, BATCH_SIZE);

        const bcc = batch.map((user) => user.email || "default@example.com");

        const email = {
          from: FROM_EMAIL,
          to: ["hello@greencard.inc"],
          subject: subject,
          bcc: bcc,
          react: ReminderEmail({
            message: message,
            link: link,
            linkText: linkText,
            name: "",
          }) as React.ReactElement<any>,
          // html: htmlContent,
        };

        emailBatches.push(email);
      }

      try {
        await resend.batch.send(emailBatches);
        console.log(
          `Sent ${emailBatches.length} emails in batch to ${usersLength} users.`,
        );
      } catch (error) {
        console.error("Error sending batch emails:", error);
      }
    };

    // Sending priority call reminder emails
    await sendEmailsInBatches(
      usersWithoutPriorityCall,
      "Reminder: Schedule Your Priority Call",
      "Please schedule your priority call to get started with your application!",
      "https://www.greencard.inc/dashboard/onboarding",
      "Schedule Your Call",
    );

    // Sending onboarding reminder emails
    await sendEmailsInBatches(
      usersNotOnboarded,
      "Welcome! Complete Your Onboarding",
      "Welcome to Greencard Inc! Please complete your onboarding process.",
      "https://www.greencard.inc/dashboard/onboarding",
      "Complete Your Onboarding",
    );
  } catch (error) {
    console.error("Error fetching users or sending emails:", error);
    throw new Error("Error occurred while processing sendEmail function");
  }
}

// ##################################### TEST CODE

// "use server";

// import ReminderEmail from "@/components/email-templates/reminder";
// import { Resend } from "resend";
// import { clerkClient } from "@clerk/nextjs/server";
// import { db } from "@/server/db";
// import { renderToStaticMarkup } from "react-dom/server";

// const FROM_EMAIL = "Greencard Inc <hello@greencard.inc>";
// const RESEND_KEY = process.env.RESEND_KEY;
// const BATCH_SIZE = 50;

// interface UserWithInfo {
//   id: string;
//   email: string | undefined;
//   name: string;
//   priorityCallSheduled: boolean | null;
//   onBoarded: boolean | null;
// }

// export async function sendEmail() {
//   const resend = new Resend(RESEND_KEY);

//   try {
//     const allUsers = await clerkClient.users.getUserList({
//       orderBy: "-created_at",
//       limit: 500,
//     });

//     const usersWithInfo = await db.query.users.findMany({
//       with: {
//         userInfo: true,
//       },
//     });

//     const usersWithAdditionalInfo: UserWithInfo[] = allUsers
//       .filter((user) => user.publicMetadata.role === "customer")
//       .map((user) => {
//         const userInfo = usersWithInfo.find((info) => info.userId === user.id);
//         return {
//           id: user.id,
//           email: user.emailAddresses[0]?.emailAddress,
//           name: user.firstName || user.lastName || user.username || "User",
//           priorityCallSheduled: userInfo?.priorityCallSheduled ?? null,
//           onBoarded: userInfo?.onBoarded ?? null,
//         };
//       });

//     const usersWithoutPriorityCall = usersWithAdditionalInfo.filter(
//       (user) => user.priorityCallSheduled === false,
//     );

//     const usersNotOnboarded = usersWithAdditionalInfo.filter(
//       (user) => user.onBoarded === false,
//     );

//     console.log(
//       `Found ${usersWithoutPriorityCall.length} users without a priority call not scheduled:`,
//     );
//     // console.log(usersWithoutPriorityCall);

//     console.log(`Found ${usersNotOnboarded.length} users not onboarded:`);
//     // console.log(usersNotOnboarded);

//     const sendEmailsInBatches = async (
//         users: UserWithInfo[],
//         subject: string,
//         message: string,
//         link: string,
//         linkText: string,
//       ): Promise<void> => {
//         const testEmail = "akashbm08@gmail.com";

//         const emailBatch = [{
//           from: FROM_EMAIL,
//           to: [testEmail],
//           subject: subject,
//           react: ReminderEmail({
//             message: message,
//             link: link,
//             linkText: linkText,
//             name: "Akash",
//           }) as React.ReactElement,
//         }];

//         try {
//           await resend.batch.send(emailBatch);
//           console.log(`Test email sent to ${testEmail}.`);
//         } catch (error) {
//           console.error("Error sending test email:", error);
//         }
//       };

//     // Sending priority call reminder emails
//     await sendEmailsInBatches(
//       usersWithoutPriorityCall,
//       "Reminder: Schedule Your Priority Call",
//       "Please schedule your priority call to get started with your application!",
//       "https://www.greencard.inc/dashboard/onboarding",
//       "Schedule Your Call",
//     );

//     // Sending onboarding reminder emails
//     await sendEmailsInBatches(
//       usersNotOnboarded,
//       "Welcome! Complete Your Onboarding",
//       "Welcome to Greencard Inc! Please complete your onboarding process.",
//       "https://www.greencard.inc/dashboard/onboarding",
//       "Complete Your Onboarding",
//     );
//   } catch (error) {
//     console.error("Error fetching users or sending emails:", error);
//     throw new Error("Error occurred while processing sendEmail function");
//   }
// }
