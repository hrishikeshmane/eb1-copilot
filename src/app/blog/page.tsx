import { Posts } from "@/components/sanity/posts";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { JoinNewsletterForm } from "@/components/convertkit-forms";

export const metadata = {
  title: "Blog | Insights on EB-1A and U.S. Immigration help",
  description:
    "Stay informed with the latest articles on EB-1A applications and immigration trends. Learn about our mission to streamline EB-1A green card applications.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: [
    "greencard inc. blog",
    "eb-1a insights",
    "u.s. immigration articles",
    "green card application tips",
    "ai immigration solutions",
    "eb-1a application experts",
  ],
};

export async function getPosts() {
  return await sanityFetch({
    query: POSTS_QUERY,
  });
}

export default async function Page() {
  const { data: posts } = await getPosts();

  return <>
          <Posts posts={posts} />;
          <div className="flex w-full flex-col items-center justify-center gap-4 py-4">
            <JoinNewsletterForm />
          </div>
        </>
}
