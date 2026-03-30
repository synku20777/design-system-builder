import { useEffect } from 'react'
import { buildGoogleFontsUrl, getFontDef } from '../lib/fonts'

const loadedFonts = new Set<string>()

export function useFontLoader(fontName: string) {
  useEffect(() => {
    if (loadedFonts.has(fontName)) return
    const def = getFontDef(fontName)
    const url = buildGoogleFontsUrl(def.name, def.weights)
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    document.head.appendChild(link)
    loadedFonts.add(fontName)
  }, [fontName])
}
