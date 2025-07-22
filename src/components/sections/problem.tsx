import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Brain,
  BriefcaseBusiness,
  Check,
  Clock,
  Shield,
  ShieldAlert,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "../ui/button";
import { FaChartColumn, FaDatabase } from "react-icons/fa6";
import Link from "next/link";

const problemsV2 = [
  {
    title: "O-1A Visa",
    description:
      "The O-1 visa has no cap, no degree requirement, and 15-day processing. With broad industry applicability, it’s a fast, flexible option for top professionals and entrepreneurs",
    // icon: Clock,
  },
  {
    title: "EB-2 NIW Visa",
    description:
      "The EB-2 NIW skips employer sponsorship and PERM, offering a self-petitioned path to a Green Card. Ideal for skilled professionals, researchers, and entrepreneurs driving national interest.",
    // icon: Clock,
  },
  {
    title: "EB-1A Visa",
    description:
      "The EB-1A offers a self-petitioned path to a Green Card with fastest processing and priority status. Ideal for new applicants and skilled professionals stuck in EB-2/EB-3 backlogs from 2014–2022.",
    // icon: Clock,
  },
];

const problems = [
  {
    title: "Decades-Long Wait Times",
    description:
      "Facing a green card backlog of over 100 years? Why wait a lifetime when you can fast-track your journey with EB1A?",
    icon: Clock,
  },
  {
    title: "Employer Dependency",
    description:
      "Tied to your employer for visa sponsorship? Break free from the limitations and take control of your immigration status with self-sponsorship.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Job Security Anxiety",
    description:
      "Visa stamping drama and layoff fears can jeopardize your stay in the U.S. Avoid the uncertainty by securing your green card with our expedited process.",
    icon: ShieldAlert,
  },
];

const tools = [
  {
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-yellow-200 bg-yellow-50 p-1 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-300">
        <FaChartColumn className="h-6 w-6" />
      </div>
    ),
    title: "Interactive Insights Dashboard",
    subtitle:
      "Visualize success rates across different criteria, industries, and nationalities. Identify which evidence categories carry the most weight in successful applications.",
    points: [
      "Success rate analysis by criteria",
      "Industry-specific trends",
      "Historical approval rate tracking",
    ],
    container: (
      <div className="rounded-md border border-yellow-200 bg-yellow-50 p-2 text-xs text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-300">
        Disclaimer: Our insights are continuously evolving. Some information may
        appear repetitive and represents trends across the entire dataset rather
        than specific individual cases. Results may vary for your unique
        situation.
      </div>
    ),
    button: (
      <Link href="https://www.visavibe.xyz/insights">
        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          Explore Insights <ArrowRight />
        </Button>
      </Link>
    ),
  },
  {
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50 p-1 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
        <FaDatabase className="h-6 w-6" />
      </div>
    ),
    title: "Comprehensive Case Database",
    subtitle:
      "Access our extensive database of AAO decisions with powerful search and filtering capabilities to find cases relevant to your specific situation.",
    points: [
      "Advanced search by criteria, industry, and outcome",
      "Exportable reports and summaries",
    ],
    container: (
      <div className="rounded-md border border-blue-200 bg-blue-50 p-2 text-xs text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
        Note: We used an advanced LLM to extract and tabulate relevant data from
        each AAO document, making complex legal information easily searchable
        and comparable.
      </div>
    ),
    button: (
      <Link href="https://www.visavibe.xyz/database">
        <Button className="w-full bg-violet-500 hover:bg-violet-600">
          Search Database <ArrowRight />
        </Button>
      </Link>
    ),
  },
  {
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-green-200 bg-green-50 p-1 text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-300">
        <Sparkles className="h-6 w-6" />
      </div>
    ),
    title: "Corrective RAG AI Case Analyzer",
    subtitle:
      "NEW! Corrective RAG AI Case Analyzer - Now Live! Our specialized Multi-Agent Corrective RAG is now ready! Are you curious about your chances at securing an EB1A visa? Our innovative tool is here to help you assess your profile effectively",
    points: [
      "USCIS Adjudicator Playbook 🏛️ - Insights into USCIS evaluation criteria and decision frameworks",
      "EB1A Mastermind Insights 🧠 - Expert strategies from successful applicants",
      "AAO Case Intelligence Matrix 📊 - Comparative data from historical case outcomes",
    ],
    button: (
      <Link href="https://www.greencard.inc/sign-in">
        <Button className="w-full bg-green-500 hover:bg-green-600">
          Sign In to Access <ArrowRight />
        </Button>
      </Link>
    ),
  },
];

export default function Component({ v2 }: { v2?: boolean }) {
  return (
    <Section
      title={v2 ? "TALENT VISA SOLUTIONS" : "Problem"}
      subtitle={
        v2
          ? "Your Talent Belongs In The US"
          : "Don't Let Outdated Processes and Employer Dependence Hold You Back."
      }
    >
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {!v2 &&
          problems.map((problem, index) => (
            <BlurFade key={index} delay={0.2 + index * 0.2} inView>
              <Card className="border-none bg-background shadow-none">
                <CardContent className="space-y-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <problem.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{problem.title}</h3>
                  <p className="text-muted-foreground">{problem.description}</p>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {tools.map((tool, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col items-start justify-between space-y-4 p-6">
                <div className="mb-12 flex flex-col items-start space-y-2">
                  {tool.icon}
                  <h3 className="text-xl font-semibold">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tool.subtitle}
                  </p>
                  {tool.container}
                </div>
                <div className="flex w-full flex-col gap-y-6">
                  <ul className="flex flex-col space-y-2 text-sm text-muted-foreground">
                    {tool.points.map((point, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-6 w-6 shrink-0 rounded-full border border-primary/10 bg-primary/10 p-1 text-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  {tool.button}
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {!!v2 &&
          problemsV2.map((problem, index) => (
            <BlurFade key={index} delay={0.2 + index * 0.2} inView>
              <Card className="border-none bg-background shadow-none">
                <CardContent className="space-y-4 p-6">
                  <h3 className="text-xl font-semibold">{problem.title}</h3>
                  <p className="text-muted-foreground">{problem.description}</p>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
      </div>
    </Section>
  );
}
