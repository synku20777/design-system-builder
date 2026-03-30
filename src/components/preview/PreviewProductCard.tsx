import { ShoppingCart, Star, Check, X, Info } from 'lucide-react'
import { useThemeStore } from '../../store/theme.store'

// ─── Shared types ──────────────────────────────────────────────

interface BaseProps {
  name: string
  price: string
  originalPrice?: string
  rating: number
  reviews: number
  badge?: string
  width?: string
}

// ─── Standard card ─────────────────────────────────────────────

export type StandardCardProps = BaseProps & { variant?: 'standard' }

// ─── Detailed card (table + description + availability) ────────

export interface SpecRow {
  label: string
  value: string
}

export type DetailedCardProps = BaseProps & {
  variant: 'detailed'
  description?: string
  specs?: SpecRow[]
  availability?: 'in-stock' | 'low-stock' | 'out-of-stock'
}

export type ProductCardProps = StandardCardProps | DetailedCardProps

// ─── Availability indicator ────────────────────────────────────

function Availability({
  status,
  compact = false,
}: {
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
  compact?: boolean
}) {
  const config = {
    'in-stock':    { label: 'In Stock', compactLabel: 'In Stock', dotColor: '#22c55e', icon: <Check size={10} /> },
    'low-stock':   { label: 'Low Stock — 3 left', dotColor: '#f59e0b', icon: <Info size={10} /> },
    'out-of-stock':{ label: 'Out of Stock', dotColor: 'var(--color-muted-fg)', icon: <X size={10} /> },
  }
  const c = config[status]
  const label = compact && status === 'low-stock' ? '3 Left' : c.label
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-control-gap)',
      fontSize: compact ? '0.6875rem' : '0.75rem',
      fontWeight: 500,
      color: status === 'out-of-stock' ? 'var(--color-muted-fg)' : 'var(--color-fg)',
      padding: compact ? 'var(--space-2) var(--space-3)' : 'var(--space-2) 0 0',
      whiteSpace: compact ? 'nowrap' : 'normal',
      borderRadius: compact ? 'var(--radius-md)' : undefined,
      border: compact ? '1px solid var(--color-border)' : undefined,
      backgroundColor: compact ? 'var(--color-surface-sunken)' : undefined,
      flexShrink: 0,
    }}>
      <span style={{
        width: '8px',
        height: '8px',
        borderRadius: 'var(--radius-pill)',
        backgroundColor: c.dotColor,
        flexShrink: 0,
        display: 'inline-block',
      }} />
      {c.icon}
      {label}
    </div>
  )
}

// ─── Spec table ────────────────────────────────────────────────

function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <table style={{
      width: '100%',
      fontSize: '0.75rem',
      borderCollapse: 'collapse',
      marginTop: 'var(--space-2)',
    }}>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.label} style={{
            borderBottom: i < rows.length - 1 ? '1px solid var(--color-border)' : 'none',
          }}>
            <td style={{
              color: 'var(--color-muted-fg)',
              padding: 'var(--space-1) var(--space-2) var(--space-1) 0',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              verticalAlign: 'top',
            }}>
              {row.label}
            </td>
            <td style={{
              color: 'var(--color-fg)',
              padding: 'var(--space-1) 0',
              textAlign: 'right',
            }}>
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ─── Card shell (shared wrapper) ───────────────────────────────

function CardShell({ width, children }: { width?: string; children: React.ReactNode }) {
  const cardBordersEnabled = useThemeStore(s => s.cardBordersEnabled)

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        border: cardBordersEnabled ? '1px solid var(--color-border)' : 'none',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans)',
        width: width ?? '100%',
        minWidth: 0,
        flexShrink: 0,
        transition: 'box-shadow var(--duration-base) var(--easing-default)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'var(--shadow-sm)')}
    >
      {children}
    </div>
  )
}

// ─── Image slot ────────────────────────────────────────────────

function CardImage({ badge }: { badge?: string }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '1 / 1',
      background: 'var(--placeholder-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted-fg)" strokeWidth="1" opacity="0.3">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
      {badge && (
        <span style={{
          position: 'absolute',
          top: '0.5rem',
          left: '0.5rem',
          backgroundColor: 'var(--color-secondary)',
          color: 'var(--color-secondary-fg)',
          borderRadius: 'var(--radius-pill)',
          padding: 'var(--space-badge-y) var(--space-badge-x)',
          fontSize: '0.6875rem',
          fontWeight: 600,
        }}>
          {badge}
        </span>
      )}
    </div>
  )
}

