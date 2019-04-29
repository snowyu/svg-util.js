export function getAttributes(el: Element, attrs: string | string[]) {
  const result: any = {}
  if (typeof attrs === 'string') {
    attrs = ['attrs']
  }
  attrs.forEach(i => {
    const value = el.getAttribute(i)
    if (value != null) {
      result[i] = value
    }
  })
  return result
}
