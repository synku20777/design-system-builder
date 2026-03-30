export type RadiusMode = 'sharp' | 'subtle' | 'default' | 'rounded' | 'pill'

const BASE_VALUES: Record<RadiusMode, number> = {
  sharp: 0,
  subtle: 0.125,
  default: 0.25,
  rounded: 0.5,
  pill: 0.75,
}

export interface RadiusScale {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  pill: string
}

export function generateRadiusScale(mode: RadiusMode): RadiusScale {
  const base = BASE_VALUES[mode]
  if (base === 0) {
    return { xs: '0rem', sm: '0rem', md: '0rem', lg: '0rem', xl: '0rem', pill: '0rem' }
  }
  const r = (v: number) => `${v.toFixed(3).replace(/\.?0+$/, '')}rem`
  return {
    xs: r(base * 0.5),
    sm: r(base * 1.0),
    md: r(base * 1.5),
    lg: r(base * 2.5),
    xl: r(base * 3.5),
    pill: '9999px',
  }
}
