// TextGenerateEffect.js
"use client";

import React, { useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

const TextGenerateEffect = ({
  words,
  className = "",
  filter = true,
  duration = 0.4,
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration || 1,
        delay: (i) => i * 0.1,
      }
    );
  }, [animate, duration, filter]); // Removed scope.current from dependencies

  const renderWords = () => {
    return (
      <motion.div ref={scope} className={className}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="text-gray-300 opacity-0 inline-block"
            style={{
              filter: filter ? "blur(8px)" : "none",
              marginRight: "0.4em",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return renderWords();
};

export default TextGenerateEffect;
