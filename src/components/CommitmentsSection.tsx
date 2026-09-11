import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, MessageCircleHeart, Ear, Compass, CheckCircle2, Hourglass } from 'lucide-react';
import { RelationshipConfig } from '../types';

interface CommitmentsSectionProps {
  data: RelationshipConfig;
}

export const CommitmentsSection: React.FC<CommitmentsSectionProps> = ({ data }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageCircleHeart':
        return <MessageCircleHeart className="w-5 h-5 text-[#E8A598]" />;
      case 'Ear':
        return <Ear className="w-5 h-5 text-[#E8A598]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#E8A598]" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-[#E8A598]" />;
      case 'Hourglass':
        return <Hourglass className="w-5 h-5 text-[#E8A598]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#E8A598]" />;
    }
  };

  return (
    <section
      id="screen-commitments"
      className="relative min-h-screen py-24 px-4 sm:px-6 max-w-4xl mx-auto z-10 flex flex-col items-center"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.0 }}
        className="text-center mb-16 sm:mb-20"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3C0D1B]/40 border border-[#B83358]/20 text-[#E8A598] text-xs uppercase tracking-widest mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Real Actions Over Words</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-cormorant font-normal text-[#F5EBE1] tracking-tight mb-4">
          I don't want to promise perfection.
        </h2>

        <p className="text-sm sm:text-base md:text-lg font-sans-jakarta text-[#EADECB]/70 max-w-xl mx-auto font-light leading-relaxed">
          I want to promise consistency. Here is what I am committing myself to every single day:
        </p>
      </motion.div>

      {/* 5 Commitments List */}
      <div className="w-full space-y-4 sm:space-y-5">
        {data.commitments.map((commitment, index) => (
          <motion.div
            key={commitment.id}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: index * 0.12 }}
            className="group relative glass-panel rounded-2xl p-5 sm:p-7 border border-white/10 hover:border-[#B83358]/40 hover:bg-[#20101B]/80 transition-all duration-400"
          >
            <div className="flex items-start gap-4 sm:gap-6">
              {/* Number and Icon Pill */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#3C0D1B]/60 border border-[#B83358]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getIcon(commitment.iconName)}
                </div>
                <span className="text-[10px] font-sans-jakarta text-[#E8A598]/60 mt-1.5 font-medium tracking-wider">
                  0{commitment.id}
                </span>
              </div>

              {/* Text Content */}
              <div className="flex-grow pt-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-serif-cormorant text-[#F5EBE1] font-medium leading-snug mb-1.5 group-hover:text-[#FFF5EB]">
                  {commitment.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-[#EADECB]/70 font-sans-jakarta font-light leading-relaxed">
                  {commitment.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Core Statement */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, delay: 0.3 }}
        className="mt-16 sm:mt-20 text-center max-w-xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-[#3C0D1B]/30 to-transparent border border-[#EADECB]/10"
      >
        <p className="text-xl sm:text-2xl md:text-3xl font-serif-cormorant font-normal text-[#F5EBE1] leading-relaxed italic">
          “Trust isn't something I can ask you to give me.
          <br className="hidden sm:block" />
          <span className="text-[#E8A598] font-medium"> It's something I have to earn.”</span>
        </p>
      </motion.div>
    </section>
  );
};
