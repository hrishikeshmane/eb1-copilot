import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { MdOutlineFormatQuote } from "react-icons/md";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "Meta",
  "Uber",
  "Spotify",
];

const highlightTestimonials = [
  {
    testimonial:
      "Greencard Inc. was a game-changer for my EB1A process. I didn’t need to waste time searching for top immigration lawyers. The platform handled it all for me. The profile builder kept me focused and organized throughout the process, and submitting my documents was as easy as exporting everything into a single PDF. I couldn’t believe how efficient the process was",
    company: "Google",
    position: "Senior Data Engineer",
    name: "Rakesh Reddy",
  },
  {
    testimonial:
      "I was overwhelmed by the complexity of the EB1A process, but Greencard Inc. simplified everything with their intuitive platform and step-by-step guidance. They helped me secure the right evidence get on to right opportunities. Nikin and RK's support was truly invaluable!",
    company: "Netflix",
    position: "Product Manager",
    name: "Paul Sanchez",
  },
  {
    testimonial:
      "Working with Greencard Inc. was a game-changer for my EB1A application. They not only provided a clear strategy but also offered continuous support throughout the process. I received my approval faster than I could have imagined, thanks to their tailored approach.",
    company: "Amazon",
    position: "AI Researcher",
    name: "Krupen Subramaniam",
  },
  {
    testimonial:
      "I was skeptical at first, but Greencard Inc. exceeded my expectations. From matching me with top mentors and experts to offering a profile builder and tracker that kept me accountable, they thought of everything. The best part was exporting all my evidence into one professional-looking PDF with just one click to send to my attorney. Their service made a huge difference in my journey.",
    company: "Uber",
    position: "VP of Engineering",
    name: "Rafa Shaik",
  },
  {
    testimonial:
      "With Greencard Inc., I didn’t just get access to top lawyers and mentors, I got a streamlined process with access to the profile builder that helped me gather everything I needed without the usual stress, and exporting my case materials was quick and easy. The support I received was invaluable in getting my EB1A approval in just 1 year",
    company: "Microsoft",
    position: "Software Engineering Manager",
    name: "Omolola Adbio",
  },
];

export default function Component() {
  return (
    <Section
      title="Testimonial Highlight"
      subtitle="What our customers are saying"
    >
      <Carousel>
        <div className="mx-auto max-w-2xl">
          <CarouselContent>
            {highlightTestimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className=" text-center">
                    <MdOutlineFormatQuote className="text-themeDarkGray mx-auto my-4 text-4xl" />
                    <BlurFade delay={0.25} inView>
                      <h4 className="text-1xl font-semibold">
                        {testimonial.testimonial}
                      </h4>
                    </BlurFade>
                    <BlurFade delay={0.25 * 2} inView>
                      <div className="mt-8">
                        <Image
                          width={0}
                          height={40}
                          key={index}
                          src={`https://cdn.magicui.design/companies/${testimonial.company}.svg`}
                          alt={`${companies[index % companies.length]} Logo`}
                          className="mx-auto h-[40px] w-auto opacity-30"
                        />
                      </div>
                    </BlurFade>
                    <div className="">
                      <BlurFade delay={0.25 * 3} inView>
                        <h4 className="text-1xl my-2 font-semibold">
                          {testimonial.name}
                        </h4>
                      </BlurFade>
                    </div>
                    <BlurFade delay={0.25 * 4} inView>
                      <div className=" mb-3">
                        <span className="text-themeDarkGray text-sm">
                          {testimonial.position}
                        </span>
                      </div>
                    </BlurFade>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </Section>
  );
}
