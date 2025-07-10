import { ticketStatus, visaPillars } from "@/lib/constants";
import { api } from "@/trpc/server";
import { openai } from "@ai-sdk/openai";
import { auth } from "@clerk/nextjs/server";
import { generateObject, streamText } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

export const maxDuration = 30;

export const MODEL = "gpt-4o-mini";

export async function POST(req: Request) {
  const session = auth();

  if (!session.userId) {
    return new Response("Invalid request", { status: 400 });
  }

  //TODO: rate limit based on IP

  const request = await req.json();

  const prompt = request.prompt;
  const userInfo = request.userInfo;
  const userPillars = request.userPillars;

  const allTags = await api.tag.getAllAvailableTags();

  const result = await generateObject({
    model: openai(MODEL),
    prompt,
    system: `You are an AI assistant helping users with their US talent visa journey. Remember to keep you responses concise.
Here are the user details:
${JSON.stringify(userInfo, null, 2)}

And here are the user's achievements:
${JSON.stringify(userPillars, null, 2)}

Use this information to generate tickets for the user.`,
    schema: z
      .object({
        title: z.string().describe("The title of the ticket"),
        description: z.string().describe("The description of the ticket"),
        visaPillars: z
          .enum(
            visaPillars.map((pillar) => pillar.value) as [string, ...string[]],
          )
          .array()
          .optional()
          .describe(
            "The pillars of the ticket. If not provided, the ticket will be created with no pillars",
          ),
        dueDate: z
          .string()
          .datetime()
          .optional()
          .describe(
            "The due date of the ticket. If not provided, the ticket will be created with no due date",
          ),
        status: z
          .enum(
            ticketStatus.map((status) => status.value) as [string, ...string[]],
          )
          .optional()
          .describe(
            "The status of the ticket. If not provided, the ticket will be created with the default status of `backlog`",
          ),
        tags: z
          .enum(allTags.map((tag) => tag.name) as [string, ...string[]])
          .array()
          .optional()
          .describe(
            "The tags of the ticket. If not provided, the ticket will be created with no tags",
          ),
      })
      .describe("The details of the ticket"),
  });

  return NextResponse.json(
    {
      ...result.object,
      visaPillars: result.object.visaPillars?.map(
        (pillar) => visaPillars.find((p) => p.value === pillar)!,
      ),
      tags: result.object.tags?.map(
        (tag) => allTags.find((t) => t.name === tag)!,
      ),
    },
    { status: 200 },
  );
}
