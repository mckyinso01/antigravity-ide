/**
 * DEMON SLAYER (KIMETSU NO YAIBA) COMPANY MASTER DESIGN TOKENS
 * Master Governance & Universal UI Component Tokens Engine
 * StitchMCP Master Asset ID: assets/1640102745724511064 (Demon Slayer Ukiyo-e Cyber Glass Design System)
 */

export const DEMON_SLAYER_THEMES = {
  zenitsu: {
    name: "⚡ Zenitsu Thunder Gold",
    domain: "Legal AI & High-Precision Control Rooms",
    primary: "#F9E006",
    accent: "#F59E0B",
    surface: "#050811",
    fontHeader: "Space Grotesk",
    fontData: "JetBrains Mono"
  },
  tanjiro: {
    name: "🌊 Tanjiro Midnight Blue",
    domain: "Enterprise POS (OmniStock) & Master Hub",
    primary: "#2563EB",
    accent: "#00E5FF",
    surface: "#050811",
    surfaceCard: "#0B1C30",
    fontHeader: "Inter",
    fontData: "JetBrains Mono",
    scrollbar: "SCROLL-CYBER-GLASS 8px frosted glass scrollbar scrollbar-thin scrollbar-thumb-cyan-500/40"
  },
  muichiro: {
    name: "🌫️ Muichiro Mist Cyan",
    domain: "DevOps, SRE Telemetry & Infrastructure",
    primary: "#00E5FF",
    accent: "#10B981",
    surface: "#080C14",
    fontHeader: "JetBrains Mono",
    fontData: "JetBrains Mono"
  },
  rengoku: {
    name: "🔥 Rengoku Flame Crimson",
    domain: "Media Renders & Automation Studios",
    primary: "#E11D48",
    accent: "#F59E0B",
    surface: "#0A0A0C",
    fontHeader: "Outfit",
    fontData: "JetBrains Mono"
  },
  shinobu: {
    name: "🦋 Shinobu Wisteria Violet",
    domain: "Security Vaults & Cryptographic Escrows",
    primary: "#C084FC",
    accent: "#8B5CF6",
    surface: "#090514",
    fontHeader: "Inter",
    fontData: "JetBrains Mono"
  }
};

