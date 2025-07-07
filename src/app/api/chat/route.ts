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
          recommenderDetails: z.object({
            fullName: z.string(),
            jobTitle: z.string(),
            institution: z.string(),
            field: z.string(),
            credentials: z.string(),
            relationship: z.string(),
            email: z.string().optional(),
            phone: z.string().optional(),
          }),
          additionalContext: z.string().optional(),
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
          ticket: z.object({
            title: z.string(),
            description: z.string(),
          }),
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

  return (await result).toDataStreamResponse();
}
