import React, { useEffect, useRef, useState } from 'react';

// --- Types ---
interface FestivalEvent {
  time: string;
  title: string;
  sub: string;
  desc: string;
  col: string;
}

interface Vibration {
  amp: number;
  phase: number;
}

const DAY1_EVENTS: FestivalEvent[] = [
  { time: "02:00 PM - 02:10 PM", title: "Ganesh Vandana and Lighting of Lamp", sub: "", desc: "", col: "#E8872A" },
  { time: "02:10 PM - 02:15 PM", title: "Welcoming Dignitaries onto the Dias", sub: "", desc: "", col: "#9B6ED4" },
  { time: "02:15 PM - 02:20 PM", title: "Welcome Address", sub: "Mr. Kishan Kumar Kejriwal, Chairman MCKV Group", desc: "", col: "#3BAA7C" },
  { time: "02:20 PM - 02:25 PM", title: "Felicitation of Delegates", sub: "", desc: "", col: "#D44848" },
  { time: "02:25 PM - 02:30 PM", title: "Address", sub: "Prof. (Dr.) Partha Sarathi Chakraborthy, CEO MCKV Group", desc: "", col: "#D4AC1E" },
  { time: "02:30 PM - 02:35 PM", title: "Address", sub: "Prof. (Dr.) Abhijit Lahiri, Principal MCKVIE", desc: "", col: "#E8872A" },
  { time: "02:35 PM - 02:45 PM", title: "Chief Guest Address", sub: "Mr. Keshab Ranjan Banerjee (Childhood coach of M.S. Dhoni)", desc: "", col: "#9B6ED4" },
  { time: "02:45 PM - 02:50 PM", title: "Felicitation", sub: "Nurse for best service to society", desc: "", col: "#3BAA7C" },
  { time: "02:50 PM - 02:55 PM", title: "Launching of UTOPIA-2k26 T-Shirt", sub: "", desc: "", col: "#D44848" },
  { time: "02:55 PM - 03:00 PM", title: "Vote of Thanks", sub: "Mr. Surojit Bhattacharyya, Chairman UTOPIA-2k26", desc: "", col: "#D4AC1E" },
  { time: "03:00 PM - 03:05 PM", title: "Flute Performance", sub: "", desc: "", col: "#E8872A" },
  { time: "03:05 PM - 04:30 PM", title: "Singing Performances", sub: "Students (under OCTET)", desc: "", col: "#9B6ED4" },
  { time: "04:30 PM - 06:20 PM", title: "Dance Performances", sub: "", desc: "", col: "#3BAA7C" },
  { time: "06:20 PM - 06:30 PM", title: "Magic Show", sub: "", desc: "", col: "#D44848" },
  { time: "07:00 PM - 08:30 PM", title: "Guest Band Performance", sub: "M-Sonic", desc: "", col: "#D4AC1E" },
];

const DAY2_EVENTS: FestivalEvent[] = [
  { time: "02:30 PM - 04:00 PM", title: "Band Performances", sub: "MCKVIE Students", desc: "", col: "#E8872A" },
  { time: "04:00 PM - 05:00 PM", title: "Dance Performances", sub: "", desc: "", col: "#9B6ED4" },
  { time: "05:00 PM - 05:45 PM", title: "Fashion Show", sub: "Fashion Runway and Performance", desc: "", col: "#3BAA7C" },
  { time: "05:45 PM - 06:15 PM", title: "Performance", sub: "UTOPIA-2k26 Student Committee Members", desc: "", col: "#D44848" },
  { time: "06:15 PM - 06:30 PM", title: "Group Photo Session", sub: "UTOPIA-2k26 Committee Members", desc: "", col: "#D4AC1E" },
  { time: "07:00 PM - 09:00 PM", title: "Guest Singing Performance", sub: "Somlata", desc: "", col: "#E8872A" },
  { time: "09:00 PM - 09:15 PM", title: "DJ Performance", sub: "The Access", desc: "", col: "#9B6ED4" },
];

const SXS = [72, 78, 84, 90, 96];
const NY = 65;
const BY = 475;

