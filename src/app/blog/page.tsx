import Header from "@/components/elements/header";
import React from "react";

const BlogPage = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <Header />
      <section className="flex w-full max-w-7xl flex-col p-10">
        <div className="flex items-start">
          <h1 className="text-left text-4xl font-semibold">Blog</h1>
        </div>
        <p>We are cooking insightful blogs for you. Stay tuned!</p>
        {/* <div className="mt-10 grid w-full grid-cols-3 grid-rows-2 gap-4 px-4">
          <div className="col-span-1 row-span-2 rounded border">1</div>
          <div className="rounded border">2</div>
          <div className="col-span-1 row-span-2 rounded border">4</div>
          <div className="rounded border">3</div>
        </div> */}
      </section>
    </main>
  );
};

export default BlogPage;
