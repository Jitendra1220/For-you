import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { ambientSound } from '../utils/audioSynth';

interface AudioPlayerControllerProps {
  isPlayingAudio: boolean;
  onTogglePlay: () => void;
  trackName: string;
  volume: number;
  onVolumeChange: (newVol: number) => void;
}

export const AudioPlayerController: React.FC<AudioPlayerControllerProps> = ({
  isPlayingAudio,
  onTogglePlay,
  trackName,
  volume,
  onVolumeChange,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id="top-audio-controller"
      className="fixed top-5 right-5 z-50 flex items-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#160D17]/80 backdrop-blur-md border border-[#EADECB]/15 shadow-xl transition-all duration-300 hover:border-[#B83358]/40 hover:bg-[#1E1020]/90">
        {/* Animated Waveform / Music Icon */}
        <button
          id="toggle-audio-btn"
          type="button"
          onClick={() => {
            ambientSound.playGentleChime(1.1);
            onTogglePlay();
          }}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#EADECB] hover:text-[#FFF5EB] transition-colors focus:outline-none"
          title={isPlayingAudio ? 'Mute soundscape' : 'Play soundscape'}
        >
          {isPlayingAudio ? (
            <div className="flex items-center gap-0.5 h-3.5">
              <span className="w-0.5 h-3 bg-[#E8A598] rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 h-4 bg-[#B83358] rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.2s]" />
              <span className="w-0.5 h-2 bg-[#EADECB] rounded-full animate-[pulse_1.0s_ease-in-out_infinite_0.4s]" />
              <span className="w-0.5 h-3.5 bg-[#E8A598] rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.1s]" />
            </div>
          ) : (
            <VolumeX className="w-4 h-4 text-[#EADECB]/50" />
          )}

          <span className="text-[11px] font-medium tracking-wide text-[#EADECB]/80 max-w-[110px] truncate hidden sm:inline-block">
            {isPlayingAudio ? trackName : 'Muted'}
          </span>
        </button>

        {/* Volume Slider visible on hover or mobile */}
        {isHovered && (
          <div className="flex items-center gap-1.5 pl-2 border-l border-white/10 transition-opacity animate-in fade-in duration-200">
            <Volume2 className="w-3.5 h-3.5 text-[#EADECB]/60" />
            <input
              id="global-volume-slider"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#B83358]"
            />
          </div>
        )}
      </div>
    </div>
  );
};
