export type MotionMode = 'none' | 'snappy' | 'default' | 'smooth'

export interface MotionTokens {
  '--duration-fast': string
  '--duration-base': string
  '--duration-slow': string
  '--easing-default': string
  '--easing-out': string
  '--easing-spring': string
}

const DURATIONS: Record<MotionMode, [string, string, string]> = {
  none:    ['0ms',   '0ms',   '0ms'],
  snappy:  ['50ms',  '100ms', '150ms'],
  default: ['100ms', '150ms', '250ms'],
  smooth:  ['200ms', '400ms', '600ms'],
}

/**
 * Generate the six motion tokens.
 *
 * Tokens:
 *   fast  – micro-interactions: colour changes, icon swaps, focus rings
 *   base  – standard transitions: shadows, backgrounds, borders
 *   slow  – entrance/exit animations: drawers, modals, expanded panels
 *
 * Easing:
 *   default – Material standard ease-in-out (most transitions)
 *   out     – decelerating ease-out (elements entering the screen)
 *   spring  – slight overshoot (interactive press, toggle feedback)
 *
 * Pure function: same mode always produces the same output.
 */
export function generateMotionTokens(mode: MotionMode): MotionTokens {
  const [fast, base, slow] = DURATIONS[mode]
  const isNone = mode === 'none'
  return {
    '--duration-fast':  fast,
    '--duration-base':  base,
    '--duration-slow':  slow,
    '--easing-default': isNone ? 'linear' : 'cubic-bezier(0.4, 0, 0.2, 1)',
    '--easing-out':     isNone ? 'linear' : 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    '--easing-spring':  isNone ? 'linear' : 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  }
}
