import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

// IMPORTANT: The model file should be placed in the "public" folder at the project root.
// The correct path to reference it in code is "/A_spacefaring_superhe_0615212155_texture.glb"
const MODEL_PATH = "/A_spacefaring_superhe_0615212155_texture.glb";

function SpacefaringSuperherModelMesh() {
  const group = useRef<any>();
  
  // Always call hooks in the same order
  const gltf = useGLTF(MODEL_PATH, true);
  const { actions } = useAnimations(gltf.animations, group);

  // Add rotation animation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005; // Slow rotation
    }
  });

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
          <div>Spacefaring Superhero</div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>
            Loading...
          </div>
        </div>
      </Html>
    );
  }

  return (
    <group ref={group}>
      <primitive object={gltf.scene} dispose={null} scale={1.35} />
    </group>
  );
}

const SpacefaringSuperherModel: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/ai-tools");
  };

  return (
    <div
      className="w-full h-full cursor-pointer flex items-center justify-center"
      onClick={handleClick}
      title="Click to visit AI Tools"
    >
      <Canvas
        camera={{ position: [0, -1, 4], fov: 45 }}
        style={{
          background: "none",
          width: "100%",
          height: "100%",
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight intensity={1.5} position={[5, 5, 5]} color="#7ffcff" />
        <directionalLight intensity={0.8} position={[-5, 3, -5]} color="#00ffff" />
        <pointLight intensity={1.2} decay={1.6} distance={40} color="#00ffff" position={[0, 2, 3]} />
        <pointLight intensity={0.6} decay={2} distance={30} color="#7ffcff" position={[3, -2, -3]} />
        <spotLight
          intensity={2}
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={0.5}
          color="#00ffff"
          target-position={[0, 0, 0]}
        />
        
        <Suspense 
          fallback={
            <Html center style={{ color: "#0ff" }}>
              <div style={{ textAlign: "center", fontSize: "16px" }}>
                <div>Loading Spacefaring Superhero...</div>
              </div>
            </Html>
          }
        >
          <SpacefaringSuperherModelMesh />
        </Suspense>
        
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default SpacefaringSuperherModel;
