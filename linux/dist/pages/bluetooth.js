'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./../npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    }, _this.data = {}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Bluetooth, [{
    key: 'openBluetoothAdapter',
    value: function openBluetoothAdapter() {
      return new Promise(function (resolve, reject) {
        console.log('openBluetoothAdapter start');
        _wepy2.default.openBluetoothAdapter({
          success: function success(res) {
            console.log('openBluetoothAdapter success');
            _wepy2.default.showToast({
              title: '初始化蓝牙适配器成功',
              duration: 2000
            });
            console.log(res);
            resolve('true');
          },
          fail: function fail(res) {
            console.log('openBluetoothAdapter fail');
            console.log(res);
            resolve('false');
          }
        });
      });
    }
  }, {
    key: 'getBluetoothAdapterState',
    value: function getBluetoothAdapterState() {
      return new Promise(function (resolve, reject) {
        console.log('getBluetoothAdapterState start');
        _wepy2.default.getBluetoothAdapterState({
          success: function success(res) {
            console.log('getBluetoothAdapterState success');
            console.log(res);
            resolve('true');
          },
          fail: function fail(res) {
            console.log('getBluetoothAdapterState fail');
            console.log(res);
            resolve('false');
          }
        });
      });
    }
  }, {
    key: 'showModal',
    value: function showModal() {
      return new Promise(function (resolve, reject) {
        _wepy2.default.showModal({
          title: '蓝牙未开启',
          content: '请开启蓝牙连接',
          confirmColor: '#E56CAC',
          success: function success(res) {
            if (res.confirm) {
              resolve('true');
            } else if (res.cancel) {
              resolve('false');
            }
          }
        });
      });
    }
  }, {
    key: 'onBluetoothAdapterStateChange',
    value: function onBluetoothAdapterStateChange() {
      return new Promise(function (resolve, reject) {
        console.log('onBluetoothAdapterStateChange start');
        _wepy2.default.onBluetoothAdapterStateChange(function (res) {
          console.log('adapterState changed, now is', res);
          resolve('true');
        });
      });
    }
  }, {
    key: 'onShow',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var that, flag, openFlag;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;
                _context.next = 3;
                return that.openBluetoothAdapter();

              case 3:
                flag = _context.sent;

                if (!(flag === 'false')) {
                  _context.next = 13;
                  break;
                }

                _context.next = 7;
                return that.showModal();

              case 7:
                openFlag = _context.sent;

                if (!(openFlag === 'true')) {
                  _context.next = 11;
                  break;
                }

                _context.next = 11;
                return that.onBluetoothAdapterStateChange();

              case 11:
                _context.next = 15;
                break;

              case 13:
                _context.next = 15;
                return that.getBluetoothAdapterState();

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onShow() {
        return _ref2.apply(this, arguments);
      }

      return onShow;
    }()
  }]);

  return Bluetooth;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Bluetooth , 'pages/bluetooth'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsdWV0b290aC5qcyJdLCJuYW1lcyI6WyJCbHVldG9vdGgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1ldGhvZHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNvbnNvbGUiLCJsb2ciLCJvcGVuQmx1ZXRvb3RoQWRhcHRlciIsInN1Y2Nlc3MiLCJyZXMiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImR1cmF0aW9uIiwiZmFpbCIsImdldEJsdWV0b290aEFkYXB0ZXJTdGF0ZSIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJjb25maXJtQ29sb3IiLCJjb25maXJtIiwiY2FuY2VsIiwib25CbHVldG9vdGhBZGFwdGVyU3RhdGVDaGFuZ2UiLCJ0aGF0IiwiZmxhZyIsIm9wZW5GbGFnIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxJLEdBQU8sRSxRQUVQQyxPLEdBQVUsRTs7Ozs7MkNBR2E7QUFDckIsYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBVUMsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDNUNDLGdCQUFRQyxHQUFSLENBQVksNEJBQVo7QUFDQSx1QkFBS0Msb0JBQUwsQ0FBMEI7QUFDeEJDLG1CQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEJKLG9CQUFRQyxHQUFSLENBQVksOEJBQVo7QUFDQSwyQkFBS0ksU0FBTCxDQUFlO0FBQ2JDLHFCQUFPLFlBRE07QUFFYkMsd0JBQVU7QUFGRyxhQUFmO0FBSUFQLG9CQUFRQyxHQUFSLENBQVlHLEdBQVo7QUFDQU4sb0JBQVEsTUFBUjtBQUNELFdBVHVCO0FBVXhCVSxnQkFBTSxjQUFVSixHQUFWLEVBQWU7QUFDbkJKLG9CQUFRQyxHQUFSLENBQVksMkJBQVo7QUFDQUQsb0JBQVFDLEdBQVIsQ0FBWUcsR0FBWjtBQUNBTixvQkFBUSxPQUFSO0FBQ0Q7QUFkdUIsU0FBMUI7QUFnQkQsT0FsQk0sQ0FBUDtBQW1CRDs7OytDQUUwQjtBQUN6QixhQUFPLElBQUlELE9BQUosQ0FBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUM1Q0MsZ0JBQVFDLEdBQVIsQ0FBWSxnQ0FBWjtBQUNBLHVCQUFLUSx3QkFBTCxDQUE4QjtBQUM1Qk4sbUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0Qkosb0JBQVFDLEdBQVIsQ0FBWSxrQ0FBWjtBQUNBRCxvQkFBUUMsR0FBUixDQUFZRyxHQUFaO0FBQ0FOLG9CQUFRLE1BQVI7QUFDRCxXQUwyQjtBQU01QlUsZ0JBQU0sY0FBVUosR0FBVixFQUFlO0FBQ25CSixvQkFBUUMsR0FBUixDQUFZLCtCQUFaO0FBQ0FELG9CQUFRQyxHQUFSLENBQVlHLEdBQVo7QUFDQU4sb0JBQVEsT0FBUjtBQUNEO0FBVjJCLFNBQTlCO0FBWUQsT0FkTSxDQUFQO0FBZUQ7OztnQ0FFVztBQUNWLGFBQU8sSUFBSUQsT0FBSixDQUFZLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzVDLHVCQUFLVyxTQUFMLENBQWU7QUFDYkosaUJBQU8sT0FETTtBQUViSyxtQkFBUyxTQUZJO0FBR2JDLHdCQUFjLFNBSEQ7QUFJYlQsbUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QixnQkFBSUEsSUFBSVMsT0FBUixFQUFpQjtBQUNmZixzQkFBUSxNQUFSO0FBQ0QsYUFGRCxNQUVPLElBQUlNLElBQUlVLE1BQVIsRUFBZ0I7QUFDckJoQixzQkFBUSxPQUFSO0FBQ0Q7QUFDRjtBQVZZLFNBQWY7QUFZRCxPQWJNLENBQVA7QUFjRDs7O29EQUUrQjtBQUM5QixhQUFPLElBQUlELE9BQUosQ0FBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUM1Q0MsZ0JBQVFDLEdBQVIsQ0FBWSxxQ0FBWjtBQUNBLHVCQUFLYyw2QkFBTCxDQUFtQyxVQUFVWCxHQUFWLEVBQWU7QUFDaERKLGtCQUFRQyxHQUFSLGlDQUE0Q0csR0FBNUM7QUFDQU4sa0JBQVEsTUFBUjtBQUNELFNBSEQ7QUFJRCxPQU5NLENBQVA7QUFPRDs7Ozs7Ozs7OztBQUdPa0Isb0IsR0FBTyxJOzt1QkFDTUEsS0FBS2Qsb0JBQUwsRTs7O0FBQWJlLG9COztzQkFDRkEsU0FBUyxPOzs7Ozs7dUJBQ1lELEtBQUtOLFNBQUwsRTs7O0FBQWpCUSx3Qjs7c0JBQ0ZBLGFBQWEsTTs7Ozs7O3VCQUNURixLQUFLRCw2QkFBTCxFOzs7Ozs7Ozt1QkFHRkMsS0FBS1Asd0JBQUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXRGMkIsZUFBS1UsSTs7a0JBQXZCM0IsUyIsImZpbGUiOiJibHVldG9vdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsdWV0b290aCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iTneeJmSdcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgIH1cblxuICAgIG9wZW5CbHVldG9vdGhBZGFwdGVyKCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29wZW5CbHVldG9vdGhBZGFwdGVyIHN0YXJ0JylcbiAgICAgICAgd2VweS5vcGVuQmx1ZXRvb3RoQWRhcHRlcih7XG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ29wZW5CbHVldG9vdGhBZGFwdGVyIHN1Y2Nlc3MnKVxuICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+WIneWni+WMluiTneeJmemAgumFjeWZqOaIkOWKnycsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgcmVzb2x2ZSgndHJ1ZScpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb3BlbkJsdWV0b290aEFkYXB0ZXIgZmFpbCcpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICByZXNvbHZlKCdmYWxzZScpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRCbHVldG9vdGhBZGFwdGVyU3RhdGUoKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZ2V0Qmx1ZXRvb3RoQWRhcHRlclN0YXRlIHN0YXJ0JylcbiAgICAgICAgd2VweS5nZXRCbHVldG9vdGhBZGFwdGVyU3RhdGUoe1xuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRCbHVldG9vdGhBZGFwdGVyU3RhdGUgc3VjY2VzcycpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICByZXNvbHZlKCd0cnVlJylcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRCbHVldG9vdGhBZGFwdGVyU3RhdGUgZmFpbCcpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICByZXNvbHZlKCdmYWxzZScpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBzaG93TW9kYWwoKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfok53niZnmnKrlvIDlkK8nLFxuICAgICAgICAgIGNvbnRlbnQ6ICfor7flvIDlkK/ok53niZnov57mjqUnLFxuICAgICAgICAgIGNvbmZpcm1Db2xvcjogJyNFNTZDQUMnLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICByZXNvbHZlKCd0cnVlJylcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICByZXNvbHZlKCdmYWxzZScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBvbkJsdWV0b290aEFkYXB0ZXJTdGF0ZUNoYW5nZSgpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkJsdWV0b290aEFkYXB0ZXJTdGF0ZUNoYW5nZSBzdGFydCcpXG4gICAgICAgIHdlcHkub25CbHVldG9vdGhBZGFwdGVyU3RhdGVDaGFuZ2UoZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBhZGFwdGVyU3RhdGUgY2hhbmdlZCwgbm93IGlzYCwgcmVzKVxuICAgICAgICAgIHJlc29sdmUoJ3RydWUnKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyBvblNob3coKSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgICAgY29uc3QgZmxhZyA9IGF3YWl0IHRoYXQub3BlbkJsdWV0b290aEFkYXB0ZXIoKVxuICAgICAgaWYgKGZsYWcgPT09ICdmYWxzZScpIHtcbiAgICAgICAgY29uc3Qgb3BlbkZsYWcgPSBhd2FpdCB0aGF0LnNob3dNb2RhbCgpXG4gICAgICAgIGlmIChvcGVuRmxhZyA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgYXdhaXQgdGhhdC5vbkJsdWV0b290aEFkYXB0ZXJTdGF0ZUNoYW5nZSgpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHRoYXQuZ2V0Qmx1ZXRvb3RoQWRhcHRlclN0YXRlKClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==