'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./../npm/wepy-async-function/index.js');

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

var _common = require('./../mixins/common.js');

var _common2 = _interopRequireDefault(_common);

var _recorditem = require('./../components/recorditem.js');

var _recorditem2 = _interopRequireDefault(_recorditem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Guide = function (_wepy$page) {
  _inherits(Guide, _wepy$page);

  function Guide() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Guide);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Guide.__proto__ || Object.getPrototypeOf(Guide)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '今日信息'
    }, _this.mixins = [_test2.default, _common2.default], _this.$props = { "record": { "xmlns:v-bind": "", "v-bind:records.sync": "records", "theme": "today", "date": "false", "tip": "false" } }, _this.$events = {}, _this.components = {
      record: _recorditem2.default
    }, _this.data = {
      flag: false,
      index: 0,
      guide: [[{
        "desc": "您还没有设置过周期长度，设置周期长度后，小助手可以指导您使用排卵试纸的时间。"
      }], [{
        "desc": "您的周期为X天，请在周期第N天开始使用排卵试纸"
      }], [{
        "desc": "您的周期过短，建议您咨询一下专科医生，或者在经期结束之后，即刻开始坚持记录排卵试纸情况～"
      }], [{
        "desc": "您的周期较长，建议您咨询一下专科医生，或者您预计下次经期来潮之前20天开始记录排卵试纸情况～"
      }], [{
        "desc": "在一个周期里，出现强阳之后，需要增加测量频率，最好能保证四个小时测量一次。",
        "desc2": "因为24-48小时随时都有可能发生排卵，排卵后立刻会转成弱阳。需要增加频率来更精确的捕捉到强阳转弱阳的时间。"
      }, {
        "desc": "出现强阳之后的当天可以安排爱爱哦！然后隔天再爱爱一次，直到捕捉到强阳转弱阳～如此，中奖的几率能大大提高呢！",
        "desc2": ""
      }], [{
        "desc": "在一个周期内出现强阳转弱阳，说明排卵已经发生，5个小时内的爱爱也还是有很高的中奖几率的！",
        "desc2": "您如果不能确定身体是否完全健康，可以坚持继续测量排卵试纸。因为有一些疾病可能会造成一个周期内出现多次小的强阳弱阳的交替变化，如果您发现这种情况，也不用胡思乱想，及时去看一下医生就好～"
      }]],
      records: null
    }, _this.methods = {
      takePhoto: function takePhoto() {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var self, parent, picData;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  self = _this2;
                  parent = self.$parent;
                  _context.next = 4;
                  return parent.takePhoto();

                case 4:
                  _context.next = 6;
                  return parent.getQiniuToken();

                case 6:
                  _context.next = 8;
                  return parent.uploadPhoto(1);

                case 8:
                  picData = _context.sent;
                  //1:原图 2:裁剪图
                  parent.globalData.pictureOnline = picData.key;
                  console.log(parent.globalData);
                  wx.redirectTo({
                    url: '/pages/result',
                    success: function success(res) {
                      console.log('success');
                      // success
                    },
                    fail: function fail(res) {
                      console.log(res);
                      // fail
                    },
                    complete: function complete() {
                      console.log('complete');
                      // complete
                    }
                  });

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }))();
      },

      setting: function setting() {
        wx.switchTab({
          url: '/pages/record'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Guide, [{
    key: 'onShow',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
        var self, parent, globalData, records, triggerType, guide, menstruationPeriod, period, _triggerType, _guide, _menstruationPeriod, _period, getUserInfo_Flag, tryAuthAgain_flag, _records, _triggerType2, _guide2, _menstruationPeriod2, _period2, _records2, _triggerType3, _guide3, _menstruationPeriod3, _period3;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                self = this;
                parent = self.$parent;
                globalData = parent.globalData;

                if (!globalData.userInfo) {
                  _context2.next = 41;
                  break;
                }

                console.log('已经授权过啦，并且用户信息也有了~');

                if (!globalData.refresh) {
                  _context2.next = 29;
                  break;
                }

                wx.showLoading({
                  title: '数据加载中',
                  mask: true
                });
                _context2.next = 9;
                return parent.getTips();

              case 9:
                _context2.next = 11;
                return parent.convertRecord();

              case 11:
                _context2.next = 13;
                return parent.getRecords();

              case 13:
                _context2.next = 15;
                return parent.getTodayList();

              case 15:
                records = _context2.sent;
                _context2.next = 18;
                return parent.setTriggerType();

              case 18:
                triggerType = _context2.sent;
                guide = self.guide;
                menstruationPeriod = globalData.bmUser.menstruationPeriod;

                if (triggerType == 1) {
                  period = [6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

                  guide[1] = {
                    "desc": '\u60A8\u7684\u5468\u671F\u4E3A' + menstruationPeriod + '\u5929\uFF0C\u8BF7\u5728\u5468\u671F\u7B2C' + period[menstruationPeriod - 21] + '\u5929\u5F00\u59CB\u4F7F\u7528\u6392\u5375\u8BD5\u7EB8'
                  };
                }
                self.guide = guide;
                self.records = records;
                self.index = triggerType;
                self.$apply();
                wx.hideLoading();
                _context2.next = 29;
                break;

              case 29:
                if (!globalData.menstruationPeriodFlag) {
                  _context2.next = 39;
                  break;
                }

                _context2.next = 32;
                return parent.setTriggerType();

              case 32:
                _triggerType = _context2.sent;
                _guide = self.guide;
                _menstruationPeriod = globalData.bmUser.menstruationPeriod;

                if (_triggerType == 1) {
                  _period = [6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

                  _guide[1] = {
                    "desc": '\u60A8\u7684\u5468\u671F\u4E3A' + _menstruationPeriod + '\u5929\uFF0C\u8BF7\u5728\u5468\u671F\u7B2C' + _period[_menstruationPeriod - 21] + '\u5929\u5F00\u59CB\u4F7F\u7528\u6392\u5375\u8BD5\u7EB8'
                  };
                }
                self.guide = _guide;
                self.index = _triggerType;
                self.$apply();

              case 39:
                _context2.next = 110;
                break;

              case 41:
                console.log('我也不知道有没有授权，反正还没有用户数据');
                _context2.next = 44;
                return parent.getUserInfo();

              case 44:
                getUserInfo_Flag = _context2.sent;

                if (!(getUserInfo_Flag == 'false')) {
                  _context2.next = 81;
                  break;
                }

                _context2.next = 48;
                return parent.tryAuthAgain();

              case 48:
                tryAuthAgain_flag = _context2.sent;

                if (!(tryAuthAgain_flag == 'true')) {
                  _context2.next = 79;
                  break;
                }

                wx.showLoading({
                  title: '数据加载中',
                  mask: true
                });
                _context2.next = 53;
                return parent.loginWX();

              case 53:
                _context2.next = 55;
                return parent.getBMToken();

              case 55:
                _context2.next = 57;
                return parent.updateBMUser();

              case 57:
                _context2.next = 59;
                return parent.getBMUserInfo();

              case 59:
                _context2.next = 61;
                return parent.getTips();

              case 61:
                _context2.next = 63;
                return parent.convertRecord();

              case 63:
                _context2.next = 65;
                return parent.getRecords();

              case 65:
                _context2.next = 67;
                return parent.getTodayList();

              case 67:
                _records = _context2.sent;
                _context2.next = 70;
                return parent.setTriggerType();

              case 70:
                _triggerType2 = _context2.sent;
                _guide2 = self.guide;
                _menstruationPeriod2 = globalData.bmUser.menstruationPeriod;

                if (_triggerType2 == 1) {
                  _period2 = [6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

                  _guide2[1] = {
                    "desc": '\u60A8\u7684\u5468\u671F\u4E3A' + _menstruationPeriod2 + '\u5929\uFF0C\u8BF7\u5728\u5468\u671F\u7B2C' + _period2[_menstruationPeriod2 - 21] + '\u5929\u5F00\u59CB\u4F7F\u7528\u6392\u5375\u8BD5\u7EB8'
                  };
                }
                self.guide = _guide2;
                self.records = _records;
                self.index = _triggerType2;
                self.$apply();
                wx.hideLoading();

              case 79:
                _context2.next = 110;
                break;

              case 81:
                wx.showLoading({
                  title: '数据加载中',
                  mask: true
                });
                _context2.next = 84;
                return parent.loginWX();

              case 84:
                _context2.next = 86;
                return parent.getBMToken();

              case 86:
                _context2.next = 88;
                return parent.updateBMUser();

              case 88:
                _context2.next = 90;
                return parent.getBMUserInfo();

              case 90:
                _context2.next = 92;
                return parent.getTips();

              case 92:
                _context2.next = 94;
                return parent.convertRecord();

              case 94:
                _context2.next = 96;
                return parent.getRecords();

              case 96:
                _context2.next = 98;
                return parent.getTodayList();

              case 98:
                _records2 = _context2.sent;
                _context2.next = 101;
                return parent.setTriggerType();

              case 101:
                _triggerType3 = _context2.sent;
                _guide3 = self.guide;
                _menstruationPeriod3 = globalData.bmUser.menstruationPeriod;

                if (_triggerType3 == 1) {
                  _period3 = [6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

                  _guide3[1] = {
                    "desc": '\u60A8\u7684\u5468\u671F\u4E3A' + _menstruationPeriod3 + '\u5929\uFF0C\u8BF7\u5728\u5468\u671F\u7B2C' + _period3[_menstruationPeriod3 - 21] + '\u5929\u5F00\u59CB\u4F7F\u7528\u6392\u5375\u8BD5\u7EB8'
                  };
                }
                self.guide = _guide3;
                self.records = _records2;
                self.index = _triggerType3;
                self.$apply();
                wx.hideLoading();

              case 110:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onShow(_x) {
        return _ref2.apply(this, arguments);
      }

      return onShow;
    }()
  }]);

  return Guide;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Guide , 'pages/today'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZGF5LmpzIl0sIm5hbWVzIjpbIkd1aWRlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm1peGlucyIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjb3JkIiwiZGF0YSIsImZsYWciLCJpbmRleCIsImd1aWRlIiwicmVjb3JkcyIsIm1ldGhvZHMiLCJ0YWtlUGhvdG8iLCJzZWxmIiwicGFyZW50IiwiJHBhcmVudCIsImdldFFpbml1VG9rZW4iLCJ1cGxvYWRQaG90byIsInBpY0RhdGEiLCJnbG9iYWxEYXRhIiwicGljdHVyZU9ubGluZSIsImtleSIsImNvbnNvbGUiLCJsb2ciLCJ3eCIsInJlZGlyZWN0VG8iLCJ1cmwiLCJzdWNjZXNzIiwicmVzIiwiZmFpbCIsImNvbXBsZXRlIiwic2V0dGluZyIsInN3aXRjaFRhYiIsIm9wdGlvbnMiLCJ1c2VySW5mbyIsInJlZnJlc2giLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsImdldFRpcHMiLCJjb252ZXJ0UmVjb3JkIiwiZ2V0UmVjb3JkcyIsImdldFRvZGF5TGlzdCIsInNldFRyaWdnZXJUeXBlIiwidHJpZ2dlclR5cGUiLCJtZW5zdHJ1YXRpb25QZXJpb2QiLCJibVVzZXIiLCJwZXJpb2QiLCIkYXBwbHkiLCJoaWRlTG9hZGluZyIsIm1lbnN0cnVhdGlvblBlcmlvZEZsYWciLCJnZXRVc2VySW5mbyIsImdldFVzZXJJbmZvX0ZsYWciLCJ0cnlBdXRoQWdhaW4iLCJ0cnlBdXRoQWdhaW5fZmxhZyIsImxvZ2luV1giLCJnZXRCTVRva2VuIiwidXBkYXRlQk1Vc2VyIiwiZ2V0Qk1Vc2VySW5mbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsTSxHQUFTLGtD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LElBQVc7QUFDUCwrREFBZ0JvQyxvQkFBaEIsa0RBQTRDRSxTQUFPRix1QkFBcUIsRUFBNUIsQ0FBNUM7QUFETyxtQkFBWDtBQUdEO0FBQ0RoQyxxQkFBS0osS0FBTCxHQUFhQSxPQUFiO0FBQ0FJLHFCQUFLSCxPQUFMLEdBQWVBLFNBQWY7QUFDQUcscUJBQUtMLEtBQUwsR0FBYW9DLGFBQWI7QUFDQS9CLHFCQUFLbUMsTUFBTDtBQUNBeEIsbUJBQUd5QixXQUFIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBL00yQixlQUFLVSxJOztrQkFBbkI3RCxLIiwiZmlsZSI6InRvZGF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcbiAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcbiAgaW1wb3J0IGNvbW1vbk1peGluIGZyb20gJy4uL21peGlucy9jb21tb24nXG4gIGltcG9ydCBSZWNvcmRJdGVtIGZyb20gJy4uL2NvbXBvbmVudHMvcmVjb3JkaXRlbSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBHdWlkZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S7iuaXpeS/oeaBrydcbiAgICB9XG5cbiAgICBtaXhpbnMgPSBbdGVzdE1peGluLCBjb21tb25NaXhpbl1cblxuICAgJHByb3BzID0ge1wicmVjb3JkXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpyZWNvcmRzLnN5bmNcIjpcInJlY29yZHNcIixcInRoZW1lXCI6XCJ0b2RheVwiLFwiZGF0ZVwiOlwiZmFsc2VcIixcInRpcFwiOlwiZmFsc2VcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgcmVjb3JkOiBSZWNvcmRJdGVtXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBmbGFnOiBmYWxzZSxcbiAgICAgIGluZGV4OiAwLFxuICAgICAgZ3VpZGU6IFtcbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwiZGVzY1wiOiBcIuaCqOi/mOayoeacieiuvue9rui/h+WRqOacn+mVv+W6pu+8jOiuvue9ruWRqOacn+mVv+W6puWQju+8jOWwj+WKqeaJi+WPr+S7peaMh+WvvOaCqOS9v+eUqOaOkuWNteivlee6uOeahOaXtumXtOOAglwiXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJkZXNjXCI6IFwi5oKo55qE5ZGo5pyf5Li6WOWkqe+8jOivt+WcqOWRqOacn+esrE7lpKnlvIDlp4vkvb/nlKjmjpLljbXor5XnurhcIlxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwiZGVzY1wiOiBcIuaCqOeahOWRqOacn+i/h+efre+8jOW7uuiuruaCqOWSqOivouS4gOS4i+S4k+enkeWMu+eUn++8jOaIluiAheWcqOe7j+acn+e7k+adn+S5i+WQju+8jOWNs+WIu+W8gOWni+WdmuaMgeiusOW9leaOkuWNteivlee6uOaDheWGte+9nlwiXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJkZXNjXCI6IFwi5oKo55qE5ZGo5pyf6L6D6ZW/77yM5bu66K6u5oKo5ZKo6K+i5LiA5LiL5LiT56eR5Yy755Sf77yM5oiW6ICF5oKo6aKE6K6h5LiL5qyh57uP5pyf5p2l5r2u5LmL5YmNMjDlpKnlvIDlp4vorrDlvZXmjpLljbXor5Xnurjmg4XlhrXvvZ5cIlxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwiZGVzY1wiOiBcIuWcqOS4gOS4quWRqOacn+mHjO+8jOWHuueOsOW8uumYs+S5i+WQju+8jOmcgOimgeWinuWKoOa1i+mHj+mikeeOh++8jOacgOWlveiDveS/neivgeWbm+S4quWwj+aXtua1i+mHj+S4gOasoeOAglwiLFxuICAgICAgICAgICAgXCJkZXNjMlwiOiBcIuWboOS4ujI0LTQ45bCP5pe26ZqP5pe26YO95pyJ5Y+v6IO95Y+R55Sf5o6S5Y2177yM5o6S5Y215ZCO56uL5Yi75Lya6L2s5oiQ5byx6Ziz44CC6ZyA6KaB5aKe5Yqg6aKR546H5p2l5pu057K+56Gu55qE5o2V5o2J5Yiw5by66Ziz6L2s5byx6Ziz55qE5pe26Ze044CCXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwiZGVzY1wiOiBcIuWHuueOsOW8uumYs+S5i+WQjueahOW9k+WkqeWPr+S7peWuieaOkueIseeIseWTpu+8geeEtuWQjumalOWkqeWGjeeIseeIseS4gOasoe+8jOebtOWIsOaNleaNieWIsOW8uumYs+i9rOW8semYs++9nuWmguatpO+8jOS4reWllueahOWHoOeOh+iDveWkp+Wkp+aPkOmrmOWRou+8gVwiLFxuICAgICAgICAgICAgXCJkZXNjMlwiOiBcIlwiXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJkZXNjXCI6IFwi5Zyo5LiA5Liq5ZGo5pyf5YaF5Ye6546w5by66Ziz6L2s5byx6Ziz77yM6K+05piO5o6S5Y215bey57uP5Y+R55Sf77yMNeS4quWwj+aXtuWGheeahOeIseeIseS5n+i/mOaYr+acieW+iOmrmOeahOS4reWlluWHoOeOh+eahO+8gVwiLFxuICAgICAgICAgICAgXCJkZXNjMlwiOiBcIuaCqOWmguaenOS4jeiDveehruWumui6q+S9k+aYr+WQpuWujOWFqOWBpeW6t++8jOWPr+S7peWdmuaMgee7p+e7rea1i+mHj+aOkuWNteivlee6uOOAguWboOS4uuacieS4gOS6m+eWvueXheWPr+iDveS8mumAoOaIkOS4gOS4quWRqOacn+WGheWHuueOsOWkmuasoeWwj+eahOW8uumYs+W8semYs+eahOS6pOabv+WPmOWMlu+8jOWmguaenOaCqOWPkeeOsOi/meenjeaDheWGte+8jOS5n+S4jeeUqOiDoeaAneS5seaDs++8jOWPiuaXtuWOu+eci+S4gOS4i+WMu+eUn+WwseWlve+9nlwiXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgXSxcbiAgICAgIHJlY29yZHM6IG51bGxcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgYXN5bmMgdGFrZVBob3RvICgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgY29uc3QgcGFyZW50ID0gc2VsZi4kcGFyZW50XG4gICAgICAgIGF3YWl0IHBhcmVudC50YWtlUGhvdG8oKVxuICAgICAgICBhd2FpdCBwYXJlbnQuZ2V0UWluaXVUb2tlbigpXG4gICAgICAgIGNvbnN0IHBpY0RhdGEgPSBhd2FpdCBwYXJlbnQudXBsb2FkUGhvdG8oMSkgLy8xOuWOn+WbviAyOuijgeWJquWbvlxuICAgICAgICBwYXJlbnQuZ2xvYmFsRGF0YS5waWN0dXJlT25saW5lID0gcGljRGF0YS5rZXlcbiAgICAgICAgY29uc29sZS5sb2cocGFyZW50Lmdsb2JhbERhdGEpXG4gICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgIHVybDogJy9wYWdlcy9yZXN1bHQnLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzJylcbiAgICAgICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgIC8vIGZhaWxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29tcGxldGUnKVxuICAgICAgICAgICAgLy8gY29tcGxldGVcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgc2V0dGluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICB3eC5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJy9wYWdlcy9yZWNvcmQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgIH1cblxuICAgIGFzeW5jIG9uU2hvdyAob3B0aW9ucykge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgIGNvbnN0IHBhcmVudCA9IHNlbGYuJHBhcmVudFxuICAgICAgY29uc3QgZ2xvYmFsRGF0YSA9IHBhcmVudC5nbG9iYWxEYXRhXG4gICAgICBpZiAoZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgICBjb25zb2xlLmxvZygn5bey57uP5o6I5p2D6L+H5ZWm77yM5bm25LiU55So5oi35L+h5oGv5Lmf5pyJ5LqGficpXG4gICAgICAgIGlmIChnbG9iYWxEYXRhLnJlZnJlc2gpIHtcbiAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICB0aXRsZTogJ+aVsOaNruWKoOi9veS4rScsXG4gICAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICBhd2FpdCBwYXJlbnQuZ2V0VGlwcygpXG4gICAgICAgICAgYXdhaXQgcGFyZW50LmNvbnZlcnRSZWNvcmQoKVxuICAgICAgICAgIGF3YWl0IHBhcmVudC5nZXRSZWNvcmRzKClcbiAgICAgICAgICBjb25zdCByZWNvcmRzID0gYXdhaXQgcGFyZW50LmdldFRvZGF5TGlzdCgpXG4gICAgICAgICAgY29uc3QgdHJpZ2dlclR5cGUgPSBhd2FpdCBwYXJlbnQuc2V0VHJpZ2dlclR5cGUoKVxuICAgICAgICAgIGNvbnN0IGd1aWRlID0gc2VsZi5ndWlkZVxuICAgICAgICAgIGNvbnN0IG1lbnN0cnVhdGlvblBlcmlvZCA9IGdsb2JhbERhdGEuYm1Vc2VyLm1lbnN0cnVhdGlvblBlcmlvZFxuICAgICAgICAgIGlmICh0cmlnZ2VyVHlwZSA9PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBwZXJpb2QgPSBbNiwgNiwgNywgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTksIDIwLCAyMSwgMjIsIDIzXTtcbiAgICAgICAgICAgIGd1aWRlWzFdID0ge1xuICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBg5oKo55qE5ZGo5pyf5Li6JHttZW5zdHJ1YXRpb25QZXJpb2R95aSp77yM6K+35Zyo5ZGo5pyf56ysJHtwZXJpb2RbbWVuc3RydWF0aW9uUGVyaW9kIC0gMjFdfeWkqeW8gOWni+S9v+eUqOaOkuWNteivlee6uGBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBzZWxmLmd1aWRlID0gZ3VpZGVcbiAgICAgICAgICBzZWxmLnJlY29yZHMgPSByZWNvcmRzXG4gICAgICAgICAgc2VsZi5pbmRleCA9IHRyaWdnZXJUeXBlXG4gICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gY29uc3QgcmVjb3JkcyA9IGF3YWl0IHBhcmVudC5nZXRUb2RheUxpc3QoKVxuICAgICAgICAgIC8vIGNvbnN0IHRyaWdnZXJUeXBlID0gYXdhaXQgcGFyZW50LnNldFRyaWdnZXJUeXBlKClcbiAgICAgICAgICAvLyBjb25zdCBndWlkZSA9IHNlbGYuZGF0YS5ndWlkZVxuICAgICAgICAgIC8vIGlmICh0cmlnZ2VyVHlwZSA9PSAxKSB7XG4gICAgICAgICAgLy8gICBjb25zdCBwZXJpb2QgPSBbNiwgNiwgNywgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTksIDIwLCAyMSwgMjIsIDIzXTtcbiAgICAgICAgICAvLyAgIGd1aWRlWzFdID0ge1xuICAgICAgICAgIC8vICAgICAgIFwiZGVzY1wiOiBg5oKo55qE5ZGo5pyf5Li6JHttZW5zdHJ1YXRpb25QZXJpb2R95aSp77yM6K+35Zyo5ZGo5pyf56ysJHtwZXJpb2RbbWVuc3RydWF0aW9uUGVyaW9kIC0gMjFdfeWkqeW8gOWni+S9v+eUqOaOkuWNteivlee6uGBcbiAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgIC8vIH1cbiAgICAgICAgICAvLyBzZWxmLmd1aWRlID0gZ3VpZGVcbiAgICAgICAgICAvLyBzZWxmLnJlY29yZHMgPSByZWNvcmRzXG4gICAgICAgICAgLy8gc2VsZi5pbmRleCA9IHRyaWdnZXJUeXBlXG4gICAgICAgICAgLy8gc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChnbG9iYWxEYXRhLm1lbnN0cnVhdGlvblBlcmlvZEZsYWcpIHtcbiAgICAgICAgICBjb25zdCB0cmlnZ2VyVHlwZSA9IGF3YWl0IHBhcmVudC5zZXRUcmlnZ2VyVHlwZSgpXG4gICAgICAgICAgY29uc3QgZ3VpZGUgPSBzZWxmLmd1aWRlXG4gICAgICAgICAgY29uc3QgbWVuc3RydWF0aW9uUGVyaW9kID0gZ2xvYmFsRGF0YS5ibVVzZXIubWVuc3RydWF0aW9uUGVyaW9kXG4gICAgICAgICAgaWYgKHRyaWdnZXJUeXBlID09IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHBlcmlvZCA9IFs2LCA2LCA3LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOSwgMjAsIDIxLCAyMiwgMjNdO1xuICAgICAgICAgICAgZ3VpZGVbMV0gPSB7XG4gICAgICAgICAgICAgICAgXCJkZXNjXCI6IGDmgqjnmoTlkajmnJ/kuLoke21lbnN0cnVhdGlvblBlcmlvZH3lpKnvvIzor7flnKjlkajmnJ/nrKwke3BlcmlvZFttZW5zdHJ1YXRpb25QZXJpb2QgLSAyMV195aSp5byA5aeL5L2/55So5o6S5Y216K+V57q4YFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlbGYuZ3VpZGUgPSBndWlkZVxuICAgICAgICAgIHNlbGYuaW5kZXggPSB0cmlnZ2VyVHlwZVxuICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+aIkeS5n+S4jeefpemBk+acieayoeacieaOiOadg++8jOWPjeato+i/mOayoeacieeUqOaIt+aVsOaNricpXG4gICAgICAgIGNvbnN0IGdldFVzZXJJbmZvX0ZsYWcgPSBhd2FpdCBwYXJlbnQuZ2V0VXNlckluZm8oKVxuICAgICAgICBpZihnZXRVc2VySW5mb19GbGFnID09ICdmYWxzZScpIHtcbiAgICAgICAgICBjb25zdCB0cnlBdXRoQWdhaW5fZmxhZyA9IGF3YWl0IHBhcmVudC50cnlBdXRoQWdhaW4oKVxuICAgICAgICAgIGlmICh0cnlBdXRoQWdhaW5fZmxhZyA9PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmlbDmja7liqDovb3kuK0nLFxuICAgICAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYXdhaXQgcGFyZW50LmxvZ2luV1goKVxuICAgICAgICAgICAgYXdhaXQgcGFyZW50LmdldEJNVG9rZW4oKVxuICAgICAgICAgICAgYXdhaXQgcGFyZW50LnVwZGF0ZUJNVXNlcigpXG4gICAgICAgICAgICBhd2FpdCBwYXJlbnQuZ2V0Qk1Vc2VySW5mbygpXG4gICAgICAgICAgICBhd2FpdCBwYXJlbnQuZ2V0VGlwcygpXG4gICAgICAgICAgICBhd2FpdCBwYXJlbnQuY29udmVydFJlY29yZCgpXG4gICAgICAgICAgICBhd2FpdCBwYXJlbnQuZ2V0UmVjb3JkcygpXG4gICAgICAgICAgICBjb25zdCByZWNvcmRzID0gYXdhaXQgcGFyZW50LmdldFRvZGF5TGlzdCgpXG4gICAgICAgICAgICBjb25zdCB0cmlnZ2VyVHlwZSA9IGF3YWl0IHBhcmVudC5zZXRUcmlnZ2VyVHlwZSgpXG4gICAgICAgICAgICBjb25zdCBndWlkZSA9IHNlbGYuZ3VpZGVcbiAgICAgICAgICAgIGNvbnN0IG1lbnN0cnVhdGlvblBlcmlvZCA9IGdsb2JhbERhdGEuYm1Vc2VyLm1lbnN0cnVhdGlvblBlcmlvZFxuICAgICAgICAgICAgaWYgKHRyaWdnZXJUeXBlID09IDEpIHtcbiAgICAgICAgICAgICAgY29uc3QgcGVyaW9kID0gWzYsIDYsIDcsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCwgMjEsIDIyLCAyM107XG4gICAgICAgICAgICAgIGd1aWRlWzFdID0ge1xuICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IGDmgqjnmoTlkajmnJ/kuLoke21lbnN0cnVhdGlvblBlcmlvZH3lpKnvvIzor7flnKjlkajmnJ/nrKwke3BlcmlvZFttZW5zdHJ1YXRpb25QZXJpb2QgLSAyMV195aSp5byA5aeL5L2/55So5o6S5Y216K+V57q4YFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuZ3VpZGUgPSBndWlkZVxuICAgICAgICAgICAgc2VsZi5yZWNvcmRzID0gcmVjb3Jkc1xuICAgICAgICAgICAgc2VsZi5pbmRleCA9IHRyaWdnZXJUeXBlXG4gICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICB0aXRsZTogJ+aVsOaNruWKoOi9veS4rScsXG4gICAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICBhd2FpdCBwYXJlbnQubG9naW5XWCgpXG4gICAgICAgICAgYXdhaXQgcGFyZW50LmdldEJNVG9rZW4oKVxuICAgICAgICAgIGF3YWl0IHBhcmVudC51cGRhdGVCTVVzZXIoKVxuICAgICAgICAgIGF3YWl0IHBhcmVudC5nZXRCTVVzZXJJbmZvKClcbiAgICAgICAgICBhd2FpdCBwYXJlbnQuZ2V0VGlwcygpXG4gICAgICAgICAgYXdhaXQgcGFyZW50LmNvbnZlcnRSZWNvcmQoKVxuICAgICAgICAgIGF3YWl0IHBhcmVudC5nZXRSZWNvcmRzKClcbiAgICAgICAgICBjb25zdCByZWNvcmRzID0gYXdhaXQgcGFyZW50LmdldFRvZGF5TGlzdCgpXG4gICAgICAgICAgY29uc3QgdHJpZ2dlclR5cGUgPSBhd2FpdCBwYXJlbnQuc2V0VHJpZ2dlclR5cGUoKVxuICAgICAgICAgIGNvbnN0IGd1aWRlID0gc2VsZi5ndWlkZVxuICAgICAgICAgIGNvbnN0IG1lbnN0cnVhdGlvblBlcmlvZCA9IGdsb2JhbERhdGEuYm1Vc2VyLm1lbnN0cnVhdGlvblBlcmlvZFxuICAgICAgICAgIGlmICh0cmlnZ2VyVHlwZSA9PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBwZXJpb2QgPSBbNiwgNiwgNywgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTksIDIwLCAyMSwgMjIsIDIzXTtcbiAgICAgICAgICAgIGd1aWRlWzFdID0ge1xuICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBg5oKo55qE5ZGo5pyf5Li6JHttZW5zdHJ1YXRpb25QZXJpb2R95aSp77yM6K+35Zyo5ZGo5pyf56ysJHtwZXJpb2RbbWVuc3RydWF0aW9uUGVyaW9kIC0gMjFdfeWkqeW8gOWni+S9v+eUqOaOkuWNteivlee6uGBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBzZWxmLmd1aWRlID0gZ3VpZGVcbiAgICAgICAgICBzZWxmLnJlY29yZHMgPSByZWNvcmRzXG4gICAgICAgICAgc2VsZi5pbmRleCA9IHRyaWdnZXJUeXBlXG4gICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==