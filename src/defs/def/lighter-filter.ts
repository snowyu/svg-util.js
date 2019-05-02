import { setAttributes, getAttributes } from '../../utils'
import { SvgDefs } from '../svg-defs'
import { Def } from '../svg-def'

const DefaultId = 'lighter'

export class LighterFilter extends Def {
  setOptions({ dx, dy }, aEl = this.FEl) {}

  getOptions(aNames: string | string[] = []) {
    return {}
  }

  getOrCreateDef(options) {
    const id = options && options.id
    const result = getLighterDef(id)
    if (options) this.setOptions(options, result)
    return result
  }
}

export const lighter = {
  tag: 'filter',
  id: DefaultId,
  children: [
    {
      tag: 'feComposite',
      in: 'SourceGraphic',
      in2: 'SourceGraphic',
      operator: 'lighter'
    }
  ]
}

export function getLighterDef(id?: string) {
  const GDefs = new SvgDefs()
  // id = id ? id + '-' + DefaultId : DefaultId
  let vEl = GDefs.get(DefaultId, 'filter')
  if (!vEl) {
    // grayscale.id = id
    vEl = GDefs.add(lighter)
  }
  return vEl
}
