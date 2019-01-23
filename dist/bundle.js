(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
exports.el = require('./lib/element');
exports.diff = require('./lib/diff');
exports.patch = require('./lib/patch');

},{"./lib/diff":2,"./lib/element":3,"./lib/patch":4}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
var _ = require('./util');

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
  this.tagName = tagName;
  this.props = props || {};
  this.children = children || [];
}

Element.prototype.render = function() {
  var el = document.createElement(this.tagName);
  var props = this.props;

  for (var key in props) {
    console.log(key, props[key])
    _.setAttr(el, key, props[key]);
  }

  this.children.forEach(function(child) {
    var childEl = (child instanceof Element) ? child.render() : document.createTextNode(child);
    el.appendChild(childEl);
  });

  return el;
}

module.exports = Element;

},{"./util":5}],4:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],5:[function(require,module,exports){
var _ = exports

_.type = function (obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}

_.isArray = function isArray (list) {
  return _.type(list) === 'Array'
}

_.slice = function slice (arrayLike, index) {
  return Array.prototype.slice.call(arrayLike, index)
}

_.truthy = function truthy (value) {
  return !!value
}

_.isString = function isString (list) {
  return _.type(list) === 'String'
}

_.each = function each (array, fn) {
  for (var i = 0, len = array.length; i < len; i++) {
    fn(array[i], i)
  }
}

_.toArray = function toArray (listLike) {
  if (!listLike) {
    return []
  }

  var list = []

  for (var i = 0, len = listLike.length; i < len; i++) {
    list.push(listLike[i])
  }

  return list
}

_.setAttr = function setAttr (node, key, value) {
  switch (key) {
    case 'style':
      node.style.cssText = value
      break
    case 'value':
      var tagName = node.tagName || ''
      tagName = tagName.toLowerCase()
      if (
        tagName === 'input' || tagName === 'textarea'
      ) {
        node.value = value
      } else {
        // if it is not a input or textarea, use `setAttribute` to set
        node.setAttribute(key, value)
      }
      break
    default:
      node.setAttribute(key, value)
      break
  }
}


},{}],6:[function(require,module,exports){
window.svd = require('./index')
},{"./index":1}]},{},[6]);
