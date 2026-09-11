import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { initialRelationshipData } from './relationshipData';
import { RelationshipConfig } from './types';
import { ambientSound } from './utils/audioSynth';

import { BackgroundStars } from './components/BackgroundStars';
import { AudioPlayerController } from './components/AudioPlayerController';
import { OpeningScreen } from './components/OpeningScreen';
import { ApologySection } from './components/ApologySection';
import { CommitmentsSection } from './components/CommitmentsSection';
import { ConstellationSection } from './components/ConstellationSection';
import { LetterSection } from './components/LetterSection';
import { FinalQuestionSection } from './components/FinalQuestionSection';
import { FinalSurpriseSection } from './components/FinalSurpriseSection';
import { EpilogueFooter } from './components/EpilogueFooter';
import { CustomizerDrawer } from './components/CustomizerDrawer';

export default function App() {
  const [data, setData] = useState<RelationshipConfig>(initialRelationshipData);
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioVolume, setAudioVolume] = useState<number>(0.8);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);

  // When user clicks "Give me 2 minutes ❤️", start the emotional soundscape and reveal the letter
  const handleStartExperience = () => {
    setHasEntered(true);
    setIsPlayingAudio(true);
    ambientSound.startAmbient();
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      ambientSound.stopAmbient(1.5);
      setIsPlayingAudio(false);
    } else {
      ambientSound.startAmbient();
      setIsPlayingAudio(true);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setAudioVolume(newVol);
    ambientSound.setAmbientVolume(newVol);
  };

  const handleLowerVolumeForSurprise = () => {
    ambientSound.setAmbientVolume(0.35);
  };

  const handleRestoreVolumeForSurprise = () => {
    ambientSound.setAmbientVolume(audioVolume);
  };

  const scrollToNextSection = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08060A] text-[#EADECB] selection:bg-[#5E1B2C] selection:text-[#FFF5EB] overflow-x-hidden">
      {/* Dynamic Cosmic Background Canvas with ambient burgundy gradient */}
      <BackgroundStars />

      {/* Floating Audio Controller */}
      <AudioPlayerController
        isPlayingAudio={isPlayingAudio}
        onTogglePlay={handleToggleAudio}
        trackName="Atmospheric Reverie"
        volume={audioVolume}
        onVolumeChange={handleVolumeChange}
      />

      {/* Screen 1: Opening Screen (Shown until user interacts) */}
      <AnimatePresence>
        {!hasEntered && (
          <OpeningScreen
            onStartExperience={handleStartExperience}
            girlfriendName={data.girlfriendName}
          />
        )}
      </AnimatePresence>

      {/* Main Experience (Fades in once entered) */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: hasEntered ? 1 : 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="relative z-10 space-y-12 sm:space-y-20 pb-16"
      >
        {/* Screen 2: The Apology Letter */}
        <ApologySection
          data={data}
          onContinue={() => scrollToNextSection('screen-commitments')}
        />

        {/* Screen 3: "What I Can Actually Do" (5 Commitments) */}
        <CommitmentsSection data={data} />

        {/* Screen 4: Interactive Constellation Star Sky */}
        <ConstellationSection data={data} />

        {/* Screen 5: Cinematic Letter To Her */}
        <LetterSection data={data} />

        {/* Screen 6: Final Question ("Can I try again?") */}
        <FinalQuestionSection data={data} />

        {/* Epilogue & Easter Egg */}
        <EpilogueFooter
          data={data}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* 🎁 Final Climax Surprise: "I made one more thing for you" (Absolute Last) */}
        <FinalSurpriseSection
          data={data}
          onLowerVolume={handleLowerVolumeForSurprise}
          onRestoreVolume={handleRestoreVolumeForSurprise}
        />
      </motion.main>

      {/* Personalization Drawer for easy on-screen customization */}
      <CustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        data={data}
        onUpdateData={(newData) => setData(newData)}
      />
    </div>
  );
}
