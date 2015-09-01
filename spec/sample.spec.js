var expect               = require('chai').expect;
var _                    = require('underscore');
var sample               = require('../lib/sample');
var AssemblyLineFunction = require('../lib/function');

describe('sample', function() {

  it('returns an AssemblyLineFunction object', function() {
    var names = ['johnny', 'joe', 'jane'];
    var fn = sample(names);
    expect(fn.constructor).to.equal(AssemblyLineFunction);
  })

  it('picks a random item from the options list when executed', function() {
    var names = ['johnny', 'joe', 'jane'];
    var fn = sample(names);
    _.times(3, function() {
      var res = fn.execute();
      expect(_.contains(names, res)).to.equal(true);
    })
  })

}); // sample
