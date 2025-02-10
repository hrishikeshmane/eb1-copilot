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

const dataV2 = [
  {
    id: 1,
    title: "Profile Building & Career Positioning",
    subtitle: "GCI",
    content: [
      {
        title: "Eligibility Check",
        description:
          "Confirm you already meet at least one or two core talent visa criteria (e.g., high remuneration or a leading/critical role).",
      },
      {
        title: "Criteria Fulfillment",
        description:
          "GCI provides a step-by-step plan to help you meet additional talent visa requirements- Judging Roles, Authorship, Original Contributions, Press Coverage, Prestigious Memberships. ",
        // bullets: [
        //   "Judging Roles: Evaluate projects at hackathons, join editorial boards, or serve as an awards judge.",
        //   "Authorship: Publish in peer-reviewed journals, industry platforms, and white papers/reports.",
        //   "Original Contributions: File patents, secure licensing deals, speak at major conferences, or offer pro-bono consulting.",
        //   "Press Coverage: Gain exposure in recognized media outlets",
        //   "Prestigious Memberships: Obtain professional society memberships or join invitation-only councils",
        // ],
      },
      {
        title: "Personal Branding & Networking",
        description:
          "Strengthen your public profile, highlight leadership, and build a robust network.",
      },
    ],
    colSpan: 1,
    icon: <Upload className="h-5 w-5 text-primary" />,
  },
  {
    id: 2,
    title: "Evidence Curation & Narrative Development",
    subtitle: "GCI",
    content: [
      {
        title: "Document Collection",
        description:
          "Strategically compile proofs of achievements—such as published research, patents, judging invitations, and media coverage.",
      },
      {
        title: "Compelling Story",
        description:
          "Craft a persuasive narrative that underscores your expertise and impacts in your field.",
      },
      {
        title: "Employer/Sponsor Guidance",
        description:
          "Integrate details about your employer or sponsor to bolster your case.",
      },
    ],
    icon: <Phone className="h-5 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "Legal Strategy & Petition Preparation",
    subtitle: "Lodestone Legal",
    content: [
      {
        title: "Initial Consultation",
        description:
          "Determine the best talent visa category and legal approach with an immigration attorney.",
      },
      {
        title: "Case Strategy & Drafting",
        description:
          "Develop strong legal arguments, compile affidavits, and gather supporting materials.",
      },
      {
        title: "Form Completion",
        description:
          "Prepare the necessary USCIS/Department of State documents accurately and in full compliance.",
      },
    ],
    icon: <Zap className="h-5 w-5 text-primary" />,
  },
  {
    id: 4,
    title: "Filing & Government Interactions",
    subtitle: "Lodestone Legal",
    content: [
      {
        title: "Application Submission",
        description:
          "Finalize signatures, compile all required documentation, and file your petition.",
      },
      {
        title: "Case Tracking & Updates",
        description:
          "Monitor application status, manage government communication, and provide regular progress reports.",
      },
      {
        title: "Interview & RFE Support",
        description:
          "Prepare for interviews and address any Requests for Evidence (RFE) in a timely manner.",
      },
    ],
    icon: <Zap className="h-5 w-5 text-primary" />,
  },
];

const FeaturesBentoGrid = ({ data }: { data: any[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {data.map((item) => (
        <div
          key={item.id}
          className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm ${
            item.colSpan === 2 ? "col-span-2" : "col-span-1"
          }`}
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary/30 text-lg text-primary">
              {/* {item.icon} */}
              {item.id}
            </span>
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.subtitle}</p>
            </div>
          </div>
          <div className="space-y-4">
            {item.content.map((section: any, index: number) => (
              <div key={index} className="space-y-2">
                <h4 className="text-base font-medium">{section.title}</h4>
                <p className="text-sm text-gray-600">{section.description}</p>
                {section.bullets && (
                  <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                    {section.bullets.map(
                      (bullet: string, bulletIndex: number) => (
                        <li key={bulletIndex}>{bullet}</li>
                      ),
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Component({ v2 }: { v2?: boolean }) {
  return (
    <Section
      title={v2 ? "FOUR-STEP JOURNEY" : "How it works"}
      subtitle={v2 ? "How It Works" : "Just 3 steps to get started"}
    >
      {!v2 && <Features data={data} />}
      {!!v2 && <FeaturesBentoGrid data={dataV2} />}
    </Section>
  );
}
