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
      <FAQ />
      {/* <Blog /> */}
      <CTA />
      <Footer />
    </main>
  );
}
