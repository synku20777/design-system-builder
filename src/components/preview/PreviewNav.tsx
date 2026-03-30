import { useRef, useState, type FocusEvent, type KeyboardEvent, type MouseEvent as ReactMouseEvent } from 'react'
import { ShoppingCart, Search, Menu, ChevronRight, ArrowLeft, X } from 'lucide-react'

interface MenuGroup {
  heading: string
  links: string[]
}

interface MenuFeature {
  eyebrow: string
  title: string
  copy: string
  cta: string
}

interface MenuSubcategory {
  id: string
  label: string
  description: string
  groups: MenuGroup[]
  feature: MenuFeature
}

interface MenuCategory {
  id: string
  label: string
  blurb: string
  subcategories: MenuSubcategory[]
}

const MENU: MenuCategory[] = [
  {
    id: 'women',
    label: 'Women',
    blurb: 'Soft tailoring, modern essentials, and event-ready pieces.',
    subcategories: [
      {
        id: 'women-new',
        label: 'New In',
        description: 'Fresh arrivals with a polished city wardrobe feel.',
        groups: [
          { heading: 'Shop New', links: ['Dresses', 'Tailoring', 'Knitwear'] },
          { heading: 'Trending', links: ['City Capsule', 'Weekend Layers', 'Editors Picks'] },
        ],
        feature: {
          eyebrow: 'Spring 26',
          title: 'The City Capsule',
          copy: 'Fluid outerwear, crisp shirting, and sharp separates for desk-to-dinner dressing.',
          cta: 'Explore the edit',
        },
      },
      {
        id: 'women-clothing',
        label: 'Clothing',
        description: 'Wardrobe building blocks across relaxed and elevated silhouettes.',
        groups: [
          { heading: 'Core Pieces', links: ['Shirts', 'Trousers', 'Denim'] },
          { heading: 'Occasion', links: ['Silk', 'Evening', 'Matching Sets'] },
        ],
        feature: {
          eyebrow: 'Wardrobe Icons',
          title: 'Modern Tailoring',
          copy: 'Relaxed blazers and soft pleats with enough structure for everyday polish.',
          cta: 'See tailoring',
        },
      },
      {
        id: 'women-occasion',
        label: 'Occasion',
        description: 'After-dark looks and polished finishing pieces.',
        groups: [
          { heading: 'Dress Codes', links: ['Wedding Guest', 'Cocktail', 'Black Tie'] },
          { heading: 'Finish The Look', links: ['Heels', 'Clutches', 'Jewelry'] },
        ],
        feature: {
          eyebrow: 'Event Season',
          title: 'After Dark',
          copy: 'Glossy fabrics, clean drape, and understated shine for refined evening dressing.',
          cta: 'Browse occasionwear',
        },
      },
    ],
  },
  {
    id: 'men',
    label: 'Men',
    blurb: 'Modern suiting, utility layers, and understated daily essentials.',
    subcategories: [
      {
        id: 'men-new',
        label: 'New In',
        description: 'The latest arrivals across smart and off-duty staples.',
        groups: [
          { heading: 'Fresh Drops', links: ['Overshirts', 'Polo Knits', 'Relaxed Trousers'] },
          { heading: 'Popular', links: ['Best Sellers', 'Travel Layers', 'Online Exclusives'] },
        ],
        feature: {
          eyebrow: 'New Season',
          title: 'Refined Utility',
          copy: 'Clean workwear references in washed cotton, brushed wool, and muted neutrals.',
          cta: 'Shop the drop',
        },
      },
      {
        id: 'men-tailoring',
        label: 'Tailoring',
        description: 'Relaxed structure for office, travel, and evening.',
        groups: [
          { heading: 'Suiting', links: ['Blazers', 'Trousers', 'Waistcoats'] },
          { heading: 'Shirting', links: ['Oxford', 'Poplin', 'Merino Layers'] },
        ],
        feature: {
          eyebrow: 'Desk To Dinner',
          title: 'Soft Suiting',
          copy: 'Unstructured jackets and fluid trousers that sharpen every dress code.',
          cta: 'See suiting',
        },
      },
      {
        id: 'men-weekend',
        label: 'Weekend',
        description: 'Easy knits, denim, and repeat-wear layers.',
        groups: [
          { heading: 'Everyday', links: ['T-Shirts', 'Sweatshirts', 'Joggers'] },
          { heading: 'Layering', links: ['Cardigans', 'Overshirts', 'Sneakers'] },
        ],
        feature: {
          eyebrow: 'Weekend Uniform',
          title: 'Textured Layers',
          copy: 'Loopback jersey, garment-dyed cotton, and tactile knits built for off-duty wear.',
          cta: 'Build the look',
        },
      },
    ],
  },
  {
    id: 'accessories',
    label: 'Accessories',
    blurb: 'Bags, jewelry, and finishing pieces with a quiet luxury attitude.',
    subcategories: [
      {
        id: 'accessories-bags',
        label: 'Bags',
        description: 'Structured carryalls, crossbodies, and travel-ready silhouettes.',
        groups: [
          { heading: 'Daily Carry', links: ['Totes', 'Shoulder Bags', 'Crossbody'] },
          { heading: 'Travel', links: ['Weekenders', 'Tech Organisers', 'Garment Bags'] },
        ],
        feature: {
          eyebrow: 'Leather Goods',
          title: 'Structured Carry',
          copy: 'Clean geometry and polished finishes with interiors designed for day-to-night use.',
          cta: 'Browse bags',
        },
      },
      {
        id: 'accessories-jewelry',
        label: 'Jewelry',
        description: 'Understated metals and sculptural details.',
        groups: [
          { heading: 'Everyday', links: ['Chains', 'Hoops', 'Signet Rings'] },
          { heading: 'Gift Ready', links: ['Under $100', 'Layering Sets', 'Keepsakes'] },
        ],
        feature: {
          eyebrow: 'Small Luxury',
          title: 'Polished Metals',
          copy: 'Minimal forms and warm finishes that elevate the simplest uniform.',
          cta: 'See jewelry',
        },
      },
      {
        id: 'accessories-travel',
        label: 'Travel',
        description: 'Organised accessories for movement and daily carry.',
        groups: [
          { heading: 'On The Move', links: ['Passport Holders', 'Packing Cubes', 'Cable Cases'] },
          { heading: 'Comfort', links: ['Scarves', 'Socks', 'Soft Layers'] },
        ],
        feature: {
          eyebrow: 'Transit Edit',
          title: 'Travel Light',
          copy: 'Compact accessories that keep essentials close without adding noise.',
          cta: 'Pack the set',
        },
      },
    ],
  },
  {
    id: 'sale',
    label: 'Sale',
    blurb: 'End-of-season reductions and last-chance pieces worth moving on quickly.',
    subcategories: [
      {
        id: 'sale-women',
        label: 'Women On Sale',
        description: 'Past-season hits and polished wardrobe staples.',
        groups: [
          { heading: 'Best Value', links: ['Dresses', 'Outerwear', 'Shoes'] },
          { heading: 'Final Sizes', links: ['XS', 'S', 'M'] },
        ],
        feature: {
          eyebrow: 'Last Chance',
          title: 'Archive Favorites',
          copy: 'Limited remaining sizes across standout silhouettes from the previous collection.',
          cta: 'Shop womens sale',
        },
      },
      {
        id: 'sale-men',
        label: 'Men On Sale',
        description: 'Smart layers, off-duty essentials, and discounted anchors.',
        groups: [
          { heading: 'Core Categories', links: ['Shirts', 'Knitwear', 'Footwear'] },
          { heading: 'Ending Soon', links: ['Low Stock', 'Final Markdowns', 'Last Sizes'] },
        ],
        feature: {
          eyebrow: 'Final Markdowns',
          title: 'Sharp Reductions',
          copy: 'Modern staples with clean lines and reduced pricing before they disappear.',
          cta: 'Shop mens sale',
        },
      },
      {
        id: 'sale-last-chance',
        label: 'Last Chance',
        description: 'The final edit of low-stock and end-of-line pieces.',
        groups: [
          { heading: 'Going Fast', links: ['Limited Sizes', 'One Left', 'Almost Gone'] },
          { heading: 'Buy Now', links: ['Best Sellers', 'Travel Light', 'Weekend Edit'] },
        ],
        feature: {
          eyebrow: 'Final Call',
          title: 'One More Look',
          copy: 'Low-stock best sellers and last-run pieces before the assortment turns over.',
          cta: 'See last chance',
        },
      },
    ],
  },
]

