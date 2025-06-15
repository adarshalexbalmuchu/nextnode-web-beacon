
import React, { Suspense, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";

const MODEL_PATH = "./AI_Blog_0615040357_texture.glb";

function RobotModel() {
  const gltf = useGLTF(MODEL_PATH);
  const ref = useRef<any>();
  // Continuous gentle auto-rotation
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += 0.4 * delta;
    }
  });
  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      dispose={null}
      scale={1.2}
    />
  );
}

const Robot3DModel: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 z-20"
      style={{
        width: "100%",
        maxWidth: "500px",
        height: "600px",
        maxHeight: "70vh",
        cursor: "pointer",
        background: "none",
        minWidth: "300px",
        minHeight: "300px",
      }}
      title="Go to AI Blog"
      onClick={() => navigate("/ai-blog")}
    >
      <Canvas
        camera={{ position: [0, 1, 5.8], fov: 35 }}
        style={{
          background: "none",
          width: "100%",
          height: "100%",
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight intensity={1.9} position={[8, 10, 20]} color="#7ffcff" />
        <pointLight intensity={1.2} decay={1.6} distance={50} color="#00ffff" position={[0, 3, 6]} />
        <Suspense fallback={<Html center style={{ color: "#0ff" }}>Loading…</Html>}>
          <RobotModel />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default Robot3DModel;
