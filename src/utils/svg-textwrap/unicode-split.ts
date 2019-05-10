// more complex way: https://github.com/foliojs/linebreak
// https://github.com/essdot/spliddit
const HIGH_SURROGATE_START = 0xd800
const HIGH_SURROGATE_END = 0xdbff

const LOW_SURROGATE_START = 0xdc00

const REGIONAL_INDICATOR_START = 0x1f1e6
const REGIONAL_INDICATOR_END = 0x1f1ff

const FITZPATRICK_MODIFIER_START = 0x1f3fb
const FITZPATRICK_MODIFIER_END = 0x1f3ff

export function splitStr(s, delimiter?: RegExp | string) {
  if (s === undefined || s === null) {
    throw new Error('s cannot be undefined or null')
  }

  if (Array.isArray(s)) {
    s = s.join('')
  }

  if (delimiter instanceof RegExp || (typeof delimiter === 'string' && delimiter.length)) {
    return s.split(delimiter)
  }

  return split_into_chars(s)
}

function split_into_chars(s: string) {
  let i = 0
  let increment
  const result: any = []

  while (i < s.length) {
    increment = take_how_many(i, s)
    result.push(s.substring(i, i + increment))
    i += increment
  }

  return result
}

// Decide how many code units make up the current character.
// BMP characters: 1 code unit
// Non-BMP characters (represented by surrogate pairs): 2 code units
// Emoji with skin-tone modifiers: 4 code units (2 code points)
// Country flags: 4 code units (2 code points)
function take_how_many(i, s) {
  const lastIndex = s.length - 1
  const current = s[i]
  let currentPair
  let nextPair

  // If we don't have a value that is part of a surrogate pair, or we're at
  // the end, only take the value at i
  if (!is_first_of_surrogate_pair(current) || i === lastIndex) {
    return 1
  }

  // If the array isn't long enough to take another pair after this one, we
  // can only take the current pair
  if (i + 3 > lastIndex) {
    return 2
  }

  currentPair = current + s[i + 1]
  nextPair = s.substring(i + 2, i + 5)

  // Country flags are comprised of two regional indicator symbols,
  // each represented by a surrogate pair.
  // See http://emojipedia.org/flags/
  // If both pairs are regional indicator symbols, take 4
  if (is_regional_indicator_symbol(currentPair) && is_regional_indicator_symbol(nextPair)) {
    return 4
  }

  // If the next pair make a Fitzpatrick skin tone
  // modifier, take 4
  // See http://emojipedia.org/modifiers/
  // Technically, only some code points are meant to be
  // combined with the skin tone modifiers. This function
  // does not check the current pair to see if it is
  // one of them.
  if (is_fitzpatrick_modifier(nextPair)) {
    return 4
  }

  return 2
}

function is_first_of_surrogate_pair(c) {
  if (c === void 0 || c === null || !c.hasOwnProperty(0)) {
    return false
  }

  return between_inclusive(c[0].charCodeAt(0), HIGH_SURROGATE_START, HIGH_SURROGATE_END)
}

function has_pair(s) {
  if (typeof s !== 'string') {
    return false
  }

  return s.split('').some(is_first_of_surrogate_pair)
}

function is_regional_indicator_symbol(s) {
  const codePoint = code_point_from_surrogate_pair(s)

  return between_inclusive(codePoint, REGIONAL_INDICATOR_START, REGIONAL_INDICATOR_END)
}

function is_fitzpatrick_modifier(s) {
  const codePoint = code_point_from_surrogate_pair(s)

  return between_inclusive(codePoint, FITZPATRICK_MODIFIER_START, FITZPATRICK_MODIFIER_END)
}

// Turn two code units (surrogate pair) into
// the code point they represent.
function code_point_from_surrogate_pair(s) {
  const highOffset = s.charCodeAt(0) - HIGH_SURROGATE_START
  const lowOffset = s.charCodeAt(1) - LOW_SURROGATE_START

  // tslint:disable-next-line: no-bitwise
  return (highOffset << 10) + lowOffset + 0x10000
}

function between_inclusive(value, lowerBound, upperBound) {
  return value >= lowerBound && value <= upperBound
}

export const isFirstOfPair = is_first_of_surrogate_pair
export const hasPair = has_pair
