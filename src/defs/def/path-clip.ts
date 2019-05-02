import { setAttributes, getAttributes } from '../../utils'
import { SvgDefs } from '../svg-defs'
import { Def } from '../svg-def'

const DefaultId = 'path'

interface PathOpts {
  path: string
}
export class PathClip extends Def {
  setOptions({ path }: PathOpts, aEl = this.FEl) {
    aEl = aEl.querySelector('path') as Element
    if (path) {
      aEl.setAttribute('d', path)
    }
  }

  getOptions(aNames: string | string[] = ['path']) {
    const vEl = this.FEl.querySelector('path') as Element
    const result = getAttributes(vEl, aNames)
    if (result['d']) {
      result.path = result['d']
      delete result['d']
    }
    return result
  }

  getOrCreateDef(options) {
    const id = options && options.id
    const result = getPathDef(id)
    if (options) this.setOptions(options, result)
    return result
  }
}

export const pathclip = {
  tag: 'clipPath',
  id: DefaultId,
  clipPathUnits: 'objectBoundingBox',
  children: [
    {
      tag: 'path',
      d: 'M0 0h1v1h-1z'
    }
  ]
}

export function getPathDef(id?: string) {
  const GDefs = new SvgDefs()
  id = id ? id + '-' + DefaultId : DefaultId
  let vEl = GDefs.get(DefaultId, 'clipPath')
  if (!vEl) {
    vEl = GDefs.add(pathclip)
  }
  return vEl
}
