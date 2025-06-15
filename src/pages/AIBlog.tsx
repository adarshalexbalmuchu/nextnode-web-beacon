
import React from "react";
import Header from "@/components/Header";
import Background from "@/components/Background";

const AIBlog = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative bg-transparent overflow-x-hidden">
      <Background />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 z-10 relative text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-cyan-200 animate-fade-in">
          AI Blog <span className="text-cyan-400 text-glow">🚀</span>
        </h1>
        <p className="text-lg text-slate-200 max-w-xl mx-auto mb-12 animate-fade-in">
          Welcome to our AI Blog! Here we will publish up-to-date news, tutorials, and insights on AI tools and technologies. Stay tuned for our upcoming posts.
        </p>
        <div className="rounded-xl glass-panel py-10 px-7 max-w-xl mx-auto text-white/80 shadow-lg animate-fade-in">
          <span className="text-cyan-300 font-semibold text-lg">
            Coming Soon!
          </span>
        </div>
      </main>
    </div>
  );
};
export default AIBlog;
