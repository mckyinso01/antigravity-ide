/**
 * design/designSystem.ts
 * Authoritative Developer Export Module for Demon Slayer Cyber Glass Master Design Tokens v3.5.0
 * 
 * Usage Examples:
 *   import { tokens, cssVariables, variableMap } from './design/designSystem';
 *   
 *   // 1. Access JS/TS Token object directly:
 *   console.log(tokens.colors.surface.dark); // "#050811"
 *   
 *   // 2. Inject CSS variables into :root at app initialization:
 *   const cssStr = cssVariables();
 *   
 *   // 3. Look up CSS variable name for a token path:
 *   const varName = variableMap["colors.action.primary"]; // "--action-primary"
 */

import masterTokens from './tokens/master_tokens.json';

export interface DesignTokens {
  name: string;
  version: string;
  description: string;
  colors: {
    surface: Record<string, string>;
    action: Record<string, string>;
    text: Record<string, string>;
    border: Record<string, string>;
  };
  typography: {
    fontHeader: string;
    fontBody: string;
    fontMono: string;
    sizes: Record<string, string>;
  };
  borders: {
    width: Record<string, string>;
    radius: Record<string, string>;
  };
  shadows: Record<string, string>;
  buttons: Record<string, any>;
  motion: Record<string, any>;
}

export const tokens: DesignTokens = masterTokens as unknown as DesignTokens;

/**
 * Returns a string of CSS :root { --var: value; } mappings derived from master_tokens.json
 */
export function cssVariables(): string {
  const vars: string[] = [];

  // Colors - Surface
  if (tokens.colors?.surface) {
    vars.push(`  --surface-dark: ${tokens.colors.surface.dark};`);
    vars.push(`  --surface-card: ${tokens.colors.surface.card};`);
    vars.push(`  --surface-card-frosted: ${tokens.colors.surface.cardFrosted};`);
    vars.push(`  --surface-overlay: ${tokens.colors.surface.overlay};`);
  }

  // Colors - Action
  if (tokens.colors?.action) {
    vars.push(`  --action-primary: ${tokens.colors.action.primary};`);
    vars.push(`  --action-primary-hover: ${tokens.colors.action.primaryHover};`);
    vars.push(`  --action-cyan: ${tokens.colors.action.cyan};`);
    vars.push(`  --action-emerald: ${tokens.colors.action.emerald};`);
    vars.push(`  --action-amber: ${tokens.colors.action.amber};`);
    vars.push(`  --action-rose: ${tokens.colors.action.rose};`);
    vars.push(`  --action-violet: ${tokens.colors.action.violet};`);
  }

  // Colors - Text
  if (tokens.colors?.text) {
    vars.push(`  --text-crystal-white: ${tokens.colors.text.crystalWhite};`);
    vars.push(`  --text-ice-white: ${tokens.colors.text.iceWhite};`);
    vars.push(`  --text-slate-muted: ${tokens.colors.text.slateMuted};`);
    vars.push(`  --text-slate-dim: ${tokens.colors.text.slateDim};`);
  }

  // Colors - Border
  if (tokens.colors?.border) {
    vars.push(`  --border-subtle: ${tokens.colors.border.subtle};`);
    vars.push(`  --border-standard: ${tokens.colors.border.standard};`);
    vars.push(`  --border-highlight: ${tokens.colors.border.highlight};`);
    vars.push(`  --border-cyan-glow: ${tokens.colors.border.cyanGlow};`);
    vars.push(`  --border-amber-glow: ${tokens.colors.border.amberGlow};`);
  }

  // Typography
  if (tokens.typography) {
    vars.push(`  --font-header: ${tokens.typography.fontHeader};`);
    vars.push(`  --font-body: ${tokens.typography.fontBody};`);
    vars.push(`  --font-mono: ${tokens.typography.fontMono};`);
    if (tokens.typography.sizes) {
      Object.entries(tokens.typography.sizes).forEach(([key, val]) => {
        vars.push(`  --font-size-${key}: ${val};`);
      });
    }
  }

  // Borders
  if (tokens.borders) {
    if (tokens.borders.width) {
      Object.entries(tokens.borders.width).forEach(([key, val]) => {
        vars.push(`  --border-width-${key}: ${val};`);
      });
    }
    if (tokens.borders.radius) {
      Object.entries(tokens.borders.radius).forEach(([key, val]) => {
        vars.push(`  --border-radius-${key}: ${val};`);
      });
    }
  }

  // Shadows
  if (tokens.shadows) {
    vars.push(`  --shadow-glow-cyan: ${tokens.shadows.glowCyan};`);
    vars.push(`  --shadow-glow-blue: ${tokens.shadows.glowBlue};`);
    vars.push(`  --shadow-glow-amber: ${tokens.shadows.glowAmber};`);
    vars.push(`  --shadow-glow-rose: ${tokens.shadows.glowRose};`);
    vars.push(`  --shadow-card-elevation: ${tokens.shadows.cardElevation};`);
  }

  // Motion
  if (tokens.motion?.movingBorder) {
    vars.push(`  --motion-moving-border-duration: ${tokens.motion.movingBorder.duration};`);
    vars.push(`  --motion-moving-border-width: ${tokens.motion.movingBorder.borderWidth};`);
  }

  return `:root {\n${vars.join('\n')}\n}`;
}

/**
 * Convenience variableMap returning object mapping JSON path -> CSS variable name
 */
export const variableMap: Record<string, string> = {
  "colors.surface.dark": "--surface-dark",
  "colors.surface.card": "--surface-card",
  "colors.surface.cardFrosted": "--surface-card-frosted",
  "colors.surface.overlay": "--surface-overlay",
  "colors.action.primary": "--action-primary",
  "colors.action.primaryHover": "--action-primary-hover",
  "colors.action.cyan": "--action-cyan",
  "colors.action.emerald": "--action-emerald",
  "colors.action.amber": "--action-amber",
  "colors.action.rose": "--action-rose",
  "colors.action.violet": "--action-violet",
  "colors.text.crystalWhite": "--text-crystal-white",
  "colors.text.iceWhite": "--text-ice-white",
  "colors.text.slateMuted": "--text-slate-muted",
  "colors.text.slateDim": "--text-slate-dim",
  "colors.border.subtle": "--border-subtle",
  "colors.border.standard": "--border-standard",
  "colors.border.highlight": "--border-highlight",
  "colors.border.cyanGlow": "--border-cyan-glow",
  "colors.border.amberGlow": "--border-amber-glow",
  "typography.fontHeader": "--font-header",
  "typography.fontBody": "--font-body",
  "typography.fontMono": "--font-mono",
  "typography.sizes.xs": "--font-size-xs",
  "typography.sizes.sm": "--font-size-sm",
  "typography.sizes.base": "--font-size-base",
  "typography.sizes.lg": "--font-size-[#18px]",
  "borders.width.standard": "--border-width-standard",
  "borders.radius.2xl": "--border-radius-2xl",
  "shadows.glowCyan": "--shadow-glow-cyan",
  "motion.movingBorder.duration": "--motion-moving-border-duration"
};

/**
 * Optional helper: Write CSS string to disk (Invoked only if explicitly commanded)
 */
export function applyCssVariablesToFile(outputPath: string): void {
  const fs = require('fs');
  fs.writeFileSync(outputPath, cssVariables(), 'utf-8');
}

export default tokens;
