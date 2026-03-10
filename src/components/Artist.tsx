import React from "react";
import artist1 from "../assets/1.png";
import "../components/css/artist.css";
import heroClassical from "@/assets/hero-classical.jpg";
import ScrollReveal from "./ScrollReveal";

const Artist: React.FC = () => {
  return (
    <>
    <section className="about-section">
      <div className="about-container">

        {/* RIGHT IMAGE */}
        <div className="about-image">
          <img src={artist1} alt="Cultural Art" />
        </div>

        {/* LEFT CONTENT */}
        <div className="about-content">
          <section className="py-30 px-6 md:px-10 relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-[8vw] md:text-83vw] font-serif leading-[0.95] tracking-[-0.02em]">
              Our Day 1 Fest's Artist {" "}
              <span className="text-primary italic">Arijit Singh</span> in {" "}
              <span className="text-neon-pink italic">Utopia 2026</span>.
            </h2>
          </ScrollReveal>
        </div>
      </section>
        </div>

      </div>
    </section>
    
    

</>
  );
};

export default Artist;