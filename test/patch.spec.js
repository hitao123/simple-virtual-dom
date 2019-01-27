/* global describe, it*/

var el = require('../lib/element')
var diff = require('../lib/diff')
var patch = require('../lib/patch')
var jsdom = require('mocha-jsdom')

var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
chai.use(sinonChai)
chai.should()

jsdom()

describe('Test Patch function', function () {
  it('Attribute adding', function () {
    var root = el('div', {id: 'content'}, [
      el('p', ['I love you']),
      el('div', ['I love you']),
      el('section', ['I love you'])
    ])

    var root2 = el('div', {id: 'content'}, [
      el('p', ['I love you']),
      el('div', {name: 'Jerry'}, ['I love you']),
      el('section', ['I love you'])
    ])

    var dom = root.render()
    var patches = diff(root, root2)
    var spy = dom.childNodes[1].setAttribute = sinon.spy()

    patch(dom, patches)

    spy.should.has.been.calledWith('name', 'Jerry').once
  })
  it('Attribute remove', function () {

  })
  it('Node Replaceing', function () {

  })
  it('Text Replace', function () {

  })
})
