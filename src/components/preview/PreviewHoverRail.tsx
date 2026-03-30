import { useEffect, useRef, useState, type FocusEvent, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function RailArrow({
  direction,
  disabled,
  visible,
  onClick,
}: {
  direction: 'left' | 'right'
  disabled: boolean
  visible: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={direction === 'left' ? 'Scroll left' : 'Scroll right'}
      onClick={onClick}
      className="hidden md:flex"
      style={{
        position: 'absolute',
        top: '50%',
        [direction]: 'var(--space-3)',
        transform: `translateY(-50%) translateX(${visible && !disabled ? '0' : direction === 'left' ? '-0.25rem' : '0.25rem'})`,
        width: '2.5rem',
        height: '2.5rem',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-icon-button)',
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        color: disabled ? 'var(--color-muted-fg)' : 'var(--color-fg)',
        boxShadow: 'var(--shadow-sm)',
        cursor: disabled ? 'default' : 'pointer',
        opacity: visible && !disabled ? 1 : 0,
        pointerEvents: visible && !disabled ? 'auto' : 'none',
        transition: 'opacity var(--duration-fast) var(--easing-default), transform var(--duration-fast) var(--easing-default)',
        zIndex: 1,
      }}
    >
      {direction === 'left' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  )
}

export function PreviewHoverRail({
  ariaLabel,
  children,
}: {
  ariaLabel: string
  children: ReactNode
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const sync = () => {
      setCanScrollLeft(rail.scrollLeft > 4)
      setCanScrollRight(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4)
    }

    sync()
    rail.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)

    return () => {
      rail.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [])

  function scrollByAmount(direction: 'left' | 'right') {
    const rail = railRef.current
    if (!rail) return

    rail.scrollBy({
      left: (direction === 'left' ? -1 : 1) * rail.clientWidth * 0.82,
      behavior: 'smooth',
    })
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    const nextTarget = event.relatedTarget as Node | null
    if (!nextTarget || !wrapperRef.current?.contains(nextTarget)) {
      setFocused(false)
    }
  }

  const controlsVisible = hovered || focused

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={handleBlur}
      style={{ position: 'relative' }}
    >
      <div
        ref={railRef}
        aria-label={ariaLabel}
        style={{
          display: 'flex',
          gap: 'var(--space-grid-gap)',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingBottom: 'var(--space-2)',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </div>

      <RailArrow direction="left" disabled={!canScrollLeft} visible={controlsVisible} onClick={() => scrollByAmount('left')} />
      <RailArrow direction="right" disabled={!canScrollRight} visible={controlsVisible} onClick={() => scrollByAmount('right')} />
    </div>
  )
}
