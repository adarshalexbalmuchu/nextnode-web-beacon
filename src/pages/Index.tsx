
import Header from "@/components/Header";
import Background from "@/components/Background";
import Robot3DModel from "@/components/Robot3DModel";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative bg-transparent overflow-x-hidden">
      {/* Futuristic animated background layer */}
      <Background />
      {/* Place robot in the center, positioned lower */}
      <Robot3DModel />
      <Header />
    </div>
  );
};

export default Index;
