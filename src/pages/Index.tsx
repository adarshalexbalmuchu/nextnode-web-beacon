
import Header from "@/components/Header";
import Background from "@/components/Background";
import Robot3DModel from "@/components/Robot3DModel";
import Biped3DModel from "@/components/Biped3DModel";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative bg-transparent overflow-x-hidden">
      {/* Futuristic animated background layer */}
      <Background />
      {/* Biped animated model on the left */}
      <Biped3DModel />
      {/* Main robot in the center, positioned lower */}
      <Robot3DModel />
      <Header />
    </div>
  );
};

export default Index;
