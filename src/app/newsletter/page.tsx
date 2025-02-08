import { SparkleIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import React from "react";
import { JoinNewsletterForm } from "@/components/convertkit-forms";
// import Footer from "@/components/landing-page/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/lib/config";
import Footer from "@/components/elements/footer";
import Header from "@/components/elements/header";

export const metadata = {
  title: "Don’t waste your time keeping up with US immigration.",
  description: `Join ${siteConfig.newsletterCount} immigrants who get a careful curation of breaking news, free webinar invites & latest trends on immigration every week. Spend <5 minutes a week de-risking your future.”`,
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

const NewsLetterPage = () => {
  return (
    <>
      <Script
        src="https://js.sparkloop.app/team_41951c56e05e.js"
        data-sparkloop
      />
      <div className="flex min-h-screen w-full flex-col">
      <Header />
        <section className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-4 rounded-lg py-28">
          <div className="flex flex-col md:flex-row">
            <div className="flex basis-2/3 flex-col items-start justify-start gap-10 px-8 text-left md:py-20">
              <h2 className="max-w-4xl text-5xl font-bold leading-[4rem]">
                Don’t waste your time and money trying to keep up with U.S.
                immigration
              </h2>
              <p className="text-2xl font-bold leading-8 text-muted-foreground">
                Join{" "}
                <span className="text-primary">
                  {siteConfig.newsletterCount} immigrants
                </span>{" "}
                who get a careful curation of breaking news, free webinar
                invites & latest trends on immigration every week.
              </p>
              <div className="rounded-md bg-white p-4">
                <JoinNewsletterForm />
              </div>
            </div>
            <div className="flex basis-1/3 scale-75 items-center justify-center md:scale-100">
              <Image
                src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/newletter/newsletter-phone.png?raw=true"
                alt="Soundarya"
                width={300}
                height={300}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-4 rounded-lg px-4 md:py-28">
          <h2 className="pb-8 text-center text-4xl font-bold">
            Hear it from our readers
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-10">
            <div className="flex flex-col rounded-lg bg-card p-8 px-10">
              <div className="flex items-center justify-between">
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/newletter/reviews/Nithin%20Rao.jpeg?raw=true"
                  />
                  <AvatarFallback>NR</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center text-right">
                  <h2 className="text-xl font-bold">Nithin Rao</h2>
                  <p className="text-sm text-muted-foreground">
                    Manufacturing Controller
                  </p>
                </div>
              </div>
              <p className="py-6 font-semibold">
                The newsletter is a ray of hope for people like me who are
                trying to build something on their own. It’s filled with
                important updates that otherwise I might not get to now. If
                you’re looking to get unshackled from the never-ending fear of
                losing your immigration status or want to build a startup
                someday, subscribe to this immediately.
              </p>
            </div>

            <div className="flex flex-col rounded-lg bg-card p-8 px-10">
              <div className="flex items-center justify-between">
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/newletter/reviews/Finn%20Reynolds.jpeg?raw=true"
                  />
                  <AvatarFallback>FR</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center text-right">
                  <h2 className="text-xl font-bold">Finn Reynolds</h2>
                  <p className="text-sm text-muted-foreground">
                    Director of Marketing at WR Immigration
                  </p>
                </div>
              </div>
              <p className="py-6 font-semibold">
                Over the last few months, I’ve come to understand why the
                Unshackled newsletter has grown such a committed following of
                11,000+. The content is great, but more importantly, the design
                of the format and flow makes it so easy to consume. This makes
                the newsletter stand out amongst others!
              </p>
            </div>

            <div className="flex flex-col rounded-lg bg-card p-8 px-10">
              <div className="flex items-center justify-between">
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/newletter/reviews/Pramit%20Bhatia.jpeg?raw=true"
                  />
                  <AvatarFallback>PB</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center text-right">
                  <h2 className="text-xl font-bold">Pramit Bhatia</h2>
                  <p className="text-sm text-muted-foreground">
                    Student at ESSEC Business School
                  </p>
                </div>
              </div>
              <p className="py-6 font-semibold">
                The Unshackled Newsletter has given me access to the latest
                changes in immigration laws and H-1B data. It’s saved me time to
                research and also given me ideas about what paths I can take to
                secure a Green Card in the future.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-4 rounded-lg px-4 py-16 ">
          <h2 className="pb-8 text-center text-5xl font-bold">
            U.S. immigration is <span className="text-primary">complex</span>{" "}
            <br /> and <span className="text-primary">overwhelming</span>
          </h2>
          <p className="pb-8 text-center text-3xl font-bold">
            Things are changing all the time, for{" "}
            <span className="text-primary">better</span> and{" "}
            <span className="text-destructive">worse</span>.
          </p>
          <div className="mx-auto max-w-2xl rounded-lg bg-card p-8">
            <h3 className="text-center text-3xl font-bold">
              Just to give some examples ...
            </h3>
            <div className="flex flex-col py-4">
              <div className="flex gap-2 py-2 text-lg font-semibold">
                <ThumbsDownIcon className="pt-2 text-2xl text-primary" />
                <p className="text-muted-foreground">
                  In May 2019, President Trump banned work permits for H-4
                  immigrant spouses.
                </p>
              </div>
              <div className="flex gap-2 py-2 text-lg font-semibold">
                <ThumbsDownIcon className="pt-2 text-2xl text-primary" />
                <p className="text-muted-foreground">
                  In January 2023, USCIS proposed a fee hike across every visa
                  application (including H-1B, L-1, and O-1).
                </p>
              </div>
              <div className="flex gap-2 py-2 text-lg font-semibold">
                <ThumbsUpIcon className="pt-2 text-2xl text-primary" />
                <p className="text-muted-foreground">
                  In Nov 2023, Congress proposed a bill to cut down green card
                  backlogs, helping Indian immigrants.
                </p>
              </div>
            </div>
          </div>
          <div className="mx-auto my-4 text-center">
            <p className="text-2xl font-bold text-muted-foreground">
              You <span className="text-primary">shouldn’t</span> be in the dark
              on these.
            </p>
            <p className="text-2xl font-bold text-muted-foreground">
              You also <span className="text-primary">shouldn’t</span> waste
              your time or money trying to keep up.
            </p>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-4 rounded-lg px-4  py-16 ">
          <h2 className="pb-8 text-center text-5xl font-bold">
            That’s what the <span className="text-primary">Unshackled</span>{" "}
            <br /> newsletter is for.
          </h2>

          <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-4 bg-card px-4 py-8 ">
            <JoinNewsletterForm />
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-4 rounded-lg px-4 py-16 ">
          <h2 className="pb-8 text-center text-4xl font-bold">
            Breaking news. Free webinars. Latest trends.
          </h2>

          <div className="relative mx-auto scale-75 py-6 md:scale-100">
            <Image
              src="https://github.com/hrishikeshmane/unshackled-asstets/blob/main/newletter/newsletter-phone-2.png?raw=true"
              alt="Soundarya"
              width={300}
              height={300}
              className="opacity-60"
            />
            <div className="absolute -right-32 top-8 w-64 rounded-md border border-primary bg-card px-4 py-2 text-sm text-primary">
              Premium Processing Fee Surge: USCIS Announces Hike for Key Visa
              Applications
            </div>
            <div className="absolute -left-28 bottom-[50%] w-48 rounded-md border border-primary bg-card px-4 py-2 text-sm text-primary">
              Free Webinar: Top Visa Solutions for Start-Up Founders in 2024!
            </div>
            <div className="absolute -right-28 bottom-36 w-56 rounded-md border border-primary bg-card px-4 py-2 text-sm text-primary">
              New Consulates and Staff Boost Aim to Reduce US Visa Delays for
              Indian Applicants
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-3xl flex-col justify-center gap-4 rounded-lg px-4 py-16">
          <h2 className="pb-4 text-left text-4xl font-bold">
            The Unshackled newsletter isn’t for everyone.
          </h2>
          <p className="pb-0 text-left text-xl font-semibold">
            You should sign up if:
          </p>

          <div className="mx-auto flex flex-col py-4">
            <div className="flex gap-2 py-2 text-lg font-semibold">
              <SparkleIcon className="pt-2 text-2xl text-primary" />
              <p className="text-muted-foreground">
                You don&apos;t want the H-1B lottery to decide your future, and
                start working toward the O-1A talent visa.
              </p>
            </div>
            <div className="flex gap-2 py-2 text-lg font-semibold">
              <SparkleIcon className="pt-2 text-2xl text-primary" />
              <p className="text-muted-foreground">
                You&apos;re frustrated with the green card backlog and want to
                explore the EB-1A route.
              </p>
            </div>
            <div className="flex gap-2 py-2 text-lg font-semibold">
              <SparkleIcon className="pt-2 text-2xl text-primary" />
              <p className="text-muted-foreground">
                You&apos;re a student on F-1 about to enter the workforce, and
                want to know all your options to work.
              </p>
            </div>
            <div className="flex gap-2 py-2 text-lg font-semibold">
              <SparkleIcon className="pt-2 text-2xl text-primary" />
              <p className="text-muted-foreground">
                You&apos;re ready to start a company in the U.S. and live the
                American dream.
              </p>
            </div>
            <div className="flex gap-2 py-2 text-lg font-semibold">
              <SparkleIcon className="pt-2 text-2xl text-primary" />
              <p className="text-muted-foreground">
                You don&apos;t want to miss any breaking news on immigration.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-4 rounded-lg bg-card px-4 py-16 ">
          <h2 className="pb-4 text-center text-4xl font-bold">
            Instead of wasting 10+ hours of your time, spend <br />
            <span className="text-primary">{` < 5 minutes a week`}</span>{" "}
            de-risking your future.
          </h2>
          <div className="flex w-full flex-col items-center justify-center gap-4 px-4 pt-8 ">
            <JoinNewsletterForm />
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default NewsLetterPage;
