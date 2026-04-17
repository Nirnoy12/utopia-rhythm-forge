// import React, { useEffect, useState } from "react";

// const SHEETDB_API = "https://sheetdb.io/api/v1/ferqcc0q8yrad";

// const TEAM_CATEGORIES = [
//   { title: "Lead Organiser",   section: "Lead Organiser" },
//   { title: "Design & Website", section: "Design & Website" },
//   { title: "Organizers",       section: "Organizers" },
//   { title: "Volunteers",       section: "Volunteer" },
// ];

// interface Member {
//   Timestamp: string;
//   "Email Address": string;
//   Name: string;
//   Section: string;
//   "Class Roll Number": string;
//   Department: string;
//   Year: string;
//   "Designation ": string;
//   "Select your t-shirt size:": string;
//   "ASSIGNED WORK": string;
//   Image: string;
// }

// export default function Teams() {
//   const [members, setMembers] = useState<Member[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetch(SHEETDB_API)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch data");
//         return res.json();
//       })
//       .then((data: Member[]) => {
//         setMembers(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   const getMembersForSection = (section: string) =>
//     members.filter(
//       (m) => m.Section?.trim().toLowerCase() === section.trim().toLowerCase()
//     );

//   const getImageSrc = (member: Member): string | null => {
//     const raw = member["Image"]?.trim();
//     if (!raw) return null;

//     // Convert Google Drive share link → thumbnail URL (more reliable than uc?export=view)
//     if (raw.includes("drive.google.com")) {
//       const driveMatch = raw.match(/[-\w]{25,}/);
//       if (driveMatch) {
//         return `https://drive.google.com/thumbnail?id=${driveMatch[0]}&sz=w400`;
//       }
//     }

//     // Return as-is for direct image URLs
//     return raw;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center space-y-4">
//           <div className="w-10 h-10 border-4 border-[#ff6b35] border-t-transparent rounded-full animate-spin mx-auto" />
//           <p className="text-[#ff6b35] font-semibold uppercase tracking-widest text-sm">
//             Loading Team...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-red-500 font-semibold">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen text-[#0a0a0a] pt-32 pb-20 font-sans selection:bg-[#ff6b35] selection:text-white">

//       <div
//         className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
//         // style={{ backgroundImage: `url('/tmbg.avif')` }}
//       />
//       <div className="absolute inset-0 z-0 bg-white/55 backdrop-blur-[2px]" />

//       <div className="relative z-10">

//         {/* PAGE HEADER */}
//         <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center md:text-left">
//           <p className="text-[#ff6b35] text-xs font-bold uppercase tracking-[0.4em] mb-4">
//             Behind The Scenes
//           </p>
//           <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter uppercase">
//             The Architects <br />of UTOPIA 2K26
//           </h1>
//         </div>

//         {/* TEAM CATEGORIES */}
//         <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
//           {TEAM_CATEGORIES.map((category, categoryIndex) => {
//             const categoryMembers = getMembersForSection(category.section);
//             if (categoryMembers.length === 0) return null;

//             return (
//               <section key={categoryIndex} className="w-full">

//                 <div className="border-b border-black/10 pb-4 mb-8">
//                   <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-[#0a0a0a]">
//                     {category.title}
//                     <span className="ml-3 text-sm font-normal text-[#ff6b35] bg-[#ff6b35]/10 px-3 py-1 rounded-full">
//                       {categoryMembers.length}
//                     </span>
//                   </h2>
//                 </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4">
//                   {categoryMembers.map((member, memberIndex) => {
//                     const imgSrc = getImageSrc(member);
//                     const initials = member.Name?.split(" ")
//                       .map((n) => n[0])
//                       .join("")
//                       .slice(0, 2)
//                       .toUpperCase();

//                     return (
//                       <div
//                         key={memberIndex}
//                         className="team-card group relative aspect-[3/4] bg-white ring-1 ring-black/5 rounded-lg cursor-pointer transition-all duration-300 hover:z-50 will-change-transform"
//                       >
//                         <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom group-hover:scale-[1.4] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">

//                           {/* Initials fallback shown by default, hidden when image loads */}
//                           <div
//                             className="fallback-initials absolute inset-0 w-full h-full bg-[#ff6b35]/10 flex items-center justify-center"
//                           >
//                             <span className="text-2xl font-bold text-[#ff6b35]">
//                               {initials}
//                             </span>
//                           </div>

//                           {imgSrc && (
//                             <img
//                               src={imgSrc}
//                               alt={member.Name}
//                               className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:saturate-[1.25] group-hover:contrast-[1.1] opacity-0"
//                               loading="lazy"
//                               onLoad={(e) => {
//                                 // Show image once loaded
//                                 (e.currentTarget as HTMLImageElement).style.opacity = "1";
//                               }}
//                               onError={(e) => {
//                                 // Hide broken image, fallback (initials) stays visible
//                                 (e.currentTarget as HTMLImageElement).style.display = "none";
//                               }}
//                             />
//                           )}

//                           <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 to-transparent opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0" />
//                         </div>

//                         <div className="absolute bottom-0 left-0 w-full p-2 md:p-5 opacity-0 translate-y-4 transition-all duration-500 ease-out pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 z-10">
//                           <h3 className="text-sm md:text-base font-bold text-[#0a0a0a] leading-tight mb-1 line-clamp-2">
//                             {member.Name}
//                           </h3>
//                           <p className="text-[10px] md:text-xs text-[#ff6b35] font-semibold uppercase tracking-wider line-clamp-1">
//                             {member["Designation "]?.trim() || member.Section}
//                           </p>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </section>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";

