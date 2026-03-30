import { CreditCard, Lock } from 'lucide-react'
import { PreviewContentContainer } from './PreviewContentContainer'

function Field({ label, placeholder, type = 'text', half = false }: {
  label: string; placeholder: string; type?: string; half?: boolean
}) {
  return (
    <div style={{ gridColumn: half ? 'span 1' : 'span 2' }}>
      <label style={{
        display: 'block',
        color: 'var(--color-fg)',
        fontSize: '0.8125rem',
        fontWeight: 500,
        marginBottom: 'var(--space-control-gap)',
      }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        style={{
          width: '100%',
          backgroundColor: 'var(--color-surface-sunken)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--color-fg)',
          fontSize: '0.875rem',
          padding: 'var(--space-control-y) var(--space-control-x)',
          outline: 'none',
          boxSizing: 'border-box',
        }}
        onFocus={e => {
          e.currentTarget.style.borderColor = 'var(--color-primary)'
          e.currentTarget.style.boxShadow = '0 0 0 3px var(--ring-color)'
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = 'var(--color-border)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      />
    </div>
  )
}

export function PreviewCheckout() {
  return (
    <section style={{
      backgroundColor: 'var(--color-background)',
      borderTop: '1px solid var(--color-border)',
      fontFamily: 'var(--font-sans)',
    }}>
      <PreviewContentContainer>
        <div style={{ padding: 'var(--space-section-block) var(--space-section-inline)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-panel-pad)' }}>
            {/* Shipping form */}
            <div style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
              padding: 'var(--space-panel-pad)',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-fg)',
                fontSize: '0.9375rem',
                fontWeight: 700,
                marginBottom: 'var(--space-panel-pad)',
              }}>
                Shipping
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-field-gap)' }}>
                <Field label="First name" placeholder="Jane" half />
                <Field label="Last name" placeholder="Smith" half />
                <Field label="Email" placeholder="jane@example.com" type="email" />
                <Field label="Address" placeholder="123 Main Street" />
                <Field label="City" placeholder="New York" half />
                <Field label="ZIP" placeholder="10001" half />
              </div>
            </div>

            {/* Payment + summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-stack-gap)' }}>
              {/* Payment */}
              <div style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                padding: 'var(--space-panel-pad)',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-fg)',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  marginBottom: 'var(--space-panel-pad)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-control-gap)',
                }}>
                  <CreditCard size={16} /> Payment
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-field-gap)' }}>
                  <Field label="Card number" placeholder="4242 4242 4242 4242" />
                  <Field label="Name on card" placeholder="Jane Smith" />
                  <Field label="Expiry" placeholder="MM / YY" half />
                  <Field label="CVC" placeholder="123" half />
                </div>
              </div>

              {/* Order summary */}
              <div style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                padding: 'var(--space-panel-pad)',
                flex: 1,
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-fg)',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  marginBottom: 'var(--space-card-pad)',
                }}>
                  Order Summary
                </h3>
                {[['Subtotal', '$489.00'], ['Shipping', 'Free'], ['Tax', '$39.12']].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                    <span style={{ color: 'var(--color-muted-fg)', fontSize: '0.875rem' }}>{l}</span>
                    <span style={{ color: 'var(--color-fg)', fontSize: '0.875rem' }}>{v}</span>
                  </div>
                ))}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: 'var(--space-3)',
                  marginTop: 'var(--space-2)',
                  marginBottom: 'var(--space-card-pad)',
                }}>
                  <span style={{ color: 'var(--color-fg)', fontSize: '0.9375rem', fontWeight: 700 }}>Total</span>
                  <span style={{ color: 'var(--color-fg)', fontSize: '0.9375rem', fontWeight: 700 }}>$528.12</span>
                </div>
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-control-gap)',
                }}>
                  <Lock size={14} /> Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </PreviewContentContainer>
    </section>
  )
}
