import { visaPillars } from "@/lib/constants";
import { openai } from "@ai-sdk/openai";
import { auth } from "@clerk/nextjs/server";
import { convertToModelMessages, generateText, streamText, tool } from "ai";
import { z } from "zod";
import { SYSTEM_PROMPT } from "./prompt";

export const maxDuration = 30;

export const MODEL = "gpt-4o-mini";

const recommenderDetailsSchema = z
  .object({
    fullName: z.string().describe("The full name of the recommender"),
    jobTitle: z.string().describe("The job title of the recommender"),
    institution: z.string().describe("The institution of the recommender"),
    field: z.string().describe("The field of the recommender"),
    credentials: z.string().describe("The credentials of the recommender"),
    relationship: z
      .string()
      .describe("The relationship between the user and the recommender"),
    email: z.string().optional().describe("The email of the recommender"),
    phone: z
      .string()
      .optional()
      .describe("The phone number of the recommender"),
  })
  .describe("The details of the recommender");

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

  const result = await streamText({
    model: openai(MODEL),
    messages: convertToModelMessages(messages),
    system: SYSTEM_PROMPT(userInfo, userPillars),
    tools: {
      getRecommenderDetails: tool({
        description:
          "Collect recommender details for drafting a Letter of Recommendation",
        inputSchema: z.object({}),
        outputSchema: z.object({
          recommenderDetails: recommenderDetailsSchema,
          additionalContext: z
            .string()
            .optional()
            .describe("Additional context for the letter"),
        }),
      }),

      displayRecommendationLetter: tool({
        description:
          "Generate a USCIS-compliant Letter of Recommendation based on user and recommender details",
        inputSchema: z.object({
          letterContent: z
            .string()
            .describe("The content of the recommendation letter"),
          recommenderDetails: recommenderDetailsSchema,
        }),
        execute: async ({ letterContent, recommenderDetails }) => {
          return {
            content: letterContent,
            recommenderDetails,
          };
        },
      }),

      createTicket: tool({
        description: "Create a ticket for the user",
        inputSchema: z.object({
          ticket: z
            .object({
              title: z.string().describe("The title of the ticket"),
              description: z.string().describe("The description of the ticket"),
              visaPillars: z
                .enum(
                  visaPillars.map((pillar) => pillar.value) as [
                    string,
                    ...string[],
                  ],
                )
                .array()
                .optional()
                .describe(
                  "The pillars of the ticket. If not provided, the ticket will be created with the default pillars",
                ),
              dueDate: z
                .string()
                .datetime()
                .optional()
                .describe(
                  "The due date of the ticket. If not provided, the ticket will be created with the default due date",
                ),
            })
            .describe("The details of the ticket"),
        }),
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
