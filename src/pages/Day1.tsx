import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

const artists = [
  { name: "Priya Venkatesh", role: "Bharatanatyam", time: "6:00 PM", image: gallery1 },
  { name: "Ravi Shankar Collective", role: "Sitar & Tabla Ensemble", time: "7:00 PM", image: gallery5 },
  { name: "Dhol Foundation", role: "Percussion Ensemble", time: "8:00 PM", image: gallery3 },
  { name: "Anoushka Menon", role: "Kathak Fusion", time: "9:00 PM", image: gallery1 },
  { name: "Tala Vādya Ensemble", role: "Classical Orchestra", time: "10:00 PM", image: gallery5 },
  { name: "Ghungroo Collective", role: "Dance Theater", time: "11:00 PM", image: gallery3 },
];

const Day1 = () => {
  const [hoveredArtist, setHoveredArtist] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="min-h-screen bg-background pt-24" onMouseMove={handleMouseMove}>
      {/* Cursor-following image */}
      <AnimatePresence>
        {hoveredArtist !== null && (
          <motion.div
            className="fixed pointer-events-none z-30 w-64 h-80 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePos.x - 128,
              y: mousePos.y - 160,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <img
              src={artists[hoveredArtist].image}
              alt={artists[hoveredArtist].name}
              className="w-full h-full object-cover"
              style={{ filter: "sepia(40%) saturate(1.3) brightness(0.9)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex min-h-[calc(100vh-6rem)]">
        {/* Sticky Sidebar */}
        <aside className="hidden lg:flex w-80 flex-shrink-0 sticky top-24 h-[calc(100vh-6rem)] flex-col justify-between p-8 border-r border-border">
          <div>
            <span className="text-xs font-sans uppercase tracking-[0.5em] text-primary">March 14, 2026</span>
            <h2 className="text-6xl font-serif font-black mt-4 leading-none">
              DAY<br />
              <span className="text-primary">01</span>
            </h2>
            <p className="mt-4 text-xl font-serif italic text-gold">Roots & Rhythm</p>
            <p className="mt-6 text-sm text-muted-foreground font-sans leading-relaxed">
              An evening dedicated to the sacred foundations of Indian rhythm. From the temples to the stage.
            </p>
          </div>
          <div className="text-xs font-sans uppercase tracking-widest text-muted-foreground">
            6:00 PM — 12:00 AM
          </div>
        </aside>

        {/* Artist Lineup */}
        <main className="flex-1 px-6 md:px-16 py-12">
          {/* Mobile header */}
          <div className="lg:hidden mb-12">
            <span className="text-xs font-sans uppercase tracking-[0.5em] text-primary">March 14, 2026</span>
            <h1 className="text-5xl font-serif font-black mt-2">DAY <span className="text-primary">01</span></h1>
            <p className="text-xl font-serif italic text-gold mt-1">Roots & Rhythm</p>
          </div>

          <div className="space-y-0">
            {artists.map((artist, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div
                  className="group py-8 border-b border-border cursor-pointer"
                  onMouseEnter={() => setHoveredArtist(i)}
                  onMouseLeave={() => setHoveredArtist(null)}
                >
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs font-sans text-muted-foreground mr-4">{artist.time}</span>
                      <h3 className="inline text-2xl md:text-4xl font-serif font-bold group-hover:text-primary transition-colors duration-300">
                        {artist.name}
                      </h3>
                    </div>
                    <span className="text-sm font-sans uppercase tracking-widest text-gold hidden md:block">
                      {artist.role}
                    </span>
                  </div>
                  <p className="text-sm font-sans text-muted-foreground mt-1 md:hidden">{artist.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Day1;
