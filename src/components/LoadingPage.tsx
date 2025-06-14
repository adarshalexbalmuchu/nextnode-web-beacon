
import React, { useEffect, useState } from 'react';
import './LoadingPage.css';

const LoadingPage: React.FC = () => {
  const [logoGlow, setLogoGlow] = useState(false);

  useEffect(() => {
    // Start logo glow animation after a short delay
    const glowTimer = setTimeout(() => {
      setLogoGlow(true);
    }, 500);

    return () => {
      clearTimeout(glowTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center overflow-hidden">
      
      {/* Logo with Intense Glow Effect */}
      <div className="relative z-10">
        <div className="relative">
          <img
            src="/lovable-uploads/55b69b94-d123-47b8-ad9e-8f72a7b53471.png"
            alt="NextNode"
            className={`w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] object-contain transition-all duration-1000 ${
              logoGlow 
                ? 'logo-electric-glow animate-electric-pulse' 
                : 'brightness-100 scale-100'
            }`}
          />
          {logoGlow && (
            <>
              <div className="absolute inset-0 logo-pulse-glow w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem]"></div>
              <div className="absolute inset-0 logo-outer-glow w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem]"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
