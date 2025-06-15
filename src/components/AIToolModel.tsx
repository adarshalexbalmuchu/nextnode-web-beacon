
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

// Path to GLB model (must be present in public directory)
const MODEL_PATH = "/AI_Tool_0615044424_texture.glb"; // Ensure this matches the name in /public

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

const AIToolModel: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/ai-blog-loading");

  // Use bottom-right position and sizing like old BoxingModel (no text link)
  return (
    <div
      className="fixed bottom-6 right-8 z-20 cursor-pointer flex items-end"
      style={{
        width: "300px",
        height: "350px",
        background: "none",
      }}
      onClick={handleClick}
      title="Click to visit AI Blog"
      tabIndex={0}
      role="button"
      aria-label="Go to AI Blog"
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleClick()}
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
  );
};

export default AIToolModel;
