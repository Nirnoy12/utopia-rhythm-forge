import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

import MandalaHeader from "./aboututopia";
import AboutMckvie from "./aboutmckvie";
import { useRef } from "react";

const AboutUtopiaPage = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // page flip rotation
    const blur = useTransform(scrollYProgress, [0, 0.4], [0, 20]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.05]);
  const blurFilter = useMotionTemplate`blur(${blur}px)`;

  return (
    <div ref={ref} style={{ height: "200vh", perspective: "1200px" }}>
      
      {/* First Page */}
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
            filter: blurFilter,
          opacity,
          scale,
          zIndex: 2,
        }}
      >
        <MandalaHeader />
      </motion.div>

      {/* Second Page */}
      <div
        style={{
          height: "100vh",
          background: "#fff",
        }}
      >
        <AboutMckvie />
      </div>
    </div>
  );
};

export default AboutUtopiaPage;
