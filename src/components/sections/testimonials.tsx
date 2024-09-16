"use client";

import Marquee from "@/components/magicui/marquee";
import Section from "@/components/section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "bg-primary/20 p-1 py-0.5 font-bold text-primary dark:bg-primary/20 dark:text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
};

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const TestimonialCard = ({
  description,
  name,
  img,
  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) => (
  <div
    className={cn(
      "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
      // light styles
      " border border-neutral-200 bg-white",
      // dark styles
      "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
    {...props} // Spread the rest of the props here
  >
    <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
      {description}
      <div className="flex flex-row py-1">
        <Star className="size-4 fill-yellow-500 text-yellow-500" />
        <Star className="size-4 fill-yellow-500 text-yellow-500" />
        <Star className="size-4 fill-yellow-500 text-yellow-500" />
        <Star className="size-4 fill-yellow-500 text-yellow-500" />
        <Star className="size-4 fill-yellow-500 text-yellow-500" />
      </div>
    </div>

    <div className="flex w-full select-none items-center justify-start gap-5">
      {/* <Image
        width={40}
        height={40}
        src={img || ""}
        alt={name}
        className="h-10 w-10 rounded-full ring-1 ring-border ring-offset-4"
      /> */}

      <div>
        <p className="font-medium text-neutral-500">{name}</p>
        <p className="text-xs font-normal text-neutral-400">{role}</p>
      </div>
    </div>
  </div>
);

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at Amazon",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    description: (
      <p>
        Joining the EB-1A Copilot Program was the best decision for my
        immigration journey.
        <Highlight>
          The personalized guidance and mentorship helped me build a strong
          profile.
        </Highlight>
        I got my EB-1A approved in under a year!
      </p>
    ),
  },
  {
    name: "Carlos Mendez",
    role: "Data Scientist at Meta",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    description: (
      <p>
        The EB-1A Copilot Program made the complex process so much easier to
        navigate.
        <Highlight>The accountability and support were unmatched.</Highlight>I
        couldn't have done it without their expert team.
      </p>
    ),
  },
  {
    name: "Sophia Liu",
    role: "Product Manager at Apple",
    img: "https://randomuser.me/api/portraits/women/85.jpg",
    description: (
      <p>
        The press coverage and attorney support through the EB-1A Copilot were
        game-changers.
        <Highlight>
          My petition stood out, and I received approvals in record time!
        </Highlight>
        I highly recommend this program.
      </p>
    ),
  },
  {
    name: "Ankit Verma",
    role: "AI Researcher at Google",
    img: "https://randomuser.me/api/portraits/men/24.jpg",
    description: (
      <p>
        Thanks to the EB-1A Copilot Program, my entire profile was built
        strategically.
        <Highlight>
          The resources and expert calls gave me the confidence to move forward.
        </Highlight>
        An invaluable service for anyone pursuing the EB-1A.
      </p>
    ),
  },
  {
    name: "Maria Gomez",
    role: "Biotech Entrepreneur at Athelas",
    img: "https://randomuser.me/api/portraits/women/55.jpg",
    description: (
      <p>
        The EB-1A Copilot Program provided the legal expertise and mentorship I
        needed.
        <Highlight>
          Their comprehensive support helped me showcase my extraordinary
          ability.
        </Highlight>
        I couldn’t be happier with the results.
      </p>
    ),
  },
  {
    name: "Sanjana Mehta",
    role: "Senior Data Engineer at Microsoft",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    description: (
      <p>
        The #EB1ACopilot program provided me with a clear path to meet the visa
        criteria.
        <Highlight>
          Their support in building my profile was exceptional.
        </Highlight>{" "}
        I wouldn't have succeeded without their expert guidance.
      </p>
    ),
  },
  {
    name: "Daniel Ortiz",
    role: "CTO at Foundry",
    img: "https://randomuser.me/api/portraits/men/72.jpg",
    description: (
      <p>
        Thanks to #EB1ACopilot, I received my visa approval in record time.
        <Highlight>
          The personalized strategy and mentoring were absolutely invaluable.
        </Highlight>{" "}
        Highly recommended for tech professionals.
      </p>
    ),
  },
  {
    name: "Maria Sanchez",
    role: "Product Manager at Ramp",
    img: "https://randomuser.me/api/portraits/women/20.jpg",
    description: (
      <p>
        The #EB1ACopilot program transformed a daunting process into a
        manageable one.
        <Highlight>
          Their step-by-step approach gave me the confidence to succeed.
        </Highlight>{" "}
        I'm now living my dream in the U.S.!
      </p>
    ),
  },
  {
    name: "John Kim",
    role: "Co-founder at ScaleTech",
    img: "https://randomuser.me/api/portraits/men/92.jpg",
    description: (
      <p>
        I couldn’t have achieved my EB-1A approval without #EB1ACopilot.
        <Highlight>
          The mentorship from past recipients was a game-changer.
        </Highlight>{" "}
        A must-have for anyone pursuing an extraordinary visa.
      </p>
    ),
  },
  {
    name: "Emma Lee",
    role: "VP of Engineering at H5Labs",
    img: "https://randomuser.me/api/portraits/women/43.jpg",
    description: (
      <p>
        The expert guidance from #EB1ACopilot gave me a competitive edge.
        <Highlight>
          I secured press coverage and attorney support effortlessly.
        </Highlight>{" "}
        A life-changing experience.
      </p>
    ),
  },
];

