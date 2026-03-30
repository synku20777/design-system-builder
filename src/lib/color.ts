import { converter, formatCss, parse } from 'culori'

const toOklch = converter('oklch')

export interface OklchColor {
  l: number
  c: number
  h: number
}

export type ColorScale = Record<string, string>

// Lightness curve for steps 50→950
const LIGHTNESS_CURVE = [0.975, 0.940, 0.880, 0.790, 0.680, 0.570, 0.460, 0.370, 0.270, 0.180, 0.110]
const STEP_NAMES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

// Chroma scale factor by step index (0=50, 5=500, 10=950)
const CHROMA_FACTORS = [0.10, 0.20, 0.40, 0.65, 0.85, 1.00, 1.00, 0.90, 0.75, 0.55, 0.35]

export function hexToOklch(hex: string): OklchColor {
  const parsed = parse(hex)
  if (!parsed) return { l: 0.5, c: 0.1, h: 0 }
  const oklch = toOklch(parsed)
  return {
    l: oklch?.l ?? 0.5,
    c: oklch?.c ?? 0.1,
    h: oklch?.h ?? 0,
  }
}

export function generateScale(seedHex: string, isNeutral = false): ColorScale {
  const seed = hexToOklch(seedHex)
  const maxChroma = isNeutral ? Math.min(seed.c, 0.04) : seed.c
  const scale: ColorScale = {}

  STEP_NAMES.forEach((name, i) => {
    const l = LIGHTNESS_CURVE[i]!
    const c = maxChroma * CHROMA_FACTORS[i]!
    const h = seed.h
    const css = formatCss({ mode: 'oklch', l, c, h })
    scale[name] = css
  })

  return scale
}

export interface SemanticTokens {
  light: Record<string, string>
  dark: Record<string, string>
}

export function getSemanticTokens(
  brandScale: ColorScale,
  secondaryScale: ColorScale,
  baseScale: ColorScale,
  brandHue: number,
): SemanticTokens {
  const light: Record<string, string> = {
    '--color-primary': brandScale['600']!,
    '--color-primary-hover': brandScale['700']!,
    '--color-primary-fg': 'oklch(1 0 0)',

    '--color-secondary': secondaryScale['100']!,
    '--color-secondary-fg': secondaryScale['800']!,
    '--color-secondary-hover': secondaryScale['200']!,

    '--color-background': baseScale['50']!,
    '--color-surface-sunken': baseScale['100']!,
    '--color-surface': 'oklch(1 0 0)',
    '--color-surface-raised': 'oklch(1 0 0)',

    '--color-border': baseScale['200']!,
    '--color-fg': baseScale['900']!,
    '--color-muted-fg': baseScale['500']!,

    '--color-rating': brandScale['400']!,

    '--placeholder-bg': `linear-gradient(135deg, ${baseScale['100']} 0%, ${baseScale['200']} 100%)`,
    '--overlay-bg': `oklch(0.1 0.02 ${brandHue.toFixed(1)} / 0.45)`,

    '--ring-color': brandScale['500']!,
    '--ring-offset': baseScale['50']!,
  }

  const dark: Record<string, string> = {
    '--color-primary': brandScale['400']!,
    '--color-primary-hover': brandScale['300']!,
    '--color-primary-fg': 'oklch(0.1 0 0)',

    '--color-secondary': secondaryScale['800']!,
    '--color-secondary-fg': secondaryScale['100']!,
    '--color-secondary-hover': secondaryScale['700']!,

    '--color-background': baseScale['950']!,
    '--color-surface-sunken': baseScale['950']!,
    '--color-surface': baseScale['900']!,
    '--color-surface-raised': baseScale['800']!,

    '--color-border': baseScale['800']!,
    '--color-fg': baseScale['50']!,
    '--color-muted-fg': baseScale['400']!,

    '--color-rating': brandScale['400']!,

    '--placeholder-bg': `linear-gradient(135deg, ${baseScale['800']} 0%, ${baseScale['900']} 100%)`,
    '--overlay-bg': `oklch(0.05 0.02 ${brandHue.toFixed(1)} / 0.60)`,

    '--ring-color': brandScale['400']!,
    '--ring-offset': baseScale['950']!,
  }

  return { light, dark }
}
