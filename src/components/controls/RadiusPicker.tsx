import { useThemeStore } from '../../store/theme.store'
import type { RadiusMode } from '../../lib/radius'

const MODES: { mode: RadiusMode; label: string; desc: string }[] = [
  { mode: 'sharp', label: 'Sharp', desc: '0' },
  { mode: 'subtle', label: 'Subtle', desc: '2' },
  { mode: 'default', label: 'Default', desc: '4' },
  { mode: 'rounded', label: 'Rounded', desc: '8' },
  { mode: 'pill', label: 'Pill', desc: '12+' },
]

function CornerIcon({ mode }: { mode: RadiusMode }) {
  const r: Record<RadiusMode, number> = { sharp: 0, subtle: 2, default: 4, rounded: 8, pill: 20 }
  const radius = r[mode]
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
      <rect x="1" y="1" width="26" height="18" rx={radius} stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function RadiusPicker() {
  const radiusMode = useThemeStore(s => s.radiusMode)
  const setRadiusMode = useThemeStore(s => s.setRadiusMode)

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Border Radius</p>
      <div className="grid grid-cols-5 gap-1">
        {MODES.map(({ mode, label }) => (
          <button
            key={mode}
            onClick={() => setRadiusMode(mode)}
            className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg border text-xs transition-all ${
              radiusMode === mode
                ? 'border-zinc-400 bg-zinc-700 text-zinc-100'
                : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
            }`}
          >
            <CornerIcon mode={mode} />
            <span className="leading-none">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
