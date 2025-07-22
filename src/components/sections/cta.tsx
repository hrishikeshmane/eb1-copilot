import { Icons } from "@/components/icons";
import Section from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HeroCTA } from "./hero";
import { ArrowRight, PhoneIcon } from "lucide-react";

export default function CtaSection() {
  return (
    <Section
      id="cta"
      title="Ready to get started?"
      subtitle="Start Exploring Visa Insights Today"
      className="rounded-xl bg-primary/10 py-16"
      // className="bg-liberty t rounded-xl bg-primary/10 bg-[length:1300px_850px] bg-center bg-no-repeat py-24 bg-blend-multiply "
    >
      <div className="flex w-full flex-col items-center justify-center space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Link
          href="https://go.greencard.inc/evaluation"
          className={cn(
            buttonVariants({ variant: "default" }),
            "group flex gap-2 sm:w-auto",
          )}
        >
          <PhoneIcon className="h-4 w-4" />
          Book a Free Consultation
        </Link>

        <Link
          href="https://www.visavibe.xyz/insights"
          className={cn(
            buttonVariants({ variant: "default" }),
            "group flex gap-2 sm:w-auto",
          )}
        >
          {/* <Icons.logo className="h-6 w-6" /> */}
          Explore Insights
          <ArrowRight className="h-4 w-4" />
        </Link>

        <Link
          href="https://www.visavibe.xyz/database"
          className={cn(
            buttonVariants({ variant: "default" }),
            "group flex gap-2 sm:w-auto",
          )}
        >
          {/* <Icons.logo className="h-6 w-6" /> */}
          Search Case Database``
        </Link>
      </div>
      <HeroCTA />
    </Section>
  );
}
