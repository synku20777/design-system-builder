import { useRef, useState, type FocusEvent, type KeyboardEvent, type MouseEvent as ReactMouseEvent } from 'react'
import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { PreviewContentContainer, PREVIEW_CONTENT_MAX_WIDTH } from './PreviewContentContainer'
import { useThemeStore } from '../../store/theme.store'

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

interface HeroContent {
  eyebrow: string
  title: string
  copy: string
  cta: string
  accent: string
  glow: string
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
  hero: HeroContent
  subcategories: MenuSubcategory[]
}

interface BrandLogo {
  id: string
  name: string
  descriptor: string
  accent: string
  glow: string
}

const MENU: MenuCategory[] = [
  {
    id: 'featured',
    label: 'Featured',
    blurb: 'Fresh layouts and launch-week stories.',
    hero: {
      eyebrow: 'New Season',
      title: 'A Hero Layout With Retail Weight',
      copy: 'Lead with a large promotional moment, keep the categories on the left, and let the search and utility rows frame the whole storefront.',
      cta: 'Shop the hero',
      accent: '#ca5837',
      glow: 'rgba(241, 181, 150, 0.7)',
    },
    subcategories: [
      {
        id: 'featured-showroom',
        label: 'Showroom Edit',
        description: 'High-visibility picks staged like a clean showroom wall.',
        groups: [
          { heading: 'Browse', links: ['Launch Picks', 'Warm Woods', 'Soft Forms'] },
          { heading: 'Popular', links: ['Editors Note', 'Top Finds', 'New Mix'] },
        ],
        feature: {
          eyebrow: 'Showroom Edit',
          title: 'Front Of Store',
          copy: 'A focused assortment for the first impression.',
          cta: 'Explore the edit',
        },
      },
      {
        id: 'featured-living',
        label: 'Living Room',
        description: 'Soft seating, low tables, and layered lighting.',
        groups: [
          { heading: 'Core', links: ['Sofas', 'Coffee Tables', 'Lighting'] },
          { heading: 'Style', links: ['Stone', 'Oak', 'Textiles'] },
        ],
        feature: {
          eyebrow: 'Living Room',
          title: 'Everyday Centerpieces',
          copy: 'Clean shapes that still feel warm and premium.',
          cta: 'Shop living room',
        },
      },
      {
        id: 'featured-dining',
        label: 'Dining',
        description: 'Statement tables and hosting pieces with calm styling.',
        groups: [
          { heading: 'Furniture', links: ['Dining Tables', 'Dining Chairs', 'Sideboards'] },
          { heading: 'Hosting', links: ['Serveware', 'Lamps', 'Centerpieces'] },
        ],
        feature: {
          eyebrow: 'Dining',
          title: 'Set The Scene',
          copy: 'A composed story from table to finishing touches.',
          cta: 'Browse dining',
        },
      },
      {
        id: 'featured-bedroom',
        label: 'Bedroom',
        description: 'Quiet textures and softer lines for slower rooms.',
        groups: [
          { heading: 'Furniture', links: ['Beds', 'Nightstands', 'Dressers'] },
          { heading: 'Layers', links: ['Linen', 'Throws', 'Ambient Lights'] },
        ],
        feature: {
          eyebrow: 'Bedroom',
          title: 'Soft Geometry',
          copy: 'Muted contrast for a calmer room story.',
          cta: 'Refresh the room',
        },
      },
      {
        id: 'featured-office',
        label: 'Workspace',
        description: 'Functional pieces that keep the palette clean.',
        groups: [
          { heading: 'Work', links: ['Desks', 'Desk Chairs', 'Shelving'] },
          { heading: 'Finish', links: ['Task Lights', 'Storage', 'Art'] },
        ],
        feature: {
          eyebrow: 'Workspace',
          title: 'Modern Utility',
          copy: 'Sharper forms with a lighter footprint.',
          cta: 'See workspace',
        },
      },
    ],
  },
  {
    id: 'collections',
    label: 'Collections',
    blurb: 'Grouped looks built around one clear mood.',
    hero: {
      eyebrow: 'Styled Rooms',
      title: 'One Banner, Multiple Entry Points',
      copy: 'Use the large image area to tell one strong visual story while the rail and tabs keep the rest of the assortment easy to scan.',
      cta: 'View collections',
      accent: '#85724d',
      glow: 'rgba(233, 214, 166, 0.72)',
    },
    subcategories: [
      {
        id: 'collections-city',
        label: 'City Minimal',
        description: 'Architectural shapes and toned-down contrast.',
        groups: [
          { heading: 'Key Pieces', links: ['Modular Seating', 'Stone Tables', 'Tall Storage'] },
          { heading: 'Palette', links: ['Smoke', 'Cream', 'Walnut'] },
        ],
        feature: {
          eyebrow: 'City Minimal',
          title: 'Quiet Structure',
          copy: 'A cleaner room story for a sharper storefront feel.',
          cta: 'Shop city minimal',
        },
      },
      {
        id: 'collections-soft',
        label: 'Soft Modern',
        description: 'Rounded forms and warmer materials.',
        groups: [
          { heading: 'Furniture', links: ['Curved Chairs', 'Round Tables', 'Benches'] },
          { heading: 'Notes', links: ['Clay', 'Linen', 'Oak'] },
        ],
        feature: {
          eyebrow: 'Soft Modern',
          title: 'Rounded Warmth',
          copy: 'An easier mood with the same premium finish.',
          cta: 'Explore soft modern',
        },
      },
      {
        id: 'collections-gallery',
        label: 'Gallery Wall',
        description: 'Statement surfaces, art-led accents, and stronger silhouettes.',
        groups: [
          { heading: 'Display', links: ['Console Tables', 'Mirrors', 'Wall Art'] },
          { heading: 'Accents', links: ['Sculpture', 'Ceramics', 'Books'] },
        ],
        feature: {
          eyebrow: 'Gallery Wall',
          title: 'Visual Anchors',
          copy: 'Use focal pieces to give the page more attitude.',
          cta: 'See gallery wall',
        },
      },
      {
        id: 'collections-hosting',
        label: 'Hosting Ready',
        description: 'Layouts built for gathering and easy movement.',
        groups: [
          { heading: 'Entertain', links: ['Extendable Tables', 'Stools', 'Bar Carts'] },
          { heading: 'Atmosphere', links: ['Candles', 'Portable Lamps', 'Serveware'] },
        ],
        feature: {
          eyebrow: 'Hosting Ready',
          title: 'Made To Gather',
          copy: 'A layout that helps shoppers imagine the whole room.',
          cta: 'Build the room',
        },
      },
      {
        id: 'collections-retreat',
        label: 'Calm Retreat',
        description: 'Low-contrast styling and softer finishing touches.',
        groups: [
          { heading: 'Wind Down', links: ['Textiles', 'Low Lighting', 'Storage'] },
          { heading: 'Materials', links: ['Boucle', 'Linen', 'Ceramic'] },
        ],
        feature: {
          eyebrow: 'Calm Retreat',
          title: 'A Softer Tempo',
          copy: 'Still editorial, just slower and quieter.',
          cta: 'Create the retreat',
        },
      },
    ],
  },
  {
    id: 'best-sellers',
    label: 'Best Sellers',
    blurb: 'High-converting anchors and familiar winners.',
    hero: {
      eyebrow: 'Top Picks',
      title: 'A Screenshot-Style Hero That Still Sells',
      copy: 'The layout can stay editorial while the content points toward proven products, repeated winners, and easy value signals.',
      cta: 'Shop best sellers',
      accent: '#49637d',
      glow: 'rgba(147, 191, 222, 0.72)',
    },
    subcategories: [
      {
        id: 'best-sellers-icons',
        label: 'Icon Pieces',
        description: 'The products shoppers already know and trust.',
        groups: [
          { heading: 'Signature', links: ['Studio Sofa', 'Gallery Lamp', 'Stone Console'] },
          { heading: 'Winners', links: ['Most Saved', 'Most Shared', 'Always In Cart'] },
        ],
        feature: {
          eyebrow: 'Icon Pieces',
          title: 'Reliable Pull',
          copy: 'Lead with what repeatedly works.',
          cta: 'Shop icon pieces',
        },
      },
      {
        id: 'best-sellers-lighting',
        label: 'Lighting',
        description: 'Popular fixtures that set the tone quickly.',
        groups: [
          { heading: 'Ambient', links: ['Floor Lamps', 'Pendants', 'Portable Lights'] },
          { heading: 'Finish', links: ['Brass', 'Glass', 'Stone Bases'] },
        ],
        feature: {
          eyebrow: 'Lighting',
          title: 'Warm Glow Staples',
          copy: 'Fast clarity for one of the easiest add-on categories.',
          cta: 'Shop lighting',
        },
      },
      {
        id: 'best-sellers-storage',
        label: 'Storage',
        description: 'Utility pieces presented with better proportions.',
        groups: [
          { heading: 'Organize', links: ['Cabinets', 'Shelves', 'Media Units'] },
          { heading: 'Materials', links: ['Soft Black', 'Oak Grain', 'Mixed Surfaces'] },
        ],
        feature: {
          eyebrow: 'Storage',
          title: 'Quiet Utility',
          copy: 'Practical products with less visual drag.',
          cta: 'Browse storage',
        },
      },
      {
        id: 'best-sellers-entry',
        label: 'Entryway',
        description: 'Small-footprint essentials for the first room in the home.',
        groups: [
          { heading: 'First Impression', links: ['Consoles', 'Mirrors', 'Benches'] },
          { heading: 'Add Ons', links: ['Hooks', 'Baskets', 'Catchalls'] },
        ],
        feature: {
          eyebrow: 'Entryway',
          title: 'Arrive In Style',
          copy: 'Compact pieces with strong visual return.',
          cta: 'Style the entry',
        },
      },
      {
        id: 'best-sellers-outdoor',
        label: 'Outdoor',
        description: 'Durable pieces that still feel like the same brand.',
        groups: [
          { heading: 'Outdoor Living', links: ['Lounge Chairs', 'Lanterns', 'Planters'] },
          { heading: 'Seasonal', links: ['Terrace Edit', 'Weatherproof Textiles', 'Side Tables'] },
        ],
        feature: {
          eyebrow: 'Outdoor',
          title: 'Open-Air Essentials',
          copy: 'Keep the same polish outside.',
          cta: 'Shop outdoor',
        },
      },
    ],
  },
  {
    id: 'sale',
    label: 'Sale',
    blurb: 'Promotions, markdowns, and urgency-led stories.',
    hero: {
      eyebrow: 'Limited Window',
      title: 'Promotional Weight Without Visual Noise',
      copy: 'The same layout can handle urgency. Keep the image broad, the tabs clear, and the copy direct when the goal shifts toward conversion.',
      cta: 'Shop the sale',
      accent: '#c94432',
      glow: 'rgba(243, 161, 141, 0.72)',
    },
    subcategories: [
      {
        id: 'sale-last-chance',
        label: 'Last Chance',
        description: 'Low-stock pieces and final markdowns.',
        groups: [
          { heading: 'Ending Soon', links: ['Final Sizes', 'Low Stock', 'Clearance Picks'] },
          { heading: 'Move Fast', links: ['Best Value', 'Top Discounted', 'Archive Finds'] },
        ],
        feature: {
          eyebrow: 'Last Chance',
          title: 'Final Markdowns',
          copy: 'A clean path for urgency-led browsing.',
          cta: 'See final markdowns',
        },
      },
      {
        id: 'sale-living',
        label: 'Living Room Sale',
        description: 'Popular living-room offers staged in one place.',
        groups: [
          { heading: 'Offers', links: ['Sofas', 'Rugs', 'Coffee Tables'] },
          { heading: 'Pair With', links: ['Lighting', 'Mirrors', 'Decor'] },
        ],
        feature: {
          eyebrow: 'Living Room Sale',
          title: 'Save On The Staples',
          copy: 'Promotions that still feel edited and premium.',
          cta: 'Browse living room sale',
        },
      },
      {
        id: 'sale-bedroom',
        label: 'Bedroom Sale',
        description: 'Textiles and furniture markdowns with a softer tone.',
        groups: [
          { heading: 'Offers', links: ['Beds', 'Dressers', 'Bedding'] },
          { heading: 'Finish The Room', links: ['Lamps', 'Art', 'Benches'] },
        ],
        feature: {
          eyebrow: 'Bedroom Sale',
          title: 'Rest Easy, Spend Less',
          copy: 'Promotion without losing the room mood.',
          cta: 'Shop bedroom sale',
        },
      },
      {
        id: 'sale-bundles',
        label: 'Bundle Offers',
        description: 'Grouped promotions for faster cart building.',
        groups: [
          { heading: 'Bundles', links: ['Living Sets', 'Dining Pairs', 'Lighting Bundles'] },
          { heading: 'Offer Type', links: ['Set Pricing', 'Add-On Savings', '2 for 1'] },
        ],
        feature: {
          eyebrow: 'Bundle Offers',
          title: 'Better Together',
          copy: 'Give shoppers a bigger answer in one tap.',
          cta: 'See bundle offers',
        },
      },
      {
        id: 'sale-clearance',
        label: 'Clearance',
        description: 'End-of-line pieces that need a cleaner browse path.',
        groups: [
          { heading: 'Clearance', links: ['One-Off Pieces', 'Warehouse Finds', 'Final Inventory'] },
          { heading: 'Value', links: ['Tables', 'Storage', 'Lighting'] },
        ],
        feature: {
          eyebrow: 'Clearance',
          title: 'Warehouse Exits',
          copy: 'Reduced stock with better presentation discipline.',
          cta: 'Shop clearance',
        },
      },
    ],
  },
]

