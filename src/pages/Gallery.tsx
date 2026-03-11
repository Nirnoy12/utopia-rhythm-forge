import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TiltImage from "@/components/TiltImage";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const images = [
  { src: gallery1, alt: "Image 1" },
  { src: gallery2, alt: "Image 2" },
  { src: gallery3, alt: "Image 3" },
];

const getSevenImages = () => {
  const arr = [];
  for (let i = 0; i < 7; i++) {
    arr.push(images[i % images.length]);
  }
  return arr;
};

const Gallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const row1 = useTransform(scrollYProgress, [0, 0.33], ["0%", "-60%"]);
  const row2 = useTransform(scrollYProgress, [0.33, 0.66], ["60%", "0%"]);
  const row3 = useTransform(scrollYProgress, [0.66, 1], ["0%", "-60%"]);

  const moveLeft = () => {
    setOffset((prev) => prev + 200);
  };

  const moveRight = () => {
    setOffset((prev) => prev - 200);
  };

  const renderRow = (xMotion: any) => (
    <motion.div
      style={{
        x: xMotion,
        translateX: offset,
      }}
      className="flex gap-3 sm:gap-4 lg:gap-6 justify-center"
    >
      {getSevenImages().map((img, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-32 h-20 sm:w-40 sm:h-24 md:w-52 md:h-32 lg:w-64 lg:h-40"
        >
          <TiltImage
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      ))}
    </motion.div>
  );

  return (
    <div className="bg-background pt-24 overflow-hidden">

      {/* Title */}
      <section className="px-4 sm:px-10 lg:px-20 py-16 lg:py-20 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-[9vw] font-serif font-black">
          Gallery
        </h1>

        <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
          A visual journey through moments, culture, and creativity — where every
          frame captures the spirit of innovation and tradition coming together.
        </p>
      </section>

      {/* Scroll Section */}
      <section ref={containerRef} className="relative h-[300vh]">

        <div className="sticky top-0 h-screen flex flex-col justify-center gap-8 sm:gap-10 lg:gap-12 overflow-hidden px-4 sm:px-10 lg:px-20">

          {renderRow(row1)}
          {renderRow(row2)}
          {renderRow(row3)}

        </div>

        {/* Left Right Buttons */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-6 z-20">

          <button
            onClick={moveLeft}
            className="w-12 h-12 border border-white/40 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={moveRight}
            className="w-12 h-12 border border-white/40 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition"
          >
            <ChevronRight size={22} />
          </button>

        </div>

      </section>

      {/* Quote */}
      <section className="py-20 text-center px-4 sm:px-10 lg:px-20">
        <p className="text-2xl sm:text-3xl font-serif italic text-muted-foreground">
          “Moments fade, but the stories they create live forever.”
        </p>
      </section>

    </div>
  );
};

export default Gallery;