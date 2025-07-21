import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import Marquee from "./magicui/marquee";

const reviews = [
  {
    // title: "The community helped me more than I paid for.",
    body: "The most underrated benefit I got from the Unshackled community was the emotional support. I got an RFE during my O-1A journey and it was extremely painful, emotionally. I can't recommend joining the community enough.",
    name: "Hitesh K.",
    img: "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/community/review-avatar/Hitesh%20Kenjale.png?raw=true",
    position: "Co-Founder",
  },
  {
    body: "I got everything I needed to create a solid O-1A case. The knowledge base introduced me to the websites I needed to build my evidence. I had access to people who were doing exactly what I was doing - as well as people who've reached the finish line of the process! I could speak to vetted lawyers who evaluated my case. There is always new information being shared and discussed. Overall, I got more out of the community than I paid for!",
    name: "Dominic D.",
    img: "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/community/review-avatar/Dominic%20Damoah.jpeg?raw=true",
    position: "CTO",
  },
  {
    body: "The biggest thing I got from the community was the belief that I could actually qualify for the O-1A. It wasn’t this giant, monolithic thing meant only for a select few. As long as I was doing good and strategically building my case, it was possible for me to get the visa. Since getting it, I’ve had the peace of mind I needed to get back to what actually mattered: building my company.",
    name: "Digvijay S.",
    img: "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/community/review-avatar/Digvijay%20Singh.jpeg?raw=true",
    position: "Head of Product",
  },
  {
    body: "I wish I had found the community earlier in my EB-1A journey. It could have saved me a lot of time and research. And, it would've given me a chance to meet others like me from my field, get their feedback, and made my petition better.",
    name: "Aswarth D.",
    img: "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/community/review-avatar/Aswarth%20Abhilash%20Dara.png?raw=true",
    position: "Staff Software Engineer AI/ML.",
  },
  {
    body: "To me, Unshackled was the starting point of discovering a wealth of community, experiences, and resources that have been a friend through a pretty complex process. From simple tips to accessing others who were in similar boats to always having someone willing to help, the community has been unmatched.",
    name: "Zoya B.",
    img: "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/community/review-avatar/Zoya%20Brar.jpeg?raw=true",
    position: "Founder",
  },
  {
    body: "Thanks to support from the community, I was successfully able to transition from an H-1B to a B-2 following a challenging period of company layoffs.",
    name: "Vishal P.",
    img: "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/community/review-avatar/Mohit%20Kumar.png?raw=true",
    position: "Developer Advocate",
  },
  {
    body: "I am immensely grateful to the Unshackled community for the support I got throughout my EB-1A process. The resources & personal stories shared there gave me the confidence to get through a rather overwhelming process. I wholeheartedly recommend anyone in their EB-1A process to join this space! I’m now just a month away from filing my case. Fingers crossed.",
    name: "Mohit K.",
    img: "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/community/review-avatar/Mohit%20Kumar.png?raw=true",
    position: "Senior Radar System Enigneer",
  },
  {
    body: "I joined the community only a few weeks ago. I've already been able to book a call with an EB-2 NIW recipient, who has now become a mentor of mine that I talk to regularly.",
    name: "Imran K.",
    img: "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/community/review-avatar/Imran%20Khan.png?raw=true",
    position: "RAN Visualization Engineer.",
  },
  {
    body: "Joining Unshackled was one of the best decisions I've made for my entrepreneurial journey",
    name: "Twinkle M.",
    img: "https://github.com/hrishikeshmane/unshackled-asstets/blob/main/community/review-avatar/Twinkle%20Mohan.png?raw=true",
    position: "Digital Product Designer. Aspiring Founder.",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  position,
  body,
}: {
  img: string;
  name: string;
  position: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-[30rem] cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          alt={name}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-bold dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{position}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const CommunityTestimonials = () => {
  return (
    <div>
      <div className="relative flex flex-row items-center justify-center overflow-hidden bg-background sm:px-20 md:h-[40rem]">
        {/* <div className="hidden md:flex">
          <Marquee pauseOnHover className="[--duration:30s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:30s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
        </div> */}
        <div className="scale-75 flex-col px-4">
          <Marquee pauseOnHover>
            {firstRow.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover>
            {secondRow.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-background"></div>
      </div>
    </div>
  );
};

export default CommunityTestimonials;
