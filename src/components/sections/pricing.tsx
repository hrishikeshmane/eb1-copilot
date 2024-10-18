"use client";

import Section from "@/components/section";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { siteConfig } from "@/lib/config";
import useWindowSize from "@/lib/hooks/use-window-size";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function PricingSection() {
  // const [isMonthly, setIsMonthly] = useState(true);
  const { isDesktop } = useWindowSize();

  // const handleToggle = () => {
  //   setIsMonthly(!isMonthly);
  // };

  return (
    <Section
      title="Pricing"
      subtitle="Choose the plan that's right for you"
      description="Flexible payment plans"
    >
      {/* <div className="mb-10 flex justify-center">
        <span className="mr-2 font-semibold">Monthly</span>
        <label className="relative inline-flex cursor-pointer items-center">
          <Label>
            <Switch checked={!isMonthly} onCheckedChange={handleToggle} />
          </Label>
        </label>
        <span className="ml-2 font-semibold">Yearly</span>
      </div> */}
      <div className="sm:2 mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {siteConfig.pricing.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: 0,
                    opacity: 1,
                    x:
                      index === siteConfig.pricing.length - 1
                        ? -30
                        : index === 0
                          ? 30
                          : 0,
                    scale:
                      index === 0 || index === siteConfig.pricing.length - 1
                        ? 0.94
                        : 1.0,
                  }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `relative rounded-2xl border-[1px] bg-background p-6 text-center lg:flex lg:flex-col lg:justify-center`,
              plan.isPopular ? "border-[2px] border-primary" : "border-border",
              index === 0 || index === siteConfig.pricing.length - 1
                ? "-translate-z-[50px] rotate-y-[10deg] z-0 translate-x-0 translate-y-0 transform"
                : "z-10",
              index === 0 && "origin-right",
              index === siteConfig.pricing.length - 1 && "origin-left",
            )}
          >
            {plan.isPopular && (
              <div className="absolute right-0 top-0 flex items-center rounded-bl-xl rounded-tr-xl bg-primary px-2 py-0.5">
                <FaStar className="text-white" />
                <span className="ml-1 font-sans font-semibold text-white">
                  Popular
                </span>
              </div>
            )}
            <div>
              <p className="text-base font-semibold text-muted-foreground">
                {plan.name}
              </p>
              <p className="mt-6 flex items-center justify-center gap-x-2">
                <span className="mb-2 text-4xl font-bold tracking-tight text-foreground">
                  {/* {isMonthly ? plan.price : plan.yearlyPrice} */}
                  {plan.slashPrice ? (
                    <>
                      <del className="text-muted-foreground">
                        {plan.slashPrice}
                      </del>{" "}
                      {plan.price}
                    </>
                  ) : (
                    <>{plan.price}</>
                  )}
                </span>
                {/* {plan.period !== "Next 3 months" && (
                  <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                  / {plan.period}
                  </span>
                  )} */}
              </p>
              <span className="text-primary">{plan.offer}</span>

              {/* <p className="text-xs leading-5 text-muted-foreground">
                {isMonthly ? "billed monthly" : "billed annually"}
              </p> */}

              <ul className="mt-5 flex flex-col gap-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-left">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="my-4 w-full" />

              <Link
                href={plan.href}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                  "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:bg-primary hover:text-white hover:ring-2 hover:ring-primary hover:ring-offset-1",
                  plan.isPopular
                    ? "bg-primary text-white"
                    : "bg-white text-black",
                )}
              >
                {plan.buttonText}
              </Link>
              <p className="mt-6 text-xs leading-5 text-muted-foreground">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      {siteConfig.banner.visible && (
        <div className="mt-[4rem] flex flex-col items-center gap-4 rounded-2xl bg-primary p-8 font-semibold text-primary-foreground md:m-12 md:flex-row">
          <h3 className="text-center text-xl md:text-left">
            {siteConfig.banner.title}
          </h3>
          <Button
            className="text-lg font-semibold md:ml-auto"
            size={"lg"}
            variant={"secondary"}
          >
            {siteConfig.banner.buttonText}
          </Button>
        </div>
      )}
    </Section>
  );
}
