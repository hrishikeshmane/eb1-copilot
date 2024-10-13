import { sendEmail } from "@/app/_actions/send-cron-emails";
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Uncomment the following block if you want to implement authorization
  // const authHeader = request.headers.get('authorization');
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new Response('Unauthorized', {
  //     status: 401,
  //   });
  // }

  const startTime = Date.now(); 

  try {
    await sendEmail();
    const endTime = Date.now(); 
    const duration = endTime - startTime;

    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);

    console.log(`Cron for Not-Onboarded/PriorityCall emails done in ${minutes} minutes and ${seconds} seconds!`);
    return new Response('Emails sent successfully', { status: 200 });
  } catch (error) {
    console.error('Error sending Not-Onboarded/PriorityCall emails:', error);
    return new Response(`Failed to send Not-Onboarded/PriorityCall emails: ${error}`, { status: 500 });
  }
}
