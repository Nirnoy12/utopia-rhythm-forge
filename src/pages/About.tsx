import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

const paragraphs = [
  "Utopia 2K26 is not just a festival — it is a manifesto. A declaration that rhythm has no borders, no timelines, no constraints.",
  "Born from the sacred temples of South India to the pulsating underground clubs of Berlin, rhythm is the universal language that connects us all.",
  "We believe that a Bharatanatyam mudra and a DJ's drop share the same DNA — the human need to express, to move, to transcend.",
  "This festival is our offering to that belief. Two days where tradition and innovation don't just coexist — they collide, they merge, they create something entirely new.",
];

const LineRevealText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.p
      ref={ref}
      className="text-lg md:text-2xl leading-relaxed font-sans text-foreground/90"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </motion.p>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Header */}
      <section className="px-6 md:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <span className="text-xs font-sans uppercase tracking-[0.5em] text-primary">The Manifesto</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-5xl md:text-8xl font-serif font-black mt-4 leading-none">
              Where Ancient<br />
              <span className="italic text-gold">Meets</span> Electric
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Asymmetrical Editorial Layout */}
      <section className="px-6 md:px-20 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-start">
          {/* Left - Text */}
          <div className="md:col-span-5 space-y-10">
            {paragraphs.map((p, i) => (
              <LineRevealText key={i} text={p} delay={i * 0.1} />
            ))}
          </div>

          {/* Right - Floating Images with Parallax */}
          <div className="md:col-span-7 relative min-h-[600px]">
            <ScrollReveal delay={0.2} className="relative z-10">
              <motion.img
                src={gallery1}
                alt="Kathak dancer"
                className="w-3/4 ml-auto shadow-2xl"
                whileInView={{ y: [50, 0] }}
                transition={{ duration: 1 }}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.4} className="mt-[-100px] relative z-20">
              <motion.img
                src={gallery3}
                alt="Dhol drummer"
                className="w-1/2 shadow-2xl border-4 border-background"
                whileInView={{ y: [80, 0] }}
                transition={{ duration: 1 }}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.6} className="mt-[-50px] ml-auto relative z-10">
              <motion.img
                src={gallery5}
                alt="Sitar player"
                className="w-2/3 ml-auto shadow-2xl"
                whileInView={{ y: [60, 0] }}
                transition={{ duration: 1 }}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: "50+", label: "Artists" },
            { num: "2", label: "Days" },
            { num: "10K", label: "Attendees" },
            { num: "1", label: "Heartbeat" },
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="text-center">
                <span className="text-4xl md:text-6xl font-serif font-black text-primary">{stat.num}</span>
                <p className="mt-2 text-sm font-sans uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
