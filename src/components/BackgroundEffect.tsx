

import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export const BackgroundEffect = () => {
  const { theme } = useTheme();
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[var(--bg-color)] transition-colors duration-1000">
      {/* Background Mask - Ensures content is readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-color)]/20 to-[var(--bg-color)] opacity-80" />
      
      {/* Dynamic Grid */}
      <div className="blueprint-grid absolute inset-0 opacity-[0.05] transition-opacity duration-1000" />
      
      {/* Radiant Glows */}
      <div className="absolute -top-[10%] -left-[10%] h-[800px] w-[800px] rounded-full bg-[var(--accent)]/5 blur-[150px] mix-blend-screen opacity-50" />
      <div className="absolute bottom-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[120px] mix-blend-screen opacity-30" />
      
      {/* Animated Blueprint Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="blueprint-line"
            style={{
              top: `${6 * i + 10}%`,
              opacity: theme === 'dark' ? 0.3 : 0.6,
              background: `linear-gradient(90deg, transparent, ${theme === 'dark' ? 'rgba(6,182,212,0.3)' : 'rgba(13,148,136,0.4)'}, transparent)`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${25 + i * 3}s`
            }}
          />
        ))}
      </div>

      {/* Floating Particles (Construction nodes) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + 'vw', 
              y: Math.random() * 100 + 'vh',
              opacity: 0,
              scale: 0.5
            }}
            animate={{ 
              y: [null, Math.random() * 100 + 'vh'],
              opacity: [0, 0.4, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: Math.random() * 30 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              backgroundColor: theme === 'dark' ? 'rgba(34, 211, 238, 0.6)' : 'rgba(26, 26, 26, 0.3)',
              boxShadow: theme === 'dark' ? '0 0 15px rgba(34, 211, 238, 0.6)' : 'none',
              border: theme === 'light' ? '1px solid rgba(13, 148, 136, 0.2)' : 'none'
            }}
          />
        ))}
      </div>

      {/* Technical Data Points */}
      <div className="absolute inset-0 pointer-events-none p-12 font-mono text-[9px] font-black tracking-widest uppercase hidden md:flex flex-col justify-between opacity-30">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
             <span className="text-[var(--accent)]">[SYS_NODE_ID] {theme === 'dark' ? 'DS-772' : 'AR-109'}</span>
             <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>BUFFER: STABLE_ARCH_v.1</span>
          </div>
          <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>ELEV: +2,445.1M</span>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <span className="text-[var(--accent)]">TREELINE_CORE_V4</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>MAT: REINFORCED_CONCRETE_01</span>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-2xl font-black">{theme.toUpperCase()}</span>
             <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>[COORD_X: 19.4 | Y: -99.1]</span>
          </div>
        </div>
      </div>
    </div>
  );
};
