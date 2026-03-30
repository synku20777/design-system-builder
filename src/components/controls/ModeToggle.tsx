import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '../../store/theme.store'

export function ModeToggle() {
  const colorMode = useThemeStore(s => s.colorMode)
  const setColorMode = useThemeStore(s => s.setColorMode)

  return (
    <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-lg p-1">
      <button
        onClick={() => setColorMode('light')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
          colorMode === 'light'
            ? 'bg-zinc-100 text-zinc-900'
            : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <Sun size={12} />
        Light
      </button>
      <button
        onClick={() => setColorMode('dark')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
          colorMode === 'dark'
            ? 'bg-zinc-700 text-zinc-100'
            : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <Moon size={12} />
        Dark
      </button>
    </div>
  )
}
