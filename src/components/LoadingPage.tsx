
import React, { useEffect, useState } from 'react';

const LOGO_SRC = "/lovable-uploads/55b69b94-d123-47b8-ad9e-8f72a7b53471.png";

const LoadingPage: React.FC = () => {
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setGlow(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#081A34] via-[#0B2550] to-[#010E20]">
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
