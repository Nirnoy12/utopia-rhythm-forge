import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltImageProps {
  src: string;
  alt: string;
  className?: string;
}

const TiltImage = ({ src, alt, className = "" }: TiltImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: y * -15, rotateY: x * 15 });
  };

  const handleMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={tilt}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    </motion.div>
  );
};

export default TiltImage;
