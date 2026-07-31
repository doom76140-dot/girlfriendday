import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, CheckCircle2, ArrowRight, HelpCircle, Trophy, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

export const QuestionsPage: React.FC = () => {
  const { config, heartsBurst } = useApp();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [customInput, setCustomInput] = useState('');
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const currentQuestion = config.questions[currentIndex] || config.questions[0];
  const totalQuestions = config.questions.length;

  const handleSelectOption = (option: string, e: React.MouseEvent) => {
    heartsBurst(e.clientX, e.clientY);
    setFeedbackError(null);
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: customInput.trim(),
    }));
    setCustomInput('');
  };

  const handleNext = (e: React.MouseEvent) => {
  const chosen = selectedAnswers[currentQuestion.id];

  if (!chosen) {
    setFeedbackError("Please select an answer ❤️");
    return;
  }

  if (chosen !== currentQuestion.correctAnswer) {
    setFeedbackError("❌ Oops! Wrong answer. Try again ❤️");
    heartsBurst(e.clientX, e.clientY);
    return;
  }

  // Correct Answer
  heartsBurst(e.clientX, e.clientY);
  setFeedbackError(null);

  if (currentIndex < totalQuestions - 1) {
    setCurrentIndex(prev => prev + 1);
  } else {
    setShowSuccessOverlay(true);
    setTimeout(() => {
      navigate("/memories");
    }, 2500);
  }
};

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setFeedbackError(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 relative z-10 flex flex-col items-center">
      {/* Top Header & Progress */}
      <div className="w-full text-center space-y-3 mb-6">
        <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 px-3.5 py-1 rounded-full text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
          <span>Couple Quiz Time</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif-romantic text-rose-950">
          How Well Do You Know Us? ❤️
        </h1>

        {/* Progress Bar */}
        <div className="w-full bg-rose-200/60 h-3 rounded-full overflow-hidden p-0.5 border border-rose-200 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.4 }}
            className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
          />
        </div>
        <div className="flex justify-between items-center text-xs font-bold text-rose-700 px-1">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(((currentIndex + 1) / totalQuestions) * 100)}% Complete</span>
        </div>
      </div>

      {/* Main Question Card */}
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full bg-white/85 backdrop-blur-xl border border-rose-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-rose-200/50 space-y-6 relative overflow-hidden"
      >
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-rose-950 font-serif-romantic">
            {currentQuestion.title}
          </h2>
          {currentQuestion.subtitle && (
            <p className="text-xs sm:text-sm text-slate-600 font-sans-main">
              {currentQuestion.subtitle}
            </p>
          )}
        </div>

        {/* Feedback Alert */}
        {feedbackError && (
          <div className="p-3 bg-rose-100 border border-rose-300 text-rose-800 rounded-2xl text-xs font-bold text-center">
            {feedbackError}
          </div>
        )}

        {/* Option Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedAnswers[currentQuestion.id] === opt;
            return (
              <button
                key={opt}
                onClick={e => handleSelectOption(opt, e)}
                className={`p-4 rounded-2xl border text-left font-semibold text-sm transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/30 scale-[1.02]'
                    : 'bg-rose-50/50 hover:bg-rose-100/60 text-slate-800 border-rose-200/80 hover:border-rose-300'
                }`}
              >
                <span>{opt}</span>
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 fill-white text-rose-500 shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-rose-300 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

       
     

      

        {/* Navigation Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-rose-100">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'text-rose-700 bg-rose-100 hover:bg-rose-200'
            }`}
          >
            Back
          </button>

          <button
            onClick={handleNext}
            className="py-3 px-6 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs rounded-2xl shadow-md shadow-rose-500/30 flex items-center gap-2 group cursor-pointer"
          >
            <span>{currentIndex === totalQuestions - 1 ? 'Submit All Answers ❤️' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* Success Celebration Overlay */}
      <AnimatePresence>
        {showSuccessOverlay && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/70 backdrop-blur-md"
          >
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl border-2 border-rose-300">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-xl shadow-rose-500/40 animate-bounce">
                <Trophy className="w-10 h-10" />
              </div>

              <h2 className="text-3xl font-extrabold font-handwriting text-rose-600">
                100% Love Match! ❤️
              </h2>

              <p className="text-sm text-slate-700 font-medium">
                You passed with flying colors! Opening our memory photo gallery now...
              </p>

              <div className="flex items-center justify-center gap-2 text-rose-500 font-bold text-xs pt-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Redirecting to Memories...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
