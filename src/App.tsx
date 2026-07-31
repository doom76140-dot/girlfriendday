import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { FloatingHearts } from './components/FloatingHearts';
import { MusicPlayer } from './components/MusicPlayer';
import { Navbar } from './components/Navbar';
import { LoginPage } from './pages/LoginPage';
import { WishesPage } from './pages/WishesPage';
import { QuestionsPage } from './pages/QuestionsPage';
import { MemoriesPage } from './pages/MemoriesPage';
import { SurprisePage } from './pages/SurprisePage';

// Route Guard component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Animated route transitions layout
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="w-full flex-1 flex flex-col"
      >
        <Routes location={location}>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/wishes"
            element={
              <ProtectedRoute>
                <WishesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/questions"
            element={
              <ProtectedRoute>
                <QuestionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/memories"
            element={
              <ProtectedRoute>
                <MemoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/surprise"
            element={
              <ProtectedRoute>
                <SurprisePage />
              </ProtectedRoute>
            }
          />
          {/* Default redirect to /login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col relative font-sans-main overflow-x-hidden selection:bg-rose-200 selection:text-rose-900">
          {/* Global Floating Hearts Background */}
          <FloatingHearts />

          {/* Navigation Bar */}
          <Navbar />

          {/* Main Route Content */}
          <main className="flex-1 flex flex-col">
            <AnimatedRoutes />
          </main>

          {/* Background Audio Player Controls */}
          <MusicPlayer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
