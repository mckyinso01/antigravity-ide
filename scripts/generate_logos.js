const fs = require('fs');
const path = require('path');

const logosDir = path.join(__dirname, '..', 'gatzdevs-cinematic', 'assets', 'logos');
if (!fs.existsSync(logosDir)) fs.mkdirSync(logosDir, { recursive: true });

// Variant 1: Quantum Hyper-Link Neural Infinity Ring
const svg1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00E5FF" stop-opacity="1" />
      <stop offset="50%" stop-color="#2563EB" stop-opacity="1" />
      <stop offset="100%" stop-color="#10B981" stop-opacity="1" />
    </linearGradient>
    <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="128" fill="#050811" />
  <rect width="504" height="504" x="4" y="4" rx="124" fill="none" stroke="#1E293B" stroke-width="4" />
  <g filter="url(#glow1)" transform="translate(256, 256) scale(1.1) translate(-256, -256)">
    <path d="M170 180 C110 180, 80 215, 80 256 C80 297, 110 332, 170 332 C230 332, 270 270, 342 180 C402 180, 432 215, 432 256 C432 297, 402 332, 342 332 C282 332, 242 270, 170 180 Z" 
          fill="none" stroke="url(#grad1)" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="256" cy="256" r="18" fill="#FFFFFF" />
    <circle cx="256" cy="256" r="30" fill="none" stroke="#00E5FF" stroke-width="4" opacity="0.8" />
    <circle cx="120" cy="256" r="14" fill="#00E5FF" />
    <circle cx="392" cy="256" r="14" fill="#10B981" />
  </g>
</svg>`;

// Variant 2: Monolithic Hex Prism AI Core
const svg2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="topGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>
    <linearGradient id="leftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1D4ED8" />
      <stop offset="100%" stop-color="#0B1C30" />
    </linearGradient>
    <linearGradient id="rightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <filter id="hexGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="14" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="128" fill="#050811" />
  <rect width="504" height="504" x="4" y="4" rx="124" fill="none" stroke="#1E293B" stroke-width="4" />
  <g filter="url(#hexGlow)">
    <polygon points="256,100 386,175 256,250 126,175" fill="url(#topGrad)" stroke="#00E5FF" stroke-width="4" />
    <polygon points="126,175 256,250 256,400 126,325" fill="url(#leftGrad)" stroke="#2563EB" stroke-width="4" />
    <polygon points="256,250 386,175 386,325 256,400" fill="url(#rightGrad)" stroke="#10B981" stroke-width="4" />
    <path d="M230 190 L230 310 L290 310" fill="none" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="290" cy="310" r="10" fill="#00E5FF" />
    <circle cx="230" cy="190" r="10" fill="#38BDF8" />
  </g>
</svg>`;

// Variant 3: Cyber Nexus Hex-Shield
const svg3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563EB" />
      <stop offset="50%" stop-color="#00E5FF" />
      <stop offset="100%" stop-color="#8B5CF6" />
    </linearGradient>
    <linearGradient id="innerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0B1C30" />
      <stop offset="100%" stop-color="#050811" />
    </linearGradient>
    <filter id="shieldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="14" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="128" fill="#050811" />
  <rect width="504" height="504" x="4" y="4" rx="124" fill="none" stroke="#1E293B" stroke-width="4" />
  <g filter="url(#shieldGlow)">
    <path d="M256 90 L380 145 L380 270 C380 345 256 410 256 410 C256 410 132 345 132 270 L132 145 Z" 
          fill="url(#innerGrad)" stroke="url(#shieldGrad)" stroke-width="16" stroke-linejoin="round" />
    <path d="M196 210 L256 165 L316 210 L316 280 L256 325 L196 280 Z" 
          fill="none" stroke="#00E5FF" stroke-width="7" opacity="0.8" />
    <circle cx="256" cy="165" r="9" fill="#00E5FF" />
    <circle cx="316" cy="210" r="9" fill="#2563EB" />
    <circle cx="316" cy="280" r="9" fill="#8B5CF6" />
    <circle cx="256" cy="325" r="9" fill="#10B981" />
    <circle cx="196" cy="280" r="9" fill="#00E5FF" />
    <circle cx="196" cy="210" r="9" fill="#38BDF8" />
    <circle cx="256" cy="245" r="22" fill="#00E5FF" opacity="0.3" />
    <circle cx="256" cy="245" r="14" fill="#FFFFFF" />
  </g>
</svg>`;

fs.writeFileSync(path.join(logosDir, 'linkable_logo_variant_1.svg'), svg1, 'utf8');
fs.writeFileSync(path.join(logosDir, 'linkable_logo_variant_2.svg'), svg2, 'utf8');
fs.writeFileSync(path.join(logosDir, 'linkable_logo_variant_3.svg'), svg3, 'utf8');

// Also save directly to gatzdevs-cinematic root for favicon
const rootDir = path.join(__dirname, '..', 'gatzdevs-cinematic');
fs.writeFileSync(path.join(rootDir, 'favicon.svg'), svg1, 'utf8');

console.log('Successfully generated 3 ultra-premium SVG logos and favicon.svg in ' + logosDir);
