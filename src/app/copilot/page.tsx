import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/elements/header";
import { HeroCopilot } from "@/components/sections/hero";
import CTA from "@/components/sections/cta";
import Footer from "@/components/elements/footer";
import FAQ from "@/components/sections/faq";
import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Timeline } from "@/components/elements/timeline";

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroCopilot />
        <ProgramOverview />
        <ProgramTimeline />

        <section className="w-full bg-gray-100 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Program Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                "Attorney Discount",
                "Profile Evaluation & Strategy Call ($499 value)",
                "Press Coverage in 5 outlets ($3,999 value)",
                "Dedicated Accountability Manager",
                "Progress Management Dashboard",
                "Lifetime Community Membership ($999 value)",
                "Access to Course Videos ($799 value)",
                "Sample Letters & Petitions",
                "Priority Support on Slack",
                "Bi-weekly Q&A Sessions",

                "Extraordinary Checklist",
                "Unlimited Access until EB-1A approval",
              ].map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center pb-0">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      {feature.split(":")[0]}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full  py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl tracking-tighter sm:text-4xl md:text-5xl">
              Meet Your Law Firm
            </h2>

            <div className="mx-auto flex w-full justify-center -space-x-10 py-10 rtl:space-x-reverse">
              <Image
                width={100}
                height={100}
                className="h-40 w-40 rounded-full border-2  object-contain dark:border-gray-800"
                src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/loadstone.jpg?raw=true"
                alt="Lodestone Legal"
              />
              <Image
                width={100}
                height={100}
                className="h-40 w-40 rounded-full border-2  object-cover dark:border-gray-800"
                src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/lawyers/allison.png?raw=true"
                alt="Allison Kranz"
              />
            </div>
            <div className="mx-auto max-w-4xl">
              <div>
                <h3 className="text-center text-lg font-semibold">
                  Lodestone Legal
                </h3>
                <p className="text-center text-lg">
                  A leading immigration law firm based out of Boston
                </p>
              </div>
              <div className="mt-6 text-center">
                <p className="mb-4">
                  Allison Kranz, the founder of Lodestone Legal, has spent her
                  career helping people navigate the complex U.S. immigration
                  system, particularly those in the tech and STEM fields. She's
                  worked with leading firms like Envoy Global, Ogletree, and
                  Kellogg, filing thousands of successful cases. Her deep
                  expertise makes her a go-to attorney for talented individuals
                  aiming for extraordinary visas, like the EB-1A.
                </p>
                <p>
                  As part of the EB-1A Copilot Program, you'll get exclusive
                  access to Allison and her team of lawyers — with a special
                  discount of up to <strong>$2,999</strong> on filing!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-gray-100 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl tracking-tighter sm:text-4xl md:text-5xl">
              Meet Your Mentors
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sunku Ranganath</CardTitle>
                  <CardDescription>Tech Entrepreneur</CardDescription>
                </CardHeader>
                <CardContent>
                  A tech entrepreneur with a background in engineering and
                  product development. He's led innovation at companies like
                  Oracle and Kinetica and knows firsthand how to navigate the
                  EB-1A process. Sunku will guide you in building a compelling
                  case for your visa.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Ankit Sirmoya</CardTitle>
                  <CardDescription>
                    AI Researcher & Senior Solutions Architect at AWS
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  A leading AI researcher and Senior Solutions Architect at AWS.
                  With deep expertise in machine learning and cloud
                  infrastructure, he's an EB-1A recipient who will help you
                  craft a strong profile for your visa application.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

