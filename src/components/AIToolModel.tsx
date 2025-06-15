import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

const MODEL_PATH = "/AI_Tool_0615044424_texture.glb";

// Rotating mesh with animation
function AIToolModelMesh() {
  const group = useRef<any>();
  
  // Hooks must be in same order
  const gltf = useGLTF(MODEL_PATH, true);
  const { actions } = useAnimations(gltf.animations, group);

  // Model idle animation logic (keep, though not visibly running)
  React.useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      Object.values(actions).forEach((action) => action?.stop());
      const firstAction = Object.values(actions)[0];
      firstAction?.reset().play();
    }
  }, [actions]);

  // Add Y axis rotation for the parent group
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.009; // smooth continuous rotation
    }
  });

  if (!gltf.scene) {
    return (
      <Html center>
        <div style={{ color: "#0ff", textAlign: "center", fontSize: "14px" }}>
          <div>AI Tool Animation</div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>
            Loading...
          </div>
        </div>
      </Html>
    );
  }

  return (
    <group ref={group}>
      <primitive object={gltf.scene} dispose={null} scale={0.65} />
    </group>
  );
}

const AIToolModel: React.FC = () => {
  const navigate = useNavigate();

  // Both the model and the overlay text should navigate to /ai-blog
  const handleClick = () => {
    navigate("/ai-blog");
  };

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer select-none"
      style={{
        width: "350px",
        height: "470px", // slightly taller for text space
        background: "none",
        transform: "translate(-50%, -30%)" // moves it a bit further down
      }}
    >
      {/* 3D Canvas with rotating model */}
      <div
        style={{ width: "100%", height: "400px" }}
        onClick={handleClick}
        title="Click to visit AI Blogs"
        tabIndex={0}
        role="button"
        aria-label="Go to AI Blog"
        className="outline-none"
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleClick()}
      >
        <Canvas
          camera={{ position: [0, 1, 4], fov: 35 }}
          style={{
            background: "none",
            width: "100%",
            height: "100%",
            display: "block"
          }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight intensity={1.2} position={[5, 5, 5]} color="#7ffcff" />
          <pointLight intensity={0.8} decay={1.6} distance={30} color="#00ffff" position={[0, 2, 3]} />
          
          <Suspense 
            fallback={
              <Html center style={{ color: "#0ff" }}>
                <div style={{ textAlign: "center", fontSize: "16px" }}>
                  <div>Loading AI Tool...</div>
                </div>
              </Html>
            }
          >
            <AIToolModelMesh />
          </Suspense>
          
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
        </Canvas>
      </div>
      {/* Overlayed/Underneath text link */}
      <button
        onClick={handleClick}
        className="mt-3 px-4 py-2 rounded bg-[rgba(20,36,52,0.24)] border border-cyan-300/30 shadow text-cyan-200 font-bold tracking-wide text-lg md:text-xl transition hover:scale-105 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 underline underline-offset-4"
        style={{
          textShadow: "0 0 12px #00fff977,0 0 2px #16f8eddd"
        }}
        aria-label="Visit AI Blogs"
        tabIndex={0}
      >
        AI Blogs
      </button>
    </div>
  );
};

export default AIToolModel;
