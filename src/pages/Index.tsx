
import Header from "@/components/Header";
import Background from "@/components/Background";
import AIToolModel from "@/components/AIToolModel";
import BoxingModel from "@/components/BoxingModel";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative bg-transparent overflow-x-hidden">
      {/* Futuristic animated background layer */}
      <Background />
      {/* Boxing animation in the center */}
      <BoxingModel />
      {/* AI Tool animation on the right that opens AI Courses */}
      <AIToolModel />
      <Header />
    </div>
  );
};

export default Index;
