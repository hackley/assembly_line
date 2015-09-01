var expect               = require('chai').expect;
var factory              = require('../lib/factory');
var AssemblyLineFunction = require('../lib/function');

describe('factory', function() {

  it('registers a new factory', function() {
    var user = factory(Object, {
      firstName: 'johnny',
      lastName: 'quest'
    })
    var johnny = user();
    expect(johnny.firstName).to.equal('johnny');
    expect(johnny.lastName).to.equal('quest');
  })

  it('creates independent instances of the factory', function() {
    var user = factory(Object, {
      firstName: 'johnny',
      lastName: 'quest'
    })
    var johnny1 = user();
    var johnny2 = user();
    johnny1.firstName = 'john';
    expect(johnny1.firstName).to.equal('john');
    expect(johnny2.firstName).to.equal('johnny');
  })

  it('allows you to override the default factory values', function() {
    var user = factory(Object, {
      firstName: 'johnny',
      lastName: 'quest'
    })
    var james = user({ firstName: 'james' })
    expect(james.firstName).to.equal('james');
  })

  it('extends another factory', function() {
    var johnny = factory(Object, {
      firstName: 'johnny',
      lastName: 'quest'
    })
    var james = johnny.extend({
      firstName: 'james'
    })
    expect(johnny().firstName).to.equal('johnny');
    expect(james().firstName).to.equal('james');
  })

  it('executes AssemblyLineFunctions when creating a new instance', function() {
    _returnNum = function(num) {
      return num
    }
    var user = factory(Object, {
      age: new AssemblyLineFunction(_returnNum, [46])
    })
    var u = user();
    expect(u.age).to.equal(46);
  })

}); // factory
