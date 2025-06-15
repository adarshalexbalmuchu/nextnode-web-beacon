
import React from "react";
import { User, ChevronsUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import HopePage2 from "@/pages/HopePage2";

const Header = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const handleUserIcon = () => {
    if (!user) {
      navigate("/auth");
    } else if (role === "admin") {
      navigate("/admin");
    }
    // If user is logged in but not admin, do nothing
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  // Control Drawer state for Hope Page 2
  const [open, setOpen] = React.useState(false);

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
      {/* Admin/User Icon + Slide Up Button */}
      <div className="flex items-center gap-5 text-white">
        {/* Slide Up (Hope Page 2) Button */}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <button
              className="hover:text-cyan-400 transition-all focus:outline-none"
              title="Open Hope Page 2"
              aria-label="Slide Up Hope Page 2"
              type="button"
            >
              <ChevronsUp size={22} />
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <HopePage2 />
          </DrawerContent>
        </Drawer>
        {/* Admin/User Icon */}
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
