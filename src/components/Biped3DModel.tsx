
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

const MODEL_PATH = "./biped.glb"; // Assuming the model will be extracted to public folder

function BipedModel() {
  const group = useRef<any>();
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
        <directionalLight intensity={1.2} position={[5, 5, 5] } color="#7ffcff" />
        <pointLight intensity={0.8} decay={1.6} distance={30} color="#00ffff" position={[0, 2, 3]} />
        <Suspense fallback={<Html center style={{ color: "#0ff" }}>Loading Biped...</Html>}>
          <BipedModel />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default Biped3DModel;
