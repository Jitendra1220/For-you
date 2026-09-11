import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Moon, Wand2, Heart, RotateCcw, Clover } from 'lucide-react';
import { RelationshipConfig } from '../types';
import { ambientSound } from '../utils/audioSynth';

interface FinalQuestionSectionProps {
  data: RelationshipConfig;
}

interface LuckCard {
  id: string;
  number: number;
  icon: string;
  IconComponent: React.ElementType;
  title: string;
  subtitle: string;
  accentColor: string;
  glowColor: string;
}

export const FinalQuestionSection: React.FC<FinalQuestionSectionProps> = ({
  data,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasCommitted, setHasCommitted] = useState(false);

  const cards: LuckCard[] = [
    {
      id: 'card-1',
      number: 1,
      icon: '✨',
      IconComponent: Sparkles,
      title: 'Choose Me',
      subtitle: 'Destiny whispers',
      accentColor: '#E8A598',
      glowColor: 'rgba(232, 165, 152, 0.35)',
    },
    {
      id: 'card-2',
      number: 2,
      icon: '🌙',
      IconComponent: Moon,
      title: 'Choose Me',
      subtitle: 'Written in stars',
      accentColor: '#F5C6BA',
      glowColor: 'rgba(245, 198, 186, 0.35)',
    },
    {
      id: 'card-3',
      number: 3,
      icon: '💫',
      IconComponent: Wand2,
      title: 'Choose Me',
      subtitle: 'Trust your gut',
      accentColor: '#EADECB',
      glowColor: 'rgba(234, 222, 203, 0.35)',
    },
  ];

  const handleCardClick = (card: LuckCard) => {
    if (selectedCardId) return;

    ambientSound.playGentleChime(1.2);
    setSelectedCardId(card.id);

    // Dramatic pause before revealing the result
    setTimeout(() => {
      setIsRevealed(true);
      ambientSound.playGentleChime(1.4);

      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E8A598', '#B83358', '#EADECB', '#F5C6BA', '#FFF5EB'],
          shapes: ['circle', 'star'],
          scalar: 1.0,
          ticks: 220,
        });
      } catch {
        // Confetti fallback
      }
    }, 600);
  };

  const handleReset = () => {
    setSelectedCardId(null);
    setIsRevealed(false);
    setHasCommitted(false);
  };

  const handleFinalPromise = () => {
    ambientSound.playGentleChime(1.5);
    setHasCommitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#B83358', '#E8A598', '#FFF5EB'],
        shapes: ['circle'],
        scalar: 1.1,
      });
    } catch {
      // Confetti fallback
    }
  };

  const selectedCard = cards.find((c) => c.id === selectedCardId);

  return (
    <section
      id="screen-final-question"
      className="relative min-h-[90vh] py-24 px-4 sm:px-6 max-w-5xl mx-auto z-10 flex flex-col items-center justify-center text-center"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial from-[#5E1B2C]/20 via-[#1E0814]/10 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.0 }}
        className="w-full relative z-10"
      >
        {/* Section Header */}
        <div className="space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-sans-jakarta uppercase tracking-widest text-[#E8A598]">
            <Clover className="w-3.5 h-3.5 text-[#E8A598]" />
            <span>Fate & Second Chances</span>
          </div>

          {/* New Primary Heading: Fir se shuru karein? / Can we start again? */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-cormorant font-normal text-[#FFF5EB] tracking-tight">
            Can we start again? ✨
          </h2>

          <p className="text-xl sm:text-2xl md:text-3xl font-serif-cormorant italic text-[#E8A598] font-normal">
            Let’s leave this one to luck… 🍀
          </p>

          <p className="text-sm sm:text-base font-serif-cormorant italic text-[#EADECB]/80 max-w-md mx-auto">
            Choose wisely… fate decides what happens next 👀
          </p>
        </div>

        {/* The 3 Mysterious Cards Selection Grid */}
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="mystery-cards-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-3xl mx-auto items-stretch"
            >
              {cards.map((card, idx) => {
                const isThisSelected = selectedCardId === card.id;
                const isAnySelected = selectedCardId !== null;
                const isOtherFading = isAnySelected && !isThisSelected;
                const Icon = card.IconComponent;

                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: isOtherFading ? 0 : 1,
                      scale: isOtherFading ? 0.85 : isThisSelected ? 1.06 : 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: isAnySelected ? 0 : idx * 0.12,
                    }}
                    whileHover={
                      !isAnySelected
                        ? {
                            y: -8,
                            scale: 1.03,
                            transition: { duration: 0.25 },
                          }
                        : {}
                    }
                    whileTap={!isAnySelected ? { scale: 0.97 } : {}}
                    onClick={() => handleCardClick(card)}
                    className={`relative rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between text-center transition-all duration-300 overflow-hidden cursor-pointer select-none min-h-[280px] sm:min-h-[320px] md:min-h-[340px] ${
                      isThisSelected
                        ? 'bg-gradient-to-b from-[#3C0D1B] to-[#1F0812] border-2 border-[#E8A598] shadow-[0_0_40px_rgba(232,165,152,0.4)]'
                        : 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#E8A598]/40 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(232,165,152,0.25)] backdrop-blur-md'
                    }`}
                  >
                    {/* Card Number Badge */}
                    <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs font-sans-jakarta font-medium text-[#E8A598]">
                      #{card.number}
                    </div>

                    {/* Shimmer Ambient Aura */}
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-40"
                      style={{
                        background: `radial-gradient(circle at 50% 30%, ${card.glowColor}, transparent 70%)`,
                      }}
                    />

                    {/* Card Top Icon Pill */}
                    <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center shadow-inner mt-2 mb-4 group-hover:border-[#E8A598]/50 transition-colors">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#E8A598]" />
                    </div>

                    {/* Card Title & Subtitle */}
                    <div className="relative z-10 my-auto space-y-2">
                      <div className="text-2xl sm:text-3xl font-serif-cormorant font-medium text-[#FFF5EB]">
                        {card.title}
                      </div>
                      <p className="text-xs sm:text-sm font-sans-jakarta font-light text-[#EADECB]/60 tracking-wider">
                        Card #{card.number} • {card.subtitle}
                      </p>
                    </div>

                    {/* Bottom Prompt Badge */}
                    <div className="relative z-10 mt-6 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-sans-jakarta uppercase tracking-widest text-[#E8A598]">
                      {isThisSelected ? 'Revealing...' : 'Tap to choose ✨'}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* Revealed Fate State */
            <motion.div
              key="revealed-outcome"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative max-w-xl mx-auto rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#2D0A16] via-[#1A0610] to-[#0E0308] border border-[#E8A598]/40 shadow-[0_0_60px_-10px_rgba(184,51,88,0.45)] backdrop-blur-xl"
            >
              {/* Top Sparkle Emblem */}
              <div className="relative mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#5E1B2C] to-[#8C2343] border border-[#E8A598]/50 flex items-center justify-center text-[#FFF5EB] mb-6 shadow-[0_0_25px_rgba(232,165,152,0.3)]">
                <Heart className="w-8 h-8 text-[#FFF5EB] fill-[#FFF5EB]" />
              </div>

              {/* Chosen Card Tag */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-sans-jakarta text-[#E8A598] mb-4">
                <span>Chosen:</span>
                <span className="text-[#FFF5EB] font-medium">
                  Card #{selectedCard?.number || 1} • Choose Me
                </span>
                <span>{selectedCard?.icon || '✨'}</span>
              </div>

              {/* The Revealed Sentence */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif-cormorant font-medium text-[#FFF5EB] tracking-tight leading-tight mb-4">
                “Okay… this is your LAST chance. ❤️”
              </h3>

              <p className="text-base sm:text-lg font-serif-cormorant italic text-[#EADECB]/90 max-w-md mx-auto leading-relaxed mb-8">
                Fate has spoken. And I promise I won’t take a single second of
                this chance for granted.
              </p>

              {/* Final Action / Promise Button */}
              <div className="flex flex-col items-center gap-4">
                <motion.button
                  id="final-fate-promise-btn"
                  type="button"
                  onClick={handleFinalPromise}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className={`inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-serif-cormorant text-base sm:text-lg tracking-wider transition-all duration-300 cursor-pointer shadow-lg ${
                    hasCommitted
                      ? 'bg-[#3C0D1B] border border-[#E8A598] text-[#FFF5EB]'
                      : 'bg-gradient-to-r from-[#5E1B2C] via-[#8C2343] to-[#B83358] border border-[#E8A598]/40 text-[#FFF5EB] hover:shadow-[0_0_30px_rgba(232,165,152,0.4)]'
                  }`}
                >
                  <Heart className="w-4 h-4 text-[#E8A598] fill-[#E8A598]" />
                  <span>
                    {hasCommitted
                      ? 'I will make every moment count ❤️'
                      : 'I promise to make it count ❤️'}
                  </span>
                </motion.button>

                {/* Subtle Reset Link */}
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-sans-jakarta text-[#EADECB]/50 hover:text-[#E8A598] transition-colors mt-2 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Try your luck again ↻</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
