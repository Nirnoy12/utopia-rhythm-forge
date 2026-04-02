import { useNavigate } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

// ─── Data ────────────────────────────────────────────────────────────────────

interface OffStageEvent {
  index: string;
  title: string;
  description: string;
  tag: string;
}

const OFF_STAGE_EVENTS: OffStageEvent[] = [
  {
    index: "01",
    title: "Non - Fire Cooking",
    description:
      "Ditch the heat and let your imagination take the lead! Join us for a unique culinary experience where we turn fresh, vibrant ingredients into stunning dishes using only assembly, seasoning, and style. It’s safe, simple, and proves that the most delicious masterpieces are served chilled.",
    tag: "Create magic without the flame",
  },
  {
    index: "02",
    title: "Cosplay Competition",
    description:
      "Bring your favorite characters to life and transform the campus into a world of fantasy! Whether you're a crafting pro or a first-time cosplayer, join us to showcase your best costumes, celebrate fandom, and compete for the ultimate title of Best in Show. It’s time to suit up and let your alter ego lead the way!",
    tag: "Become the character you love.",
  },
  {
    index: "03",
    title: "Art from the West",
    description:
      "Turn everyday trash into extraordinary treasure at our Art from Waste challenge! Unleash your creativity to transform discarded items into eco-friendly masterpieces, proving that sustainability and high art go hand-in-hand. Join us to redefine junk and showcase your vision for a greener, more imaginative world.",
    tag: "Turn waste into wonder.",
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

        {/* Cards Grid (FIXED HERE ✅) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {OFF_STAGE_EVENTS.map((event, i) => (
            <ScrollReveal key={event.index} delay={i * 0.07}>
              <div
                className={[
                  "group relative flex flex-col h-full",
                  "bg-card border border-border",
                  "p-7 md:p-8",
                  "rounded-sm overflow-hidden cursor-default",
                  "transition-all duration-500 ease-out",
                  "hover:-translate-y-2",
                  "hover:border-primary/40",
                  "hover:shadow-[0_16px_48px_-8px_hsl(var(--primary)/0.18),0_4px_16px_-4px_hsl(var(--primary)/0.10)]",
                ].join(" ")}
              >
                <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.45em] text-gold mb-6 transition-colors duration-300 group-hover:text-primary">
                  {event.index}
                </span>

                <span className="inline-block self-start mb-4 px-3 py-1 rounded-full border border-border text-[9px] font-sans uppercase tracking-[0.35em] text-muted-foreground bg-muted transition-all duration-300 group-hover:border-primary/30 group-hover:text-primary/80">
                  {event.tag}
                </span>

                <h3 className="font-serif text-xl md:text-2xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground mb-4 transition-colors duration-300 group-hover:text-primary">
                  {event.title}
                </h3>

                <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">
                  {event.description}
                </p>

                <div className="absolute bottom-0 left-0 h-[2.5px] w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.32}>
          <div className="mt-10 md:mt-16 flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/event")}
              className="group relative inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-sans text-[11px] font-bold uppercase tracking-[0.25em] rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_hsl(var(--primary)/0.45)] hover:-translate-y-1"
            >
              <span className="absolute inset-0 bg-[hsl(var(--crimson))] translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
              <span className="relative z-10">View All Events</span>

              <svg
                className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default EventOverview;