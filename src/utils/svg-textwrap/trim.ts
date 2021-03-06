/**
 *  @function trim
 *  @desc Cross-browser implementation of [trim](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim).
 *  @param {String} str
 */
function trim(str: string) {
  return str.replace(/^\s+|\s+$/g, '')
}

/**
 *  @function trimLeft
 *  @desc Cross-browser implementation of [trimLeft](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/TrimLeft).
 *  @param {String} str
 */
function trimLeft(str: string) {
  return str.replace(/^\s+/, '')
}

/**
 *  @function trimRight
 *  @desc Cross-browser implementation of [trimRight](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/TrimRight).
 *  @param {String} str
 */
function trimRight(str: string) {
  return str.replace(/\s+$/, '')
}

export { trim, trimLeft, trimRight }
