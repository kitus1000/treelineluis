import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export const BlueprintTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-[70vh] w-full"
    >
      {/* Blueprint Drawing Lines Decoration - Constrained to max-w-7xl area */}
      <div className="pointer-events-none absolute inset-0 z-0 mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative h-full w-full">
          {/* Top Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ width: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="absolute top-0 h-[1.5px] bg-[var(--line-color)] shadow-[0_0_10px_var(--accent)] opacity-50"
          />
          
          {/* Left Vertical Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            exit={{ height: 0 }}
            transition={{ duration: 1, ease: "circOut", delay: 0.2 }}
            className="absolute left-0 w-[1.5px] bg-[var(--line-color)] shadow-[0_0_10px_var(--accent)] opacity-50"
          />

          {/* Bottom Line */}
          <motion.div
            initial={{ width: 0, right: 0 }}
            animate={{ width: '100%' }}
            exit={{ width: 0 }}
            transition={{ duration: 0.8, ease: "circOut", delay: 0.4 }}
            className="absolute bottom-0 h-[1.5px] bg-[var(--line-color)] shadow-[0_0_10px_var(--accent)] opacity-50"
          />

          {/* Corner Marks */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="absolute top-0 left-[-4px] h-4 w-4 border-t-2 border-l-2 border-[var(--accent)] bloom"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
            className="absolute bottom-0 right-[-4px] h-4 w-4 border-b-2 border-r-2 border-[var(--accent)] bloom"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
