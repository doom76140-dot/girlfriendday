import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, ArrowRight, X, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Memory } from '../types';

export const MemoriesPage: React.FC = () => {
  const { config, heartsBurst } = useApp();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<Memory | null>(null);
  const [likes, setLikes] = useState<Record<number, number>>({});

  const handleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    heartsBurst(e.clientX, e.clientY);
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleSurpriseClick = (e: React.MouseEvent) => {
    heartsBurst(e.clientX, e.clientY);
    navigate('/surprise');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 relative z-10 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3 mb-10"
      >
        <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 px-4 py-1 rounded-full text-xs font-bold">
          <ImageIcon className="w-3.5 h-3.5 text-rose-500" />
          <span>Our Precious Moments</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-red-600">
          Memories Gallery ❤️
        </h1>

        <p className="text-xs sm:text-sm text-rose-900/80 font-serif-romantic max-w-md mx-auto">
          Every photo tells a story of our love. Tap any picture to expand!
        </p>
      </motion.div>

      {/* Responsive Image Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {config.memories.map((mem, index) => {
          const likeCount = likes[mem.id] || 0;
          return (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedImage(mem)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-lg shadow-rose-100/60 border border-rose-200/80 hover:shadow-2xl hover:shadow-rose-300/50 transition-all duration-300 transform hover:-translate-y-1.5 relative"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-rose-50">
                <img
                  src={mem.url}
                  alt={mem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Subtle dark overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm drop-shadow-md">{mem.title}</span>
                    <ZoomIn className="w-5 h-5 text-rose-300" />
                  </div>
                </div>

                {/* Heart reaction button */}
                <button
                  onClick={e => handleLike(mem.id, e)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-md text-rose-500 hover:bg-white hover:scale-110 active:scale-95 transition-all flex items-center gap-1 text-xs font-bold"
                >
                  <Heart className={`w-4 h-4 ${likeCount > 0 ? 'fill-rose-500 text-rose-500 animate-heartbeat' : ''}`} />
                  {likeCount > 0 && <span>{likeCount}</span>}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Button to Final Surprise */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <button
          onClick={handleSurpriseClick}
          className="py-4 px-9 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white font-bold text-base rounded-full shadow-xl shadow-rose-500/30 hover:shadow-2xl hover:scale-105 transition-all transform active:scale-95 flex items-center gap-3 group cursor-pointer animate-pulse-glow"
        >
          <Sparkles className="w-5 h-5 animate-spin-slow" />
          <span>Final Surprise ❤️</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-rose-200"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>

              <div className="p-4 bg-white flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-base">{selectedImage.title}</h3>
                  {selectedImage.location && (
                    <p className="text-xs text-slate-500">{selectedImage.location} • {selectedImage.date}</p>
                  )}
                </div>
                <button
                  onClick={e => handleLike(selectedImage.id, e)}
                  className="px-4 py-2 bg-rose-100 text-rose-700 font-bold text-xs rounded-full flex items-center gap-1.5 hover:bg-rose-200"
                >
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  <span>Send Love</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
