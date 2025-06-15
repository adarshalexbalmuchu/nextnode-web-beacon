
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Background from "@/components/Background";
import AIToolModel from "@/components/AIToolModel";
// import BoxingModel from "@/components/BoxingModel"; // Boxing animation removed

const Index = () => {
  // Removed swipe/drag logic and handlers.

  return (
    <div className="relative w-full h-full">
      {/* Futuristic animated background layer */}
      <Background />
      {/* Centered AI Tool animation */}
      <AIToolModel />
      <Header />
    </div>
  );
};

export default Index;
