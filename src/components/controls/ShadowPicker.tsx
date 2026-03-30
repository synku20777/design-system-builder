import { useThemeStore } from '../../store/theme.store'
import type { ShadowIntensity } from '../../lib/shadow'

const MODES: { mode: ShadowIntensity; label: string; description: string }[] = [
  { mode: 'flat',     label: 'Flat',     description: 'No shadows' },
  { mode: 'subtle',   label: 'Subtle',   description: 'Half opacity' },
  { mode: 'default',  label: 'Default',  description: 'Standard' },
  { mode: 'dramatic', label: 'Dramatic', description: '1.75× opacity' },
]

/** Mini card silhouette that shows the shadow visually for each preset */
function ShadowSwatch({ mode }: { mode: ShadowIntensity }) {
  const shadows: Record<ShadowIntensity, string> = {
    flat:     'none',
    subtle:   '0 1px 4px rgba(0,0,0,0.10)',
    default:  '0 2px 8px rgba(0,0,0,0.18)',
    dramatic: '0 6px 18px rgba(0,0,0,0.32)',
  }
  return (
    <div
      className="w-8 h-5 rounded bg-zinc-600"
      style={{ boxShadow: shadows[mode] }}
    />
  )
}

export function ShadowPicker() {
  const shadowMode = useThemeStore(s => s.shadowMode)
  const setShadowMode = useThemeStore(s => s.setShadowMode)

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Shadow Intensity</p>
      <div className="grid grid-cols-4 gap-1.5">
        {MODES.map(({ mode, label }) => (
          <button
            key={mode}
            onClick={() => setShadowMode(mode)}
            className={`flex flex-col items-center gap-2 py-2.5 px-1 rounded-lg border text-xs transition-all ${
              shadowMode === mode
                ? 'border-zinc-400 bg-zinc-700 text-zinc-100'
                : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
            }`}
          >
            <ShadowSwatch mode={mode} />
            <span className="leading-none">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
