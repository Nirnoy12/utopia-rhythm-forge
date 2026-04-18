import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const gallery1 = "/assets/gallery-1.jpg";
const gallery3 = "/assets/gallery-3.jpg";
const gallery5 = "/assets/gallery-5.jpg";

gsap.registerPlugin(ScrollTrigger);

const artists = [
  {
    name: "Inauguration",
    role: "Opening Ceremony",
    image: "https://i.pinimg.com/1200x/bc/21/58/bc21586cb1299ba6b0bb297a7e030514.jpg",
    time: "",
    description: "Step into the grand beginning of UTOPIA 2K26!..."
  },
  {
    name: "UTOPIA T-SHIRT Launch",
    role: "Merchandise Launch",
    image: "https://i.pinimg.com/736x/80/c4/86/80c4865d2ce232115a0eb578d277041e.jpg",
    time: "",
    description: "Be part of the exclusive reveal..."
  },
   {
  name: "Flute Performance",
  role: "Musical Instrumental Performance",
  image: "https://i.pinimg.com/1200x/9f/35/f5/9f35f54adbf3e50da9eedb562818f8d5.jpg",
  time: "",
  description: "Immerse yourself in a soulful flute performance that blends melody, rhythm, and emotion. Experience a calming yet captivating musical journey that adds a serene touch to the event atmosphere.\n\nVenue: Main Stage",
},
  {
    name: "OCTET Singing Performances",
    role: "Singing Competition",
    image: "https://i.pinimg.com/736x/16/a7/55/16a75501fa577218b7c7c5f3f23645d7.jpg",
    time: "",
    description: "Let the melodies take over!..."
  },
  {
    name: "Dance Performances",
    role: "Cultural Dance Showcase",
    image: "https://i.pinimg.com/1200x/27/2d/10/272d109d22369c1a5ba634e7701664d7.jpg",
    time: "",
    description: "Experience high-energy dance..."
  },
  {
  name: "Magic Show",
  role: "Illusion and Entertainment Performance",
  image: "https://widgetmag.com/wp-content/uploads/2021/07/AdobeStock_182305308-e1626804677120-scaled.jpeg",
  time: "",
  description: "Step into a world of mystery and illusion with a mesmerizing magic show. Witness mind-blowing tricks, sleight of hand, and captivating performances that will leave you amazed and questioning reality.\n\nVenue: Main Stage",
},
  {
    name: "Guest Performance: M-Sonic Band",
    role: "Live Band Show",
    image: "data:image/jpeg;base64,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",
    time: "",
    description: "Feel the live music vibe..."
  }
  
];

const Day1 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  const [selectedArtist, setSelectedArtist] = useState<typeof artists[0] | null>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const frameCount = 300;
    const currentFrame = (index: number) =>
      `/frames/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

    const images: HTMLImageElement[] = [];
    const sequence = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
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

    gsap.to(sequence, {
      frame: frameCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5
      },
      onUpdate: () => {
        requestAnimationFrame(() => renderFrame(sequence.frame));
      }
    });

    if (titleRef.current) {
      gsap.to(titleRef.current, {
        opacity: 0,
        y: -100,
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "50vh top",
          scrub: true
        }
      });
    }

    cardsRef.current.forEach((card) => {
      if (!card) return;

      const content = card.querySelector(".card-content");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1
        }
      });

      tl.fromTo(
        content,
        { y: "50vh", opacity: 0 },
        { y: "0", opacity: 1, duration: 1, ease: "power2.out" }
      )
        .to(content, { y: "0", opacity: 1 })
        .to(content, {
          y: "-50vh",
          opacity: 0,
          duration: 1,
          ease: "power2.in"
        });
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative bg-black text-white w-full overflow-hidden text-sm md:text-base font-sans">

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 block md:hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/day1mobilebg.jpg')` }}
        />
        <canvas ref={canvasRef} className="hidden md:block w-full h-full" />
      </div>

      {/* TITLE */}
      <div
        ref={titleRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-center w-full px-4"
      >
        <h1 className="text-[20vw] md:text-[10vw] font-black">DAY 1</h1>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">

        <div className="h-[100vh]" />

        {artists.map((artist, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="h-[45vh] md:h-[65vh] w-full flex items-center justify-center px-4 md:px-6"
          >
            <div className="card-content w-full max-w-lg text-center">

              <div className="bg-[#f5efe6] px-6 py-10 md:p-12 rounded-2xl shadow-xl">

                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-6"
                />

                <h2 className="text-3xl md:text-4xl font-black text-[#3b2a1f]">
                  {artist.name}
                </h2>

                <p className="text-[#3b2a1f]/70 italic mb-8">
                  {artist.role}
                </p>

                <button
                  onClick={() => setSelectedArtist(artist)}
                  className="border px-6 py-3 text-[#3b2a1f] rounded-full hover:bg-[#3b2a1f]/10 transition-colors duration-300"
                >
                  Know More
                </button>

              </div>
            </div>
          </div>
        ))}

      </div>

      {selectedArtist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-black p-8 rounded-xl max-w-lg w-full">
            <h3 className="text-2xl font-bold">{selectedArtist.name}</h3>
            <p>{selectedArtist.description}</p>
            <button onClick={() => setSelectedArtist(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Day1;