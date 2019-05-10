import { textWrap, textSplit } from '../../../src/utils/svg-textwrap'

describe('textSplit', () => {
  it('should get default values of wrapper', () => {
    const wrapper = textWrap()
    expect(wrapper.height()).toStrictEqual(200)
    expect(wrapper.width()).toStrictEqual(200)
    expect(wrapper.split()).toStrictEqual(textSplit)
    expect(wrapper.overflow()).toStrictEqual(false)
    expect(wrapper.lineHeight()).toBeUndefined()
    expect(wrapper.maxLines()).toBeNull()
    expect(wrapper.fontSize()).toStrictEqual(16)
    expect(wrapper.fontFamily()).toStrictEqual('sans-serif')
  })

  it('should wrap emoji unicode text', () => {
    const text =
      '⛰不在高，有🧚就行，💧️不在深，有“🐉️”则灵。斯是陋室，惟吾德馨。苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴🦆，阅金经📖️。无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？'
    const wrapper = textWrap()
    let result = wrapper(text)
    // console.log(result.lines);
    expect(result.truncated).toBeTruthy()
    expect(result.lines).toEqual([
      '⛰不在高，有🧚就行，💧',
      '️不在深，有“🐉️”则灵',
      '。斯是陋室，惟吾德馨。苔',
      '痕上阶绿，草色入帘青。谈',
      '笑有鸿儒，往来无白丁。可',
      '以调素琴🦆，阅金经📖️。',
      '无丝竹之乱耳，无案牍之劳',
      '形。南阳诸葛庐，西蜀子云'
    ])
    wrapper.maxLines(3)
    result = wrapper(text)
    expect(result.truncated).toBeTruthy()
    expect(result.lines).toEqual([
      '⛰不在高，有🧚就行，💧',
      '️不在深，有“🐉️”则灵',
      '。斯是陋室，惟吾德馨。苔'
    ])
  })
})