//   {
//     name: "Alex Rivera",
//     role: "CTO at InnovateTech",
//     img: "https://randomuser.me/api/portraits/men/91.jpg",
//     description: (
//       <p>
//         The AI-driven analytics from #QuantumInsights have revolutionized our
//         product development cycle.
//         <Highlight>
//           Insights are now more accurate and faster than ever.
//         </Highlight>{" "}
//         A game-changer for tech companies.
//       </p>
//     ),
//   },
//   {
//     name: "Samantha Lee",
//     role: "Marketing Director at NextGen Solutions",
//     img: "https://randomuser.me/api/portraits/women/12.jpg",
//     description: (
//       <p>
//         Implementing #AIStream&apos;s customer prediction model has drastically
//         improved our targeting strategy.
//         <Highlight>Seeing a 50% increase in conversion rates!</Highlight> Highly
//         recommend their solutions.
//       </p>
//     ),
//   },
//   {
//     name: "Raj Patel",
//     role: "Founder & CEO at StartUp Grid",
//     img: "https://randomuser.me/api/portraits/men/45.jpg",
//     description: (
//       <p>
//         As a startup, we need to move fast and stay ahead. #CodeAI&apos;s
//         automated coding assistant helps us do just that.
//         <Highlight>Our development speed has doubled.</Highlight> Essential tool
//         for any startup.
//       </p>
//     ),
//   },
//   {
//     name: "Emily Chen",
//     role: "Product Manager at Digital Wave",
//     img: "https://randomuser.me/api/portraits/women/83.jpg",
//     description: (
//       <p>
//         #VoiceGen&apos;s AI-driven voice synthesis has made creating global
//         products a breeze.
//         <Highlight>Localization is now seamless and efficient.</Highlight> A
//         must-have for global product teams.
//       </p>
//     ),
//   },
//   {
//     name: "Michael Brown",
//     role: "Data Scientist at FinTech Innovations",
//     img: "https://randomuser.me/api/portraits/men/1.jpg",
//     description: (
//       <p>
//         Leveraging #DataCrunch&apos;s AI for our financial models has given us
//         an edge in predictive accuracy.
//         <Highlight>
//           Our investment strategies are now powered by real-time data analytics.
//         </Highlight>{" "}
//         Transformative for the finance industry.
//       </p>
//     ),
//   },
//   {
//     name: "Linda Wu",
//     role: "VP of Operations at LogiChain Solutions",
//     img: "https://randomuser.me/api/portraits/women/5.jpg",
//     description: (
//       <p>
//         #LogiTech&apos;s supply chain optimization tools have drastically
//         reduced our operational costs.
//         <Highlight>
//           Efficiency and accuracy in logistics have never been better.
//         </Highlight>{" "}
//       </p>
//     ),
//   },
//   {
//     name: "Carlos Gomez",
//     role: "Head of R&D at EcoInnovate",
//     img: "https://randomuser.me/api/portraits/men/14.jpg",
//     description: (
//       <p>
//         By integrating #GreenTech&apos;s sustainable energy solutions,
//         we&apos;ve seen a significant reduction in carbon footprint.
//         <Highlight>
//           Leading the way in eco-friendly business practices.
//         </Highlight>{" "}
//         Pioneering change in the industry.
//       </p>
//     ),
//   },
//   {
//     name: "Aisha Khan",
//     role: "Chief Marketing Officer at Fashion Forward",
//     img: "https://randomuser.me/api/portraits/women/56.jpg",
//     description: (
//       <p>
//         #TrendSetter&apos;s market analysis AI has transformed how we approach
//         fashion trends.
//         <Highlight>
//           Our campaigns are now data-driven with higher customer engagement.
//         </Highlight>{" "}
//         Revolutionizing fashion marketing.
//       </p>
//     ),
//   },
//   {
//     name: "Tom Chen",
//     role: "Director of IT at HealthTech Solutions",
//     img: "https://randomuser.me/api/portraits/men/18.jpg",
//     description: (
//       <p>
//         Implementing #MediCareAI in our patient care systems has improved
//         patient outcomes significantly.
//         <Highlight>
//           Technology and healthcare working hand in hand for better health.
//         </Highlight>{" "}
//         A milestone in medical technology.
//       </p>
//     ),
//   },
//   {
//     name: "Sofia Patel",
//     role: "CEO at EduTech Innovations",
//     img: "https://randomuser.me/api/portraits/women/73.jpg",
//     description: (
//       <p>
//         #LearnSmart&apos;s AI-driven personalized learning plans have doubled
//         student performance metrics.
//         <Highlight>
//           Education tailored to every learner&apos;s needs.
//         </Highlight>{" "}
//         Transforming the educational landscape.
//       </p>
//     ),
//   },
//   {
//     name: "Jake Morrison",
//     role: "CTO at SecureNet Tech",
//     img: "https://randomuser.me/api/portraits/men/25.jpg",
//     description: (
//       <p>
//         With #CyberShield&apos;s AI-powered security systems, our data
//         protection levels are unmatched.
//         <Highlight>Ensuring safety and trust in digital spaces.</Highlight>{" "}
//         Redefining cybersecurity standards.
//       </p>
//     ),
//   },
//   {
//     name: "Nadia Ali",
//     role: "Product Manager at Creative Solutions",
//     img: "https://randomuser.me/api/portraits/women/78.jpg",
//     description: (
//       <p>
//         #DesignPro&apos;s AI has streamlined our creative process, enhancing
//         productivity and innovation.
//         <Highlight>Bringing creativity and technology together.</Highlight> A
//         game-changer for creative industries.
//       </p>
//     ),
//   },
//   {
//     name: "Omar Farooq",
//     role: "Founder at Startup Hub",
//     img: "https://randomuser.me/api/portraits/men/54.jpg",
//     description: (
//       <p>
//         #VentureAI&apos;s insights into startup ecosystems have been invaluable
//         for our growth and funding strategies.
//         <Highlight>Empowering startups with data-driven decisions.</Highlight> A
//         catalyst for startup success.
//       </p>
//     ),
//   },
// ];

export default function Testimonials() {
  return (
    <Section
      title="Testimonials"
      subtitle="What our customers are saying"
      className="max-w-8xl"
    >
      <div className="relative mt-6 max-h-screen overflow-hidden">
        <div className="gap-4 md:columns-2 xl:columns-3">
          {Array(Math.ceil(testimonials.length / 3))
            .fill(0)
            .map((_, i) => (
              <Marquee
                vertical
                key={i}
                className={cn({
                  "[--duration:60s]": i === 1,
                  "[--duration:30s]": i === 2,
                  "[--duration:70s]": i === 3,
                })}
              >
                {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: Math.random() * 0.8,
                      duration: 1.2,
                    }}
                  >
                    <TestimonialCard {...card} />
                  </motion.div>
                ))}
              </Marquee>
            ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-background from-20%"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-background from-20%"></div>
      </div>
    </Section>
  );
}
