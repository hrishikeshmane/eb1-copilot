import Features from "@/components/features-vertical";
import Section from "@/components/section";
import { Phone, Sparkles, Upload, Zap } from "lucide-react";

const data = [
  {
    id: 1,
    title: "1. Onboarding",
    content:
      "Start by completing our easy-to-follow questionnaire and securely upload your documents. Our platform ensures accountability and smooth integration for your existing evidence and evidence which you will be building with us, so you can kick off your EB-1A journey effortlessly.",
    image: "/dashboard.png",
    icon: <Upload className="h-5 w-5 text-primary" />,
  },
  {
    id: 2,
    title: "2. Setup a free consulation",
    content:
      "Schedule a free consultation call with our experts. During the call, we'll walk you through the process, discuss your qualifications, and guide you on how to best prepare for your EB-1A application.",
    image: "/builder-page.png",
    icon: <Phone className="h-5 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Build your EB-1A profile",
    content:
      "Use our platform’s intuitive tools to create a compelling EB-1A profile. Our professnial expert recommendations will guide you in organizing your achievements, helping you stay on track throughout the process.",
    image: "/tracker.png",
    icon: <Zap className="h-5 w-5 text-primary" />,
  },
];

// const data = [
//   {
//     id: 1,
//     title: "1. Onboarding",
//     content:
//       "Simply fill up our simple questionnaire and upload your data to our secure platform. We support various file formats and data types to ensure a seamless integration with your existing systems.",
//     image: "/dashboard.png",
//     icon: <Upload className="h-5 w-5 text-primary" />,
//   },
//   {
//     id: 2,
//     title: "2. Setup a Free call",
//     content:
//       "Our advanced AI algorithms automatically process and analyze your data, extracting valuable insights and patterns that would be difficult to identify manually.",
//     image: "/dashboard.png",
//     icon: <Phone className="h-5 w-6 text-primary" />,
//   },
//   {
//     id: 3,
//     title: "3. Build your EB-1A profile",
//     content:
//       "Receive clear, actionable insights and recommendations based on the AI analysis. Use these insights to make data-driven decisions and improve your business strategies.",
//     image: "/dashboard.png",
//     icon: <Zap className="h-5 w-5 text-primary" />,
//   },
// ];

export default function Component() {
  return (
    <Section title="How it works" subtitle="Just 3 steps to get started">
      <Features data={data} />
    </Section>
  );
}
