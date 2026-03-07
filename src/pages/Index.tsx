import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroClassical from "@/assets/hero-classical.jpg";
import heroNeon from "@/assets/hero-neon.jpg";
import MagneticButton from "@/components/MagneticButton";
import StaggerText from "@/components/StaggerText";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Dual Split Background */}
        <div className="absolute inset-0 flex">
          <div className="w-1/2 h-full relative overflow-hidden">
            <motion.img
              src={heroClassical}
              alt="Classical Indian dancer"
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
          </div>
          <div className="w-1/2 h-full relative overflow-hidden">
            <motion.img
              src={heroNeon}
              alt="Neon club atmosphere"
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-background/40 to-transparent" />
          </div>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-background/30" />

        {/* Title with mix-blend-mode */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <div className="mix-blend-difference">
            <StaggerText
              text="UTOPIA"
              tag="h1"
              className="text-[12vw] md:text-[14vw] font-serif font-black leading-none tracking-tighter text-foreground"
            />
          </div>
          <div className="mix-blend-difference mt-[-2vw]">
            <StaggerText
              text="2K26"
              tag="h1"
              className="text-[8vw] md:text-[10vw] font-sans font-light leading-none tracking-[0.3em] text-foreground"
              delay={0.4}
            />
          </div>

          <motion.p
            className="mt-8 text-sm md:text-base font-sans uppercase tracking-[0.5em] text-muted-foreground mix-blend-difference"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            Where Rhythm Evolves
          </motion.p>

          <motion.div
            className="mt-12 flex gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <MagneticButton>
              <Link
                to="/day-1"
                className="px-8 py-3 border border-primary text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-500"
              >
                Day 01 — Roots
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/day-2"
                className="px-8 py-3 border border-neon-green text-neon-green font-sans text-sm uppercase tracking-widest hover:bg-neon-green hover:text-background transition-all duration-500"
              >
                Day 02 — Neon
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-xs font-sans uppercase tracking-widest text-muted-foreground">Scroll</span>
          <motion.div
            className="w-px h-12 bg-primary/50"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* Tagline Section */}
      <section className="py-32 px-6 md:px-20">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-6xl font-serif leading-tight">
              A festival that bridges{" "}
              <span className="text-primary italic">ancient rhythm</span> with{" "}
              <span className="text-neon-pink italic">electronic pulse</span>.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground font-sans max-w-3xl leading-relaxed">
              Two days. Two worlds. One heartbeat. Utopia 2K26 brings together the spiritual depth
              of India's classical traditions and the raw energy of underground electronic culture.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Days Preview */}
      <section className="py-20 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <ScrollReveal direction="left">
            <Link to="/day-1" className="group block relative overflow-hidden aspect-[4/3]">
              <img src={heroClassical} alt="Day 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-background/60 flex flex-col justify-end p-8">
                <span className="text-xs font-sans uppercase tracking-widest text-primary">March 14, 2026</span>
                <h3 className="text-4xl md:text-5xl font-serif mt-2">Day 01</h3>
                <p className="text-xl font-serif italic text-gold mt-1">Roots & Rhythm</p>
              </div>
            </Link>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <Link to="/day-2" className="group block relative overflow-hidden aspect-[4/3]">
              <img src={heroNeon} alt="Day 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-background/60 flex flex-col justify-end p-8">
                <span className="text-xs font-sans uppercase tracking-widest text-neon-green">March 15, 2026</span>
                <h3 className="text-4xl md:text-5xl font-serif mt-2">Day 02</h3>
                <p className="text-xl font-serif italic text-neon-pink mt-1">Neon Nights</p>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-serif text-2xl font-bold text-primary">UTOPIA 2K26</span>
          <div className="flex gap-8 text-sm font-sans uppercase tracking-widest text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/gallery" className="hover:text-foreground transition-colors">Gallery</Link>
            <Link to="/day-1" className="hover:text-foreground transition-colors">Day 01</Link>
            <Link to="/day-2" className="hover:text-foreground transition-colors">Day 02</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
