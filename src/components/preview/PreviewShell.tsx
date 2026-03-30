import { useThemeStore } from '../../store/theme.store'
import { PreviewMasthead } from './PreviewMasthead'
import { PreviewFilters } from './PreviewFilters'
import { PreviewProductGrid } from './PreviewProductGrid'
import { PreviewProductDetail } from './PreviewProductDetail'
import { PreviewExpertSuggestions } from './PreviewExpertSuggestions'
import { PreviewProductCarousel } from './PreviewProductCarousel'
import { PreviewCart } from './PreviewCart'
import { PreviewModal } from './PreviewModal'
import { PreviewCheckout } from './PreviewCheckout'
import { PreviewPaginationTabs } from './PreviewPaginationTabs'

export function PreviewShell() {
  const colorMode = useThemeStore(s => s.colorMode)

  return (
    <div
      className={`preview-root${colorMode === 'dark' ? ' dark' : ''}`}
      style={{ minHeight: '100%', textRendering: 'optimizeLegibility' }}
    >
      <PreviewMasthead />
      <PreviewFilters />
      <PreviewProductGrid />
      <PreviewPaginationTabs />
      <PreviewProductDetail />
      <PreviewExpertSuggestions />
      <PreviewProductCarousel />
      <PreviewCart />
      <PreviewModal />
      <PreviewCheckout />
    </div>
  )
}
