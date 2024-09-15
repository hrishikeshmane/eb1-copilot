import { Icons } from "@/components/icons";
import { Linkedin } from "lucide-react";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Greencard Inc",
  description:
    "Your one-stop shop to Secure your Green Card with AI-Powered Expertise",
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_APP_URL!,
  keywords: ["SaaS", "Template", "Next.js", "React", "Tailwind CSS"],
  links: {
    email: "hello@greencard.inc",
    twitter: "https://twitter.com/magicuidesign",
    Linkedin: "https://discord.gg/87p2vpsat5",
    instagram: "https://instagram.com/magicuidesign/",
  },
  header: [
    {
      trigger: "Features",
      content: {
        main: {
          icon: <Icons.logo className="h-6 w-6" />,
          title: "AI-Powered Automation",
          description: "Streamline your workflow with intelligent automation.",
          href: "#",
        },
        items: [
          {
            href: "#",
            title: "Task Automation",
            description: "Automate repetitive tasks and save time.",
          },
          {
            href: "#",
            title: "Workflow Optimization",
            description: "Optimize your processes with AI-driven insights.",
          },
          {
            href: "#",
            title: "Intelligent Scheduling",
            description: "AI-powered scheduling for maximum efficiency.",
          },
        ],
      },
    },
    {
      trigger: "Solutions",
      content: {
        items: [
          {
            title: "For Small Businesses",
            href: "#",
            description: "Tailored automation solutions for growing companies.",
          },
          {
            title: "Enterprise",
            href: "#",
            description: "Scalable AI automation for large organizations.",
          },
          {
            title: "Developers",
            href: "#",
            description: "API access and integration tools for developers.",
          },
          {
            title: "Healthcare",
            href: "#",
            description: "Specialized automation for healthcare workflows.",
          },
          {
            title: "Finance",
            href: "#",
            description: "AI-driven process automation for financial services.",
          },
          {
            title: "Education",
            href: "#",
            description:
              "Streamline administrative tasks in educational institutions.",
          },
        ],
      },
    },
    {
      href: "/blog",
      label: "Blog",
    },
  ],
  pricing: [
    {
      name: "EB1 Copilot",
      href: "#",
      price: "$15,000",
      period: "One Time",
      // yearlyPrice: "$16",
      features: [
        "1 User",
        "5GB Storage",
        "Basic Support",
        "Limited API Access",
        "Standard Analytics",
      ],
      description: "Perfect for individuals and small projects",
      buttonText: "Enroll Now",
      isPopular: false,
    },
    {
      name: "EB1 Autopilot",
      href: "#",
      price: "$30,000",
      period: "One Time",
      // yearlyPrice: "$40",
      features: [
        "5 Users",
        "50GB Storage",
        "Priority Support",
        "Full API Access",
        "Advanced Analytics",
      ],
      description: "Ideal for growing businesses and teams",
      buttonText: "Enroll Now",
      isPopular: true,
    },
    {
      name: "ENTERPRISE",
      href: "#",
      price: "Custom",
      period: "month",
      yearlyPrice: "$82",
      features: [
        "Unlimited Users",
        "500GB Storage",
        "24/7 Premium Support",
        "Custom Integrations",
        "AI-Powered Insights",
      ],
      description: "For large-scale operations and high-volume users",
      buttonText: "Contact Us",
      isPopular: false,
    },
  ],
  faqs: [
    {
      question: "Is this fraud? Is this a hacking tool?",
      answer: (
        <>
          <p>
            Rest assured, it’s neither of those. If you’re looking to manipulate
            or exploit any immigration system, this product isn’t for you.
          </p>
          <p>
            Our product is designed to systematically assist you in enhancing
            your profile by recognizing, amplifying, and utilizing all your past
            and present work, along with the opportunities available to you.
          </p>
        </>
      ),
    },
    {
      question: "When should I start?",
      answer: (
        <>
          <p>The best time is right now, and here’s why… </p>

          <p>
            We empower you to identify, cultivate, and utilize every opportunity
            around you to strengthen your case and enhance your eligibility,
            irrespective of whether you’re a professional or a student.
          </p>

          <p>
            Delaying means missing out on opportunities. Moreover, the primary
            objective of this endeavor is to save time. The earlier you begin,
            the more time you’ll have to construct an impressive profile.
          </p>

          <p>
            If you’re worried about the H-1B lottery, a robust profile like this
            can also aid in qualifying for the O-1A, which is merit-based and
            doesn’t rely on lottery luck.
          </p>

          <p>
            If you’re already in the EB-2 or EB-3 process, this won’t interfere
            at all. In fact, you’ll be able to use the same priority date for
            the EB-1A, accelerating your green card acquisition.
          </p>

          <p>
            Regarding location, you can be anywhere globally. Your significant
            work and the recognition you earn are what truly count. Many people
            apply for the EB-1A and O-1A from outside the US each year and
            relocate to the US under this status.
          </p>
        </>
      ),
    },
    {
      question:
        "Can individuals without advanced degrees or extraordinary awards qualify for EB-1A?",
      answer: (
        <>
          <p>
            They can, and they have. You don’t need a Ph.D., a Nobel Prize, an
            Oscar, or any such accolades to qualify for an EB-1A.
          </p>

          <p>
            Instead, you’re required to show extraordinary ability through
            contributing to your field and by meeting 3 out of 10 criteria.
            We’ve seen everyone from top engineers to product leaders to
            founders get the EB-1A. There’s a good chance you already meet a few
            criteria without knowing about it.
          </p>

          <p>
            Using our tool and with your diligent effort, it’s a matter of time
            before you’re able to meet the ‘extraordinary ability’ criteria for
            the Green Card.
          </p>
        </>
      ),
    },
    {
      question: "Can this product also help prepare for the O-1A?",
      answer: (
        <>
          <p>Indeed!</p>
          <p>
            The criteria for evidence for both EB-1A and O-1A are alike, but
            securing an O-1A doesn’t assure an EB-1A. It’s generally understood
            that the EB-1A demands a higher standard of proof compared to the
            O-1A.
          </p>
          <p>
            In essence, if you met the qualifications for the EB-1A, you would
            likely also qualify for the O-1A. This means you would have an
            alternative to the unpredictable H-1B lottery and wouldn’t be solely
            reliant on it.
          </p>
          <p>
            Moreover, the O-1 is a temporary visa, and you would eventually need
            to apply for the EB-1A Green Card. So, why not aim for the final
            goal, considering the O-1 as a stepping stone in the journey.
          </p>
        </>
      ),
    },
    {
      question: "Why should I not directly approach a lawyer?",
      answer: (
        <>
          <p>
            Lawyers are excellent at assembling your evidence once you have it,
            formulating compelling legal arguments, and submitting your case to
            the authorities.
          </p>
          <p>
            However, a lawyer is not a specialist in your specific field of work
            and may not be able to provide you with the minute tactical advice
            you need in your daily life to build an EB-1A eligible profile.
          </p>
          <p>
            That’s where our product comes in. We guide you through this process
            using AI and our own experience of constructing our cases.
          </p>
          <p>
            You can use our product to build your profile from scratch, collect
            all the evidence, and then present that to a lawyer.
          </p>
        </>
      ),
    },
    {
      question:
        "I’m in a unique/different field. How can this product benefit me?",
      answer: (
        <>
          <p>
            Our product is designed in a way that allows you to apply the
            foundational principles taught to any field you’re in.
          </p>
          <p>
            In fact, there are users of our product from a wide range of career
            fields such as Mechanical, Electrical, Computer Science, Data
            Science, Risk Analysis, Supply Chain, Public Policy, Design, and
            many more. They come from various industries including Automotive,
            Enterprise Computing, Data Analytics, Healthcare, Finance, and
            others. This diversity demonstrates the versatility and
            applicability of our product.
          </p>
        </>
      ),
    },
    {
      question: "Do you provide payment plans and discounts for groups?",
      answer: (
        <>
          <p>
            Yes, we do provide discounts for groups if you and one or more of
            your friends sign up together.
          </p>
          <p>We also have a 4-month installment plan available.</p>
        </>
      ),
    },
  ],
  footer: [
    {
      title: "Product",
      links: [
        { href: "#", text: "Features", icon: null },
        { href: "#", text: "Pricing", icon: null },
        { href: "#", text: "Documentation", icon: null },
        { href: "#", text: "API", icon: null },
      ],
    },
    // {
    //   title: "Company",
    //   links: [
    //     { href: "#", text: "About Us", icon: null },
    //     { href: "#", text: "Careers", icon: null },
    //     { href: "#", text: "Blog", icon: null },
    //     { href: "#", text: "Press", icon: null },
    //     { href: "#", text: "Partners", icon: null },
    //   ],
    // },
    {
      title: "Resources",
      links: [
        { href: "#", text: "Community", icon: null },
        { href: "#", text: "Contact", icon: null },
        { href: "#", text: "Support", icon: null },
        { href: "#", text: "Status", icon: null },
      ],
    },
    {
      title: "Social",
      links: [
        {
          href: "#",
          text: "Twitter",
          icon: <FaTwitter />,
        },
        {
          href: "#",
          text: "LinkedIn",
          icon: <FaLinkedinIn />,
        },
        {
          href: "#",
          text: "Youtube",
          icon: <FaYoutube />,
        },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
