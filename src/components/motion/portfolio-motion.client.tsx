"use client";

import {
  MotionConfig,
  motion,
  useAnimate,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect } from "react";

export function PortfolioMotion({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
    >
      {children}
    </MotionConfig>
  );
}

export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true, margin: "0px 0px -24px 0px" });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (inView && !reduced) {
      const animation = animate(
        scope.current,
        { transform: ["translateY(10px)", "translateY(0px)"] },
        { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
      );
      return () => animation.stop();
    }
  }, [inView, reduced, animate, scope]);
  // Content stays readable in server HTML, with JavaScript disabled, and if observers fail.
  return (
    <motion.div ref={scope} className={className}>
      {children}
    </motion.div>
  );
}
