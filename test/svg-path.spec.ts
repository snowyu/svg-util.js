import { path } from '../src/utils/svg-path'

describe('svg-path', () => {
  describe('rect', () => {
    it('should convert a simple rect', () => {
      const result = path.rect({ x: 0, y: 1, width: 200, height: 100 })
      expect(result).toEqual('M0 1h200v100h-200z')
    })
    it('should convert a simple rect with rounded rx', () => {
      const result = path.rect({ x: 0, y: 1, width: 200, height: 100, rx: 10 })
      expect(result).toEqual(
        'M0 11a10 10 0 0 1 10 -10h180a10 10 0 0 1 10 10v80a10 10 0 0 1 -10 10h-180a10 10 0 0 1 -10 -10z'
      )
    })
    it('should convert a simple rect with rounded ry', () => {
      const result = path.rect({ x: 0, y: 1, width: 200, height: 100, ry: 10 })
      expect(result).toEqual(
        'M0 11a10 10 0 0 1 10 -10h180a10 10 0 0 1 10 10v80a10 10 0 0 1 -10 10h-180a10 10 0 0 1 -10 -10z'
      )
    })
    it('should convert a simple rect with rounded rx&ry', () => {
      const result = path.rect({ x: 0, y: 1, width: 200, height: 100, ry: 6, rx: 10 })
      expect(result).toEqual(
        'M0 7a10 6 0 0 1 10 -6h180a10 6 0 0 1 10 6v88a10 6 0 0 1 -10 6h-180a10 6 0 0 1 -10 -6z'
      )
    })
    it('should convert a simple rect with rounded rx&ry > width/2', () => {
      const result = path.rect({ x: 0, y: 1, width: 200, height: 100, ry: 51, rx: 101 })
      expect(result).toEqual(
        'M0 51a100 50 0 0 1 100 -50h0a100 50 0 0 1 100 50v0a100 50 0 0 1 -100 50h0a100 50 0 0 1 -100 -50z'
      )
    })
  })
  describe('circle', () => {
    it('should convert a simple circle', () => {
      const result = path.circle({ cx: 50, cy: 50, r: 50 })
      expect(result).toEqual('M0 50a50 50 0 1 0 100 0a50 50 0 1 0 -100 0z')
    })
  })
  describe('ellipse', () => {
    it('should convert a simple ellipse', () => {
      const result = path.ellipse({ cx: 50, cy: 50, rx: 50, ry: 20 })
      expect(result).toEqual('M0 50a50 20 0 1 0 100 0a50 20 0 1 0 -100 0z')
    })
  })
  describe('line', () => {
    it('should convert a simple line', () => {
      const result = path.line({ x1: 50, y1: 51, x2: 80, y2: 82 })
      expect(result).toEqual('M50 51L80 82')
    })
  })
  describe('polyline', () => {
    it('should convert a simple polyline', () => {
      const result = path.polyline([0, 50, 50, 0, 50, 50])
      expect(result).toEqual('M0 50L50 0 50 50')
    })
  })
  describe('polygon', () => {
    it('should convert a simple polygon', () => {
      const result = path.polygon([0, 50, 50, 0, 50, 50])
      expect(result).toEqual('M0 50L50 0 50 50z')
    })
  })
})
