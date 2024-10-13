import { sendEmail } from "@/app/_actions/send-cron-emails";
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

 
export async function GET(request: NextRequest) {
  
//   const authHeader = request.headers.get('authorization');
//   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
//     return new Response('Unauthorized', {
//       status: 401,
//     });
//   }

  try {
    await sendEmail();
    console.log("Cron for Not-Onboarded/PriorityCall emails Done!");
    return new Response('Emails sent successfully', {status: 200});
  } catch (error) {
    console.error('Error sending Not-Onboarded/PriorityCall emails emails:', error);
    return new Response(`Failed to send Not-Onboarded/PriorityCall emails: ${error}`, { status: 500 });
  }
}
