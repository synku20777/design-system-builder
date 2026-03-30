import { Heart, Star } from 'lucide-react'
import { useState } from 'react'
import { PreviewContentContainer } from './PreviewContentContainer'

const TABS = ['Description', 'Reviews', 'Shipping']

export function PreviewProductDetail() {
  const [activeTab, setActiveTab] = useState('Description')

  return (
    <section style={{
      backgroundColor: 'var(--color-background)',
      fontFamily: 'var(--font-sans)',
    }}>
      <PreviewContentContainer>
        <div style={{ padding: 'var(--space-section-block) var(--space-section-inline)' }}>
          <div style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-panel-pad)',
            boxShadow: 'var(--shadow-md)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-8)',
          }}>
        {/* Image column */}
            <div>
              <div style={{
                height: '260px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--placeholder-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-3)',
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted-fg)" strokeWidth="1" opacity="0.35">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                </svg>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                {[0,1,2].map(i => (
                  <div
                    key={i}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--placeholder-bg)',
                      border: i === 0 ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Info column */}
            <div>
              <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-control-gap)' }}>
                Arcane Studio
              </p>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-fg)',
                fontSize: '1.375rem',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                marginBottom: 'var(--space-2)',
              }}>
                Premium Merino Wool Coat
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-button-group-gap)', marginBottom: 'var(--space-card-pad)' }}>
                <span style={{ color: 'var(--color-primary)', fontSize: '1.375rem', fontWeight: 700 }}>$348</span>
                <span style={{ color: 'var(--color-muted-fg)', fontSize: '1rem', textDecoration: 'line-through' }}>$430</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(var(--space-1) / 2)' }}>
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={12} fill={i <= 4 ? 'var(--color-rating)' : 'transparent'} stroke={i <= 4 ? 'var(--color-rating)' : 'var(--color-border)'} />
                  ))}
                  <span style={{ color: 'var(--color-muted-fg)', fontSize: '0.75rem', marginLeft: 'var(--space-1)' }}>(214)</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-button-group-gap)', marginBottom: 'var(--space-panel-pad)' }}>
                <button style={{
                  flex: 1,
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-fg)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-control-y) var(--space-control-x)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}>
                  Add to Cart
                </button>
                <button style={{
                  flex: 1,
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-secondary-fg)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-control-y) var(--space-control-x)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-control-gap)',
                }}>
                  <Heart size={14} /> Wishlist
                </button>
              </div>

              {/* Tabs */}
              <div style={{ borderBottom: '1px solid var(--color-border)', display: 'flex', gap: 'var(--space-6)', marginBottom: 'var(--space-card-pad)' }}>
                {TABS.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      color: activeTab === tab ? 'var(--color-fg)' : 'var(--color-muted-fg)',
                      fontSize: '0.875rem',
                      fontWeight: activeTab === tab ? 600 : 400,
                      padding: 'var(--space-2) 0',
                      border: 'none',
                      borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      marginBottom: '-1px',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                Crafted from 100% ethically sourced Merino wool. This timeless coat features a tailored silhouette, satin lining, and polished horn buttons.
              </p>
            </div>
          </div>
        </div>
      </PreviewContentContainer>
    </section>
  )
}
