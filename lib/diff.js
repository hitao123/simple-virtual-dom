var _ = require('./util')
var patch = require('./patch')
// var listDiff = require('list-diff2');

/**
 * 比较两颗 dom 🌲
 * @param {Element} oldTree
 * @param {Element} newTree
 */
function diff (oldTree, newTree) {
  var index = 0
  var patches = {}
  console.log(oldTree, newTree)
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

/**
 * 深度优先遍历
 * @param {Element} oldTree
 * @param {Element} newTree
 * @param {} index
 * @param {} patches
 */
function dfsWalk (oldTree, newTree, index, patches) {
  var currentPatch = []
  if (newTree === null) {
    // 结点被移除 不做任何处理
  } else if (_.isString(oldTree) && _.isString(newTree)) {
    // 两个都是文本
    if (newTree !== oldTree) {
      currentPatch.push({
        type: patch.TEXT,
        content: newTree
      })
    }
  } else if (oldTree.tagName === newTree.tagName) {
    // tag 相同 比较属性
    var propsPatches = diffProps(oldTree, newTree)
    if (propsPatches) {
      currentPatch.push({
        type: patch.PROPS,
        props: propsPatches
      })
    }
    // tag 相同 比较子节点
    diffChildren(oldTree.children, newTree.children, index, patches)
  } else {
    currentPatch.push({
      type: patch.REPLACE,
      node: newTree
    })
  }

  if (currentPatch.length) {
    patches[index] = currentPatch
  }
}

/**
 * diff children
 * @param {*} oldChildren
 * @param {*} newChildren
 * @param {*} index
 * @param {*} patches
 */
function diffChildren (oldChildren, newChildren, index, patches) {
  var leftNode = null
  var currentNodeIndex = index
  oldChildren.forEach(function (child, i) {
    var newChild = newChildren[i]
    currentNodeIndex = (leftNode && leftNode.count) ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1
    dfsWalk(child, newChild, currentNodeIndex, patches)
    leftNode = child
  })
}

/**
 * diff 属性
 * @param {*} oldNode
 * @param {*} newNode
 */
function diffProps (oldNode, newNode) {
  var count = 0
  var oldProps = oldNode.oldProps
  var newProps = newNode.oldProps

  var key, value
  var propsPatches = {}
  // 属性值时候改变
  for (key in oldProps) {
    value = oldProps[key]
    if (newProps[key] !== value) {
      propsPatches[key] = newProps[key]
      count++
    }
  }
  // 发现新属性
  for (key in newProps) {
    value = newProps[key]
    if (!oldProps.hasOwnProperty(key)) {
      propsPatches[key] = newProps[key]
      count++
    }
  }

  if (count === 0) {
    return null
  }
  return propsPatches
}

module.exports = diff
