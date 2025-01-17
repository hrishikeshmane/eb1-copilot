import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { POST_QUERYResult } from "sanity.types";

export function Post({ post }: { post: POST_QUERYResult }) {
  const { title, mainImage, body, author, publishedAt } = post || {};

  return (
    <main className="container prose prose-p:my-1 prose-a:text-green-700 mx-auto flex max-w-6xl flex-col p-4">
      {title ? <h1>{title}</h1> : null}
      {author?.name} •{" "} 
      {publishedAt && new Date(publishedAt).toLocaleDateString()}
      {mainImage?.asset?._ref ? (
        <Image
          className="mx-auto rounded-lg"
          src={urlFor(mainImage?.asset?._ref).width(600).height(400).url()}
          width={600}
          height={300}
          alt={title || ""}
        />
      ) : null}
      {body ? <PortableText value={body} /> : null}
      <hr />
      <Link href="/blog">&larr; Return home</Link>
      <p className="text-sm">
        Disclaimer: The information provided in this blog post is for general
        informational purposes only and should not be construed as legal advice.
        While every effort is made to ensure the accuracy and reliability of the
        content, immigration laws and regulations are subject to change, and
        individual circumstances may vary. For a comprehensive understanding and
        tailored guidance on your immigration journey, it is strongly
        recommended to consult with a qualified immigration attorney. For
        further assistance, you can also connect with experienced immigration
        professionals through the Greencard Inc’s Directory and{" "}
        <Link target="_blank" href="https://www.unshackled.club/find-lawyers">
          Contact Lawyer's .
        </Link>
        This consultation will provide better clarity and ensure that your
        specific needs are addressed with the appropriate legal expertise.
      </p>
    </main>
  );
}
