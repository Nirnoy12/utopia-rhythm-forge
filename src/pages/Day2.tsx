import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";

const artists = [
  { name: "PRISM", genre: "Techno", time: "10:00 PM" },
  { name: "NØVA", genre: "House / Deep Bass", time: "11:00 PM" },
  { name: "SYNTH RAGA", genre: "Electronic Fusion", time: "12:00 AM" },
  { name: "VOID.EXE", genre: "Industrial Techno", time: "1:00 AM" },
  { name: "BASS TEMPLE", genre: "Drum & Bass", time: "2:00 AM" },
  { name: "NEURAL DRIFT", genre: "Ambient / Experimental", time: "3:00 AM" },
];

const Day2 = () => {
  return (
    <div className="min-h-screen bg-neon-bg text-foreground relative overflow-hidden">
      {/* Infinite Marquee Background */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full opacity-[0.04] pointer-events-none overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="text-[20vw] font-serif font-black mx-8" style={{ color: "hsl(var(--neon-green))" }}>
              DANCE DANCE DANCE
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24">
        {/* Hero */}
        <section className="px-6 md:px-20 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <span
              className="text-xs font-sans uppercase tracking-[0.5em]"
              style={{ color: "hsl(var(--neon-pink))" }}
            >
              March 15, 2026
            </span>

            <h1
              className="glitch-text text-6xl md:text-[10vw] font-serif font-black mt-4 leading-none"
              data-text="NEON NIGHTS"
              style={{ color: "hsl(var(--foreground))" }}
            >
              NEON NIGHTS
            </h1>

            <p className="mt-6 text-lg md:text-xl font-sans max-w-xl" style={{ color: "hsl(var(--muted-foreground))" }}>
              The underground awakens. Descend into the void where beats shatter reality
              and bass frequencies rewire your consciousness.
            </p>
          </motion.div>
        </section>

        {/* Artist Grid */}
        <section className="px-6 md:px-20 py-16">
          <div className="max-w-5xl">
            {artists.map((artist, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="group py-6 md:py-8 border-b flex items-baseline justify-between cursor-pointer" style={{ borderColor: "hsl(var(--neon-green) / 0.15)" }}>
                  <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="text-xs font-sans" style={{ color: "hsl(var(--neon-green) / 0.5)" }}>
                      {artist.time}
                    </span>
                    <h3
                      className="text-2xl md:text-5xl font-sans font-bold tracking-tight transition-all duration-300"
                      style={{ color: "hsl(var(--foreground))" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "hsl(var(--neon-green))";
                        e.currentTarget.style.textShadow = "0 0 20px hsl(var(--neon-green) / 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "hsl(var(--foreground))";
                        e.currentTarget.style.textShadow = "none";
                      }}
                    >
                      {artist.name}
                    </h3>
                  </div>
                  <span className="text-xs font-sans uppercase tracking-widest hidden md:block" style={{ color: "hsl(var(--neon-pink) / 0.6)" }}>
                    {artist.genre}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-20 py-32 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-7xl font-serif font-black neon-glow-green" style={{ color: "hsl(var(--neon-green))" }}>
              ARE YOU READY?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10">
              <MagneticButton>
                <button
                  className="px-12 py-4 font-sans text-sm uppercase tracking-[0.3em] transition-all duration-500 border"
                  style={{
                    borderColor: "hsl(var(--neon-pink))",
                    color: "hsl(var(--neon-pink))",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "hsl(var(--neon-pink))";
                    e.currentTarget.style.color = "hsl(var(--neon-bg))";
                    e.currentTarget.style.boxShadow = "0 0 30px hsl(var(--neon-pink) / 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "hsl(var(--neon-pink))";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Enter the Void
                </button>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
};

export default Day2;
