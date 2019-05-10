import { textSplit } from '../../../src/utils/svg-textwrap'

describe('textSplit', () => {
  it('should split emoji unicode', () => {
    const result = textSplit('⛰不在高，有🧚就行，💧️不在深，有“🐉️”则灵。')
    // console.log(result);
    expect(result).toEqual([
      '⛰',
      '不',
      '在',
      '高',
      '，',
      '有',
      '🧚',
      '就',
      '行',
      '，',
      '💧',
      '️',
      '不',
      '在',
      '深',
      '，',
      '有',
      '“',
      '🐉',
      '️',
      '”',
      '则',
      '灵',
      '。'
    ])
  })
})