// ─── Title (with clamp for long names) ─────────────────────────

function CardTitle({ name }: { name: string }) {
  return (
    <p style={{
      color: 'var(--color-fg)',
      fontSize: '0.8125rem',
      fontWeight: 600,
      lineHeight: 1.35,
      marginBottom: 'var(--space-1)',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minHeight: 'calc(2 * 0.8125rem * 1.35)',
    }}>
      {name}
    </p>
  )
}

// ─── Price row ─────────────────────────────────────────────────

function CardPrice({ price, originalPrice }: { price: string; originalPrice?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-control-gap)', marginBottom: 'var(--space-1)', flexWrap: 'wrap' }}>
      <span style={{ color: 'var(--color-fg)', fontSize: '0.9375rem', fontWeight: 700 }}>{price}</span>
      {originalPrice && (
        <span style={{ color: 'var(--color-muted-fg)', fontSize: '0.8125rem', textDecoration: 'line-through' }}>
          {originalPrice}
        </span>
      )}
    </div>
  )
}

// ─── Rating row ────────────────────────────────────────────────

function CardRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(var(--space-1) / 2)', marginBottom: 'var(--space-3)' }}>
      {[1,2,3,4,5].map(i => (
        <Star
          key={i}
          size={11}
          fill={i <= rating ? 'var(--color-rating)' : 'transparent'}
          stroke={i <= rating ? 'var(--color-rating)' : 'var(--color-border)'}
        />
      ))}
      <span style={{ color: 'var(--color-muted-fg)', fontSize: '0.6875rem', marginLeft: 'var(--space-1)' }}>
        ({reviews})
      </span>
    </div>
  )
}

// ─── CTA button ────────────────────────────────────────────────

function CardCTA({ disabled = false, inline = false }: { disabled?: boolean; inline?: boolean }) {
  return (
    <button style={{
      width: '100%',
      backgroundColor: disabled ? 'var(--color-border)' : 'var(--color-primary)',
      color: disabled ? 'var(--color-muted-fg)' : 'var(--color-primary-fg)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-control-y) var(--space-control-x)',
      fontSize: '0.8125rem',
      fontWeight: 600,
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-control-gap)',
      marginTop: inline ? 0 : 'auto',
      opacity: disabled ? 0.6 : 1,
    }}>
      <ShoppingCart size={13} />
      {disabled ? 'Sold Out' : 'Add to Cart'}
    </button>
  )
}

// ─── Standard variant ──────────────────────────────────────────

function StandardCard(props: StandardCardProps) {
  return (
    <CardShell width={props.width}>
      <CardImage badge={props.badge} />
      <div style={{ padding: 'var(--space-card-pad)', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardTitle name={props.name} />
        <CardPrice price={props.price} originalPrice={props.originalPrice} />
        <CardRating rating={props.rating} reviews={props.reviews} />
        <CardCTA />
      </div>
    </CardShell>
  )
}

// ─── Detailed variant ──────────────────────────────────────────

function DetailedCard(props: DetailedCardProps) {
  const isOOS = props.availability === 'out-of-stock'
  return (
    <CardShell width={props.width}>
      <CardImage badge={props.badge} />
      <div style={{ padding: 'var(--space-card-pad)', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardTitle name={props.name} />
        <CardPrice price={props.price} originalPrice={props.originalPrice} />
        <CardRating rating={props.rating} reviews={props.reviews} />

        {/* Description (3-line clamp) */}
        {props.description && (
          <p style={{
            color: 'var(--color-muted-fg)',
            fontSize: '0.75rem',
            lineHeight: 1.5,
            marginBottom: 'var(--space-control-gap)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {props.description}
          </p>
        )}

        {/* Spec table */}
        {props.specs && props.specs.length > 0 && (
          <SpecTable rows={props.specs} />
        )}

        <div style={{ marginTop: 'auto' }}>
          {props.availability && (
            <Availability status={props.availability} />
          )}
          <CardCTA disabled={isOOS} inline />
        </div>
      </div>
    </CardShell>
  )
}

// ─── Exported polymorphic component ────────────────────────────

export function PreviewProductCard(props: ProductCardProps) {
  if (props.variant === 'detailed') return <DetailedCard {...props} />
  return <StandardCard {...props} />
}
