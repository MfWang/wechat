'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Payment = function (_wepy$page) {
  _inherits(Payment, _wepy$page);

  function Payment() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Payment);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Payment.__proto__ || Object.getPrototypeOf(Payment)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '蓝牙'
    }, _this.data = {
      index: 0,
      array: ['查命令', '查语义'],
      results: [{
        abb: 'cal',
        Benelux: 'calndar',
        mean: '日历。不是计算的意思，很有趣，敲个命令试一下，会显示当前月的日历',
        lists: ['$ cd ..', '$ cd ~', '$ cd /usr/local']
      }, {
        abb: 'cal',
        Benelux: 'calndar',
        mean: '日历。不是计算的意思，很有趣，敲个命令试一下，会显示当前月的日历',
        lists: ['$ cd ..', '$ cd ~', '$ cd /usr/local']
      }]
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Payment, [{
    key: 'onShow',
    value: function onShow() {
      _wepy2.default.getUserInfo({
        success: function success(res) {
          console.log(res.userInfo);
        }
      });
      _wepy2.default.openBluetoothAdapter({
        success: function success(res) {
          console.log(res);
        },
        fail: function fail(res) {
          console.log(res);
        }
      });
    }
  }]);

  return Payment;
}(_wepy2.default.page);

exports.default = Payment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheS5qcyJdLCJuYW1lcyI6WyJQYXltZW50IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJpbmRleCIsImFycmF5IiwicmVzdWx0cyIsImFiYiIsIkJlbmVsdXgiLCJtZWFuIiwibGlzdHMiLCJtZXRob2RzIiwiZ2V0VXNlckluZm8iLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsInVzZXJJbmZvIiwib3BlbkJsdWV0b290aEFkYXB0ZXIiLCJmYWlsIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsSSxHQUFPO0FBQ0xDLGFBQU8sQ0FERjtBQUVMQyxhQUFPLENBQ0wsS0FESyxFQUVMLEtBRkssQ0FGRjtBQU1MQyxlQUFTLENBQ1A7QUFDRUMsYUFBSyxLQURQO0FBRUVDLGlCQUFTLFNBRlg7QUFHRUMsY0FBTSxrQ0FIUjtBQUlFQyxlQUFPLENBQ0wsU0FESyxFQUVMLFFBRkssRUFHTCxpQkFISztBQUpULE9BRE8sRUFXUDtBQUNFSCxhQUFLLEtBRFA7QUFFRUMsaUJBQVMsU0FGWDtBQUdFQyxjQUFNLGtDQUhSO0FBSUVDLGVBQU8sQ0FDTCxTQURLLEVBRUwsUUFGSyxFQUdMLGlCQUhLO0FBSlQsT0FYTztBQU5KLEssUUE2QlBDLE8sR0FBVSxFOzs7Ozs2QkFHRDtBQUNQLHFCQUFLQyxXQUFMLENBQWlCO0FBQ2ZDLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJDLGtCQUFRQyxHQUFSLENBQVlGLElBQUlHLFFBQWhCO0FBQ0Q7QUFIYyxPQUFqQjtBQUtBLHFCQUFLQyxvQkFBTCxDQUEwQjtBQUN4QkwsaUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QkMsa0JBQVFDLEdBQVIsQ0FBWUYsR0FBWjtBQUNELFNBSHVCO0FBSXhCSyxjQUFNLGNBQVVMLEdBQVYsRUFBZTtBQUNuQkMsa0JBQVFDLEdBQVIsQ0FBWUYsR0FBWjtBQUNEO0FBTnVCLE9BQTFCO0FBUUQ7Ozs7RUFuRGtDLGVBQUtNLEk7O2tCQUFyQnBCLE8iLCJmaWxlIjoicGF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5bWVudCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iTneeJmSdcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgaW5kZXg6IDAsXG4gICAgICBhcnJheTogW1xuICAgICAgICAn5p+l5ZG95LukJyxcbiAgICAgICAgJ+afpeivreS5iSdcbiAgICAgIF0sXG4gICAgICByZXN1bHRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBhYmI6ICdjYWwnLFxuICAgICAgICAgIEJlbmVsdXg6ICdjYWxuZGFyJyxcbiAgICAgICAgICBtZWFuOiAn5pel5Y6G44CC5LiN5piv6K6h566X55qE5oSP5oCd77yM5b6I5pyJ6Laj77yM5pWy5Liq5ZG95Luk6K+V5LiA5LiL77yM5Lya5pi+56S65b2T5YmN5pyI55qE5pel5Y6GJyxcbiAgICAgICAgICBsaXN0czogW1xuICAgICAgICAgICAgJyQgY2QgLi4nLFxuICAgICAgICAgICAgJyQgY2QgficsXG4gICAgICAgICAgICAnJCBjZCAvdXNyL2xvY2FsJ1xuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGFiYjogJ2NhbCcsXG4gICAgICAgICAgQmVuZWx1eDogJ2NhbG5kYXInLFxuICAgICAgICAgIG1lYW46ICfml6XljobjgILkuI3mmK/orqHnrpfnmoTmhI/mgJ3vvIzlvojmnInotqPvvIzmlbLkuKrlkb3ku6Tor5XkuIDkuIvvvIzkvJrmmL7npLrlvZPliY3mnIjnmoTml6XljoYnLFxuICAgICAgICAgIGxpc3RzOiBbXG4gICAgICAgICAgICAnJCBjZCAuLicsXG4gICAgICAgICAgICAnJCBjZCB+JyxcbiAgICAgICAgICAgICckIGNkIC91c3IvbG9jYWwnXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgfVxuXG4gICAgb25TaG93KCkge1xuICAgICAgd2VweS5nZXRVc2VySW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy51c2VySW5mbylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHdlcHkub3BlbkJsdWV0b290aEFkYXB0ZXIoe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19