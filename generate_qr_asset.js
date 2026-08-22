const fs = require('fs');
const path = require('path');

// 1. Create a clean, elegant QR placeholder PNG if none exists
// Using a 1x1 or simple PNG buffer for crisp loading
const samplePngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAIAAAAx/MmFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACOSURBVHhe7dAxAcAwDMCw5J+6WfC4M0gw0K77vvc5z2f9n6kLREAiApGIQEQgEpGIQEQgEpGIQEQgEpGIQEQgEpGIQEQgEpGIQEQgEpGIQEQgEpGIQEQgEpGIQEQgEpGIQEQgEpGIQEQgEpGIQEQgEpGIQEQgEpGIQEQgEpGIQEQgEpGIQEQgEpGIQEQgEpG4ATpEAkf/vF71AAAAAElFTkSuQmCC";

const buffer = Buffer.from(samplePngBase64, 'base64');
const target1 = path.join(__dirname, 'gatzdevs-cinematic', 'assets', 'gcash_qr.png');
const target2 = path.join(__dirname, 'GatzDevPortfolio', 'assets', 'gcash_qr.png');

fs.mkdirSync(path.dirname(target1), { recursive: true });
fs.writeFileSync(target1, buffer);

fs.mkdirSync(path.dirname(target2), { recursive: true });
fs.writeFileSync(target2, buffer);

console.log('✅ assets/gcash_qr.png generated and placed in all folders!');
