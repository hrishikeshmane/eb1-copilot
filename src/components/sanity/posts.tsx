import Image from "next/image";
import Link from "next/link";
import { type POSTS_QUERYResult } from "sanity.types";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { JoinNewsletterForm } from "@/components/convertkit-forms";

export function Posts({ posts }: { posts: POSTS_QUERYResult }) {
  return (
    <section className="py-32">
      <div className="container flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-6xl lg:text-5xl">
            Blog Posts
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map(
            (post) =>
              post.slug && (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="flex flex-col overflow-clip rounded-xl border border-border"
                >
                  <div className="relative aspect-[16/9] w-full">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage?.asset?._ref ?? "")
                          .width(600)
                          .height(400)
                          .url()}
                        alt={post.title ?? "Blog post image"}
                        layout="fill"
                        objectFit="cover"
                        className="object-center"
                      />
                    ) : (
                      <div className="h-full w-full bg-muted" />
                    )}
                  </div>
                  <div className="flex flex-grow flex-col px-6 py-8">
                    <div className="flex-grow">
                      <h3 className="mb-3 line-clamp-3 text-lg font-semibold md:mb-4 md:text-xl lg:mb-6">
                        {post.title}
                      </h3>
                    </div>
                    <div className="mt-auto">
                      <p className="mb-4 text-sm text-muted-foreground">
                        {post.author?.name} •{" "}
                        {post.publishedAt &&
                          new Date(post.publishedAt).toLocaleDateString()}
                      </p>
                      <p className="flex items-center hover:underline">
                        Read more
                        <ArrowRight className="ml-2 size-4" />
                      </p>
                    </div>
                  </div>
                </Link>
              ),
          )}
        </div>
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-4 rounded-lg bg-card px-4 py-16 ">
            <h2 className="pb-4 text-center text-4xl font-bold">
              Instead of wasting 10+ hours of your time, spend <br />
              <span className="text-primary">{` < 5 minutes a week`}</span>{" "}
              de-risking your future.
            </h2>
            <div className="flex w-full flex-col items-center justify-center gap-4 px-4 pt-8 ">
              <JoinNewsletterForm />
            </div>
         </div>
      </div>
    </section>
  );
}
