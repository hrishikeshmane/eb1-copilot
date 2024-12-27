import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  // stega: { studioUrl: "http://localhost:3000/studio" },
  stega: {
    // enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === "preview",
    enabled: true,
    studioUrl: "/studio",
  },
});
