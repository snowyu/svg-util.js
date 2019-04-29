import { toJSON, toDOM } from '../src/utils/domjson'

describe('domjson', () => {
  describe('toJSON', () => {
    it('should simple dom to JSON', () => {
      const root = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      root.setAttribute('id', 'svg1')
      let v = document.createElement('rect')
      v.setAttribute('width', '500')
      v.setAttribute('height', '600')
      root.append(v)
      v = document.createElement('circle')
      v.setAttribute('r', '50')
      root.append(v)
      const result = toJSON(root)
      expect(result).toMatchObject({
        tag: 'svg',
        ns: 'http://www.w3.org/2000/svg',
        id: 'svg1',
        children: [{ tag: 'RECT', width: '500', height: '600' }, { tag: 'CIRCLE', r: '50' }]
      })
    })
  })
  describe('toDOM', () => {
    it('should convert simple json to dom', () => {
      const result = toDOM({
        tag: 'svg',
        ns: 'http://www.w3.org/2000/svg',
        id: 'svg1',
        style: { visible: 'hidden' },
        dataset: { hi: 'world' },
        children: [
          { tag: 'rect', width: '500', height: '600' },
          { tag: 'circle', r: '50' },
          { tag: 'foreignOject', children: [{ tag: 'div', ns: 'xhtml' }] }
        ]
      }) as SVGSVGElement
      expect(result).toBeInstanceOf(SVGSVGElement)
      expect(toJSON(result)).toMatchObject({
        tag: 'svg',
        ns: 'http://www.w3.org/2000/svg',
        id: 'svg1',
        style: { visible: 'hidden' },
        dataset: { hi: 'world' },
        children: [
          { tag: 'rect', ns: 'http://www.w3.org/2000/svg', width: '500', height: '600' },
          { tag: 'circle', ns: 'http://www.w3.org/2000/svg', r: '50' },
          { tag: 'foreignOject', ns: 'http://www.w3.org/2000/svg', children: [{ tag: 'DIV' }] }
        ]
      })
    })
  })
})
