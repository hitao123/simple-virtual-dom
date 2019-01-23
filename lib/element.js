var _ = require('./util')

/**
 * Element
 * @param {*} tagName
 * @param {*} props
 * @param {*} children
 */
function Element (tagName, props, children) {
  if (!(this instanceof Element)) {
    return new Element(tagName, props, children)
  }
  this.tagName = tagName
  this.props = props || {}
  this.children = children || []
}

Element.prototype.render = function () {
  var el = document.createElement(this.tagName)
  var props = this.props

  for (var key in props) {
    _.setAttr(el, key, props[key])
  }

  this.children.forEach(function (child) {
    var childEl = (child instanceof Element) ? child.render() : document.createTextNode(child)
    el.appendChild(childEl)
  })

  return el
}

module.exports = Element
