import { X, Minus, Plus } from 'lucide-react'
import { PreviewContentContainer } from './PreviewContentContainer'

const ITEMS = [
  { name: 'Merino Wool Sweater', variant: 'Navy / M', price: '$128', qty: 1 },
  { name: 'Classic Leather Tote', variant: 'Tan', price: '$245', qty: 1 },
  { name: 'Cashmere Beanie', variant: 'Ivory / One Size', price: '$58', qty: 2 },
]

export function PreviewCart() {
  return (
    <section style={{
      backgroundColor: 'var(--color-background)',
      borderTop: '1px solid var(--color-border)',
      fontFamily: 'var(--font-sans)',
    }}>
      <PreviewContentContainer>
        <div style={{ padding: 'var(--space-section-block) var(--space-section-inline)' }}>
          {/* Cart panel inline */}
          <div style={{
            backgroundColor: 'var(--color-surface-raised)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            maxWidth: '420px',
            margin: '0 auto',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--space-card-pad) var(--space-panel-pad)',
              borderBottom: '1px solid var(--color-border)',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-fg)',
                fontSize: '1rem',
                fontWeight: 700,
              }}>
                Your Cart (4)
              </h3>
              <button
                type="button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.25rem',
                  height: '2.25rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-icon-button)',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-muted-fg)',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div style={{ padding: 'var(--space-2) 0' }}>
              {ITEMS.map((item, i) => (
                <div key={item.name}>
                  <div style={{
                    display: 'flex',
                    gap: 'var(--space-button-group-gap)',
                    padding: 'var(--space-card-pad) var(--space-panel-pad)',
                    alignItems: 'flex-start',
                  }}>
                    {/* Thumbnail */}
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--placeholder-bg)',
                      flexShrink: 0,
                    }} />
                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: 'var(--color-fg)', fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                        {item.name}
                      </p>
                      <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.75rem', marginBottom: 'var(--space-2)' }}>
                        {item.variant}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* Qty stepper */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-sm)',
                          overflow: 'hidden',
                        }}>
                          <button style={{ padding: 'var(--space-1) var(--space-2)', color: 'var(--color-fg)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                            <Minus size={12} />
                          </button>
                          <span style={{ padding: 'var(--space-1) var(--space-2)', color: 'var(--color-fg)', fontSize: '0.8125rem', fontWeight: 600, borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)' }}>
                            {item.qty}
                          </span>
                          <button style={{ padding: 'var(--space-1) var(--space-2)', color: 'var(--color-fg)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                            <Plus size={12} />
                          </button>
                        </div>
                        <span style={{ color: 'var(--color-fg)', fontSize: '0.9375rem', fontWeight: 700 }}>
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  {i < ITEMS.length - 1 && (
                    <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '0 var(--space-panel-pad)' }} />
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              padding: 'var(--space-card-pad) var(--space-panel-pad)',
              borderTop: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ color: 'var(--color-muted-fg)', fontSize: '0.875rem' }}>Subtotal</span>
                <span style={{ color: 'var(--color-fg)', fontSize: '0.875rem', fontWeight: 700 }}>$489.00</span>
              </div>
              <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.75rem', marginBottom: 'var(--space-card-pad)' }}>
                Shipping & taxes calculated at checkout
              </p>
              <button style={{
                width: '100%',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-fg)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-control-y) var(--space-control-x)',
                fontSize: '0.9375rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                marginBottom: 'var(--space-3)',
              }}>
                Checkout
              </button>
              <p style={{ textAlign: 'center' }}>
                <a href="#" onClick={e => e.preventDefault()} style={{ color: 'var(--color-primary)', fontSize: '0.875rem' }}>
                  Continue Shopping
                </a>
              </p>
            </div>
          </div>
        </div>
      </PreviewContentContainer>
    </section>
  )
}
