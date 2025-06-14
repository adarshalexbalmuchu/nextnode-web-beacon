
import React from "react";
import { Search, User } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "AI Blog", href: "#" },
  { name: "AI Tools", href: "#" },
  { name: "AI Courses", href: "#" },
  { name: "About", href: "#" },
];

const Header = () => (
  <header className="w-full flex items-center justify-between px-8 md:px-16 py-5 bg-[#101622]/80 backdrop-blur-sm shadow-lg sticky top-0 z-30 border-b border-[#202A3D]">
    <div className="flex items-center gap-3">
      <img
        src="/lovable-uploads/195b39b9-d0a0-4426-b17f-63d73c98d6d3.png"
        alt="NextNode Logo"
        className="h-12 w-auto drop-shadow-md"
        draggable={false}
      />
    </div>
    {/* Navigation */}
    <nav className="hidden md:flex flex-1 justify-center text-[1.1rem] font-semibold gap-8 text-white">
      {navLinks.map(link => (
        <a
          key={link.name}
          href={link.href}
          className="hover:text-cyan-400 transition-colors duration-150 px-1"
        >
          {link.name}
        </a>
      ))}
    </nav>
    {/* Icons */}
    <div className="flex items-center gap-5 text-white">
      <button className="hover:text-cyan-400 focus:outline-none">
        <Search size={22} />
      </button>
      <button className="hover:text-cyan-400 focus:outline-none">
        <User size={22} />
      </button>
    </div>
  </header>
);

export default Header;