export const DESIGN_TOKENS = {
  stitchAssetId: "assets/1640102745724511064",
  
  // Surface Colors (Dual-State: Base=Light, dark:=Dark)
  surfaces: {
    deep: 'bg-slate-50 dark:bg-[#050811]',          // Base Background
    card: 'bg-white/80 dark:bg-[#0B1C30]',          // Card Surface
    cardHover: 'hover:bg-slate-100 dark:hover:bg-[#0F243F]', // Card Hover
    glass: 'bg-white/70 dark:bg-[#0B1C30]/80 backdrop-blur-xl', // Frosted Glass
    modal: 'bg-white dark:bg-[#071322]',         // Modal / Drawer Body
    tableRow: 'bg-white dark:bg-[#071322]',      // Data Table Base Row
    tableRowHover: 'hover:bg-slate-50 dark:hover:bg-[#0E1E36]', // Table Row Hover
    input: 'bg-white dark:bg-[#071322]',         // Form Input Field
  },

  // Brand Accents & Demon Slayer Character Colors
  colors: {
    zenitsuYellow: '#F9E006',
    tanjiroBlue: '#2563EB',
    muichiroCyan: '#00E5FF',
    beastEmerald: '#10B981',
    rengokuCrimson: '#E11D48',
    rengokuAmber: '#F59E0B',
    shinobuViolet: '#C084FC',
  },

  // Buttons Component Tokens (Criteria-Based Hierarchy)
  buttons: {
    glowingAction: "moving-border-btn bg-[#2563EB] text-white font-bold tracking-wide rounded-lg px-5 py-2.5 shadow-lg dark:shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(0,229,255,0.7)]",
    primary: "bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold shadow-md dark:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300 rounded-lg px-4 py-2.5",
    secondary: "bg-white dark:bg-[#071322] border border-slate-200 dark:border-slate-700/80 hover:border-[#2563EB]/60 dark:hover:border-[#00E5FF]/60 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#0E1E36] transition-all duration-300 rounded-lg px-4 py-2.5",
    danger: "bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold shadow-md dark:shadow-[0_0_15px_rgba(225,29,72,0.4)] rounded-lg px-4 py-2.5",
    ghost: "text-slate-600 dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-[#071322] rounded-lg px-3 py-2 transition-colors",
  },

  // Icon Containers & Glassmorphic Icon Buttons (Frosted Glassmorphism Suite)
  icons: {
    cyberGlass: "w-10 h-10 rounded-xl flex items-center justify-center bg-white/80 dark:bg-[#0B1C30]/80 backdrop-blur-xl border border-blue-500/20 dark:border-cyan-500/30 text-blue-600 dark:text-cyan-400 shadow-sm dark:shadow-[0_0_12px_rgba(0,229,255,0.2)] transition-all duration-300 hover:border-blue-400 dark:hover:border-cyan-400 hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]",
    amberGlass: "w-10 h-10 rounded-xl flex items-center justify-center bg-white/80 dark:bg-[#0B1C30]/80 backdrop-blur-xl border border-amber-500/20 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 shadow-sm dark:shadow-[0_0_12px_rgba(245,158,11,0.2)] transition-all duration-300 hover:border-amber-400 dark:hover:border-amber-400 hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]",
    flameGlass: "w-10 h-10 rounded-xl flex items-center justify-center bg-white/80 dark:bg-[#0B1C30]/80 backdrop-blur-xl border border-rose-500/20 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 shadow-sm dark:shadow-[0_0_12px_rgba(225,29,72,0.2)] transition-all duration-300 hover:border-rose-400 dark:hover:border-rose-400 hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(225,29,72,0.4)]",
    emeraldGlass: "w-10 h-10 rounded-xl flex items-center justify-center bg-white/80 dark:bg-[#0B1C30]/80 backdrop-blur-xl border border-emerald-500/20 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-sm dark:shadow-[0_0_12px_rgba(16,185,129,0.2)] transition-all duration-300 hover:border-emerald-400 dark:hover:border-emerald-400 hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    iconButton: "w-9 h-9 rounded-xl flex items-center justify-center bg-white/80 dark:bg-[#071322]/80 backdrop-blur-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-300 hover:border-blue-500/40 dark:hover:border-cyan-500/50 hover:bg-slate-50 dark:hover:bg-[#0E1E36] transition-all duration-300 active:scale-95 shadow-sm",
  },

  // Forms Component Tokens
  forms: {
    input: "bg-white dark:bg-[#071322] border border-slate-300 dark:border-slate-800 focus:border-blue-500 dark:focus:border-[#00E5FF] focus:ring-1 focus:ring-blue-500 dark:focus:ring-[#00E5FF] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg px-3.5 py-2.5 text-sm transition-all outline-none",
    inputNumeric: "bg-white dark:bg-[#071322] border border-slate-300 dark:border-slate-800 focus:border-blue-500 dark:focus:border-[#00E5FF] focus:ring-1 focus:ring-blue-500 dark:focus:ring-[#00E5FF] text-blue-600 dark:text-[#00E5FF] placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg px-3.5 py-2.5 font-mono text-sm font-bold text-right outline-none",
    select: "bg-white dark:bg-[#071322] border border-slate-300 dark:border-slate-800 focus:border-blue-500 dark:focus:border-[#00E5FF] text-slate-800 dark:text-slate-100 rounded-lg px-3.5 py-2.5 font-mono text-sm outline-none cursor-pointer",
    label: "text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider mb-1.5 block",
    checkbox: "rounded border-slate-300 dark:border-slate-800 bg-white dark:bg-[#071322] text-blue-600 dark:text-[#00E5FF] focus:ring-blue-500 dark:focus:ring-[#00E5FF]",
  },

  // Card & Container Component Tokens (Strict 1.5px Uniform Border & Vignette Matrix)
  cards: {
    movingBorderCard: "moving-border-card bg-white dark:bg-[#0B1C30] rounded-2xl p-6 relative overflow-hidden shadow-xl dark:shadow-2xl border border-slate-200 dark:border-none",
    kpiCard: "water-breathing-card bg-white/80 dark:bg-[#0B1C30] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 transition-all duration-300 transform hover:-translate-y-0.5",
    glassCyber: "glass-fantasy-cyber bg-white/80 dark:bg-transparent rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-none",
    glassMystic: "glass-fantasy-mystic bg-white/80 dark:bg-transparent rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-none",
    glassFlame: "glass-fantasy-flame bg-white/80 dark:bg-transparent rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-none",
    waterBreathing: "water-breathing-card bg-white/80 dark:bg-transparent rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-none",
    flameBreathing: "flame-breathing-card bg-white/80 dark:bg-transparent rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-none",
  },

  // Data Table & Grid Component Tokens
  tables: {
    container: "w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0B1C30] shadow-sm",
    header: "bg-slate-50 dark:bg-[#050811] text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 px-4 py-3.5 text-left",
    row: "bg-white dark:bg-[#071322] border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-[#0E1E36] transition-colors duration-200",
    cellText: "text-sm text-slate-700 dark:text-slate-200 font-medium px-4 py-3",
    cellNumber: "text-sm text-blue-600 dark:text-cyan-300 font-mono font-bold px-4 py-3 text-right",
  },

  // Chart System Tokens (Recharts Palette)
  charts: {
    revenue: {
      id: 'cyanEmeraldGradient',
      stops: [
        { offset: '0%', color: '#00E5FF', opacity: 0.95 },
        { offset: '100%', color: '#10B981', opacity: 0.8 },
      ],
      stroke: '#00E5FF',
    },
    profit: {
      id: 'emeraldTealGradient',
      stops: [
        { offset: '0%', color: '#10B981', opacity: 0.95 },
        { offset: '100%', color: '#14B8A6', opacity: 0.8 },
      ],
      stroke: '#10B981',
    },
    expense: {
      id: 'amberRoseGradient',
      stops: [
        { offset: '0%', color: '#F59E0B', opacity: 0.95 },
        { offset: '100%', color: '#E11D48', opacity: 0.8 },
      ],
      stroke: '#E11D48',
    },
    forecast: {
      id: 'purpleMagentaGradient',
      stops: [
        { offset: '0%', color: '#C084FC', opacity: 0.95 },
        { offset: '100%', color: '#E11D48', opacity: 0.8 },
      ],
      stroke: '#C084FC',
    },
    tooltipStyle: {
      backgroundColor: '#071322',
      borderColor: '#334155',
      color: '#F8FAFC',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
    },
  },

  // Monochromatic Luminance Typography System (Stitch MCP & Council Approved)
  typography: {
    h1: "text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans",
    h2: "text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-wide font-sans",
    h3: "text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-100 uppercase tracking-wider font-mono",
    body: "text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 tracking-normal font-sans",
    muted: "text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 font-mono",
    currency: "text-sm sm:text-xl font-mono font-bold text-slate-800 dark:text-slate-100 tracking-tight",
    inputGuard: "text-base sm:text-sm", // 16px Base Font Size Guard against mobile browser zoom
  },

  // 4-Criterion Container Interactivity Decision Tree
  containerInteractivity: {
    interactiveTier1: "moving-border-card app-card-hover cursor-pointer transition-all active:scale-[0.98]",
    readOnlyTier2: "water-breathing-card cursor-default pointer-events-auto",
    hazardTier3: "water-breathing-card relative overflow-hidden border-amber-500/40",
  },

  // Currency & Numbers Helper
  formatCurrency: (val) => {
    const num = Number(val) || 0;
    return `₱${num.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
  },
};

export default DESIGN_TOKENS;
