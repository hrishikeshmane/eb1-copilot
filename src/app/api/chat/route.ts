import { visaPillars } from "@/lib/constants";
import { openai } from "@ai-sdk/openai";
import { auth } from "@clerk/nextjs/server";
import { generateText, streamText, tool } from "ai";
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

  let messages = request.messages;
  const userInfo = request.userInfo;
  const userPillars = request.userPillars;

  const resumeUrl = userInfo.resumeUrl;

  if (resumeUrl) {
    const resume = await fetch(resumeUrl);
    const resumeBuffer = await resume.arrayBuffer();

    messages = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Attached is my resume. Please use it when drafting a Letter of Recommendation.",
          },
          {
            type: "file",
            data: resumeBuffer,
            mimeType: "application/pdf",
            filename: "resume.pdf",
          },
        ],
      },
      ...messages,
    ];
  }

  const result = await streamText({
    model: openai(MODEL),
    messages: messages,
    system: `You are an AI assistant helping users with their US talent visa journey. Remember to keep you responses concise.
Here are the user details:
${JSON.stringify(userInfo, null, 2)}

And here are the user's achievements:
${JSON.stringify(userPillars, null, 2)}

Use this information to provide personalized responses to the user's questions about their visa journey, recommendations, or any other related queries.

## Instructions for drafting a Letter of Recommendation

Use the "getRecommenderDetails" tool to get the recommender details. Then use the "generateRecommendationLetter" tool to generate a letter with the recommender details.`,
    tools: {
      getRecommenderDetails: tool({
        description:
          "Collect recommender details for drafting a Letter of Recommendation",
        parameters: z.object({
          purpose: z
            .string()
            .default(
              "To collect recommender information for generating a personalized Letter of Recommendation",
            )
            .describe(
              "The purpose of collecting the recommender details. This will be used to generate a personalized Letter of Recommendation",
            ),
        }),
        execute: async ({ purpose }) => {
          return {
            type: "recommender_form",
            purpose,
          };
        },
      }),

      generateRecommendationLetter: tool({
        description:
          "Generate a USCIS-compliant Letter of Recommendation based on user and recommender details",
        parameters: z.object({
          recommenderDetails: z
            .object({
              fullName: z.string().describe("The full name of the recommender"),
              jobTitle: z.string().describe("The job title of the recommender"),
              institution: z
                .string()
                .describe("The institution of the recommender"),
              field: z.string().describe("The field of the recommender"),
              credentials: z
                .string()
                .describe("The credentials of the recommender"),
              relationship: z
                .string()
                .describe(
                  "The relationship between the user and the recommender",
                ),
              email: z
                .string()
                .optional()
                .describe("The email of the recommender"),
              phone: z
                .string()
                .optional()
                .describe("The phone number of the recommender"),
            })
            .describe("The details of the recommender"),
          additionalContext: z
            .string()
            .optional()
            .describe("Additional context for the letter"),
        }),
        execute: async ({ recommenderDetails, additionalContext }) => {
          const letterResult = await generateText({
            model: openai(MODEL),
            prompt: `Generate a USCIS-compliant Letter of Recommendation for an EB1A petition.

Today's date: ${new Date().toLocaleDateString()}

User Details:
${JSON.stringify(userInfo, null, 2)}

User Achievements:
${JSON.stringify(userPillars, null, 2)}

Recommender Details:
${JSON.stringify(recommenderDetails, null, 2)}

Additional Context:
${additionalContext || "None provided"}

I am ${userInfo?.username}, and I am an EB1A petition applicant. I need your help drafting a Letter of Recommendation for my case.
I am getting this LOR from [Recommender's Full Name], who is a [Recommender's Job Title] at [Recommender's Institution/Organization]. They are a well-respected expert in [Recommender's Field], and are known for [Recommender's briefly mention their major credentials, awards, or accomplishments].
We are connected through [mention how the recommender knows your work — through a collaboration, project, patent analysis, conference, publication review, etc. If they don't know me personally, they've reviewed my publicly available work like patents, books, or research contributions.]
To make things easier, I am uploading both my profile (CV/resume) and the recommender's profile, along with supporting documents related to my work — including:

Please help me draft a USCIS-compliant Letter of Recommendation in the following format. Maintain a formal, academic tone and keep the length around 2 pages.

✍️ Structure for the Letter of Recommendation:
✅ First and Second Passages:

Introduce who the recommender is
How they know me and how they became familiar with my work
Why they are qualified to assess and endorse my achievements
If there is no direct collaboration, note that their opinion is based on my public work (patents, presentations, publications, etc.

✅ Third and Fourth Passages:

Use simple, clear language to describe my accomplishments
Avoid jargon and explain complex ideas like you would to an 8th-grade student
Include:
How my work is novel or original
What existed in the field before
What impact my work has had (on the field, the public, or institutions)
Examples of adoption or application of my work
My role in key projects (especially if collaborative)
Why my accomplishments are considered rare in the field
Use real data, examples, or stories when possible to make it human and relatable

✅ Final Passage:

Why my work is important to the U.S.
What the future impact will be for both the field and the country
Why my work is of national scope and importance
A strong closing endorsement of my EB1A petition

**IMPORTANT**: Replace all the placeholders with the recommender details.`,
          });

          return {
            type: "generated_letter",
            content: letterResult.text,
            recommenderDetails,
            userInfo,
            userPillars,
          };
        },
      }),

      createTicket: tool({
        description: "Create a ticket for the user",
        parameters: z.object({
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
        execute: async ({ ticket }) => {
          console.log("ticket", ticket);

          return {
            type: "generated_ticket",
            ...ticket,
          };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
