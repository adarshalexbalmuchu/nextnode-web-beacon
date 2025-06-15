
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AIToolModel from "@/components/AIToolModel";

const HopePageLoading: React.FC = () => {
  const navigate = useNavigate();
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);
    const timeout = setTimeout(() => {
      navigate("/hope-page-2", { replace: true });
    }, 1700); // Long enough to see animation
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent">
      {/* Futuristic Background (matches HopePage2) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[hsl(var(--background))] via-[hsl(var(--background))] to-[hsl(var(--card))]" />
      {/* Animated AI Tool 3D Model with entrance flash */}
      <div
        className={`w-full h-full flex items-center justify-center ${
          start ? "animate-hope-flash-fast" : ""
        }`}
        style={{
          // Make sure the 3D model looks bright during animation
          filter:
            "brightness(2.5) drop-shadow(0 0 60px #0ff) drop-shadow(0 0 130px #00fff7)",
          willChange: "transform, opacity",
        }}
      >
        {/* AIToolModel fills the loading screen, disables pointer-events */}
        <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[26rem] md:h-[26rem] pointer-events-none">
          <AIToolModel />
        </div>
      </div>
    </div>
  );
};

export default HopePageLoading;

