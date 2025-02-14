import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  BriefcaseBusiness,
  Clock,
  Shield,
  ShieldAlert,
  Zap,
} from "lucide-react";

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
