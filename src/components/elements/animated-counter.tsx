"use client";

import { animate } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface CounterProps {
  from: number;
  to: number;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({ from, to, className }) => {
  const nodeRef = useRef<HTMLParagraphElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = Math.round(value).toString();
      },
    });

    return () => controls.stop();
  }, [from, to, isInView]);

  return (
    <motion.p
      className={className}
      ref={nodeRef}
      // initial={{ opacity: 1, scale: 1 }}
      // animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4 }}
    />
  );
};

export default Counter;
