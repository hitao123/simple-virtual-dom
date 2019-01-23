var _ = require('./util')
var patch = require('./patch')
// var listDiff = require('list-diff2');

/**
 * diff tree
 * @param {*} oldTree
 * @param {*} newTree
 */
function diff (oldTree, newTree) {
  var index = 0
  var patches = {}
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

/**
 * 深度优先遍历
 * @param {*} oldTree
 * @param {*} newTree
 * @param {*} index
 * @param {*} patches
 */
function dfsWalk (oldTree, newTree, index, patches) {
  var currentPatch = []
  if (newNode === null) {
    //
  } else if (_.isString(oldTree) && _.isString(newTree)) {
    if (oldTree !== oldTree) {
      currentPatch.push({
        type: patch.TEXT,
        content: newNode
      })
    }
  } else if (oldTree.tagName === newTree.tagName) {
    // Diff props
    var propsPatches = diffProps(oldNode, newNode)
    if (propsPatches) {
      currentPatch.push({
        type: patch.PROPS,
        props: propsPatches
      })
    }
    // diff children
    diffChildren(oldTree.children, newTree.children, index, patches, currentPatch)
  } else {
    currentPatch.push({
      type: patch.REPLACE,
      props: newTree
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
function diffChildren (oldChildren, newChildren, index, patches, currentPatch) {
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
