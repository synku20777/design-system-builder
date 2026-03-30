import { ArrowRight } from 'lucide-react'
import { PreviewContentContainer } from './PreviewContentContainer'
import { PreviewHoverRail } from './PreviewHoverRail'
import { PreviewProductCard, type ProductCardProps } from './PreviewProductCard'
import { useThemeStore } from '../../store/theme.store'

const ITEMS: ProductCardProps[] = [
  {
    variant: 'detailed',
    name: 'Double-Faced Wool Wrap Coat',
    price: '$310',
    originalPrice: '$380',
    rating: 5,
    reviews: 84,
    badge: 'Experts Pick',
    description: 'A soft-shouldered outer layer our buyers keep pairing with monochrome tailoring and knit sets.',
    specs: [
      { label: 'Fabric', value: 'Wool Blend' },
      { label: 'Finish', value: 'Brushed' },
    ],
    availability: 'in-stock',
  },
  { name: 'Leather Column Tote', price: '$225', rating: 4, reviews: 56, badge: 'Top Rated' },
  { name: 'Cashmere Rib Scarf', price: '$92', rating: 5, reviews: 118 },
  {
    variant: 'detailed',
    name: 'Relaxed Merino Crewneck',
    price: '$138',
    rating: 4,
    reviews: 141,
    badge: 'New',
    description: 'The easy layering knit our studio reaches for when building polished travel looks.',
    specs: [
      { label: 'Gauge', value: '12 gg' },
      { label: 'Fit', value: 'Relaxed' },
    ],
    availability: 'low-stock',
  },
  { name: 'Minimal Leather Belt', price: '$68', rating: 4, reviews: 73 },
]

function BannerArtwork() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '220px',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, var(--color-secondary) 0%, var(--color-surface-raised) 52%, var(--color-primary) 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '14% auto auto 12%',
          width: '88px',
          height: '88px',
          borderRadius: '9999px',
          backgroundColor: 'var(--color-primary)',
          opacity: 0.2,
          filter: 'blur(2px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '8%',
          bottom: '10%',
          width: '104px',
          height: '104px',
          borderRadius: '9999px',
          backgroundColor: 'var(--color-secondary)',
          opacity: 0.24,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '13%',
          bottom: '12%',
          width: '46%',
          aspectRatio: '3 / 4',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          transform: 'rotate(-8deg)',
          padding: 'var(--space-card-pad)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-field-gap)',
        }}
      >
        <div style={{ height: '58%', borderRadius: 'var(--radius-md)', background: 'var(--placeholder-bg)' }} />
        <div style={{ height: '9px', width: '72%', borderRadius: '9999px', backgroundColor: 'var(--color-border)' }} />
        <div style={{ height: '9px', width: '52%', borderRadius: '9999px', backgroundColor: 'var(--color-border)' }} />
        <div
          style={{
            marginTop: 'auto',
            width: '44px',
            height: '18px',
            borderRadius: '9999px',
            backgroundColor: 'var(--color-primary)',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          right: '12%',
          top: '14%',
          width: '42%',
          aspectRatio: '3 / 4',
          backgroundColor: 'var(--color-surface-raised)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          transform: 'rotate(9deg)',
          padding: 'var(--space-card-pad)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-field-gap)',
        }}
      >
        <div style={{ height: '46%', borderRadius: 'var(--radius-md)', background: 'var(--placeholder-bg)' }} />
        <div style={{ height: '8px', width: '68%', borderRadius: '9999px', backgroundColor: 'var(--color-border)' }} />
        <div style={{ height: '8px', width: '56%', borderRadius: '9999px', backgroundColor: 'var(--color-border)' }} />
        <div style={{ display: 'flex', gap: 'var(--space-control-gap)', marginTop: 'auto' }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '9999px', backgroundColor: 'var(--color-secondary)' }} />
          <div style={{ width: '22px', height: '22px', borderRadius: '9999px', backgroundColor: 'var(--color-primary)' }} />
        </div>
      </div>
    </div>
  )
}

export function PreviewExpertSuggestions() {
  const cardBordersEnabled = useThemeStore(s => s.cardBordersEnabled)

  return (
    <section
      style={{
        backgroundColor: 'var(--color-background)',
        borderTop: '1px solid var(--color-border)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <PreviewContentContainer>
        <div style={{ padding: 'var(--space-section-block) var(--space-section-inline)' }}>
          <div className="grid md:grid-cols-[18rem_minmax(0,1fr)]" style={{ gap: 'var(--space-grid-gap)' }}>
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                border: cardBordersEnabled ? '1px solid var(--color-border)' : 'none',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-md)',
                padding: 'var(--space-panel-pad)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minWidth: 0,
              }}
            >
              <div>
                <p
                  style={{
                    color: 'var(--color-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Experts Suggestions
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-fg)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  Pieces our buyers keep reaching for.
                </h2>
                <p
                  style={{
                    color: 'var(--color-muted-fg)',
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    marginBottom: 'var(--space-card-pad)',
                  }}
                >
                  Built around polished layers, tactile fabrics, and accessories that sharpen a look without overworking it.
                </p>
                <button
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-fg)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-control-y) var(--space-control-x)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-control-gap)',
                  }}
                >
                  Shop Expert Picks
                  <ArrowRight size={14} />
                </button>
              </div>

              <div style={{ marginTop: 'var(--space-panel-pad)' }}>
                <BannerArtwork />
              </div>
            </div>

            <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 'var(--space-stack-gap)',
                  flexWrap: 'wrap',
                  marginBottom: 'var(--space-card-pad)',
                }}
              >
                <div>
                  <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-1)' }}>
                    Curated Rail
                  </p>
                  <p style={{ color: 'var(--color-fg)', fontSize: '0.9375rem', fontWeight: 700 }}>
                    Editorial picks from the Arcane buying team
                  </p>
                </div>
                <span style={{ color: 'var(--color-muted-fg)', fontSize: '0.8125rem' }}>
                  {ITEMS.length} picks
                </span>
              </div>

              <PreviewHoverRail ariaLabel="Experts Suggestions products">
                {ITEMS.map((item, index) => (
                  <div key={index} style={{ scrollSnapAlign: 'start', flexShrink: 0, width: '220px' }}>
                    <PreviewProductCard {...item} width="220px" />
                  </div>
                ))}
              </PreviewHoverRail>
            </div>
          </div>
        </div>
      </PreviewContentContainer>
    </section>
  )
}
