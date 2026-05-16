import { motion } from 'framer-motion';

export const LogoEmblem = ({ 
  className = "h-48 w-48"
}: { 
  className?: string
}) => {
  return (
    <motion.div 
      className={`relative flex flex-col items-center justify-center cursor-pointer ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Performant static radial gradient instead of heavy animated blurs */}
      <div 
        className="absolute inset-[-50%] bg-[radial-gradient(circle_at_center,var(--company-gold)_0%,transparent_60%)] opacity-20 pointer-events-none"
      />
      
      {/* Floating Logo Container - Only simple Y translation */}
      <motion.div
        className="relative z-10 w-full h-full"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.05 }}
      >
        <img 
          src="/treeline_logo_transparent.png" 
          alt="Treeline Masonry & Construction"
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Performant Outer Contours & Rings - Only simple rotations */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Ring 1 - Solid slow rotation */}
        <motion.div 
          className="absolute inset-0 border border-[var(--company-gold)]/30 rounded-full scale-[1.15]"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Ring 2 - Dashed fast reverse rotation */}
        <motion.div 
          className="absolute inset-0 border border-dashed border-[var(--accent)]/40 rounded-full scale-[1.3]"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Accent dot */}
        <motion.div 
          className="absolute inset-0 scale-[1.15]"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-[-3px] left-1/2 w-2 h-2 bg-[var(--company-gold)] rounded-full shadow-[0_0_8px_var(--company-gold)]" />
        </motion.div>
      </div>
    </motion.div>
  );
};




