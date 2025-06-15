import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

const MODEL_PATH = "/Clicktoread.glb";

function RotatingPromptModel() {
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
        <div style={{ color: "#ff0", textAlign: "center", fontSize: "14px" }}>
          <div>Clicktoread 3D Model Not Found</div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>
            The 3D model file might be missing.<br />
            <a
              href={MODEL_PATH}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline", color: "#ffdb3a" }}
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
      {/* Model scale set to 1 (100%) */}
      <primitive object={gltf.scene} dispose={null} scale={1} />
    </group>
  );
}

const ClickablePromptModel: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/ai-tool-page");

  return (
    <div
      className="
        w-full h-full max-w-none flex items-center justify-center
        cursor-pointer select-none bg-transparent
        aspect-[1/1]
        sm:aspect-[4/3] md:aspect-[16/9]
      "
      onClick={handleClick}
      title="Go to Clicktoread"
      tabIndex={0}
      role="button"
      aria-label="Go to Clicktoread"
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleClick()}
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
        <directionalLight intensity={1.2} position={[5, 5, 5]} color="#ffdb3a" />
        <pointLight intensity={0.8} decay={1.6} distance={30} color="#ffd700" position={[0, 2, 3]} />
        <Suspense 
          fallback={
            <Html center style={{ color: "#ff0" }}>
              <div style={{ textAlign: "center", fontSize: "16px" }}>
                <div>Loading Clicktoread 3D Model...</div>
                <div style={{ fontSize: "12px" }}>
                  If stuck, <a href={MODEL_PATH} style={{ textDecoration: "underline", color: "#ffdb3a" }} target="_blank" rel="noopener noreferrer">test the GLB link</a>
                </div>
              </div>
            </Html>
          }
        >
          <RotatingPromptModel />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
      {/* "Clicktoread" label: extra small for all screens */}
      <div className="
        absolute bottom-28 left-1/2 -translate-x-1/2
        bg-black/70 text-yellow-400 rounded
        px-[2px] py-px
        text-[5px] sm:text-[6px] md:text-[7px]
        font-semibold pointer-events-none select-none
        backdrop-blur-sm shadow-sm
        max-w-[24px] w-auto h-2 flex items-center justify-center
        text-center
        z-30
      ">
        Clicktoread
      </div>
    </div>
  );
};

export default ClickablePromptModel;
