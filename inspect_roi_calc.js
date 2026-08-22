const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

console.log('--- HTML STRUCTURE OF CALCULATOR ---');
console.log(html.substring(163800, 168000));

console.log('--- JS ENGINE OF CALCULATOR ---');
console.log(html.substring(270100, 273500));
