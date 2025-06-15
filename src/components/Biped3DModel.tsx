
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

const MODEL_PATH = "./biped.glb";

function BipedModel() {
  const group = useRef<any>();
  const [loadError, setLoadError] = useState(false);
  
  try {
    const { scene, animations } = useGLTF(MODEL_PATH);
    const { actions } = useAnimations(animations, group);

    // Play the first animation if available
    React.useEffect(() => {
      if (actions && Object.keys(actions).length > 0) {
        const firstAction = Object.values(actions)[0];
        firstAction?.play();
      }
    }, [actions]);

    return (
      <group ref={group}>
        <primitive object={scene} dispose={null} scale={1.5} />
      </group>
    );
  } catch (error) {
    console.log("Biped model not found - please extract biped.glb to public folder");
    return (
      <Html center>
        <div style={{ color: "#0ff", textAlign: "center", fontSize: "14px" }}>
          <div>Biped Model</div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>
            Extract biped.glb to public folder
          </div>
        </div>
      </Html>
    );
  }
}

const Biped3DModel: React.FC = () => {
  return (
    <div
      className="absolute left-8 top-1/2 -translate-y-1/2 z-20"
      style={{
        width: "300px",
        height: "400px",
        background: "none",
      }}
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
              <div style={{ textAlign: "center", fontSize: "14px" }}>
                <div>Loading Biped...</div>
                <div style={{ fontSize: "12px", opacity: 0.7, marginTop: "5px" }}>
                  Make sure biped.glb is in public folder
                </div>
              </div>
            </Html>
          }
        >
          <BipedModel />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default Biped3DModel;
