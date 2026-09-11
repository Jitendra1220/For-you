import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ambientSound } from '../utils/audioSynth';
import { Sparkles, Heart } from 'lucide-react';

interface OpeningScreenProps {
  onStartExperience: () => void;
  girlfriendName: string;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({
  onStartExperience,
  girlfriendName,
}) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Sequence the text reveals:
    // Step 0: Immediately show "Hey..."
    // Step 1: After 1.6s show "I know you're angry with me."
    // Step 2: After 3.4s show "And honestly... you have every right to be."
    // Step 3: After 5.2s show the glowing button "Give me 2 minutes ❤️"
    const timer1 = setTimeout(() => setStep(1), 1600);
    const timer2 = setTimeout(() => setStep(2), 3400);
    const timer3 = setTimeout(() => setStep(3), 5200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleStart = () => {
    ambientSound.playGentleChime(1.0);
    onStartExperience();
  };

  return (
    <motion.div
      id="opening-screen-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 1.2, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070508] px-6 text-center select-none"
    >
      {/* Background Soft Glow Center */}
      <div className="absolute w-96 h-96 rounded-full bg-[#5E1B2C]/15 blur-[120px] pointer-events-none" />

      <div className="relative max-w-xl mx-auto flex flex-col items-center justify-center min-h-[320px]">
        {/* Line 1: Hey... */}
        <AnimatePresence>
          {step >= 0 && (
            <motion.p
              key="line-1"
              initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="text-lg md:text-xl font-light tracking-widest text-[#EADECB]/70 mb-4 font-serif-cormorant italic"
            >
              Hey{girlfriendName && girlfriendName !== 'My Love' ? `, ${girlfriendName}` : ''}...
            </motion.p>
          )}
        </AnimatePresence>

        {/* Line 2: I know you're angry with me */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.h1
              key="line-2"
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="text-2xl sm:text-3xl md:text-4xl font-serif-cormorant font-normal text-[#F5EBE1] tracking-wide mb-3 leading-snug"
            >
              I know you’re angry with me.
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Line 3: And honestly... you have every right to be. */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.p
              key="line-3"
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="text-base sm:text-lg md:text-xl text-[#EADECB]/80 font-sans-jakarta font-light max-w-md mx-auto leading-relaxed mb-10"
            >
              And honestly... you have every right to be.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Glowing Button */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              key="button"
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <button
                id="enter-experience-btn"
                type="button"
                onClick={handleStart}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#3C0D1B] via-[#64182B] to-[#3C0D1B] text-[#FFF5EB] font-sans-jakarta text-sm sm:text-base font-medium tracking-wide shadow-[0_0_30px_-5px_rgba(184,51,88,0.5)] border border-[#EADECB]/20 hover:border-[#EADECB]/50 hover:shadow-[0_0_45px_-3px_rgba(232,165,152,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  <span>Give me 2 minutes</span>
                  <Heart className="w-4 h-4 text-[#E8A598] fill-[#E8A598] transition-transform duration-300 group-hover:scale-125" />
                </span>
                <div className="absolute inset-0 rounded-full bg-[#B83358]/20 blur-md group-hover:bg-[#B83358]/40 transition-colors" />
              </button>

              <p className="text-xs text-[#EADECB]/40 mt-4 tracking-wider uppercase font-light">
                Sound enabled on entry • Best with headphones
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button for quick review */}
      {step < 3 && (
        <button
          type="button"
          onClick={() => setStep(3)}
          className="absolute bottom-8 text-xs text-[#EADECB]/30 hover:text-[#EADECB]/70 transition-colors tracking-widest uppercase font-light"
        >
          Skip intro
        </button>
      )}
    </motion.div>
  );
};
