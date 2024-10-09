import Features from "@/components/features-horizontal";
import Section from "@/components/section";
import { IconEaseInOut } from "@tabler/icons-react";
import { BarChart3, Brain, FileText, Kanban, LineChart } from "lucide-react";

const data = [
  {
    id: 1,
    title: "Seamless Onboarding",
    content: "Answer a few questions and book your consultation.",
    image:
      "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/GCI/GCI-Onboarding.gif?raw=true",
    icon: <IconEaseInOut className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: "AI Powered Dashboard",
    content: "All your EB1 application needs in one smart dashboard.",
    image:
      "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/GCI/GCI-dashboard.gif?raw=true",
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "Profile Builder",
    content: "Easily build and track your profile’s progress.",
    image:
      "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/GCI/GCI-Builder.gif?raw=true",
    icon: <Kanban className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: "Automated Report",
    content: "Generate comprehensive report of your profile with one click.",
    image:
      "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/GCI/GCI-PDF.gif?raw=true",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="Features" subtitle="User Flows and Navigational Structures">
      <Features collapseDelay={25000} linePosition="bottom" data={data} />
    </Section>
  );
}
