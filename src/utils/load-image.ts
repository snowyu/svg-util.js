export async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise(function(resolve, reject) {
    const image = new Image()
    image.onerror = reject
    image.onload = function() {
      resolve(image)
    }
    image.src = url
  })
}
