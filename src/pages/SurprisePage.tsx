import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, RotateCcw, Stars, Mail, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const SurprisePage: React.FC = () => {
  const { config, toggleMusic, musicPlaying, heartsBurst } = useApp();
  const navigate = useNavigate();

  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  // Trigger grand confetti shower on page mount and envelope open
  const triggerConfetti = () => {
    // Primary explosion
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fda4af', '#e11d48', '#ffffff'],
    });

    // Side cannons
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#fb7185', '#ffffff'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f43f5e', '#fb7185', '#ffffff'],
      });
    }, 400);
  };

  useEffect(() => {
    triggerConfetti();
    if (!musicPlaying) {
      toggleMusic(); // Optionally start music if not playing
    }
  }, []);

  const handleOpenEnvelope = (e: React.MouseEvent) => {
    heartsBurst(e.clientX, e.clientY);
    setEnvelopeOpened(true);
    triggerConfetti();
  };

  const handleReplay = (e: React.MouseEvent) => {
    heartsBurst(e.clientX, e.clientY);
    navigate('/memories');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 relative z-10 flex flex-col items-center">
      {/* Large Animated Heading */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center space-y-4 mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-5 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-rose-500/30">
          <Gift className="w-4 h-4 animate-bounce" />
          <span>Final Surprise For {config.girlfriendName}</span>
          <Stars className="w-4 h-4" />
        </div>

        <motion.h1
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="text-5xl sm:text-7xl font-extrabold font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 drop-shadow-md py-2"
        >
          {config.finalSurprise.heading}
        </motion.h1>

        <p className="text-sm sm:text-lg font-serif-romantic text-rose-950/80 max-w-lg mx-auto">
          {config.finalSurprise.subheading}
        </p>
      </motion.div>

      {/* 3D Glowing Beating Heart Animation */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: 'easeInOut',
        }}
        onClick={e => {
          heartsBurst(e.clientX, e.clientY);
          triggerConfetti();
        }}
        className="cursor-pointer my-4 relative group"
        title="Tap for Heart Explosion! ❤️"
      >
        <div className="absolute inset-0 bg-rose-500 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity animate-pulse" />
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-red-500 flex items-center justify-center text-white shadow-2xl shadow-rose-500/60 border-4 border-white/60">
          <Heart className="w-14 h-14 sm:w-16 sm:h-16 fill-white" />
        </div>
      </motion.div>

      {/* Central Love Letter Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full bg-white/90 backdrop-blur-xl border-2 border-rose-300 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-rose-200/80 my-6 relative overflow-hidden text-center space-y-6"
      >
        <div className="absolute top-0 right-0 p-8 text-rose-100 pointer-events-none">
          <Heart className="w-32 h-32 fill-current opacity-30" />
        </div>

        {!envelopeOpened ? (
          <div className="py-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <Mail className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold font-serif-romantic text-rose-950">
              You Have a Secret Love Letter!
            </h3>
            <p className="text-xs text-slate-600 font-sans-main">
              Tap the button below to break the wax seal and reveal your Girlfriend's Day message...
            </p>
            <button
              onClick={handleOpenEnvelope}
              className="py-3 px-8 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs sm:text-sm rounded-full shadow-lg shadow-rose-500/30 hover:scale-105 transition-all transform active:scale-95 flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Open Love Letter ❤️</span>
            </button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="inline-block p-2 bg-rose-100 rounded-full text-rose-600 mb-2">
                <Sparkles className="w-6 h-6 animate-spin-slow" />
              </div>

              <p className="text-base sm:text-lg leading-relaxed text-slate-800 font-serif-romantic italic">
                "{config.finalSurprise.loveLetter}"
              </p>

              <div className="pt-4 border-t border-rose-200/80 flex flex-col items-center gap-1">
                <span className="font-handwriting text-3xl font-bold text-rose-600">
                  {config.finalSurprise.closing}
                </span>
                <span className="text-xs font-semibold text-rose-800">
                  {config.boyfriendName}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>

      {/* Button: Replay Memories */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="mt-4 flex flex-col sm:flex-row items-center gap-3"
      >
        <button
          onClick={handleReplay}
          className="py-3.5 px-8 bg-white hover:bg-rose-50 text-rose-700 font-bold text-sm rounded-full shadow-lg border border-rose-300 hover:shadow-xl transition-all transform active:scale-95 flex items-center gap-2 group cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform" />
          <span>Replay Memories ❤️</span>
        </button>

        <button
          onClick={e => {
            heartsBurst(e.clientX, e.clientY);
            triggerConfetti();
          }}
          className="py-3.5 px-6 bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm rounded-full shadow-lg shadow-rose-500/30 transition-all transform active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>More Confetti! 🎉</span>
        </button>
      </motion.div>
    </div>
  );
};
