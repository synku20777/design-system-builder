import { useThemeStore } from '../../store/theme.store'
import type { MotionMode } from '../../lib/motion'

const MODES: { mode: MotionMode; label: string; description: string; duration: number }[] = [
  { mode: 'none',    label: 'None',    description: 'Instant',   duration: 0   },
  { mode: 'snappy',  label: 'Snappy',  description: 'Fast',      duration: 100 },
  { mode: 'default', label: 'Default', description: 'Balanced',  duration: 150 },
  { mode: 'smooth',  label: 'Smooth',  description: 'Relaxed',   duration: 400 },
]

/** Animated dot that slides at the mode's characteristic speed to demonstrate timing */
function MotionSwatch({ mode, active }: { mode: MotionMode; duration: number; active: boolean }) {
  const isNone = mode === 'none'
  const dotPositions: Record<MotionMode, string> = {
    none:    '0%',
    snappy:  '33%',
    default: '55%',
    smooth:  '80%',
  }
  const dur: Record<MotionMode, string> = {
    none:    '0ms',
    snappy:  '100ms',
    default: '150ms',
    smooth:  '400ms',
  }

  return (
    <div
      style={{
        width: '2rem',
        height: '1.125rem',
        borderRadius: '999px',
        backgroundColor: 'rgba(255,255,255,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Track */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '4px',
          right: '4px',
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.15)',
          transform: 'translateY(-50%)',
        }}
      />
      {/* Dot */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: isNone ? '4px' : `calc(${dotPositions[mode]} + 2px)`,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: active ? '#a1a1aa' : 'rgba(255,255,255,0.3)',
          transform: 'translate(-50%, -50%)',
          transition: `left ${dur[mode]} cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      />
    </div>
  )
}

export function MotionPicker() {
  const motionMode = useThemeStore(s => s.motionMode)
  const setMotionMode = useThemeStore(s => s.setMotionMode)

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Animation Speed</p>
      <div className="grid grid-cols-4 gap-1.5">
        {MODES.map(({ mode, label, duration }) => (
          <button
            key={mode}
            onClick={() => setMotionMode(mode)}
            className={`flex flex-col items-center gap-2 py-2.5 px-1 rounded-lg border text-xs transition-all ${
              motionMode === mode
                ? 'border-zinc-400 bg-zinc-700 text-zinc-100'
                : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
            }`}
          >
            <MotionSwatch mode={mode} duration={duration} active={motionMode === mode} />
            <span className="leading-none">{label}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-zinc-600">
        {MODES.find(m => m.mode === motionMode)?.description}
      </p>
    </div>
  )
}
