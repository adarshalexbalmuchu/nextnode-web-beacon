import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF, useAnimations } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import Background from "./Background";

// Path to GLB model (must be present in public directory)
const MODEL_PATH = "/AI_Tool_0615044424_texture.glb"; // Ensure this matches the name in /public

// Rotating & glowing AI Tool model
function FastGlowAIToolModel() {
  const group = useRef<any>();
  const gltf = useGLTF(MODEL_PATH, true);
  const { actions } = useAnimations(gltf.animations, group);

  // Play idle animation if any (optional)
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      Object.values(actions).forEach((action) => action?.stop());
      const firstAction = Object.values(actions)[0];
      firstAction?.reset().play();
    }
  }, [actions]);

  // Fast continuous rotation around Y-axis
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.037; // much faster than regular
    }
  });

  if (!gltf.scene) {
    return (
      <Html center>
        <div style={{ color: "#0ff", textAlign: "center", fontSize: "17px" }}>
          <div>Loading...</div>
        </div>
      </Html>
    );
  }

  return (
    <group ref={group}>
      <primitive object={gltf.scene} dispose={null} scale={0.85} />
    </group>
  );
}

const AIBlogModelLoadingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/ai-blog", { replace: true });
    }, 1600); // ~1.6s "splash"
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent select-none">
      <Background />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto"
        style={{
          width: "340px",
          height: "420px",
          // center a bit higher for aesthetics
          transform: "translate(-50%, -34%)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "390px",
            filter:
              "drop-shadow(0 0 66px #00f7ff) drop-shadow(0 0 108px #00eaffb9)",
            transition: "filter 0.3s",
          }}
        >
          <Canvas
            camera={{ position: [0, 1, 4], fov: 35 }}
            style={{
              background: "none",
              width: "100%",
              height: "100%",
              display: "block",
            }}
          >
            <ambientLight intensity={1.0} color="#66ffff" />
            <directionalLight intensity={1.4} position={[4, 5, 8]} color="#9ff" />
            <pointLight
              intensity={2.2}
              decay={1.9}
              distance={40}
              color="#00ffff"
              position={[0, 3, 3]}
            />
            <React.Suspense
              fallback={
                <Html center style={{ color: "#0ff" }}>
                  <div style={{ textAlign: "center", fontSize: "16px" }}>
                    <div>Loading...</div>
                  </div>
                </Html>
              }
            >
              <FastGlowAIToolModel />
            </React.Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default AIBlogModelLoadingPage;
