var _ = require('./util')

/**
 * Element
 * @param {String} tagName
 * @param {Object} props 元素属性 object 键值对存储
 * @param {Array<Element|String>} children 元素的 children 元素, 可以是字符串 或者 Element
 */
function Element (tagName, props, children) {
  if (!(this instanceof Element)) {
    // 如果以函数的调用方式 返回一个实例
    // if (!_.isArray(children) && children != null) {
    //   children = _.slice(arguments, 2).filter(_.truthy)
    //   console.log(arguments, children);
    // }
    return new Element(tagName, props, children)
  }

  // 如果第二个传的是数组
  if (_.isArray(props)) {
    children = props
    props = {}
  }

  this.tagName = tagName
  this.props = props || {}
  this.children = children || []
  // 每一个 virtual DOM 需要一个唯一的 key
  this.key = props ? props.key : void 0

  var count = 0

  _.each(this.children, function (child, i) {
    if (child instanceof Element) {
      count += child.count
    } else {
      children[i] = '' + child
    }
    count++
  })

  this.count = count
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
