
import React, { useEffect, useRef } from "react";
import "./LoadingPage.css";

export default function LoadingPage() {
  const loadingLogoRef = useRef<HTMLImageElement>(null);
  const mainBoltRef = useRef<SVGPolylineElement>(null);
  const branchRefs = [useRef<SVGPolylineElement>(null), useRef<SVGPolylineElement>(null)];
  const flashOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function lightningStrike() {
      const main = mainBoltRef.current;
      const branches = branchRefs.map(ref => ref.current);
      const flash = flashOverlayRef.current;
      if (!main || !branches[0] || !branches[1] || !flash) return;

      const flickerTimings = [0, 80, 140, 180, 223];

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
    const interval = setInterval(lightningStrike, 1700 + Math.random() * 1700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-bg">
      <div className="loading-effect-center">
        {/* Subtle backdrop logo */}
        <img
          ref={loadingLogoRef}
          src="/lovable-uploads/9049b175-a064-489a-a4ca-2f9f2e01a6b6.png"
          alt="NextNode logo"
          className="loading-dim-logo"
          draggable={false}
        />
        {/* Lightning effect */}
        <div className="lightning-container">
          <svg className="lightning-bolt" width="80" height="220" viewBox="0 0 80 220">
            {/* Main bolt */}
            <polyline
              ref={mainBoltRef}
              points="40,0 45,50 30,70 50,120 35,150 55,200"
              className="bolt-main"
            />
            {/* Branches */}
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
          <div className="flash-overlay" ref={flashOverlayRef}></div>
        </div>
      </div>
    </div>
  );
}
