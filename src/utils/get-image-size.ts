import { memoize } from 'lodash'
import { loadImage } from './load-image'

export const getImageSize = memoize(async function(aUrl: string) {
  const vImg = await loadImage(aUrl)
  const { width, height } = vImg
  return { width, height }
})
