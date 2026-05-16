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
      {/* Core Glow */}
      <motion.div 
        className="absolute inset-0 bg-[var(--company-gold)] opacity-30 blur-[60px] rounded-full scale-110 pointer-events-none mix-blend-screen"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Expanded ambient glow */}
      <motion.div 
        className="absolute inset-0 bg-[var(--accent)] opacity-10 blur-[100px] rounded-full scale-150 pointer-events-none"
        animate={{
          opacity: [0.05, 0.15, 0.05],
          scale: [1.3, 1.6, 1.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Floating Logo Container */}
      <motion.div
        className="relative z-10 w-full h-full"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
      >
        <img 
          src="/treeline_logo_transparent.png" 
          alt="Treeline Masonry & Construction"
          className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
        />

        {/* Shimmer Effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent z-20 pointer-events-none rounded-full"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: 'linear',
            repeatDelay: 4
          }}
        />
      </motion.div>

      {/* Outer Contours & Rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Ring 1 - Solid slow rotation */}
        <motion.div 
          className="absolute inset-0 border-[1px] border-[var(--company-gold)]/20 rounded-full scale-[1.15]"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Ring 2 - Dashed fast reverse rotation */}
        <motion.div 
          className="absolute inset-0 border-[1px] border-dashed border-[var(--accent)]/30 rounded-full scale-[1.3]"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Ring 3 - Pulsing outer ring */}
        <motion.div 
          className="absolute inset-0 border-[2px] border-[var(--company-gold)]/10 rounded-full scale-[1.45]"
          animate={{ 
            scale: [1.45, 1.5, 1.45],
            opacity: [0.3, 0.8, 0.3] 
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Accent dots on ring 1 */}
        <motion.div 
          className="absolute inset-0 scale-[1.15]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-[-3px] left-1/2 w-1.5 h-1.5 bg-[var(--company-gold)] rounded-full shadow-[0_0_10px_var(--company-gold)]" />
          <div className="absolute bottom-[-3px] left-1/2 w-1 h-1 bg-[var(--accent)] rounded-full shadow-[0_0_8px_var(--accent)]" />
        </motion.div>
      </div>
    </motion.div>
  );
};




