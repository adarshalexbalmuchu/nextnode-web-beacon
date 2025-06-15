
import React, { Suspense, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";

const MODEL_PATH = "/AI_Blog_0615040357_texture.glb";

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
      // Glow effect via meshPhysicalMaterial + postprocessing in future
    />
  );
}

const Robot3DModel: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className="absolute left-0 top-1/2 -translate-y-1/2 z-20"
      style={{ width: "280px", height: "360px", cursor: "pointer" }}
      title="Go to AI Blog"
      onClick={() => navigate("/ai-blog")}
    >
      <Canvas
        camera={{ position: [0, 1, 4.5], fov: 35 }}
        style={{
          background: "transparent",
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight intensity={1.9} position={[8, 10, 20]} color="#7ffcff" />
        {/* Neon Glow: big point light, slightly behind model */}
        <pointLight intensity={1.2} decay={1.6} distance={50} color="#00ffff" position={[0, 3, 6]} />
        <Suspense fallback={<Html center style={{ color: "#0ff" }}>Loading…</Html>}>
          <group>
            <RobotModel />
            {/* If you want extra glowing halo: */}
            <mesh position={[0, -0.1, 0]}>
              <sphereGeometry args={[1.5, 32, 32]} />
              <meshBasicMaterial color="#00ffd0" transparent opacity={0.22} />
            </mesh>
          </group>
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
      {/* Glow overlay for div */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl"
           style={{
             boxShadow: "0 0 44px 16px #0ff7, 0 0 80px 36px #00ffc9c7",
             filter: "blur(0.5px) brightness(1.04)",
             zIndex: 1,
           }} />
    </div>
  );
};

export default Robot3DModel;
