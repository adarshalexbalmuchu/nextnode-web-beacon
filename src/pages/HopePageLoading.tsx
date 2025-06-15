
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Use the same logo image as in LoadingPage
const LOGO_SRC = "/lovable-uploads/55b69b94-d123-47b8-ad9e-8f72a7b53471.png";

const HopePageLoading: React.FC = () => {
  const navigate = useNavigate();
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);
    // Animate for a visible time (increase duration for clarity)
    // 1000ms = 1 second, adjust as needed; original was 550ms, too short for transition
    const timeout = setTimeout(() => {
      navigate("/hope-page-2", { replace: true });
    }, 950);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent">
      {/* Futuristic Background (match HopePage2) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[hsl(var(--background))] via-[hsl(var(--background))] to-[hsl(var(--card))]" />
      {/* Animated logo "down-up flash" */}
      <img
        src={LOGO_SRC}
        alt="Loading Flash"
        className={`w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 object-contain ${
          start ? "animate-hope-flash-fast" : ""
        }`}
        style={{
          filter: "brightness(2.5) drop-shadow(0 0 60px #0ff) drop-shadow(0 0 130px #00fff7)",
          willChange: "transform, opacity",
        }}
        draggable={false}
      />
    </div>
  );
};

export default HopePageLoading;

