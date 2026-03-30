export interface FontDef {
  name: string
  category: 'sans' | 'serif' | 'display' | 'mono'
  weights: string
}

export const FONTS: FontDef[] = [
  { name: 'Inter', category: 'sans', weights: '300;400;500;600;700' },
  { name: 'DM Sans', category: 'sans', weights: '300;400;500;600;700' },
  { name: 'Geist', category: 'sans', weights: '300;400;500;600;700' },
  { name: 'Nunito', category: 'sans', weights: '300;400;500;600;700' },
  { name: 'Poppins', category: 'sans', weights: '300;400;500;600;700' },
  { name: 'Raleway', category: 'sans', weights: '300;400;500;600;700' },
  { name: 'Rubik', category: 'sans', weights: '300;400;500;600;700' },
  { name: 'Lato', category: 'sans', weights: '300;400;700' },
  { name: 'Open Sans', category: 'sans', weights: '300;400;500;600;700' },
  { name: 'Outfit', category: 'sans', weights: '300;400;500;600;700' },
  { name: 'Playfair Display', category: 'serif', weights: '400;500;600;700' },
  { name: 'Lora', category: 'serif', weights: '400;500;600;700' },
  { name: 'Merriweather', category: 'serif', weights: '300;400;700' },
  { name: 'DM Serif Display', category: 'serif', weights: '400' },
  { name: 'Montserrat', category: 'display', weights: '300;400;500;600;700' },
  { name: 'Sora', category: 'display', weights: '300;400;500;600;700' },
  { name: 'Space Grotesk', category: 'display', weights: '300;400;500;600;700' },
  { name: 'Bricolage Grotesque', category: 'display', weights: '300;400;500;600;700' },
  { name: 'Geist Mono', category: 'mono', weights: '400;500;600' },
  { name: 'JetBrains Mono', category: 'mono', weights: '400;500;600' },
]

export function buildGoogleFontsUrl(fontName: string, weights: string): string {
  const encoded = fontName.replace(/ /g, '+')
  return `https://fonts.googleapis.com/css2?family=${encoded}:wght@${weights}&display=swap`
}

export function fontFamilyValue(fontName: string, category: FontDef['category']): string {
  const fallbacks: Record<FontDef['category'], string> = {
    sans: 'system-ui, -apple-system, sans-serif',
    serif: 'Georgia, "Times New Roman", serif',
    display: 'system-ui, sans-serif',
    mono: '"Courier New", monospace',
  }
  return `'${fontName}', ${fallbacks[category]}`
}

export function getFontDef(name: string): FontDef {
  return FONTS.find(f => f.name === name) ?? FONTS[0]!
}