function preventNav(event: ReactMouseEvent<HTMLAnchorElement>) {
  event.preventDefault()
}

export function PreviewNav() {
  const desktopMenuRef = useRef<HTMLDivElement>(null)
  const desktopButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [desktopCategoryId, setDesktopCategoryId] = useState<string | null>(null)
  const [desktopSubcategoryId, setDesktopSubcategoryId] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileCategoryId, setMobileCategoryId] = useState<string | null>(null)
  const [mobileSubcategoryId, setMobileSubcategoryId] = useState<string | null>(null)

  const activeDesktopCategory = MENU.find(category => category.id === desktopCategoryId) ?? null
  const activeDesktopSubcategory = activeDesktopCategory?.subcategories.find(subcategory => subcategory.id === desktopSubcategoryId)
    ?? activeDesktopCategory?.subcategories[0]
    ?? null
  const activeMobileCategory = MENU.find(category => category.id === mobileCategoryId) ?? null
  const activeMobileSubcategory = activeMobileCategory?.subcategories.find(subcategory => subcategory.id === mobileSubcategoryId) ?? null

  function openDesktopCategory(categoryId: string) {
    const category = MENU.find(item => item.id === categoryId)
    if (!category) return
    setDesktopCategoryId(category.id)
    setDesktopSubcategoryId(category.subcategories[0]?.id ?? null)
  }

  function closeDesktopMenu(options?: { restoreFocus?: boolean }) {
    const activeId = desktopCategoryId
    setDesktopCategoryId(null)
    setDesktopSubcategoryId(null)

    if (options?.restoreFocus && activeId) {
      window.setTimeout(() => desktopButtonRefs.current[activeId]?.focus(), 0)
    }
  }

  function handleDesktopBlur(event: FocusEvent<HTMLDivElement>) {
    const nextTarget = event.relatedTarget as Node | null
    if (!nextTarget || !desktopMenuRef.current?.contains(nextTarget)) {
      closeDesktopMenu()
    }
  }

  function handleDesktopKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape' && desktopCategoryId) {
      event.preventDefault()
      closeDesktopMenu({ restoreFocus: true })
    }
  }

  function closeMobileMenu() {
    setMobileOpen(false)
    setMobileCategoryId(null)
    setMobileSubcategoryId(null)
  }

  function handleMobileKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeMobileMenu()
    }
  }

  function handleMobileBack() {
    if (mobileSubcategoryId) {
      setMobileSubcategoryId(null)
      return
    }

    if (mobileCategoryId) {
      setMobileCategoryId(null)
    }
  }

  return (
    <nav
      style={{
        backgroundColor: 'var(--color-background)',
        borderBottom: '1px solid var(--color-border)',
        fontFamily: 'var(--font-sans)',
      }}
      className="sticky top-0 z-20"
    >
      <div className="relative">
        <div className="flex items-center justify-between gap-4 px-6 h-16 max-w-full">
          <div
            ref={desktopMenuRef}
            className="flex items-center gap-6 flex-1 min-w-0"
            onMouseLeave={() => closeDesktopMenu()}
            onBlurCapture={handleDesktopBlur}
            onKeyDownCapture={handleDesktopKeyDown}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-fg)',
                fontWeight: 700,
                fontSize: '1.125rem',
                letterSpacing: '-0.02em',
                flexShrink: 0,
              }}
            >
              ARCANE
            </span>

            <div className="hidden md:flex items-center gap-1">
              {MENU.map(category => {
                const isActive = desktopCategoryId === category.id

                return (
                  <button
                    key={category.id}
                    ref={node => { desktopButtonRefs.current[category.id] = node }}
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded={isActive}
                    onMouseEnter={() => openDesktopCategory(category.id)}
                    onFocus={() => openDesktopCategory(category.id)}
                    onClick={() => isActive ? closeDesktopMenu() : openDesktopCategory(category.id)}
                    style={{
                      color: isActive ? 'var(--color-fg)' : 'var(--color-muted-fg)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: isActive ? 'var(--color-surface)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                    }}
                  >
                    {category.label}
                  </button>
                )
              })}
            </div>

            {activeDesktopCategory && activeDesktopSubcategory && (
              <div
                className="hidden md:grid"
                role="dialog"
                aria-label={`${activeDesktopCategory.label} mega menu`}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 1px)',
                  left: 0,
                  right: 0,
                  gridTemplateColumns: '220px minmax(0, 1fr) 240px',
                  gap: '1.5rem',
                  padding: '1.5rem',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderTop: 'none',
                  borderBottomLeftRadius: 'var(--radius-xl)',
                  borderBottomRightRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.375rem' }}>
                      {activeDesktopCategory.label}
                    </p>
                    <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                      {activeDesktopCategory.blurb}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {activeDesktopCategory.subcategories.map(subcategory => {
                      const isActive = activeDesktopSubcategory.id === subcategory.id

                      return (
                        <button
                          key={subcategory.id}
                          type="button"
                          onMouseEnter={() => setDesktopSubcategoryId(subcategory.id)}
                          onFocus={() => setDesktopSubcategoryId(subcategory.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '0.75rem',
                            padding: '0.75rem 0.875rem',
                            borderRadius: 'var(--radius-lg)',
                            border: 'none',
                            backgroundColor: isActive ? 'var(--color-surface-sunken)' : 'transparent',
                            color: isActive ? 'var(--color-fg)' : 'var(--color-muted-fg)',
                            textAlign: 'left',
                            cursor: 'pointer',
                          }}
                        >
                          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{subcategory.label}</span>
                          <ChevronRight size={14} />
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                    {activeDesktopSubcategory.description}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1.25rem 1.5rem' }}>
                    {activeDesktopSubcategory.groups.map(group => (
                      <div key={group.heading}>
                        <p style={{ color: 'var(--color-fg)', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.625rem' }}>
                          {group.heading}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {group.links.map(link => (
                            <a
                              key={link}
                              href="#"
                              onClick={event => {
                                preventNav(event)
                                closeDesktopMenu()
                              }}
                              style={{ color: 'var(--color-muted-fg)', fontSize: '0.875rem', textDecoration: 'none' }}
                            >
                              {link}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--color-secondary)',
                    color: 'var(--color-secondary-fg)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.625rem' }}>
                      {activeDesktopSubcategory.feature.eyebrow}
                    </p>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', lineHeight: 1.15, marginBottom: '0.75rem' }}>
                      {activeDesktopSubcategory.feature.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.6, opacity: 0.88 }}>
                      {activeDesktopSubcategory.feature.copy}
                    </p>
                  </div>

                  <a
                    href="#"
                    onClick={event => {
                      preventNav(event)
                      closeDesktopMenu()
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      color: 'inherit',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      marginTop: '1.5rem',
                    }}
                  >
                    {activeDesktopSubcategory.feature.cta}
                    <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="relative hidden sm:flex items-center">
              <Search size={14} style={{ color: 'var(--color-muted-fg)', position: 'absolute', left: '0.5rem' }} />
              <input
                placeholder="Search products..."
                style={{
                  backgroundColor: 'var(--color-surface-sunken)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--color-fg)',
                  fontSize: '0.8125rem',
                  padding: '0.375rem 0.75rem 0.375rem 1.75rem',
                  outline: 'none',
                  width: '180px',
                }}
                onFocus={event => {
                  event.currentTarget.style.boxShadow = '0 0 0 3px var(--ring-color)'
                  event.currentTarget.style.borderColor = 'var(--color-primary)'
                }}
                onBlur={event => {
                  event.currentTarget.style.boxShadow = 'none'
                  event.currentTarget.style.borderColor = 'var(--color-border)'
                }}
              />
            </div>

            <button type="button" style={{ color: 'var(--color-muted-fg)', position: 'relative' }} className="p-1.5 hover:opacity-80 transition-opacity">
              <ShoppingCart size={20} style={{ color: 'var(--color-fg)' }} />
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-fg)',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  minWidth: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                }}
              >
                3
              </span>
            </button>

            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-label="Open categories"
              onClick={() => setMobileOpen(true)}
              style={{ color: 'var(--color-fg)' }}
              className="md:hidden p-1.5"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            className="md:hidden"
            onKeyDownCapture={handleMobileKeyDown}
            style={{
              position: 'absolute',
              top: 'calc(100% + 1px)',
              left: 0,
              right: 0,
              height: 'calc(100vh - 4rem)',
              zIndex: 40,
            }}
          >
            <button
              type="button"
              aria-label="Close mobile menu overlay"
              onClick={closeMobileMenu}
              style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--overlay-bg)', border: 'none' }}
            />

            <div
              style={{
                position: 'relative',
                width: 'min(100%, 22rem)',
                height: '100%',
                backgroundColor: 'var(--color-surface)',
                borderRight: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-xl)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                {mobileCategoryId ? (
                  <button
                    type="button"
                    onClick={handleMobileBack}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: 'var(--color-fg)',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      padding: 0,
                      cursor: 'pointer',
                    }}
                  >
                    <ArrowLeft size={14} />
                    Back
                  </button>
                ) : (
                  <span style={{ width: '46px' }} />
                )}

                <div style={{ minWidth: 0, textAlign: 'center' }}>
                  <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                    Browse
                  </p>
                  <p style={{ color: 'var(--color-fg)', fontSize: '0.9375rem', fontWeight: 700 }}>
                    {activeMobileSubcategory?.label ?? activeMobileCategory?.label ?? 'Categories'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  style={{ border: 'none', backgroundColor: 'transparent', color: 'var(--color-fg)', cursor: 'pointer', padding: 0 }}
                  aria-label="Close mobile menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ overflowY: 'auto', padding: '0.75rem 1rem 1.25rem' }}>
                {!activeMobileCategory && (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {MENU.map(category => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => {
                          setMobileCategoryId(category.id)
                          setMobileSubcategoryId(null)
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          width: '100%',
                          padding: '0.875rem 0',
                          border: 'none',
                          borderBottom: '1px solid var(--color-border)',
                          backgroundColor: 'transparent',
                          textAlign: 'left',
                          cursor: 'pointer',
                        }}
                      >
                        <span style={{ minWidth: 0 }}>
                          <span style={{ display: 'block', color: 'var(--color-fg)', fontSize: '0.9375rem', fontWeight: 700 }}>
                            {category.label}
                          </span>
                          <span style={{ display: 'block', color: 'var(--color-muted-fg)', fontSize: '0.75rem', lineHeight: 1.5, marginTop: '0.25rem' }}>
                            {category.blurb}
                          </span>
                        </span>
                        <ChevronRight size={16} style={{ color: 'var(--color-muted-fg)', flexShrink: 0 }} />
                      </button>
                    ))}
                  </div>
                )}

                {activeMobileCategory && !activeMobileSubcategory && (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.8125rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                      {activeMobileCategory.blurb}
                    </p>

                    {activeMobileCategory.subcategories.map(subcategory => (
                      <button
                        key={subcategory.id}
                        type="button"
                        onClick={() => setMobileSubcategoryId(subcategory.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          width: '100%',
                          padding: '0.875rem 0',
                          border: 'none',
                          borderBottom: '1px solid var(--color-border)',
                          backgroundColor: 'transparent',
                          textAlign: 'left',
                          cursor: 'pointer',
                        }}
                      >
                        <span style={{ minWidth: 0 }}>
                          <span style={{ display: 'block', color: 'var(--color-fg)', fontSize: '0.875rem', fontWeight: 700 }}>
                            {subcategory.label}
                          </span>
                          <span style={{ display: 'block', color: 'var(--color-muted-fg)', fontSize: '0.75rem', lineHeight: 1.5, marginTop: '0.25rem' }}>
                            {subcategory.description}
                          </span>
                        </span>
                        <ChevronRight size={16} style={{ color: 'var(--color-muted-fg)', flexShrink: 0 }} />
                      </button>
                    ))}
                  </div>
                )}

                {activeMobileCategory && activeMobileSubcategory && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                      {activeMobileSubcategory.description}
                    </p>

                    {activeMobileSubcategory.groups.map(group => (
                      <div key={group.heading}>
                        <p style={{ color: 'var(--color-fg)', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.625rem' }}>
                          {group.heading}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                          {group.links.map(link => (
                            <a
                              key={link}
                              href="#"
                              onClick={event => {
                                preventNav(event)
                                closeMobileMenu()
                              }}
                              style={{ color: 'var(--color-muted-fg)', textDecoration: 'none', fontSize: '0.875rem' }}
                            >
                              {link}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-secondary-fg)', borderRadius: 'var(--radius-xl)', padding: '1rem' }}>
                      <p style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                        {activeMobileSubcategory.feature.eyebrow}
                      </p>
                      <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                        {activeMobileSubcategory.feature.title}
                      </p>
                      <p style={{ fontSize: '0.8125rem', lineHeight: 1.55, opacity: 0.88 }}>
                        {activeMobileSubcategory.feature.copy}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