const DEFAULT_CATEGORY = MENU[0]

const BRANDS: BrandLogo[] = [
  { id: 'northline', name: 'Northline', descriptor: 'Studio Goods', accent: '#c4663f', glow: 'rgba(196, 102, 63, 0.18)' },
  { id: 'monarch', name: 'Monarch', descriptor: 'Home Objects', accent: '#4d6783', glow: 'rgba(77, 103, 131, 0.18)' },
  { id: 'atelier', name: 'Atelier 9', descriptor: 'Edition', accent: '#7f7257', glow: 'rgba(127, 114, 87, 0.18)' },
  { id: 'valen', name: 'Valen', descriptor: 'Modern Living', accent: '#395e61', glow: 'rgba(57, 94, 97, 0.18)' },
  { id: 'cedar', name: 'Cedar House', descriptor: 'Crafted Forms', accent: '#8b5f46', glow: 'rgba(139, 95, 70, 0.18)' },
  { id: 'halden', name: 'Halden', descriptor: 'Room System', accent: '#555f74', glow: 'rgba(85, 95, 116, 0.18)' },
]

function preventNav(event: ReactMouseEvent<HTMLAnchorElement>) {
  event.preventDefault()
}

function getCategory(categoryId: string | null) {
  return MENU.find(category => category.id === categoryId) ?? DEFAULT_CATEGORY
}

