/* global describe, it */
var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
chai.use(sinonChai)
chai.should()
var el = require('../lib/element')

chai.should()

describe('Test Element', function () {
  it('Element\'s count is the sum of children', function () {
    var root = el('ul', {name: 'jerry'}, [
      el('li', null, [el('span')]),
      el('li', null, [el('span')]),
      el('li', null, [el('span')]),
      el('li', null, [el('span')])
    ])

    root.count.should.be.equal(8)
    root.props.should.be.deep.equal({name: 'jerry'})
    root.tagName.should.be.equal('ul')
    root.children[0].tagName.should.be.equal('li')
  })

  it('Element should have a key propertye if it\'s passed', function () {
    var root = el('li', {key: 'uuid'})
    root.key.should.be.equal('uuid')
  })

  it('calling rendering', function () {
    global.document = {}
    var props = {dataStyle: 'color: red'}
    var root = el('ul', props, [
      el('li'),
      el('li', [el('span')]),
      'Fuck'
    ])
    var spy0 = sinon.spy()
    var spy3 = sinon.spy()
    var spy2 = document.createTextNode = sinon.spy()
    var spy1 = document.createElement = sinon.stub().returns({
      setAttribute: spy0,
      appendChild: spy3,
      style: {}
    })
    root.render()
    spy0.should.have.calledWith('dataStyle', 'color: red')
    spy1.should.have.callCount(4)
    spy2.should.have.been.calledWith('Fuck')
    spy3.should.have.callCount(4)
  })
  it('Using `count` to get DFS index is right', function () {

  })
})
