import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, Upload } from 'lucide-react';
import { RelationshipConfig } from '../types';
import { ambientSound } from '../utils/audioSynth';

interface FinalSurpriseSectionProps {
  data: RelationshipConfig;
  onLowerVolume?: () => void;
  onRestoreVolume?: () => void;
}

export const FinalSurpriseSection: React.FC<FinalSurpriseSectionProps> = ({
  data,
  onLowerVolume,
  onRestoreVolume,
}) => {
  const surpriseConfig = data.finalSurprise;
  const myName = surpriseConfig?.name || data.myName || 'Yours always';

  const [isOpen, setIsOpen] = useState(false);
  const [timelineStep, setTimelineStep] = useState<number>(0);
  const [imageError, setImageError] = useState(false);
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);
  const [heartParticlesDispersed, setHeartParticlesDispersed] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const photoContainerRef = useRef<HTMLDivElement | null>(null);

  const photoSrc =
    customPhotoUrl ||
    (imageError
      ? 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop'
      : surpriseConfig?.image || 'assets/us-final.jpg');

  // Handle Opening the Cinematic Stage
  const handleOpenSurprise = () => {
    ambientSound.playGentleChime(1.1);
    setIsOpen(true);
    setTimelineStep(0);
    setHeartParticlesDispersed(false);

    // Breathe volume down slightly
    if (onLowerVolume) {
      onLowerVolume();
    } else {
      ambientSound.setAmbientVolume(0.35);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimelineStep(0);
    if (onRestoreVolume) {
      onRestoreVolume();
    } else {
      ambientSound.setAmbientVolume(0.7);
    }
  };

  // Timed Sequence Controller
  useEffect(() => {
    if (!isOpen) return;

    // Step 0 -> Step 1: Sky shifts & photo starts clearing (after 1s)
    const t1 = setTimeout(() => setTimelineStep(1), 1200);

    // Step 2: First message block ("Whatever happens next...") (after 3.5s)
    const t2 = setTimeout(() => setTimelineStep(2), 3800);

    // Step 3: Second message block ("For all the laughs...") (after ~2s pause)
    const t3 = setTimeout(() => setTimelineStep(3), 6200);

    // Step 4: Third message block ("I don't know what tomorrow...") (after ~2s pause)
    const t4 = setTimeout(() => setTimelineStep(4), 8800);

    // Step 5: Signature ("— [MY NAME]")
    const t5 = setTimeout(() => setTimelineStep(5), 11200);

    // Step 6: Heart particle animation begins
    const t6 = setTimeout(() => setTimelineStep(6), 12600);

    // Step 7: Particles disperse & final gentle note
    const t7 = setTimeout(() => {
      setHeartParticlesDispersed(true);
      setTimelineStep(7);
    }, 17500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [isOpen]);

  // Heart particle animation on canvas
  useEffect(() => {
    if (!isOpen || timelineStep < 6) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate heart target points
    const numParticles = 180;
    const heartScale = Math.min(width, height) * 0.024;
    const centerX = width / 2;
    const centerY = height / 2 - 10;

    interface HeartParticle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      shimmerSpeed: number;
      phase: number;
    }

    const colors = ['#E8A598', '#F5C6BA', '#FFF5EB', '#D9778F', '#F0AD8D'];
    const particles: HeartParticle[] = [];

    for (let i = 0; i < numParticles; i++) {
      const t = (i / numParticles) * Math.PI * 2;
      // Parametric heart formula
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
      );

      const targetX = centerX + hx * heartScale;
      const targetY = centerY + hy * heartScale;

      particles.push({
        x: centerX + (Math.random() - 0.5) * width * 0.9,
        y: centerY + (Math.random() - 0.5) * height * 0.9,
        targetX,
        targetY,
        vx: 0,
        vy: 0,
        size: Math.random() * 2.2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.4,
        shimmerSpeed: 0.03 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let startTime = performance.now();

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const elapsed = (now - startTime) / 1000;
      const isDispersing = elapsed > 4.5;

      particles.forEach((p) => {
        if (!isDispersing) {
          // Gravitate towards heart outline
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          p.vx += dx * 0.035;
          p.vy += dy * 0.035;
          p.vx *= 0.82;
          p.vy *= 0.82;
          p.x += p.vx;
          p.y += p.vy;

          p.phase += p.shimmerSpeed;
          const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.phase));

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentAlpha;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
        } else {
          // Gently disperse outward into space
          p.vx += (Math.random() - 0.5) * 0.4;
          p.vy -= Math.random() * 0.35 + 0.1; // rise up like warm embers
          p.x += p.vx;
          p.y += p.vy;
          p.alpha = Math.max(0, p.alpha - 0.008);

          if (p.alpha > 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.shadowBlur = 6;
            ctx.shadowColor = p.color;
            ctx.fill();
          }
        }
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (!isDispersing || particles.some((p) => p.alpha > 0.01)) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, timelineStep]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCustomPhotoUrl(url);
    setImageError(false);
  };

  const messageBlocks = surpriseConfig?.messageBlocks || [
    ['Whatever happens next,', 'thank you for being a part of my life.'],
    [
      'For all the laughs.',
      'For all the memories.',
      'For all the ordinary moments',
      'that somehow became my favourite ones.',
    ],
    [
      "I don't know what tomorrow looks like.",
      '',
      "But I'm grateful that I got to know you,",
      'love you,',
      'and experience all of this with you.',
    ],
  ];

  const closingLines = surpriseConfig?.optionalClosingLines || [
    "You don't have to answer anything right now.",
    'Just take care of yourself. ❤️',
  ];

  return (
    <>
      {/* 1. Subtle Dark Teaser Section in Main Page flow */}
      <section
        id="screen-final-surprise-trigger"
        className="relative min-h-[70vh] flex flex-col items-center justify-center py-24 px-4 sm:px-6 z-10 text-center"
      >
        {/* Deep quiet backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060308] to-[#040206] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.8, delay: 0.3 }}
          className="relative z-10 max-w-lg mx-auto flex flex-col items-center"
        >
          {/* Subtle Glowing Teaser Line */}
          <motion.p
            animate={{
              opacity: [0.75, 1, 0.75],
              textShadow: [
                '0 0 10px rgba(232,165,152,0.15)',
                '0 0 25px rgba(232,165,152,0.4)',
                '0 0 10px rgba(232,165,152,0.15)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-lg sm:text-2xl font-serif-cormorant font-normal text-[#F5EBE1] tracking-wide mb-8"
          >
            {surpriseConfig?.teaserTitle || 'I made one more thing for you.'}
          </motion.p>

          {/* Elegant Glowing "Open ❤️" Button */}
          <motion.button
            id="open-final-surprise-btn"
            type="button"
            onClick={handleOpenSurprise}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            animate={{
              scale: [1, 1.03, 1],
              boxShadow: [
                '0 0 20px rgba(184, 51, 88, 0.25)',
                '0 0 35px rgba(232, 165, 152, 0.45)',
                '0 0 20px rgba(184, 51, 88, 0.25)',
              ],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="group relative inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#5E1B2C] via-[#8C2343] to-[#B83358] border border-[#E8A598]/40 text-[#FFF5EB] text-sm sm:text-base font-serif-cormorant tracking-widest uppercase cursor-pointer overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10 font-medium">
              {surpriseConfig?.buttonText || 'Open ❤️'}
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </motion.div>
      </section>

      {/* 2. Full-Screen Cinematic Transition Stage */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6 }}
            className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start min-h-screen py-12 px-4 sm:px-8 selection:bg-[#B83358] selection:text-white"
          >
            {/* Dynamic Sunrise Sky Background */}
            <motion.div
              initial={{
                background:
                  'radial-gradient(ellipse at bottom, #07040a 0%, #030105 100%)',
              }}
              animate={{
                background:
                  timelineStep >= 1
                    ? 'linear-gradient(to top, #3A1020 0%, #200D1B 25%, #100C1F 55%, #050510 100%)'
                    : 'linear-gradient(to top, #0A0710 0%, #050308 100%)',
              }}
              transition={{ duration: 4.0, ease: 'easeInOut' }}
              className="fixed inset-0 pointer-events-none"
            />

            {/* Rising Dawn Glow from bottom */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0.6 }}
              animate={{
                opacity: timelineStep >= 1 ? 0.85 : 0,
                scaleY: timelineStep >= 1 ? 1 : 0.6,
              }}
              transition={{ duration: 4.5, ease: 'easeOut' }}
              className="fixed bottom-0 inset-x-0 h-[65vh] bg-gradient-to-t from-[#E8A598]/20 via-[#B83358]/15 to-transparent pointer-events-none origin-bottom"
            />

            {/* Gentle Morning Horizon Beam */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: timelineStep >= 1 ? 0.6 : 0 }}
              transition={{ duration: 5.0 }}
              className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[350px] bg-radial from-[#F5C6BA]/25 via-[#8C2343]/10 to-transparent blur-3xl pointer-events-none"
            />

            {/* Close Button */}
            <div className="fixed top-6 right-6 z-50">
              <button
                type="button"
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 text-[#EADECB] hover:text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center my-auto py-8">
              {/* Photo & Heart Particle Stage */}
              <motion.div
                ref={photoContainerRef}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{
                  opacity: timelineStep >= 1 ? 1 : 0,
                  scale: timelineStep >= 1 ? 1 : 0.92,
                }}
                transition={{ duration: 2.5, ease: 'easeOut' }}
                className="relative flex items-center justify-center mb-10"
              >
                {/* Heart Particles Canvas Overlay */}
                <canvas
                  ref={canvasRef}
                  className="absolute -inset-10 sm:-inset-16 w-[calc(100%+5rem)] sm:w-[calc(100%+8rem)] h-[calc(100%+5rem)] sm:h-[calc(100%+8rem)] pointer-events-none z-20"
                />

                {/* Photograph Frame */}
                <div className="group relative w-[70vw] sm:w-[360px] md:w-[420px] aspect-[4/5] sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black/40 backdrop-blur-sm">
                  {/* Subtle Glow Ring */}
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none z-10" />

                  {/* Image with Blur -> Crisp Transition + Gentle Ken Burns Parallax */}
                  <motion.img
                    src={photoSrc}
                    alt="Our Moment"
                    onError={() => setImageError(true)}
                    initial={{ filter: 'blur(25px)', scale: 1.12 }}
                    animate={{
                      filter: timelineStep >= 1 ? 'blur(0px)' : 'blur(25px)',
                      scale: [1, 1.035, 1],
                    }}
                    transition={{
                      filter: { duration: 3.5, ease: 'easeOut' },
                      scale: {
                        duration: 18,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }}
                    className="w-full h-full object-cover object-center select-none"
                  />

                  {/* Ambient Light Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Hidden file input to easily test couple photo directly */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />

                  {/* Gentle hover upload badge to easily swap with their real couple photo */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-3 right-3 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-[#5E1B2C] border border-white/20 text-[11px] text-[#EADECB] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Replace with your own photo"
                  >
                    <Upload className="w-3 h-3 text-[#E8A598]" />
                    <span>Change Photo</span>
                  </button>
                </div>
              </motion.div>

              {/* Timed Messages Container */}
              <div className="space-y-8 max-w-xl mx-auto px-4">
                {/* Block 1 */}
                <AnimatePresence>
                  {timelineStep >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.4, ease: 'easeOut' }}
                      className="space-y-1.5"
                    >
                      {messageBlocks[0]?.map((line, idx) => (
                        <p
                          key={idx}
                          className="text-xl sm:text-2xl md:text-3xl font-serif-cormorant font-normal text-[#FFF5EB] leading-relaxed"
                        >
                          {line}
                        </p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Block 2 */}
                <AnimatePresence>
                  {timelineStep >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.4, ease: 'easeOut' }}
                      className="space-y-1.5"
                    >
                      {messageBlocks[1]?.map((line, idx) => (
                        <p
                          key={idx}
                          className="text-lg sm:text-xl md:text-2xl font-serif-cormorant italic text-[#EADECB] leading-relaxed"
                        >
                          {line}
                        </p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Block 3 */}
                <AnimatePresence>
                  {timelineStep >= 4 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.4, ease: 'easeOut' }}
                      className="space-y-2 pt-2"
                    >
                      {messageBlocks[2]?.map((line, idx) =>
                        line === '' ? (
                          <div key={idx} className="h-2" />
                        ) : (
                          <p
                            key={idx}
                            className="text-lg sm:text-xl md:text-2xl font-serif-cormorant font-light text-[#F5EBE1] leading-relaxed"
                          >
                            {line}
                          </p>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sign-off Name (Block 4) */}
                <AnimatePresence>
                  {timelineStep >= 5 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      className="pt-4 flex flex-col items-center"
                    >
                      <span className="font-handwriting text-3xl sm:text-4xl md:text-5xl text-[#E8A598]">
                        — {myName}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Steady Tiny Glowing Heart Left After Particle Dispersion */}
                <AnimatePresence>
                  {heartParticlesDispersed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{
                        opacity: 1,
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        opacity: { duration: 1.5 },
                        scale: {
                          duration: 2.8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }}
                      className="pt-2 flex justify-center"
                    >
                      <div className="relative p-2">
                        <Heart className="w-5 h-5 text-[#E8A598] fill-[#B83358]" />
                        <div className="absolute inset-0 rounded-full bg-[#B83358]/30 blur-sm pointer-events-none" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Optional Final Gentle Lines (Block 5) */}
                <AnimatePresence>
                  {timelineStep >= 7 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 0.85, y: 0 }}
                      transition={{ duration: 2.0, ease: 'easeOut' }}
                      className="pt-8 pb-12 space-y-1.5 border-t border-white/10"
                    >
                      <p className="text-xs sm:text-sm font-sans-jakarta font-light uppercase tracking-widest text-[#EADECB]/60">
                        {closingLines[0]}
                      </p>
                      <p className="text-sm sm:text-base font-serif-cormorant italic text-[#E8A598]">
                        {closingLines[1]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
