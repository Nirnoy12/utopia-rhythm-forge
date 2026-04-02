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
    image: gallery5,
    time: "",
    description: "Step into the grand beginning of UTOPIA 2K26!..."
  },
  {
    name: "Launch of UTOPIA T-SHIRT",
    role: "Merchandise Launch",
    image: gallery3,
    time: "",
    description: "Be part of the exclusive reveal..."
  },
  {
    name: "OCTET Singing Performances",
    role: "Music Competition",
    image: gallery1,
    time: "",
    description: "Let the melodies take over!..."
  },
  {
    name: "Dance Performances",
    role: "Cultural Dance Showcase",
    image: gallery5,
    time: "",
    description: "Experience high-energy dance..."
  },
  {
    name: "Guest Performance: M-Sonic Band",
    role: "Live Band Show",
    image: gallery3,
    time: "",
    description: "Feel the live music vibe..."
  },
  {
    name: "DJ Performance",
    role: "DJ Night",
    image: gallery1,
    time: "",
    description: "End Day 1 with a bang!..."
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