import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Shield, Zap } from "lucide-react";
import { MoveDownLeft, MoveUpRight } from "lucide-react";

const problems = [
  {
    title: "EB1 Copilot – Guided Support",
    description:
      "Work side by side with our experts as you build your EB-1A profile. Our AI-powered workflows and accountability managers keep you on track while you take charge of your journey.",
    icon: Brain,
  },
  {
    title: "EB1 Autopilot – White Glove Solution",
    description:
      "Let us do the heavy lifting for you. From profile building to application submission, our team and technology take care of the process, ensuring a smooth path to your EB-1A green card",
    icon: Zap,
  },
];

export default function Component() {
  return (
    <Section
      id="introducing"
      title="Introducing"
      subtitle="Offerings that suites your Green card needs"
    >
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        {problems.map((problem, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="border border-y-0 border-l-8 border-primary  bg-background shadow-none">
              <CardContent className="space-y-4 p-6">
                {/* <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-primary" />
                </div> */}
                <h3 className="text-xl font-semibold">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
      {/* <Stats1 /> */}
    </Section>
  );
}

export const Stats1 = () => (
  <BlurFade delay={0.2 * 0.2} inView>
    <div className="w-full pt-20">
      <div className="container mx-auto">
        <div className="grid w-full grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="flex flex-col justify-between gap-0 rounded-md border p-6">
            <h2 className="font-regular flex max-w-xl flex-row items-end gap-4 text-left text-4xl tracking-tighter">
              500
            </h2>
            <p className="max-w-xl text-left text-base leading-relaxed tracking-tight text-muted-foreground">
              Monthly active users
            </p>
          </div>
          <div className="flex flex-col justify-between gap-0 rounded-md border p-6">
            <h2 className="font-regular flex max-w-xl flex-row items-end gap-4 text-left text-4xl tracking-tighter">
              20.105
            </h2>
            <p className="max-w-xl text-left text-base leading-relaxed tracking-tight text-muted-foreground">
              Daily active users
            </p>
          </div>
          <div className="flex flex-col justify-between gap-0 rounded-md border p-6">
            <h2 className="font-regular flex max-w-xl flex-row items-end gap-4 text-left text-4xl tracking-tighter">
              $523.520
            </h2>
            <p className="max-w-xl text-left text-base leading-relaxed tracking-tight text-muted-foreground">
              Monthly recurring revenue
            </p>
          </div>
          <div className="flex flex-col justify-between gap-0 rounded-md border p-6">
            <h2 className="font-regular flex max-w-xl flex-row items-end gap-4 text-left text-4xl tracking-tighter">
              $1052
            </h2>
            <p className="max-w-xl text-left text-base leading-relaxed tracking-tight text-muted-foreground">
              Cost per acquisition
            </p>
          </div>
        </div>
      </div>
    </div>
  </BlurFade>
);
