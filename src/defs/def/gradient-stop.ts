/**
 *  defines the ramp of colors to use on a gradient, which is a child element to either the `<linearGradient>`{@link LinearGradient} or the `<radialGradient>` element.
 */
export interface IGradientStop {
  /**
   * internal used.
   */
  tag?: string
  /**
   * 0.0-1.0 or 0%-100%
   */
  offset: number | string
  /**
   * The color attribute indicates what color to use at that gradient stop. The keyword `currentColor` and ICC colors can be specified in the same manner as within a {@link https://developer.mozilla.org/en/SVG/Content_type#Paint|<paint>} specification for the `fill` and `stroke` attributes.
   */
  'stop-color': string
  /**
   * defines the opacity of a given gradient stop.
   * the range 0.0 (fully transparent) to 1.0 (fully opaque)
   */
  'stop-opacity'?: number
}
