"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

const AnimatedButton = ({ children, href }) => {
  return (
    <motion.div
      className="relative inline-block"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-orange-500/20 to-amber-500/20 rounded-xl blur-xl transition-opacity group-hover:opacity-100" />

      {/* Shine effect container */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute inset-0 translate-x-[-100%] animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Main button */}
      <motion.a
        href={href}
        className="relative inline-flex items-center justify-center px-8 py-4 rounded-xl backdrop-blur-sm"
        initial={{ borderColor: "rgba(255,255,255,0.1)" }}
        whileHover={{
          borderColor: "rgba(255,255,255,0.2)",
          boxShadow: "0 0 20px 5px rgba(225, 29, 72, 0.2)",
        }}
      >
        {/* Glass background */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-orange-500/10 to-amber-500/10 rounded-xl" />
        <div className="absolute inset-[1px] bg-black/20 rounded-xl backdrop-blur-xl" />

        {/* Content */}
        <div className="relative flex items-center gap-2">
          <span className="text-lg font-medium text-white">{children}</span>
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Play className="w-5 h-5 text-white" />
          </motion.div>
        </div>
      </motion.a>
    </motion.div>
  );
};

export default AnimatedButton;
