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
    value: function onLoad() {
      console.log(this.$parent.$parent.globalData);
      console.log(this.theme);
      console.log(this.date);
      console.log(this.tip);
      //  if(this.theme == 'today') {
      //    this.records = this.$parent.$parent.globalData.recordsTodayShow
      //  } else {
      //    this.records = this.$parent.$parent.globalData.recordsAll.ovulationTestResultList
      //  }
      //  this.$apply();
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZGl0ZW0uanMiXSwibmFtZXMiOlsiUmVjb3JkSXRlbSIsImNvbnNvbGUiLCJsb2ciLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInRoZW1lIiwiZGF0ZSIsInRpcCIsImNvbXBvbmVudCIsInByb3BzIiwicmVjb3JkcyIsIkFycmF5IiwiQm9vbGVhbiIsIlN0cmluZyIsImRhdGEiLCJldmVudHMiLCIkZXZlbnQiLCJsZW5ndGgiLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiLCJtZXRob2RzIiwidGFwIiwiYWRkIiwibGVuIiwibGlzdCIsInB1c2giLCJpZCIsInRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBNkJUO0FBQ1RDLGNBQVFDLEdBQVIsQ0FBWSxLQUFLQyxPQUFMLENBQWFBLE9BQWIsQ0FBcUJDLFVBQWpDO0FBQ0FILGNBQVFDLEdBQVIsQ0FBWSxLQUFLRyxLQUFqQjtBQUNBSixjQUFRQyxHQUFSLENBQVksS0FBS0ksSUFBakI7QUFDQUwsY0FBUUMsR0FBUixDQUFZLEtBQUtLLEdBQWpCO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0M7Ozs7RUF4Q3FDLGVBQUtDLFM7OztPQUMzQ0MsSyxHQUFRO0FBQ05DLGFBQVNDLEtBREg7QUFFTkwsVUFBTU0sT0FGQTtBQUdOTCxTQUFLSyxPQUhDO0FBSU5QLFdBQU9RO0FBSkQsRztPQU1QQyxJLEdBQU87QUFDTjtBQURNLEc7T0FJUkMsTSxHQUFTO0FBQ1AsdUJBQW1CLDBCQUFhO0FBQUE7O0FBQzlCLFVBQUlDLGtCQUFjLFVBQUtDLE1BQUwsR0FBYyxDQUE1QiwyREFBSjtBQUNBaEIsY0FBUUMsR0FBUixDQUFlLE9BQUtnQixLQUFwQixpQkFBcUNGLE9BQU9HLElBQTVDLGNBQXlESCxPQUFPSSxNQUFQLENBQWNELElBQXZFO0FBQ0Q7QUFKTSxHO09BT1RFLE8sR0FBVTtBQUNSQyxPQURRLGlCQUNEO0FBQ0w7QUFDQXJCLGNBQVFDLEdBQVIsQ0FBWSxLQUFLZ0IsS0FBTCxHQUFhLE1BQXpCO0FBQ0QsS0FKTztBQUtSSyxPQUxRLGlCQUtEO0FBQ0wsVUFBSUMsTUFBTSxLQUFLQyxJQUFMLENBQVVSLE1BQXBCO0FBQ0EsV0FBS1EsSUFBTCxDQUFVQyxJQUFWLENBQWUsRUFBQ0MsSUFBSUgsTUFBTSxDQUFYLEVBQWNJLE9BQU8sV0FBV0osR0FBaEMsRUFBZjtBQUNEO0FBUk8sRzs7a0JBbEJTeEIsVSIsImZpbGUiOiJyZWNvcmRpdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb3JkSXRlbSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIHJlY29yZHM6IEFycmF5LFxuICAgICAgZGF0ZTogQm9vbGVhbixcbiAgICAgIHRpcDogQm9vbGVhbixcbiAgICAgIHRoZW1lOiBTdHJpbmdcbiAgICB9XG4gICAgIGRhdGEgPSB7XG4gICAgICAvLyAgcmVjb3JkczogW11cbiAgICAgfVxuXG4gICAgZXZlbnRzID0ge1xuICAgICAgJ2luZGV4LWJyb2FkY2FzdCc6ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy4kbmFtZX0gcmVjZWl2ZSAkeyRldmVudC5uYW1lfSBmcm9tICR7JGV2ZW50LnNvdXJjZS5uYW1lfWApXG4gICAgICB9XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHRhcCAoKSB7XG4gICAgICAgIC8vIHRoaXMubnVtID0gdGhpcy5udW0gKyAxXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuJG5hbWUgKyAnIHRhcCcpXG4gICAgICB9LFxuICAgICAgYWRkICgpIHtcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubGlzdC5sZW5ndGhcbiAgICAgICAgdGhpcy5saXN0LnB1c2goe2lkOiBsZW4gKyAxLCB0aXRsZTogJ3RpdGxlXycgKyBsZW59KVxuICAgICAgfVxuICAgIH1cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgIGNvbnNvbGUubG9nKHRoaXMuJHBhcmVudC4kcGFyZW50Lmdsb2JhbERhdGEpXG4gICAgIGNvbnNvbGUubG9nKHRoaXMudGhlbWUpXG4gICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0ZSlcbiAgICAgY29uc29sZS5sb2codGhpcy50aXApXG4gICAgLy8gIGlmKHRoaXMudGhlbWUgPT0gJ3RvZGF5Jykge1xuICAgIC8vICAgIHRoaXMucmVjb3JkcyA9IHRoaXMuJHBhcmVudC4kcGFyZW50Lmdsb2JhbERhdGEucmVjb3Jkc1RvZGF5U2hvd1xuICAgIC8vICB9IGVsc2Uge1xuICAgIC8vICAgIHRoaXMucmVjb3JkcyA9IHRoaXMuJHBhcmVudC4kcGFyZW50Lmdsb2JhbERhdGEucmVjb3Jkc0FsbC5vdnVsYXRpb25UZXN0UmVzdWx0TGlzdFxuICAgIC8vICB9XG4gICAgLy8gIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICB9XG4iXX0=