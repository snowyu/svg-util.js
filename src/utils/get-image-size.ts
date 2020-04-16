import { memoize } from 'lodash'
import { loadImage } from './load-image'

export const getImageSize = memoize(async function(aUrl: string, attrs?) {
  const vImg = await loadImage(aUrl, attrs)
  const { width, height } = vImg
  return { width, height }
})
