import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Lock, User, Sparkles, ArrowRight, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

export const LoginPage: React.FC = () => {
  const { config, login, heartsBurst } = useApp();
  const navigate = useNavigate();

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    setTimeout(() => {
      const result = login(usernameInput, passwordInput);
      if (result.success) {
        heartsBurst();
        navigate('/wishes');
      } else {
        setErrorMsg(result.errorMsg || 'Oops ❤️ Wrong Username or Password');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 600);
      }
      setIsLoading(false);
    }, 400);
  };

  const autofillDefaults = () => {
    setUsernameInput(config.credentials.username);
    setPasswordInput(config.credentials.password);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          x: isShaking ? [-10, 10, -8, 8, -4, 4, 0] : 0,
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-rose-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-rose-200/60 text-slate-800 relative overflow-hidden"
      >
        {/* Glowing Top Heart Accent */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-300/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-300/30 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-3 mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 text-white shadow-lg shadow-rose-500/30"
          >
            <Heart className="w-8 h-8 fill-white animate-heartbeat" />
          </motion.div>

          <h1 className="text-3xl font-bold font-serif-romantic text-rose-950 tracking-tight">
            Welcome, My Love ❤️
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-sans-main">
            Please enter your secret credentials to unlock your Girlfriend's Day surprise!
          </p>
        </div>

        {/* Error message alert */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.9 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-rose-500/10 border border-rose-300 text-rose-700 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-rose-900 mb-1.5 ml-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-rose-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-3 bg-rose-50/50 border border-rose-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-rose-400 focus:bg-white focus:outline-none transition-all placeholder:text-rose-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-rose-900 mb-1.5 ml-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-rose-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-3 bg-rose-50/50 border border-rose-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-rose-400 focus:bg-white focus:outline-none transition-all placeholder:text-rose-300"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-rose-500/30 hover:shadow-xl transition-all transform active:scale-98 flex items-center justify-center gap-2 group cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" /> Unlocking...
              </span>
            ) : (
              <>
                <span>Enter Our Love Portal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Quick Autofill Helper Chip for easy testing */}
       
      </motion.div>
    </div>
  );
};
