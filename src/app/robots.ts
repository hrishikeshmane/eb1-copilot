import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/blog", "copilot"],
      disallow: ["/dashboard", "/terms"],
    },
    sitemap: " https://www.greencard.inc/sitemap.xml",
  };
}
