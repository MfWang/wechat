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
    }, _this.$props = { "record": { "xmlns:v-bind": "", "v-bind:records.sync": "records", "theme": "all", "date": "true", "tip": "true" } }, _this.$events = {}, _this.components = {
      record: _recorditem2.default
    }, _this.data = {
      flag: false,
      records: null,
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
                  _context.next = 26;
                  break;
                }

                console.log('shouquan');

                if (!globalData.refresh) {
                  _context.next = 20;
                  break;
                }

                console.log('refresh true');
                wx.showLoading({
                  title: '数据加载中',
                  mask: true
                });
                _context.next = 10;
                return parent.getTips();

              case 10:
                _context.next = 12;
                return parent.convertRecord();

              case 12:
                _context.next = 14;
                return parent.getRecords();

              case 14:
                self.menstruationPeriod = globalData.bmUser.menstruationPeriod;
                self.records = globalData.recordsAll.ovulationTestResultList;
                self.$apply();
                wx.hideLoading();
                _context.next = 24;
                break;

              case 20:
                console.log('refresh false');
                self.menstruationPeriod = globalData.bmUser.menstruationPeriod;
                self.records = globalData.recordsAll.ovulationTestResultList;
                self.$apply();

              case 24:
                _context.next = 75;
                break;

              case 26:
                console.log('我也不知道有没有授权，反正还没有用户数据');
                _context.next = 29;
                return parent.getUserInfo();

              case 29:
                getUserInfo_Flag = _context.sent;

                if (!(getUserInfo_Flag == 'false')) {
                  _context.next = 56;
                  break;
                }

                _context.next = 33;
                return parent.tryAuthAgain();

              case 33:
                tryAuthAgain_flag = _context.sent;

                if (!(tryAuthAgain_flag == 'true')) {
                  _context.next = 54;
                  break;
                }

                wx.showLoading({
                  title: '数据加载中',
                  mask: true
                });
                _context.next = 38;
                return parent.loginWX();

              case 38:
                _context.next = 40;
                return parent.getBMToken();

              case 40:
                _context.next = 42;
                return parent.updateBMUser();

              case 42:
                _context.next = 44;
                return parent.getBMUserInfo();

              case 44:
                _context.next = 46;
                return parent.getTips();

              case 46:
                _context.next = 48;
                return parent.convertRecord();

              case 48:
                _context.next = 50;
                return parent.getRecords();

              case 50:
                self.menstruationPeriod = globalData.bmUser.menstruationPeriod;
                self.records = globalData.recordsAll.ovulationTestResultList;
                self.$apply();
                wx.hideLoading();

              case 54:
                _context.next = 75;
                break;

              case 56:
                wx.showLoading({
                  title: '数据加载中',
                  mask: true
                });
                _context.next = 59;
                return parent.loginWX();

              case 59:
                _context.next = 61;
                return parent.getBMToken();

              case 61:
                _context.next = 63;
                return parent.updateBMUser();

              case 63:
                _context.next = 65;
                return parent.getBMUserInfo();

              case 65:
                _context.next = 67;
                return parent.getTips();

              case 67:
                _context.next = 69;
                return parent.convertRecord();

              case 69:
                _context.next = 71;
                return parent.getRecords();

              case 71:
                self.menstruationPeriod = globalData.bmUser.menstruationPeriod;
                self.records = globalData.recordsAll.ovulationTestResultList;
                self.$apply();
                wx.hideLoading();

              case 75:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZC5qcyJdLCJuYW1lcyI6WyJSZWNvcmQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJyZWNvcmQiLCJkYXRhIiwiZmxhZyIsInJlY29yZHMiLCJhcnJheSIsIm1lbnN0cnVhdGlvblBlcmlvZCIsIm1ldGhvZHMiLCJiaW5kUGlja2VyQ2hhbmdlIiwiZSIsInRoYXQiLCJkYXlzIiwicGFyc2VJbnQiLCJkZXRhaWwiLCJ2YWx1ZSIsIm1pblBlcmlvZERheXMiLCJ3eCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwidXBkYXRlUGVyaW9kRGF5cyIsInNob3dMb2FkaW5nIiwibWFzayIsImNhbmNlbCIsImNvbnNvbGUiLCJsb2ciLCJvcHRpb25zIiwic2VsZiIsInBhcmVudCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiaSIsInB1c2giLCJkYXRlUGlja2VyIiwiJGFwcGx5IiwicmVxdWVzdCIsInVybCIsImJvbmdtaUFQSSIsImJtVXNlciIsInVzZXJJZCIsImFjY2Vzc1Rva2VuIiwiaGVhZGVyIiwiYXV0aG9yaXphdGlvbiIsIm1ldGhvZCIsIm1lbnN0cnVhdGlvblBlcmlvZEZsYWciLCJoaWRlTG9hZGluZyIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsImZhaWwiLCJ1c2VySW5mbyIsInJlZnJlc2giLCJnZXRUaXBzIiwiY29udmVydFJlY29yZCIsImdldFJlY29yZHMiLCJyZWNvcmRzQWxsIiwib3Z1bGF0aW9uVGVzdFJlc3VsdExpc3QiLCJnZXRVc2VySW5mbyIsImdldFVzZXJJbmZvX0ZsYWciLCJ0cnlBdXRoQWdhaW4iLCJ0cnlBdXRoQWdhaW5fZmxhZyIsImxvZ2luV1giLCJnZXRCTVRva2VuIiwidXBkYXRlQk1Vc2VyIiwiZ2V0Qk1Vc2VySW5mbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7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O3VCQUNBakMsT0FBT2tDLFVBQVAsRTs7Ozt1QkFDQWxDLE9BQU9tQyxZQUFQLEU7Ozs7dUJBQ0FuQyxPQUFPb0MsYUFBUCxFOzs7O3VCQUNBcEMsT0FBT3dCLE9BQVAsRTs7Ozt1QkFDQXhCLE9BQU95QixhQUFQLEU7Ozs7dUJBQ0F6QixPQUFPMEIsVUFBUCxFOzs7QUFDTjNCLHFCQUFLeEIsa0JBQUwsR0FBMEIyQixXQUFXUSxNQUFYLENBQWtCbkMsa0JBQTVDO0FBQ0F3QixxQkFBSzFCLE9BQUwsR0FBZTZCLFdBQVd5QixVQUFYLENBQXNCQyx1QkFBckM7QUFDQTdCLHFCQUFLTyxNQUFMO0FBQ0FyQixtQkFBR2dDLFdBQUg7Ozs7Ozs7QUFHRmhDLG1CQUFHUSxXQUFILENBQWU7QUFDYk4seUJBQU8sT0FETTtBQUViTyx3QkFBTTtBQUZPLGlCQUFmOzt1QkFJTU0sT0FBT2lDLE9BQVAsRTs7Ozt1QkFDQWpDLE9BQU9rQyxVQUFQLEU7Ozs7dUJBQ0FsQyxPQUFPbUMsWUFBUCxFOzs7O3VCQUNBbkMsT0FBT29DLGFBQVAsRTs7Ozt1QkFDQXBDLE9BQU93QixPQUFQLEU7Ozs7dUJBQ0F4QixPQUFPeUIsYUFBUCxFOzs7O3VCQUNBekIsT0FBTzBCLFVBQVAsRTs7O0FBQ04zQixxQkFBS3hCLGtCQUFMLEdBQTBCMkIsV0FBV1EsTUFBWCxDQUFrQm5DLGtCQUE1QztBQUNBd0IscUJBQUsxQixPQUFMLEdBQWU2QixXQUFXeUIsVUFBWCxDQUFzQkMsdUJBQXJDO0FBQ0E3QixxQkFBS08sTUFBTDtBQUNBckIsbUJBQUdnQyxXQUFIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBeEo0QixlQUFLb0IsSTs7a0JBQXBCekUsTSIsImZpbGUiOiJyZWNvcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IFJlY29yZEl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9yZWNvcmRpdGVtJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOiusOW9lSdcbiAgICB9XG4gICAkcHJvcHMgPSB7XCJyZWNvcmRcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnJlY29yZHMuc3luY1wiOlwicmVjb3Jkc1wiLFwidGhlbWVcIjpcImFsbFwiLFwiZGF0ZVwiOlwidHJ1ZVwiLFwidGlwXCI6XCJ0cnVlXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIHJlY29yZDogUmVjb3JkSXRlbVxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBmbGFnOiBmYWxzZSxcbiAgICAgIHJlY29yZHM6IG51bGwsXG4gICAgICBhcnJheTogW10sXG4gICAgICBtZW5zdHJ1YXRpb25QZXJpb2Q6IDBcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgYmluZFBpY2tlckNoYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGRheXMgPSBwYXJzZUludChlLmRldGFpbC52YWx1ZSwgMTApICsgMTA7XG4gICAgICAgIGlmIChkYXlzICE9IHRoYXQuZGF0YS5taW5QZXJpb2REYXlzKSB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfnoa7orqTkv67mlLnlkajmnJ/plb/luqbvvJ8nLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZVBlcmlvZERheXMoZGF5cyk7XG4gICAgICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmm7TmlrDkuK0nLFxuICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIG9uTG9hZCAob3B0aW9ucykge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICBjb25zdCBwYXJlbnQgPSBzZWxmLiRwYXJlbnRcbiAgICAgIGNvbnN0IGdsb2JhbERhdGEgPSBwYXJlbnQuZ2xvYmFsRGF0YVxuICAgICAgdmFyIGFycmF5ID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMTA7IGkgPD0gOTA7IGkrKykge1xuICAgICAgICBhcnJheS5wdXNoKGkpXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhhcnJheSlcbiAgICAgIGdsb2JhbERhdGEuZGF0ZVBpY2tlciA9IGFycmF5XG4gICAgICBzZWxmLmFycmF5ID0gYXJyYXlcbiAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlUGVyaW9kRGF5cyAoZGF5cykge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgIGNvbnN0IHBhcmVudCA9IHNlbGYuJHBhcmVudFxuICAgICAgY29uc3QgZ2xvYmFsRGF0YSA9IHBhcmVudC5nbG9iYWxEYXRhXG4gICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBgJHtnbG9iYWxEYXRhLmJvbmdtaUFQSX0vdXNlci8ke2dsb2JhbERhdGEuYm1Vc2VyLnVzZXJJZH0/YWNjZXNzX3Rva2VuPSR7Z2xvYmFsRGF0YS5ibVVzZXIuYWNjZXNzVG9rZW59YCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIG1lbnN0cnVhdGlvblBlcmlvZDogZGF5c1xuICAgICAgICB9LFxuICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICBhdXRob3JpemF0aW9uOiAnTG9sbHlwb3AtV2VpeGluLU1pbmktUHJvZ3JhbSdcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIHNlbGYubWVuc3RydWF0aW9uUGVyaW9kID0gZGF5c1xuICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgZ2xvYmFsRGF0YS5ibVVzZXIubWVuc3RydWF0aW9uUGVyaW9kID0gZGF5cztcbiAgICAgICAgICBnbG9iYWxEYXRhLm1lbnN0cnVhdGlvblBlcmlvZEZsYWcgPSB0cnVlO1xuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfmm7TmlrDmiJDlip8nLFxuICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2ZhaWwnKVxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyBvblNob3cgKG9wdGlvbnMpIHtcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICBjb25zdCBwYXJlbnQgPSBzZWxmLiRwYXJlbnRcbiAgICAgIGNvbnN0IGdsb2JhbERhdGEgPSBwYXJlbnQuZ2xvYmFsRGF0YVxuICAgICAgLy8gc2VsZi5hcnJheSA9IGdsb2JhbERhdGEuZGF0ZVBpY2tlclxuICAgICAgaWYgKGdsb2JhbERhdGEudXNlckluZm8pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Nob3VxdWFuJylcblxuICAgICAgICBpZiAoZ2xvYmFsRGF0YS5yZWZyZXNoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3JlZnJlc2ggdHJ1ZScpXG4gICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgdGl0bGU6ICfmlbDmja7liqDovb3kuK0nLFxuICAgICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgYXdhaXQgcGFyZW50LmdldFRpcHMoKVxuICAgICAgICAgIGF3YWl0IHBhcmVudC5jb252ZXJ0UmVjb3JkKClcbiAgICAgICAgICBhd2FpdCBwYXJlbnQuZ2V0UmVjb3JkcygpXG4gICAgICAgICAgc2VsZi5tZW5zdHJ1YXRpb25QZXJpb2QgPSBnbG9iYWxEYXRhLmJtVXNlci5tZW5zdHJ1YXRpb25QZXJpb2RcbiAgICAgICAgICBzZWxmLnJlY29yZHMgPSBnbG9iYWxEYXRhLnJlY29yZHNBbGwub3Z1bGF0aW9uVGVzdFJlc3VsdExpc3RcbiAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygncmVmcmVzaCBmYWxzZScpXG4gICAgICAgICAgc2VsZi5tZW5zdHJ1YXRpb25QZXJpb2QgPSBnbG9iYWxEYXRhLmJtVXNlci5tZW5zdHJ1YXRpb25QZXJpb2RcbiAgICAgICAgICBzZWxmLnJlY29yZHMgPSBnbG9iYWxEYXRhLnJlY29yZHNBbGwub3Z1bGF0aW9uVGVzdFJlc3VsdExpc3RcbiAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfmiJHkuZ/kuI3nn6XpgZPmnInmsqHmnInmjojmnYPvvIzlj43mraPov5jmsqHmnInnlKjmiLfmlbDmja4nKVxuICAgICAgICBjb25zdCBnZXRVc2VySW5mb19GbGFnID0gYXdhaXQgcGFyZW50LmdldFVzZXJJbmZvKClcbiAgICAgICAgaWYoZ2V0VXNlckluZm9fRmxhZyA9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgY29uc3QgdHJ5QXV0aEFnYWluX2ZsYWcgPSBhd2FpdCBwYXJlbnQudHJ5QXV0aEFnYWluKClcbiAgICAgICAgICBpZiAodHJ5QXV0aEFnYWluX2ZsYWcgPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5pWw5o2u5Yqg6L295LitJyxcbiAgICAgICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGF3YWl0IHBhcmVudC5sb2dpbldYKClcbiAgICAgICAgICAgIGF3YWl0IHBhcmVudC5nZXRCTVRva2VuKClcbiAgICAgICAgICAgIGF3YWl0IHBhcmVudC51cGRhdGVCTVVzZXIoKVxuICAgICAgICAgICAgYXdhaXQgcGFyZW50LmdldEJNVXNlckluZm8oKVxuICAgICAgICAgICAgYXdhaXQgcGFyZW50LmdldFRpcHMoKVxuICAgICAgICAgICAgYXdhaXQgcGFyZW50LmNvbnZlcnRSZWNvcmQoKVxuICAgICAgICAgICAgYXdhaXQgcGFyZW50LmdldFJlY29yZHMoKVxuICAgICAgICAgICAgc2VsZi5tZW5zdHJ1YXRpb25QZXJpb2QgPSBnbG9iYWxEYXRhLmJtVXNlci5tZW5zdHJ1YXRpb25QZXJpb2RcbiAgICAgICAgICAgIHNlbGYucmVjb3JkcyA9IGdsb2JhbERhdGEucmVjb3Jkc0FsbC5vdnVsYXRpb25UZXN0UmVzdWx0TGlzdFxuICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgdGl0bGU6ICfmlbDmja7liqDovb3kuK0nLFxuICAgICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgYXdhaXQgcGFyZW50LmxvZ2luV1goKVxuICAgICAgICAgIGF3YWl0IHBhcmVudC5nZXRCTVRva2VuKClcbiAgICAgICAgICBhd2FpdCBwYXJlbnQudXBkYXRlQk1Vc2VyKClcbiAgICAgICAgICBhd2FpdCBwYXJlbnQuZ2V0Qk1Vc2VySW5mbygpXG4gICAgICAgICAgYXdhaXQgcGFyZW50LmdldFRpcHMoKVxuICAgICAgICAgIGF3YWl0IHBhcmVudC5jb252ZXJ0UmVjb3JkKClcbiAgICAgICAgICBhd2FpdCBwYXJlbnQuZ2V0UmVjb3JkcygpXG4gICAgICAgICAgc2VsZi5tZW5zdHJ1YXRpb25QZXJpb2QgPSBnbG9iYWxEYXRhLmJtVXNlci5tZW5zdHJ1YXRpb25QZXJpb2RcbiAgICAgICAgICBzZWxmLnJlY29yZHMgPSBnbG9iYWxEYXRhLnJlY29yZHNBbGwub3Z1bGF0aW9uVGVzdFJlc3VsdExpc3RcbiAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19