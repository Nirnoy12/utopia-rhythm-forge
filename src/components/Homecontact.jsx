import React, { useState } from 'react';
import arms from "../assets/arms.png";

const Homecontact = () => {

  const [hover, setHover] = useState(false);
  const [cardHover, setCardHover] = useState(false);

  return (
    <div
      id="home-contact-container"
      style={{
        ...styles.container,
        ...(cardHover ? styles.containerHover : {})
      }}
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
    >
      
      <img 
        id="home-contact-image"
        src={arms} 
        alt="Robotic Arm Sketch" 
        style={styles.image} 
      />

      <div id="home-contact-overlay" style={styles.overlay}>
        <h1 id="home-contact-text" style={styles.text}>
          Having Trouble? Need Any Help?
        </h1>

        <button
          id="home-contact-button"
          style={{
            ...styles.button,
            ...(hover ? styles.buttonHover : {})
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => console.log('Button Clicked!')}
        >
          Contact Support
        </button>

      </div>
    </div>
  );
};

const styles = {

  container: {
    position: 'relative',
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    overflow: 'hidden',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
    transition: 'all 0.4s ease'
  },

  containerHover: {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 45px rgba(0,0,0,0.35)'
  },

  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
    opacity: '0.85',
    transition: 'transform 0.4s ease'
  },

  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    width: '100%'
  },

  text: {
    fontSize: '2.5rem',
    color: '#4a3a35',
    marginBottom: '1rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 6px rgba(0,0,0,0.3)'
  },

  button: {
    padding: '12px 26px',
    fontSize: '1rem',
    backgroundColor: '#8b5a2b',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.35s ease',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
  },

  buttonHover: {
    backgroundColor: '#6e4420',
    transform: 'translateY(-4px) scale(1.05)',
    boxShadow: '0 12px 25px rgba(0,0,0,0.45)'
  }

};

export default Homecontact;