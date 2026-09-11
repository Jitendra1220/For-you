import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X } from 'lucide-react';
import { RelationshipConfig } from '../types';
import { ambientSound } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface EpilogueFooterProps {
  data: RelationshipConfig;
  onOpenCustomizer?: () => void;
}

export const EpilogueFooter: React.FC<EpilogueFooterProps> = ({ data, onOpenCustomizer }) => {
  const { myName, easterEggText } = data;
  const [heartClickCount, setHeartClickCount] = useState<number>(0);
  const [showEasterEgg, setShowEasterEgg] = useState<boolean>(false);

  const handleHeartClick = () => {
    const nextCount = heartClickCount + 1;
    setHeartClickCount(nextCount);
    ambientSound.playGentleChime(1.0 + nextCount * 0.1);

    if (nextCount >= 5) {
      setShowEasterEgg(true);
      setHeartClickCount(0);
      try {
        confetti({
          particleCount: 35,
          spread: 45,
          origin: { y: 0.85 },
          colors: ['#E8A598', '#B83358', '#EADECB'],
          shapes: ['circle'],
        });
      } catch {}
    }
  };

  return (
    <footer
      id="screen-epilogue"
      className="relative min-h-[70vh] py-28 px-4 sm:px-6 max-w-3xl mx-auto z-10 flex flex-col items-center justify-center text-center"
    >
      {/* Subtle Divider */}
      <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#EADECB]/20 to-transparent mb-16" />

      {/* Main Epilogue Text */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="space-y-6 max-w-lg mx-auto"
      >
        <p className="text-xl sm:text-2xl font-serif-cormorant font-normal text-[#EADECB] leading-relaxed">
          Some things can't be fixed in one night.
        </p>

        <p className="text-xl sm:text-2xl font-serif-cormorant italic text-[#F5EBE1] leading-relaxed">
          But sometimes,
          <br />
          one honest beginning is enough.
        </p>

        <div className="pt-8 flex flex-col items-center">
          <p className="text-base sm:text-lg font-serif-cormorant italic text-[#E8A598]">
            — Yours,
          </p>
          <p className="font-handwriting text-3xl sm:text-4xl text-[#FFF5EB] mt-1">
            {myName}
          </p>
        </div>
      </motion.div>

      {/* Subtle Glowing Heart with Click Interaction for Easter Egg */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-14 flex flex-col items-center"
      >
        <button
          id="easter-egg-heart-trigger"
          type="button"
          onClick={handleHeartClick}
          className="group relative p-3 rounded-full hover:bg-white/[0.04] transition-colors cursor-pointer select-none"
          title="A quiet heart"
          aria-label="Tiny glowing heart"
        >
          <Heart
            className={`w-5 h-5 text-[#E8A598] fill-[#B83358] transition-all duration-300 ${
              heartClickCount > 0 ? 'scale-125 fill-[#E8A598] text-[#FFF5EB]' : 'opacity-70 group-hover:opacity-100 group-hover:scale-110'
            }`}
          />
          <div className="absolute inset-0 rounded-full bg-[#B83358]/20 blur-md pointer-events-none" />
        </button>

        {heartClickCount > 0 && heartClickCount < 5 && (
          <span className="text-[10px] text-[#EADECB]/30 tracking-widest mt-1 font-sans-jakarta">
            {5 - heartClickCount}
          </span>
        )}
      </motion.div>

      {/* Personalization / Developer guide quick button */}
      {onOpenCustomizer && (
        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={onOpenCustomizer}
            className="text-[11px] font-sans-jakarta text-[#EADECB]/30 hover:text-[#EADECB]/70 tracking-widest uppercase transition-colors"
          >
            ⚙️ Personalize Names, Song & Photos
          </button>
        </div>
      )}

      {/* Easter Egg Modal / Card */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEasterEgg(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full glass-panel rounded-3xl p-8 sm:p-10 border border-[#E8A598]/30 shadow-[0_0_50px_rgba(184,51,88,0.4)] text-center"
            >
              <button
                type="button"
                onClick={() => setShowEasterEgg(false)}
                className="absolute top-4 right-4 text-[#EADECB]/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-10 h-10 rounded-full bg-[#3C0D1B] border border-[#B83358]/40 flex items-center justify-center mx-auto mb-4 text-[#E8A598]">
                <Sparkles className="w-5 h-5" />
              </div>

              <h4 className="text-xs uppercase tracking-widest text-[#E8A598] font-sans-jakarta mb-4">
                {easterEggText.lead}
              </h4>

              <p className="text-lg sm:text-xl font-serif-cormorant italic text-[#F5EBE1] leading-relaxed mb-6">
                “{easterEggText.body}”
              </p>

              <p className="text-xl sm:text-2xl font-serif-cormorant text-[#FFF5EB] font-normal tracking-wide">
                {easterEggText.conclusion}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
