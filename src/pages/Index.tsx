
import React from "react";
import Header from "@/components/Header";
import Background from "@/components/Background";
import AIToolModel from "@/components/AIToolModel";
import ClickablePromptModel from "@/components/ClickablePromptModel";

const Index = () => {
  return (
    <div
      className="w-full h-screen min-h-screen overflow-y-scroll snap-y snap-mandatory"
      style={{
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Section 1: Home */}
      <section className="relative w-full h-screen min-h-screen snap-start flex flex-col">
        <Background />
        <div className="flex flex-1 flex-col items-center justify-start relative z-10 min-h-0 w-full">
          <Header />
          {/* Models directly below header, centered */}
          <div className="flex flex-col items-center w-full pt-8 gap-7">
            <div className="w-full max-w-2xl flex items-center justify-center">
              <ClickablePromptModel scale={0.1} />
            </div>
            <div className="w-full max-w-2xl flex items-center justify-center">
              <AIToolModel />
            </div>
          </div>
        </div>
        {/* SCROLL DOWN indicator: always visible and clickable */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-auto">
          <span className="text-cyan-400 text-xs mb-1 tracking-wider animate-fade-in">
            SCROLL DOWN
          </span>
          <svg
            className="animate-bounce"
            width="26"
            height="26"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path d="M12 16l-6-6h12l-6 6z" fill="#67e8f9" />
          </svg>
        </div>
      </section>
      {/* Section 2: New Full-Screen Page/Section */}
      <section className="relative w-full h-screen min-h-screen snap-start flex flex-col items-center justify-center bg-gradient-futuristic">
        <div className="glass-panel p-8 rounded-xl flex flex-col items-center animate-fade-in shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-4 text-glow">
            Welcome to the Next Section!
          </h2>
          <p className="max-w-md text-slate-200 text-lg md:text-xl mb-2 text-center">
            This is a new full-page section.<br />
            You can customize this area with any content, features, or calls to action you like.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;

