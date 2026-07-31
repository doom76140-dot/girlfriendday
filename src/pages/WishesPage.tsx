import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, ArrowRight, Quote, Stars } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export const WishesPage: React.FC = () => {
  const { config, heartsBurst } = useApp();
  const navigate = useNavigate();

  const [openedWishes, setOpenedWishes] = useState<number[]>([1]); // First card expanded by default

  const toggleWish = (id: number, e: React.MouseEvent) => {
    heartsBurst(e.clientX, e.clientY);
    setOpenedWishes(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    heartsBurst(e.clientX, e.clientY);
    navigate('/questions');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10 flex flex-col items-center">
      {/* Animated Top Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center space-y-3 mb-10"
      >
        <div className="inline-flex items-center gap-2 bg-rose-100/80 border border-rose-300 text-rose-800 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin-slow" />
          <span>A Special Love Note For {config.girlfriendName}</span>
          <Stars className="w-3.5 h-3.5 text-rose-500" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 drop-shadow-xs">
          Happy Girlfriend's Day ❤️
        </h1>

        <p className="text-sm sm:text-base text-rose-900/80 font-serif-romantic italic max-w-lg mx-auto">
          "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
        </p>
      </motion.div>

      {/* Wishes Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {config.wishes.map((wish, index) => {
          const isOpen = openedWishes.includes(wish.id);
          return (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onClick={e => toggleWish(wish.id, e)}
              className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 border backdrop-blur-md relative overflow-hidden group shadow-lg ${
                isOpen
                  ? 'bg-white/90 border-rose-300 shadow-rose-200/60 ring-2 ring-rose-400/40'
                  : 'bg-white/70 hover:bg-white/90 border-rose-200/80 shadow-rose-100/40 hover:scale-[1.02]'
              }`}
            >
              {/* Subtle background glow */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-rose-300/20 rounded-full blur-xl group-hover:bg-rose-400/30 transition-all" />

              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 bg-rose-100/80 rounded-2xl shadow-xs">
                    {wish.emoji}
                  </span>
                  <div>
                    <h3 className="font-bold font-serif-romantic text-lg text-rose-950">
                      {wish.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider">
                      Wish #{index + 1}
                    </span>
                  </div>
                </div>

                <div className="text-rose-400 group-hover:text-rose-600 transition-colors">
                  <Heart className={`w-5 h-5 ${isOpen ? 'fill-rose-500 text-rose-500' : ''}`} />
                </div>
              </div>

              {/* Wish content */}
              <div className="space-y-3">
                <p className="text-sm text-slate-700 leading-relaxed font-sans-main">
                  {wish.content}
                </p>

                {wish.highlight && (
                  <div className="p-3 bg-rose-50 border-l-3 border-rose-400 rounded-r-xl text-xs font-semibold text-rose-900 flex items-center gap-2">
                    <Quote className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{wish.highlight}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-end text-xs font-semibold text-rose-500 gap-1">
                <span>{isOpen ? 'Tap to compress ❤️' : 'Tap for love note ✨'}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Next Page Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <button
          onClick={handleNext}
          className="py-4 px-8 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white font-bold text-base rounded-full shadow-xl shadow-rose-500/30 hover:shadow-2xl hover:scale-105 transition-all transform active:scale-95 flex items-center gap-3 group cursor-pointer"
        >
          <span>Answer Couple Questions</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
