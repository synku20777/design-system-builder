import type { RadiusMode } from './radius'
import type { ShadowIntensity } from './shadow'
import type { SpacingMode } from './spacing'
import type { MotionMode } from './motion'

export interface ThemeState {
  brandColor: string
  secondaryColor: string
  baseColor: string
  radiusMode: RadiusMode
  shadowMode: ShadowIntensity
  spacingMode: SpacingMode
  motionMode: MotionMode
  roundIconButtons: boolean
  cardBordersEnabled: boolean
  headingFont: string
  bodyFont: string
  colorMode: 'light' | 'dark'
}

export const DEFAULT_THEME: ThemeState = {
  brandColor: '#6366f1',
  secondaryColor: '#ec4899',
  baseColor: '#71717a',
  radiusMode: 'default',
  shadowMode: 'default',
  spacingMode: 'default',
  motionMode: 'default',
  roundIconButtons: true,
  cardBordersEnabled: true,
  headingFont: 'Inter',
  bodyFont: 'Inter',
  colorMode: 'light',
}

export interface Preset {
  name: string
  theme: Partial<Omit<ThemeState, 'colorMode'>>
}

export const PRESETS: Preset[] = [
  {
    name: 'Luxury',
    theme: {
      brandColor: '#a16207',
      secondaryColor: '#78716c',
      baseColor: '#44403c',
      radiusMode: 'subtle',
      headingFont: 'Playfair Display',
      bodyFont: 'Lato',
    },
  },
  {
    name: 'Fresh',
    theme: {
      brandColor: '#059669',
      secondaryColor: '#0891b2',
      baseColor: '#64748b',
      radiusMode: 'rounded',
      headingFont: 'Poppins',
      bodyFont: 'Open Sans',
    },
  },
  {
    name: 'Bold',
    theme: {
      brandColor: '#dc2626',
      secondaryColor: '#ea580c',
      baseColor: '#374151',
      radiusMode: 'sharp',
      headingFont: 'Montserrat',
      bodyFont: 'Inter',
    },
  },
  {
    name: 'Minimal',
    theme: {
      brandColor: '#18181b',
      secondaryColor: '#52525b',
      baseColor: '#71717a',
      radiusMode: 'subtle',
      headingFont: 'DM Sans',
      bodyFont: 'DM Sans',
    },
  },
  {
    name: 'Tech',
    theme: {
      brandColor: '#2563eb',
      secondaryColor: '#7c3aed',
      baseColor: '#334155',
      radiusMode: 'default',
      headingFont: 'Space Grotesk',
      bodyFont: 'Inter',
    },
  },
  {
    name: 'Warm',
    theme: {
      brandColor: '#d97706',
      secondaryColor: '#b45309',
      baseColor: '#78716c',
      radiusMode: 'pill',
      headingFont: 'Bricolage Grotesque',
      bodyFont: 'Nunito',
    },
  },
]
