
import React from "react";

/**
 * Animated glassmorphic, gradient, grid, and floating orbs background.
 * Use once at the root of main pages (e.g. homepage).
 */
const Background = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    {/* Static Deep Space Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--background))] via-[hsl(var(--background))] to-[hsl(var(--card))]" />

    {/* Animated Neon Cyan Grid */}
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundImage:
            "linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          animation: "float 8s ease-in-out infinite",
        }}
      />
    </div>

    {/* Futuristic Floating Orbs */}
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
    <div
      className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float"
      style={{ animationDelay: "2s" }}
    />
    <div
      className="absolute top-3/4 left-1/2 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-float"
      style={{ animationDelay: "4s" }}
    />
  </div>
);

export default Background;
