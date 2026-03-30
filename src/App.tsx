import { useState } from 'react'
import { RotateCcw, Shuffle, ChevronDown, ChevronUp, Link2, Check } from 'lucide-react'
import { useThemeSync } from './hooks/useThemeSync'
import { useFontLoader } from './hooks/useFontLoader'
import { useUrlState } from './hooks/useUrlState'
import { useThemeStore } from './store/theme.store'
import { ColorSection } from './components/controls/ColorSection'
import { RadiusPicker } from './components/controls/RadiusPicker'
import { ShadowPicker } from './components/controls/ShadowPicker'
import { MotionPicker } from './components/controls/MotionPicker'
import { SpaciousnessPicker } from './components/controls/SpaciousnessPicker'
import { FontPicker } from './components/controls/FontPicker'
import { ModeToggle } from './components/controls/ModeToggle'
import { ExportPanel } from './components/controls/ExportPanel'
import { IconButtonPicker } from './components/controls/IconButtonPicker'
import { CardOptions } from './components/controls/CardOptions'
import { PreviewShell } from './components/preview/PreviewShell'
import { PRESETS } from './lib/defaults'

function Section({ title, children, defaultOpen = true }: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-zinc-800">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-zinc-800/40 transition-colors"
      >
        <span className="text-sm font-semibold text-zinc-200">{title}</span>
        {open ? <ChevronUp size={14} className="text-zinc-500" /> : <ChevronDown size={14} className="text-zinc-500" />}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  )
}

export default function App() {
  useThemeSync()
  useUrlState()
  const [linkCopied, setLinkCopied] = useState(false)
  const headingFont = useThemeStore(s => s.headingFont)
  const bodyFont = useThemeStore(s => s.bodyFont)
  const setHeadingFont = useThemeStore(s => s.setHeadingFont)
  const setBodyFont = useThemeStore(s => s.setBodyFont)
  const applyPreset = useThemeStore(s => s.applyPreset)
  const randomize = useThemeStore(s => s.randomize)
  const reset = useThemeStore(s => s.reset)
  const colorMode = useThemeStore(s => s.colorMode)

  // Load default fonts
  useFontLoader(headingFont)
  useFontLoader(bodyFont)

  return (
    <div className="flex h-full overflow-hidden">
      {/* Controls sidebar */}
      <aside
        className="flex-shrink-0 flex flex-col overflow-y-auto border-r border-zinc-800"
        style={{ width: '300px', backgroundColor: '#111113' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-zinc-800 sticky top-0 z-10" style={{ backgroundColor: '#111113' }}>
          <div>
            <p className="text-sm font-bold text-zinc-100">Design System</p>
            <p className="text-xs text-zinc-500">Ecommerce Builder</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={randomize}
              title="Randomize colors"
              className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            >
              <Shuffle size={14} />
            </button>
            <button
              onClick={reset}
              title="Reset to defaults"
              className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            >
              <RotateCcw size={14} />
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                  setLinkCopied(true)
                  setTimeout(() => setLinkCopied(false), 2000)
                })
              }}
              title="Copy shareable link"
              className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            >
              {linkCopied ? <Check size={14} className="text-green-400" /> : <Link2 size={14} />}
            </button>
          </div>
        </div>

        {/* Preview mode toggle */}
        <div className="px-4 py-3 border-b border-zinc-800">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Preview Mode</p>
          <ModeToggle />
        </div>

        {/* Presets */}
        <div className="px-4 py-3 border-b border-zinc-800">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Presets</p>
          <div className="grid grid-cols-3 gap-1.5">
            {PRESETS.map(preset => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset.theme)}
                className="px-2 py-1.5 text-xs font-medium rounded-md border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-all"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: preset.theme.brandColor }}
                />
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Collapsible sections */}
        <Section title="Colors">
          <ColorSection />
        </Section>

        <Section title="Typography">
          <div className="space-y-4">
            <FontPicker label="Heading Font" value={headingFont} onChange={setHeadingFont} />
            <FontPicker label="Body Font" value={bodyFont} onChange={setBodyFont} />
          </div>
        </Section>

        <Section title="Border Radius">
          <RadiusPicker />
        </Section>

        <Section title="Buttons">
          <IconButtonPicker />
        </Section>

        <Section title="Shadows">
          <ShadowPicker />
        </Section>

        <Section title="Motion">
          <MotionPicker />
        </Section>

        <Section title="Spaciousness">
          <SpaciousnessPicker />
        </Section>

        <Section title="Cards">
          <CardOptions />
        </Section>

        <Section title="Export CSS" defaultOpen={false}>
          <ExportPanel />
        </Section>
      </aside>

      {/* Preview area */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ backgroundColor: colorMode === 'dark' ? '#0a0a0b' : '#e4e4e7' }}
      >
        <PreviewShell />
      </main>
    </div>
  )
}
