var _ = require('underscore');

var AssemblyLineFunction = module.exports = function(method, args) {
  this.method = method;
  this.args = args;
}

AssemblyLineFunction.prototype.execute = function(attr) {
  var arguments = _.flatten([this.args, attr], true);
  return this.method.apply(this, arguments);
}
