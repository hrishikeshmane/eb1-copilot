"use client";

import { Button } from "../ui/button";
import { TriangleRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import HeroVideo from "./hero-video";
import GetStartedButton from "./get-started-button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useState } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const waitlistMutation = api.waitlist.addToWaitlist.useMutation({
    onSuccess: () => {
      setEmail("");
      toast.success("Subscribed to waitlist");
    },
  });

  return (
    <main className="flex w-full flex-col items-center justify-center pb-0 pt-36">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          priority={true}
          src="/liberty-bg.webp"
          alt="liberty"
          width={1100}
          height={1100}
          className="absolute z-0 opacity-15 dark:opacity-10 dark:invert"
        />
        <div className="relative z-10 flex flex-col items-center justify-center gap-2">
          <div className="text-center text-3xl font-bold  md:text-6xl">
            Your{" "}
            <mark
              className="bg-primary px-2"
              style={{
                display: "inline-block",
                transform: "skewX(-10deg)",
              }}
            >
              Green Card
            </mark>{" "}
            Dream, <br /> Now Within Reach
          </div>
          <div className="mx-2 max-w-3xl py-4 text-center dark:text-neutral-200 md:text-xl">
            Start your EB-1A journey with a team that’s trusted by 300+
            immigrants and endorsed by top US immigration attorneys.
          </div>
          {!process.env.NEXT_PUBLIC_WAITLIST && (
            <div className="flex scale-[115%] gap-4">
              <GetStartedButton />
              <Button className="flex gap-1" variant={"secondary"}>
                Book a free call
                <TriangleRightIcon />
              </Button>
            </div>
          )}
          {!!process.env.NEXT_PUBLIC_WAITLIST && (
            <div className="rounded-md border bg-secondary p-1">
              <form
                className="flex w-full items-center space-x-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  waitlistMutation.mutate({ email });
                }}
              >
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Sign up for waitlist"
                  className="w-[16rem] border-0 shadow-none outline-none focus-visible:ring-0"
                />
                <Button
                  type="submit"
                  // variant="secondary"
                  className="scale-[95%]"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>

      <HeroVideo />
    </main>
  );
}
