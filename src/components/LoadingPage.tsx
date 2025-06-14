
import React from "react";
import "./LoadingPage.css";

export default function LoadingPage() {
  return (
    <div className="loading-bg">
      <div className="loading-logo-container">
        <img
          src="/lovable-uploads/9049b175-a064-489a-a4ca-2f9f2e01a6b6.png"
          alt="NextNode logo"
          className="loading-logo-glow"
          draggable={false}
        />
        {/* Optional: Lightning bolt overlay, can be removed if undesired */}
        <svg
          className="bolt-glow"
          width="76"
          height="76"
          viewBox="0 0 76 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <g className="bolt-inner">
            <polyline
              points="40,12 32,40 46,40 36,64"
              stroke="#3CF3F6"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />
            <defs>
              <filter id="glow" x="-10" y="-10" width="100" height="100">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </g>
        </svg>
      </div>
    </div>
  );
}
