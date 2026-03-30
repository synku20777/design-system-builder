export type SpacingMode = 'compact' | 'cozy' | 'default' | 'airy' | 'spacious'

export const SPACING_MULTIPLIERS: Record<SpacingMode, number> = {
  compact: 0.85,
  cozy: 0.95,
  default: 1,
  airy: 1.125,
  spacious: 1.25,
}

const BASE_SPACING_STEPS = {
  1: 0.25,
  2: 0.5,
  3: 0.75,
  4: 1,
  5: 1.25,
  6: 1.5,
  8: 2,
  10: 2.5,
  12: 3,
} as const

type SpacingStep = keyof typeof BASE_SPACING_STEPS

export type SpacingScale = Record<SpacingStep, string>

export interface SpacingTokens {
  [key: string]: string
  '--space-1': string
  '--space-2': string
  '--space-3': string
  '--space-4': string
  '--space-5': string
  '--space-6': string
  '--space-8': string
  '--space-10': string
  '--space-12': string
  '--space-control-x': string
  '--space-control-y': string
  '--space-control-gap': string
  '--space-badge-x': string
  '--space-badge-y': string
  '--space-card-pad': string
  '--space-panel-pad': string
  '--space-modal-pad': string
  '--space-field-gap': string
  '--space-button-group-gap': string
  '--space-grid-gap': string
  '--space-stack-gap': string
  '--space-section-inline': string
  '--space-section-block': string
}

function roundToGrid(value: number) {
  return Math.round(value / 0.0625) * 0.0625
}

function rem(value: number) {
  return `${value.toFixed(4).replace(/\.?0+$/, '')}rem`
}

export function getSpacingScale(mode: SpacingMode): SpacingScale {
  const multiplier = SPACING_MULTIPLIERS[mode]

  return Object.fromEntries(
    Object.entries(BASE_SPACING_STEPS).map(([step, value]) => [step, rem(roundToGrid(value * multiplier))]),
  ) as SpacingScale
}

export function getComponentSpacingTokens(scale: SpacingScale): SpacingTokens {
  return {
    '--space-1': scale[1],
    '--space-2': scale[2],
    '--space-3': scale[3],
    '--space-4': scale[4],
    '--space-5': scale[5],
    '--space-6': scale[6],
    '--space-8': scale[8],
    '--space-10': scale[10],
    '--space-12': scale[12],
    '--space-control-x': 'var(--space-4)',
    '--space-control-y': 'var(--space-3)',
    '--space-control-gap': 'var(--space-2)',
    '--space-badge-x': 'var(--space-2)',
    '--space-badge-y': 'var(--space-1)',
    '--space-card-pad': 'var(--space-4)',
    '--space-panel-pad': 'var(--space-5)',
    '--space-modal-pad': 'var(--space-6)',
    '--space-field-gap': 'var(--space-2)',
    '--space-button-group-gap': 'var(--space-3)',
    '--space-grid-gap': 'var(--space-4)',
    '--space-stack-gap': 'var(--space-4)',
    '--space-section-inline': 'var(--space-6)',
    '--space-section-block': 'var(--space-8)',
  }
}
