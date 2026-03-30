import { useThemeStore } from '../../store/theme.store'

const OPTIONS = [
  { value: false, label: 'Default', description: 'Soft-corner icon controls.' },
  { value: true, label: 'Round', description: 'Circular icon controls with equal width and height.' },
] as const

function IconButtonPreview({ round }: { round: boolean }) {
  return (
    <div className="flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/70 py-3">
      <div
        className="flex items-center justify-center border border-zinc-600 bg-zinc-800 text-zinc-100"
        style={{
          width: '2.25rem',
          height: '2.25rem',
          borderRadius: round ? '999px' : '0.625rem',
        }}
      >
        <span
          className="block rounded-full bg-current"
          style={{ width: '0.5rem', height: '0.5rem' }}
        />
      </div>
    </div>
  )
}

export function IconButtonPicker() {
  const roundIconButtons = useThemeStore(s => s.roundIconButtons)
  const setRoundIconButtons = useThemeStore(s => s.setRoundIconButtons)

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Icon Buttons</p>
      <div className="grid grid-cols-2 gap-2">
        {OPTIONS.map(option => {
          const active = roundIconButtons === option.value
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => setRoundIconButtons(option.value)}
              className={`rounded-lg border p-2 text-left transition-all ${
                active
                  ? 'border-zinc-400 bg-zinc-700 text-zinc-100'
                  : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
              }`}
            >
              <IconButtonPreview round={option.value} />
              <div className="mt-2">
                <p className="text-xs font-semibold">{option.label}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
                  {option.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
