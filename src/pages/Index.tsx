import Header from "@/components/Header";
import Background from "@/components/Background";
import Robot3DModel from "@/components/Robot3DModel";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative bg-transparent overflow-x-hidden">
      {/* Futuristic animated background layer */}
      <Background />
      {/* Place robot on the left, floating absolutely */}
      <Robot3DModel />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 z-10 relative text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight text-glow animate-fade-in">
          Your{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-100 text-transparent bg-clip-text drop-shadow-glow">
            AI-Powered
          </span>
          <br />
          Career Hub
        </h1>
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-300 mb-1 max-w-2xl mx-auto animate-fade-in text-center">
          Master AI tools, accelerate your career, and gain practical skills for students and working professionals.
        </p>
        <p className="text-base text-cyan-100/80 mb-8 animate-fade-in text-center">
          Real tools. Real results. Real growth.
        </p>
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mt-4 animate-fade-in">
          <a
            href="#"
            className="btn-primary px-8 py-3"
          >
            Explore AI Tools
          </a>
          <a
            href="#"
            className="btn-primary px-8 py-3"
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--accent)/0.85) 0%, hsl(var(--primary)/0.75) 100%)",
              color: "hsl(var(--foreground))",
            }}
          >
            Career Resources
          </a>
        </div>
      </main>
    </div>
  );
};

export default Index;
