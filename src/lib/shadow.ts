export type ShadowMode = 'light' | 'dark'

/** User-facing shadow intensity preset */
export type ShadowIntensity = 'flat' | 'subtle' | 'default' | 'dramatic'

/** Opacity multiplier for each preset */
export const SHADOW_MULTIPLIERS: Record<ShadowIntensity, number> = {
  flat:     0,
  subtle:   0.5,
  default:  1.0,
  dramatic: 1.75,
}

export interface ShadowTokens {
  '--shadow-xs': string
  '--shadow-sm': string
  '--shadow-md': string
  '--shadow-lg': string
  '--shadow-xl': string
}

/**
 * Build a single shadow color stop.
 * Near-black base (l=0.2), very low chroma (0.05), brand hue — keeps
 * shadows subtle and on-brand rather than flat gray.
 * `factor` combines the color-mode halving and the user's intensity choice.
 */
function sc(hue: number, opacity: number, factor: number): string {
  const final = parseFloat((opacity * factor).toFixed(3))
  return `oklch(0.2 0.05 ${hue.toFixed(1)} / ${final})`
}

/**
 * Generate the five shadow tokens.
 *
 * Combined factor = shadowMultiplier × (dark ? 0.5 : 1)
 *   - colorMode dark halves opacity so shadows stay subtle on dark surfaces
 *   - shadowMultiplier scales the whole system per the user's intensity preset
 *
 * Pure function: same inputs always produce the same output.
 *
 * Token geometry:
 *   xs  – 1px depth  (input focus shadow, micro-elevation)
 *   sm  – 3px depth  (card at rest, default surface)
 *   md  – 6px depth  (hovered card, dropdown, elevated panel)
 *   lg  – 15px depth (drawer, popover, large floating element)
 *   xl  – 25px depth (modal, strongest elevation)
 */
export function generateShadowTokens(
  brandHue: number,
  mode: ShadowMode,
  shadowMultiplier: number = SHADOW_MULTIPLIERS.default,
): ShadowTokens {
  const f = shadowMultiplier * (mode === 'dark' ? 0.5 : 1)

  return {
    '--shadow-xs': `0 1px 2px ${sc(brandHue, 0.06, f)}`,
    '--shadow-sm': `0 1px 3px ${sc(brandHue, 0.08, f)}, 0 1px 2px ${sc(brandHue, 0.05, f)}`,
    '--shadow-md': `0 4px 6px ${sc(brandHue, 0.08, f)}, 0 2px 4px ${sc(brandHue, 0.05, f)}`,
    '--shadow-lg': `0 10px 15px ${sc(brandHue, 0.10, f)}, 0 4px 6px ${sc(brandHue, 0.05, f)}`,
    '--shadow-xl': `0 20px 25px ${sc(brandHue, 0.10, f)}, 0 8px 10px ${sc(brandHue, 0.04, f)}`,
  }
}
