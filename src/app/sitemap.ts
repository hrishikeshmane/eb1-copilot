import { type MetadataRoute } from "next";
import { getPosts } from "./blog/page";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const postUrls = posts.data.map((post) => ({
    url: `https://www.greencard.inc/blog/${post.slug?.current}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://www.greencard.inc",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.greencard.inc/copilot",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.greencard.inc/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...postUrls,
  ];
}
