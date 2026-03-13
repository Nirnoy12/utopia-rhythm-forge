import React from "react";
import pattern from "../assets/alpona2.png";

const MandalaHeader: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.mandalaWrapper}>
        <img src={pattern} alt="Mandala Pattern" style={styles.mandala} />
      </div>

      <div style={styles.textWrapper}>
        <h1 style={styles.heading}>About Utopia</h1>
      </div>

      <style>
        {`
        @keyframes rotateMandala {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        `}
      </style>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    background: "#e4e4e4",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  mandalaWrapper: {
    position: "absolute",
    top: "-45vh", // hides upper half
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1,
  },

  mandala: {
    width: "100vw",
    height: "93vw",
    objectFit: "contain",
    animation: "rotateMandala 40s linear infinite",
  },

  textWrapper: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
  },

  heading: {
    fontSize: "5rem",
    fontWeight: 600,
    color: "#5e3200", // matches Utopia orange
    letterSpacing: "2px",
    textShadow: `
    0 0 10px rgba(249, 182, 101, 0.93),
    0 0 20px rgba(255,140,0,0.6),
    0 0 40px rgba(255, 163, 50, 0.4)
  `,
  },

};

export default MandalaHeader;

