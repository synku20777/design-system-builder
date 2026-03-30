import { PreviewContentContainer } from './PreviewContentContainer'
import { PreviewProductCard, type ProductCardProps } from './PreviewProductCard'

const PRODUCTS: ProductCardProps[] = [
  // ── Standard cards ───────────────────────────────────────────
  {
    name: 'Merino Wool Sweater',
    price: '$128',
    originalPrice: '$160',
    rating: 4,
    reviews: 142,
    badge: 'Sale',
  },
  {
    name: 'Classic Leather Tote Bag with Premium Stitching and Brass Hardware',
    price: '$245',
    rating: 5,
    reviews: 89,
  },
  {
    name: 'Relaxed Linen Trousers',
    price: '$96',
    rating: 4,
    reviews: 67,
    badge: 'New',
  },

  // ── Detailed card with table, description & availability ─────
  {
    variant: 'detailed',
    name: 'Premium Italian Cashmere Blend Quarter-Zip Pullover — Limited Edition',
    price: '$348',
    originalPrice: '$430',
    rating: 5,
    reviews: 211,
    badge: 'Sale',
    description: 'Crafted from 100% Grade-A Italian cashmere with a brushed finish. Tailored fit, ribbed cuffs, and a quarter-zip closure.',
    specs: [
      { label: 'Material', value: '100% Cashmere' },
      { label: 'Fit', value: 'Slim / Tailored' },
      { label: 'Weight', value: '240 g' },
    ],
    availability: 'in-stock',
  },

  // ── Edge case: very short name ───────────────────────────────
  {
    name: 'Beanie',
    price: '$28',
    rating: 3,
    reviews: 12,
  },

  // ── Detailed card: low stock ─────────────────────────────────
  {
    variant: 'detailed',
    name: 'Hand-Dyed Indigo Selvedge Denim Jacket',
    price: '$395',
    rating: 4,
    reviews: 56,
    badge: 'New',
    description: 'Japanese selvedge denim, hand-dyed with natural indigo. Each piece develops unique fading patterns with wear.',
    specs: [
      { label: 'Origin', value: 'Japan' },
      { label: 'Denim', value: '14 oz selvedge' },
    ],
    availability: 'low-stock',
  },

  // ── Standard card ────────────────────────────────────────────
  {
    name: 'Oxford Button-Down Shirt',
    price: '$89',
    rating: 4,
    reviews: 334,
  },

  // ── Detailed card: out of stock ──────────────────────────────
  {
    variant: 'detailed',
    name: 'Archival Wool Overcoat',
    price: '$580',
    rating: 5,
    reviews: 18,
    description: 'A limited re-issue of our 2019 heritage overcoat in deadstock Scottish wool. Fully lined, peak lapel, three-button front.',
    specs: [
      { label: 'Material', value: 'Scottish wool' },
      { label: 'Lining', value: 'Bemberg' },
      { label: 'Buttons', value: 'Horn (3)' },
      { label: 'Edition', value: '1 of 50' },
    ],
    availability: 'out-of-stock',
  },
]

export function PreviewProductGrid() {
  return (
    <section style={{
      backgroundColor: 'var(--color-background)',
      fontFamily: 'var(--font-sans)',
    }}>
      <PreviewContentContainer>
        <div style={{ padding: 'var(--space-section-block) var(--space-section-inline)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-panel-pad)',
            gap: 'var(--space-stack-gap)',
            flexWrap: 'wrap',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-fg)',
              fontSize: '1.375rem',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              margin: 0,
            }}>
              Featured Products
            </h2>
            <span style={{
              color: 'var(--color-muted-fg)',
              fontSize: '0.8125rem',
            }}>
              {PRODUCTS.length} items
            </span>
          </div>

      {/*
        4 columns at ≥ 800px  (typical preview canvas),
        2 columns below that,
        1 column at very narrow widths.
        Using CSS grid with auto-fill + minmax for true responsiveness
        inside inline styles.
      */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'var(--space-grid-gap)',
      }}>
        {PRODUCTS.map((p, i) => (
          <PreviewProductCard key={i} {...p} />
        ))}
      </div>
        </div>
      </PreviewContentContainer>
    </section>
  )
}
