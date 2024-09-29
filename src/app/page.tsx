// import Blog from "@/components/sections/blog";
import Banner from "@/components/elements/banner";
import Footer from "@/components/elements/footer";
import Header from "@/components/elements/header";
import CTA from "@/components/sections/cta";
import FAQ from "@/components/sections/faq";
import Features from "@/components/sections/features";
// import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Introducing from "@/components/sections/introducing";
import HowItWorks from "@/components/sections/how-it-works";
import Logos from "@/components/sections/logos";
import Pricing from "@/components/sections/pricing";
import Problem from "@/components/sections/problem";
import Solution from "@/components/sections/solution";
import Testimonials from "@/components/sections/testimonials";
import TestimonialsCarousel from "@/components/sections/testimonials-carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <main>
      <Header />
      <Banner />
      <Hero />
      <Logos />
      <Introducing />
      <Problem />
      <Solution />
      <HowItWorks />
      <TestimonialsCarousel />
      <Features />
      <Testimonials />
      {/* <Pricing /> */}
      {/* <FAQ /> */}
      <section className="z-10 mx-auto my-8 flex w-[20rem] flex-col sm:w-[30rem] md:w-[40rem] lg:w-[62rem]">
        <h2 className="mx-auto my-5 mb-1 -skew-x-2 text-center text-3xl font-bold  md:text-4xl">
          FAQ
        </h2>
        <div className="z-10 mx-auto my-8 flex w-full flex-col">
          <div className="w-full text-left">
            <Accordion
              type="single"
              collapsible={true}
              className="w-full text-left"
            >
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-bold md:text-xl">
                  When should I start?
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p>The best time is right now, and here’s why… </p>

                  <p>
                    We empower you to identify, cultivate, and utilize every
                    opportunity around you to strengthen your case and enhance
                    your eligibility, irrespective of whether you’re a
                    professional or a student.
                  </p>

                  <p>
                    Delaying means missing out on opportunities. Moreover, the
                    primary objective of this endeavor is to save time. The
                    earlier you begin, the more time you’ll have to construct an
                    impressive profile.
                  </p>

                  <p>
                    If you’re worried about the H-1B lottery, a robust profile
                    like this can also aid in qualifying for the O-1A, which is
                    merit-based and doesn’t rely on lottery luck.
                  </p>

                  <p>
                    If you’re already in the EB-2 or EB-3 process, this won’t
                    interfere at all. In fact, you’ll be able to use the same
                    priority date for the EB-1A, accelerating your green card
                    acquisition.
                  </p>

                  <p>
                    Regarding location, you can be anywhere globally. Your
                    significant work and the recognition you earn are what truly
                    count. Many people apply for the EB-1A and O-1A from outside
                    the US each year and relocate to the US under this status.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-bold md:text-xl">
                  Can individuals without advanced degrees or extraordinary
                  awards qualify for EB-1A?
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p>
                    They can, and they have. You don’t need a Ph.D., a Nobel
                    Prize, an Oscar, or any such accolades to qualify for an
                    EB-1A.
                  </p>

                  <p>
                    Instead, you’re required to show extraordinary ability
                    through contributing to your field and by meeting 3 out of
                    10 criteria. We’ve seen everyone from top engineers to
                    product leaders to founders get the EB-1A. There’s a good
                    chance you already meet a few criteria without knowing about
                    it.
                  </p>

                  <p>
                    Using our tool and with your diligent effort, it’s a matter
                    of time before you’re able to meet the ‘extraordinary
                    ability’ criteria for the Green Card.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-bold md:text-xl">
                  Can this product also help prepare for the O-1A?
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p>Indeed!</p>
                  <p>
                    The criteria for evidence for both EB-1A and O-1A are alike,
                    but securing an O-1A doesn’t assure an EB-1A. It’s generally
                    understood that the EB-1A demands a higher standard of proof
                    compared to the O-1A.
                  </p>
                  <p>
                    In essence, if you met the qualifications for the EB-1A, you
                    would likely also qualify for the O-1A. This means you would
                    have an alternative to the unpredictable H-1B lottery and
                    wouldn’t be solely reliant on it.
                  </p>
                  <p>
                    Moreover, the O-1 is a temporary visa, and you would
                    eventually need to apply for the EB-1A Green Card. So, why
                    not aim for the final goal, considering the O-1 as a
                    stepping stone in the journey.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-bold md:text-xl">
                  Why should I not directly approach a lawyer?
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p>
                    Lawyers are excellent at assembling your evidence once you
                    have it, formulating compelling legal arguments, and
                    submitting your case to the authorities.
                  </p>
                  <p>
                    However, a lawyer is not a specialist in your specific field
                    of work and may not be able to provide you with the minute
                    tactical advice you need in your daily life to build an
                    EB-1A eligible profile.
                  </p>
                  <p>
                    That’s where our product comes in. We guide you through this
                    process using AI and our own experience of constructing our
                    cases.
                  </p>
                  <p>
                    You can use our product to build your profile from scratch,
                    collect all the evidence, and then present that to a lawyer.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-bold md:text-xl">
                  I’m in a unique/different field. How can this product benefit
                  me?
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p>
                    Our product is designed in a way that allows you to apply
                    the foundational principles taught to any field you’re in.
                  </p>
                  <p>
                    In fact, there are users of our product from a wide range of
                    career fields such as Mechanical, Electrical, Computer
                    Science, Data Science, Risk Analysis, Supply Chain, Public
                    Policy, Design, and many more. They come from various
                    industries including Automotive, Enterprise Computing, Data
                    Analytics, Healthcare, Finance, and others. This diversity
                    demonstrates the versatility and applicability of our
                    product.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-lg font-bold md:text-xl">
                  Do you provide payment plans and discounts for groups?
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p>
                    Yes, we do provide discounts for groups if you and one or
                    more of your friends sign up together.
                  </p>
                  <p>We also have a 4-month installment plan available.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        {/* fr */}
      </section>
      <CTA />
      <Footer />
    </main>
  );
}
