import { X } from 'lucide-react'
import { PreviewContentContainer } from './PreviewContentContainer'

export function PreviewFilters() {
  return (
    <div style={{
      backgroundColor: 'var(--color-background)',
      borderBottom: '1px solid var(--color-border)',
      fontFamily: 'var(--font-sans)',
    }}>
      <PreviewContentContainer>
        <div style={{ padding: 'var(--space-3) var(--space-section-inline)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-button-group-gap)' }}>
            <span style={{ color: 'var(--color-muted-fg)', fontSize: '0.8125rem', fontWeight: 500 }}>
              Filters:
            </span>

            {/* Select dropdowns */}
            {['Category', 'Price', 'Size'].map(f => (
              <select
                key={f}
                defaultValue=""
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--color-fg)',
                  fontSize: '0.8125rem',
                  padding: 'var(--space-control-y) var(--space-control-x)',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="" disabled>{f}</option>
                <option>Option A</option>
                <option>Option B</option>
              </select>
            ))}

            {/* Checkbox */}
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-control-gap)', cursor: 'pointer' }}>
              <span style={{
                width: '14px',
                height: '14px',
                borderRadius: 'var(--radius-xs)',
                border: '2px solid var(--color-primary)',
                backgroundColor: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                  <path d="M1 3l2 2 4-4" stroke="var(--color-primary-fg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span style={{ color: 'var(--color-fg)', fontSize: '0.8125rem' }}>In Stock</span>
            </label>

            {/* Active filter badges */}
            {['Sale', 'New Arrivals'].map(tag => (
              <span
                key={tag}
                style={{
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-secondary-fg)',
                  borderRadius: 'var(--radius-pill)',
                  padding: 'var(--space-badge-y) var(--space-badge-x)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-1)',
                }}
              >
                {tag}
                <X size={10} style={{ opacity: 0.7 }} />
              </span>
            ))}

            <a
              href="#"
              onClick={e => e.preventDefault()}
              style={{
                color: 'var(--color-primary)',
                fontSize: '0.8125rem',
                marginLeft: 'auto',
              }}
            >
              Clear all
            </a>
          </div>
        </div>
      </PreviewContentContainer>
    </div>
  )
}
