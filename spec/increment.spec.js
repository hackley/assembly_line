var expect               = require('chai').expect;
var _                    = require('underscore');
var increment            = require('../lib/increment');
var AssemblyLineFunction = require('../lib/function');

describe('increment', function() {

  it('returns an AssemblyLineFunction object', function() {
    var fn = increment('test-#{i}-test');
    expect(fn.constructor).to.equal(AssemblyLineFunction);
  })

  it('returns a string with #{i} replaced by an incremented integer', function() {
    var fn = increment('test-#{i}-test');
    expect(fn.execute()).to.equal('test-1-test');
    expect(fn.execute()).to.equal('test-2-test');
    expect(fn.execute()).to.equal('test-3-test');
  })

}); // increment
