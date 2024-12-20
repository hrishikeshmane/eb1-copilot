"use server";

import ReminderEmail from "@/components/email-templates/reminder";
import { Resend } from "resend";
import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { renderToStaticMarkup } from "react-dom/server";

const FROM_EMAIL = "Greencard Inc <hello@greencard.inc>";
const RESEND_KEY = process.env.RESEND_KEY;
const BATCH_SIZE = 40;

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
    const allUsers = await clerkClient.users.getUserList({
      orderBy: "-created_at",
      limit: 500,
    });

    const usersWithInfo = await db.query.users.findMany({
      with: {
        userInfo: true,
      },
    });

    const usersWithAdditionalInfo: UserWithInfo[] = allUsers
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
      while (users.length) {
        const batch = users.splice(0, BATCH_SIZE);
        
        const emailBatches = []; 
        const usersLength = batch.length;
        const bcc = batch.map(user => user.email || "default@example.com");
    
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
          }) as React.ReactElement,
        };
    
        emailBatches.push(email);
    
        try {
          const response = await resend.batch.send(emailBatches);
          
          if (response.error) {
            console.error(`Failed to send emails. Status Code: ${'statusCode' in response.error ? response.error.statusCode: "No StatusCode"}, Message: ${response.error.message}`);
          } else {
            console.log(`Sent ${emailBatches.length} emails in batch to ${usersLength} users.`);
          }
        } catch (error) {
          console.error("Error sending batch emails:", error);
        }
    
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    };
      
    // Sending priority call reminder emails
    // await sendEmailsInBatches(
    //   usersWithoutPriorityCall,
    //   "Reminder: Schedule Your Priority Call",
    //   "Please schedule your priority call to get started with your application!",
    //   "https://www.greencard.inc/dashboard/onboarding",
    //   "Schedule Your Call",
    // );

    // // Sending onboarding reminder emails
    // await sendEmailsInBatches(
    //   usersNotOnboarded,
    //   "Welcome! Complete Your Onboarding",
    //   "Welcome to Greencard Inc! Please complete your onboarding process.",
    //   "https://www.greencard.inc/dashboard/onboarding",
    //   "Complete Your Onboarding",
    // );

  } catch (error) {
    console.error("Error fetching users or sending emails:", error);
    throw new Error("Error occurred while processing sendEmail function");
  }
}
