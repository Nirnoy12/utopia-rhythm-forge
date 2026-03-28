const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/Schedule.tsx',
  'src/pages/EventHub.tsx',
  'src/pages/Day1.tsx',
  'src/pages/Day2.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace font-serif with font-sans
  content = content.replace(/font-serif/g, 'font-sans');

  // For Schedule.tsx specifically, update inline font-families
  if (file.includes('Schedule.tsx')) {
    content = content.replace(/'Cormorant Garamond', serif/g, 'sans-serif');
    content = content.replace(/font-family: Cinzel;/g, 'font-family: sans-serif;');
    content = content.replace(/fontFamily: 'Cinzel'/g, "fontFamily: 'sans-serif'");
    
    // Add to root container
    content = content.replace(
      /<div className=\{`utopia-body \$\{!isExpanded \? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden'\}`\}>/,
      `<div className={\`utopia-body text-sm md:text-base font-sans \${!isExpanded ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden'}\`}>`
    );
  }

  // Add text-sm md:text-base font-sans to the root of the others
  if (file.includes('EventHub.tsx')) {
    content = content.replace(
      /className="min-h-screen w-full bg-\[#f5efe6\] flex flex-col items-center justify-center font-sans px-4 py-20 relative overflow-hidden"/,
      `className="min-h-screen w-full bg-[#f5efe6] flex flex-col items-center justify-center font-sans text-sm md:text-base px-4 py-20 relative overflow-hidden"`
    );
  }

  if (file.includes('Day1.tsx')) {
    content = content.replace(
      /className="relative bg-black text-white w-full overflow-hidden"/,
      `className="relative bg-black text-white w-full overflow-hidden text-sm md:text-base font-sans"`
    );
  }

  if (file.includes('Day2.tsx')) {
    content = content.replace(
      /className="relative bg-\[#1A1814\] w-full min-h-screen md:h-screen overflow-x-hidden md:overflow-hidden font-sans text-\[#2C2A25\]"/,
      `className="relative bg-[#1A1814] w-full min-h-screen md:h-screen overflow-x-hidden md:overflow-hidden font-sans text-[#2C2A25] text-sm md:text-base"`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Safely applied font-sans and base sizes");
