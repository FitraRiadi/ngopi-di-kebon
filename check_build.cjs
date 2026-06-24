const fs = require('fs');
const dir = './dist/assets/';
const files = fs.readdirSync(dir).filter(f => f.startsWith('index-') && f.endsWith('.js'));
const c = fs.readFileSync(dir + files[0], 'utf8');

// Search more broadly for the variable assignments that look like URLs
// Look around the area near where these vars are used
const idx = c.indexOf('Object.values(Object.assign');
if (idx > -1) {
  const searchStart = Math.max(0, idx - 2000);
  const searchEnd = Math.min(c.length, idx + 100);
  console.log('=== BEFORE Object.values ===');
  console.log(c.slice(searchStart, idx));
  console.log('=== OBJECT.VALUES LINE ===');
  console.log(c.slice(idx, idx + 50));
}

// Find import statements or variable definitions  
// Vite puts them all at the top of the module's code  
// Look for backtick patterns with /assets/
const backtickMatch = c.match(/`\/assets\/[^`]+`/g);
if (backtickMatch) {
  console.log('\n=== ASSET URLS FOUND ===');
  backtickMatch.forEach((m, i) => {
    console.log(`${i}: ${m}`);
  });
}

// Try to find strings with /assets/ 
const quoteMatch = c.match(/["']\/assets\/[^"']+["']/g); 
if (quoteMatch) {
  console.log('\n=== QUOTED ASSET URLS ===');
  quoteMatch.forEach((m, i) => {
    console.log(`${i}: ${m}`);
  });
}
