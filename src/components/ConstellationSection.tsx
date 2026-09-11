import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, Heart, X, Compass } from 'lucide-react';
import { RelationshipConfig, ConstellationStar } from '../types';
import { ambientSound } from '../utils/audioSynth';

interface ConstellationSectionProps {
  data: RelationshipConfig;
}

export const ConstellationSection: React.FC<ConstellationSectionProps> = ({ data }) => {
  const [selectedStar, setSelectedStar] = useState<ConstellationStar | null>(data.constellation[0]);
  const [hoveredStarId, setHoveredStarId] = useState<string | null>(null);

  const handleStarClick = (star: ConstellationStar) => {
    ambientSound.playGentleChime(1.25);
    setSelectedStar(star);
  };

  // Build SVG path lines between consecutive constellation stars to form the constellation arc
  const stars = data.constellation;
  // Heart coordinates connection sequence
  // Star 1 (left cusp) -> Star 2 (top left) -> Star 3 (center dips down) -> Star 4 (top right) -> Star 5 (right cusp) -> (bottom tip anchor virtual point 50, 80) -> Star 1
  const pathD = `M ${stars[0].x} ${stars[0].y} 
                 Q ${stars[1].x - 5} ${stars[1].y - 5}, ${stars[1].x} ${stars[1].y}
                 Q 42 12, ${stars[2].x} ${stars[2].y}
                 Q 58 12, ${stars[3].x} ${stars[3].y}
                 Q ${stars[4].x + 5} ${stars[4].y - 5}, ${stars[4].x} ${stars[4].y}
                 Q 75 75, 50 84
                 Q 25 75, ${stars[0].x} ${stars[0].y}`;

  return (
    <section
      id="screen-constellation"
      className="relative min-h-screen py-24 px-4 sm:px-6 max-w-6xl mx-auto z-10 flex flex-col items-center justify-center"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0 }}
        className="text-center mb-10 sm:mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3C0D1B]/40 border border-[#B83358]/20 text-[#E8A598] text-xs uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Sky</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-cormorant font-normal text-[#F5EBE1] tracking-tight mb-3">
          The “Us” Constellation
        </h2>

        <p className="text-sm sm:text-base text-[#EADECB]/70 font-sans-jakarta font-light max-w-lg mx-auto">
          Every moment with you formed a star. Tap each star in our night sky.
        </p>
      </motion.div>

      {/* Interactive Constellation Sky Container */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Constellation Canvas Viewport (7 Cols) */}
        <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/11] glass-panel rounded-3xl p-4 sm:p-8 border border-white/10 overflow-hidden flex items-center justify-center bg-[#0B070E]/80 shadow-[0_0_50px_-10px_rgba(100,24,43,0.3)]">
          {/* Subtle Deep Space Glow */}
          <div className="absolute inset-0 bg-radial from-[#5E1B2C]/20 via-transparent to-transparent pointer-events-none" />

          {/* SVG Constellation Lines */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full relative z-10 overflow-visible"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B83358" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#E8A598" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#B83358" stopOpacity="0.4" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Faint Constellation Arc Line */}
            <path
              d={pathD}
              fill="rgba(184, 51, 88, 0.03)"
              stroke="url(#lineGrad)"
              strokeWidth="0.6"
              strokeDasharray="2, 2"
              className="animate-[pulse_4s_ease-in-out_infinite]"
            />

            {/* Direct Connectors between stars */}
            {stars.map((star, i) => {
              if (i === stars.length - 1) return null;
              const next = stars[i + 1];
              return (
                <line
                  key={`line-${i}`}
                  x1={star.x}
                  y1={star.y}
                  x2={next.x}
                  y2={next.y}
                  stroke="rgba(234, 222, 203, 0.35)"
                  strokeWidth="0.8"
                  filter="url(#glow)"
                />
              );
            })}

            {/* Star Nodes */}
            {stars.map((star, index) => {
              const isSelected = selectedStar?.id === star.id;
              const isHovered = hoveredStarId === star.id;

              return (
                <g
                  key={star.id}
                  className="cursor-pointer group"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredStarId(star.id)}
                  onMouseLeave={() => setHoveredStarId(null)}
                >
                  {/* Outer Pulsing Ring */}
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r={isSelected ? 6.5 : isHovered ? 5.5 : 3.5}
                    fill={isSelected ? 'rgba(184, 51, 88, 0.3)' : 'rgba(234, 222, 203, 0.1)'}
                    stroke={isSelected ? '#E8A598' : 'rgba(234, 222, 203, 0.4)'}
                    strokeWidth="0.4"
                    className="transition-all duration-300"
                  />

                  {/* Core Star */}
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r={isSelected ? 2.5 : 1.8}
                    fill={isSelected ? '#FFF5EB' : '#E8A598'}
                    filter="url(#glow)"
                    className="transition-all duration-300"
                  />

                  {/* Star Label in Sky */}
                  <text
                    x={star.x}
                    y={star.y - 4}
                    textAnchor="middle"
                    fill={isSelected ? '#FFF5EB' : 'rgba(234, 222, 203, 0.7)'}
                    fontSize="3"
                    fontFamily="Plus Jakarta Sans"
                    fontWeight={isSelected ? '600' : '400'}
                    className="select-none pointer-events-none transition-all duration-300"
                  >
                    #{index + 1}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Bottom subtle instruction */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-[#EADECB]/40 font-light pointer-events-none">
            <span>✨ 5 Stars of Us</span>
            <span>Tap any star to reveal</span>
          </div>
        </div>

        {/* Selected Star Details Card (5 Cols) */}
        <div className="lg:col-span-5 w-full">
          <AnimatePresence mode="wait">
            {selectedStar && (
              <motion.div
                key={selectedStar.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div className="flex items-center gap-2 text-xs text-[#E8A598] font-sans-jakarta uppercase tracking-wider">
                    <Star className="w-3.5 h-3.5 fill-[#E8A598]" />
                    <span>{selectedStar.date}</span>
                  </div>
                  <span className="text-xs text-[#EADECB]/50 font-serif-cormorant italic">
                    {selectedStar.hint}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif-cormorant text-[#F5EBE1] font-normal mb-4 leading-snug">
                  {selectedStar.title}
                </h3>

                <p className="text-base sm:text-lg font-serif-cormorant italic text-[#EADECB] leading-relaxed mb-6">
                  “{selectedStar.message}”
                </p>

                {/* Star Selector Tabs */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  {stars.map((star, idx) => (
                    <button
                      key={star.id}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      className={`px-3 py-1 rounded-full text-xs font-sans-jakarta transition-all duration-300 cursor-pointer ${
                        selectedStar.id === star.id
                          ? 'bg-[#B83358] text-white shadow-[0_0_15px_rgba(184,51,88,0.5)]'
                          : 'bg-white/[0.04] text-[#EADECB]/60 hover:bg-white/10'
                      }`}
                    >
                      Star #{idx + 1}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
