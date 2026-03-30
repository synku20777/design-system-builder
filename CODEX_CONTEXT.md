# Codex Context

## Project Summary
- This is a Vite + React app for interactively building an ecommerce-oriented design system.
- The left sidebar edits theme inputs. The right pane renders a themed storefront preview made of realistic commerce surfaces rather than abstract token swatches alone.
- Runtime theming is done by generating CSS custom properties and injecting them into a `<style id="dsb-theme">` tag scoped to `.preview-root`.
- Preview content is centered and capped to `1320px` with `PreviewContentContainer`, while section backgrounds and borders remain full width.

## Stack
- React 19
- TypeScript 5.7
- Vite 6
- Zustand for app state
- Tailwind CSS v4 for app chrome and control-panel utilities
- `culori` for OKLCH conversion and scale generation
- `react-colorful` for color picking
- `lucide-react` for icons

## Commands
- `npm run dev`
- `npm run build`
- `npm run preview`
- On this Windows environment, `npm.cmd run build` is the reliable way to build if PowerShell blocks `npm.ps1`.

## Runtime Flow
1. `src/main.tsx` mounts `App`.
2. `src/App.tsx` initializes `useThemeSync()`, `useUrlState()`, and font loading for the selected heading/body fonts.
3. `src/store/theme.store.ts` holds the single source of truth for theme inputs and mutations.
4. `src/hooks/useThemeSync.ts` watches store values, calls `buildCSSString()`, and injects the generated preview CSS variables.
5. `src/components/preview/PreviewShell.tsx` applies `.preview-root` plus optional `.dark`, enables `text-rendering: optimizeLegibility`, and renders the full storefront preview sequence.

## Theme Model
- Store fields:
  `brandColor`, `secondaryColor`, `baseColor`, `radiusMode`, `shadowMode`, `spacingMode`, `cardBordersEnabled`, `headingFont`, `bodyFont`, `colorMode`
- Store actions:
  individual setters, `applyPreset`, `randomize`, `reset`
- Presets live in `src/lib/defaults.ts`.
- `applyPreset` intentionally excludes `colorMode`.
- Current presets also do not specify `spacingMode`, so spaciousness persists when switching presets.
- `reset()` restores `spacingMode: 'default'` and `cardBordersEnabled: true`.

## Token Pipeline
- `src/lib/color.ts`
  Builds 50-950 OKLCH scales and semantic light/dark tokens.
- `src/lib/radius.ts`
  Maps five radius presets (`sharp` through `pill`) to radius tokens.
- `src/lib/shadow.ts`
  Generates branded shadow tokens from the brand hue, color mode, and selected intensity.
- `src/lib/spacing.ts`
  Generates deterministic spacing scales and semantic spacing aliases from `spacingMode`.
- `src/lib/fonts.ts`
  Defines the font catalog, Google Fonts URL generation, and fallback stacks.
- `src/lib/css-inject.ts`
  Builds preview-only CSS for `.preview-root` and `.preview-root.dark`, including spacing vars.
- `src/lib/export.ts`
  Builds export CSS for `:root` and `.dark`, including spacing vars.

## Styling Approach
- `src/index.css` imports Tailwind, sets the base document layout, and defines skeleton and scrollbar styles.
- The sidebar and controls mostly use Tailwind utility classes.
- The live storefront preview mostly uses inline styles bound to CSS variables such as `--color-*`, `--radius-*`, `--shadow-*`, `--space-*`, `--font-*`.
- Spaciousness is a first-class mode. Preview components in the mounted preview tree now consume spacing tokens for padding and gaps instead of hardcoded spacing values.
- Spaciousness changes internal padding and inter-element spacing only. It does not change typography, breakpoints, grid column counts, or major structural dimensions.

## Component Map
- Controls live in `src/components/controls/*`.
- Main control pieces:
  `ColorSection`, `FontPicker`, `ModeToggle`, `RadiusPicker`, `ShadowPicker`, `SpaciousnessPicker`, `CardOptions`, `ExportPanel`
- Preview components live in `src/components/preview/*`.
- Render order in `PreviewShell.tsx`:
  `PreviewMasthead`, `PreviewFilters`, `PreviewProductGrid`, `PreviewPaginationTabs`, `PreviewProductDetail`, `PreviewExpertSuggestions`, `PreviewProductCarousel`, `PreviewCart`, `PreviewModal`, `PreviewCheckout`
- `PreviewMasthead.tsx` owns the current top-of-page experience:
  utility/search row, desktop mega menu, left category rail, hero banner, and mobile drawer drilldown.
- `PreviewProductCard.tsx` is the main shared commerce primitive and supports both `standard` and `detailed` variants.
- Product-card media is square via `aspect-ratio: 1 / 1`.
- `PreviewPaginationTabs.tsx` currently shows both underline tabs and a segmented pill-tab variation.
- `PreviewExpertSuggestions.tsx` is the split editorial banner plus horizontal rail section inserted before the standard carousel.
- `PreviewNav.tsx` and `PreviewHero.tsx` are legacy preview files that still exist in the repo but are not mounted by `PreviewShell`.

## URL And Sharing
- `src/hooks/useUrlState.ts` serializes theme state into a base64 hash.
- Shared URLs currently preserve colors, radius, shadow intensity, spaciousness, card-border toggle, and fonts.
- The compact hash field for spaciousness is `sp`.
- `colorMode` is still not serialized, so copied links do not preserve light/dark mode.

## Working Notes
- This folder is not a git repo root. `git status` fails from here.
- There are no lint or test scripts in `package.json`.
- `src/vite-env.d.ts` provides Vite client typings for asset and CSS imports.
- `src/culori.d.ts` is a local minimal module declaration because `culori` does not ship TypeScript types.
- `useFontLoader` appends Google Fonts stylesheet links at runtime and never removes them.
- Preview text uses `text-rendering: optimizeLegibility` at the preview-root level only, not in the builder sidebar.
- `PreviewContentContainer.tsx` is the shared entry point for storefront content width alignment and the `1320px` cap.
- `cardBordersEnabled` only affects the outer border on product cards; it does not remove internal table or divider borders.

## Best Entry Points For Future Changes
- Theme token logic or export behavior:
  `src/lib/color.ts`, `src/lib/shadow.ts`, `src/lib/spacing.ts`, `src/lib/css-inject.ts`, `src/lib/export.ts`
- New store-controlled setting:
  `src/store/theme.store.ts`, `src/lib/defaults.ts`, `src/hooks/useThemeSync.ts`, `src/hooks/useUrlState.ts`, plus the relevant control component
- Storefront header, nav, hero, or mobile drawer behavior:
  `src/components/preview/PreviewMasthead.tsx`
- Shared product-card behavior:
  `src/components/preview/PreviewProductCard.tsx`
- Preview layout width or section alignment:
  `src/components/preview/PreviewContentContainer.tsx`
- Shareable URL behavior:
  `src/hooks/useUrlState.ts`
