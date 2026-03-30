import { useThemeStore } from '../../store/theme.store'
import { ColorPicker } from './ColorPicker'
import { generateScale } from '../../lib/color'

const BASE_PRESETS = [
  { color: '#71717a', name: 'Zinc' },
  { color: '#64748b', name: 'Slate' },
  { color: '#6b7280', name: 'Gray' },
  { color: '#78716c', name: 'Stone' },
  { color: '#737373', name: 'Neutral' },
  { color: '#a8a29e', name: 'Sand' },
  { color: '#8b8098', name: 'Mauve' },
  { color: '#6a8c69', name: 'Olive' },
]

const BRAND_PRESETS = [
  { color: '#6366f1', name: 'Indigo' },
  { color: '#3b82f6', name: 'Blue' },
  { color: '#8b5cf6', name: 'Violet' },
  { color: '#f43f5e', name: 'Rose' },
  { color: '#f97316', name: 'Orange' },
  { color: '#10b981', name: 'Emerald' },
  { color: '#14b8a6', name: 'Teal' },
  { color: '#0ea5e9', name: 'Sky' },
  { color: '#ec4899', name: 'Pink' },
  { color: '#ef4444', name: 'Red' },
]

const SECONDARY_PRESETS = [
  { color: '#ec4899', name: 'Pink' },
  { color: '#a855f7', name: 'Purple' },
  { color: '#06b6d4', name: 'Cyan' },
  { color: '#84cc16', name: 'Lime' },
  { color: '#f59e0b', name: 'Amber' },
  { color: '#10b981', name: 'Emerald' },
  { color: '#f97316', name: 'Orange' },
  { color: '#6366f1', name: 'Indigo' },
  { color: '#14b8a6', name: 'Teal' },
  { color: '#e11d48', name: 'Rose' },
]

export function ColorSection() {
  const brandColor = useThemeStore(s => s.brandColor)
  const secondaryColor = useThemeStore(s => s.secondaryColor)
  const baseColor = useThemeStore(s => s.baseColor)
  const setBrandColor = useThemeStore(s => s.setBrandColor)
  const setSecondaryColor = useThemeStore(s => s.setSecondaryColor)
  const setBaseColor = useThemeStore(s => s.setBaseColor)

  return (
    <div className="space-y-5">
      <ColorPicker
        label="Brand Color"
        value={brandColor}
        onChange={setBrandColor}
        presets={BRAND_PRESETS}
        scale={generateScale(brandColor, false)}
      />
      <ColorPicker
        label="Secondary Color"
        value={secondaryColor}
        onChange={setSecondaryColor}
        presets={SECONDARY_PRESETS}
        scale={generateScale(secondaryColor, false)}
      />
      <ColorPicker
        label="Base / Neutral"
        value={baseColor}
        onChange={setBaseColor}
        presets={BASE_PRESETS}
        scale={generateScale(baseColor, true)}
      />
    </div>
  )
}
