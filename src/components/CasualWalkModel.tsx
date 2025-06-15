
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

const MODEL_PATH = "/Animation_Casual_Walk_withSkin.glb";

function CasualWalkModelMesh() {
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
          <div>Casual Walk Animation</div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>
            Loading...
          </div>
        </div>
      </Html>
    );
  }

  return (
    <group ref={group}>
      <primitive object={gltf.scene} dispose={null} scale={0.8} />
    </group>
  );
}

const CasualWalkModel: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/ai-blog");
  };

  return (
    <div
      className="w-full h-full cursor-pointer flex items-center justify-center"
      onClick={handleClick}
      title="Click to visit AI Blog"
    >
      <Canvas
        camera={{ position: [0, -0.5, 5], fov: 45 }}
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
                <div>Loading Casual Walk...</div>
              </div>
            </Html>
          }
        >
          <CasualWalkModelMesh />
        </Suspense>
        
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default CasualWalkModel;
