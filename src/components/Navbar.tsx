import React, { useState } from 'react';
import { Link as RouterLink, useLocation as useRouteLocation } from 'react-router-dom';
import { Heart, Sparkles, Settings, Lock, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CustomizeDrawer } from './CustomizeDrawer';

export const Navbar: React.FC = () => {
  const { isAuthenticated, logout, heartsBurst } = useApp();
  const location = useRouteLocation();
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const navItems = [
    { path: '/wishes', label: 'Wishes', emoji: '💌' },
    { path: '/questions', label: 'Questions', emoji: '🧩' },
    { path: '/memories', label: 'Memories', emoji: '📸' },
    { path: '/surprise', label: 'Surprise', emoji: '🎁' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full px-4 py-3">
        <div className="max-w-4xl mx-auto bg-white/75 backdrop-blur-md border border-rose-200/80 rounded-full shadow-lg shadow-rose-100/50 px-4 py-2 flex items-center justify-between transition-all">
          
          {/* Logo / Title */}
          <RouterLink
            to="/wishes"
            onClick={(e) => heartsBurst(e.clientX, e.clientY)}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <Heart className="w-4 h-4 fill-white animate-heartbeat" />
            </div>
            <span className="font-handwriting font-bold text-xl text-rose-700 hidden sm:inline-block">
              Girlfriend's Day ❤️
            </span>
          </RouterLink>

          {/* Nav Routes */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <RouterLink
                  key={item.path}
                  to={item.path}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                    isActive
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105'
                      : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  <span>{item.emoji}</span>
                  <span className="hidden md:inline">{item.label}</span>
                </RouterLink>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsCustomizeOpen(true)}
              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
              title="Customize Content & Login Credentials"
            >
              <Settings className="w-4 h-4" />
            </button>

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <RouterLink
                to="/login"
                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                title="Login"
              >
                <Lock className="w-4 h-4" />
              </RouterLink>
            )}
          </div>
        </div>
      </header>

      <CustomizeDrawer
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
      />
    </>
  );
};
