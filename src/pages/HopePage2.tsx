
import React from "react";

const HopePage2: React.FC = () => {
  return (
    <div
      className="fixed inset-0 z-40 bg-[#101622]/95 backdrop-blur-lg flex flex-col items-center px-4 pt-10 pb-10 min-h-screen 
        animate-slide-down"
      style={{ minHeight: "100dvh" }}
    >
      <h2 className="text-2xl font-bold text-cyan-300 mb-4 animate-fade-in">
        Welcome to Hope Page 2
      </h2>
      <p className="text-lg text-slate-300 max-w-md mb-6 text-center animate-fade-in">
        This is a full page that slides down from the top.<br />
        You can put any content here!
      </p>
      <div className="w-full glass-panel p-6 rounded-lg shadow-lg">
        <span className="text-cyan-200">Hello from Hope Page 2 🎉</span>
      </div>
    </div>
  );
};

export default HopePage2;
