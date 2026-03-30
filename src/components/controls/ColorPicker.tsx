import { useState, useRef, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'

interface Props {
  label: string
  value: string
  onChange: (hex: string) => void
  presets: { color: string; name: string }[]
  scale?: Record<string, string>
}

export function ColorPicker({ label, value, onChange, presets, scale }: Props) {
  const [open, setOpen] = useState(false)
  const [inputVal, setInputVal] = useState(value)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => { setInputVal(value) }, [value])

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function handleInput(raw: string) {
    setInputVal(raw)
    const hex = raw.startsWith('#') ? raw : `#${raw}`
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) onChange(hex)
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</p>

      {/* Preset swatches */}
      <div className="flex flex-wrap gap-1.5">
        {presets.map(p => (
          <button
            key={p.color}
            title={p.name}
            onClick={() => onChange(p.color)}
            className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none"
            style={{
              backgroundColor: p.color,
              borderColor: value === p.color ? '#fff' : 'transparent',
              boxShadow: value === p.color ? `0 0 0 2px ${p.color}` : 'none',
            }}
          />
        ))}
      </div>

      {/* Hex input + picker trigger */}
      <div className="relative" ref={ref}>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(o => !o)}
            className="w-8 h-8 rounded-md border border-zinc-700 flex-shrink-0 transition-transform hover:scale-105"
            style={{ backgroundColor: value }}
          />
          <input
            type="text"
            value={inputVal}
            onChange={e => handleInput(e.target.value)}
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-md px-2 py-1.5 text-sm text-zinc-100 font-mono focus:outline-none focus:border-zinc-500"
            placeholder="#6366f1"
            maxLength={7}
          />
        </div>

        {open && (
          <div className="absolute top-10 left-0 z-50 p-3 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl">
            <HexColorPicker color={value} onChange={onChange} />
          </div>
        )}
      </div>

      {/* Scale preview */}
      {scale && (
        <div className="flex gap-0.5 h-3 rounded-sm overflow-hidden">
          {['50','100','200','300','400','500','600','700','800','900','950'].map(step => (
            <div key={step} className="flex-1" style={{ backgroundColor: scale[step] }} />
          ))}
        </div>
      )}
    </div>
  )
}
