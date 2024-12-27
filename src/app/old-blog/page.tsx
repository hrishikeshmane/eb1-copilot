import Header from "@/components/elements/header";
import { getBlogPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogPage = () => {
  const allBlogs = getBlogPosts().sort((a, b) => {
    if (new Date(a.metadata.publishedAt) < new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });
  // top 4 blogs are featured
  const featuredBlogs = allBlogs.slice(0, 4);
  const restBlogs = allBlogs.slice(4);

  return (
    <main className="flex flex-col items-center justify-center">
      <Header />
      <section className="flex w-full max-w-7xl flex-col p-10">
        <div className="flex items-start">
          <h1 className="text-left text-4xl font-semibold">Blog</h1>
        </div>
        {/* <p>We are cooking insightful blogs for you. Stay tuned!</p> */}
        {/* <div className="mt-10 grid w-full grid-cols-3 grid-rows-2 gap-4 px-4">
          <Link
            href={"blog/acceptance-rate-for-the-EB1A-green-card"}
            className="col-span-1 row-span-2 rounded border"
          >
            <Image
              alt={featuredBlogs[0]?.metadata.title ?? ""}
              src={featuredBlogs[0]?.metadata.image ?? ""}
              width={400}
              height={400}
            />
            {featuredBlogs[0]?.metadata.title}
          </Link>
          <Link
            href={"/blog/honeymoon-or-green-card"}
            className="rounded border"
          >
            <Image
              alt={featuredBlogs[1]?.metadata.title ?? ""}
              src={featuredBlogs[1]?.metadata.image ?? ""}
              width={400}
              height={400}
            />
            {featuredBlogs[1]?.metadata.title}
          </Link>
          <Link
            href={
              "blog/leading-or-critical-role-in-distinguished-organizations"
            }
            className="col-span-1 row-span-2 rounded border"
          >
            <Image
              alt={featuredBlogs[2]?.metadata.title ?? ""}
              src={featuredBlogs[2]?.metadata.image ?? ""}
              width={400}
              height={400}
            />
            {featuredBlogs[2]?.metadata.title}
          </Link>
          <Link
            href={"blog/membership-in-associations"}
            className="relative rounded border"
          >
  <div className={cn("absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none", `bg-[url(${featuredBlogs[3]?.metadata.image ?? ""})]`)}>
              <div className="to-bg-black-10 absolute inset-0 h-full w-full rounded bg-gradient-to-t from-black/80 via-black/50"></div>
            </div>
            <div className="relative ">
              <Image
                className="object-cover"
                alt={featuredBlogs[3]?.metadata.title ?? ""}
                src={featuredBlogs[3]?.metadata.image ?? ""}
                width={400}
                height={400}
              />
              <p className="px-2 text-white">
                {featuredBlogs[3]?.metadata.title}
              </p>
            </div>
          </Link>
        </div> */}

        <div className="my-10">
          {allBlogs.map((post) => (
            <Link
              key={post.slug}
              className="mb-4 flex flex-col space-y-1"
              href={`/blog/${post.slug}`}
            >
              <div className=" rounded bg-slate-100 p-2 px-4 transition-all  hover:scale-[1.0051]  dark:bg-neutral-900">
                <h1 className="text-lg font-semibold text-black dark:text-gray-300">
                  {post.metadata.title}
                </h1>
                {/* first 200 characters of post.content */}
                <p className="text-sm text-gray-500">
                  {post.content
                    ?.replace(/<Image[\s\S]*?\/>/g, "")
                    .replace(/##/g, "")
                    .slice(0, 200)}
                  ...
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
