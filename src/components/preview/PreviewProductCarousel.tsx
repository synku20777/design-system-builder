import { PreviewProductCard, type ProductCardProps } from './PreviewProductCard'
import { PreviewContentContainer } from './PreviewContentContainer'
import { PreviewHoverRail } from './PreviewHoverRail'

const ITEMS: ProductCardProps[] = [
  { name: 'Silk Slip Dress', price: '$178', rating: 5, reviews: 93, badge: 'New' },
  {
    variant: 'detailed',
    name: 'Tailored Wool-Blend Blazer with Peak Lapel and Interior Pocket',
    price: '$225',
    originalPrice: '$280',
    rating: 4,
    reviews: 56,
    badge: 'Sale',
    description: 'Year-round weight. Half-canvas construction with working cuff buttons.',
    specs: [
      { label: 'Fabric', value: 'Wool / Poly' },
      { label: 'Fit', value: 'Regular' },
    ],
    availability: 'low-stock',
  },
  { name: 'Linen Co-ord Set', price: '$145', rating: 4, reviews: 78 },
  { name: 'Knit Cardigan', price: '$98', rating: 5, reviews: 187, badge: 'New' },
  { name: 'Wide Leg Jeans', price: '$115', rating: 4, reviews: 202 },
  { name: 'Wrap Midi Skirt', price: '$88', originalPrice: '$110', rating: 3, reviews: 41, badge: 'Sale' },
]

export function PreviewProductCarousel() {
  return (
    <section style={{
      backgroundColor: 'var(--color-background)',
      borderTop: '1px solid var(--color-border)',
      fontFamily: 'var(--font-sans)',
    }}>
      <PreviewContentContainer>
        <div style={{ padding: 'var(--space-section-block) var(--space-section-inline)' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-fg)',
            fontSize: '1.375rem',
            fontWeight: 700,
            marginBottom: 'var(--space-card-pad)',
            letterSpacing: '-0.01em',
          }}>
            You Might Also Like
          </h2>

          <PreviewHoverRail ariaLabel="You Might Also Like products">
            {ITEMS.map((item, i) => (
              <div key={i} style={{ scrollSnapAlign: 'start', flexShrink: 0, width: '220px' }}>
                <PreviewProductCard {...item} width="220px" />
              </div>
            ))}
          </PreviewHoverRail>
        </div>
      </PreviewContentContainer>
    </section>
  )
}
