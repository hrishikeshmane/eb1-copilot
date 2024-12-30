import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Description for search engines (150-160 characters)",
      validation: (Rule) =>
        Rule.max(160).warning(
          "Longer descriptions may be truncated by search engines",
        ),
    },
    {
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "Add keywords that describe your blog post",
      options: {
        layout: "tags",
      },
    },
  ],
});
