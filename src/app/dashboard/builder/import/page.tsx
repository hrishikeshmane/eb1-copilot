"use client";

import { api } from "@/trpc/react";
import Link from "next/link";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

const ImportPage = () => {
  const { data, isLoading, isError } = api.masterList.getAll.useQuery();
  const searchParams = useSearchParams();
  const customerSpId = searchParams.get("customer");
  return (
    <div className="h-full w-full p-4 pb-1 pr-0">
      <h2 className="mb-2 text-center text-xl font-semibold">
        Import tickets from specialized lists
      </h2>
      <div className="mx-auto flex max-w-5xl flex-col gap-2 rounded-md bg-card p-6">
        {!data ? (
          <div>No Records for Master List</div>
        ) : (
          data.map((list) => (
            <Link
              href={`/dashboard/builder/import/${list.id}?customer=${customerSpId}`}
              key={list.id}
              className="flex w-full justify-between border-b p-2 hover:bg-muted"
            >
              <span className="font-semibold">{list.title}</span>
              <span className="flex items-center gap-2 text-muted-foreground">
                {list.description} <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ImportPage;
