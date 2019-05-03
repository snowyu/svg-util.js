interface IRect {
  x: number
  y: number
  width: number
  height: number
  rx?: number
  ry?: number
}

interface ILine {
  x1: number
  y1: number
  x2: number
  y2: number
}

interface IEllipse {
  cx: number
  cy: number
  rx: number
  ry: number
}

interface ICircle {
  cx: number
  cy: number
  r: number
}

export const path = {
  rect,
  circle,
  ellipse,
  line,
  polyline,
  polygon
}

function rect({ x, y, width, height, rx, ry }: IRect) {
  /*
   * rx and ry：
   * 1. rx or ry is zero, no rounded corner.
   * 2. if just rx/ry is none-zero,the another one is the same value.
   * 3. the max rx is the half size of width, the max ry is the half size of height.
   **/
  rx = Number(rx) || 0
  ry = Number(ry) || 0
  rx = rx || ry
  ry = ry || rx

  let result: string

  if (rx === 0 || ry === 0) {
    // no rounded corner just rect:
    result = 'M' + x + ' ' + y + 'h' + width + 'v' + height + 'h' + -width + 'z'
  } else {
    rx = rx > width / 2 ? width / 2 : rx
    ry = ry > height / 2 ? height / 2 : ry

    result =
      'M' +
      x +
      ' ' +
      (y + ry) +
      'a' +
      rx +
      ' ' +
      ry +
      ' 0 0 1 ' +
      rx +
      ' ' +
      -ry +
      'h' +
      (width - rx - rx) +
      'a' +
      rx +
      ' ' +
      ry +
      ' 0 0 1 ' +
      rx +
      ' ' +
      ry +
      'v' +
      (height - ry - ry) +
      'a' +
      rx +
      ' ' +
      ry +
      ' 0 0 1 ' +
      -rx +
      ' ' +
      ry +
      'h' +
      (rx + rx - width) +
      'a' +
      rx +
      ' ' +
      ry +
      ' 0 0 1 ' +
      -rx +
      ' ' +
      -ry +
      'z'
  }

  return result
}

function circle({ cx, cy, r }: ICircle) {
  const result =
    'M' +
    (cx - r) +
    ' ' +
    cy +
    'a' +
    r +
    ' ' +
    r +
    ' 0 1 0 ' +
    2 * r +
    ' 0' +
    'a' +
    r +
    ' ' +
    r +
    ' 0 1 0 ' +
    -2 * r +
    ' 0' +
    'z'
  return result
}

function ellipse({ cx, cy, rx, ry }: IEllipse) {
  const result = isNaN(cx - cy + rx - ry)
    ? ''
    : 'M' +
      (cx - rx) +
      ' ' +
      cy +
      'a' +
      rx +
      ' ' +
      ry +
      ' 0 1 0 ' +
      2 * rx +
      ' 0' +
      'a' +
      rx +
      ' ' +
      ry +
      ' 0 1 0 ' +
      -2 * rx +
      ' 0' +
      'z'
  return result
}

function line({ x1, y1, x2, y2 }: ILine) {
  const result = isNaN(x1 - y1 + (x2 - y2)) ? '' : 'M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2
  return result
}

function polyline(points: number[], isPloygon?: boolean) {
  const result =
    points.length < 4
      ? ''
      : 'M' +
        points.slice(0, 2).join(' ') +
        'L' +
        points.slice(2).join(' ') +
        (isPloygon ? 'z' : '')
  return result
}

export function polygon(points: number[]) {
  return polyline(points, true)
}
