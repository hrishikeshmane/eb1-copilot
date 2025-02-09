import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { POST_QUERYResult } from "sanity.types";
import { JoinNewsletterForm } from "../convertkit-forms";

export function Post({ post }: { post: POST_QUERYResult }) {
  const { title, mainImage, body, author, publishedAt } = post || {};

  return (
    <main className="container prose prose-lg mx-auto flex max-w-6xl flex-col p-4">
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
