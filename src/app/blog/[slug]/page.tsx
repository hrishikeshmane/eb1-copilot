// app/(blog)/posts/[slug]/page.tsx

import { type QueryParams } from "next-sanity";
import { notFound } from "next/navigation";

import { POSTS_QUERY, POST_QUERY } from "@/sanity/lib/queries";

import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { Post } from "@/components/sanity/post";
import { type Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: QueryParams;
}): Promise<Metadata> {
  const post = await client.fetch(POST_QUERY, params);

  if (!post)
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found",
    };

  return {
    title: post.title,
    description:
      post.seo?.metaDescription ??
      post.body[0]?.children[0]?.text?.slice(0, 140),
    keywords: post.seo?.keywords ?? post.categories,
  };
}

export const revalidate = 3600; // revalidate every hour

export async function generateStaticParams() {
  const posts = await client.fetch(POSTS_QUERY);

  return posts.map((post) => ({
    slug: post?.slug?.current,
  }));
}

export default async function Page({ params }: { params: QueryParams }) {
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params,
  });
  if (!post) {
    return notFound();
  }
  return <Post post={post} />;
}
