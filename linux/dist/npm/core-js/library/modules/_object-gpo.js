// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has.js');
var toObject = require('./_to-object.js');
var IE_PROTO = require('./_shared-key.js')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
