import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TiltImage from "@/components/TiltImage";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  { src: gallery1, alt: "Kathak dancer", tall: false },
  { src: gallery2, alt: "DJ performing", tall: true },
  { src: gallery3, alt: "Dhol drummer", tall: false },
  { src: gallery4, alt: "Neon crowd", tall: true },
  { src: gallery5, alt: "Sitar player", tall: false },
  { src: gallery6, alt: "Stage design", tall: false },
];

const Gallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <div className="bg-background pt-24">
      {/* Header */}
      <section className="px-6 md:px-20 py-16">
        <span className="text-xs font-sans uppercase tracking-[0.5em] text-primary">The Visual Echo</span>
        <h1 className="text-5xl md:text-8xl font-serif font-black mt-4">Gallery</h1>
      </section>

      {/* Horizontal Scroll Section */}
      <section ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-6 pl-20">
            {images.map((img, i) => (
              <div
                key={i}
                className={`flex-shrink-0 ${img.tall ? "w-[350px] h-[500px]" : "w-[500px] h-[350px]"} ${
                  i % 2 === 0 ? "mt-0" : "mt-20"
                }`}
              >
                <TiltImage src={img.src} alt={img.alt} className="w-full h-full rounded-sm" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom text */}
      <section className="py-20 px-6 md:px-20 text-center">
        <p className="text-2xl md:text-4xl font-serif italic text-muted-foreground">
          Every frame tells a story of <span className="text-primary">tradition</span> meeting{" "}
          <span className="text-neon-pink">revolution</span>.
        </p>
      </section>
    </div>
  );
};

export default Gallery;
