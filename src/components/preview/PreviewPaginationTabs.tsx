import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PreviewContentContainer } from './PreviewContentContainer'

const TABS = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Accessories']
const SEGMENTED_TABS = ['Product Description', 'Leasing']
const PAGES = [1, 2, 3, 4, 5]

export function PreviewPaginationTabs() {
  const [activeTab, setActiveTab] = useState('All')
  const [activeSegmentedTab, setActiveSegmentedTab] = useState('Product Description')
  const [activePage, setActivePage] = useState(2)

  return (
    <section style={{
      backgroundColor: 'var(--color-background)',
      borderTop: '1px solid var(--color-border)',
      fontFamily: 'var(--font-sans)',
    }}>
      {/* Tabs */}
      <div style={{ borderBottom: '1px solid var(--color-border)' }}>
        <PreviewContentContainer>
          <div style={{
            padding: '0 var(--space-section-inline)',
            display: 'flex',
            gap: '0',
          }}>
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  color: activeTab === tab ? 'var(--color-fg)' : 'var(--color-muted-fg)',
                  fontSize: '0.875rem',
                  fontWeight: activeTab === tab ? 600 : 400,
                  padding: 'var(--space-3) var(--space-4)',
                  border: 'none',
                  borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  marginBottom: '-1px',
                  transition: 'color var(--duration-fast) var(--easing-default)',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </PreviewContentContainer>
      </div>

      <PreviewContentContainer>
        <div style={{ padding: 'var(--space-panel-pad) var(--space-section-inline)', display: 'grid', gap: 'var(--space-panel-pad)' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '34rem',
              padding: 'var(--space-1)',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 'var(--space-1)',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--color-surface-sunken)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              {SEGMENTED_TABS.map(tab => {
                const active = activeSegmentedTab === tab
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveSegmentedTab(tab)}
                    style={{
                      minHeight: '4.25rem',
                      padding: 'var(--space-card-pad) var(--space-panel-pad)',
                      border: 'none',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: active ? 'var(--color-primary)' : 'transparent',
                      color: active ? 'var(--color-primary-fg)' : 'var(--color-fg)',
                      fontSize: 'clamp(1rem, 1vw, 1.125rem)',
                      fontWeight: active ? 600 : 500,
                      letterSpacing: '-0.02em',
                      cursor: 'pointer',
                      transition: 'background-color var(--duration-base) var(--easing-default), color var(--duration-base) var(--easing-default)',
                    }}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-1)',
          }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.25rem',
              height: '2.25rem',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-icon-button)',
              backgroundColor: 'var(--color-surface)',
              color: activePage === 1 ? 'var(--color-muted-fg)' : 'var(--color-fg)',
              cursor: activePage === 1 ? 'default' : 'pointer',
              opacity: activePage === 1 ? 0.4 : 1,
              boxShadow: 'var(--shadow-sm)',
            }}>
              <ChevronLeft size={14} />
            </button>

            {PAGES.map(page => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                style={{
                  width: '32px',
                  height: '32px',
                  border: `1px solid ${activePage === page ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: activePage === page ? 'var(--color-primary)' : 'transparent',
                  color: activePage === page ? 'var(--color-primary-fg)' : 'var(--color-fg)',
                  fontSize: '0.875rem',
                  fontWeight: activePage === page ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all var(--duration-base) var(--easing-default)',
                }}
              >
                {page}
              </button>
            ))}

            <button style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.25rem',
              height: '2.25rem',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-icon-button)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-fg)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </PreviewContentContainer>
    </section>
  )
}
