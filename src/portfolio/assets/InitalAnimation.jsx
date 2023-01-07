import React from "react";
import { motion } from "framer-motion";

const InitialAnimation = () => {
  const blackBox = {
    initial: {
      height: "100vh",
    },
    animate: {
      height: 0,
    },
  };
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="relative z-50 w-full bg-black"
        initial="initial"
        animate="animate"
        transition={{
          delay: 1.0,
          ease: "easeOut",
        }}
        variants={blackBox}
      />
    </div>
  );
};
export default InitialAnimation;
