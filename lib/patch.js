var _ = require('util')

var REPLACE = 0
var REORDER = 1
var PROPS = 2
var TEXT = 3

function patch (node, patches) {
  var walker = { index: 0 }
  dfsWalk(node, walker, patches)
}

function dfsWalk (node, walker, patches) {
  var currentPatches = patches[walker.index]
  var len = node.childNodes ? node.childNodes.length : 0

  for (var i = 0; i < len; i++) {
    var child = node.childNodes[i]
    walker.index++
    dfsWalk(child, walker, patches)
  }
  if (currentPatches) {
    applyPatches(node, currentPatches)
  }
}

/**
 * 应用变更
 */
function applyPatches (node, currentPatches) {
  _.each(currentPatches, function (currentPatch) {
    switch (currentPatch.type) {
      case REPLACE:
        node.replaceChild(node)
        break
      case REORDER:
        reorderChildren()
        break
      case PROPS:
        setProps(node)
        break
      case TEXT:
        node.textContent = currentPatch.content
        break
      default:
        throw new Error('Unknow patch type ' + currentPatch.type)
    }
  })
}

/**
 * 设置属性
 */
function setProps (node, props) {
  for (var key in props) {
    if (props[key] === void 0) {
      node.removeAttribute(key)
    } else {
      _.setAttr(node, key, props[key])
    }
  }
}

/**
 * 重新排序 children
 */
function reorderChildren () {

}

patch.REPLACE = REPLACE
patch.PROPS = PROPS
patch.TEXT = TEXT
patch.REORDER = REORDER

module.exports = patch
