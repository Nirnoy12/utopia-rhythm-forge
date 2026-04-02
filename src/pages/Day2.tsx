import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const gallery1 = "/assets/gallery-1.jpg";
const gallery3 = "/assets/gallery-3.jpg";
const gallery5 = "/assets/gallery-5.jpg";

gsap.registerPlugin(ScrollTrigger);

// Real event data for Day 2 (16th March onwards)
const artistsDay2 = [
  [
  {
    name: "Band Performances",
    role: "Live Music Showcase",
    time: "To Be Announced",
    image: gallery1,
    registerLink: "",
    description: "Experience electrifying live performances by talented bands. Get ready for a musical vibe filled with energy, rhythm, and crowd interaction.\n\nVenue: Main Stage",
  },
  {
    name: "Committee Dance Performances",
    role: "Organizing Team Special Acts",
    time: "To Be Announced",
    image: gallery1,
    registerLink: "",
    description: "Watch the organizing committee set the stage on fire with their special dance performances. A blend of creativity, coordination, and entertainment.\n\nVenue: Main Stage",
  },
  {
    name: "Magic Show",
    role: "Live Illusion Performance",
    time: "To Be Announced",
    image: gallery1,
    registerLink: "",
    description: "Step into a world of illusion and wonder with a thrilling magic show. Expect mind-bending tricks and unforgettable moments.\n\nVenue: Main Stage",
  },
  {
    name: "Guest Artist Performance: Somlata and the Aces",
    role: "Live Concert",
    time: "To Be Announced",
    image: gallery1,
    registerLink: "",
    description: "Enjoy a spectacular live concert by Somlata and the Aces, delivering soulful music and an unforgettable stage experience.\n\nVenue: Main Stage",
  }
]
 
];


