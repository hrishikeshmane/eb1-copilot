"use client";

import React from "react";
import { Masonry } from "masonic";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const testimonials = [
  {
    quote:
      "Navigating the EB-1A application process as Product Manager seemed daunting, but Greencard.inc made it seamless! Their product recognized the depth of my experience in product development, from conceptualization to launch, and highlighted my track record of driving successful product strategies",
    name: "Charles Dickens",
    title: "Product Manager",
  },
  {
    quote:
      "Bringing my tech startup vision to life in the U.S. required navigating complex visa requirements. Thankfully, Greencard.inc was there to guide me through. Their product analyzed my tech innovations and entrepreneurial journey, crafting a compelling narrative that showcased my expertise. Now, I'm driving innovation on Wall St, all thanks to their invaluable assistance.",
    name: "Edgar Allan Poe",
    title: "Tech Entrepreneur",
  },
  {
    quote:
      "Proving my extraordinary ability as a data scientist was no easy feat, but Greencard.inc made it possible! Their product analyzed my research publications and data analytics expertise, presenting a compelling case for my EB1A.",
    name: "Jane Austen",
    title: "Data Scientist",
  },
  {
    quote:
      "As a cybersecurity expert, I knew the EB1A process would be a challenge. That's where Greencard.inc stepped in. Their product recognized the significance of my cybersecurity achievements, turning them into a winning visa application",
    name: "Herman Melville",
    title: "Cybersecurity Expert",
  },
  {
    quote:
      "Greencard.inc understood the intricacies of my role, from ensuring compliance with FDA regulations to navigating international standards. With their expert assistance, I successfully obtained my EB1A Green Card and am now shaping regulatory policies for life-saving medications in the U.S., making a tangible impact on global healthcare​",
    name: "Charles Dickens",
    title: "Regulatory Affairs Expert",
  },
  {
    quote:
      "As a Software Engineer with a passion for innovation, I dreamed of contributing to the tech landscape in the U.S. However, the visa process seemed like a daunting obstacle. That's when I discovered Greencard.inc. Their product recognized my expertise in software development, from designing scalable systems to implementing cutting-edge solutions. With their expert guidance, I successfully obtained my EB1A Green Card​",
    name: "Charles Dickens",
    title: "Software Engineer",
  },
  {
    quote:
      "As a seasoned financial professional, securing permanent residency through EB1A was my next career milestone. Greencard.inc played a crucial role in this journey. Their expertise in immigration matters and dedication to their clients' success were evident throughout the process.",
    name: "William Shakespeare",
    title: "VP of Finance",
  },
  // {
  //   quote: "All that we see or seem is but a dream within a dream.",
  //   name: "Edgar Allan Poe",
  //   title: "A Dream Within a Dream",
  // },
  // {
  //   quote:
  //     "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
  //   name: "Jane Austen",
  //   title: "Pride and Prejudice",
  // },
  // {
  //   quote:
  //     "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
  //   name: "Herman Melville",
  //   title: "Moby-Dick",
  // },
  // {
  //   quote:
  //     "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
  //   name: "Jane Austen",
  //   title: "Pride and Prejudice",
  // },
  // {
  //   quote:
  //     "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
  //   name: "Jane Austen",
  //   title: "Pride and Prejudice",
  // },
];

const MasonryTestimonials = () => {
  const [isServerSide, setIsServerSide] = React.useState(true);

  React.useEffect(() => {
    setIsServerSide(false);
  }, []);

  if (isServerSide) {
    return;
  }

  return (
    <div>
      <Masonry
        // Provides the data for our grid items
        items={testimonials}
        // Adds 8px of space between the grid cells
        columnGutter={12}
        // Sets the minimum column width to 172px
        columnWidth={300}
        // Pre-renders 5 windows worth of content
        overscanBy={5}
        // This is the grid item component
        render={MasonryCard}
      />
    </div>
  );
};

export default MasonryTestimonials;

type MasonryCardData = {
  quote: string;
  name: string;
  title: string;
};

const MasonryCard = ({
  data: { quote, name, title },
}: {
  data: MasonryCardData;
}) => (
  <div className="flex flex-col gap-2 rounded-xl border p-4">
    <div className="flex items-center gap-4">
      {/* <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar> */}
      <div className="flex flex-col">
        {/* <p className="font-bold">{name}</p> */}
        <p className="font-bold">{title}</p>
        {/* <p>{title}</p> */}
      </div>
    </div>
    <blockquote className="italic">&quot;{quote}&quot;</blockquote>
  </div>
);
