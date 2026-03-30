import { useThemeStore } from '../../store/theme.store'

export function CardOptions() {
  const cardBordersEnabled = useThemeStore(s => s.cardBordersEnabled)
  const setCardBordersEnabled = useThemeStore(s => s.setCardBordersEnabled)

  return (
    <label className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-3 cursor-pointer">
      <input
        type="checkbox"
        checked={cardBordersEnabled}
        onChange={event => setCardBordersEnabled(event.currentTarget.checked)}
        className="mt-0.5 h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-zinc-100 accent-zinc-200"
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-zinc-100">Show card borders</span>
        <span className="block text-xs text-zinc-500 mt-1">
          Toggle the outer border on product cards across the preview.
        </span>
      </span>
    </label>
  )
}
