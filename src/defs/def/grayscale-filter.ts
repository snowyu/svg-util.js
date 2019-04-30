import { setAttributes, getAttributes } from '../../utils'
import { SvgDefs } from '../svg-defs'
import { Def } from '../svg-def'

const DefaultId = 'grayscale'

export class GrayscaleFilter extends Def {
  setOptions({ dx, dy }, aEl = this.FEl) {}

  getOptions(aNames: string | string[] = []) {
    return {}
  }

  getOrCreateDef(options) {
    const id = options && options.id
    const result = getGrayscaleDef(id)
    if (options) this.setOptions(options, result)
    return result
  }
}

export const grayscale = {
  tag: 'filter',
  id: DefaultId,
  children: [
    {
      tag: 'feColorMatrix',
      in: 'SourceGraphic',
      type: 'saturate',
      values: '0'
    }
  ]
}

export function getGrayscaleDef(id?: string) {
  const GDefs = new SvgDefs()
  // id = id ? id + '-' + DefaultId : DefaultId
  let vEl = GDefs.get(DefaultId, 'filter')
  if (!vEl) {
    // grayscale.id = id
    vEl = GDefs.add(grayscale)
  }
  return vEl
}
