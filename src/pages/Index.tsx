
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-cyan-100 via-white to-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-24 px-4">
        <section className="relative w-full max-w-3xl text-center bg-white/80 backdrop-blur-md rounded-xl shadow-xl py-16 px-10 border border-slate-200 overflow-hidden">
          <h1 className="text-5xl font-extrabold mb-4 text-slate-900 tracking-tight">
            Welcome to <span className="text-cyan-500">NextNode</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            The next evolution for intelligent, node-driven applications.<br/>
            Supercharge your workflow with a platform that's as innovative as you are.
          </p>
          <a
            href="#"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg px-8 py-3 shadow transition transform hover:scale-105 active:scale-95 duration-150"
          >
            Get Started
          </a>
          {/* Decorative circuit-style effect (SVG lines), visual only */}
          <svg
            className="absolute bottom-0 left-0 w-full h-10 opacity-20"
            viewBox="0 0 500 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M20 20 H120 Q130 20 130 30 T140 40 H480" stroke="#22d3ee" strokeWidth="6" strokeLinecap="round" fill="none" />
          </svg>
        </section>
      </main>
    </div>
  );
};

export default Index;
