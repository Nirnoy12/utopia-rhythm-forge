import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// 1. PROPER VITE IMPORTS (Required for production builds)
import ganesh from "@/assets/ganesh.jpg";
import lunch from "@/assets/lunch.jpg";
import cultural2 from "@/assets/cultural2.jpg";
import cultural3 from "@/assets/cultural3.jpg";
import main_event from "@/assets/main_event.jpg";

gsap.registerPlugin(ScrollTrigger);

const events = [
  { time: "09:00 AM", title: "Opening Ceremony", img: ganesh },
  { time: "10:30 AM", title: "Cultural Performance", img: cultural2 },
  { time: "01:00 PM", title: "Lunch Break", img: lunch },
  { time: "02:30 PM", title: "Cultural Programme", img: cultural3 },
  { time: "05:00 PM", title: "Main Event", img: main_event }
];

export default function ScheduleSection() {
  const container = useRef<HTMLDivElement>(null);
  const bead = useRef<HTMLDivElement>(null);

  // 2. USING useGSAP FOR PROPER REACT 18 CLEANUP
  useGSAP(() => {
    if (!bead.current || !container.current) return;

    gsap.to(bead.current, {
      // Rotate exactly one full circle backwards so the cards come up from the bottom
      rotateX: -360, 
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        // Give it 400vh of scroll distance to make it feel smooth and readable
        end: "+=400%", 
        scrub: 1 // Add a 1-second smoothing effect to the scroll
      }
    });
  }, { scope: container });

  const radius = 720;
  // Calculate the exact angle between each card based on how many events there are
  const angleStep = 360 / events.length;

  return (
    // The container height needs to match the ScrollTrigger 'end' value to prevent early cutoff
    <div ref={container} className="h-[400vh] bg-background text-foreground">
      
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* 3D Perspective Wrapper */}
        <div style={{ perspective: "1400px" }}>
          
          {/* The Rotating Cylinder (Bead) */}
          <div
            ref={bead}
            className="relative w-[300px] md:w-[700px] h-[300px] md:h-[700px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {events.map((event, i) => {
              const angle = i * angleStep;

              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-full h-full will-change-transform"
                  style={{
                    // Position cards in a circle facing outwards
                    transform: `translate(-50%, -50%) rotateX(${angle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: "hidden" // Optional: hides the back of the cards as they spin away
                  }}
                >
                  {/* The Card Design */}
                  <div className="bg-card text-card-foreground shadow-2xl rounded-2xl p-6 md:p-8 w-[80vw] md:w-[55vw] max-w-[700px] mx-auto border border-border/50">
                    <img
                      src={event.img}
                      alt={event.title}
                      className="w-full h-[30vh] md:h-[45vh] object-cover rounded-xl mb-4"
                    />
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary">
                      {event.title}
                    </h3>
                    <p className="text-sm md:text-base font-sans tracking-[0.2em] uppercase text-muted-foreground mt-2">
                      {event.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </div>
  );
}