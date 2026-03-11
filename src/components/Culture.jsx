import React, { useState } from 'react';
import culture from "../assets/Culturex.png";

const Culture = () => {

  const [hover, setHover] = useState(false);
  const [cardHover, setCardHover] = useState(false);

  return (
    <div style={styles.containerx}>
      
      <div
        style={{
          ...styles.cardx        }}
       
      >
        <img
          src={culture}
          alt="Culture Art"
          style={{
            ...styles.imagex
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />

        <h2 style={styles.title}>Indian Culture</h2>
        <p style={styles.text}>
          Discover the beauty and richness of Indian cultural heritage.
        </p>
      </div>

    </div>
  );
};

const styles = {
  containerx: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "60px 20px",
  },
  cardx: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "12px",
    textAlign: "center",
    transition: "0.3s",
    background: "transparent",
  },
  imagex: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
    transition: "0.3s",
  },
  title: {
    marginTop: "15px",
    fontSize: "22px",
  },
  text: {
    fontSize: "14px",
    color: "#555",
  },
};

export default Culture;