"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "./bento-grid-prim";

export function LandingBentoGrid() {
  return (
    <BentoGrid className="mx-w-4xl mx-6 my-8 md:max-w-6xl md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl border border-transparent bg-neutral-100  bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:border-white/[0.2] dark:bg-black dark:bg-dot-white/[0.2]"></div>
);

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 2,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]"
    >
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-full border border-neutral-100  bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-r from-[#23d5ab] to-[#D9F522]" />
        <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-neutral-900" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="ml-auto flex w-3/4 flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-neutral-900" />
        <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-r from-[#23d5ab] to-[#D9F522]" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-r from-[#23d5ab] to-[#D9F522]" />
        <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-neutral-900" />
      </motion.div>
    </motion.div>
  );
};
const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex h-4 w-full flex-row items-center space-x-2 rounded-full  border border-neutral-100 bg-neutral-100 p-2 dark:border-white/[0.2] dark:bg-black"
        ></motion.div>
      ))}
    </motion.div>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 rounded-lg bg-dot-black/[0.2] dark:bg-dot-white/[0.2]"
      style={{
        background: "linear-gradient(-45deg,#D9F522,  #23d5ab,  #0c2521  )",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};
const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex h-full min-h-[6rem] w-full flex-1 flex-row space-x-2 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]"
    >
      <motion.div
        variants={first}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black"
      >
        <p className="mt-4 text-center text-xs font-semibold text-neutral-500 sm:text-sm">
          Streamlining your <br />
          initial setup
        </p>
        <p className="mt-4 rounded-full border border-red-500 bg-red-100 px-2 py-0.5 text-xs text-red-600 dark:bg-red-900/20">
          Onboarding
        </p>
      </motion.div>
      <motion.div className="relative z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black">
        <p className="mt-4 text-center text-xs font-semibold text-neutral-500 sm:text-sm">
          Keeping track of your <br /> profile progress
        </p>
        <p className="mx-auto mt-4 rounded-full border border-green-500 bg-green-100 px-2 py-0.5 text-center text-xs text-green-600 dark:bg-green-900/20">
          Profile Tracker
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black"
      >
        <p className="mt-4 text-center text-xs font-semibold text-neutral-500 sm:text-sm">
          Creating an impressive
          <br /> and customized profile
        </p>
        <p className="mx-auto mt-4 rounded-full border border-orange-500 bg-orange-100 px-2 py-0.5 text-center text-xs text-orange-600 dark:bg-orange-900/20">
          Profile Builder
        </p>
      </motion.div>
    </motion.div>
  );
};
const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]"
    >
      <motion.div
        variants={variants}
        className="flex flex-row items-start space-x-2 rounded-2xl border border-neutral-100  bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <p className="text-xs text-neutral-500">
          Considering my qualifications, what are the chances of success with my
          EB-1A petition?
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="ml-auto flex w-2/3 flex-row items-center justify-end space-x-2 rounded-2xl border border-neutral-100 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <p className="ml-1 text-xs text-neutral-500">
          Zero if you don&apos;t book our free consultation
        </p>
        <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-r from-[#23d5ab] to-[#D9F522]" />
      </motion.div>
    </motion.div>
  );
};
const items = [
  {
    title: "Generative AI Tailored Guidance",
    description: (
      <span className="text-sm">
        Our AI crafts personalized narratives, magnifying your achievements for
        an irresistible application that captivates immigration officials.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
  },
  {
    title: "Automated Proofreading",
    description: (
      <span className="text-sm">
        Let AI handle the proofreading of your documents to ensure USCIS
        compliance
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
  },
  {
    title: "Contextual Suggestions",
    description: (
      <span className="text-sm">
        Get AI-powered suggestions based on your professional background and
        accomplishments
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
  },
  {
    title: "End-to-End Automation",
    description: (
      <span className="text-sm">
        Kiss paperwork woes goodbye! Our AI tirelessly handles the grunt work,
        from evidence gathering to form completion, leaving you free to focus on
        showcasing your talents.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
  },

  {
    title: "Expert Legal Review",
    description: (
      <span className="text-sm">
        Our team of seasoned immigration specialists meticulously oversees every
        detail, ensuring perfection and maximizing your approval chances.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
  },
];
