var _                    = require('underscore');
var AssemblyLineFunction = require('./function');

var incr = 0;

function incrMethod(string) {
  incr ++;
  var re = new RegExp('#{i}', 'g');
  return string.replace(re, incr);
}

var sample = module.exports = function(string) {
  return new AssemblyLineFunction(incrMethod, [string], 2);
}
