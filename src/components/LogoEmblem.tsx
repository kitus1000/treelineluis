import { motion } from 'framer-motion';

export const LogoEmblem = ({ className = "h-12 w-12" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* Hexagonal Outer Frame */}
        <motion.path
          d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* "T" for Treeline - Stylized as structural beams */}
        <motion.path
          d="M30 35 H70 M50 35 V75"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />

        {/* "M" for Masonry - Stylized as arches/mountains */}
        <motion.path
          d="M25 75 V45 L50 65 L75 45 V75"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, delay: 1, ease: "easeInOut" }}
        />

        {/* Structural Cross-points (Glow nodes) */}
        <motion.circle
          cx="50" cy="35" r="2"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ delay: 1.2, duration: 0.5 }}
        />
        <motion.circle
          cx="50" cy="65" r="2"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ delay: 2, duration: 0.5 }}
        />
      </svg>
      
      {/* Decorative Glow Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-cyan-500/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
};
