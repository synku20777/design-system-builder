import { useEffect } from 'react'
import { useThemeStore } from '../store/theme.store'
import type { RadiusMode } from '../lib/radius'
import type { ShadowIntensity } from '../lib/shadow'
import type { SpacingMode } from '../lib/spacing'
import type { MotionMode } from '../lib/motion'

interface SerializedTheme {
  b: string   // brandColor
  s: string   // secondaryColor
  n: string   // baseColor (neutral)
  r: string   // radiusMode
  sh: string  // shadowMode
  sp: string  // spacingMode
  mo: string  // motionMode
  ib: boolean // roundIconButtons
  cb: boolean // cardBordersEnabled
  h: string   // headingFont
  f: string   // bodyFont
}

function serialize(): string {
  const st = useThemeStore.getState()
  const payload: SerializedTheme = {
    b: st.brandColor,
    s: st.secondaryColor,
    n: st.baseColor,
    r: st.radiusMode,
    sh: st.shadowMode,
    sp: st.spacingMode,
    mo: st.motionMode,
    ib: st.roundIconButtons,
    cb: st.cardBordersEnabled,
    h: st.headingFont,
    f: st.bodyFont,
  }
  return btoa(JSON.stringify(payload))
}

function deserialize(hash: string): Partial<ReturnType<typeof useThemeStore.getState>> | null {
  try {
    const raw = atob(hash.replace(/^#/, ''))
    const payload = JSON.parse(raw) as SerializedTheme
    return {
      brandColor: payload.b,
      secondaryColor: payload.s,
      baseColor: payload.n,
      radiusMode: payload.r as RadiusMode,
      shadowMode: (payload.sh ?? 'default') as ShadowIntensity,
      spacingMode: (payload.sp ?? 'default') as SpacingMode,
      motionMode: (payload.mo ?? 'default') as MotionMode,
      roundIconButtons: payload.ib ?? true,
      cardBordersEnabled: payload.cb ?? true,
      headingFont: payload.h,
      bodyFont: payload.f,
    }
  } catch {
    return null
  }
}

export function useUrlState() {
  const store = useThemeStore()

  // On mount, read from hash
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const parsed = deserialize(hash)
    if (parsed) store.applyPreset(parsed)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // On store change, update hash (debounced)
  useEffect(() => {
    const t = setTimeout(() => {
      const encoded = serialize()
      window.history.replaceState(null, '', `#${encoded}`)
    }, 300)
    return () => clearTimeout(t)
  }, [
    store.brandColor,
    store.secondaryColor,
    store.baseColor,
    store.radiusMode,
    store.shadowMode,
    store.spacingMode,
    store.motionMode,
    store.roundIconButtons,
    store.cardBordersEnabled,
    store.headingFont,
    store.bodyFont,
  ])
}