const UtopiaFestival: React.FC = () => {
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [lastSpeed] = useState<number>(0.5);

  const touchedStrings = useRef<Set<number>>(new Set());
  const lastPluckTimes = useRef<{ [key: number]: number }>({});
  const vibState = useRef<{ [key: number]: Vibration }>({});
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);
  const hasRevealed = useRef<boolean>(false);

  const audio1Ref = useRef<HTMLAudioElement | null>(null);
  const audio2Ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audio1Ref.current = new Audio('/sitar1.mp3');
    audio2Ref.current = new Audio('/sitar2.mp3');

    const unlockAudio = () => {
      if (audio1Ref.current) {
        audio1Ref.current.play().then(() => {
          audio1Ref.current!.pause();
          audio1Ref.current!.currentTime = 0;
        }).catch(() => { });
      }
      if (audio2Ref.current) {
        audio2Ref.current.play().then(() => {
          audio2Ref.current!.pause();
          audio2Ref.current!.currentTime = 0;
        }).catch(() => { });
      }
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };

    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);

    let rafId: number;
    const tick = () => {
      Object.keys(vibState.current).forEach((key) => {
        const i = parseInt(key);
        const v = vibState.current[i];
        const p = pathsRef.current[i];
        if (!p) return;
        v.phase += 0.4;
        v.amp *= 0.94;
        const x = SXS[i];
        if (v.amp < 0.1) {
          delete vibState.current[i];
          p.setAttribute('d', `M${x},${NY}L${x},${BY}`);
        } else {
          const mid = (NY + BY) / 2;
          const off = Math.sin(v.phase) * v.amp;
          p.setAttribute('d', `M${x},${NY}Q${x + off},${mid - 38} ${x + (Math.sin(v.phase * 1.2) * v.amp * 0.4)},${mid}Q${x - off * 0.45},${mid + 38} ${x},${BY}`);
        }
      });
      rafId = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(rafId);
  }, []);

  const pluck = (i: number) => {
    const now = performance.now();
    const lastTime = lastPluckTimes.current[i] || 0;
    if (now - lastTime > 80 && revealedCount < DAY1_EVENTS.length) {
      if (i === 0 && audio1Ref.current) {
        audio1Ref.current.currentTime = 0;
        audio1Ref.current.play().catch(e => console.warn("Audio play blocked", e));
      } else if (i === 4 && audio2Ref.current) {
        audio2Ref.current.currentTime = 0;
        audio2Ref.current.play().catch(e => console.warn("Audio play blocked", e));
      }
      lastPluckTimes.current[i] = now;
    }
    vibState.current[i] = { amp: 16, phase: Math.random() * 6 };
    touchedStrings.current.add(i);
    if (hasRevealed.current || revealedCount >= DAY1_EVENTS.length) return;
    triggerRevealAll();
  };

  const triggerRevealAll = () => {
    hasRevealed.current = true;
    DAY1_EVENTS.forEach((_, idx) => {
      setTimeout(() => {
        setRevealedCount(prev => prev + 1);
      }, idx * 250);
    });
    const totalRevealTime = (DAY1_EVENTS.length - 1) * 250;
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setIsExpanded(true), 800);
    }, totalRevealTime + 1200);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cormorant+Garamond:wght@300;600&display=swap');

        * { box-sizing: border-box; }

        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }

        .utopia-root {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: #f5efe6;
          color: #3b2a1f;
          font-family: sans-serif;
        }

        /* ---- Main 3-column layout ---- */
        #app-root {
          display: flex;
          flex: 1;
          height: 0; /* CRITICAL: forces children to respect flex sizing */
          min-height: 0;
          overflow: hidden;
          align-items: stretch;
        }

        /* ---- LEFT PANEL: Day 1 ---- */
        #day1-panel {
          flex: 1;
          min-width: 0;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 10vh 3vw 10vh 5vw;
          perspective: 1200px;
          scroll-behavior: smooth;
          position: relative;
          direction: rtl;
        }

        #day1-panel > * {
          direction: ltr;
        }

        #day1-panel::before {
          content: '';
          position: absolute;
          top: 10vh;
          bottom: 10vh;
          right: calc(3vw - 2px);
          width: 2px;
          background: rgba(182, 74, 43, 0.2);
          z-index: 0;
          opacity: 0;
          transition: opacity 1s 0.5s;
        }

        #day1-panel.show-timeline::before {
          opacity: 1;
        }

        /* ---- CENTER PANEL: Sitar ---- */
        #sitar-panel {
          width: 240px;
          flex-shrink: 0;
          background: #eaddcf;
          border-left: 1px solid rgba(59,42,31,0.1);
          border-right: 1px solid rgba(59,42,31,0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start; /* FIX: was 'center', caused clipping */
          padding-top: 24px;
          padding-bottom: 24px;
          overflow-y: auto; /* FIX: allow scroll if viewport is short */
          z-index: 100;
          transition: opacity 0.5s;
          min-height: 0;
        }

        /* ---- RIGHT PANEL: Day 2 ---- */
        #day2-panel {
          flex: 1;
          min-width: 0;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 10vh 5vw 10vh 3vw;
          perspective: 1200px;
          scroll-behavior: smooth;
          position: relative;
        }

        #day2-panel::before {
          content: '';
          position: absolute;
          top: 10vh;
          bottom: 10vh;
          left: calc(3vw - 2px);
          width: 2px;
          background: rgba(182, 74, 43, 0.2);
          z-index: 0;
          opacity: 0;
          transition: opacity 1s 0.5s;
        }

        #day2-panel.show-timeline::before {
          opacity: 1;
        }

        /* ---- Day Labels ---- */
        .day-label {
          font-family: sans-serif;
          font-size: 11px;
          letter-spacing: 0.4em;
          color: #b64a2b;
          margin-bottom: 24px;
          text-align: center;
          opacity: 0;
          transition: opacity 0.8s 0.3s;
        }
        .day-label.show {
          opacity: 1;
        }

        /* ---- Day 1 card: timeline dot on the RIGHT edge ---- */
        #day1-panel .ev-row {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 30px;
          opacity: 0;
          transform: translate3d(340px, 400px, -200px) rotateZ(-180deg) rotateX(45deg) scale(0.01);
          filter: blur(10px);
          transition:
            transform var(--speed) cubic-bezier(0.34, 1.56, 0.64, 1),
            opacity var(--speed) ease-in,
            filter var(--speed) ease-out;
        }

        #day1-panel .ev-row.visible {
          opacity: 1;
          filter: blur(0px);
          transform: translate3d(0, 0, 0) rotateZ(0deg) rotateX(0deg) scale(1);
        }

        #day1-panel .ev-card {
          position: relative;
          background: #ffffff;
          border-radius: 4px;
          border-right: 3px solid var(--c);
          border-left: none;
          padding: 16px;
          width: 300px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          transition: all 0.8s ease;
          z-index: 10;
          margin-right: 24px;
          text-align: right;
        }

        #day1-panel .ev-card::after {
          content: '';
          position: absolute;
          right: -28.5px;
          top: 24px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--c);
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
          z-index: 1;
        }

        /* ---- Day 2 card: timeline dot on the LEFT edge ---- */
        #day2-panel .ev-row {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 30px;
          opacity: 0;
          transform: translate3d(-340px, 400px, -200px) rotateZ(180deg) rotateX(45deg) scale(0.01);
          filter: blur(10px);
          transition:
            transform var(--speed) cubic-bezier(0.34, 1.56, 0.64, 1),
            opacity var(--speed) ease-in,
            filter var(--speed) ease-out;
        }

        #day2-panel .ev-row.visible {
          opacity: 1;
          filter: blur(0px);
          transform: translate3d(0, 0, 0) rotateZ(0deg) rotateX(0deg) scale(1);
        }

        #day2-panel .ev-card {
          position: relative;
          background: #ffffff;
          border-radius: 4px;
          border-left: 3px solid var(--c);
          padding: 16px;
          width: 300px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          transition: all 0.8s ease;
          z-index: 10;
          margin-left: 24px;
        }

        #day2-panel .ev-card::before {
          content: '';
          position: absolute;
          left: -28.5px;
          top: 24px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--c);
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
          z-index: 1;
        }

        /* Expanded states */
        #day1-panel .expanded-row .ev-card,
        #day2-panel .expanded-row .ev-card {
          width: 100%;
          max-width: 400px;
          background: #ffffff;
          padding: 30px;
          border-radius: 12px;
        }

        .card-desc { max-height: 0; opacity: 0; transition: 1s; overflow: hidden; }
        .expanded-row .card-desc { max-height: 300px; opacity: 1; margin-top: 20px; border-top: 1px solid rgba(59,42,31,0.1); padding-top: 20px; }

        .sitar-label { font-family: sans-serif; font-size: 9px; letter-spacing: 0.5em; color: #b64a2b; margin-bottom: 16px; flex-shrink: 0; }

        .progress-indicator { display: flex; gap: 6px; margin-top: 15px; flex-shrink: 0; }
        .dot { width: 5px; height: 5px; border-radius: 50%; background: #d0c0a8; transition: 0.2s; }
        .dot.on { background: #b64a2b; box-shadow: 0 0 8px #b64a2b; transform: scale(1.3); }

        @media (max-width: 768px) {
          html, body { overflow: auto; height: auto; }
          .utopia-root { height: auto; min-height: 100vh; overflow-y: auto; overflow-x: hidden; }
          #app-root { display: block; height: auto; overflow-y: auto; overflow-x: hidden; }
          #sitar-panel { display: none; }
          #day1-panel, #day2-panel {
            padding: 40px 20px 40px 40px;
            perspective: none;
            position: relative;
            overflow-x: hidden;
            overflow-y: visible;
            height: auto;
          }
          #day1-panel::before, #day2-panel::before {
            top: 40px;
            bottom: 40px;
            left: 20px;
            right: auto;
            opacity: 1;
            background: rgba(182, 74, 43, 0.4);
          }
          #day1-panel .ev-row,
          #day2-panel .ev-row {
            opacity: 1 !important;
            filter: blur(0) !important;
            transform: none !important;
            margin-bottom: 24px;
            display: flex;
            justify-content: flex-start !important;
          }
          #day1-panel .ev-card,
          #day2-panel .ev-card {
            width: calc(100% - 24px);
            max-width: 100%;
            background: #ffffff;
            padding: 24px;
            border-radius: 8px;
            border-left-width: 4px;
            border-right: none;
            text-align: left;
            margin-right: 0;
            margin-left: 24px;
          }
          #day1-panel .ev-card::after { display: none; }
          .card-desc {
            max-height: none !important;
            opacity: 1 !important;
            margin-top: 16px !important;
            padding-top: 16px !important;
            border-top: 1px solid rgba(59,42,31,0.1) !important;
            overflow: visible !important;
          }
        }
      `}</style>

      <div className="utopia-root">
        {/* Instruction Text — fixed overlay above sitar */}
        <div
          className={`fixed inset-x-0 top-20 flex flex-col items-center pointer-events-none transition-opacity duration-1000 z-[200] ${revealedCount > 0 ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="hidden md:block text-[#b64a2b] font-sans text-3xl md:text-5xl font-bold mb-3 drop-shadow-sm text-center">
            Play the Instrument
          </div>
          <div className="hidden md:flex mt-6 flex-col gap-2 opacity-50">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3b2a1f] animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-[#b64a2b] animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-[#3b2a1f] animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>

        <div id="app-root">

          {/* LEFT: Day 1 Timeline */}
          <div id="day1-panel" className={revealedCount > 0 ? 'show-timeline' : ''}>
            <div className={`day-label ${revealedCount > 0 ? 'show' : ''}`}>DAY 01 · APRIL 18</div>
            <div className="md:hidden text-[#b64a2b] font-sans text-4xl font-bold mb-8 text-center drop-shadow-sm">
              Day 1 Schedule
            </div>
            {DAY1_EVENTS.map((ev, i) => (
              <div
                key={i}
                className={`ev-row ${revealedCount > i ? 'visible' : ''} ${isExpanded ? 'expanded-row' : ''}`}
                style={{ '--c': ev.col, '--speed': `${lastSpeed}s` } as React.CSSProperties}
              >
                <div className="ev-card">
                  <div style={{ fontFamily: 'sans-serif', fontSize: '10px', color: ev.col, letterSpacing: '0.2em' }}>{ev.time}</div>
                  <div style={{ fontSize: '22px', margin: '5px 0' }}>{ev.title}</div>
                  <div style={{ fontSize: '14px', fontStyle: 'italic', opacity: 0.5 }}>{ev.sub}</div>
                  <div className="card-desc">{ev.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CENTER: Sitar */}
          <div id="sitar-panel">
            <div className="sitar-label">UTOPIA INSTRUMENT</div>
            <svg
              width="180"
              height="580"
              viewBox="0 0 180 580"
              style={{ flexShrink: 0 }}
            >
              <defs>
                <linearGradient id="wood-neck" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#cfb297" />
                  <stop offset="50%" stopColor="#eaddcf" />
                  <stop offset="100%" stopColor="#bfa186" />
                </linearGradient>
                <radialGradient id="wood-gourd" cx="30%" cy="30%" r="70%" fx="30%" fy="30%">
                  <stop offset="0%" stopColor="#eaddcf" />
                  <stop offset="60%" stopColor="#cfb297" />
                  <stop offset="100%" stopColor="#8c6a51" />
                </radialGradient>
              </defs>

              {/* Upper Gourd */}
              <circle cx="84" cy="90" r="30" fill="url(#wood-gourd)" stroke="#3b2a1f" strokeWidth="1" strokeOpacity="0.3" />

              {/* Neck */}
              <path d="M68,50 L100,50 L96,440 L72,440 Z" fill="url(#wood-neck)" stroke="#3b2a1f" strokeWidth="1" strokeOpacity="0.4" />

              {/* Frets */}
              {Array.from({ length: 18 }).map((_, i) => (
                <path key={`fret-${i}`} d={`M${69 + (i * 0.1)},${110 + i * 17} Q84,${114 + i * 17} ${99 - (i * 0.1)},${110 + i * 17}`} fill="none" stroke="#b64a2b" strokeWidth="1.5" opacity="0.6" />
              ))}

              {/* Tuning Pegs Left */}
              {Array.from({ length: 3 }).map((_, i) => (
                <g key={`peg-l-${i}`}>
                  <rect x="55" y={130 + i * 40} width="14" height="6" rx="3" fill="#8c6a51" />
                  <circle cx="53" cy={133 + i * 40} r="4" fill="#3b2a1f" />
                </g>
              ))}

              {/* Tuning Pegs Right */}
              {Array.from({ length: 4 }).map((_, i) => (
                <g key={`peg-r-${i}`}>
                  <rect x="98" y={110 + i * 40} width="14" height="6" rx="3" fill="#8c6a51" />
                  <circle cx="114" cy={113 + i * 40} r="4" fill="#3b2a1f" />
                </g>
              ))}

              {/* Main Gourd */}
              <path d="M24,475 C24,405 54,405 84,405 C114,405 144,405 144,475 C144,545 124,560 84,560 C44,560 24,545 24,475 Z" fill="url(#wood-gourd)" stroke="#3b2a1f" strokeWidth="1" strokeOpacity="0.3" />

              {/* Decorative Lines on Gourd */}
              <path d="M38,455 Q54,425 84,425 Q114,425 130,455" fill="none" stroke="#fff" strokeWidth="1" opacity="0.4" />
              <path d="M34,475 Q64,435 84,435 Q104,435 134,475" fill="none" stroke="#fff" strokeWidth="1" opacity="0.2" />

              {/* Bridge */}
              <path d="M68,460 L100,460 L106,490 L62,490 Z" fill="#d0c0a8" stroke="#3b2a1f" strokeWidth="1" strokeOpacity="0.4" />
              <path d="M64,490 Q84,495 104,490 L100,505 L68,505 Z" fill="#b64a2b" opacity="0.8" />

              {/* Strings */}
              {SXS.map((x, i) => (
                <React.Fragment key={i}>
                  <path
                    ref={el => { pathsRef.current[i] = el; }}
                    d={`M${x},${NY}L${x},${BY}`}
                    fill="none"
                    stroke="#b64a2b"
                    strokeWidth={i === 2 ? "1.4" : "0.7"}
                    opacity="0.9"
                  />
                  <rect
                    x={x - 12} y={NY}
                    width="24" height={BY - NY}
                    fill="transparent"
                    style={{ cursor: 'crosshair' }}
                    onMouseEnter={() => pluck(i)}
                    onMouseMove={() => pluck(i)}
                    onTouchStart={() => pluck(i)}
                  />
                </React.Fragment>
              ))}
            </svg>
            <div className="progress-indicator">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className={`dot ${touchedStrings.current.has(i) ? 'on' : ''}`} />
              ))}
            </div>
          </div>

          {/* RIGHT: Day 2 Timeline */}
          <div id="day2-panel" className={revealedCount > 0 ? 'show-timeline' : ''}>
            <div className={`day-label ${revealedCount > 0 ? 'show' : ''}`}>DAY 02 · APRIL 19</div>
            <div className="md:hidden text-[#b64a2b] font-sans text-4xl font-bold mb-8 text-center drop-shadow-sm">
              Day 2 Schedule
            </div>
            {DAY2_EVENTS.map((ev, i) => (
              <div
                key={i}
                className={`ev-row ${revealedCount > i ? 'visible' : ''} ${isExpanded ? 'expanded-row' : ''}`}
                style={{ '--c': ev.col, '--speed': `${lastSpeed}s` } as React.CSSProperties}
              >
                <div className="ev-card">
                  <div style={{ fontFamily: 'sans-serif', fontSize: '10px', color: ev.col, letterSpacing: '0.2em' }}>{ev.time}</div>
                  <div style={{ fontSize: '22px', margin: '5px 0' }}>{ev.title}</div>
                  <div style={{ fontSize: '14px', fontStyle: 'italic', opacity: 0.5 }}>{ev.sub}</div>
                  <div className="card-desc">{ev.desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default UtopiaFestival;