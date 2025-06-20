
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Background from "@/components/Background";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <Background />
      <div className="text-center relative z-10">
        <h1 className="text-4xl font-bold mb-4 text-glow">404</h1>
        <p className="text-xl text-gray-300 mb-4">Oops! Page not found</p>
        <a href="/" className="text-primary hover:text-primary/80 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
