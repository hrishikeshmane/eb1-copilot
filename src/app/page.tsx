import HeroSection from "@/components/elements/hero-section";
import Header from "@/components/elements/header";
import FeaturedIn from "@/components/elements/featured-in";
import { LandingBentoGrid } from "@/components/elements/landing-bento-grid";
import Counter from "@/components/elements/animated-counter";
import Footer from "@/components/elements/footer";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Testimonials } from "@/components/elements/testimonials";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <Header />
        <HeroSection />
        <FeaturedIn />

        <section className="relative mx-4 my-8 flex w-[95%] flex-col items-center justify-start overflow-hidden rounded-3xl bg-[#17332D] bg-gradient-to-b  py-16">
          <div className="bg-noise-pattern absolute inset-0 opacity-[0.04] brightness-100 contrast-150"></div>

          <div className="z-10 text-white">
            <h2 className=" mx-auto mb-2 -skew-x-2 text-center text-4xl font-bold">
              Take control of your{" "}
              <span className="relative inline-block text-primary">
                American Dream
                <svg
                  className="absolute -bottom-2 right-0 w-[250px] rotate-180 scale-90 fill-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1213 73"
                  // fill="#fff"
                >
                  <path d="M1212.41 5.51c3.05 12.87-22.36 11.93-30.26 15.68-94.32 20.51-269.09 32.42-365.48 37.51-77.91 3.82-155.66 9.93-233.67 11.67-57.49 2.56-115.05-.19-172.57 1.58-121.28.91-243.17 1.88-363.69-13.33-12.51-2.64-25.8-2.92-37.77-7.45-30.66-21.42 26.02-21.53 38.52-19.26 359.95 29.05 364.68 27.36 638.24 17.85 121-3.78 241.22-19.21 426.76-41.46 4.72-.65 9.18 3.56 8.45 8.36a941.74 941.74 0 0 0 54.29-9.21c9.33-2.33 18.7-4.56 27.95-7.19a7.59 7.59 0 0 1 9.23 5.24Z"></path>
                </svg>
              </span>
            </h2>
            <p className="mx-6 text-center md:mx-4">
              Get focus, efficiency and consistent reliable support till you get
              approved. <br />
              Here’s our no-nonsense process that’s been delivering success in 1
              year.
            </p>

            <div className="mb-8 flex flex-col items-center justify-center gap-1 space-x-0 space-y-16 pt-8 lg:flex-row lg:space-y-0 lg:pt-[4.5rem]">
              <div className="relative flex w-[330px] flex-col items-center rounded-2xl bg-gradient-to-t  from-transparent via-black/40 to-[#0c2521] text-center sm:w-[400px] xl:w-[400px]">
                <div className="w-full py-12">
                  <span className="relative inline-flex w-full overflow-y-hidden text-[4rem] font-bold">
                    <span
                      className="select-none text-transparent"
                      aria-hidden="true"
                    >
                      H1-B
                    </span>
                    <span className="rotating-word_rotate-words-5 absolute left-0 top-0 w-full text-center ">
                      <span className="block w-full delay-1000">F-1</span>
                      <span className="block w-full delay-1000">L-1</span>
                      <span className="block w-full delay-1000">H1-B</span>
                      <span className="block w-full delay-1000">EB-2</span>
                      <span className="block w-full delay-1000">EB-3</span>
                    </span>
                  </span>
                </div>
                <div className="absolute bottom-[-40px] left-0 right-0 flex flex-col items-center justify-center space-y-1 p-2">
                  <span className="text-xl font-bold">Market Research</span>
                  <span className="">
                    Dive deep into your market, understand your competition, and
                    discover customer needs.
                  </span>
                </div>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="59"
                height="24"
                viewBox="0 0 59 24"
                // fill="none"
                className="rotate-90 scale-[.8] fill-primary lg:rotate-0"
              >
                <path
                  d="M49.9235 16.0296L47.8024 15.666L45.6707 15.3445C44.9171 15.2228 44.1568 15.1465 43.3941 15.1158C41.3632 15.0629 39.33 15.0789 37.2994 15.1095L31.212 15.2428C28.7156 15.3124 14.2194 15.3736 11.7292 15.5027C10.4825 15.5507 9.24102 15.6421 7.99677 15.7108C6.75712 15.8098 5.51314 15.8855 4.2787 16.0133C3.52178 16.0541 2.76271 16.0274 2.01053 15.9334C1.66344 15.8844 1.33395 15.75 1.05158 15.5423C0.769211 15.3346 0.542788 15.0601 0.392618 14.7434C-0.154402 13.7943 0.124789 12.6769 1.12865 12.3007C1.78067 12.0722 2.46806 11.961 3.15888 11.9725C6.27647 11.9277 9.387 11.6628 12.4673 11.1798C13.3117 10.9827 26.1805 10.9108 27.0458 10.9663C29.719 11.3325 32.3901 11.021 35.0551 11.2352C36.044 11.3111 37.0353 11.348 38.027 11.393C39.0189 11.4282 40.0112 11.4687 41.0003 11.553C44.528 11.8361 48.0425 12.2517 51.5422 12.7618C52.9292 12.9132 54.2346 13.4927 55.2773 14.4197C55.7609 14.8693 55.5949 15.784 54.9551 15.9127C54.0472 16.084 53.1259 16.1747 52.202 16.1837C51.4432 16.1549 50.6867 16.0827 49.9362 15.9675L49.9235 16.0296Z"
                  // fill="white"
                />
                <path
                  d="M42.2631 18.6329C43.5815 17.8651 44.9283 17.128 46.3326 16.4634C47.0782 16.1121 47.8327 15.7756 48.579 15.4091C49.8814 14.7371 51.244 14.1886 52.6489 13.7708C54.1249 13.335 55.6538 13.1044 57.1927 13.0856L56.0166 16.8878C54.7405 16.1363 53.4752 15.3649 52.2289 14.5634C47.8704 11.756 43.6793 8.69102 39.608 5.48226C39.0035 4.97366 38.454 4.40296 37.9686 3.77957C37.7506 3.49734 37.6077 3.16448 37.5531 2.81206C37.4986 2.45963 37.5342 2.09913 37.6567 1.7642C37.9591 0.713977 38.9756 0.151009 39.9342 0.597883C40.5457 0.902944 41.1045 1.30404 41.5892 1.78592C43.8483 3.91296 46.3655 5.74799 49.0818 7.24797C49.8312 7.66527 50.65 8.03963 51.249 8.6283C53.17 10.5059 55.5507 11.7499 57.691 13.3248C57.8245 13.4221 57.958 13.5193 58.0926 13.6171L58.2685 13.7452C58.5835 13.9745 58.8145 14.3008 58.9262 14.674C59.0379 15.0472 59.0241 15.4468 58.8868 15.8114C58.7496 16.176 58.4965 16.4855 58.1664 16.6924C57.8363 16.8994 57.4475 16.9923 57.0595 16.9569C55.4981 16.8147 53.8765 17.1559 52.2725 17.6253C49.1276 18.552 46.0765 20.2668 43.1533 22.1837C42.0154 22.9915 40.6753 23.4668 39.2828 23.5567C38.6143 23.5804 38.0808 22.8198 38.4622 22.2693C39.012 21.4827 39.6439 20.7567 40.3471 20.1036C40.9588 19.5831 41.6094 19.1101 42.2931 18.6886L42.2631 18.6329Z"
                  // fill="white"
                />
              </svg>

              <div className="relative flex w-[330px] flex-col items-center rounded-2xl bg-gradient-to-t  from-transparent via-primary/20 to-primary/80 text-center md:w-[400px] xl:w-[400px]">
                <div className="py-12">
                  <h3 className="text-[4rem] font-extrabold">EB-1</h3>
                </div>
                <div className="absolute bottom-[-40px] left-0 right-0 flex flex-col items-center justify-center space-y-1 p-2">
                  <span className="text-xl font-bold">Copy &amp; Design</span>
                  <span className="">
                    Develop compelling copy and visuals that make your brand and
                    website stand out.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto my-2 mb-8 flex w-[95%] flex-col items-center justify-between space-y-2 text-center md:flex-row">
          <div className="flex flex-col">
            <div className="services items-start text-center md:text-left">
              <p>Original Contribution</p>
              <p>Authorship</p>
              <p>Judging</p>
              <p>Awards</p>
            </div>
          </div>
          <div className="absolute inset-0 top-[25%] m-auto block h-fit w-fit -skew-x-2  p-0 text-4xl font-bold">
            <h2 className="text-4xl">
              All visa pillars,
              <span className="relative block">
                under one roof
                {/* <img
                  alt="logo"
                  loading="eager"
                  width="300"
                  height="100"
                  decoding="async"
                  data-nimg="1"
                  className="absolute right-0 top-[-5px] xl:top-[-10px]"
                  src="/images/services-scribble.svg"
                ></img> */}
              </span>
            </h2>
          </div>
          <div className="flex flex-col">
            <div className="services text-center md:text-right lg:items-end">
              <p>Critical Capacity</p>
              <p>Membership</p>
              <p>High Salary</p>
              <p>Press</p>
            </div>
          </div>
        </section>

        <section className="relative mx-4 my-8 flex w-[95%] flex-col items-center justify-start overflow-hidden rounded-3xl bg-[#17332D] bg-gradient-to-b  py-16">
          <h2 className="mx-auto mb-1 -skew-x-2 text-center text-4xl font-bold text-white">
            No BS, Green Card Accelerator
          </h2>
          <p className="mx-4 text-center text-white">
            Crafted with precision, our program includes features to seamlessly
            guide and support you through each stage.
          </p>

          <div className="bg-noise-pattern absolute inset-0 opacity-[0.04] brightness-100 contrast-150"></div>
          <div className="z-10">
            <div className="mt-10 grid grid-cols-1 content-center gap-20 text-white md:grid-cols-3">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="col-span-1 flex items-end">
                  <Counter
                    from={0}
                    to={441}
                    className="text-6xl font-bold text-primary"
                  />
                  <span className="text-3xl font-bold">yrs</span>
                </div>
                <p className="text-center font-bold">Total Time Saved</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="col-span-1 flex items-end">
                  <Counter
                    from={0}
                    to={77}
                    className="text-6xl font-bold text-primary"
                  />
                  {/* <span className="text-3xl font-bold">Years</span> */}
                </div>
                <p className="text-center font-bold">Total Case</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="col-span-1 flex items-end">
                  <Counter
                    from={0}
                    to={100}
                    className="text-6xl font-bold text-primary"
                  />
                  <span className=" text-3xl font-bold">%</span>
                </div>
                <p className="text-center font-bold">Success Rate</p>
              </div>
            </div>
          </div>
        </section>

        <section className="z-10">
          <LandingBentoGrid />
        </section>

        <section className="z-10 my-8 flex w-[99%] flex-col">
          <h2 className="mx-auto my-5 mb-1 -skew-x-2 text-center text-4xl font-bold">
            Success stories
          </h2>
          {/* <div className="bg-gradient-to-b from-transparent via-white to-transparent dark:via-black"> */}
          <Testimonials />
          {/* </div> */}
        </section>

        <section className="z-10 my-8 flex w-[20rem] flex-col sm:w-[30rem] md:w-[40rem] lg:w-[62rem]">
          <h2 className="mx-auto my-5 mb-1 -skew-x-2 text-center text-4xl font-bold">
            FAQ
          </h2>
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
        </section>
      </main>
      <Footer />
    </>
  );
}
