"use client";

import { motion, MotionConfig } from "motion/react";
import { useState } from "react";

export const MenuBar = () => {
  const [active, setActive] = useState(false);

  console.log(active);

  return (
    <MotionConfig
      transition={{
        duration: 0.4,
        ease: "backInOut",
      }}
    >
      <motion.button
        initial={false}
        onClick={() => setActive((prev) => !prev)}
        className="relative h-20 w-20 rounded-full bg-white/0 transition-colors hover:bg-white/5 md:hidden"
        animate={active ? "open" : "closed"}
      >
        <motion.span
          style={{ left: "50%", top: "35%", x: "-50%", y: "-50%" }}
          className="absolute h-1 w-10 bg-white"
          variants={{
            open: {
              rotate: ["0deg", "0deg", "45deg"],
              top: ["35%", "50%", "50%"],
            },
            closed: {
              rotate: ["45deg", "0deg", "0deg"],
              top: ["50%", "50%", "35%"],
            },
          }}
        />
        <motion.span
          style={{
            left: "50%",
            top: "50%",
            x: "-50%",
            y: "-50%",
          }}
          className="absolute h-1 w-10 bg-white"
          variants={{
            open: {
              rotate: ["0deg", "0deg", "-45deg"],
            },
            closed: {
              rotate: ["-45deg", "0deg", "0deg"],
            },
          }}
        />
        <motion.span
          style={{
            left: "calc(50% + 10px)",
            bottom: "35%",
            x: "-50%",
            y: "50%",
          }}
          className="absolute h-1 w-5 bg-white"
          variants={{
            open: {
              rotate: ["0deg", "0deg", "45deg"],
              left: "50%",
              bottom: ["35%", "50%", "50%"],
            },
            closed: {
              rotate: ["45deg", "0deg", "0deg"],
              bottom: ["50%", "50%", "35%"],
            },
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};
