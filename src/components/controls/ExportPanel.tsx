import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { useThemeStore } from '../../store/theme.store'
import { buildExportCSS } from '../../lib/export'

export function ExportPanel() {
  const [copied, setCopied] = useState(false)
  const store = useThemeStore()

  const css = buildExportCSS({
    brandColor: store.brandColor,
    secondaryColor: store.secondaryColor,
    baseColor: store.baseColor,
    radiusMode: store.radiusMode,
    shadowMode: store.shadowMode,
    spacingMode: store.spacingMode,
    motionMode: store.motionMode,
    roundIconButtons: store.roundIconButtons,
    headingFont: store.headingFont,
    bodyFont: store.bodyFont,
  })

  function handleCopy() {
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">CSS Variables</p>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-xs rounded-md transition-colors"
        >
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-400 overflow-auto max-h-64 font-mono leading-relaxed">
        {css}
      </pre>
    </div>
  )
}
