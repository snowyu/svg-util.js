import { setAttributes, getAttributes } from '../../utils'
import { SvgDefs } from '../svg-defs'
import { Def } from '../svg-def'

const DecimalPlaces = 6
const DefaultRx = 0.0618
const DefaultId = 'roundedRect'

export class RoundedRectClip extends Def {
  public get rx() {
    const { rx } = this.getOptions('rx')
    return rx
  }

  public set rx(value) {
    this.setOptions({ rx: value })
  }

  public get ry() {
    const { ry } = this.getOptions('ry')
    return ry
  }

  public set ry(value) {
    this.setOptions({ ry: value })
  }

  setOptions({ rx, ry }: { rx?; ry? }, aEl = this.FEl) {
    if (rx != null || ry != null) {
      // const vEl = aEl.querySelector('rect');
      const vEl = this.FEl.children[0]
      if (vEl) setAttributes(vEl, { rx, ry })
    }
  }

  getOptions(aNames: string | string[] = ['rx', 'ry']) {
    // const vEl = this.FEl.querySelector('rect');
    const vEl = this.FEl.children[0]
    if (vEl) return getAttributes(vEl, aNames)
  }

  getOrCreateDef(options?) {
    if (!options) options = {}
    const { id, width, height, rx, ry } = options
    const el = getRoundedRectClip(id, width, height, rx, ry)
    return el
  }
}

export function getRoundedRectClip(
  id: string,
  width: number = 1,
  height: number = 1,
  rx?: number,
  ry?: number
) {
  const GDefs = new SvgDefs()
  const FRoundedRect: any = {
    tag: 'rect',
    rx: DefaultRx,
    width: 1,
    height: 1
  }
  const FRoundedRectClip = {
    id: '',
    tag: 'clipPath',
    clipPathUnits: 'objectBoundingBox',
    children: [FRoundedRect]
  }
  if (rx! > 1) rx = rx! / width
  if (ry! > 1) ry = ry! / width

  const { width: w, height: h } = calcAspectRatio(width, height)

  const vId: any = getId(w, h, id)

  let vEl = GDefs.get(vId, 'clipPath')

  if (vEl && vEl.children.length) {
    if (rx || ry) {
      const vRect = vEl.children[0]
      setAttributes(vRect, { rx, ry })
    }
  } else {
    FRoundedRectClip.id = vId
    FRoundedRect.width = w
    FRoundedRect.height = h
    if (rx) FRoundedRect.rx = rx
    if (ry) FRoundedRect.ry = ry
    vEl = GDefs.set(FRoundedRectClip)
  }
  // if (vEl) {
  //   id = vEl.getAttribute('id');
  // } else {
  //   id = '';
  // }
  return vEl
}

function calcAspectRatio(width: number, height: number) {
  let ratio
  if (width < height) {
    ratio = width / height
    width = ratio.toFixed(DecimalPlaces)
    height = 1
  } else {
    ratio = height / width
    width = 1
    height = ratio.toFixed(DecimalPlaces)
  }
  return { width, height }
}

function getId(width, height, id?) {
  id = id ? id + '-' + DefaultId : DefaultId
  if (width > 1 || height > 1) {
    const r = calcAspectRatio(width, height)
    width = r.width
    height = r.height
  }

  const result = `${id}${width}_${height}`
  return result
}
