
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

const MODEL_PATH = "./Animation_Casual_Walk_withSkin.glb";

function CasualWalkModelMesh() {
  const group = useRef<any>();
  
  try {
    const { scene, animations } = useGLTF(MODEL_PATH);
    const { actions } = useAnimations(animations, group);

    React.useEffect(() => {
      // Stop all actions first
      Object.values(actions).forEach((action) => action?.stop());
      
      // Play the first available animation
      if (actions && Object.keys(actions).length > 0) {
        const firstAction = Object.values(actions)[0];
        firstAction?.reset().play();
      }
    }, [actions]);

    return (
      <group ref={group}>
        <primitive object={scene} dispose={null} scale={1.2} />
      </group>
    );
  } catch (error) {
    console.log("Casual walk animation not found");
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
}

const CasualWalkModel: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/ai-blog");
  };

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
      style={{
        width: "400px",
        height: "500px",
        background: "none",
      }}
      onClick={handleClick}
      title="Click to visit AI Blog"
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
