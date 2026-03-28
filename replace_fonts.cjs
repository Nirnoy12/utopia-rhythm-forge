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

  // Convert font-serif to font-sans
  content = content.replace(/font-serif/g, 'font-sans');

  // Remove other text size classes like text-xs, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl, text-6xl, text-7xl, text-8xl, text-[...] 
  // Wait, we should only replace things that match text sizes, not text colors like text-white, text-[#...], text-center
  const textSizes = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl'];
  
  // also md:text-xs, lg:text-3xl etc.
  textSizes.forEach(size => {
    // replace size, with or without breakpoint prefix
    const regex = new RegExp(`\\b(sm:|md:|lg:|xl:|2xl:)?${size}\\b`, 'g');
    content = content.replace(regex, '');
  });

  // Also catch arbitrary text sizes text-[val]
  content = content.replace(/\b(sm:|md:|lg:|xl:|2xl:)?text-\[[^\]]+\]\b/g, (match) => {
    if (match.includes('vw') || match.match(/\d+(px|rem|em)/)) {
        return '';
    }
    return match; // keep colors
  });

  // Add `text-sm md:text-base font-sans` to className strings
  // Actually, wait, applying text-sm md:text-base to every single element is redundant.
  // We can just add it to the outermost div of each page and let it inherit.
  
  // Clean up Double spaces in classNames
  content = content.replace(/className="[^"]+"/g, (match) => {
     return match.replace(/\s+/g, ' ');
  });

  // Remove inline fontSize and fontFamily
  content = content.replace(/fontSize:\s*['"][^'"]+['"]/g, '');
  content = content.replace(/fontFamily:\s*['"][^'"]+['"]/g, '');
  
  // Clean empty style objects or trailing commas
  content = content.replace(/,\s*\}/g, '}');
  content = content.replace(/\{\s*,/g, '{');
  content = content.replace(/style=\{\{\s*\}\}/g, '');

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Process complete");
