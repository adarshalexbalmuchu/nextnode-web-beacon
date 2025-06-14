
import React from "react";

const Header = () => (
  <header className="w-full flex items-center justify-between px-10 py-6 bg-white/60 backdrop-blur-sm shadow-lg sticky top-0 z-30 border-b border-b-slate-100">
    <div className="flex items-center gap-4">
      <img
        src="/lovable-uploads/195b39b9-d0a0-4426-b17f-63d73c98d6d3.png"
        alt="NextNode Logo"
        className="h-14 w-auto drop-shadow-lg"
        draggable={false}
      />
      {/* Future navigation goes here */}
    </div>
    <nav className="hidden md:flex gap-8 items-center text-lg font-medium text-slate-700">
      {/* Placeholder for navigation links */}
    </nav>
  </header>
);

export default Header;
