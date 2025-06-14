
import React, { useEffect, useState } from 'react';
import './LoadingPage.css';

const LoadingPage: React.FC = () => {
  const [showLightning, setShowLightning] = useState(false);
  const [logoGlow, setLogoGlow] = useState(false);

  // Lightning animation logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let isMounted = true;

    const lightningStrike = () => {
      const main = document.querySelector('.bolt-main') as HTMLElement;
      const branches = document.querySelectorAll('.bolt-branch') as NodeListOf<HTMLElement>;
      const flash = document.querySelector('.flash-overlay') as HTMLElement;
      const flickerTimings = [0, 80, 140, 180, 223];

      if (!main || !branches.length || !flash) return;

      // Reset
      main.style.opacity = '0';
      branches.forEach(b => b.style.opacity = '0');
      flash.style.opacity = '0';

      // Main flash
      setTimeout(() => {
        if (!isMounted) return;
        main.style.opacity = '1';
        branches.forEach(b => b.style.opacity = String(0.7 + Math.random() * 0.3));
        flash.style.opacity = '0.55';
        setLogoGlow(true);
      }, flickerTimings[0]);

      // Flickers
      setTimeout(() => {
        if (!isMounted) return;
        main.style.opacity = '0.5';
        branches.forEach(b => b.style.opacity = '0.2');
        flash.style.opacity = '0.15';
      }, flickerTimings[1]);
      setTimeout(() => {
        if (!isMounted) return;
        main.style.opacity = '1';
        branches.forEach(b => b.style.opacity = String(0.8 + Math.random() * 0.2));
        flash.style.opacity = '0.38';
      }, flickerTimings[2]);
      setTimeout(() => {
        if (!isMounted) return;
        main.style.opacity = '0.2';
        branches.forEach(b => b.style.opacity = '0.1');
        flash.style.opacity = '0.05';
      }, flickerTimings[3]);
      // Fade out
      setTimeout(() => {
        if (!isMounted) return;
        main.style.opacity = '0';
        branches.forEach(b => b.style.opacity = '0');
        flash.style.opacity = '0';
        setLogoGlow(false);
      }, flickerTimings[4]);
    };

    // Reveal lightning after short delay, repeat strike at intervals
    setShowLightning(true);
    setTimeout(() => {
      lightningStrike();
      interval = setInterval(lightningStrike, 2100 + Math.random() * 1800);
    }, 350);

    return () => {
      isMounted = false;
      interval && clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0a0c13] flex items-center justify-center overflow-hidden z-50">
      {/* Dramatic Lightning Effect */}
      {showLightning && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
          <div className="lightning-container">
            <svg className="lightning-bolt" width="80" height="220" viewBox="0 0 80 220">
              <polyline 
                points="40,0 45,50 30,70 50,120 35,150 55,200" 
                className="bolt-main"
              />
              <polyline 
                points="45,50 55,80 47,110" 
                className="bolt-branch"
              />
              <polyline 
                points="35,150 25,170 37,190" 
                className="bolt-branch"
              />
            </svg>
            <div className="flash-overlay"></div>
          </div>
        </div>
      )}

      {/* Logo, centered, with glow effect in sync with lightning */}
      <div className="relative z-10 flex items-center justify-center">
        <img
          src="/NextNode-Logo.svg"
          alt="NextNode Logo"
          className={`w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 transition-all duration-700 object-contain
            ${logoGlow
              ? 'brightness-200 drop-shadow-[0_0_50px_hsl(var(--primary))] drop-shadow-[0_0_100px_rgba(0,255,255,0.7)] scale-110'
              : 'brightness-100 scale-100'
            }`}
          style={{
            filter: logoGlow
              ? 'drop-shadow(0 0 28px #fff) drop-shadow(0 0 78px #40fffc)'
              : 'none',
            transition: 'all 0.7s cubic-bezier(.4,2.2,.2,1)'
          }}
        />
      </div>
    </div>
  );
};

export default LoadingPage;
