import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { RelationshipConfig } from '../types';

interface LetterSectionProps {
  data: RelationshipConfig;
}

export const LetterSection: React.FC<LetterSectionProps> = ({ data }) => {
  const { deepLetter, girlfriendName } = data;

  return (
    <section
      id="screen-letter"
      className="relative min-h-screen py-28 px-4 sm:px-6 max-w-3xl mx-auto z-10 flex flex-col justify-center"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#64182B]/10 blur-[120px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3C0D1B]/40 border border-[#B83358]/20 text-[#E8A598] text-xs uppercase tracking-widest mb-4">
          <Heart className="w-3.5 h-3.5 fill-[#E8A598]" />
          <span>From My Heart</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-cormorant font-normal text-[#F5EBE1] tracking-tight mb-2">
          {deepLetter.heading}
        </h2>

        {girlfriendName && girlfriendName !== 'My Love' && (
          <p className="text-sm font-serif-cormorant italic text-[#E8A598]/80">
            For {girlfriendName}
          </p>
        )}
      </motion.div>

      {/* Letter Body in Pure Cinematic Flow */}
      <div className="space-y-8 sm:space-y-10 text-lg sm:text-xl md:text-2xl font-serif-cormorant text-[#EADECB] leading-relaxed">
        {deepLetter.paragraphs.map((paragraph, index) => {
          // Highlight key climax statements
          const isHighlight =
            paragraph.includes("I love you") ||
            paragraph.includes("chance to earn it back") ||
            paragraph.includes("show you");

          return (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className={`transition-colors duration-500 ${
                isHighlight
                  ? 'text-[#FFF5EB] font-medium text-xl sm:text-2xl md:text-3xl italic tracking-wide border-l-2 border-[#B83358] pl-5 sm:pl-6 my-6'
                  : 'text-[#EADECB]/90 font-light'
              }`}
            >
              {paragraph}
            </motion.p>
          );
        })}
      </div>
    </section>
  );
};
