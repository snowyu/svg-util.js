import { setAttributes } from './set-attributes'

interface IAttrs {
  [k: string]: any
}
export async function loadImage(url: string, attrs?: IAttrs): Promise<HTMLImageElement> {
  return new Promise(function(resolve, reject) {
    const image = new Image()
    if (attrs) {
      setAttributes(image, attrs)
    }
    image.onerror = reject
    image.onload = function() {
      resolve(image)
    }
    image.src = url
  })
}
