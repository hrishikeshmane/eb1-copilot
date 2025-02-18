"use client";

import FlickeringGrid from "@/components/magicui/flickering-grid";
import Ripple from "@/components/magicui/ripple";
import Safari from "@/components/safari";
import Section from "@/components/section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Marquee from "../magicui/marquee";
import { FileTextIcon } from "@radix-ui/react-icons";
import { MdSecurity } from "react-icons/md";
import Image from "next/image";

const files = [
  {
    name: "bitcoin.pdf",
    body: "Can we do volunteer work with for profit organization on OPT?",
  },
  {
    name: "finances.xlsx",
    body: "Finding a lawyer for O1-A and EB-1A",
  },
  {
    name: "logo.svg",
    body: "Looking for collaborators for evaluation research paper",
  },
  {
    name: "keys.gpg",
    body: "Incorporating a company on H-4 visa",
  },
  {
    name: "seed.txt",
    body: "Seeking advice on what type of company I should set up.",
  },
  {
    name: "",
    body: "After getting O1, Is it possible to switch to H1B in my own company, so that my spouse can work on H4 visa?",
  },
];

const features = [
  {
    title: "Professional Support",
    description:
      "Meet our dedicated team of immigration experts and innovators, committed to reshaping the EB-1A landscape with cutting-edge AI. Discover our journey and vision for revolutionizing immigration processes.",
    className: "hover:bg-red-500/10 transition-all duration-500 ease-out",
    content: (
      <>
        {/* <Image
          src="https://raw.githubusercontent.com/hrishikeshmane/unshackled-asstets/main/community/bento-1.webp"
          width={250}
          height={250}
          alt="Free Profile Evaluation"
          className="transition duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] group-hover:scale-105 "
        /> */}
        {/* <Safari
          src={`/dashboard.png`}
          url="https://greencard.inc"
          className="-mb-32 mt-4 max-h-64 w-full select-none px-4 drop-shadow-[0_0_28px_rgba(0,0,0,.1)] transition-all duration-300 group-hover:translate-y-[-10px]"
        /> */}
      </>
    ),
  },
  {
    title: "Secure Data Handling",
    description:
      "We prioritize your data security with state-of-the-art encryption and strict privacy protocols, ensuring your information remains confidential.",
    className:
      "order-3 xl:order-none hover:bg-blue-500/10 transition-all duration-500 ease-out",
    content: (
      // <Safari
      //   src={`/dashboard.png`}
      //   url="https://greencard.inc"
      //   className="-mb-32 mt-4 max-h-64 w-full select-none px-4 drop-shadow-[0_0_28px_rgba(0,0,0,.1)] transition-all duration-300 group-hover:translate-y-[-10px]"
      // />
      <Marquee
        reverse
        pauseOnHover
        className="absolute bottom-0 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex items-center justify-center py-10">
              <MdSecurity className="h-10 w-10 text-gray-500" />
            </div>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    title: "Seamless Integration",
    description:
      "Easily integrate our AI solutions into your existing workflows and systems for a smooth and efficient operation.",
    className:
      "md:row-span-2 hover:bg-orange-500/10 transition-all duration-500 ease-out",
    content: (
      <>
        <FlickeringGrid
          className="absolute inset-0 z-0 [mask:radial-gradient(circle_at_center,#fff_400px,transparent_0)]"
          squareSize={4}
          gridGap={6}
          color="#000"
          maxOpacity={0.1}
          flickerChance={0.1}
          height={800}
          width={800}
        />
        <Safari
          src={`/builder-page.png`}
          url="https://greencard.inc"
          className="-mb-48 ml-12 mt-16 h-full select-none px-4 drop-shadow-[0_0_28px_rgba(0,0,0,.1)] transition-all duration-300 group-hover:translate-x-[-10px]"
        />
      </>
    ),
  },
  {
    title: "Personalised AI Assistant",
    description:
      "Tailored AI Assistant to your specific profile with flexible customization options, allowing you to get the most out of our platform.",
    className:
      "flex-row order-4 md:col-span-2 md:flex-row xl:order-none hover:bg-green-500/10 transition-all duration-500 ease-out",
    content: (
      <>
        <Ripple className="absolute -bottom-full" />
        <Safari
          height={500}
          // width={500}
          src={`/chat-zoom.png`}
          url="https://greencard.inc"
          className="-mb-32 mt-4 max-h-64 w-full select-none px-4 drop-shadow-[0_0_28px_rgba(0,0,0,.1)] transition-all duration-300 group-hover:translate-y-[-10px]"
        />
      </>
    ),
  },
];

const featuresV2 = [
  {
    title: "Structured Roadmap",
    description:
      "GCI provides a structured, step-by-step roadmap to help applicants secure IP, publications, and industry recognition, ensuring they meet or exceed standards for talent visas.",
    className: "hover:bg-red-500/10 transition-all duration-500 ease-out",
    content: (
      <>
        {/* <Image
          src="https://raw.githubusercontent.com/hrishikeshmane/unshackled-asstets/main/community/bento-1.webp"
          width={250}
          height={250}
          alt="Free Profile Evaluation"
          className="transition duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] group-hover:scale-105 "
        /> */}
        {/* <Safari
          src={`/dashboard.png`}
          url="https://greencard.inc"
          className="-mb-32 mt-4 max-h-64 w-full select-none px-4 drop-shadow-[0_0_28px_rgba(0,0,0,.1)] transition-all duration-300 group-hover:translate-y-[-10px]"
        /> */}
      </>
    ),
  },
  {
    title: "Attorney Support",
    description:
      "GCI partners with attorneys to provide legal support from day one, ensuring USCIS responses are addressed effectively and petitions align with evolving adjudication standards.",
    className:
      "order-3 xl:order-none hover:bg-blue-500/10 transition-all duration-500 ease-out",
    content: (
      // <Safari
      //   src={`/dashboard.png`}
      //   url="https://greencard.inc"
      //   className="-mb-32 mt-4 max-h-64 w-full select-none px-4 drop-shadow-[0_0_28px_rgba(0,0,0,.1)] transition-all duration-300 group-hover:translate-y-[-10px]"
      // />
      <Marquee
        reverse
        pauseOnHover
        className="absolute bottom-0 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex items-center justify-center py-10">
              <MdSecurity className="h-10 w-10 text-gray-500" />
            </div>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    title: "AI Driven Approach",
    description:
      "AI analyzes applicant profiles, benchmarks achievements against visa criteria, assigns action items, and tracks progress in meeting talent visa eligibility requirements.",
    className:
      "md:row-span-2 hover:bg-orange-500/10 transition-all duration-500 ease-out",
    content: (
      <>
        <FlickeringGrid
          className="absolute inset-0 z-0 [mask:radial-gradient(circle_at_center,#fff_400px,transparent_0)]"
          squareSize={4}
          gridGap={6}
          color="#000"
          maxOpacity={0.1}
          flickerChance={0.1}
          height={800}
          width={800}
        />
        <Safari
          src={`/builder-page.png`}
          url="https://greencard.inc"
          className="-mb-48 ml-12 mt-16 h-full select-none px-4 drop-shadow-[0_0_28px_rgba(0,0,0,.1)] transition-all duration-300 group-hover:translate-x-[-10px]"
        />
      </>
    ),
  },
  {
    title: "Personalized Support Assistant",
    description:
      "Each applicant receives dedicated support from a research lead, program lead, and attorney to optimize their profile. GCI has extensive experience supporting applicants who have never published before, guiding them through every step of the process.",
    className:
      "flex-row order-4 md:col-span-2 md:flex-row xl:order-none hover:bg-green-500/10 transition-all duration-500 ease-out",
    content: (
      <>
        <Ripple className="absolute -bottom-full" />
        <Safari
          height={500}
          // width={500}
          src={`/chat-zoom.png`}
          url="https://greencard.inc"
          className="-mb-32 mt-4 max-h-64 w-full select-none px-4 drop-shadow-[0_0_28px_rgba(0,0,0,.1)] transition-all duration-300 group-hover:translate-y-[-10px]"
        />
      </>
    ),
  },
];

export default function Component({ v2 }: { v2?: boolean }) {
  const showcase = v2 ? featuresV2 : features;

  return (
    <Section
      title={v2 ? "STREAMLINED PROCESS" : "Solution"}
      subtitle={v2 ? "What You Get With GCI" : "Empower Your American Dream"}
      description={
        v2
          ? "We analyze your profile, help you qualify for talent visas, and support you every step of the way "
          : "We analyze your profile and streamline application processes, empowering you to qualify for the EB1-A Green Card and secure your future in the U.S."
      }
      className="bg-neutral-100 dark:bg-neutral-900"
    >
      <div className="mx-auto mt-16 grid max-w-sm grid-cols-1 gap-6 text-gray-500 md:max-w-3xl md:grid-cols-2 md:grid-rows-3 xl:max-w-6xl xl:auto-rows-fr xl:grid-cols-3 xl:grid-rows-2">
        {showcase.map((feature, index) => (
          <motion.div
            key={index}
            className={cn(
              "group relative items-start overflow-hidden rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-800",
              feature.className,
            )}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="mb-2 font-semibold text-primary">
                {feature.title}
              </h3>
              <p className="text-foreground">{feature.description}</p>
            </div>
            {feature.content}
            <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-neutral-50 dark:from-neutral-900"></div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
