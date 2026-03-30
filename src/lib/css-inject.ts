import { generateScale, getSemanticTokens, hexToOklch } from './color'
import { generateRadiusScale, type RadiusMode } from './radius'
import { fontFamilyValue, getFontDef } from './fonts'
import { generateShadowTokens, SHADOW_MULTIPLIERS, type ShadowIntensity } from './shadow'
import { getComponentSpacingTokens, getSpacingScale, type SpacingMode } from './spacing'
import { generateMotionTokens, type MotionMode } from './motion'

export interface ThemeInput {
  brandColor: string
  secondaryColor: string
  baseColor: string
  radiusMode: RadiusMode
  shadowMode: ShadowIntensity
  spacingMode: SpacingMode
  motionMode: MotionMode
  roundIconButtons: boolean
  headingFont: string
  bodyFont: string
}

function scaleToVars(prefix: string, scale: Record<string, string>): string {
  return Object.entries(scale)
    .map(([step, val]) => `  --color-${prefix}-${step}: ${val};`)
    .join('\n')
}

function tokensToVars(tokens: Record<string, string>): string {
  return Object.entries(tokens)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')
}

export function buildCSSString(input: ThemeInput): string {
  const brandScale = generateScale(input.brandColor, false)
  const secondaryScale = generateScale(input.secondaryColor, false)
  const baseScale = generateScale(input.baseColor, true)
  const brandHue = hexToOklch(input.brandColor).h
  const { light, dark } = getSemanticTokens(brandScale, secondaryScale, baseScale, brandHue)
  const multiplier = SHADOW_MULTIPLIERS[input.shadowMode]
  const motionTokens = generateMotionTokens(input.motionMode)
  const lightTokens = { ...light, ...generateShadowTokens(brandHue, 'light', multiplier), ...motionTokens }
  const darkTokens  = { ...dark,  ...generateShadowTokens(brandHue, 'dark',  multiplier), ...motionTokens }
  const radius = generateRadiusScale(input.radiusMode)
  const spacingScale = getSpacingScale(input.spacingMode)
  const spacingTokens = getComponentSpacingTokens(spacingScale)

  const headingDef = getFontDef(input.headingFont)
  const bodyDef = getFontDef(input.bodyFont)

  const radiusVars = `  --radius-xs: ${radius.xs};
  --radius-sm: ${radius.sm};
  --radius-md: ${radius.md};
  --radius-lg: ${radius.lg};
  --radius-xl: ${radius.xl};
  --radius-pill: ${radius.pill};`

  const fontVars = `  --font-heading: ${fontFamilyValue(input.headingFont, headingDef.category)};
  --font-sans: ${fontFamilyValue(input.bodyFont, bodyDef.category)};`

  const skeletonVars = `  --skeleton-from: ${baseScale['100']};
  --skeleton-to: ${baseScale['200']};`

  const componentVars = `  --radius-icon-button: ${input.roundIconButtons ? radius.pill : radius.md};`

  return `
.preview-root {
${scaleToVars('brand', brandScale)}
${scaleToVars('secondary', secondaryScale)}
${scaleToVars('base', baseScale)}
${tokensToVars(lightTokens)}
${tokensToVars(spacingTokens)}
${radiusVars}
${fontVars}
${skeletonVars}
${componentVars}
}

.preview-root.dark {
${tokensToVars(darkTokens)}
  --skeleton-from: ${baseScale['800']};
  --skeleton-to: ${baseScale['700']};
}
`.trim()
}

export function injectThemeStyle(css: string): void {
  const id = 'dsb-theme'
  let el = document.getElementById(id) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement('style')
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = css
}
