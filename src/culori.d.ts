declare module 'culori' {
  export interface CuloriColor {
    l?: number
    c?: number
    h?: number
    [key: string]: unknown
  }

  export function converter(mode: string): (color: unknown) => CuloriColor | undefined
  export function formatCss(color: unknown): string
  export function parse(color: string): unknown
}
