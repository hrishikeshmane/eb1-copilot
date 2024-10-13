import { sendEmail } from "@/app/_actions/send-cron-emails";

export async function GET() {
  try {
    await sendEmail();
    console.log("Cron for Not-Onboarded/PriorityCall emails Done!");
    return new Response('Emails sent successfully', {status: 200});
  } catch (error) {
    console.error('Error sending Not-Onboarded/PriorityCall emails emails:', error);
    return new Response(`Failed to send Not-Onboarded/PriorityCall emails: ${error}`, { status: 500 });
  }
}
