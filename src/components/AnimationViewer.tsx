
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { Button } from "@/components/ui/button";

const animations = [
  { name: "Boxing Practice", path: "/Animation_Boxing_Practice_withSkin.glb" },
  { name: "Casual Walk", path: "/Animation_Casual_Walk_withSkin.glb" },
  { name: "Running", path: "/Animation_Running_withSkin.glb" },
  { name: "Skill 01", path: "/Animation_Skill_01_withSkin.glb" },
  { name: "Walking", path: "/Animation_Walking_withSkin.glb" }
];

function AnimatedModel({ modelPath }: { modelPath: string }) {
  const group = useRef<any>();
  
  // Always call hooks in the same order
  const gltf = useGLTF(modelPath, true);
  const { actions } = useAnimations(gltf.animations, group);

  React.useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      // Stop all actions first
      Object.values(actions).forEach((action) => action?.stop());
      
      // Play the first available animation
      const firstAction = Object.values(actions)[0];
      firstAction?.reset().play();
    }
  }, [actions, modelPath]);

  if (!gltf.scene) {
    return (
      <Html center>
        <div style={{ color: "#0ff", textAlign: "center", fontSize: "14px" }}>
          <div>Animation Not Found</div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>
            {modelPath}
          </div>
        </div>
      </Html>
    );
  }

  return (
    <group ref={group}>
      <primitive object={gltf.scene} dispose={null} scale={1.2} />
    </group>
  );
}

const AnimationViewer: React.FC = () => {
  const [currentAnimation, setCurrentAnimation] = useState(0);

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-glow">Animation Preview</h2>
      
      {/* Animation Controls */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {animations.map((anim, index) => (
          <Button
            key={index}
            variant={currentAnimation === index ? "default" : "outline"}
            onClick={() => setCurrentAnimation(index)}
            className="text-sm"
          >
            {anim.name}
          </Button>
        ))}
      </div>

      {/* 3D Canvas */}
      <div 
        className="w-full bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-lg border border-cyan-500/20"
        style={{ height: "500px" }}
      >
        <Canvas
          camera={{ position: [0, 1, 4], fov: 35 }}
          style={{
            background: "none",
            width: "100%",
            height: "100%",
          }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight intensity={1.2} position={[5, 5, 5]} color="#7ffcff" />
          <pointLight intensity={0.8} decay={1.6} distance={30} color="#00ffff" position={[0, 2, 3]} />
          
          <Suspense 
            fallback={
              <Html center style={{ color: "#0ff" }}>
                <div style={{ textAlign: "center", fontSize: "16px" }}>
                  <div>Loading {animations[currentAnimation].name}...</div>
                </div>
              </Html>
            }
          >
            <AnimatedModel 
              key={currentAnimation} 
              modelPath={animations[currentAnimation].path} 
            />
          </Suspense>
          
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            maxDistance={10}
            minDistance={2}
          />
        </Canvas>
      </div>

      {/* Animation Info */}
      <div className="text-center mt-4">
        <p className="text-cyan-400 font-medium">
          Currently showing: {animations[currentAnimation].name}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Use mouse to rotate, zoom, and pan the model
        </p>
      </div>
    </div>
  );
};

export default AnimationViewer;
