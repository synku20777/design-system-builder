import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FONTS } from '../../lib/fonts'
import { useFontLoader } from '../../hooks/useFontLoader'

interface Props {
  label: string
  value: string
  onChange: (font: string) => void
}

function FontOption({ name }: { name: string }) {
  useFontLoader(name)
  return (
    <span style={{ fontFamily: `'${name}', system-ui, sans-serif` }}>{name}</span>
  )
}

export function FontPicker({ label, value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = FONTS.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  )

  useFontLoader(value)

  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</p>
      <div className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-100 hover:border-zinc-600 focus:outline-none"
        >
          <span style={{ fontFamily: `'${value}', system-ui, sans-serif` }}>{value}</span>
          <ChevronDown size={14} className={`text-zinc-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="absolute top-full mt-1 left-0 right-0 z-50 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-2 border-b border-zinc-800">
              <input
                autoFocus
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search fonts..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-2 py-1.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div className="max-h-56 overflow-y-auto">
              {filtered.map(f => (
                <button
                  key={f.name}
                  onClick={() => { onChange(f.name); setOpen(false); setSearch('') }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-zinc-800 transition-colors ${
                    value === f.name ? 'text-white bg-zinc-800' : 'text-zinc-300'
                  }`}
                >
                  <FontOption name={f.name} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <p className="text-xs text-zinc-500" style={{ fontFamily: `'${value}', system-ui, sans-serif` }}>
        The quick brown fox jumps over the lazy dog
      </p>
    </div>
  )
}
