import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 2) setStep(step + 1);
      else onComplete();
    }, 1200);
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617] overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="blueprint-grid absolute inset-0 opacity-10" />
      
      {/* Animated Lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100vw' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-px bg-cyan-500/30"
        />
         <motion.div 
          initial={{ height: 0 }}
          animate={{ height: '100vh' }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          className="w-px bg-cyan-500/30"
        />
      </div>

      <div className="relative text-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
             <motion.div
               key="step1"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.1 }}
               className="flex flex-col items-center"
             >
               <div className="mb-4 h-20 w-20 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                    className="h-full w-full border-2 border-cyan-500"
                  />
               </div>
               <span className="text-xs font-mono tracking-[0.5em] text-cyan-500/50 uppercase">Initializing Blueprint...</span>
             </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl font-bold tracking-tighter text-white md:text-6xl">
                TREELINE <span className="text-cyan-500">MASONRY</span>
              </h1>
              <div className="mt-4 h-1 w-40 bg-cyan-500/20 overflow-hidden">
                <motion.div 
                   initial={{ x: '-100%' }}
                   animate={{ x: '100%' }}
                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                   className="h-full w-20 bg-cyan-500 shadow-[0_0_15px_cyan]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Coordinate Markers */}
      <div className="absolute top-10 left-10 font-mono text-[10px] text-cyan-500/30">
        [ Lat: 39.6403° N, Lon: 106.3742° W ]
      </div>
      <div className="absolute bottom-10 right-10 font-mono text-[10px] text-cyan-500/30">
        SCALE: 1:100 | REV: 2026.03.20
      </div>
    </div>
  );
};
