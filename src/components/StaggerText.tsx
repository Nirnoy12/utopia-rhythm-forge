import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerTextProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

const StaggerText = ({ text, className = "", delay = 0, tag = "h1" }: StaggerTextProps) => {
  const words = text.split(" ");
  const Tag = tag;

  return (
    <Tag className={`${className} overflow-hidden`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "150%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default StaggerText;
