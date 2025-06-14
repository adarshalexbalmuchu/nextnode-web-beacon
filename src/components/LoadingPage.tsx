
import React, { useEffect, useState } from 'react';

// Use the same logo
const LOGO_SRC = "/lovable-uploads/55b69b94-d123-47b8-ad9e-8f72a7b53471.png";

const LoadingPage: React.FC = () => {
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setGlow(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Futuristic Background Gradient (matches site) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[hsl(var(--background))] via-[hsl(var(--background))] to-[hsl(var(--card))]" />
      {/* Neon Animated Grid Layer (subtle, for extra effect) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          height: "100%",
          width: "100%",
          backgroundImage:
            "linear-gradient(rgba(0, 255, 255, 0.08) 1px, transparent 1px),linear-gradient(90deg, rgba(0, 255, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      {/* Floating Orbs (same as Background.tsx, but subtle for loading) */}
      <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-3/4 left-1/2 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-float"
        style={{ animationDelay: "4s" }}
      />
      {/* Logo with animation and glow */}
      <img
        src={LOGO_SRC}
        alt="Logo"
        className={
          `w-72 h-72 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] object-contain transition-all duration-1000 
          ${glow
            ? 'brightness-200 drop-shadow-[0_0_48px_cyan] drop-shadow-[0_0_80px_rgba(0,255,255,0.6)] scale-110 animate-logo-glow'
            : 'brightness-100 scale-100'
          }
          `
        }
        draggable={false}
      />
    </div>
  );
};

export default LoadingPage;

