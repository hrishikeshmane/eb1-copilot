import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type LoaderProps = {
  className?: string;
};

const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={cn("h-full w-full items-center justify-center", className)}>
      <Loader2 className="animate-spin text-muted-foreground" />
    </div>
  );
};

export default Loader;