const SHEETDB_API = "https://sheetdb.io/api/v1/hnigylrn68x6j";

const TEAM_CATEGORIES = [
  { title: "Lead Organiser",   section: "Lead Organiser" },
  { title: "Design & Website", section: "Design & Website" },
  { title: "Organisers",       section: "Organisers" },
  { title: "Volunteers",       section: "Volunteer" },
];

interface Member {
  Timestamp: string;
  "Email Address": string;
  Name: string;
  Section: string;
  "Class Roll Number": string;
  Department: string;
  Year: string;
  "Designation ": string;
  "Select your t-shirt size:": string;
  "ASSIGNED WORK": string;
  Image: string;
}

// ─── Module-level fetch promise ───────────────────────────────────────────────
// Kicks off the network request immediately when the module loads,
// before any React component mounts — shaves off one render cycle of latency.
const membersPromise: Promise<Member[]> = fetch(SHEETDB_API)
  .then((res) => {
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  })
  .catch(() => []);

export default function Teams() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    membersPromise
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getMembersForSection = (section: string) =>
    members.filter(
      (m) => m.Section?.trim().toLowerCase() === section.trim().toLowerCase()
    );

  const getImageSrc = (member: Member): string | null => {
    const raw = member["Image"]?.trim();
    if (!raw) return null;

    // Convert Google Drive share link → thumbnail URL
    // sz=w200 instead of w400 — ~4× smaller file, plenty for a small card
    if (raw.includes("drive.google.com")) {
      const driveMatch = raw.match(/[-\w]{25,}/);
      if (driveMatch) {
        return `https://drive.google.com/thumbnail?id=${driveMatch[0]}&sz=w800`;
      }
    }

    return raw;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#ff6b35] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[#ff6b35] font-semibold uppercase tracking-widest text-sm">
            Loading Team...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-[#0a0a0a] pt-32 pb-20 font-sans selection:bg-[#ff6b35] selection:text-white">

      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        // style={{ backgroundImage: `url('/tmbg.avif')` }}
      />
      <div className="absolute inset-0 z-0 bg-white/55 backdrop-blur-[2px]" />

      <div className="relative z-10">

        {/* PAGE HEADER */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center md:text-left">
          <p className="text-[#ff6b35] text-xs font-bold uppercase tracking-[0.4em] mb-4">
            Behind The Scenes
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter uppercase">
            The Architects <br />of UTOPIA 2K26
          </h1>
        </div>

        {/* TEAM CATEGORIES */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          {TEAM_CATEGORIES.map((category, categoryIndex) => {
            const categoryMembers = getMembersForSection(category.section);
            if (categoryMembers.length === 0) return null;

            return (
              <section key={categoryIndex} className="w-full">

                <div className="border-b border-black/10 pb-4 mb-8">
                  <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-[#0a0a0a]">
                    {category.title}
                    <span className="ml-3 text-sm font-normal text-[#ff6b35] bg-[#ff6b35]/10 px-3 py-1 rounded-full">
                      {categoryMembers.length}
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4">
                  {categoryMembers.map((member, memberIndex) => {
                    const imgSrc = getImageSrc(member);
                    const initials = member.Name?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();

                    // Cards in the first two rows load eagerly (above the fold),
                    // everything else is lazy-loaded as the user scrolls.
                    const isAboveFold = memberIndex < 16;

                    return (
                      <div
                        key={memberIndex}
                        className="team-card group relative aspect-[3/4] bg-white ring-1 ring-black/5 rounded-lg cursor-pointer transition-all duration-300 hover:z-50 will-change-transform"
                        // Prefetch the image on hover — by the time the scale
                        // animation finishes the image is already in cache.
                        onMouseEnter={() => {
                          if (imgSrc) {
                            const img = new Image();
                            img.src = imgSrc;
                          }
                        }}
                      >
                        <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom group-hover:scale-[1.4] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">

                          {/* Initials fallback — visible by default, hidden once image loads */}
                          <div className="fallback-initials absolute inset-0 w-full h-full bg-[#ff6b35]/10 flex items-center justify-center">
                            <span className="text-2xl font-bold text-[#ff6b35]">
                              {initials}
                            </span>
                          </div>

                          {imgSrc && (
                            <img
                              src={imgSrc}
                              alt={member.Name}
                              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:saturate-[1.25] group-hover:contrast-[1.1] opacity-0"
                              // Eager for above-the-fold cards, lazy for the rest
                              loading={isAboveFold ? "eager" : "lazy"}
                              // Decode off the main thread — prevents jank
                              decoding="async"
                              onLoad={(e) => {
                                (e.currentTarget as HTMLImageElement).style.opacity = "1";
                              }}
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = "none";
                              }}
                            />
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 to-transparent opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0" />
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-2 md:p-5 opacity-0 translate-y-4 transition-all duration-500 ease-out pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 z-10">
                          <h3 className="text-sm md:text-base font-bold text-[#0a0a0a] leading-tight mb-1 line-clamp-2">
                            {member.Name}
                          </h3>
                          <p className="text-[10px] md:text-xs text-[#ff6b35] font-semibold uppercase tracking-wider line-clamp-1">
                            {member["Designation "]?.trim() || member.Section}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

      </div>
    </div>
  );
}