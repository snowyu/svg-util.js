import { setAttributes, getAttributes } from '../../utils'
import { SvgDefs } from '../svg-defs'
import { Def } from '../svg-def'

const DefaultId = 'dropShadow'

export class DropshadowFilter extends Def {
  public get dx() {
    const vEl = this.FEl.querySelector('feOffset')
    if (vEl) return vEl.getAttribute('dx')
  }
  public set dx(value) {
    const vEl = this.FEl.querySelector('feOffset')
    if (vEl && value != null) vEl.setAttribute('dx', value)
  }

  public get dy() {
    const vEl = this.FEl.querySelector('feOffset')
    if (vEl) return vEl.getAttribute('dy')
  }
  public set dy(value) {
    const vEl = this.FEl.querySelector('feOffset')
    if (vEl && value != null) vEl.setAttribute('dy', value)
  }

  setOptions({ dx, dy }, aEl = this.FEl) {
    if (dx == null || dx == null) return
    const vEl = aEl.querySelector('feOffset')
    if (vEl) setAttributes(vEl, { dx, dy })
  }

  getOptions(aNames: string | string[] = ['dx', 'dy']) {
    const vEl = this.FEl.querySelector('feOffset')
    if (vEl) return getAttributes(vEl, aNames)
  }

  getOrCreateDef(options) {
    const id = options && options.id
    const result = getDropShadowDef(id)
    if (options) this.setOptions(options, result)
    return result
  }
}

export const dropShadow = {
  tag: 'filter',
  id: DefaultId,
  children: [
    {
      tag: 'feGaussianBlur',
      in: 'SourceAlpha',
      stdDeviation: '2'
    },
    {
      tag: 'feOffset',
      dx: '4',
      dy: '8'
    },
    {
      tag: 'feMerge',
      children: [{ tag: 'feMergeNode' }, { tag: 'feMergeNode', in: 'SourceGraphic' }]
    }
  ]
}

export function getDropShadowDef(id?: string) {
  const GDefs = new SvgDefs()
  id = id ? id + '-' + DefaultId : DefaultId
  let vEl = GDefs.get(id, 'filter')
  if (!vEl) {
    dropShadow.id = id
    vEl = GDefs.add(dropShadow)
  }
  return vEl
}

// export function getOptions() {
//   let vEl = getDropShadowDef()
//   if (vEl && vEl.children.length) {
//     vEl = vEl.querySelector('feOffset')
//     if (vEl) return getAttributes(vEl, ['dx', 'dy'])
//   }
// }

// export function getDropShadowDef() {
//   const GDefs = new SvgDefs;
//   return GDefs.get(dropShadow.id, 'filter');
// }

// export function setDropShadow({dx, dy}) {
//   let vEl = getDropShadowDef();
//   if (vEl && vEl.children.length) {
//     vEl = vEl.querySelector('feOffset')
//     // vEl = vEl.children[0];
//     if (vEl) setAttributes(vEl, {dx, dy})
//   } else
//     vEl = null;
//   return vEl;
// }
