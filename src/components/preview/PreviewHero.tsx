import { ArrowRight } from 'lucide-react'

export function PreviewHero() {
  return (
    <section style={{
      backgroundColor: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border)',
      fontFamily: 'var(--font-sans)',
    }}>
      <div className="px-6 py-14 flex flex-col md:flex-row items-center gap-8 max-w-full">
        {/* Text content */}
        <div className="flex-1 space-y-0">
          <p style={{
            color: 'var(--color-primary)',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
          }}>
            New Collection
          </p>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-fg)',
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}>
            Elevate Your<br />Everyday Style
          </h1>
          <p style={{
            color: 'var(--color-muted-fg)',
            fontSize: '1rem',
            lineHeight: 1.6,
            maxWidth: '38ch',
            marginBottom: '1.5rem',
          }}>
            Discover curated pieces that blend timeless design with modern comfort. Free shipping on orders over $75.
          </p>
          <div className="flex items-center gap-3">
            <button
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-fg)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1.5rem',
                fontSize: '0.9375rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
              }}
            >
              Shop Now <ArrowRight size={16} />
            </button>
            <button
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-primary)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1.5rem',
                fontSize: '0.9375rem',
                fontWeight: 600,
                border: '1px solid var(--color-primary)',
                cursor: 'pointer',
              }}
            >
              View Lookbook
            </button>
          </div>
        </div>

        {/* Image placeholder */}
        <div style={{
          flexShrink: 0,
          width: '260px',
          height: '320px',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--placeholder-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-md)',
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted-fg)" strokeWidth="1" opacity="0.4">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
