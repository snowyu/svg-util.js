// import { setAttributes } from './utils/set-attributes';
import { toDOM, IJsonDom } from '../utils/domjson'

interface IDef extends IJsonDom {
  id: string
}

const SVGElementMap = {
  clipPath: 'clip',
  // 'filter': 'filter',
  // 'mask': 'mask',
  // 'pattern': 'pattern',
  linearGradient: 'lGradient'
}

/**
 * the SvgDefs Class to manage the reused elements in `defs` of SVG.
 */
export class SvgDefs {
  private static instance: { [name: string]: SvgDefs } = {}
  protected svg!: SVGSVGElement
  protected defs!: SVGDefsElement

  /**
   *
   * @param aSvg which svg to store the defs. defaults to an invisible unique one.
   */
  constructor(aSvg?: SVGSVGElement) {
    const vSvgId: string = aSvg ? aSvg.getAttribute('id') || '' : ''
    const instance = SvgDefs.instance[vSvgId]
    if (instance) {
      return instance
    }
    SvgDefs.instance[vSvgId] = this
    this.init(aSvg)
  }

  protected createElement(aParent: Element, aName: string, aId?: string) {
    const owner = aParent.ownerDocument || document
    const result = owner.createElementNS('http://www.w3.org/2000/svg', aName)
    if (aId) result.setAttribute('id', aId)
    aParent.appendChild(result)
    return result
  }

  protected createSvgElement(): SVGSVGElement {
    // create a hidden svg to store defs
    const result = this.createElement(document.body, 'svg') as SVGSVGElement
    result.setAttribute('width', '0')
    result.setAttribute('height', '0')
    // result.style.visibility = 'hidden';
    // result.style.position = 'absolute';

    return result
  }

  protected createDefsElment(aSvg: SVGElement, aId: string = 'vDefs'): SVGDefsElement {
    return this.createElement(aSvg, 'defs', aId) as SVGDefsElement
  }

  protected init(aSvg?: SVGSVGElement) {
    if (!aSvg) aSvg = this.createSvgElement()
    this.svg = aSvg
    this.defs = this.createDefsElment(aSvg)
  }

  // init() {
  //   if (document.readyState !== 'loading') {
  //     this.create();
  //   } else {
  //     document.addEventListener('DOMContentLoaded',(event) => {
  //       this.create();
  //     })
  //   }
  // }

  /**
   * get the id in the `Defs` to reference.
   * @param aId the id string.
   * @param tag the tag name in the `defs`
   */
  getId(aId: string, tag?: string) {
    if (tag) {
      tag = getIdPrefix(tag)
      if (aId.indexOf(tag) !== 0) aId = tag + aId
    }
    const vSvgId = this.svg.getAttribute('id')
    if (vSvgId) {
      aId = vSvgId + '-' + aId
    }
    aId = aId.replace(/[.#]/g, '-')
    return aId
  }

  /**
   * add a element into it(`defs`).
   * @param aDef the defined element to add.
   */
  add(aDef: IDef): Element {
    const { id, tag } = aDef

    if (this.get(id, tag)) {
      throw new Error(`${this.getId(id, tag)} def has already exists.`)
    }
    aDef.id = this.getId(id, tag)

    const result = toDOM(aDef, this.defs)
    return result
  }

  /**
   * add or reset the `def`
   * @param aDef
   */
  set(aDef: IDef): Element {
    this.remove(aDef.id, aDef.tag)
    const result = this.add(aDef)
    return result
  }

  remove(aId: string, aElementName?: string) {
    const result = this.get(aId, aElementName)
    if (result) this.defs.removeChild(result)
    return result
  }

  get(aId: string, aElementName?: string) {
    aId = this.getId(aId, aElementName)
    // console.log('get', aId);
    return this.defs.querySelector(`#${aId}`)
  }

  getFilter(aId: string) {
    return this.get(aId, 'filter')
  }

  getClipPath(aId: string) {
    return this.get(aId, 'clipPath')
  }

  getMask(aId: string) {
    return this.get(aId, 'mask')
  }
}

function getIdPrefix(aElementName: string) {
  const v = SVGElementMap[aElementName]
  if (v) aElementName = v
  aElementName += '-'
  return aElementName
}
