import { useNavigate } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

// ─── Data ────────────────────────────────────────────────────────────────────

interface OffStageEvent {
  index: string;
  title: string;
  description: string;
  tag: string;
  image: string;
  link: string; // ✅ added
}

const OFF_STAGE_EVENTS: OffStageEvent[] = [
  {
    index: "01",
    title: "Non - Fire Cooking",
    description:
      "Ditch the stove and let your creativity take over in this ultimate test of culinary innovation. Participants will craft mouth-watering dishes using only raw ingredients, showcasing their plating skills and unique flavor combinations.",
    tag: "Raw & Relish — Unleash your inner chef, unplugged.",
    image: "https://i.postimg.cc/KvY1sP9j/Whats-App-Image-2026-04-07-at-9-08-56-PM.jpg",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSct-9KpKO9I4u7fg8M1zaPrrhp03ISQzkoSKlCffdG30gAVwg/viewform",
  },
  {
    index: "02",
    title: "Cosplay Competition",
    description:
      "Transform into your most beloved fictional characters from anime, movies, comic books or video games. Showcase your costume craftsmanship and embody your favorite persona.",
    tag: "Fandom Forge — Bring your favorite worlds to life.",
    image: "https://i.postimg.cc/RCw0sP1k/Whats-App-Image-2026-04-07-at-9-08-56-PM-(2).jpg",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSdrleO-EM1gtdcCoYdgNrOyK3d3SPihvtWPY2iB8xl9HUNnSw/viewform",
  },
  {
    index: "03",
    title: "Best Out of Waste",
    description:
      "Turn discarded items into stunning art or useful products. Prove that creativity can transform waste into something extraordinary.",
    tag: "Scrap Sculptors — Crafting magic from the discarded.",
    image: "https://i.postimg.cc/pVcjvc5C/Whats-App-Image-2026-04-07-at-9-08-56-PM-(1).jpg",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSdeB8RElogRyYkE6tndu5riCyWAgaqc7tqK2cFzp3vct6wFaA/viewform",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

const EventOverview = () => {
  const navigate = useNavigate();

  return (
    <section
      id="off-stage-events"
      className="relative py-12 px-4 md:py-24 md:px-6 lg:px-20 bg-background overflow-hidden"
    >
      {/* Background Effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 w-[55vw] h-[55vh] opacity-[0.07]"
        style={{
          background:
            "radial-gradient(ellipse at top right, hsl(var(--primary)) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 bottom-0 w-[40vw] h-[40vh] opacity-[0.05]"
        style={{
          background:
            "radial-gradient(ellipse at bottom left, hsl(var(--gold)) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-16">
          <ScrollReveal>
            <span className="text-[10px] font-sans uppercase tracking-[0.6em] text-primary">
              Beyond the Main Stage
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="mt-2 md:mt-4 text-[11vw] md:text-[5.5vw] font-serif font-black leading-[0.88] tracking-[-0.03em] text-foreground">
              Off&#8209;Stage{" "}
              <span className="italic text-primary">Events</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <p className="mt-3 md:mt-6 max-w-2xl text-base md:text-lg font-sans text-muted-foreground leading-relaxed">
              The magic of Utopia 2K26 stretches far beyond the spotlight.
              Competitions, workshops, and cultural showcases built for every
              kind of creator — come participate, not just watch.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.22}>
            <div className="mt-6 md:mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-border max-w-[80px]" />
              <span className="text-primary text-xs tracking-[0.5em] font-sans uppercase select-none">
                ◈
              </span>
              <div className="h-px w-12 bg-border" />
            </div>
          </ScrollReveal>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {OFF_STAGE_EVENTS.map((event, i) => (
            <ScrollReveal key={event.index} delay={i * 0.07}>
              <div
                className={[
                  "group relative flex flex-col h-full",
                  "bg-card border border-border",
                  "rounded-sm overflow-hidden cursor-default",
                  "transition-all duration-500 ease-out",
                  "hover:-translate-y-2",
                  "hover:border-primary/40",
                  "hover:shadow-[0_16px_48px_-8px_hsl(var(--primary)/0.18),0_4px_16px_-4px_hsl(var(--primary)/0.10)]",
                ].join(" ")}
              >
                {/* Image */}
                <div className="w-full h-88 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-7 md:p-8 flex flex-col flex-1">
                  <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.45em] text-gold mb-6 group-hover:text-primary">
                    {event.index}
                  </span>

                  {/* <span className="inline-block self-start mb-4 px-3 py-1 rounded-full border border-border text-[9px] font-sans uppercase tracking-[0.35em] text-muted-foreground bg-muted group-hover:border-primary/30 group-hover:text-primary/80">
                    {event.tag}
                  </span> */}

                  <h3 className="font-serif text-xl md:text-2xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground mb-4 group-hover:text-primary">
                    {event.title}
                  </h3>

                  <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">
                    {event.description}
                  </p>

                  {/* ✅ Register Button */}
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-primary text-primary-foreground rounded-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Register →
                  </a>
                </div>

                {/* Bottom Hover Line */}
                <div className="absolute bottom-0 left-0 h-[2.5px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.32}>
          <div className="mt-10 md:mt-16 flex justify-center"></div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default EventOverview;