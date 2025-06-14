
import React, { useEffect, useRef } from "react";
import "./LoadingPage.css";

export default function LoadingPage() {
  const mainRef = useRef<SVGPolylineElement>(null);
  const branchRefs = [
    useRef<SVGPolylineElement>(null),
    useRef<SVGPolylineElement>(null),
  ];
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function lightningStrike() {
      const main = mainRef.current;
      const branches = branchRefs.map(ref => ref.current);
      const flash = flashRef.current;
      const flickerTimings = [0, 80, 140, 180, 223];

      if (!main || !branches[0] || !branches[1] || !flash) return;

      // Reset
      main.style.opacity = "0";
      branches.forEach(b => b && (b.style.opacity = "0"));
      flash.style.opacity = "0";

      // Main flash
      setTimeout(() => {
        main.style.opacity = "1";
        branches.forEach(b => b && (b.style.opacity = (0.7 + Math.random() * 0.3).toString()));
        flash.style.opacity = "0.55";
      }, flickerTimings[0]);

      // Flickers
      setTimeout(() => {
        main.style.opacity = "0.5";
        branches.forEach(b => b && (b.style.opacity = "0.2"));
        flash.style.opacity = "0.15";
      }, flickerTimings[1]);
      setTimeout(() => {
        main.style.opacity = "1";
        branches.forEach(b => b && (b.style.opacity = (0.8 + Math.random() * 0.2).toString()));
        flash.style.opacity = "0.38";
      }, flickerTimings[2]);
      setTimeout(() => {
        main.style.opacity = "0.2";
        branches.forEach(b => b && (b.style.opacity = "0.1"));
        flash.style.opacity = "0.05";
      }, flickerTimings[3]);
      // Fade out
      setTimeout(() => {
        main.style.opacity = "0";
        branches.forEach(b => b && (b.style.opacity = "0"));
        flash.style.opacity = "0";
      }, flickerTimings[4]);
    }

    lightningStrike();
    const interval = setInterval(lightningStrike, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0c13", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="lightning-container">
        <svg className="lightning-bolt" width="80" height="220" viewBox="0 0 80 220">
          <polyline
            ref={mainRef}
            points="40,0 45,50 30,70 50,120 35,150 55,200"
            className="bolt-main"
          />
          <polyline
            ref={branchRefs[0]}
            points="45,50 55,80 47,110"
            className="bolt-branch"
          />
          <polyline
            ref={branchRefs[1]}
            points="35,150 25,170 37,190"
            className="bolt-branch"
          />
        </svg>
        <div className="flash-overlay" ref={flashRef}></div>
      </div>
    </div>
  );
}
