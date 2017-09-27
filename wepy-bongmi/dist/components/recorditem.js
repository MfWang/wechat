'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2, _initialiseProps;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecordItem = (_temp2 = _class = function (_wepy$component) {
  _inherits(RecordItem, _wepy$component);

  function RecordItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RecordItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecordItem.__proto__ || Object.getPrototypeOf(RecordItem)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RecordItem, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return RecordItem;
}(_wepy2.default.component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.props = {
    records: Array,
    date: Boolean,
    tip: Boolean,
    theme: String
  };
  this.data = {
    //  records: []
  };
  this.events = {
    'index-broadcast': function indexBroadcast() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(_this2.$name + ' receive ' + $event.name + ' from ' + $event.source.name);
    }
  };
  this.methods = {
    tap: function tap() {
      // this.num = this.num + 1
      console.log(this.$name + ' tap');
    },
    add: function add() {
      var len = this.list.length;
      this.list.push({ id: len + 1, title: 'title_' + len });
    }
  };
}, _temp2);
exports.default = RecordItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZGl0ZW0uanMiXSwibmFtZXMiOlsiUmVjb3JkSXRlbSIsImNvbXBvbmVudCIsInByb3BzIiwicmVjb3JkcyIsIkFycmF5IiwiZGF0ZSIsIkJvb2xlYW4iLCJ0aXAiLCJ0aGVtZSIsIlN0cmluZyIsImRhdGEiLCJldmVudHMiLCIkZXZlbnQiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwiJG5hbWUiLCJuYW1lIiwic291cmNlIiwibWV0aG9kcyIsInRhcCIsImFkZCIsImxlbiIsImxpc3QiLCJwdXNoIiwiaWQiLCJ0aXRsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQTZCVCxDQUNUOzs7O0VBOUJxQyxlQUFLQyxTOzs7T0FDM0NDLEssR0FBUTtBQUNOQyxhQUFTQyxLQURIO0FBRU5DLFVBQU1DLE9BRkE7QUFHTkMsU0FBS0QsT0FIQztBQUlORSxXQUFPQztBQUpELEc7T0FNUEMsSSxHQUFPO0FBQ047QUFETSxHO09BSVJDLE0sR0FBUztBQUNQLHVCQUFtQiwwQkFBYTtBQUFBOztBQUM5QixVQUFJQyxrQkFBYyxVQUFLQyxNQUFMLEdBQWMsQ0FBNUIsMkRBQUo7QUFDQUMsY0FBUUMsR0FBUixDQUFlLE9BQUtDLEtBQXBCLGlCQUFxQ0osT0FBT0ssSUFBNUMsY0FBeURMLE9BQU9NLE1BQVAsQ0FBY0QsSUFBdkU7QUFDRDtBQUpNLEc7T0FPVEUsTyxHQUFVO0FBQ1JDLE9BRFEsaUJBQ0Q7QUFDTDtBQUNBTixjQUFRQyxHQUFSLENBQVksS0FBS0MsS0FBTCxHQUFhLE1BQXpCO0FBQ0QsS0FKTztBQUtSSyxPQUxRLGlCQUtEO0FBQ0wsVUFBSUMsTUFBTSxLQUFLQyxJQUFMLENBQVVWLE1BQXBCO0FBQ0EsV0FBS1UsSUFBTCxDQUFVQyxJQUFWLENBQWUsRUFBQ0MsSUFBSUgsTUFBTSxDQUFYLEVBQWNJLE9BQU8sV0FBV0osR0FBaEMsRUFBZjtBQUNEO0FBUk8sRzs7a0JBbEJTdEIsVSIsImZpbGUiOiJyZWNvcmRpdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb3JkSXRlbSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIHJlY29yZHM6IEFycmF5LFxuICAgICAgZGF0ZTogQm9vbGVhbixcbiAgICAgIHRpcDogQm9vbGVhbixcbiAgICAgIHRoZW1lOiBTdHJpbmdcbiAgICB9XG4gICAgIGRhdGEgPSB7XG4gICAgICAvLyAgcmVjb3JkczogW11cbiAgICAgfVxuXG4gICAgZXZlbnRzID0ge1xuICAgICAgJ2luZGV4LWJyb2FkY2FzdCc6ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS5uYW1lfWApXG4gICAgICB9XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHRhcCAoKSB7XG4gICAgICAgIC8vIHRoaXMubnVtID0gdGhpcy5udW0gKyAxXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuJG5hbWUgKyAnIHRhcCcpXG4gICAgICB9LFxuICAgICAgYWRkICgpIHtcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubGlzdC5sZW5ndGhcbiAgICAgICAgdGhpcy5saXN0LnB1c2goe2lkOiBsZW4gKyAxLCB0aXRsZTogJ3RpdGxlXycgKyBsZW59KVxuICAgICAgfVxuICAgIH1cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgfVxuICB9XG4iXX0=