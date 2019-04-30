import { setAttributes, getAttributes } from '../../utils'
import { SvgDefs } from '../svg-defs'
import { Def } from '../svg-def'

const DefaultId = 'glossglass'

export class GlossGlassFilter extends Def {
  setOptions({ color, specular }, aEl = this.FEl) {
    aEl = aEl.querySelector('feSpecularLighting') as Element
    if (color) {
      aEl.setAttribute('lighting-color', color)
    }
    specular = parseFloat(specular)
    if (!isNaN(specular)) {
      setAttributes(aEl, {
        specularConstant: specular / 10,
        specularExponent: specular
      })
    }
  }

  getOptions(aNames: string | string[] = ['color', 'specular']) {
    const GlossGlassMapper = {
      color: 'lighting-color',
      specular: 'specularExponent'
    }

    const vEl = this.FEl.querySelector('feSpecularLighting') as Element
    if (!Array.isArray(aNames)) aNames = [aNames]
    aNames = aNames.map(n => GlossGlassMapper[n] || n)
    const result = getAttributes(vEl, aNames)
    if (result['lighting-color']) {
      result.color = result['lighting-color']
      delete result['lighting-color']
    }
    if (result.specularExponent) {
      const v = parseFloat(result.specularExponent)
      if (!isNaN(v)) result.specular = v
      delete result.specularExponent
    }
    return result
  }

  getOrCreateDef(options) {
    const id = options && options.id
    const result = getGlossGlassDef(id)
    if (options) this.setOptions(options, result)
    return result
  }
}

export const glossglass = {
  tag: 'filter',
  id: DefaultId,
  children: [
    {
      tag: 'feGaussianBlur',
      in: 'SourceAlpha',
      stdDeviation: '8',
      result: 'blur'
    },
    {
      tag: 'feSpecularLighting',
      result: 'specLighting',
      in: 'blur',
      specularConstant: '1.2',
      specularExponent: '12',
      'lighting-color': '#bbbbbb',
      children: [
        {
          tag: 'feDistantLight',
          azimuth: '45',
          elevation: '45'
        }
      ]
    },
    {
      tag: 'feComposite',
      in: 'SourceGraphic',
      in2: 'specLighting',
      operator: 'arithmetic',
      k1: '0',
      k2: '1',
      k3: '1',
      k4: '0'
    }
  ]
}

export function getGlossGlassDef(id?: string) {
  const GDefs = new SvgDefs()
  id = id ? id + '-' + DefaultId : DefaultId
  let vEl = GDefs.get(DefaultId, 'filter')
  if (!vEl) {
    // grayscale.id = id
    vEl = GDefs.add(glossglass)
  }
  return vEl
}
