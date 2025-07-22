import { Icons } from "@/components/icons";
import Section from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HeroCTA } from "./hero";

export default function CtaSection() {
  return (
    <Section
      id="cta"
      title="Ready to get started?"
      subtitle="Start Your Green Card Journey Now!"
      className="rounded-xl bg-primary/10 py-16"
      // className="bg-liberty t rounded-xl bg-primary/10 bg-[length:1300px_850px] bg-center bg-no-repeat py-24 bg-blend-multiply "
    >
      {/* <div className="flex w-full flex-col items-center justify-center space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Link
          href="/signup"
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full sm:w-auto text-background flex gap-2"
          )}
        >
          <Icons.logo className="h-6 w-6" />
          Get started for free
        </Link>
      </div> */}
      <HeroCTA />
    </Section>
  );
}
