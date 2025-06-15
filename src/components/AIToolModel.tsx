import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

const MODEL_PATH = "/AI_Tool_0615044424_texture.glb";

function RotatingAIToolModel() {
  const group = useRef<any>();
  const gltf = useGLTF(MODEL_PATH, true);
  const { actions } = useAnimations(gltf.animations, group);

  React.useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      Object.values(actions).forEach((action) => action?.stop());
      const firstAction = Object.values(actions)[0];
      firstAction?.reset().play();
    }
  }, [actions]);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.009;
    }
  });

  if (!gltf.scene) {
    return (
      <Html center>
        <div style={{ color: "#0ff", textAlign: "center", fontSize: "14px" }}>
          <div>AI Tool Animation Not Found</div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>
            The 3D model file might be missing.<br />
            <a
              href={MODEL_PATH}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline", color: "#7ffcff" }}
            >
              Test if GLB is accessible
            </a>
          </div>
        </div>
      </Html>
    );
  }

  return (
    <group ref={group}>
      {/* Model scale set to 2 (200%) */}
      <primitive object={gltf.scene} dispose={null} scale={2} />
    </group>
  );
}

const AIToolModel: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/ai-blog-loading");

  // The container is larger, but still leaves room for scroll down button
  return (
    <div
      className="
        flex flex-1 items-center justify-center w-full
        cursor-pointer select-none bg-transparent
      "
      onClick={handleClick}
      title="Click to visit AI Blog"
      tabIndex={0}
      role="button"
      aria-label="Go to AI Blog"
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleClick()}
      style={{
        height: "320px", // Bigger, but not too big
        maxWidth: "400px",
        minHeight: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 1.3, 4], fov: 35 }}
        style={{
          background: "none",
          width: "100%",
          height: "100%",
          display: "block",
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight intensity={1.2} position={[5, 5, 5]} color="#7ffcff" />
        <pointLight intensity={0.8} decay={1.6} distance={30} color="#00ffff" position={[0, 2, 3]} />
        <Suspense 
          fallback={
            <Html center style={{ color: "#0ff" }}>
              <div style={{ textAlign: "center", fontSize: "16px" }}>
                <div>Loading AI Tool 3D Model...</div>
                <div style={{ fontSize: "12px" }}>
                  If stuck, <a href={MODEL_PATH} style={{ textDecoration: "underline", color: "#7ffcff" }} target="_blank" rel="noopener noreferrer">test the GLB link</a>
                </div>
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
