import { useEffect } from 'react'
import { useThemeStore } from '../store/theme.store'
import { buildCSSString, injectThemeStyle } from '../lib/css-inject'

export function useThemeSync() {
  const brandColor = useThemeStore(s => s.brandColor)
  const secondaryColor = useThemeStore(s => s.secondaryColor)
  const baseColor = useThemeStore(s => s.baseColor)
  const radiusMode = useThemeStore(s => s.radiusMode)
  const shadowMode = useThemeStore(s => s.shadowMode)
  const spacingMode = useThemeStore(s => s.spacingMode)
  const motionMode = useThemeStore(s => s.motionMode)
  const roundIconButtons = useThemeStore(s => s.roundIconButtons)
  const headingFont = useThemeStore(s => s.headingFont)
  const bodyFont = useThemeStore(s => s.bodyFont)

  useEffect(() => {
    const css = buildCSSString({ brandColor, secondaryColor, baseColor, radiusMode, shadowMode, spacingMode, motionMode, roundIconButtons, headingFont, bodyFont })
    injectThemeStyle(css)
  }, [brandColor, secondaryColor, baseColor, radiusMode, shadowMode, spacingMode, motionMode, roundIconButtons, headingFont, bodyFont])
}
