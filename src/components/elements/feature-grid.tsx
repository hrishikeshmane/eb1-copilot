import { cn } from "@/lib/utils";
import { IconCurrencyDollar, IconEaseInOut } from "@tabler/icons-react";
import { Handshake, Headset, Lock, Shield } from "lucide-react";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Professional Support",
      description:
        "Meet our dedicated team of immigration experts and innovators, committed to reshaping the EB-1A landscape with cutting-edge AI. Discover our journey and vision for revolutionizing immigration processes.",
      icon: <Shield />,
    },
    {
      title: "Ease of use",
      description:
        "Discover answers to common questions, demystifying the EB-1A journey and our AI-driven approach. Gain clarity on the process and learn how our innovative solutions can benefit you.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Pricing & Plans",
      description:
        "Explore transparent pricing options, tailored to suit your needs. From comprehensive packages to customizable plans, find the perfect solution for your EB-1A journey.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Contact",
      description:
        "Reach out to us through various channels; we're here to guide you every step of the way. Whether you have questions, need assistance, or are ready to begin your EB-1A journey, we're here to support you.",
      icon: <Headset />,
    },
    {
      title: "Trustworthy & Credible",
      description:
        "Your confidence matters; we're backed by expertise and results. With our 100% success rate and dedication to excellence, you can trust us to guide you towards your EB-1A success.",
      icon: <Handshake />,
    },
    {
      title: "Security",
      description:
        "Your data is sacred; we deploy robust measures to safeguard it. Rest assured that your information is protected with state-of-the-art encryption, ensuring your privacy and peace of mind.",
      icon: <Lock />,
    },
    // {
    //   title: "Money back guarantee",
    //   description:
    //     "If you donot like EveryAI, we will convince you to like us.",
    //   icon: <IconAdjustmentsBolt />,
    // },
    // {
    //   title: "And everything else",
    //   description: "I just ran out of copy ideas. Accept my sincere apologies",
    //   icon: <IconHeart />,
    // },
  ];
  return (
    <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "group/feature relative flex flex-col py-10 lg:border-r",
        (index === 0 || index === 3) && "lg:border-l",
        index < 3 && "lg:border-b",
      )}
    >
      {index < 3 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}
      {index >= 3 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-800 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}
      <div className="relative z-10 mb-4 px-10 text-primary">{icon}</div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-primary dark:bg-neutral-700" />
        <span className="inline-block text-neutral-100 transition duration-200 group-hover/feature:translate-x-2">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-neutral-300">
        {description}
      </p>
    </div>
  );
};
