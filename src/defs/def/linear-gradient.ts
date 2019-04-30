import { toDOM, toJSON, setAttributes, getAttributes, IJsonDom } from '../../utils'
import { SvgDefs } from '../svg-defs'
import { Def } from '../svg-def'
import { IGradientStop } from './gradient-stop'

const DefaultId = 'gradient'

export class LinearGradient extends Def {
  clearStops(aEl = this.FEl) {
    while (aEl.lastChild) {
      aEl.removeChild(aEl.lastChild)
    }
  }

  addStops(aStop: IGradientStop | IGradientStop[], aEl = this.FEl) {
    if (!Array.isArray(aStop)) {
      this.addStop(aStop)
    } else {
      aStop.forEach(i => this.addStop(i))
    }
  }

  addStop(aStop: IGradientStop, aEl = this.FEl) {
    aStop.tag = 'stop'
    toDOM(aStop as IJsonDom, aEl)
  }

  setOptions({ stops }, aEl = this.FEl) {
    if (stops) {
      this.clearStops(aEl)
      this.addStops(stops, aEl)
    }
  }

  get stops() {
    let result = toJSON(this.FEl)
    result = result.children
    return result
  }

  set stops(value) {
    if (value) {
      this.clearStops()
      this.addStops(value)
    }
  }

  getOptions(aNames: string | string[] = ['stops']) {
    let result
    if (aNames.indexOf('stops') >= 0) {
      result = this.stops
    } else {
      result = {}
    }
    return result
  }

  getOrCreateDef(options) {
    const id = options && options.id
    const result = getLinearGradientDef(id)
    if (options) this.setOptions(options, result)
    return result
  }
}

export const linearGradient = {
  tag: 'linearGradient',
  id: DefaultId,
  children: [
    {
      tag: 'stop',
      offset: '0',
      'stop-color': 'white',
      'stop-opacity': '0.25'
    },
    {
      tag: 'stop',
      offset: '1',
      'stop-color': 'white',
      'stop-opacity': '1'
    }
  ]
}

export function getLinearGradientDef(id?: string) {
  const GDefs = new SvgDefs()
  id = id ? id + '-' + DefaultId : DefaultId
  let vEl = GDefs.get(id, 'linear')
  if (!vEl) {
    // grayscale.id = id
    vEl = GDefs.add(linearGradient)
  }
  return vEl
}
