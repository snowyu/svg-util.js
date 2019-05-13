/**
 * Strips HTML and "un-escapes" escape characters.
 * @param {String} input
 */
function htmlDecode(input) {
  if (input === ' ') return input
  const doc = new DOMParser().parseFromString(input.replace(/<[^>]+>/g, ''), 'text/html')
  return doc.documentElement.textContent
}

/**
 *  @function textMetrics
 *  @desc Given a text string, returns the predicted pixel textMetrics of the string when placed into DOM.
 *    fontHeight = fontBoundingBoxAscent + fontBoundingBoxDescent;      // need polyfill
 *    actualHeight = actualBoundingBoxAscent + actualBoundingBoxDescent;// need polyfill
 *  @param {TextMetrics|Array} text Can be either a single string or an array of strings to analyze.
 *  @param {Object} [style] An object of CSS font styles to apply. Accepts any of the valid [CSS font property](http://www.w3schools.com/cssref/pr_font_font.asp) values.
 */
export default function(text: string | string[], style?): TextMetrics | TextMetrics[] {
  style = Object.assign(
    {
      'font-size': 16,
      'font-family': 'sans-serif',
      'font-style': 'normal',
      'font-weight': 400,
      'font-variant': 'normal'
    },
    style
  )

  const context = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D

  const font: any[] = []
  font.push(style['font-style'])
  font.push(style['font-variant'])
  font.push(style['font-weight'])
  font.push(typeof style['font-size'] === 'string' ? style['font-size'] : `${style['font-size']}px`)
  // let s = `${style["font-size"]}px`;
  // if ("line-height" in style) s += `/${style["line-height"]}px`;
  // font.push(s);
  font.push(style['font-family'])

  context.font = font.join(' ')

  if (text instanceof Array) return text.map(t => context.measureText(htmlDecode(t)))
  return context.measureText(htmlDecode(text))
}
