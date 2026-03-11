import React from "react";
import ScrollReveal from "./ScrollReveal";

import headup from "../assets/headup.png";
import headdown from "../assets/head.png";

import sponsor1 from "../assets/gdgc.png";
import sponsor2 from "../assets/mckv.png"; 
import "../components/css/sponsor.css";

const Sponsor = () => {
  return (
    <div>

      


      {/* TITLE */}
      <section className="py-10 px-10 md:px-20 relative">
        <div className="max-w-6xl mx-auto flex justify-center">
          <ScrollReveal>
            <h2 className="text-[8vw] md:text-[3vw] font-serif leading-[0.95] tracking-[-0.02em] text-center mb-0">
              Our Esteemed Event
              <span className="text-primary italic"> Sponsors</span>.
            </h2>
          </ScrollReveal>
        </div>
      </section>


      {/* SPONSOR LOGOS */}
      <section className="creative-section">
        <div className="content">

          <div className="sponsor-logos">
            <img src={sponsor1} alt="Sponsor 1" />
          </div>

          <div className="sponsor-logos">
            <img src={sponsor2} alt="Sponsor 2" />
          </div>

          <div className="sponsor-logos">
            <img src={sponsor2} alt="Sponsor 3" />
          </div>

          <div className="sponsor-logos">
            <img src={sponsor1} alt="Sponsor 1" />
          </div>

          <div className="sponsor-logos">
            <img src={sponsor2} alt="Sponsor 2" />
          </div>


          <div className="sponsor-logos">
            <img src={sponsor1} alt="Sponsor 1" />
          </div>

          <div className="sponsor-logos">
            <img src={sponsor2} alt="Sponsor 2" />
          </div>

          <div className="sponsor-logos">
            <img src={sponsor1} alt="Sponsor 1" />
          </div>

        </div>
      </section>


      {/* BOTTOM PATTERN */}
      <section className="pattern-section">
        <div className="pattern-track">

          <div className="pattern-row">
            <img src={headdown} alt="pattern" />
            <img src={headdown} alt="pattern" />
            <img src={headdown} alt="pattern" />
            <img src={headdown} alt="pattern" />
            <img src={headdown} alt="pattern" />
            <img src={headdown} alt="pattern" />
          </div>

          <div className="pattern-row">
            <img src={headdown} alt="pattern" />
            <img src={headdown} alt="pattern" />
            <img src={headdown} alt="pattern" />
            <img src={headdown} alt="pattern" />
            <img src={headdown} alt="pattern" />
            <img src={headdown} alt="pattern" />
          </div>

        </div>
      </section>

    </div>
  );
};

export default Sponsor;