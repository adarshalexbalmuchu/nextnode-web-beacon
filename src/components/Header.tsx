
import React from "react";
import { User, ArrowDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const handleUserIcon = () => {
    if (!user) {
      navigate("/auth");
    } else if (role === "admin") {
      navigate("/admin");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleAIToolPage = () => {
    navigate("/ai-tool-page");
  };

  return (
    <header className="w-full flex items-center justify-between px-2 md:px-6 py-5 bg-[#101622]/80 backdrop-blur-sm shadow-lg sticky top-0 z-30 border-b border-[#202A3D]">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <img
          src="/lovable-uploads/195b39b9-d0a0-4426-b17f-63d73c98d6d3.png"
          alt="NextNode Logo"
          className="h-12 w-auto drop-shadow-md cursor-pointer transition-all duration-200 logo-hover-glow"
          style={{
            filter: "brightness(1.08)",
          }}
          draggable={false}
          onClick={handleLogoClick}
        />
      </div>
      {/* Slide Down + Admin/User Icon */}
      <div className="flex items-center gap-5 text-white">
        <button
          className="hover:text-cyan-400 transition-all focus:outline-none"
          title="Slide Down to AI Tool Page"
          aria-label="Open AI Tool Page"
          type="button"
          onClick={handleAIToolPage}
        >
          <ArrowDown size={22} />
        </button>
        <button
          className="hover:text-cyan-400 focus:outline-none"
          onClick={handleUserIcon}
          title={!user ? "Sign In" : role === "admin" ? "Admin Dashboard" : ""}
          aria-label="User Icon"
        >
          <User size={22} />
        </button>
      </div>
    </header>
  );
};

export default Header;

