"use client";

import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center justify-center mb-8 md:mb-12">
        <motion.div
          className="flex items-center gap-2 mb-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10,
            delay: 0.2,
          }}
        >
          <motion.h1
            className="text-4xl font-bold tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Ask Bubu
          </motion.h1>
        </motion.div>
        <motion.p
          className="text-muted-foreground text-center max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Your AI-powered culinary assistant. Generate delicious recipes from
          text or images.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Header;
