'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _recorditem = require('./../components/recorditem.js');

var _recorditem2 = _interopRequireDefault(_recorditem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Record = function (_wepy$page) {
  _inherits(Record, _wepy$page);

  function Record() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Record);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Record.__proto__ || Object.getPrototypeOf(Record)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的记录'
    }, _this.$props = { "record": { "xmlns:v-bind": "", "v-bind:records.sync": "records", "v-bind:theme.sync": "all", "v-bind:date.sync": "date", "v-bind:tip.sync": "tip" } }, _this.$events = {}, _this.components = {
      record: _recorditem2.default
    }, _this.data = {
      flag: false,
      records: null,
      all: 'all',
      date: true,
      tip: true,
      array: [],
      menstruationPeriod: 0
    }, _this.methods = {
      bindPickerChange: function bindPickerChange(e) {
        var that = this;
        var days = parseInt(e.detail.value, 10) + 10;
        if (days != that.data.minPeriodDays) {
          wx.showModal({
            title: '提示',
            content: '确认修改周期长度？',
            success: function success(res) {
              if (res.confirm) {
                that.updatePeriodDays(days);
                wx.showLoading({
                  title: '更新中',
                  mask: true
                });
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Record, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var self = this;
      var parent = self.$parent;
      var globalData = parent.globalData;
      var array = [];
      for (var i = 10; i <= 90; i++) {
        array.push(i);
      }
      console.log(array);
      globalData.datePicker = array;
      self.array = array;
      self.$apply();
    }
  }, {
    key: 'updatePeriodDays',
    value: function updatePeriodDays(days) {
      var self = this;
      var parent = self.$parent;
      var globalData = parent.globalData;
      wx.request({
        url: globalData.bongmiAPI + '/user/' + globalData.bmUser.userId + '?access_token=' + globalData.bmUser.accessToken,
        data: {
          menstruationPeriod: days
        },
        header: {
          authorization: 'Lollypop-Weixin-Mini-Program'
        },
        method: 'PUT',
        success: function success(res) {
          self.menstruationPeriod = days;
          self.$apply();
          globalData.bmUser.menstruationPeriod = days;
          globalData.menstruationPeriodFlag = true;
          wx.hideLoading();
          wx.showToast({
            title: '更新成功',
            icon: 'success',
            duration: 2000
          });
        },
        fail: function fail(res) {
          console.log('fail');
          console.log(res);
        }
      });
    }
  }, {
    key: 'onShow',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        var self, parent, globalData, getUserInfo_Flag, tryAuthAgain_flag;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                self = this;
                parent = self.$parent;
                globalData = parent.globalData;
                // self.array = globalData.datePicker

                if (!globalData.userInfo) {
                  _context.next = 22;
                  break;
                }

                console.log('已经授权过啦，并且用户信息也有了~');

                if (!globalData.refresh) {
                  _context.next = 19;
                  break;
                }

                wx.showLoading({
                  title: '数据加载中',
                  mask: true
                });
                _context.next = 9;
                return parent.getTips();

              case 9:
                _context.next = 11;
                return parent.convertRecord();

              case 11:
                _context.next = 13;
                return parent.getRecords();

              case 13:
                self.menstruationPeriod = globalData.bmUser.menstruationPeriod;
                self.records = globalData.recordsAll.ovulationTestResultList;
                self.$apply();
                wx.hideLoading();
                _context.next = 20;
                break;

              case 19:
                if (globalData.recordsAll.ovulationTestResultList && !self.records) {
                  wx.showLoading({
                    title: '数据加载中',
                    mask: true
                  });
                  self.menstruationPeriod = globalData.bmUser.menstruationPeriod;
                  self.records = globalData.recordsAll.ovulationTestResultList;
                  self.$apply();
                  wx.hideLoading();
                } else {}

              case 20:
                _context.next = 71;
                break;

              case 22:
                console.log('我也不知道有没有授权，反正还没有用户数据');
                _context.next = 25;
                return parent.getUserInfo();

              case 25:
                getUserInfo_Flag = _context.sent;

                if (!(getUserInfo_Flag == 'false')) {
                  _context.next = 52;
                  break;
                }

                _context.next = 29;
                return parent.tryAuthAgain();

              case 29:
                tryAuthAgain_flag = _context.sent;

                if (!(tryAuthAgain_flag == 'true')) {
                  _context.next = 50;
                  break;
                }

                wx.showLoading({
                  title: '数据加载中',
                  mask: true
                });
                _context.next = 34;
                return parent.loginWX();

              case 34:
                _context.next = 36;
                return parent.getBMToken();

              case 36:
                _context.next = 38;
                return parent.updateBMUser();

              case 38:
                _context.next = 40;
                return parent.getBMUserInfo();

              case 40:
                _context.next = 42;
                return parent.getTips();

              case 42:
                _context.next = 44;
                return parent.convertRecord();

              case 44:
                _context.next = 46;
                return parent.getRecords();

              case 46:
                self.menstruationPeriod = globalData.bmUser.menstruationPeriod;
                self.records = globalData.recordsAll.ovulationTestResultList;
                self.$apply();
                wx.hideLoading();

              case 50:
                _context.next = 71;
                break;

              case 52:
                wx.showLoading({
                  title: '数据加载中',
                  mask: true
                });
                _context.next = 55;
                return parent.loginWX();

              case 55:
                _context.next = 57;
                return parent.getBMToken();

              case 57:
                _context.next = 59;
                return parent.updateBMUser();

              case 59:
                _context.next = 61;
                return parent.getBMUserInfo();

              case 61:
                _context.next = 63;
                return parent.getTips();

              case 63:
                _context.next = 65;
                return parent.convertRecord();

              case 65:
                _context.next = 67;
                return parent.getRecords();

              case 67:
                self.menstruationPeriod = globalData.bmUser.menstruationPeriod;
                self.records = globalData.recordsAll.ovulationTestResultList;
                self.$apply();
                wx.hideLoading();

              case 71:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onShow(_x) {
        return _ref2.apply(this, arguments);
      }

      return onShow;
    }()
  }]);

  return Record;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Record , 'pages/record'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZC5qcyJdLCJuYW1lcyI6WyJSZWNvcmQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJyZWNvcmQiLCJkYXRhIiwiZmxhZyIsInJlY29yZHMiLCJhbGwiLCJkYXRlIiwidGlwIiwiYXJyYXkiLCJtZW5zdHJ1YXRpb25QZXJpb2QiLCJtZXRob2RzIiwiYmluZFBpY2tlckNoYW5nZSIsImUiLCJ0aGF0IiwiZGF5cyIsInBhcnNlSW50IiwiZGV0YWlsIiwidmFsdWUiLCJtaW5QZXJpb2REYXlzIiwid3giLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsInVwZGF0ZVBlcmlvZERheXMiLCJzaG93TG9hZGluZyIsIm1hc2siLCJjYW5jZWwiLCJjb25zb2xlIiwibG9nIiwib3B0aW9ucyIsInNlbGYiLCJwYXJlbnQiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImkiLCJwdXNoIiwiZGF0ZVBpY2tlciIsIiRhcHBseSIsInJlcXVlc3QiLCJ1cmwiLCJib25nbWlBUEkiLCJibVVzZXIiLCJ1c2VySWQiLCJhY2Nlc3NUb2tlbiIsImhlYWRlciIsImF1dGhvcml6YXRpb24iLCJtZXRob2QiLCJtZW5zdHJ1YXRpb25QZXJpb2RGbGFnIiwiaGlkZUxvYWRpbmciLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCJmYWlsIiwidXNlckluZm8iLCJyZWZyZXNoIiwiZ2V0VGlwcyIsImNvbnZlcnRSZWNvcmQiLCJnZXRSZWNvcmRzIiwicmVjb3Jkc0FsbCIsIm92dWxhdGlvblRlc3RSZXN1bHRMaXN0IiwiZ2V0VXNlckluZm8iLCJnZXRVc2VySW5mb19GbGFnIiwidHJ5QXV0aEFnYWluIiwidHJ5QXV0aEFnYWluX2ZsYWciLCJsb2dpbldYIiwiZ2V0Qk1Ub2tlbiIsInVwZGF0ZUJNVXNlciIsImdldEJNVXNlckluZm8iLCJwYWdlIl0s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RUEvSjRCLGVBQUtvQixJOztrQkFBcEI1RSxNIiwiZmlsZSI6InJlY29yZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgUmVjb3JkSXRlbSBmcm9tICcuLi9jb21wb25lbnRzL3JlY29yZGl0ZW0nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb3JkIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE6K6w5b2VJ1xuICAgIH1cbiAgICRwcm9wcyA9IHtcInJlY29yZFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cmVjb3Jkcy5zeW5jXCI6XCJyZWNvcmRzXCIsXCJ2LWJpbmQ6dGhlbWUuc3luY1wiOlwiYWxsXCIsXCJ2LWJpbmQ6ZGF0ZS5zeW5jXCI6XCJkYXRlXCIsXCJ2LWJpbmQ6dGlwLnN5bmNcIjpcInRpcFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICByZWNvcmQ6IFJlY29yZEl0ZW1cbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgZmxhZzogZmFsc2UsXG4gICAgICByZWNvcmRzOiBudWxsLFxuICAgICAgYWxsOiAnYWxsJyxcbiAgICAgIGRhdGU6IHRydWUsXG4gICAgICB0aXA6IHRydWUsXG4gICAgICBhcnJheTogW10sXG4gICAgICBtZW5zdHJ1YXRpb25QZXJpb2Q6IDBcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgYmluZFBpY2tlckNoYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGRheXMgPSBwYXJzZUludChlLmRldGFpbC52YWx1ZSwgMTApICsgMTA7XG4gICAgICAgIGlmIChkYXlzICE9IHRoYXQuZGF0YS5taW5QZXJpb2REYXlzKSB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfnoa7orqTkv67mlLnlkajmnJ/plb/luqbvvJ8nLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZVBlcmlvZERheXMoZGF5cyk7XG4gICAgICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmm7TmlrDkuK0nLFxuICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIG9uTG9hZCAob3B0aW9ucykge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICBjb25zdCBwYXJlbnQgPSBzZWxmLiRwYXJlbnRcbiAgICAgIGNvbnN0IGdsb2JhbERhdGEgPSBwYXJlbnQuZ2xvYmFsRGF0YVxuICAgICAgdmFyIGFycmF5ID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMTA7IGkgPD0gOTA7IGkrKykge1xuICAgICAgICBhcnJheS5wdXNoKGkpXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhhcnJheSlcbiAgICAgIGdsb2JhbERhdGEuZGF0ZVBpY2tlciA9IGFycmF5XG4gICAgICBzZWxmLmFycmF5ID0gYXJyYXlcbiAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlUGVyaW9kRGF5cyAoZGF5cykge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgIGNvbnN0IHBhcmVudCA9IHNlbGYuJHBhcmVudFxuICAgICAgY29uc3QgZ2xvYmFsRGF0YSA9IHBhcmVudC5nbG9iYWxEYXRhXG4gICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBgJHtnbG9iYWxEYXRhLmJvbmdtaUFQSX0vdXNlci8ke2dsb2JhbERhdGEuYm1Vc2VyLnVzZXJJZH0/YWNjZXNzX3Rva2VuPSR7Z2xvYmFsRGF0YS5ibVVzZXIuYWNjZXNzVG9rZW59YCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIG1lbnN0cnVhdGlvblBlcmlvZDogZGF5c1xuICAgICAgICB9LFxuICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICBhdXRob3JpemF0aW9uOiAnTG9sbHlwb3AtV2VpeGluLU1pbmktUHJvZ3JhbSdcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIHNlbGYubWVuc3RydWF0aW9uUGVyaW9kID0gZGF5c1xuICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgZ2xvYmFsRGF0YS5ibVVzZXIubWVuc3RydWF0aW9uUGVyaW9kID0gZGF5cztcbiAgICAgICAgICBnbG9iYWxEYXRhLm1lbnN0cnVhdGlvblBlcmlvZEZsYWcgPSB0cnVlO1xuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfmm7TmlrDmiJDlip8nLFxuICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2ZhaWwnKVxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyBvblNob3cgKG9wdGlvbnMpIHtcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICBjb25zdCBwYXJlbnQgPSBzZWxmLiRwYXJlbnRcbiAgICAgIGNvbnN0IGdsb2JhbERhdGEgPSBwYXJlbnQuZ2xvYmFsRGF0YVxuICAgICAgLy8gc2VsZi5hcnJheSA9IGdsb2JhbERhdGEuZGF0ZVBpY2tlclxuICAgICAgaWYgKGdsb2JhbERhdGEudXNlckluZm8pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+W3sue7j+aOiOadg+i/h+WVpu+8jOW5tuS4lOeUqOaIt+S/oeaBr+S5n+acieS6hn4nKVxuICAgICAgICBpZiAoZ2xvYmFsRGF0YS5yZWZyZXNoKSB7XG4gICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgdGl0bGU6ICfmlbDmja7liqDovb3kuK0nLFxuICAgICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgYXdhaXQgcGFyZW50LmdldFRpcHMoKVxuICAgICAgICAgIGF3YWl0IHBhcmVudC5jb252ZXJ0UmVjb3JkKClcbiAgICAgICAgICBhd2FpdCBwYXJlbnQuZ2V0UmVjb3JkcygpXG4gICAgICAgICAgc2VsZi5tZW5zdHJ1YXRpb25QZXJpb2QgPSBnbG9iYWxEYXRhLmJtVXNlci5tZW5zdHJ1YXRpb25QZXJpb2RcbiAgICAgICAgICBzZWxmLnJlY29yZHMgPSBnbG9iYWxEYXRhLnJlY29yZHNBbGwub3Z1bGF0aW9uVGVzdFJlc3VsdExpc3RcbiAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgfSBlbHNlIGlmIChnbG9iYWxEYXRhLnJlY29yZHNBbGwub3Z1bGF0aW9uVGVzdFJlc3VsdExpc3QgJiYgIXNlbGYucmVjb3Jkcykge1xuICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5pWw5o2u5Yqg6L295LitJyxcbiAgICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIHNlbGYubWVuc3RydWF0aW9uUGVyaW9kID0gZ2xvYmFsRGF0YS5ibVVzZXIubWVuc3RydWF0aW9uUGVyaW9kXG4gICAgICAgICAgc2VsZi5yZWNvcmRzID0gZ2xvYmFsRGF0YS5yZWNvcmRzQWxsLm92dWxhdGlvblRlc3RSZXN1bHRMaXN0XG4gICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygn5oiR5Lmf5LiN55+l6YGT5pyJ5rKh5pyJ5o6I5p2D77yM5Y+N5q2j6L+Y5rKh5pyJ55So5oi35pWw5o2uJylcbiAgICAgICAgY29uc3QgZ2V0VXNlckluZm9fRmxhZyA9IGF3YWl0IHBhcmVudC5nZXRVc2VySW5mbygpXG4gICAgICAgIGlmKGdldFVzZXJJbmZvX0ZsYWcgPT0gJ2ZhbHNlJykge1xuICAgICAgICAgIGNvbnN0IHRyeUF1dGhBZ2Fpbl9mbGFnID0gYXdhaXQgcGFyZW50LnRyeUF1dGhBZ2FpbigpXG4gICAgICAgICAgaWYgKHRyeUF1dGhBZ2Fpbl9mbGFnID09ICd0cnVlJykge1xuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+aVsOaNruWKoOi9veS4rScsXG4gICAgICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBhd2FpdCBwYXJlbnQubG9naW5XWCgpXG4gICAgICAgICAgICBhd2FpdCBwYXJlbnQuZ2V0Qk1Ub2tlbigpXG4gICAgICAgICAgICBhd2FpdCBwYXJlbnQudXBkYXRlQk1Vc2VyKClcbiAgICAgICAgICAgIGF3YWl0IHBhcmVudC5nZXRCTVVzZXJJbmZvKClcbiAgICAgICAgICAgIGF3YWl0IHBhcmVudC5nZXRUaXBzKClcbiAgICAgICAgICAgIGF3YWl0IHBhcmVudC5jb252ZXJ0UmVjb3JkKClcbiAgICAgICAgICAgIGF3YWl0IHBhcmVudC5nZXRSZWNvcmRzKClcbiAgICAgICAgICAgIHNlbGYubWVuc3RydWF0aW9uUGVyaW9kID0gZ2xvYmFsRGF0YS5ibVVzZXIubWVuc3RydWF0aW9uUGVyaW9kXG4gICAgICAgICAgICBzZWxmLnJlY29yZHMgPSBnbG9iYWxEYXRhLnJlY29yZHNBbGwub3Z1bGF0aW9uVGVzdFJlc3VsdExpc3RcbiAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5pWw5o2u5Yqg6L295LitJyxcbiAgICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIGF3YWl0IHBhcmVudC5sb2dpbldYKClcbiAgICAgICAgICBhd2FpdCBwYXJlbnQuZ2V0Qk1Ub2tlbigpXG4gICAgICAgICAgYXdhaXQgcGFyZW50LnVwZGF0ZUJNVXNlcigpXG4gICAgICAgICAgYXdhaXQgcGFyZW50LmdldEJNVXNlckluZm8oKVxuICAgICAgICAgIGF3YWl0IHBhcmVudC5nZXRUaXBzKClcbiAgICAgICAgICBhd2FpdCBwYXJlbnQuY29udmVydFJlY29yZCgpXG4gICAgICAgICAgYXdhaXQgcGFyZW50LmdldFJlY29yZHMoKVxuICAgICAgICAgIHNlbGYubWVuc3RydWF0aW9uUGVyaW9kID0gZ2xvYmFsRGF0YS5ibVVzZXIubWVuc3RydWF0aW9uUGVyaW9kXG4gICAgICAgICAgc2VsZi5yZWNvcmRzID0gZ2xvYmFsRGF0YS5yZWNvcmRzQWxsLm92dWxhdGlvblRlc3RSZXN1bHRMaXN0XG4gICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==