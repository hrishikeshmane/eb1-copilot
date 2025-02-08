import Features from "@/components/features-horizontal";
import Section from "@/components/section";
import { IconEaseInOut } from "@tabler/icons-react";
import {
  BarChart3,
  Brain,
  FileIcon,
  FileText,
  Kanban,
  LineChart,
  LucideUserRoundCog,
} from "lucide-react";
import { component } from "sanity/structure";
import { cn } from "@/lib/utils";

const dataV2 = [
  {
    id: 1,
    title: "Profile Building & Career Positioning",
    content: "GCI",
    component: (
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Eligibility Check</h4>
          <p className="text-muted-foreground">
            Confirm you already meet at least one or two core talent visa
            criteria (e.g., high remuneration or a leading/critical role).
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Criteria Fulfillment</h4>
          <p className="mb-2 text-muted-foreground">
            GCI provides a step-by-step plan to help you meet additional talent
            visa requirements:
          </p>
          <ul className=" space-y-2 pl-6 text-muted-foreground">
            <li>
              Judging Roles: Evaluate projects at hackathons, join editorial
              boards, or serve as an awards judge.
            </li>
            <li>
              Authorship: Publish in peer-reviewed journals, industry platforms,
              and white papers/reports.
            </li>
            <li>
              Original Contributions: File patents, secure licensing deals,
              speak at major conferences, or offer pro-bono consulting.
            </li>
            <li>Press Coverage: Gain exposure in recognized media outlets</li>
            <li>
              Prestigious Memberships: Obtain professional society memberships
              or join invitation-only councils
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">
            Personal Branding & Networking
          </h4>
          <p className="text-muted-foreground">
            Strengthen your public profile, highlight leadership, and build a
            robust network.
          </p>
        </div>
      </div>
    ),
    icon: <LucideUserRoundCog className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: "Evidence Curation & Narrative Development",
    content: "GCI",
    component: (
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Document Collection</h4>
          <p className="text-muted-foreground">
            Strategically compile proofs of achievements—such as published
            research, patents, judging invitations, and media coverage.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Compelling Story</h4>
          <p className="text-muted-foreground">
            Craft a persuasive narrative that underscores your expertise and
            impacts in your field.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Employer/Sponsor Guidance</h4>
          <p className="text-muted-foreground">
            Integrate details about your employer or sponsor to bolster your
            case.
          </p>
        </div>
      </div>
    ),
    icon: <FileIcon className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "Legal Strategy & Petition Preparation",
    content: "Lodestone Legal",
    component: (
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Initial Consultation</h4>
          <p className="text-muted-foreground">
            Determine the best talent visa category and legal approach with an
            immigration attorney.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Case Strategy & Drafting</h4>
          <p className="text-muted-foreground">
            Develop strong legal arguments, compile affidavits, and gather
            supporting materials.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Form Completion</h4>
          <p className="text-muted-foreground">
            Prepare the necessary USCIS/Department of State documents accurately
            and in full compliance.
          </p>
        </div>
      </div>
    ),
    icon: <Kanban className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: "Filing & Government Interactions",
    content: "Lodestone Legal",
    component: (
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Application Submission</h4>
          <p className="text-muted-foreground">
            Finalize signatures, compile all required documentation, and file
            your petition.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Case Tracking & Updates</h4>
          <p className="text-muted-foreground">
            Monitor application status, manage government communication, and
            provide regular progress reports.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Interview & RFE Support</h4>
          <p className="text-muted-foreground">
            Prepare for interviews and address any Requests for Evidence (RFE)
            in a timely manner.
          </p>
        </div>
      </div>
    ),
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
];

export default function Component({ v2 }: { v2?: boolean }) {
  return (
    <Section
      title={v2 ? "FOUR-STEP JOURNEY" : "How it works"}
      subtitle={v2 ? "How It Works" : "Just 3 steps to get started"}
    >
      <Features
        collapseDelay={v2 ? 5000 : 25000}
        linePosition="bottom"
        data={v2 ? dataV2 : data}
      />
    </Section>
  );
}
