import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MusicPlayer: React.FC = () => {
  const { config, musicPlaying, toggleMusic, volume, setVolume } = useApp();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const synthIntervalRef = useRef<number | null>(null);

  // Fallback Web Audio Synthesizer playing a sweet romantic lullaby
  const playSynthMelody = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Romantic notes scale (A Major / F# Minor soft melody)
      const notes = [440, 554.37, 659.25, 880, 659.25, 554.37, 493.88, 587.33];
      let step = 0;

      const playNote = () => {
        if (!musicPlaying) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[step % notes.length], ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08 * volume, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.2);

        step++;
      };

      playNote();
      synthIntervalRef.current = window.setInterval(playNote, 1400);
    } catch {
      // Audio context restricted or not allowed
    }
  };

  const stopSynthMelody = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    if (musicPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHasError(false);
            stopSynthMelody();
          })
          .catch(() => {
            setHasError(true);
            playSynthMelody();
          });
      }
    } else {
      audioRef.current.pause();
      stopSynthMelody();
    }

    return () => {
      stopSynthMelody();
    };
  }, [musicPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg border border-rose-200/80 transition-all hover:bg-white hover:shadow-rose-200/50">
      <audio
        ref={audioRef}
        src={config.audioTrackUrl}
        loop
        preload="auto"
        onError={() => setHasError(true)}
      />

      <button
        onClick={toggleMusic}
        className={`flex items-center justify-center w-8 h-8 rounded-full text-white transition-all transform active:scale-95 ${
          musicPlaying
            ? 'bg-rose-500 hover:bg-rose-600 shadow-md shadow-rose-500/30 animate-pulse'
            : 'bg-slate-400 hover:bg-slate-500'
        }`}
        title={musicPlaying ? 'Pause Music' : 'Play Romantic Music'}
      >
        {musicPlaying ? (
          <Heart className="w-4 h-4 fill-white animate-heartbeat" />
        ) : (
          <Music className="w-4 h-4" />
        )}
      </button>

      <span className="text-xs font-semibold text-rose-900 hidden sm:inline">
        {musicPlaying ? (hasError ? 'Romantic Melody ♪' : 'Background Music ♪') : 'Music Off'}
      </span>

      <div className="flex items-center gap-1.5 pl-1 border-l border-rose-200">
        <button
          onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
          className="text-rose-500 hover:text-rose-700 p-1"
        >
          {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          className="w-16 h-1 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
        />
      </div>
    </div>
  );
};
