"use client";

import { motion, MotionConfig } from "motion/react";
import { useState } from "react";

export const MenuBar = () => {
  const [active, setActive] = useState(false);

  return (
    <MotionConfig
      transition={{
        duration: 0.4,
        ease: "backInOut",
      }}
    >
      <div className="relative flex justify-end">
        <motion.button
          initial={false}
          onClick={() => setActive((prev) => !prev)}
          className="relative h-10 w-10 md:hidden"
          animate={active ? "open" : "closed"}
        >
          {/* Top bar */}
          <motion.span
            className="absolute h-1 w-8 bg-white right-0"
            style={{ top: "25%" }}
            variants={{
              open: { rotate: "45deg", top: "50%" },
              closed: { rotate: "0deg", top: "25%" },
            }}
          />
          {/* Middle bar */}
          <motion.span
            className="absolute h-1 w-8 bg-white right-0"
            style={{ top: "50%" }}
            variants={{
              open: { opacity: 0 },
              closed: { opacity: 1 },
            }}
          />
          {/* Bottom bar (half width) */}
          <motion.span
            className="absolute h-1 w-4 bg-white right-0" // Adjusted width to half (w-4)
            style={{ top: "75%" }}
            variants={{
              open: { rotate: "-45deg", top: "50%", width: "2rem" }, // Animates to match the others
              closed: { rotate: "0deg", top: "75%" },
            }}
          />
        </motion.button>
      </div>
    </MotionConfig>
  );
};
