import type { CSSProperties, ReactNode } from 'react'

export const PREVIEW_CONTENT_MAX_WIDTH = '1320px'

export function PreviewContentContainer({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: PREVIEW_CONTENT_MAX_WIDTH,
        margin: '0 auto',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
