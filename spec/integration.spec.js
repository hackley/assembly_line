var expect       = require('chai').expect;
var _            = require('underscore');
var AssemblyLine = require('../');

describe('Integration', function() {

  it ('creates new instances of a factory', function() {
    var names = [ 'john', 'jane', 'joe' ]
    var user = AssemblyLine.factory(Object, {
      firstName: AssemblyLine.sample(names),
      lastName: 'Smith',
      email: AssemblyLine.incr('jsmith#{i}@example.com')
    })

    var lastEmailIncr;
    _.times(5, function(i) {
      var js = user();
      expect(_.contains(names, js.firstName)).to.equal(true);
      expect(js.lastName).to.equal('Smith');
      var thisEmailIncr = Number(js.email.replace('jsmith', '').replace('@example.com'));
      if (lastEmailIncr)
        expect(thisEmailIncr - 1).to.equal(lastEmailIncr);
      lastEmailIncr = thisEmailIncr;
    })
  })

  it('handles multiple factories', function() {
    var names = {
      clintons: [ 'Bill', 'Hillary', 'Chelsea' ],
      bushes: [ 'George', 'Jenna', 'Jeb' ]
    }
    var clinton = AssemblyLine.factory(Object, {
      firstName: AssemblyLine.sample(names.clintons),
      lastName: 'Clinton'
    })
    var bush = AssemblyLine.factory(Object, {
      firstName: AssemblyLine.sample(names.bushes),
      lastName: 'Bush'
    })

    clinton1 = clinton();
    expect(_.contains(names.clintons, clinton1.firstName)).to.equal(true);

    bush1 = bush();
    expect(_.contains(names.bushes, bush1.firstName)).to.equal(true);
  })

  it('handles custom constructor classes', function() {
    var _users = [];
    var User = function(params) {
      this.params = params;
      this.save = function() {
        _users.push(this);
      }
    }
    var userFactory = AssemblyLine.factory(User, {
      firstName: AssemblyLine.sample([
        'Michael', 'Jannet', 'Tito'
      ]),
      lastName: 'Jackson'
    })
    var user = userFactory();
    expect(user.constructor).to.equal(User);
    user.save();
    expect(_users[0].params.lastName).to.equal('Jackson');
  })

}); // Integration
