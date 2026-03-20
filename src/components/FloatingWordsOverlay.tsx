import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FloatingWordsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  keywords: string[];
}

const FloatingWordsOverlay = ({ isOpen, onClose, title, keywords }: FloatingWordsOverlayProps) => {
  const [particles, setParticles] = useState<{ id: number; word: string; x: number; y: number; duration: number; delay: number; scale: number }[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Reduced particle count for better performance
      const newParticles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        word: keywords[i % keywords.length],
        x: Math.random() * 90, // Keep within 90vw
        y: Math.random() * 100,
        duration: 20 + Math.random() * 25, // Slower for smoothness
        delay: Math.random() * -20,
        scale: 0.7 + Math.random() * 1,
      }));
      setParticles(newParticles);
    }
  }, [isOpen, keywords]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-color)] shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"
        >
          {/* Background Technical Grid */}
          <div className="blueprint-grid absolute inset-0 opacity-[0.05]" />
          
          {/* Floating Words Container */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: `${p.x}vw`, y: `110vh` }}
                animate={{ 
                  opacity: [0, 0.3, 0.3, 0],
                  y: [`110vh`, `-10vh`]
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  position: 'absolute',
                  scale: p.scale,
                  left: 0,
                  top: 0
                }}
                className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-[var(--accent)]/20 whitespace-nowrap"
              >
                {p.word}
              </motion.div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="fixed top-32 right-8 z-[110] rounded-2xl bg-[var(--accent)]/10 p-5 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-500 border border-[var(--accent)]/20 shadow-lg group"
          >
            <X className="h-8 w-8 group-hover:rotate-90 transition-transform duration-500" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-40 transition-opacity">Close</span>
          </button>

          {/* Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            className="relative z-10 w-full max-w-5xl p-6 text-center"
          >
            <motion.div
               animate={{ opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="mb-4 inline-block text-[10px] font-black uppercase tracking-[0.6em] text-[var(--accent)]"
            >
              Precision Engineering
            </motion.div>
            
            <h2 className="mb-16 text-6xl font-black uppercase tracking-tighter md:text-9xl leading-none">
              {title}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              {keywords.slice(0, 9).map((word, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  style={{ 
                    borderColor: 'var(--overlay-card-border)',
                    boxShadow: 'var(--overlay-card-glow)'
                  }}
                  className="flex items-center justify-center p-10 text-xs font-black uppercase tracking-[0.2em] border-2 bg-[var(--card-bg)] hover:bg-[var(--accent)] hover:text-white transition-all duration-300 cursor-default group rounded-3xl"
                >
                  <span className="opacity-80 group-hover:opacity-100 transition-all text-[var(--text-color)] group-hover:text-white">
                    {word}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="mt-20 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-20" 
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingWordsOverlay;
