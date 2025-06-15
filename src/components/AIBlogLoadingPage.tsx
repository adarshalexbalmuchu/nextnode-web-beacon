import React, { useEffect, useState } from "react";
import Background from "./Background";

// Use the same logo as main LoadingPage.
const LOGO_SRC = "/lovable-uploads/55b69b94-d123-47b8-ad9e-8f72a7b53471.png";

const AIBlogLoadingPage: React.FC = () => {
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setGlow(true), 550);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent">
      {/* Background: KEEP SAME as app */}
      <Background />
      <div className="flex flex-col items-center justify-center w-full h-full">
        {/* Logo, with extra outer glow/zoom animation */}
        <img
          src={LOGO_SRC}
          alt="AI Blog Loading"
          className={
            `mx-auto
            w-52 h-52
            sm:w-80 sm:h-80
            md:w-[26rem] md:h-[26rem]
            object-contain transition-all duration-900
            ${glow
              ? "brightness-[2.7] drop-shadow-[0_0_82px_cyan] drop-shadow-[0_0_180px_rgba(0,255,255,0.82)] scale-[1.15] animate-logo-glow"
              : "brightness-[1.7] scale-100"
            }
            `
          }
          style={{
            filter: glow
              ? "brightness(2.7) drop-shadow(0 0 82px cyan) drop-shadow(0 0 180px rgba(0,255,255,0.82))"
              : "brightness(1.7)"
          }}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default AIBlogLoadingPage;
