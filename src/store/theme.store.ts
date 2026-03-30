import { create } from 'zustand'
import type { RadiusMode } from '../lib/radius'
import type { ShadowIntensity } from '../lib/shadow'
import type { SpacingMode } from '../lib/spacing'
import type { MotionMode } from '../lib/motion'
import { DEFAULT_THEME, type ThemeState } from '../lib/defaults'

interface ThemeStore extends ThemeState {
  setBrandColor: (hex: string) => void
  setSecondaryColor: (hex: string) => void
  setBaseColor: (hex: string) => void
  setRadiusMode: (mode: RadiusMode) => void
  setShadowMode: (mode: ShadowIntensity) => void
  setSpacingMode: (mode: SpacingMode) => void
  setMotionMode: (mode: MotionMode) => void
  setRoundIconButtons: (enabled: boolean) => void
  setCardBordersEnabled: (enabled: boolean) => void
  setHeadingFont: (font: string) => void
  setBodyFont: (font: string) => void
  setColorMode: (mode: 'light' | 'dark') => void
  applyPreset: (theme: Partial<Omit<ThemeState, 'colorMode'>>) => void
  randomize: () => void
  reset: () => void
}

function randomHex(): string {
  const hue = Math.floor(Math.random() * 360)
  // Convert a hue to an approximate hex using a simple approach
  const h = hue / 60
  const c = 0.7
  const x = c * (1 - Math.abs((h % 2) - 1))
  let r = 0, g = 0, b = 0
  if (h < 1) { r = c; g = x }
  else if (h < 2) { r = x; g = c }
  else if (h < 3) { g = c; b = x }
  else if (h < 4) { g = x; b = c }
  else if (h < 5) { r = x; b = c }
  else { r = c; b = x }
  const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export const useThemeStore = create<ThemeStore>((set) => ({
  ...DEFAULT_THEME,

  setBrandColor: (hex) => set({ brandColor: hex }),
  setSecondaryColor: (hex) => set({ secondaryColor: hex }),
  setBaseColor: (hex) => set({ baseColor: hex }),
  setRadiusMode: (mode) => set({ radiusMode: mode }),
  setShadowMode: (mode) => set({ shadowMode: mode }),
  setSpacingMode: (mode) => set({ spacingMode: mode }),
  setMotionMode: (mode) => set({ motionMode: mode }),
  setRoundIconButtons: (enabled) => set({ roundIconButtons: enabled }),
  setCardBordersEnabled: (enabled) => set({ cardBordersEnabled: enabled }),
  setHeadingFont: (font) => set({ headingFont: font }),
  setBodyFont: (font) => set({ bodyFont: font }),
  setColorMode: (mode) => set({ colorMode: mode }),
  applyPreset: (theme) => set({ ...theme }),
  randomize: () => set({
    brandColor: randomHex(),
    secondaryColor: randomHex(),
  }),
  reset: () => set({ ...DEFAULT_THEME }),
}))
