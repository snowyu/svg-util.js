import { setAttributes, getAttributes } from '../../utils'
import { SvgDefs } from '../svg-defs'
import { Def } from '../svg-def'

const DefaultId = 'brightness'

/**
 * adjust image brightness filter
 * slope > 1 improve brightness
 * slope < 1 reduce brightness.
 */
export class BrightnessFilter extends Def {
  setOptions({ slope, intercept }, aEl = this.FEl) {
    if (slope != null || intercept != null) {
      const vChildren = aEl.children[0].children
      for (let i = 0; i < vChildren.length; i++) {
        setAttributes(vChildren[i], { slope, intercept })
      }
    }
  }

  getOptions(aNames: string | string[] = ['slope', 'intercept']) {
    const vEl = this.FEl.children[0].children[0]
    return getAttributes(vEl, aNames)
  }

  getOrCreateDef(options) {
    const id = options && options.id
    const result = getBrightnessDef(id)
    if (options) this.setOptions(options, result)
    return result
  }
}

/*
https://vanseodesign.com/web-design/svg-filter-primitives-fecomponenttransfer/

type = "identity | table | discrete | linear | gamma"

* `identity` sets the resulting value equal to the input value. In other words it doesn’t change it. This is the default for any transfer function that isn’t set.
* `table` maps equal segments of a color channel to output ranges which are set using supplied values
* `discrete` maps equal segments of a color channel to specific output values set using supplied values
* `linear` applies a linear formula to change color values. uses the following linear equation to modify the color of each pixel in the specific color channel.
  * C' = slope * C + intercept
* `gamma` applies a gamma function to change color values

 */
export const brightness = {
  tag: 'filter',
  id: DefaultId,
  children: [
    {
      tag: 'feComponentTransfer',
      children: [
        {
          tag: 'feFuncR',
          type: 'linear',
          slope: '1.2',
          intercept: '0'
        },
        {
          tag: 'feFuncG',
          type: 'linear',
          slope: '1.2',
          intercept: '0'
        },
        {
          tag: 'feFuncB',
          type: 'linear',
          slope: '1.2',
          intercept: '0'
        }
      ]
    }
  ]
}

export function getBrightnessDef(id?: string) {
  const GDefs = new SvgDefs()
  id = id ? id + '-' + DefaultId : DefaultId
  let vEl = GDefs.get(DefaultId, 'filter')
  if (!vEl) {
    // grayscale.id = id
    vEl = GDefs.add(brightness)
  }
  return vEl
}
