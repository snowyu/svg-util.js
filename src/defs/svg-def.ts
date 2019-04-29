/**
 * The abstract class to define.
 */
export abstract class Def {
  protected FEl: Element

  public get id() {
    const vEl = this.FEl
    return vEl.getAttribute('id')
  }

  constructor(options?) {
    const el = this.getOrCreateDef(options)
    this.FEl = el
  }

  abstract getOrCreateDef(options): Element
}
