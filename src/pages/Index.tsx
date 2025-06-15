
import React from "react";
import Header from "@/components/Header";
import Background from "@/components/Background";
import AIToolModel from "@/components/AIToolModel";

const Index = () => {
  return (
    <div
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory"
      style={{
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Section 1: Home (existing) */}
      <section className="relative w-full h-screen snap-start flex flex-col">
        <Background />
        {/* Centered AI Tool animation and Header */}
        <AIToolModel />
        <Header />
      </section>
      {/* Section 2: New Full-Screen Page/Section */}
      <section className="relative w-full h-screen snap-start flex flex-col items-center justify-center bg-gradient-futuristic">
        {/* Placeholder content for new section, replace as needed */}
        <div className="glass-panel p-8 rounded-xl flex flex-col items-center animate-fade-in shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-4 text-glow">
            Welcome to the Next Section!
          </h2>
          <p className="max-w-md text-slate-200 text-lg md:text-xl mb-2 text-center">
            This is a new full-page section.<br />
            You can customize this area with any content,
            features, or calls to action you like.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;

