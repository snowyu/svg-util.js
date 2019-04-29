export function setAttributes(el: Element, options) {
  const ns = options.ns || options.namespaceURI || el.namespaceURI
  Object.keys(options).forEach(function(attr) {
    if (attr !== 'ns' && attr !== 'namespaceURI' && options[attr] != null) {
      el.setAttribute(attr, options[attr])
    }
  })
}
