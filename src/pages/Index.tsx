
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0B1120] relative overflow-x-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(0deg, transparent 19px, #222a3d33 20px),linear-gradient(90deg, transparent 19px, #222a3d33 20px)",
          backgroundSize: "60px 60px",
          opacity: 0.20,
        }}
      ></div>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 z-10 relative">
        <section className="w-full max-w-3xl mx-auto flex flex-col items-center mt-20 mb-16 text-center">
          {/* Top pill */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#172033] text-cyan-400 text-base font-medium shadow border border-cyan-900/50">
              • AI Tools, Careers & Practical Guides
            </span>
          </div>
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
            Your{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-200 text-transparent bg-clip-text drop-shadow-glow">
              AI-Powered
            </span>
            <br />
            Career Hub
          </h1>
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-300 mb-1 max-w-2xl mx-auto">
            Master AI tools, accelerate your career, and gain practical skills for students and working professionals.
          </p>
          <p className="text-base text-cyan-100/70 mb-8">
            Real tools. Real results. Real growth.
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mt-4">
            <a
              href="#"
              className="inline-block bg-cyan-400 hover:bg-cyan-300 text-[#141b2b] font-semibold rounded-lg px-8 py-3 shadow transition hover-scale focus-visible:outline-none"
            >
              Explore AI Tools
            </a>
            <a
              href="#"
              className="inline-block bg-transparent border border-cyan-400 hover:bg-cyan-700/40 hover:border-cyan-300 text-cyan-200 font-semibold rounded-lg px-8 py-3 shadow transition hover-scale focus-visible:outline-none"
            >
              Career Resources
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
