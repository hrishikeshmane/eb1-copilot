
import { Posts } from "@/components/sanity/posts";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";

async function getPosts() {
    return await sanityFetch({
        query: POSTS_QUERY,
    });
}

export default async function Page() {
  const { data: posts }  = await getPosts()

  return <Posts posts={posts} />;
}