/**
 * Ambient Audio Synthesizer & Sound Controller
 * Provides romantic atmospheric piano/pad soundscape using Web Audio API
 * and handles custom audio track playback with visualizer frequency data.
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isAmbientPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private chordInterval: number | null = null;
  private activeVoices: OscillatorNode[] = [];

  // Frequencies for a lush, emotional chord progression (F Maj9 - Dm9 - Bb Maj7 - C9sus)
  private chordProgressions: number[][] = [
    [174.61, 220.00, 261.63, 329.63, 392.00], // F3, A3, C4, E4, G4 (Fmaj9)
    [146.83, 220.00, 261.63, 329.63, 349.23], // D3, A3, C4, E4, F4 (Dm9)
    [116.54, 174.61, 233.08, 293.66, 349.23], // Bb2, F3, Bb3, D4, F4 (Bbmaj7)
    [130.81, 196.00, 261.63, 293.66, 392.00], // C3, G3, C4, D4, G4 (C9sus4)
  ];
  private currentChordIndex: number = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public startAmbient() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isAmbientPlaying) return;

      this.isAmbientPlaying = true;
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setTargetAtTime(0.22, this.ctx.currentTime, 3.0);

      this.playNextChord();
      this.chordInterval = window.setInterval(() => {
        if (this.isAmbientPlaying) {
          this.playNextChord();
        }
      }, 5500);
    } catch (e) {
      console.warn("Ambient audio could not be initialized:", e);
    }
  }

  private playNextChord() {
    if (!this.ctx || !this.masterGain || !this.isAmbientPlaying) return;

    const chord = this.chordProgressions[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chordProgressions.length;
    const now = this.ctx.currentTime;

    // Filter for warm intimate cinematic softness
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650 + Math.random() * 150, now);
    filter.Q.setValueAtTime(1.5, now);
    filter.connect(this.masterGain);

    chord.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Sine and soft triangle blend for celestial warmth
      osc.type = i === 0 ? 'sine' : (i % 2 === 0 ? 'sine' : 'triangle');
      // Subtle micro-detuning for chorus/reverb warmth
      const detune = (Math.random() - 0.5) * 8;
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime(detune, now);

      const noteDuration = 6.0;
      const attackTime = 1.2 + i * 0.2;
      const baseAmp = 0.08 / (i + 1);

      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.setTargetAtTime(baseAmp, now, attackTime);
      noteGain.gain.setTargetAtTime(0.0001, now + 3.0, 1.8);

      osc.connect(noteGain);
      noteGain.connect(filter);

      osc.start(now);
      osc.stop(now + noteDuration);

      this.activeVoices.push(osc);
    });

    // Cleanup old voices
    setTimeout(() => {
      this.activeVoices = this.activeVoices.filter(v => {
        try {
          return (v as unknown as { playbackState?: number }).playbackState !== 3;
        } catch {
          return false;
        }
      });
    }, 7000);
  }

  public stopAmbient(fadeOutSeconds: number = 2) {
    if (!this.ctx || !this.masterGain || !this.isAmbientPlaying) return;
    this.isAmbientPlaying = false;
    if (this.chordInterval) {
      clearInterval(this.chordInterval);
      this.chordInterval = null;
    }
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setTargetAtTime(0.0001, now, fadeOutSeconds);
  }

  public setAmbientVolume(vol: number) {
    if (!this.ctx || !this.masterGain) return;
    const clamped = Math.max(0, Math.min(1, vol));
    this.masterGain.gain.setTargetAtTime(clamped * 0.25, this.ctx.currentTime, 0.2);
  }

  public getIsPlaying(): boolean {
    return this.isAmbientPlaying;
  }

  /**
   * Generates a soft tactile bell chime when interacting with buttons/stars
   */
  public playGentleChime(pitchMultiplier: number = 1.0) {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25 * pitchMultiplier, now); // C5 base
      osc.frequency.exponentialRampToValueAtTime(1046.5 * pitchMultiplier, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(523.25 * pitchMultiplier, now + 0.3);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.3);
    } catch {
      // Audio autoplay policy fallback
    }
  }
}

export const ambientSound = new AmbientSoundEngine();
