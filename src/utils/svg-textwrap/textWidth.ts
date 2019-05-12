import { default as textMetrics } from './textMetrics'

/**
 *  @function textWidth
 *  @desc Given a text string, returns the predicted pixel width of the string when placed into DOM.
 *  @param {String|Array} text Can be either a single string or an array of strings to analyze.
 *  @param {Object} [style] An object of CSS font styles to apply. Accepts any of the valid [CSS font property](http://www.w3schools.com/cssref/pr_font_font.asp) values.
 */
export default function(text: string | string[], style?) {
  const metrics = textMetrics(text, style)
  if (metrics instanceof Array) return metrics.map(t => t.width)
  return metrics.width
}
