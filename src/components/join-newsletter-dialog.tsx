"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { JoinNewsletterForm, PopupForm } from "./convertkit-forms";
import { siteConfig } from "@/lib/config";

const JoinNewsLetterDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000); // 60000 milliseconds = 1 minute

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="scale-50 sm:max-w-[60vw] md:max-w-4xl md:scale-100">
        <div className="mx-auto my-4 flex w-full max-w-7xl flex-col justify-center gap-4 rounded-lg bg-card p-10">
          <h2 className="mx-auto max-w-4xl text-center text-4xl font-bold leading-[4rem] text-primary sm:text-2xl">
            Don’t waste your time and money trying to keep up with U.S.
            immigration.
          </h2>
          <p className="mx-auto max-w-4xl text-center text-2xl font-bold leading-8 text-muted-foreground sm:text-lg ">
            {`Join ${siteConfig.newsletterCount} immigrants who get a careful curation of breaking news,
            free webinar invites & latest trends on immigration every week.
            Reading time: 5 minutes.`}
          </p>
          <div className="flex w-full flex-col items-center justify-center gap-4 py-4">
            <PopupForm />
          </div>
        </div>
        {/* <DialogHeader>
          <DialogTitle>Time's up!</DialogTitle>
          <DialogDescription>
            This dialog has appeared after 1 minute of loading the page.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default JoinNewsLetterDialog;
