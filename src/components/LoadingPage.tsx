
import React, { useEffect, useState } from 'react';
import './LoadingPage.css';

const LoadingPage: React.FC = () => {
  const [showLightning, setShowLightning] = useState(false);
  const [logoGlow, setLogoGlow] = useState(false);

  const lightningStrike = () => {
    const main = document.querySelector('.bolt-main') as HTMLElement;
    const branches = document.querySelectorAll('.bolt-branch') as NodeListOf<HTMLElement>;
    const secondary = document.querySelectorAll('.bolt-secondary') as NodeListOf<HTMLElement>;
    const flash = document.querySelector('.flash-overlay') as HTMLElement;
    const screenFlash = document.querySelector('.screen-flash') as HTMLElement;
    
    // More realistic lightning flicker timings
    const flickerSequence = [
      { time: 0, mainOpacity: 1, branchOpacity: 0.8, flashOpacity: 0.7, screenOpacity: 0.3 },
      { time: 50, mainOpacity: 0.2, branchOpacity: 0.1, flashOpacity: 0.1, screenOpacity: 0 },
      { time: 80, mainOpacity: 1, branchOpacity: 0.9, flashOpacity: 0.8, screenOpacity: 0.4 },
      { time: 120, mainOpacity: 0.4, branchOpacity: 0.2, flashOpacity: 0.2, screenOpacity: 0.1 },
      { time: 140, mainOpacity: 1, branchOpacity: 1, flashOpacity: 0.9, screenOpacity: 0.5 },
      { time: 180, mainOpacity: 0.6, branchOpacity: 0.3, flashOpacity: 0.3, screenOpacity: 0.1 },
      { time: 200, mainOpacity: 1, branchOpacity: 0.8, flashOpacity: 0.7, screenOpacity: 0.3 },
      { time: 250, mainOpacity: 0.3, branchOpacity: 0.1, flashOpacity: 0.1, screenOpacity: 0 },
      { time: 280, mainOpacity: 1, branchOpacity: 0.9, flashOpacity: 0.8, screenOpacity: 0.4 },
      { time: 350, mainOpacity: 0, branchOpacity: 0, flashOpacity: 0, screenOpacity: 0 }
    ];

    if (!main || !branches.length || !flash || !screenFlash) return;

    // Reset all elements
    main.style.opacity = '0';
    branches.forEach(b => b.style.opacity = '0');
    secondary.forEach(s => s.style.opacity = '0');
    flash.style.opacity = '0';
    screenFlash.style.opacity = '0';

    // Execute flicker sequence
    flickerSequence.forEach(({ time, mainOpacity, branchOpacity, flashOpacity, screenOpacity }) => {
      setTimeout(() => {
        main.style.opacity = String(mainOpacity);
        branches.forEach(b => b.style.opacity = String(branchOpacity + (Math.random() * 0.2 - 0.1)));
        secondary.forEach(s => s.style.opacity = String((branchOpacity * 0.6) + (Math.random() * 0.3 - 0.15)));
        flash.style.opacity = String(flashOpacity);
        screenFlash.style.opacity = String(screenOpacity);
      }, time);
    });
  };

  useEffect(() => {
    // Start lightning after 300ms for more dramatic buildup
    const lightningTimer = setTimeout(() => {
      setShowLightning(true);
      // Trigger first lightning strike
      setTimeout(() => {
        lightningStrike();
        // Trigger intense logo glow when lightning hits
        setTimeout(() => {
          setLogoGlow(true);
        }, 100);
      }, 200);
    }, 300);

    return () => {
      clearTimeout(lightningTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center overflow-hidden">
      
      {/* Screen Flash Effect */}
      <div className="screen-flash"></div>
      
      {/* Dramatic Realistic Lightning Strike */}
      {showLightning && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
          <div className="lightning-container">
            <svg className="lightning-bolt" width="150" height="100vh" viewBox="0 0 150 800">
              {/* Main jagged lightning bolt - more dramatic path */}
              <polyline 
                points="75,0 80,60 65,100 85,140 60,180 90,220 55,260 95,300 50,340 85,380 45,420 80,460 35,500 75,540 40,580 70,620 45,660 75,700 50,740 75,800" 
                className="bolt-main"
              />
              {/* Primary lightning branches */}
              <polyline 
                points="80,60 105,90 95,130 115,160" 
                className="bolt-branch"
              />
              <polyline 
                points="85,140 110,170 100,210 120,240" 
                className="bolt-branch"
              />
              <polyline 
                points="95,300 120,330 110,370 130,400" 
                className="bolt-branch"
              />
              <polyline 
                points="45,420 20,450 30,490 10,520" 
                className="bolt-branch"
              />
              <polyline 
                points="80,460 105,490 95,530 115,560" 
                className="bolt-branch"
              />
              {/* Secondary smaller branches */}
              <polyline 
                points="65,100 45,120 55,150" 
                className="bolt-secondary"
              />
              <polyline 
                points="90,220 115,240 105,270" 
                className="bolt-secondary"
              />
              <polyline 
                points="55,260 35,280 45,310" 
                className="bolt-secondary"
              />
              <polyline 
                points="85,380 110,400 100,430" 
                className="bolt-secondary"
              />
            </svg>
            <div className="flash-overlay"></div>
          </div>
        </div>
      )}

      {/* Logo with Intense Glow Effect */}
      <div className="relative z-10">
        <div className="relative">
          <img
            src="/lovable-uploads/55b69b94-d123-47b8-ad9e-8f72a7b53471.png"
            alt="NextNode"
            className={`w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] object-contain transition-all duration-1000 ${
              logoGlow 
                ? 'logo-electric-glow' 
                : 'brightness-100 scale-100'
            }`}
          />
          {logoGlow && (
            <div className="absolute inset-0 logo-pulse-glow w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem]"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
