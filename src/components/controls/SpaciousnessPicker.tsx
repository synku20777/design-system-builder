import type { CSSProperties } from 'react'
import { useThemeStore } from '../../store/theme.store'
import { getComponentSpacingTokens, getSpacingScale, type SpacingMode } from '../../lib/spacing'

const MODES: { mode: SpacingMode; label: string; description: string }[] = [
  { mode: 'compact', label: 'Compact', description: 'Tighter controls and smaller gaps' },
  { mode: 'cozy', label: 'Cozy', description: 'Slightly denser than default' },
  { mode: 'default', label: 'Default', description: 'Balanced spacing rhythm' },
  { mode: 'airy', label: 'Airy', description: 'More breathing room between elements' },
  { mode: 'spacious', label: 'Spacious', description: 'Largest padding and section gaps' },
]

function previewVars(mode: SpacingMode) {
  return getComponentSpacingTokens(getSpacingScale(mode)) as CSSProperties
}

function SpaciousnessSwatch({ mode }: { mode: SpacingMode }) {
  return (
    <div
      style={{
        ...previewVars(mode),
        borderRadius: '0.75rem',
        border: '1px solid rgba(255,255,255,0.08)',
        backgroundColor: 'rgba(24, 24, 27, 0.9)',
        padding: 'var(--space-card-pad)',
        display: 'grid',
        gap: 'var(--space-stack-gap)',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-control-gap)',
          padding: 'var(--space-control-y) var(--space-control-x)',
          borderRadius: '0.625rem',
          backgroundColor: '#f4f4f5',
          color: '#18181b',
          fontSize: '0.6875rem',
          fontWeight: 700,
          width: 'fit-content',
        }}
      >
        Button
      </div>

      <div
        style={{
          padding: 'var(--space-control-y) var(--space-control-x)',
          borderRadius: '0.625rem',
          backgroundColor: 'rgba(39, 39, 42, 0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: 'rgba(244,244,245,0.65)',
          fontSize: '0.6875rem',
        }}
      >
        Input field
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-grid-gap)' }}>
        <div
          style={{
            minWidth: 0,
            flex: 1,
            display: 'grid',
            gap: 'var(--space-field-gap)',
          }}
        >
          <div
            style={{
              width: 'fit-content',
              padding: 'var(--space-badge-y) var(--space-badge-x)',
              borderRadius: '999px',
              backgroundColor: '#1d4ed8',
              color: '#eff6ff',
              fontSize: '0.625rem',
              fontWeight: 700,
            }}
          >
            Badge
          </div>
          <div style={{ display: 'grid', gap: 'var(--space-field-gap)' }}>
            <div style={{ height: '0.375rem', borderRadius: '999px', backgroundColor: 'rgba(255,255,255,0.9)' }} />
            <div style={{ height: '0.375rem', width: '78%', borderRadius: '999px', backgroundColor: 'rgba(255,255,255,0.35)' }} />
          </div>
        </div>

        <div
          style={{
            width: '3.4rem',
            alignSelf: 'stretch',
            borderRadius: '0.75rem',
            backgroundColor: 'rgba(255,255,255,0.08)',
          }}
        />
      </div>
    </div>
  )
}

export function SpaciousnessPicker() {
  const spacingMode = useThemeStore(s => s.spacingMode)
  const setSpacingMode = useThemeStore(s => s.setSpacingMode)

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Spaciousness</p>
      <div className="grid grid-cols-1 gap-2">
        {MODES.map(({ mode, label, description }) => {
          const active = spacingMode === mode

          return (
            <button
              key={mode}
              onClick={() => setSpacingMode(mode)}
              className={`rounded-xl border p-3 text-left transition-all ${
                active
                  ? 'border-zinc-400 bg-zinc-700 text-zinc-100'
                  : 'border-zinc-700 bg-zinc-900/80 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/80'
              }`}
              style={{ display: 'grid', gap: '0.75rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.75rem' }}>
                <span className="text-sm font-semibold">{label}</span>
                <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">{mode}</span>
              </div>
              <SpaciousnessSwatch mode={mode} />
              <p className="text-xs text-zinc-500">{description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
