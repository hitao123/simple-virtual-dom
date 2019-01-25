var chai = require('chai');
var el = require('../lib/element');

chai.should()

describe('Test Element', function() {
  it('Element\'s count is the sum of children', function() {
    var root = el('ul', {name: 'jerry'}, [
      el('li', null, [el('span')]),
      el('li', null, [el('span')]),
      el('li', null, [el('span')]),
      el('li', null, [el('span')])
    ]);

    root.props.should.be.deep.equal({name: 'jerry'})
    root.tagName.should.be.equal('ul')
    root.children[0].tagName.should.be.equal('li')
  })


  it('Element should have a key propertye if it\'s passed', function () {
    var root = el('li', {key: 'uuid'})
    root.key.should.be.equal('uuid')
  })
  
});