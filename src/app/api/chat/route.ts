import { openai } from "@ai-sdk/openai";
import { auth } from "@clerk/nextjs/server";
import { streamText } from "ai";

export const maxDuration = 30;

export const MODEL = "gpt-4o-mini";

export async function POST(req: Request) {
  const session = auth();

  if (!session.userId) {
    return new Response("Invalid request", { status: 400 });
  }

  //TODO: rate limit based on IP

  const request = await req.json();

  const messages = request.messages;
  const userInfo = request.userInfo;
  const userPillars = request.userPillars;

  const result = streamText({
    model: openai(MODEL),
    messages: messages,
    system: `You are an AI assistant helping users with their US talent visa journey. Remember to keep you responses concise.
    Here are the user details:
    ${JSON.stringify(userInfo, null, 2)}
  
    And here are the user's achievements:
    ${JSON.stringify(userPillars, null, 2)}
  
    Use this information to provide personalized responses to the user's questions about their visa journey, recommendations, or any other related queries.`,
  });

  return (await result).toDataStreamResponse();
}
