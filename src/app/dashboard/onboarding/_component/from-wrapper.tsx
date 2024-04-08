"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type FormWrapperProps = {
  title?: string;
  description?: string;
  delta: number;
  children: ReactNode;
};

const FormWrapper = ({ delta, children }: FormWrapperProps) => {
  return (
    <motion.div
      initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-white md:text-2xl">
          {title}
        </h2>
        <p className="text-sm text-neutral-300 md:text-base">{description}</p>
      </div> */}
      {children}
    </motion.div>
  );
};

export default FormWrapper;