const Day2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const endCTA = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const wrappersRef = useRef<(HTMLDivElement | null)[]>([]);

  // STATE FOR THE MODAL
  const [selectedArtist, setSelectedArtist] = useState<typeof artistsDay2[0][0] | null>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();

    // ==========================================
    // DESKTOP LOGIC
    // ==========================================
    mm.add("(min-width: 768px)", () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;

      const totalFrames = 192; 
      const framesPerPageTurn = 80; 
      const currentFrame = (index: number) => `/frames2/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;

      const images: HTMLImageElement[] = [];
      const sequence = { frame: 0 };

      for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
      }

      const renderFrame = (index: number) => {
        const img = images[Math.round(index)];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      };

      const resizeCanvas = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        renderFrame(sequence.frame);
      };

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();
      images[0].onload = () => renderFrame(0);

      const totalPages = Math.ceil(artistsDay2.flat().length / 2);

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const isLeftPage = index % 2 === 0;
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          left: isLeftPage ? "38%" : "62%", 
          top: "48%",                       
          scale: 0.7, 
          rotation: isLeftPage ? -4 : 2,   
          autoAlpha: 0,                     
          transformPerspective: 1000,
        });
      });

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalPages * 1500}vh`, 
          scrub: 1, 
          pin: true,
        }
      });

      if (titleRef.current) {
        masterTl.to(titleRef.current, { autoAlpha: 0, duration: 5, ease: "power2.out" }, 0); 
      }

      for (let page = 0; page < totalPages; page++) {
        const leftCardIndex = page * 2;
        const rightCardIndex = leftCardIndex + 1;
        const leftCard = cardsRef.current[leftCardIndex];
        const rightCard = cardsRef.current[rightCardIndex];

        masterTl.to([leftCard, rightCard].filter(Boolean), { autoAlpha: 1, duration: 5 });

        if (leftCard) {
          masterTl.to(leftCard, { left: "50%", top: "50%", scale: 1.5, rotation: 0, rotationX: 0, zIndex: 50, boxShadow: "0px 40px 60px rgba(0,0,0,0.5)", duration: 5, ease: "power2.inOut" })
          .to({}, { duration: 1 }) 
          .to(leftCard, { left: "38%", top: "48%", scale: 0.7, rotation: -4, rotationX: 0, zIndex: 10, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)", duration: 5, ease: "power2.inOut" });
        }

        if (rightCard) {
          masterTl.to(rightCard, { left: "50%", top: "50%", scale: 1.5, rotation: 0, rotationX: 0, zIndex: 50, boxShadow: "0px 40px 60px rgba(0,0,0,0.5)", duration: 5, ease: "power2.inOut" })
          .to({}, { duration: 1 })
          .to(rightCard, { left: "62%", top: "48%", scale: 0.7, rotation: 2, rotationX: 0, zIndex: 10, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)", duration: 5, ease: "power2.inOut" });
        }

        if (page < totalPages - 1) {
          masterTl.to([leftCard, rightCard].filter(Boolean), { autoAlpha: 0, duration: 1 }, "+=0.5"); 
          masterTl.to(sequence, { frame: (page + 1) * framesPerPageTurn, duration: 4, ease: "power2.inOut", onUpdate: () => renderFrame(sequence.frame) }, "<"); 
          masterTl.to({}, { duration: 0.1 });
        } else {
          masterTl.to([leftCard, rightCard].filter(Boolean), { autoAlpha: 0, duration: 2 }, "+=1");
          if (endCTA.current) {
            masterTl.to(endCTA.current, { autoAlpha: 1, duration: 3, ease: "power2.out" });
          }
        }
      }

      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    });

    // ==========================================
    // MOBILE LOGIC
    // ==========================================
    mm.add("(max-width: 767px)", () => {
      
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "40vh top",
            scrub: true,
          }
        });
      }

      cardsRef.current.forEach((card, index) => {
        const wrapper = wrappersRef.current[index];
        if (!card || !wrapper) return;

        gsap.set(card, { clearProps: "all" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          }
        });

        const tilt = index % 2 === 0 ? -2 : 2;

        tl.fromTo(card, 
            { y: "50vh", opacity: 0, rotation: tilt * 2 }, 
            { y: "0", opacity: 1, rotation: tilt, duration: 1, ease: "power2.out" }
          )
          .to(card, { y: "0", opacity: 1, rotation: tilt, duration: 1 }) 
          .to(card, { y: "-50vh", opacity: 0, rotation: tilt * -1, duration: 1, ease: "power2.in" });
      });

      if (endCTA.current) {
        gsap.fromTo(endCTA.current,
          { autoAlpha: 0 },
          { 
            autoAlpha: 1, 
            scrollTrigger: {
              trigger: endCTA.current,
              start: "top 90%",
              end: "bottom bottom",
              scrub: true
            }
          }
        );
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative bg-[#1A1814] w-full min-h-screen md:h-screen overflow-x-hidden md:overflow-hidden font-sans text-[#2C2A25] text-sm md:text-base">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="fixed inset-0 block md:hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/day2mobilebg.jpg')` }}
        />
        <canvas ref={canvasRef} className="hidden md:block opacity-100 w-full h-full object-cover" />
      </div>

      {/* --- TITLE --- */}
      <div 
        ref={titleRef} 
        className="fixed md:absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none flex flex-col items-center text-center mix-blend-multiply opacity-70 w-full px-4"
      >
        <h1 className="text-sm md:text-lg font-sans tracking-[0.6em] text-[#2C2A25] uppercase mb-4">The Roster</h1>
        <p className="text-5xl md:text-7xl font-sans italic text-[#2C2A25]">Day 02</p>
      </div>

      {/* --- CARDS CONTAINER --- */}
      <div className="relative z-10 w-full flex flex-col items-center md:absolute md:inset-0 md:block md:pointer-events-none perspective-[1200px]">
        
        <div className="h-[100vh] w-full block md:hidden"></div>

        {artistsDay2.flat().map((artist, index) => (
          <div 
            key={index}
            ref={(el) => (wrappersRef.current[index] = el)}
            className="h-[80vh] w-full flex items-center justify-center px-4 overflow-hidden md:h-auto md:w-auto md:block md:absolute md:inset-0 md:overflow-visible"
          >
            {/* --- POLAROID CARD UI --- */}
            <div 
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative md:absolute will-change-transform w-[280px] md:w-[370px] bg-[#f5efe6] p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center rounded-sm pointer-events-auto border border-[#3b2a1f]/10"
            >
              <div className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden mb-5 bg-[#3b2a1f]/5 border border-[#3b2a1f]/10">
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="w-full h-full object-cover filter contrast-[1.05] sepia-[10%]" 
                />
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none" />
              </div>
              
              <div className="w-full text-center flex flex-col items-center flex-grow">
                <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.3em] uppercase mb-1 text-[#b64a2b]">
                  {artist.time}
                </span>
                <h2 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-[#3b2a1f] mb-1">
                  {artist.name}
                </h2>
                <p className="text-xs md:text-sm font-sans text-[#3b2a1f]/70 font-medium italic mb-6">
                  {artist.role}
                </p>

                <div className="flex w-full gap-2 md:gap-3 justify-center mt-auto">
                  {/* ADDED onClick HANDLER HERE */}
                  <button 
                    onClick={() => setSelectedArtist(artist)}
                    className="w-full border border-[#3b2a1f]/30 hover:border-[#3b2a1f] text-[#3b2a1f] text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase py-3 md:py-3.5 rounded-sm transition-all duration-300 bg-transparent hover:bg-[#3b2a1f]/5 cursor-pointer"
                  >
                    Know More
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        ))}

        <div className="h-[50vh] w-full block md:hidden"></div>
      </div>

      {/* --- INSTRUCTION --- */}
      <div className="fixed md:absolute top-8 md:bottom-8 md:top-auto left-1/2 -translate-x-1/2 z-40 pointer-events-none opacity-60">
        <p className="text-xs font-sans tracking-[0.3em] uppercase text-[#2C2A25]/70 animate-pulse drop-shadow-md whitespace-nowrap bg-white/50 px-4 py-2 rounded-full md:bg-transparent">
          Scroll to Inspect
        </p>
      </div>

      {/* --- CALL TO ACTION - CROSS LINK --- */}
      <div ref={endCTA} className="relative z-20 w-full flex justify-center py-20 md:py-32 bg-black/40 backdrop-blur-md border-t border-[#2C2A25]/10 mt-20 opacity-0 invisible md:absolute md:bottom-0 md:bg-black/60 md:mt-0 pointer-events-auto">
        <div className="text-center group">
          <p className="text-xs md:text-sm font-sans tracking-[0.4em] uppercase text-white/60 mb-4 mix-blend-difference text-white">
            Where It All Began
          </p>
          <Link 
            to="/day-1"
            className="inline-flex items-center gap-4 text-2xl md:text-4xl font-sans font-bold text-white hover:text-[#B85741] transition-colors duration-300 drop-shadow-lg cursor-pointer"
          >
            <span className="group-hover:-translate-x-4 transition-transform duration-300">←</span>
            <span>Return to Day 01</span>
          </Link>
        </div>
      </div>

      {/* ========================================== */}
      {/* TRANSPARENT GLASSMORPHISM MODAL */}
      {/* ========================================== */}
      {selectedArtist && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop (clicking it closes the modal) */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer transition-opacity"
            onClick={() => setSelectedArtist(null)}
          />
          
          {/* Modal Box */}
          <div className="relative w-full max-w-lg bg-[#1A1814]/40 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.7)] text-[#f5efe6] animate-in fade-in zoom-in duration-300">
            
            {/* Close Button (X) */}
            <button 
              onClick={() => setSelectedArtist(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* Content */}
            <span className="block text-[#b64a2b] text-xs font-bold tracking-[0.3em] uppercase mb-2">
              {selectedArtist.time}
            </span>
            <h3 className="text-3xl md:text-4xl font-sans font-bold mb-1">
              {selectedArtist.name}
            </h3>
            <p className="text-white/70 italic font-sans mb-6 text-sm md:text-base">
              {selectedArtist.role}
            </p>
            
            {/* Image Preview inside Modal */}
            <div className="w-full aspect-video mb-6 overflow-hidden rounded-lg border border-white/10 shadow-inner">
              <img 
                src={selectedArtist.image} 
                alt={selectedArtist.name} 
                className="w-full h-full object-cover filter contrast-[1.05] sepia-[10%]" 
              />
            </div>

            <p className="text-sm md:text-base font-sans text-white/80 leading-relaxed">
              {selectedArtist.description}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default Day2;