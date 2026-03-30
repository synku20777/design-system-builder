import { X } from 'lucide-react'
import { PreviewContentContainer } from './PreviewContentContainer'

export function PreviewModal() {
  return (
    <section style={{
      backgroundColor: 'var(--color-background)',
      borderTop: '1px solid var(--color-border)',
      fontFamily: 'var(--font-sans)',
    }}>
      <PreviewContentContainer>
        <div style={{ padding: 'var(--space-section-block) var(--space-section-inline)' }}>
          <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-card-pad)', fontWeight: 500 }}>
            Modal / Dialog
          </p>

          {/* Simulated overlay + modal */}
          <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {/* Blurred background hint */}
            <div style={{
              backgroundColor: 'var(--overlay-bg)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* Modal box */}
              <div style={{
                backgroundColor: 'var(--color-surface-raised)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                padding: 'var(--space-modal-pad)',
                width: '100%',
                maxWidth: '380px',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-fg)',
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                  }}>
                    Remove from Cart?
                  </h3>
                  <button
                    type="button"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2rem',
                      height: '2rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-icon-button)',
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-muted-fg)',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
                <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 'var(--space-panel-pad)' }}>
                  Are you sure you want to remove "Merino Wool Coat" from your cart? This action cannot be undone.
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-button-group-gap)' }}>
                  <button style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    color: 'var(--color-fg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-control-y) var(--space-control-x)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}>
                    Cancel
                  </button>
                  <button style={{
                    flex: 1,
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-fg)',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-control-y) var(--space-control-x)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PreviewContentContainer>
    </section>
  )
}
