
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

const MODEL_PATH = "/Animation_Boxing_Practice_withSkin.glb";

function BoxingModelMesh() {
  const group = useRef<any>();
  // Always call hooks in the same order
  const gltf = useGLTF(MODEL_PATH, true);
  const { actions } = useAnimations(gltf.animations, group);

  React.useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      // Stop all actions first
      Object.values(actions).forEach((action) => action?.stop());
      // Play the first available animation
      const firstAction = Object.values(actions)[0];
      firstAction?.reset().play();
    }
  }, [actions]);

  if (!gltf.scene) {
    return (
      <Html center>
        <div style={{ color: "#0ff", textAlign: "center", fontSize: "14px" }}>
          <div>Boxing Animation</div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>
            Loading...
          </div>
        </div>
      </Html>
    );
  }

  return (
    <group ref={group}>
      <primitive object={gltf.scene} dispose={null} scale={1.0} />
    </group>
  );
}

const BoxingModel: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/ai-tools");
  };

  return (
    // Model centered (like old AI Tool)
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer select-none"
      style={{
        width: "350px",
        height: "480px",
        background: "none",
        // Move a little lower for optimal spacing
        transform: "translate(-50%, -18%)",
      }}
      onClick={handleClick}
      title="Click to visit AI Tools"
      tabIndex={0}
      role="button"
      aria-label="Go to AI Tools"
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleClick()}
    >
      <div
        style={{ width: "100%", height: "400px" }}
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
                  <div>Loading Boxing...</div>
                </div>
              </Html>
            }
          >
            <BoxingModelMesh />
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
        </Canvas>
      </div>
    </div>
  );
};

export default BoxingModel;
