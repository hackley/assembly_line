var _                    = require('underscore');
var AssemblyLineFunction = require('./function');

var factory = module.exports = function(objectClass, attributes) {
  var newFactory = function(overrides) {
    var attr = _.extend({}, attributes, overrides);
    _executeFunctions(attr);
    var obj = new objectClass(attr);
    return obj;
  }

  newFactory.extend = function(overrides) {
    var newAttributes = _.extend({}, attributes, overrides);
    return factory(objectClass, newAttributes);
  }

  return newFactory;
}

function _executeFunctions(attr) {
  var functions = _getOrderedFunctions(attr);
  _.each(functions, function(fn) {
    attr[fn.key] = fn.value.execute(attr);
  })
}

function _getOrderedFunctions(attr) {
  var attrArray = _getAttrArray(attr);
  return _.filter(attrArray, function(a) {
    return a.value.constructor === AssemblyLineFunction;
  })
}

function _getAttrArray(attr) {
  return _.map(attr, function(value, key) {
    return {
      key: key,
      value: value
    }
  })
}
