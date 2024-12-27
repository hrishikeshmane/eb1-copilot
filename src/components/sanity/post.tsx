
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { POST_QUERYResult } from "sanity.types";

export function Post({ post }: { post: POST_QUERYResult }) {
  const { title, mainImage, body, author, publishedAt } = post || {};

  return (
    <main className="container max-w-6xl flex flex-col mx-auto prose prose-lg p-4">
      {title ? <h1>{title}</h1> : null}
      {author?.name} • {publishedAt && new Date(publishedAt).toLocaleDateString()}
      {mainImage?.asset?._ref ? (
        <Image
          className="rounded-lg mx-auto"
          src={urlFor(mainImage?.asset?._ref).width(600).height(400).url()}
          width={600}
          height={300}
          alt={title || ""}
        />
      ) : null}
      {body ? <PortableText value={body} /> : null}
      <hr />
      <Link href="/blog">&larr; Return home</Link>
    </main>
  );
}