import React from "react";
import Header from "@/components/elements/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQsPage = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <Header />
      <section className="flex w-full max-w-7xl flex-col  p-10">
        <div className="flex items-start">
          <h1 className=" text-4xl font-semibold">FAQs</h1>
        </div>
        <p>
          We understand you have questions. Go through our FAQ to get them
          answered
        </p>
        <div className="z-10 mx-auto my-8 flex w-full flex-col">
          <div className="w-full">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-bold">
                  Is it accessible?
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl font-bold">
                  Is it styled?
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl font-bold">
                  Is it animated?
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQsPage;