function SearchField({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative flex items-center w-full">
      <Search size={18} style={{ color: 'var(--color-muted-fg)', position: 'absolute', left: '1rem', zIndex: 1 }} />
      <input
        placeholder={placeholder}
        style={{
          width: '100%',
          backgroundColor: 'var(--color-surface-sunken)',
          border: '1px solid var(--color-border)',
          borderRadius: '999px',
          color: 'var(--color-fg)',
          fontSize: '1rem',
          padding: 'var(--space-control-y) var(--space-5) var(--space-control-y) calc(var(--space-10) + var(--space-1))',
          outline: 'none',
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
  )
}

function HeroArtwork({ accent, glow }: { accent: string, glow: string }) {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(112deg, #ddd4c5 0%, #d7c7aa 34%, #a27e4d 62%, #6b512f 100%)' }} />
      <div style={{ position: 'absolute', inset: '0 57% 0 0', background: `radial-gradient(circle at 34% 26%, ${glow} 0%, rgba(255,255,255,0.18) 20%, rgba(147,151,118,0.34) 50%, rgba(80,89,64,0.74) 100%)`, filter: 'blur(2px)' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: '27%', width: '58%', background: 'linear-gradient(90deg, rgba(247,235,208,0.64) 0%, rgba(184,146,91,0.88) 10%, rgba(130,96,55,0.98) 100%)' }} />
      <div style={{ position: 'absolute', top: '11%', right: '27%', width: '22%', height: '50%', borderRadius: '18px 18px 10px 10px', background: 'linear-gradient(180deg, #1d1f24 0%, #08090b 100%)' }} />
      <div style={{ position: 'absolute', top: '11%', right: '4%', width: '22%', height: '50%', borderRadius: '18px 18px 10px 10px', background: 'linear-gradient(180deg, #16181d 0%, #050507 100%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: '15%', right: '-3%', height: '28%', background: 'linear-gradient(180deg, rgba(239,232,215,0.97) 0%, rgba(217,197,156,0.98) 100%)', borderTopLeftRadius: '160px' }} />
      <div style={{ position: 'absolute', bottom: '12%', left: '35%', width: '5.5%', height: '21%', borderRadius: '18px', background: 'linear-gradient(180deg, #2b2f38 0%, #13151a 100%)', transform: 'rotate(-2deg)' }} />
      <div style={{ position: 'absolute', bottom: '17%', left: '30%', width: '7%', height: '10%', borderRadius: '999px 999px 24px 24px', background: `radial-gradient(circle at 50% 0%, ${accent} 0%, #6d3729 72%, #3c1b15 100%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(12,15,21,0.62) 0%, rgba(12,15,21,0.35) 38%, rgba(12,15,21,0.14) 72%, rgba(12,15,21,0.08) 100%)' }} />
    </>
  )
}

function HeroBanner({ hero, subcategory, mobile }: { hero: HeroContent, subcategory: MenuSubcategory, mobile?: boolean }) {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'var(--radius-xl)',
        minHeight: mobile ? '24rem' : '41rem',
        backgroundColor: '#d8c9ae',
        border: '1px solid var(--color-border)',
      }}
    >
      <HeroArtwork accent={hero.accent} glow={hero.glow} />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 'var(--space-stack-gap)',
          minHeight: 'inherit',
          padding: mobile
            ? 'var(--space-8) var(--space-section-inline) calc(var(--space-8) + var(--space-1))'
            : 'var(--space-12) calc(var(--space-section-inline) + var(--space-3)) var(--space-12)',
          maxWidth: mobile ? '100%' : '52%',
        }}
      >
        <div className="flex flex-wrap items-center" style={{ gap: 'var(--space-button-group-gap)' }}>
          <span style={{ color: 'rgba(255,255,255,0.86)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            {hero.eyebrow}
          </span>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)', borderRadius: '999px', padding: 'var(--space-badge-y) var(--space-badge-x)', fontSize: '0.75rem', fontWeight: 600, backdropFilter: 'blur(10px)' }}>
            {subcategory.label}
          </span>
        </div>
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              color: '#ffffff',
              fontSize: mobile ? 'clamp(2.25rem, 10vw, 3.4rem)' : 'clamp(3.25rem, 6vw, 5rem)',
              fontWeight: 700,
              lineHeight: 0.96,
              letterSpacing: '-0.05em',
              maxWidth: '9ch',
            }}
          >
            {hero.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: mobile ? '0.95rem' : '1rem', lineHeight: 1.7, marginTop: 'var(--space-stack-gap)', maxWidth: '38ch' }}>
            {hero.copy}
          </p>
        </div>
        <button
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-control-gap)',
            border: '1px solid transparent',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-fg)',
            fontSize: '0.9375rem',
            fontWeight: 700,
            padding: 'calc(var(--space-control-y) + var(--space-1)) calc(var(--space-control-x) + var(--space-1))',
            boxShadow: 'var(--shadow-md)',
            cursor: 'pointer',
            transition: 'transform var(--duration-base) var(--easing-default), box-shadow var(--duration-base) var(--easing-default)',
          }}
          onMouseEnter={event => {
            event.currentTarget.style.transform = 'translateY(-1px)'
            event.currentTarget.style.boxShadow = 'var(--shadow-lg)'
          }}
          onMouseLeave={event => {
            event.currentTarget.style.transform = 'translateY(0)'
            event.currentTarget.style.boxShadow = 'var(--shadow-md)'
          }}
        >
          {hero.cta}
          <ArrowRight size={18} />
        </button>
        <p style={{ color: 'rgba(255,255,255,0.76)', fontSize: '0.8125rem', lineHeight: 1.6, maxWidth: '34ch' }}>
          {subcategory.description}
        </p>
      </div>
    </div>
  )
}

function MenuListItem({
  label,
  description,
  active = false,
  labelSize = '0.95rem',
  chevronSize = 16,
  onClick,
  onMouseEnter,
  onFocus,
}: {
  label: string
  description?: string
  active?: boolean
  labelSize?: string
  chevronSize?: number
  onClick?: () => void
  onMouseEnter?: () => void
  onFocus?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-stack-gap)',
        width: '100%',
        padding: 'var(--space-card-pad) calc(var(--space-card-pad) + var(--space-1))',
        border: `1px solid ${active ? 'var(--color-border)' : 'transparent'}`,
        borderRadius: 'var(--radius-lg)',
        backgroundColor: active ? 'var(--color-surface-sunken)' : 'transparent',
        color: 'var(--color-fg)',
        textAlign: 'left',
        cursor: 'pointer',
        boxShadow: active ? 'var(--shadow-sm)' : 'none',
        transition: 'background-color var(--duration-base) var(--easing-default), border-color var(--duration-base) var(--easing-default), box-shadow var(--duration-base) var(--easing-default)',
      }}
    >
      <span style={{ minWidth: 0 }}>
        <span
          style={{
            display: 'block',
            color: 'var(--color-fg)',
            fontSize: labelSize,
            fontWeight: 700,
            lineHeight: 1.35,
          }}
        >
          {label}
        </span>
        {description && (
          <span
            style={{
              display: 'block',
              color: 'var(--color-muted-fg)',
              fontSize: '0.75rem',
              lineHeight: 1.55,
              marginTop: 'var(--space-1)',
            }}
          >
            {description}
          </span>
        )}
      </span>
      <ChevronRight size={chevronSize} style={{ color: active ? 'var(--color-fg)' : 'var(--color-muted-fg)', flexShrink: 0 }} />
    </button>
  )
}

function BrandLogoCarousel() {
  return (
    <PreviewContentContainer>
      <div style={{ padding: '0 var(--space-section-inline) var(--space-section-block)' }}>
        <div
          aria-label="Featured brands"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'calc(var(--space-grid-gap) + var(--space-card-pad))',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: 'var(--space-2)',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {BRANDS.map(brand => (
            <div
              key={brand.id}
              style={{
                scrollSnapAlign: 'start',
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                minWidth: 'max-content',
                whiteSpace: 'nowrap',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  flexShrink: 0,
                  borderRadius: 'var(--radius-pill)',
                  background: `linear-gradient(145deg, ${brand.accent} 0%, rgba(255,255,255,0.92) 100%)`,
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    inset: '0.45rem',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid rgba(17,24,39,0.22)',
                  }}
                />
              </div>

              <span
                style={{
                  color: 'var(--color-fg)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                }}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PreviewContentContainer>
  )
}

export function PreviewMasthead() {
  const cardBordersEnabled = useThemeStore(s => s.cardBordersEnabled)
  const desktopMenuRef = useRef<HTMLDivElement>(null)
  const desktopButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [selectedCategoryId, setSelectedCategoryId] = useState(DEFAULT_CATEGORY.id)
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(DEFAULT_CATEGORY.subcategories[0]?.id ?? null)
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileCategoryId, setMobileCategoryId] = useState<string | null>(null)
  const [mobileSubcategoryId, setMobileSubcategoryId] = useState<string | null>(null)

  const activeDesktopCategory = getCategory(selectedCategoryId)
  const activeDesktopSubcategory = activeDesktopCategory.subcategories.find(subcategory => subcategory.id === selectedSubcategoryId)
    ?? activeDesktopCategory.subcategories[0]
  const activeMobileCategory = getCategory(mobileCategoryId)
  const activeMobileSubcategory = activeMobileCategory.subcategories.find(subcategory => subcategory.id === mobileSubcategoryId) ?? null

  function selectCategory(categoryId: string, options?: { openMenu?: boolean }) {
    const nextCategory = getCategory(categoryId)
    setSelectedCategoryId(nextCategory.id)
    setSelectedSubcategoryId(nextCategory.subcategories[0]?.id ?? null)
    if (options?.openMenu !== undefined) {
      setDesktopMenuOpen(options.openMenu)
    }
  }

  function openDesktopCategory(categoryId: string) {
    selectCategory(categoryId, { openMenu: true })
  }

  function closeDesktopMenu(options?: { restoreFocus?: boolean }) {
    const activeId = selectedCategoryId
    setDesktopMenuOpen(false)
    if (options?.restoreFocus) {
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
    if (event.key === 'Escape' && desktopMenuOpen) {
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
    <section style={{ backgroundColor: 'var(--color-background)', borderBottom: '1px solid var(--color-border)', fontFamily: 'var(--font-sans)' }}>
      <div className="hidden md:block sticky top-0 z-20" style={{ backgroundColor: 'var(--color-background)' }}>
        <div style={{ borderBottom: '1px solid var(--color-border)' }}>
          <PreviewContentContainer>
            <div style={{ padding: 'var(--space-panel-pad) var(--space-section-inline)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 180px) minmax(0, 1fr) minmax(180px, 260px)', alignItems: 'center', gap: 'var(--space-grid-gap)' }}>
                <div className="flex items-center" style={{ gap: 'var(--space-grid-gap)' }}>
                  <span aria-hidden="true" style={{ width: '1px', height: '2.6rem', backgroundColor: 'var(--color-fg)', opacity: 0.9, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-fg)', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                    Arcane
                  </span>
                </div>
                <div style={{ maxWidth: '60rem', width: '100%', justifySelf: 'center' }}>
                  <SearchField placeholder="Search" />
                </div>
                <div className="flex items-center justify-end" style={{ gap: 'var(--space-8)' }}>
                  {['Journal', 'Stores'].map(link => (
                    <a key={link} href="#" onClick={preventNav} style={{ color: 'var(--color-fg)', fontSize: '0.9375rem', fontWeight: 600, textDecoration: 'none' }}>
                      {link}
                    </a>
                  ))}
                  <a href="#" onClick={preventNav} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-control-gap)', color: 'var(--color-fg)', fontSize: '0.9375rem', fontWeight: 600, textDecoration: 'none' }}>
                    Account
                    <ChevronDown size={18} />
                  </a>
                </div>
              </div>
            </div>
          </PreviewContentContainer>
        </div>

        <div ref={desktopMenuRef} onMouseLeave={() => closeDesktopMenu()} onBlurCapture={handleDesktopBlur} onKeyDownCapture={handleDesktopKeyDown} style={{ position: 'relative' }}>
          <div style={{ borderBottom: '1px solid var(--color-border)' }}>
            <PreviewContentContainer>
              <div style={{ padding: 'var(--space-control-gap) var(--space-section-inline)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '22rem minmax(0, 1fr) auto', alignItems: 'center', gap: 'var(--space-grid-gap)' }}>
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded={desktopMenuOpen}
                    onMouseEnter={() => setDesktopMenuOpen(true)}
                    onFocus={() => setDesktopMenuOpen(true)}
                    onClick={() => setDesktopMenuOpen(open => !open)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 'var(--space-button-group-gap)',
                      width: '100%',
                      padding: 'calc(var(--space-control-y) + var(--space-1)) calc(var(--space-control-x) + var(--space-1))',
                      backgroundColor: desktopMenuOpen ? 'var(--color-surface)' : 'var(--color-surface-sunken)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-lg)',
                      color: 'var(--color-fg)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: desktopMenuOpen ? 'var(--shadow-sm)' : 'none',
                      transition: 'background-color var(--duration-base) var(--easing-default), box-shadow var(--duration-base) var(--easing-default)',
                    }}
                  >
                    <span className="flex items-center" style={{ gap: 'var(--space-button-group-gap)' }}>
                      <Menu size={22} />
                      {activeDesktopCategory.label}
                    </span>
                    <ChevronDown size={18} />
                  </button>

                  <div className="flex items-center overflow-x-auto" style={{ gap: 'var(--space-grid-gap)' }}>
                    {MENU.map(category => {
                      const isActive = selectedCategoryId === category.id
                      return (
                        <button
                          key={category.id}
                          ref={node => { desktopButtonRefs.current[category.id] = node }}
                          type="button"
                          aria-haspopup="dialog"
                          aria-expanded={desktopMenuOpen && isActive}
                          onMouseEnter={() => openDesktopCategory(category.id)}
                          onFocus={() => openDesktopCategory(category.id)}
                          onClick={() => {
                            if (desktopMenuOpen && isActive) {
                              closeDesktopMenu()
                              return
                            }
                            openDesktopCategory(category.id)
                          }}
                          style={{ border: 'none', backgroundColor: 'transparent', color: isActive ? 'var(--color-primary)' : 'var(--color-fg)', fontSize: '1rem', fontWeight: 700, padding: 'var(--space-2) var(--space-1)', cursor: 'pointer', whiteSpace: 'nowrap' }}
                        >
                          {category.label}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    type="button"
                    aria-label="View bag"
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2.75rem',
                      height: '2.75rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-icon-button)',
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-fg)',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <ShoppingBag size={24} />
                    <span style={{ position: 'absolute', top: '-0.1rem', right: '-0.1rem', minWidth: '1rem', height: '1rem', borderRadius: '999px', backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-fg)', fontSize: '0.625rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
                      2
                    </span>
                  </button>
                </div>
              </div>
            </PreviewContentContainer>
          </div>

          {desktopMenuOpen && activeDesktopSubcategory && (
            <div
              role="dialog"
              aria-label={`${activeDesktopCategory.label} mega menu`}
              style={{
                position: 'absolute',
                top: 'calc(100% + 1px)',
                left: '50%',
                transform: 'translateX(-50%)',
                width: `min(100%, ${PREVIEW_CONTENT_MAX_WIDTH})`,
                display: 'grid',
                gridTemplateColumns: '17rem minmax(0, 1fr) 18rem',
                gap: 'var(--space-grid-gap)',
                padding: 'var(--space-panel-pad)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderTop: 'none',
                borderBottomLeftRadius: 'var(--radius-xl)',
                borderBottomRightRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-stack-gap)' }}>
                <div>
                  <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-control-gap)' }}>
                    {activeDesktopCategory.label}
                  </p>
                  <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.8125rem', lineHeight: 1.65 }}>
                    {activeDesktopCategory.blurb}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  {activeDesktopCategory.subcategories.map(subcategory => {
                    const isActive = subcategory.id === activeDesktopSubcategory.id
                    return (
                      <MenuListItem
                        key={subcategory.id}
                        onClick={() => setSelectedSubcategoryId(subcategory.id)}
                        onMouseEnter={() => setSelectedSubcategoryId(subcategory.id)}
                        onFocus={() => setSelectedSubcategoryId(subcategory.id)}
                        active={isActive}
                        label={subcategory.label}
                        labelSize="0.9rem"
                        chevronSize={15}
                      />
                    )
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-panel-pad)' }}>
                <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  {activeDesktopSubcategory.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-panel-pad) var(--space-grid-gap)' }}>
                  {activeDesktopSubcategory.groups.map(group => (
                    <div key={group.heading}>
                      <p style={{ color: 'var(--color-fg)', fontSize: '0.8125rem', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                        {group.heading}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-control-gap)' }}>
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

              <div style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-secondary-fg)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-panel-pad)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 'var(--space-panel-pad)' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-3)' }}>
                    {activeDesktopSubcategory.feature.eyebrow}
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', lineHeight: 1.08, marginBottom: 'var(--space-3)' }}>
                    {activeDesktopSubcategory.feature.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.65, opacity: 0.9 }}>
                    {activeDesktopSubcategory.feature.copy}
                  </p>
                </div>

                <a
                  href="#"
                  onClick={event => {
                    preventNav(event)
                    closeDesktopMenu()
                  }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-control-gap)', color: 'inherit', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}
                >
                  {activeDesktopSubcategory.feature.cta}
                  <ChevronRight size={15} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden sticky top-0 z-20" style={{ backgroundColor: 'var(--color-background)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="flex items-center justify-between" style={{ gap: 'var(--space-button-group-gap)', padding: 'var(--space-3) var(--space-4)' }}>
          <div className="flex items-center" style={{ gap: 'var(--space-button-group-gap)' }}>
            <span aria-hidden="true" style={{ width: '1px', height: '1.85rem', backgroundColor: 'var(--color-fg)', opacity: 0.9, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-fg)', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Arcane
            </span>
          </div>

          <div className="flex items-center" style={{ gap: 'var(--space-control-gap)' }}>
            <button
              type="button"
              aria-label="View bag"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.5rem',
                height: '2.5rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-icon-button)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-fg)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <ShoppingBag size={22} />
            </button>
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-label="Open categories"
              onClick={() => setMobileOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.5rem',
                height: '2.5rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-icon-button)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-fg)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        <div style={{ padding: '0 var(--space-4) var(--space-4)' }}>
          <SearchField placeholder="Search" />
        </div>
      </div>

      <PreviewContentContainer>
        <div style={{ padding: 'var(--space-panel-pad) var(--space-section-inline)' }}>
          <div className="hidden md:grid" style={{ gridTemplateColumns: '22rem minmax(0, 1fr)', gap: 'var(--space-grid-gap)', alignItems: 'stretch' }}>
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                border: cardBordersEnabled ? '1px solid var(--color-border)' : 'none',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-control-gap)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {activeDesktopCategory.subcategories.map(subcategory => {
                const isActive = subcategory.id === activeDesktopSubcategory?.id
                return (
                  <MenuListItem
                    key={subcategory.id}
                    onClick={() => setSelectedSubcategoryId(subcategory.id)}
                    onMouseEnter={() => setSelectedSubcategoryId(subcategory.id)}
                    onFocus={() => setSelectedSubcategoryId(subcategory.id)}
                    active={isActive}
                    label={subcategory.label}
                    labelSize="1rem"
                    chevronSize={19}
                  />
                )
              })}
            </div>

            {activeDesktopSubcategory && <HeroBanner hero={activeDesktopCategory.hero} subcategory={activeDesktopSubcategory} />}
          </div>

          {activeDesktopSubcategory && (
            <div className="md:hidden">
              <HeroBanner hero={activeDesktopCategory.hero} subcategory={activeDesktopSubcategory} mobile />
            </div>
          )}
        </div>
      </PreviewContentContainer>

      <BrandLogoCarousel />

      {mobileOpen && (
        <div onKeyDownCapture={handleMobileKeyDown} style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <button type="button" aria-label="Close mobile menu overlay" onClick={closeMobileMenu} style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--overlay-bg)', border: 'none' }} />

          <div style={{ position: 'relative', width: 'min(100%, 22rem)', height: '100%', backgroundColor: 'var(--color-surface)', borderRight: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xl)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-button-group-gap)', padding: 'var(--space-card-pad)', borderBottom: '1px solid var(--color-border)' }}>
              {mobileCategoryId ? (
                <button
                  type="button"
                  onClick={handleMobileBack}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-control-gap)', border: 'none', backgroundColor: 'transparent', color: 'var(--color-fg)', fontSize: '0.8125rem', fontWeight: 600, padding: 0, cursor: 'pointer' }}
                >
                  <ArrowLeft size={14} />
                  Back
                </button>
              ) : (
                <span style={{ width: '46px' }} />
              )}

              <div style={{ minWidth: 0, textAlign: 'center' }}>
                <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-1)' }}>
                  Browse
                </p>
                <p style={{ color: 'var(--color-fg)', fontSize: '0.9375rem', fontWeight: 700 }}>
                  {activeMobileSubcategory?.label ?? (mobileCategoryId ? activeMobileCategory.label : 'Categories')}
                </p>
              </div>

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close mobile menu"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.25rem',
                  height: '2.25rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-icon-button)',
                  backgroundColor: 'var(--color-surface-raised)',
                  color: 'var(--color-fg)',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  flexShrink: 0,
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ overflowY: 'auto', padding: 'var(--space-3) var(--space-card-pad) var(--space-panel-pad)' }}>
              {!mobileCategoryId && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  {MENU.map(category => (
                    <MenuListItem
                      key={category.id}
                      onClick={() => {
                        setMobileCategoryId(category.id)
                        setMobileSubcategoryId(null)
                        selectCategory(category.id)
                      }}
                      label={category.label}
                      description={category.blurb}
                      labelSize="0.95rem"
                      chevronSize={16}
                    />
                  ))}
                </div>
              )}

              {mobileCategoryId && !mobileSubcategoryId && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.8125rem', lineHeight: 1.6, marginBottom: 'var(--space-3)' }}>
                    {activeMobileCategory.blurb}
                  </p>

                  {activeMobileCategory.subcategories.map(subcategory => (
                    <MenuListItem
                      key={subcategory.id}
                      onClick={() => {
                        setMobileSubcategoryId(subcategory.id)
                        setSelectedCategoryId(activeMobileCategory.id)
                        setSelectedSubcategoryId(subcategory.id)
                      }}
                      label={subcategory.label}
                      description={subcategory.description}
                      labelSize="0.875rem"
                      chevronSize={16}
                    />
                  ))}
                </div>
              )}

              {mobileCategoryId && activeMobileSubcategory && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-panel-pad)' }}>
                  <p style={{ color: 'var(--color-muted-fg)', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                    {activeMobileSubcategory.description}
                  </p>

                  {activeMobileSubcategory.groups.map(group => (
                    <div key={group.heading}>
                      <p style={{ color: 'var(--color-fg)', fontSize: '0.8125rem', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                        {group.heading}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
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

                  <div style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-secondary-fg)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-card-pad)' }}>
                    <p style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-2)' }}>
                      {activeMobileSubcategory.feature.eyebrow}
                    </p>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
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
    </section>
  )
}
