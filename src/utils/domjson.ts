/* https://github.com/mobz/domj
{ tag: "DIV", id: "foo", children: [
  "Just some text",
  { tag: "INPUT", type: "text", value: "an input" },
  { tag: "A", href: "https://github.com/mobz/domj", text: "a link" },
  { tag: "BUTTON", type: "button", onclick: function() { alert( "hello" ); }, text: "a button" },
  { tag: "UL", children: [ "apple", "berry", "cherry", "donut" ].map( function( fruit ) {
    return { tag: "LI", text: fruit };
  } ) }
] }
*/

const shortcuts = {
  text: 'textContent',
  cls: 'className',
  ns: 'namespaceURI'
}

const nsMapper = {
  html: 'http://www.w3.org/1999/xhtml',
  xhtml: 'http://www.w3.org/1999/xhtml',
  svg: 'http://www.w3.org/2000/svg'
}

export interface IJsonDom {
  tag: string
  children?: IJsonDom[]
  [name: string]: any
}

export function toDOM(aJsonDef: IJsonDom, aParentNode?: Element): Element {
  return createNode(aJsonDef, aParentNode, aParentNode ? aParentNode.ownerDocument : document)
}

function addAttr(el: Element, attr, obj, context) {
  if (attr === 'ns' || attr === 'namespaceURI' || attr === 'tag') return
  const value = obj[attr]
  // id property must be xhtml ns.
  const ns = '' // obj['ns'] || obj['namespaceURI'] || el.namespaceURI;
  attr = shortcuts[attr] || attr
  if (attr === 'children') {
    value.forEach(e => createNode(e, el, context))
  } else if (attr === 'style' || attr === 'dataset') {
    Object.keys(value).forEach(key => (el[attr][key] = value[key]))
  } else if (attr.indexOf('on') === 0) {
    el.addEventListener(attr.substr(2), value, false)
  } else {
    if (ns) {
      el.setAttributeNS(ns, attr, value)
    } else {
      el.setAttribute(attr, value)
    }
  }
}

function toNS(aNS) {
  return nsMapper[aNS] || aNS
}

function createNode(obj, parent?, context?) {
  let el
  if (obj == null) {
    return
  } else if (typeof obj === 'string') {
    el = context.createTextNode(obj)
  } else {
    const ns = toNS(obj.ns) || obj.namespaceURI || (parent && parent.namespaceURI)
    if (ns) {
      // obj.ns = ns;
      el = context.createElementNS(ns, obj.tag || obj.tagName || 'div')
    } else {
      el = context.createElement(obj.tag || obj.tagName || 'div')
    }

    Object.keys(obj).forEach(key => addAttr(el, key, obj, context))
  }
  if (parent) {
    parent.appendChild(el)
  }
  return el
}

export function toJSON(node: Element) {
  node = node || this

  const obj: any = {
    // nodeType: node.nodeType,

    // modified - assign everything here
    tag: node.tagName || ''
    // ns: node.namespaceURI
    // nodeName: node.nodeName,
    // nodeValue: node.nodeValue
  }
  const ns = node.namespaceURI
  if (ns && ns !== 'http://www.w3.org/1999/xhtml') {
    obj.ns = ns
  }

  let v: any = getSpecAttrs('style', node)
  if (v) {
    obj.style = v
  }
  v = getSpecAttrs('dataset', node)
  if (v) {
    obj.dataset = v
  }

  if (node.hasAttributes()) {
    const attrs = node.attributes

    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i]
      // console.log(attr)
      obj[attr.nodeName] = node.getAttribute(attr.nodeName)
    }
  }

  const vChildren = node.children
  if (vChildren && vChildren.length) {
    // modified
    // length = childNodes.length;
    // arr = obj.childNodes = [];// new Array(length);
    const arr: any[] = (obj.children = [])
    for (let i = 0; i < vChildren.length; i++) {
      arr.push(toJSON(vChildren[i] as HTMLElement))
    }
  }

  return obj
}

function getSpecAttrs(aName: string, node) {
  const vObj = node[aName]
  if (vObj) {
    const vNames = Object.keys(vObj).filter(name => name && name[0] !== '_' && vObj[name] != null)
    if (vNames.length) {
      const result: any = {}
      vNames.forEach(name => (result[name] = vObj[name]))
      return result
    }
  }
}
