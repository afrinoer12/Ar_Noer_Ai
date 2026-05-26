"use client";

export default function ParticlesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Neon dots */}
      <div className="absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-cyan-400/70 shadow-[0_0_25px_#22d3ee]" />

      <div className="absolute left-[25%] top-[75%] h-1.5 w-1.5 rounded-full bg-purple-400/70 shadow-[0_0_25px_#c084fc]" />

      <div className="absolute left-[50%] top-[35%] h-2 w-2 rounded-full bg-cyan-300/60 shadow-[0_0_25px_#67e8f9]" />

      <div className="absolute left-[70%] top-[65%] h-1.5 w-1.5 rounded-full bg-pink-400/70 shadow-[0_0_25px_#f472b6]" />

      <div className="absolute left-[88%] top-[25%] h-2 w-2 rounded-full bg-cyan-400/60 shadow-[0_0_25px_#22d3ee]" />

      <div className="absolute left-[40%] top-[15%] h-1.5 w-1.5 rounded-full bg-purple-400/60 shadow-[0_0_25px_#c084fc]" />

      <div className="absolute left-[82%] top-[80%] h-2 w-2 rounded-full bg-cyan-300/60 shadow-[0_0_25px_#67e8f9]" />

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Radial glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
    </div>
  );
}