import { motion } from "framer-motion";
import TiltImage from "@/components/TiltImage";

const getImageSrc = (index: number) => {
  // Use uppercase .JPG to match your actual file extensions
  return `/gallery/${index}.JPG`;
};

const Gallery = () => {
  const renderRow = (direction: "left" | "right", start: number) => {
    const animateX = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

    return (
      <div className="overflow-hidden w-full">
        <motion.div
          animate={{ x: animateX }}
          transition={{
            duration: 35,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex gap-6"
        >
          {Array.from({ length: 20 }).map((_, i) => {
            // Generates 1-10 for row 1, 11-20 for row 2, 21-30 for row 3
            const imgIndex = start + (i % 10) + 1;

            return (
              <div
                key={i}
                className="flex-shrink-0
                w-44 h-28 sm:w-56 sm:h-36 md:w-64 md:h-40 lg:w-72 lg:h-44
                p-[3px] bg-black rounded-xl overflow-hidden"
              >
                <TiltImage
                  src={getImageSrc(imgIndex)}
                  alt={`Image ${imgIndex}`}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="relative bg-background min-h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="pt-24"
      >
        <section className="px-4 sm:px-10 lg:px-20 py-20 text-center">
          <motion.img
            src="/deb/Culturex-CLmvyJNH.png"
            alt="Gallery"
            className="w-full max-w-6xl mx-auto object-contain drop-shadow-2xl"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <p className="mt-10 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            A visual journey through moments, culture, and creativity.
          </p>
        </section>

        <section className="flex flex-col gap-12 px-4 sm:px-10 lg:px-20 py-16">
          {renderRow("left", 0)}   {/* Renders images 1-10 */}
          {renderRow("right", 10)} {/* Renders images 11-20 */}
          {renderRow("left", 20)}  {/* Renders images 21-30 */}
        </section>

        <section className="py-20 text-center px-4 sm:px-10 lg:px-20">
          <p className="text-2xl sm:text-3xl font-serif italic text-muted-foreground">
            “Moments fade, but the stories they create live forever.”
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default Gallery;