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

export default function Component() {
  return (
    <Section
      title="Problem"
      subtitle="Don't Let Outdated Processes and Employer Dependence Hold You Back."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {problems.map((problem, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="bg-background border-none shadow-none">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-primary" />
                </div>
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
