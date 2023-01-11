import React from "react";
import { motion } from "framer-motion";
import myStrings from "../../myStrings";
import "../landingPage.css";

const InitialAnimation = () => {
  const blackBox = {
    initial: {
      opacity: 1,
      height: "100vh",
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
      display: 0,
    },
    animationEnd: {
      opacity: 0,
    },
  };
  const nameDrop = {
    initial: {
      opacity: 0,
      color: "white",
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };
  const animationStyle = {
    position: "absolute",
    objectFit: "cover",
    objectPosition: "center",
    width: "100vw",
    height: "100vh",
    z: 50,
  };
  return (
    <div className="absolute inset-0 items-center justify-content-center">
      <motion.div
        key="modal"
        className="d-flex align-content-center justify-content-center z-50 bg-black"
        initial="initial"
        animate="animate"
        style={animationStyle}
        transition={{
          duration: 0.8,
          delay: 1.5,
          ease: [0.17, 0.67, 0.83, 0.97],
        }}
        exit={{ opacity: 0, duration: 1.5 }}
        variants={blackBox}
      >
        <motion.h2
          className="z-50 justify-self-center align-self-center animate-text text-white"
          key="text"
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          variants={nameDrop}
        >
          {myStrings.animationText}
        </motion.h2>
      </motion.div>
    </div>
  );
};
export default InitialAnimation;
