import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Feather } from 'lucide-react';
import { RelationshipConfig } from '../types';

interface ApologySectionProps {
  data: RelationshipConfig;
  onContinue: () => void;
}

export const ApologySection: React.FC<ApologySectionProps> = ({ data, onContinue }) => {
  const { apologyLetter, girlfriendName, myName } = data;

  return (
    <section
      id="screen-apology"
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6 max-w-4xl mx-auto z-10"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        className="text-center mb-12 sm:mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3C0D1B]/40 border border-[#B83358]/20 text-[#E8A598] text-xs uppercase tracking-widest mb-4">
          <Feather className="w-3.5 h-3.5" />
          <span>From My Heart</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-cormorant font-normal text-[#F5EBE1] tracking-tight leading-tight mb-4">
          {apologyLetter.heading}
        </h2>

        <p className="text-base sm:text-lg md:text-xl font-sans-jakarta text-[#EADECB]/80 max-w-2xl mx-auto font-light leading-relaxed">
          {apologyLetter.subtitle}
        </p>
      </motion.div>

      {/* Handwritten / Elegant Paper Styled Letter Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="w-full relative glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 border border-[#EADECB]/10 overflow-hidden"
      >
        {/* Subtle decorative wax-seal aesthetic watermark in the background */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#5E1B2C]/10 blur-3xl pointer-events-none" />

        {/* Letter Top Stamp / Date */}
        <div className="flex items-center justify-between border-b border-white/5 pb-5 mb-8 text-xs font-sans-jakarta tracking-widest text-[#EADECB]/50 uppercase">
          <span>Personal & Private</span>
          <span>To: {girlfriendName}</span>
        </div>

        {/* Letter Body */}
        <div className="space-y-6 text-[#EADECB] text-base sm:text-lg md:text-xl leading-relaxed font-sans-jakarta font-light">
          {apologyLetter.body.map((paragraph, index) => {
            // Emphasize final lines
            const isClosingHighlight = index >= apologyLetter.body.length - 2;
            return (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={
                  isClosingHighlight
                    ? "font-serif-cormorant text-xl sm:text-2xl italic text-[#F5EBE1] tracking-wide pt-2"
                    : "text-[#EADECB]/90"
                }
              >
                {paragraph}
              </motion.p>
            );
          })}
        </div>

        {/* Sign-off */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.6 }}
          className="mt-10 pt-6 border-t border-white/5 flex flex-col items-start"
        >
          <span className="text-sm font-light text-[#EADECB]/60 italic font-serif-cormorant">
            {apologyLetter.signoff}
          </span>
          <span className="font-handwriting text-2xl sm:text-3xl text-[#E8A598] mt-1 font-normal">
            {myName}
          </span>
        </motion.div>
      </motion.div>

      {/* Subtle Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <button
          type="button"
          onClick={onContinue}
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-[#B83358]/40 hover:bg-[#3C0D1B]/30 text-xs uppercase tracking-widest text-[#EADECB]/70 hover:text-[#FFF5EB] transition-all duration-300 cursor-pointer"
        >
          <span>Continue reading</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#E8A598] transition-transform duration-300 group-hover:translate-y-0.5" />
        </button>
      </motion.div>
    </section>
  );
};
