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

var Bluetooth = function (_wepy$page) {
  _inherits(Bluetooth, _wepy$page);

  function Bluetooth() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Bluetooth);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Bluetooth.__proto__ || Object.getPrototypeOf(Bluetooth)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
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

  _createClass(Bluetooth, [{
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

  return Bluetooth;
}(_wepy2.default.page);

exports.default = Bluetooth;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsdWV0b290aC4xLmpzIl0sIm5hbWVzIjpbIkJsdWV0b290aCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiaW5kZXgiLCJhcnJheSIsInJlc3VsdHMiLCJhYmIiLCJCZW5lbHV4IiwibWVhbiIsImxpc3RzIiwibWV0aG9kcyIsImdldFVzZXJJbmZvIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJ1c2VySW5mbyIsIm9wZW5CbHVldG9vdGhBZGFwdGVyIiwiZmFpbCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxhQUFPLENBREY7QUFFTEMsYUFBTyxDQUNMLEtBREssRUFFTCxLQUZLLENBRkY7QUFNTEMsZUFBUyxDQUNQO0FBQ0VDLGFBQUssS0FEUDtBQUVFQyxpQkFBUyxTQUZYO0FBR0VDLGNBQU0sa0NBSFI7QUFJRUMsZUFBTyxDQUNMLFNBREssRUFFTCxRQUZLLEVBR0wsaUJBSEs7QUFKVCxPQURPLEVBV1A7QUFDRUgsYUFBSyxLQURQO0FBRUVDLGlCQUFTLFNBRlg7QUFHRUMsY0FBTSxrQ0FIUjtBQUlFQyxlQUFPLENBQ0wsU0FESyxFQUVMLFFBRkssRUFHTCxpQkFISztBQUpULE9BWE87QUFOSixLLFFBNkJQQyxPLEdBQVUsRTs7Ozs7NkJBR0Q7QUFDUCxxQkFBS0MsV0FBTCxDQUFpQjtBQUNmQyxpQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCQyxrQkFBUUMsR0FBUixDQUFZRixJQUFJRyxRQUFoQjtBQUNEO0FBSGMsT0FBakI7QUFLQSxxQkFBS0Msb0JBQUwsQ0FBMEI7QUFDeEJMLGlCQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEJDLGtCQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDRCxTQUh1QjtBQUl4QkssY0FBTSxjQUFVTCxHQUFWLEVBQWU7QUFDbkJDLGtCQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDRDtBQU51QixPQUExQjtBQVFEOzs7O0VBbkRvQyxlQUFLTSxJOztrQkFBdkJwQixTIiwiZmlsZSI6ImJsdWV0b290aC4xLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmx1ZXRvb3RoIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6JOd54mZJ1xuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBpbmRleDogMCxcbiAgICAgIGFycmF5OiBbXG4gICAgICAgICfmn6Xlkb3ku6QnLFxuICAgICAgICAn5p+l6K+t5LmJJ1xuICAgICAgXSxcbiAgICAgIHJlc3VsdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGFiYjogJ2NhbCcsXG4gICAgICAgICAgQmVuZWx1eDogJ2NhbG5kYXInLFxuICAgICAgICAgIG1lYW46ICfml6XljobjgILkuI3mmK/orqHnrpfnmoTmhI/mgJ3vvIzlvojmnInotqPvvIzmlbLkuKrlkb3ku6Tor5XkuIDkuIvvvIzkvJrmmL7npLrlvZPliY3mnIjnmoTml6XljoYnLFxuICAgICAgICAgIGxpc3RzOiBbXG4gICAgICAgICAgICAnJCBjZCAuLicsXG4gICAgICAgICAgICAnJCBjZCB+JyxcbiAgICAgICAgICAgICckIGNkIC91c3IvbG9jYWwnXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgYWJiOiAnY2FsJyxcbiAgICAgICAgICBCZW5lbHV4OiAnY2FsbmRhcicsXG4gICAgICAgICAgbWVhbjogJ+aXpeWOhuOAguS4jeaYr+iuoeeul+eahOaEj+aAne+8jOW+iOaciei2o++8jOaVsuS4quWRveS7pOivleS4gOS4i++8jOS8muaYvuekuuW9k+WJjeaciOeahOaXpeWOhicsXG4gICAgICAgICAgbGlzdHM6IFtcbiAgICAgICAgICAgICckIGNkIC4uJyxcbiAgICAgICAgICAgICckIGNkIH4nLFxuICAgICAgICAgICAgJyQgY2QgL3Vzci9sb2NhbCdcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICB9XG5cbiAgICBvblNob3coKSB7XG4gICAgICB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLnVzZXJJbmZvKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgd2VweS5vcGVuQmx1ZXRvb3RoQWRhcHRlcih7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4iXX0=