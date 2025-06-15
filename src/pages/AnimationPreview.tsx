
import React from "react";
import Header from "@/components/Header";
import Background from "@/components/Background";
import AnimationViewer from "@/components/AnimationViewer";

const AnimationPreview = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative bg-transparent overflow-x-hidden">
      <Background />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <AnimationViewer />
      </main>
    </div>
  );
};

export default AnimationPreview;
