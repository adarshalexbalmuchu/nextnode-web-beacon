
import Header from "@/components/Header";
import Background from "@/components/Background";
import AIToolModel from "@/components/AIToolModel";
// import BoxingModel from "@/components/BoxingModel"; // Boxing animation removed

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative bg-transparent overflow-x-hidden">
      {/* Futuristic animated background layer */}
      <Background />
      {/* Centered AI Tool animation */}
      <AIToolModel />
      <Header />
    </div>
  );
};

export default Index;

