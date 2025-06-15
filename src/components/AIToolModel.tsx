import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

// Path to GLB model (must be present in public directory)
const MODEL_PATH = "/Animation_Boxing_Practice_withSkin.glb"; // Changed to available model

// Reusable rotating mesh for AI tool model
function RotatingAIToolModel() {
  const group = useRef<any>();
  const gltf = useGLTF(MODEL_PATH, true);
  const { actions } = useAnimations(gltf.animations, group);

  // Play idle animation (if available)
  React.useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      Object.values(actions).forEach((action) => action?.stop());
      const firstAction = Object.values(actions)[0];
      firstAction?.reset().play();
    }
  }, [actions]);

  // Continuous rotation around Y-axis
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.009;
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

// Separated AI Blog interactive link/text (text changed and margin reduced)
function AIBlogText({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-2 px-4 py-2 rounded bg-[rgba(20,36,52,0.24)] border border-cyan-300/30 shadow text-cyan-200 font-extrabold tracking-wide text-xl md:text-2xl animate-fade-in hover-scale focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 underline underline-offset-4"
      style={{
        textShadow: "0 0 18px #00fff999,0 0 2px #16f8edee"
      }}
      aria-label="Visit AI Blog"
      tabIndex={0}
    >
      AI Blog
    </button>
  );
}

const AIToolModel: React.FC = () => {
  const navigate = useNavigate();
  // Change here: go to /ai-blog-loading instead of /ai-blog
  const handleClick = () => navigate("/ai-blog-loading");

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer select-none"
      style={{
        width: "350px",
        height: "480px",
        background: "none",
        // Model stays centered, slightly up for more optimal spacing
        transform: "translate(-50%, -28%)"
      }}
    >
      <div
        style={{ width: "100%", height: "400px" }}
        onClick={handleClick}
        title="Click to visit AI Blog"
        tabIndex={0}
        role="button"
        aria-label="Go to AI Blog"
        className="outline-none"
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleClick()}
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
            <RotatingAIToolModel />
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
        </Canvas>
      </div>
      {/* Accessible AI Blog link just below the model */}
      <AIBlogText onClick={handleClick} />
    </div>
  );
};

export default AIToolModel;
