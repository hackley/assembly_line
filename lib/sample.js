var _                    = require('underscore');
var AssemblyLineFunction = require('./function');

function sampleMethod(items) {
  return _.sample(items);
}

var sample = module.exports = function(items) {
  return new AssemblyLineFunction(sampleMethod, [items]);
}
