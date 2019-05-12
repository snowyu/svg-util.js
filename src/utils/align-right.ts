/**
 * align text in the rect size right.
 * @param textSize the text size
 * @param rectSize the rect size
 * @param offset the offset
 */
export function alignRight(textSize, rectSize, offset) {
  offset = Number(offset) || 0
  return rectSize - textSize + offset
}

export const alignBottom = alignRight
