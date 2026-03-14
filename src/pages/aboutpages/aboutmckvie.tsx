import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import gallery1 from "@/assets/mckvie.jpg";
import gallery3 from "@/assets/utopia23inaug.jpg";
import gallery5 from "@/assets/utopia25.jpg";

const paragraphs = [
  "MCKV Institute of Engineering (MCKVIE) is a prominent, NAAC 'A' Grade accredited, and Autonomous Institute located in Howrah, West Bengal, specializing in engineering and technology education. Established in 1999, it is affiliated with MAKAUT, approved by AICTE, and offers undergraduate and postgraduate engineering courses, with particular strength in Automobile and Computing streams.",
  "MCKVIE fosters a vibrant campus culture by balancing rigorous technical education with a wide array of cultural, artistic, and celebratory events. The institute's approach to culture is built on the belief that all-round development requires students to nurture their non-academic talents alongside their engineering studies.",
  "Utopia-The Annual Cultural Fest is the flagship cultural event of the year, providing a major platform for students to showcase talents in music, dance, and drama. This festival is our offering to that belief. Two days where tradition and innovation don't just coexist — they collide, they merge, they create something entirely new.",
];

const breathe = {
  scale: [1, 1.03, 1],
  transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
};

const LineRevealText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.p
      ref={ref}
      className="text-lg md:text-2xl leading-relaxed font-sans text-foreground/90"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1.2, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {text}
    </motion.p>
  );
};

const AboutMckvie = () => {
  return (
    <div className="min-h-screen bg-background pt-24 relative">
      {/* Noise overlay */}
      <div className="fixed inset-0 z-[5] pointer-events-none opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]" />

      {/* Golden hour ambient glow */}
      <div className="fixed top-0 left-0 w-[50vw] h-[50vh] pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top_left,_hsl(30_100%_60%/0.3)_0%,_transparent_70%)]" />

      {/* Header */}
      <section className="px-6 md:px-20 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <span className="text-[10px] font-sans uppercase tracking-[0.6em] text-primary">The Legacy of MCVKIE</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-[12vw] md:text-[8vw] font-serif font-black mt-4 leading-[0.85] tracking-[-0.04em]">
              Where Technology<br />Meets
              <span className="italic text-gold">Culture</span> 
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Asymmetrical Editorial Layout */}
      <section className="px-6 md:px-20 py-20 relative z-10">
  <div className="max-w-7xl mx-auto space-y-32">

    {/* ROW 1 */}
    <div className="grid md:grid-cols-12 gap-12 items-center">

      {/* Image Left */}
      <div className="md:col-span-6">
        <ScrollReveal>
          <motion.img
            src={gallery1}
            alt="MCKVIE campus"
            className="w-full shadow-2xl"
            whileInView={{ y: [60, 0] }}
            animate={breathe}
            transition={{ duration: 1.5 }}
          />
        </ScrollReveal>
      </div>

      {/* Text Right */}
      <div className="md:col-span-6">
        <LineRevealText text={paragraphs[0]} />
      </div>

    </div>


    {/* ROW 2 */}
    <div className="grid md:grid-cols-12 gap-12 items-center">

      {/* Text Left */}
      <div className="md:col-span-6 order-2 md:order-1">
        <LineRevealText text={paragraphs[1]} />
      </div>

      {/* Image Right */}
      <div className="md:col-span-6 order-1 md:order-2">
        <ScrollReveal>
          <motion.img
            src={gallery3}
            alt="Utopia culture"
            className="w-full shadow-2xl"
            whileInView={{ y: [60, 0] }}
            animate={breathe}
            transition={{ duration: 1.5 }}
          />
        </ScrollReveal>
      </div>

    </div>


    {/* ROW 3 */}
    <div className="grid md:grid-cols-12 gap-12 items-center">

      {/* Image Left */}
      <div className="md:col-span-6">
        <ScrollReveal>
          <motion.img
            src={gallery5}
            alt="Utopia fest"
            className="w-full shadow-2xl"
            whileInView={{ y: [60, 0] }}
            animate={breathe}
            transition={{ duration: 1.5 }}
          />
        </ScrollReveal>
      </div>

      {/* Text Right */}
      <div className="md:col-span-6">
        <LineRevealText text={paragraphs[2]} />
      </div>

    </div>

  </div>
</section>


      
    </div>
  );
};

export default AboutMckvie;
