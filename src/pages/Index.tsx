import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Background from "@/components/Background";
import AIToolModel from "@/components/AIToolModel";
// import BoxingModel from "@/components/BoxingModel"; // Boxing animation removed

const Index = () => {
  const navigate = useNavigate();
  const touchStartY = React.useRef<number | null>(null);
  const touchEndY = React.useRef<number | null>(null);

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (
      touchStartY.current !== null &&
      touchEndY.current !== null &&
      touchStartY.current - touchEndY.current > 60 // user swiped up by >60px
    ) {
      navigate("/ai-tool-loading");
    }
    touchStartY.current = null;
    touchEndY.current = null;
  };

  // Mouse events for desktop
  const mouseStartY = React.useRef<number | null>(null);
  const mouseEndY = React.useRef<number | null>(null);
  const mouseActive = React.useRef(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseActive.current = true;
    mouseStartY.current = e.clientY;
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseActive.current) {
      mouseEndY.current = e.clientY;
    }
  };
  const handleMouseUp = () => {
    if (
      mouseStartY.current !== null &&
      mouseEndY.current !== null &&
      mouseStartY.current - mouseEndY.current > 60 // drag up by >60px
    ) {
      navigate("/ai-tool-loading");
    }
    mouseActive.current = false;
    mouseStartY.current = null;
    mouseEndY.current = null;
  };

  return (
    <div
      className="relative w-full h-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Futuristic animated background layer */}
      <Background />
      {/* Centered AI Tool animation */}
      <AIToolModel />
      <Header />
    </div>
  );
};

export default Index;
