
import React from "react";
import Header from "@/components/Header";
import Background from "@/components/Background";
import AIToolModel from "@/components/AIToolModel";
import CasualWalkModel from "@/components/CasualWalkModel";
import SpacefaringSuperherModel from "@/components/SpacefaringSuperherModel";

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
          {/* Center AI Blog (AIToolModel) below the header */}
          <div className="flex flex-col items-center w-full pt-8 gap-7">
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
      
      {/* Section 2: Show Casual Walk Model at the center */}
      <section className="relative w-full h-screen min-h-screen snap-start flex flex-col items-center justify-center">
        <Background />
        <div className="flex justify-center items-center w-full h-full z-10">
          <CasualWalkModel />
        </div>
      </section>
      
      {/* Section 3: Show Spacefaring Superhero Model at the center */}
      <section className="relative w-full h-screen min-h-screen snap-start flex flex-col items-center justify-center">
        <Background />
        <div className="flex justify-center items-center w-full h-full z-10">
          <SpacefaringSuperherModel />
        </div>
      </section>
    </div>
  );
};

export default Index;
