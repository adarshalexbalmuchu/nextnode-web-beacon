
import React from "react";
import CasualWalkModel from "@/components/CasualWalkModel";
import Background from "@/components/Background";

const AnimationPreview = () => {
  return (
    <div className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden">
      <Background />
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <CasualWalkModel />
      </div>
    </div>
  );
};

export default AnimationPreview;
