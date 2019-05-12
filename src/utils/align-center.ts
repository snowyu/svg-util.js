/**
 * align text in the rect size center.
 * @param textSize the text size
 * @param rectSize the rect size
 * @param offset the offset
 */
export function alignCenter(textSize: number, rectSize: number, offset?: number) {
  offset = Number(offset) || 0
  return (rectSize - textSize) / 2 + offset
}

export const alignMiddle = alignCenter
