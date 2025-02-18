"use client";

import { motion } from "framer-motion";

import { Icons } from "@/components/icons";
import HeroVideoDialog from "@/components/magicui/hero-video";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ArrowUpRightIcon, Phone } from "lucide-react";
import GetStartedButton from "../elements/get-started-button";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1];

function HeroPill() {
  return (
    <motion.a
      href="https://www.unshackled.club/marketplace"
      className="flex w-auto items-center space-x-2 whitespace-pre rounded-full bg-primary/20 px-2 py-1 ring-1 ring-accent"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="w-fit rounded-full bg-accent px-2 py-0.5 text-center text-xs font-medium sm:text-sm">
        📣 Announcement
      </div>
      <p className="text-xs font-medium sm:text-sm">Introducing Marketplace</p>
      <ArrowRightIcon className="mr-1 h-3 w-3" />
      {/* <svg
        width="12"
        height="12"
        className="ml-1"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.78141 5.33312L5.20541 1.75712L6.14808 0.814453L11.3334 5.99979L6.14808 11.1851L5.20541 10.2425L8.78141 6.66645H0.666748V5.33312H8.78141Z"
          fill="hsl(var(--text-forground))"
        />
      </svg> */}
    </motion.a>
  );
}

function HeroTitles({
  heading,
  subHeading,
}: {
  heading: string[];
  subHeading: string;
}) {
  return (
    <div className="flex w-full max-w-3xl flex-col space-y-4 overflow-hidden pt-8">
      <motion.h1
        className="text-center text-4xl font-medium leading-tight text-foreground sm:text-5xl md:text-6xl"
        initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
          staggerChildren: 0.2,
        }}
      >
        {heading.map((text, index) => (
          <motion.span
            key={index}
            className="inline-block px-1 md:px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              ease,
            }}
          >
            {text}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        className="mx-auto max-w-2xl text-center text-lg leading-7 text-muted-foreground sm:text-xl sm:leading-9"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease,
        }}
      >
        {subHeading}
      </motion.p>
    </div>
  );
}

export function HeroCTA({ showBookCall }: { showBookCall?: boolean }) {
  return (
    <>
      <motion.div
        className="mx-auto mt-6 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:mt-10 sm:flex-row sm:space-x-4 sm:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease }}
      >
        {/* <Link
          href="/signup"
          className={cn(
            buttonVariants({ variant: "default" }),
            "group flex w-full gap-2 sm:w-auto",
          )}
        >
          Dashboard
          <ArrowRightIcon className="transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
        </Link> */}
        <GetStartedButton />
        {!!showBookCall && (
          <Link
            href="https://go.greencard.inc/evaluation"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "group flex gap-2 sm:w-auto",
            )}
          >
            {/* <Icons.logo className="h-6 w-6" /> */}
            <Phone className="h-4 w-4" />
            Book a Free Consultation
          </Link>
        )}
      </motion.div>
      {/* <motion.p
        className="mt-5 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        7 day free trial. No credit card required.
      </motion.p> */}
    </>
  );
}

function HeroImage() {
  return (
    <motion.div
      className="relative mx-auto flex w-full items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 1, ease }}
    >
      <HeroVideoDialog
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="/dashboard.png"
        thumbnailAlt="Hero Video"
        className="mt-16 max-w-screen-lg rounded-lg border shadow-lg"
      />
    </motion.div>
  );
}

export default function Hero({ v2 }: { v2?: boolean }) {
  return (
    <section className="relative overflow-hidden pb-20 pt-16" id="hero">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          priority={true}
          src="/liberty-bg.webp"
          alt="liberty"
          width={900}
          height={900}
          className="h-full w-full object-contain opacity-15 dark:opacity-10 dark:invert"
        />
      </div>
      <div className="relative z-10 flex w-full flex-col items-center justify-start px-4 pt-20 sm:px-6 sm:pt-24 md:pt-20 lg:px-8">
        <HeroPill />
        {!v2 && (
          <HeroTitles
            heading={["Your", "Green Card", "Dream,", "Now", "Within", "Reach"]}
            subHeading="Self-sponsor Your EB-1A Extraordinary Ability Green Card With AI-Powered
        Expertise"
          />
        )}
        {!!v2 && (
          <HeroTitles
            heading={["Your", "Trusted", "Partner", "In", "US", "Immigration"]}
            subHeading="From strategy to execution, we streamline every step of the immigration process - helping families, professionals, and businesses achieve their American dreams with confidence"
          />
        )}
        <HeroCTA showBookCall={true} />
        {/* <HeroImage /> */}
        {/* <div className="pointer-events-none absolute inset-x-0 -bottom-12 h-1/3 bg-gradient-to-t from-background via-background to-transparent lg:h-1/4"></div> */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-32 h-1/3 bg-gradient-to-t from-background via-background to-transparent lg:h-1/4"></div>
      </div>
    </section>
  );
}

export function HeroCopilot() {
  return (
    <section>
      <div className="relative flex w-full flex-col items-center justify-start px-4 pb-20 pt-32 sm:px-6 sm:pt-24 md:pt-32 lg:px-8">
        <HeroTitles
          heading={[
            "You're",
            "extraordinary.",
            "Let's make",
            "sure the world",
            "knows it.",
          ]}
          subHeading="Unlock expert guidance to build your EB-1A profile and secure your green card in the U.S."
        />
        <HeroCTA showBookCall={true} />
        {/* <HeroImage /> */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-12 h-1/3 bg-gradient-to-t from-background via-background to-transparent lg:h-1/4"></div>
      </div>
    </section>
  );
}
