import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Assets
import gallery1 from "@/assets/mckvie.jpg";
import gallery3 from "@/assets/utopia23inaug.jpg";
import gallery5 from "@/assets/utopia25.jpg";

const paragraphs = [
  "Established in 1999, MCKV Institute of Engineering (MCKVIE) is a top engineering college in West Bengal known for fostering technological learning and application. An autonomous NAAC 'A' Grade accredited institution affiliated with MAKAUT, we offer diverse B.Tech programs including Mechanical, Electrical, Computer Science, and specialized new-age courses in CSE (Data Science) and AI & Machine Learning, alongside M.Tech and MBA programs.",
  "Beyond core academics, MCKVIE is a pioneer of overall development. We foster a vibrant campus culture by balancing rigorous technical education with a wide array of cultural and celebratory events. Our institution believes in nurturing students' creative talents through various co-curricular and extra-curricular platforms, ensuring they excel both in the lab and on the stage.",
  "UTOPIA is the annual cultural fest of MCKVIE—a grand showcase of talent and togetherness. From music, dance, and drama to fashion shows, gaming contests, and celebrity performances, it offers a platform for students to explore their creative limits. UTOPIA 2025 blends culture with innovation, featuring interactive workshops, exhibitions, and food stalls that create an unforgettable, electrifying atmosphere."
];

const FadeInView = ({ children, direction = "up" }: { children: React.ReactNode, direction?: "up" | "left" | "right" }) => (
  <motion.div
    initial={{ opacity: 0, y: direction === "up" ? 40 : 0, x: direction === "left" ? -40 : direction === "right" ? 40 : 0 }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const AboutUtopiaPage = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-orange-500 selection:text-white">
      
      {/* HERO SECTION */}
      <section ref={targetRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity, scale }} className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block py-1.5 px-4 mb-8 text-xs font-bold tracking-[0.3em] uppercase border border-orange-200 bg-orange-50 text-orange-600 rounded-full dark:bg-orange-950/30 dark:border-orange-900/50">
              Legacy • Innovation • Culture
            </span>
          </motion.div>
          
          <h1 className="text-7xl md:text-[10rem] font-serif font-black tracking-tighter leading-tight">
            About <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-500 via-rose-500 to-amber-500">
              Utopia
            </span>
          </h1>
          
          <p className="mt-10 text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Where technological excellence meets the boundless energy of artistic expression.
          </p>
        </motion.div>
        
        {/* Animated Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-200/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-200/20 blur-[120px] rounded-full animate-pulse delay-1000" />
      </section>

      {/* CONTENT SECTIONS */}
      <section className="px-6 md:px-20 py-10 space-y-40 pb-32">
        
        {/* ROW 1: THE INSTITUTE */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-7">
            <FadeInView direction="left">
              <div className="relative group overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-orange-600/10 group-hover:bg-transparent transition duration-700 z-10" />
                <img src={gallery1} alt="MCKVIE Campus" className="w-full aspect-video object-cover transform group-hover:scale-105 transition duration-700" />
              </div>
            </FadeInView>
          </div>
          <div className="md:col-span-5">
            <FadeInView direction="right">
              <h2 className="text-sm font-bold tracking-widest text-orange-600 uppercase mb-4">The Institution</h2>
              <h3 className="text-4xl font-serif font-bold mb-6 italic">About MCKVIE</h3>
              <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-light">
                {paragraphs[0]}
              </p>
            </FadeInView>
          </div>
        </div>

        {/* ROW 2: DEVELOPMENT */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5 order-2 md:order-1">
            <FadeInView direction="left">
              <h2 className="text-sm font-bold tracking-widest text-rose-600 uppercase mb-4">Our Philosophy</h2>
              <h3 className="text-4xl font-serif font-bold mb-6 italic">Holistic Growth</h3>
              <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-light">
                {paragraphs[1]}
              </p>
            </FadeInView>
          </div>
          <div className="md:col-span-7 order-1 md:order-2">
            <FadeInView direction="right">
               <img src={gallery3} alt="Culture at MCKVIE" className="w-full aspect-video object-cover rounded-3xl shadow-2xl" />
            </FadeInView>
          </div>
        </div>

        {/* ROW 3: UTOPIA FEST */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-7">
            <FadeInView direction="left">
               <img src={gallery5} alt="Utopia 2025" className="w-full aspect-video object-cover rounded-3xl shadow-2xl" />
            </FadeInView>
          </div>
          <div className="md:col-span-5">
            <FadeInView direction="right">
              <h2 className="text-sm font-bold tracking-widest text-amber-600 uppercase mb-4">The Main Event</h2>
              <h3 className="text-5xl font-black mb-6 tracking-tight">UTOPIA 2025</h3>
              <p className="text-xl leading-relaxed font-medium text-slate-700 dark:text-slate-300">
                {paragraphs[2]}
              </p>
              <div className="mt-8 p-4 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20 italic">
                "Two days where tradition and innovation collide."
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ACCREDITATION SECTION */}
<section className="py-36 px-6 bg-slate-100 dark:bg-slate-900/30">
  <div className="max-w-7xl mx-auto">

    <FadeInView>
      <h3 className="text-center text-sm font-bold tracking-[0.35em] uppercase text-slate-400 mb-20">
        Recognized & Accredited By
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

        {[
          { name: "MCKVIE", src: "/MCKVIE.png" },
          { name: "AICTE", src: "/AICTE.png" },
          { name: "NAAC", src: "/NAAC.png" },
        ].map((logo) => (
          <motion.div
            key={logo.name}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-800/60 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-3xl p-16 flex justify-center items-center shadow-lg hover:shadow-2xl transition-all"
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="h-28 md:h-32 w-auto object-contain"
            />
          </motion.div>
        ))}

      </div>

    </FadeInView>

  </div>
</section>
    </div>
  );
};

export default AboutUtopiaPage;