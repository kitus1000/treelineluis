import { motion } from 'framer-motion';

export const LogoEmblem = ({ 
  className = "h-48 w-48"
}: { 
  className?: string
}) => {
  return (
    <motion.div 
      className={`relative flex flex-col items-center justify-center cursor-pointer ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 1, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1
      }}
    >
      {/* Dynamic Background Glow - Pulses slowly to feel 'alive' */}
      <motion.div 
        className="absolute inset-0 bg-[var(--company-gold)] opacity-20 blur-[100px] rounded-full scale-150 pointer-events-none"
        animate={{
          opacity: [0.1, 0.25, 0.1],
          scale: [1.4, 1.6, 1.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating Logo Container */}
      <motion.div
        className="relative z-10 w-full h-full"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.08, rotate: [0, -1, 1, 0] }}
      >
        <img 
          src="/treeline_logo_transparent.png" 
          alt="Treeline Masonry & Construction"
          className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        />

        {/* Shimmer Effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent z-20 pointer-events-none rounded-full"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: 'linear',
            repeatDelay: 3
          }}
        />
      </motion.div>

      {/* Decorative architectural rings (Subtle) */}
      <motion.div 
        className="absolute inset-0 border border-[var(--company-gold)]/10 rounded-full scale-125 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
};