export function ProgramOverview() {
  return (
    <div className="w-full bg-gray-100 py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <div className="flex flex-col  gap-4">
            <div className="flex flex-col gap-4">
              <h1 className="text-left text-4xl font-medium leading-tight text-foreground sm:text-4xl md:text-5xl">
                What is the EB-1A Copilot Program?
              </h1>
              <p className="max-w-md text-left text-lg leading-relaxed tracking-tight text-muted-foreground">
                The EB-1A Copilot Program is designed for talented immigrants in
                tech and STEM who are ready to take their shot at the
                extraordinary ability visa.
              </p>
              <p className="max-w-md text-left text-lg leading-relaxed tracking-tight text-muted-foreground">
                We know the process can feel overwhelming — we’ve been there.
                Our mission is to help extraordinary professionals build a
                standout profile that meets the stringent criteria of the EB-1A
                visa, a fast-track to securing a green card in the U.S.
              </p>
              <p className="max-w-md text-left text-lg leading-relaxed tracking-tight text-muted-foreground">
                Whether you’re an engineer, researcher, entrepreneur, or data
                scientist, the EB-1A Copilot Program is here to help you
                navigate this complex process!
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="relative aspect-square overflow-hidden rounded-md bg-card">
              <Image
                src="/engineer.jpg"
                alt="Entrepreneur"
                className="h-full w-full object-cover grayscale filter transition-all duration-300 hover:grayscale-0"
                width={300}
                height={300}
              />
            </div>
            <div className="relative row-span-2 overflow-hidden rounded-md bg-card">
              <Image
                src="/engineer2.jpg"
                alt="Engineer"
                className="h-full w-full object-cover grayscale filter transition-all duration-300 hover:grayscale-0"
                width={400}
                height={400}
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-md bg-card">
              <Image
                src="/researcher.jpg"
                alt="Researcher"
                className="h-full w-full object-cover grayscale filter transition-all duration-300 hover:grayscale-0"
                width={250}
                height={250}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProgramTimeline() {
  const data = [
    {
      title: "Onboarding",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            Once you sign up, you’ll submit key documents. Our AI model will
            generate a customized profile report with your next steps.
          </p>
          <div className="">
            <Image
              src="/GCI-Onboarding.gif"
              alt="startup template"
              width={500}
              height={500}
              className="h-30 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-96"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Personalized Dashboard & Community Access",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            Gain access to a personalized dashboard that tracks your progress
            and shares a program checklist with you.
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            Get immediate access to our library of resources, weekly group
            calls, and your accountability manager.
          </p>
          <div className="">
            <Image
              src="/GCI-dashboard.gif"
              alt="startup template"
              width={500}
              height={500}
              className="h-30 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-96"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Attorney Consult",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            30 days after starting, you’ll have a consult with our expert
            immigration attorney.
          </p>
          <div className="w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
            <div className="mx-auto flex w-full justify-center -space-x-10 py-10 rtl:space-x-reverse">
              <Image
                width={100}
                height={100}
                className="h-40 w-40 rounded-full border-2  object-contain dark:border-gray-800"
                src="https://lh6.googleusercontent.com/_iRIMt1wdzrCUndh8gGCqrNd8munYbsY0YyeYtL85M7Sh1-38AdTbTXYZPvsAOf_rHhP63_0jfx8aEe6wmLaVRmnjcAxO0ZiTNF7nBOHNdFwaGi3vWWeRgGxDtIbpw9EcQ=w1280"
                alt="Lodestone Legal"
              />
              <Image
                width={100}
                height={100}
                className="h-40 w-40 rounded-full border-2  object-cover dark:border-gray-800"
                src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/lawyers/allison.png?raw=true"
                alt="Allison Kranz"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Profile Development",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            We’ll refine your profile with strategic input from experts and
            attorneys.
          </p>
          <div className="">
            <Image
              src="/GCI-Builder.gif"
              alt="startup template"
              width={500}
              height={500}
              className="h-30 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-96"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Petition Filing",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            Once your profile is ready, we’ll connect you with an attorney to
            submit your EB-1A petition.
          </p>
          <div className="">
            <Image
              src="/GCI-PDF.gif"
              alt="startup template"
              width={500}
              height={500}
              className="h-30 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-96"
            />
          </div>
          {/* <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <Image
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div> */}
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
