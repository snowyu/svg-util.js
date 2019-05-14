// convert camelCase to dash.
import { hyphenate } from './hyphenate'

const nativeDataset = {
  set: function(node, attr, value) {
    node.dataset[attr] = value
  },
  get: function(node, attr) {
    return node.dataset[attr]
  },
  del: function(node, attr) {
    delete node.dataset[attr]
  }
}

const attrDataset = {
  set: function(node, attr, value) {
    node.setAttribute('data-' + hyphenate(attr), value)
  },
  get: function(node, attr) {
    return node.getAttribute('data-' + hyphenate(attr))
  },
  del: function(node, attr) {
    node.removeAttribute('data-' + hyphenate(attr))
  }
}

let hasDataset
try {
  hasDataset = SVGElement.prototype.dataset
} catch (err) {
  // on Chrome has dataset visit prototype.dataset will raise error.
  hasDataset = true
}
/**
 * polyfill the svg element dataset.
 */
export const dataset = hasDataset ? nativeDataset : attrDataset
