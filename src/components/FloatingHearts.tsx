import React, { useEffect, useState } from 'react';

interface FloatingHeartItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

interface BurstHeartItem {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
}

const HEART_COLORS = [
  '#f43f5e', // rose-500
  '#e11d48', // rose-600
  '#fb7185', // rose-400
  '#fda4af', // rose-300
  '#ec4899', // pink-500
  '#f472b6', // pink-400
];

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeartItem[]>([]);
  const [bursts, setBursts] = useState<BurstHeartItem[]>([]);

  useEffect(() => {
    // Generate initial set of ambient floating hearts
    const initialHearts: FloatingHeartItem[] = Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.random() * 98,
      size: Math.floor(Math.random() * 24) + 14,
      duration: Math.random() * 6 + 7, // 7s to 13s
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.3,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
    }));
    setHearts(initialHearts);

    // Listen for custom burst events
    const handleBurst = (e: Event) => {
      const customEvent = e as CustomEvent<{ x: number; y: number }>;
      const { x, y } = customEvent.detail;

      const newBursts: BurstHeartItem[] = Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
        const speed = Math.random() * 60 + 40;
        return {
          id: Date.now() + i,
          x,
          y,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          size: Math.random() * 20 + 16,
          color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        };
      });

      setBursts(prev => [...prev, ...newBursts]);

      // Cleanup bursts after animation
      setTimeout(() => {
        setBursts(prev => prev.filter(b => !newBursts.some(nb => nb.id === b.id)));
      }, 1000);
    };

    window.addEventListener('heart-burst', handleBurst);
    return () => window.removeEventListener('heart-burst', handleBurst);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/60 via-pink-50/40 to-red-100/50" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute animate-float-heart"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
            className="filter drop-shadow-sm transition-transform"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* Burst particles */}
      {bursts.map(b => (
        <div
          key={b.id}
          className="absolute transition-all duration-1000 ease-out"
          style={{
            left: `${b.x}px`,
            top: `${b.y}px`,
            transform: `translate(${b.dx}px, ${b.dy}px) scale(0)`,
            opacity: 0,
          }}
        >
          <svg
            width={b.size}
            height={b.size}
            viewBox="0 0 24 24"
            fill={b.color}
            className="filter drop-shadow-md"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
