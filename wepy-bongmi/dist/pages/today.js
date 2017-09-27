'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./../npm/wepy-async-function/index.js');

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
    }, _this.$props = { "record": { "xmlns:v-bind": "", "v-bind:records.sync": "records", "v-bind:theme.sync": "today", "v-bind:date.sync": "date", "v-bind:tip.sync": "tip" } }, _this.$events = {}, _this.components = {
      record: _recorditem2.default
    }, _this.data = {
      flag: false,
      index: 0,
      guide: [{
        "desc": "您还没有设置过周期长度，设置周期长度后，小助手可以指导您使用排卵试纸的时间。"
      }, {
        "desc": "您的周期为X天，请在周期第N天开始使用排卵试纸"
      }, {
        "desc": "您的周期过短，建议您咨询一下专科医生，或者在经期结束之后，即刻开始坚持记录排卵试纸情况～"
      }, {
        "desc": "您的周期较长，建议您咨询一下专科医生，或者您预计下次经期来潮之前20天开始记录排卵试纸情况～"
      }, {
        "desc": "在一个周期内出现强阳转弱阳，说明排卵已经发生，5个小时内的爱爱也还是有很高的中奖几率的！",
        "desc2": "您如果不能确定身体是否完全健康，可以坚持继续测量排卵试纸。因为有一些疾病可能会造成一个周期内出现多次小的强阳弱阳的交替变化，如果您发现这种情况，也不用胡思乱想，及时去看一下医生就好～"
      }, [{
        "desc": "在一个周期里，出现强阳之后，需要增加测量频率，最好能保证四个小时测量一次。",
        "desc2": "因为24-48小时随时都有可能发生排卵，排卵后立刻会转成弱阳。需要增加频率来更精确的捕捉到强阳转弱阳的时间。"
      }, {
        "desc": "出现强阳之后的当天可以安排爱爱哦！然后隔天再爱爱一次，直到捕捉到强阳转弱阳～如此，中奖的几率能大大提高呢！",
        "desc2": ""
      }]],
      records: null,
      today: 'today',
      date: false,
      tip: false
    }, _this.methods = {
      takePhoto: function takePhoto() {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var self, parent;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  self = _this2;
                  parent = self.$parent;
                  _context.next = 4;
                  return parent.takePhoto();

                case 4:
                  wx.showLoading({
                    title: '照片上传中',
                    mask: true
                  });
                  _context.next = 7;
                  return parent.getQiniuToken();

                case 7:
                  _context.next = 9;
                  return parent.uploadPhoto();

                case 9:
                  //1:原图 2:裁剪图
                  wx.hideLoading();
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

                case 11:
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
        var self, parent, globalData, triggerType, guide, menstruationPeriod, period, _triggerType, _guide, _menstruationPeriod, _period, _triggerType2, _guide2, _menstruationPeriod2, _period2, getUserInfo_Flag, tryAuthAgain_flag, _triggerType3, _guide3, _menstruationPeriod3, _period3, _triggerType4, _guide4, _menstruationPeriod4, _period4;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                self = this;
                parent = self.$parent;
                globalData = parent.globalData;

                if (!globalData.userInfo) {
                  _context2.next = 57;
                  break;
                }

                console.log('已经授权过啦，并且用户信息也有了~');

                if (!globalData.refresh) {
                  _context2.next = 28;
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
                _context2.next = 17;
                return parent.setTriggerType();

              case 17:
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
                self.records = globalData.recordsTodayShow;
                self.index = triggerType;
                self.$apply();
                wx.hideLoading();
                _context2.next = 45;
                break;

              case 28:
                if (!(globalData.recordsTodayShow && !self.records)) {
                  _context2.next = 45;
                  break;
                }

                wx.showLoading({
                  title: '数据加载中',
                  mask: true
                });
                _context2.next = 32;
                return parent.getTodayList();

              case 32:
                _context2.next = 34;
                return parent.setTriggerType();

              case 34:
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
                self.records = globalData.recordsTodayShow;
                self.index = _triggerType;
                self.$apply();
                wx.hideLoading();
                _context2.next = 45;
                break;

              case 45:
                if (!globalData.menstruationPeriodFlag) {
                  _context2.next = 55;
                  break;
                }

                _context2.next = 48;
                return parent.setTriggerType();

              case 48:
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
                self.index = _triggerType2;
                self.$apply();

              case 55:
                _context2.next = 124;
                break;

              case 57:
                console.log('我也不知道有没有授权，反正还没有用户数据');
                _context2.next = 60;
                return parent.getUserInfo();

              case 60:
                getUserInfo_Flag = _context2.sent;

                if (!(getUserInfo_Flag == 'false')) {
                  _context2.next = 96;
                  break;
                }

                _context2.next = 64;
                return parent.tryAuthAgain();

              case 64:
                tryAuthAgain_flag = _context2.sent;

                if (!(tryAuthAgain_flag == 'true')) {
                  _context2.next = 94;
                  break;
                }

                wx.showLoading({
                  title: '数据加载中',
                  mask: true
                });
                _context2.next = 69;
                return parent.loginWX();

              case 69:
                _context2.next = 71;
                return parent.getBMToken();

              case 71:
                _context2.next = 73;
                return parent.updateBMUser();

              case 73:
                _context2.next = 75;
                return parent.getBMUserInfo();

              case 75:
                _context2.next = 77;
                return parent.getTips();

              case 77:
                _context2.next = 79;
                return parent.convertRecord();

              case 79:
                _context2.next = 81;
                return parent.getRecords();

              case 81:
                _context2.next = 83;
                return parent.getTodayList();

              case 83:
                _context2.next = 85;
                return parent.setTriggerType();

              case 85:
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
                self.records = globalData.recordsTodayShow;
                self.index = _triggerType3;
                self.$apply();
                wx.hideLoading();

              case 94:
                _context2.next = 124;
                break;

              case 96:
                wx.showLoading({
                  title: '数据加载中',
                  mask: true
                });
                _context2.next = 99;
                return parent.loginWX();

              case 99:
                _context2.next = 101;
                return parent.getBMToken();

              case 101:
                _context2.next = 103;
                return parent.updateBMUser();

              case 103:
                _context2.next = 105;
                return parent.getBMUserInfo();

              case 105:
                _context2.next = 107;
                return parent.getTips();

              case 107:
                _context2.next = 109;
                return parent.convertRecord();

              case 109:
                _context2.next = 111;
                return parent.getRecords();

              case 111:
                _context2.next = 113;
                return parent.getTodayList();

              case 113:
                _context2.next = 115;
                return parent.setTriggerType();

              case 115:
                _triggerType4 = _context2.sent;
                _guide4 = self.guide;
                _menstruationPeriod4 = globalData.bmUser.menstruationPeriod;

                if (_triggerType4 == 1) {
                  _period4 = [6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

                  _guide4[1] = {
                    "desc": '\u60A8\u7684\u5468\u671F\u4E3A' + _menstruationPeriod4 + '\u5929\uFF0C\u8BF7\u5728\u5468\u671F\u7B2C' + _period4[_menstruationPeriod4 - 21] + '\u5929\u5F00\u59CB\u4F7F\u7528\u6392\u5375\u8BD5\u7EB8'
                  };
                }
                self.guide = _guide4;
                self.records = globalData.recordsTodayShow;
                self.index = _triggerType4;
                self.$apply();
                wx.hideLoading();

              case 124:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZGF5LmpzIl0sIm5hbWVzIjpbIkd1aWRlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjb3JkIiwiZGF0YSIsImZsYWciLCJpbmRleCIsImd1aWRlIiwicmVjb3JkcyIsInRvZGF5IiwiZGF0ZSIsInRpcCIsIm1ldGhvZHMiLCJ0YWtlUGhvdG8iLCJzZWxmIiwicGFyZW50IiwiJHBhcmVudCIsInd4Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJnZXRRaW5pdVRva2VuIiwidXBsb2FkUGhvdG8iLCJoaWRlTG9hZGluZyIsInJlZGlyZWN0VG8iLCJ1cmwiLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsImZhaWwiLCJjb21wbGV0ZSIsInNldHRpbmciLCJzd2l0Y2hUYWIiLCJvcHRpb25zIiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwicmVmcmVzaCIsImdldFRpcHMiLCJjb252ZXJ0UmVjb3JkIiwiZ2V0UmVjb3JkcyIsImdldFRvZGF5TGlzdCIsInNldFRyaWdnZXJUeXBlIiwidHJpZ2dlclR5cGUiLCJtZW5zdHJ1YXRpb25QZXJpb2QiLCJibVVzZXIiLCJwZXJpb2QiLCJyZWNvcmRzVG9kYXlTaG93IiwiJGFwcGx5IiwibWVuc3RydWF0aW9uUGVyaW9kRmxhZyIsImdldFVzZXJJbmZvIiwiZ2V0VXNlckluZm9fRmxhZyIsInRyeUF1dGhBZ2FpbiIsInRyeUF1dGhBZ2Fpbl9mbGFnIiwibG9naW5XWCIsImdldEJNVG9rZW4iLCJ1cGRhdGVCTVVzZXIiLCJnZXRCTVVzZXJJbmZvIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVZDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxnQkFB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OztFQWhOMkIsZUFBS21DLEk7O2tCQUFuQjdELEsiLCJmaWxlIjoidG9kYXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuICBpbXBvcnQgUmVjb3JkSXRlbSBmcm9tICcuLi9jb21wb25lbnRzL3JlY29yZGl0ZW0nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VpZGUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfku4rml6Xkv6Hmga8nXG4gICAgfVxuXG4gICAkcHJvcHMgPSB7XCJyZWNvcmRcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnJlY29yZHMuc3luY1wiOlwicmVjb3Jkc1wiLFwidi1iaW5kOnRoZW1lLnN5bmNcIjpcInRvZGF5XCIsXCJ2LWJpbmQ6ZGF0ZS5zeW5jXCI6XCJkYXRlXCIsXCJ2LWJpbmQ6dGlwLnN5bmNcIjpcInRpcFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICByZWNvcmQ6IFJlY29yZEl0ZW1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGZsYWc6IGZhbHNlLFxuICAgICAgaW5kZXg6IDAsXG4gICAgICBndWlkZTogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJkZXNjXCI6IFwi5oKo6L+Y5rKh5pyJ6K6+572u6L+H5ZGo5pyf6ZW/5bqm77yM6K6+572u5ZGo5pyf6ZW/5bqm5ZCO77yM5bCP5Yqp5omL5Y+v5Lul5oyH5a+85oKo5L2/55So5o6S5Y216K+V57q455qE5pe26Ze044CCXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiZGVzY1wiOiBcIuaCqOeahOWRqOacn+S4uljlpKnvvIzor7flnKjlkajmnJ/nrKxO5aSp5byA5aeL5L2/55So5o6S5Y216K+V57q4XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiZGVzY1wiOiBcIuaCqOeahOWRqOacn+i/h+efre+8jOW7uuiuruaCqOWSqOivouS4gOS4i+S4k+enkeWMu+eUn++8jOaIluiAheWcqOe7j+acn+e7k+adn+S5i+WQju+8jOWNs+WIu+W8gOWni+WdmuaMgeiusOW9leaOkuWNteivlee6uOaDheWGte+9nlwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImRlc2NcIjogXCLmgqjnmoTlkajmnJ/ovoPplb/vvIzlu7rorq7mgqjlkqjor6LkuIDkuIvkuJPnp5HljLvnlJ/vvIzmiJbogIXmgqjpooTorqHkuIvmrKHnu4/mnJ/mnaXmva7kuYvliY0yMOWkqeW8gOWni+iusOW9leaOkuWNteivlee6uOaDheWGte+9nlwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImRlc2NcIjogXCLlnKjkuIDkuKrlkajmnJ/lhoXlh7rnjrDlvLrpmLPovazlvLHpmLPvvIzor7TmmI7mjpLljbXlt7Lnu4/lj5HnlJ/vvIw15Liq5bCP5pe25YaF55qE54ix54ix5Lmf6L+Y5piv5pyJ5b6I6auY55qE5Lit5aWW5Yeg546H55qE77yBXCIsXG4gICAgICAgICAgXCJkZXNjMlwiOiBcIuaCqOWmguaenOS4jeiDveehruWumui6q+S9k+aYr+WQpuWujOWFqOWBpeW6t++8jOWPr+S7peWdmuaMgee7p+e7rea1i+mHj+aOkuWNteivlee6uOOAguWboOS4uuacieS4gOS6m+eWvueXheWPr+iDveS8mumAoOaIkOS4gOS4quWRqOacn+WGheWHuueOsOWkmuasoeWwj+eahOW8uumYs+W8semYs+eahOS6pOabv+WPmOWMlu+8jOWmguaenOaCqOWPkeeOsOi/meenjeaDheWGte+8jOS5n+S4jeeUqOiDoeaAneS5seaDs++8jOWPiuaXtuWOu+eci+S4gOS4i+WMu+eUn+WwseWlve+9nlwiXG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBcImRlc2NcIjogXCLlnKjkuIDkuKrlkajmnJ/ph4zvvIzlh7rnjrDlvLrpmLPkuYvlkI7vvIzpnIDopoHlop7liqDmtYvph4/popHnjofvvIzmnIDlpb3og73kv53or4Hlm5vkuKrlsI/ml7bmtYvph4/kuIDmrKHjgIJcIixcbiAgICAgICAgICAgIFwiZGVzYzJcIjogXCLlm6DkuLoyNC00OOWwj+aXtumaj+aXtumDveacieWPr+iDveWPkeeUn+aOkuWNte+8jOaOkuWNteWQjueri+WIu+S8mui9rOaIkOW8semYs+OAgumcgOimgeWinuWKoOmikeeOh+adpeabtOeyvuehrueahOaNleaNieWIsOW8uumYs+i9rOW8semYs+eahOaXtumXtOOAglwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBcImRlc2NcIjogXCLlh7rnjrDlvLrpmLPkuYvlkI7nmoTlvZPlpKnlj6/ku6XlronmjpLniLHniLHlk6bvvIHnhLblkI7pmpTlpKnlho3niLHniLHkuIDmrKHvvIznm7TliLDmjZXmjYnliLDlvLrpmLPovazlvLHpmLPvvZ7lpoLmraTvvIzkuK3lpZbnmoTlh6Dnjofog73lpKflpKfmj5Dpq5jlkaLvvIFcIixcbiAgICAgICAgICAgIFwiZGVzYzJcIjogXCJcIlxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgIF0sXG4gICAgICByZWNvcmRzOiBudWxsLFxuICAgICAgdG9kYXk6ICd0b2RheScsXG4gICAgICBkYXRlOiBmYWxzZSxcbiAgICAgIHRpcDogZmFsc2VcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgYXN5bmMgdGFrZVBob3RvICgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgY29uc3QgcGFyZW50ID0gc2VsZi4kcGFyZW50XG4gICAgICAgIGF3YWl0IHBhcmVudC50YWtlUGhvdG8oKVxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfnhafniYfkuIrkvKDkuK0nLFxuICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgYXdhaXQgcGFyZW50LmdldFFpbml1VG9rZW4oKVxuICAgICAgICBhd2FpdCBwYXJlbnQudXBsb2FkUGhvdG8oKSAvLzE65Y6f5Zu+IDI66KOB5Ymq5Zu+XG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL3Jlc3VsdCcsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MnKVxuICAgICAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgLy8gZmFpbFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb21wbGV0ZScpXG4gICAgICAgICAgICAvLyBjb21wbGV0ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBzZXR0aW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL3JlY29yZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgfVxuXG4gICAgYXN5bmMgb25TaG93IChvcHRpb25zKSB7XG4gICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgY29uc3QgcGFyZW50ID0gc2VsZi4kcGFyZW50XG4gICAgICBjb25zdCBnbG9iYWxEYXRhID0gcGFyZW50Lmdsb2JhbERhdGFcbiAgICAgIGlmIChnbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCflt7Lnu4/mjojmnYPov4fllabvvIzlubbkuJTnlKjmiLfkv6Hmga/kuZ/mnInkuoZ+JylcbiAgICAgICAgaWYgKGdsb2JhbERhdGEucmVmcmVzaCkge1xuICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5pWw5o2u5Yqg6L295LitJyxcbiAgICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIGF3YWl0IHBhcmVudC5nZXRUaXBzKClcbiAgICAgICAgICBhd2FpdCBwYXJlbnQuY29udmVydFJlY29yZCgpXG4gICAgICAgICAgYXdhaXQgcGFyZW50LmdldFJlY29yZHMoKVxuICAgICAgICAgIGF3YWl0IHBhcmVudC5nZXRUb2RheUxpc3QoKVxuICAgICAgICAgIGNvbnN0IHRyaWdnZXJUeXBlID0gYXdhaXQgcGFyZW50LnNldFRyaWdnZXJUeXBlKClcbiAgICAgICAgICBjb25zdCBndWlkZSA9IHNlbGYuZ3VpZGVcbiAgICAgICAgICBjb25zdCBtZW5zdHJ1YXRpb25QZXJpb2QgPSBnbG9iYWxEYXRhLmJtVXNlci5tZW5zdHJ1YXRpb25QZXJpb2RcbiAgICAgICAgICBpZiAodHJpZ2dlclR5cGUgPT0gMSkge1xuICAgICAgICAgICAgY29uc3QgcGVyaW9kID0gWzYsIDYsIDcsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCwgMjEsIDIyLCAyM107XG4gICAgICAgICAgICBndWlkZVsxXSA9IHtcbiAgICAgICAgICAgICAgICBcImRlc2NcIjogYOaCqOeahOWRqOacn+S4uiR7bWVuc3RydWF0aW9uUGVyaW9kfeWkqe+8jOivt+WcqOWRqOacn+esrCR7cGVyaW9kW21lbnN0cnVhdGlvblBlcmlvZCAtIDIxXX3lpKnlvIDlp4vkvb/nlKjmjpLljbXor5XnurhgXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc2VsZi5ndWlkZSA9IGd1aWRlXG4gICAgICAgICAgc2VsZi5yZWNvcmRzID0gZ2xvYmFsRGF0YS5yZWNvcmRzVG9kYXlTaG93XG4gICAgICAgICAgc2VsZi5pbmRleCA9IHRyaWdnZXJUeXBlXG4gICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIH0gZWxzZSBpZiAoZ2xvYmFsRGF0YS5yZWNvcmRzVG9kYXlTaG93ICYmICFzZWxmLnJlY29yZHMpIHtcbiAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICB0aXRsZTogJ+aVsOaNruWKoOi9veS4rScsXG4gICAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICBhd2FpdCBwYXJlbnQuZ2V0VG9kYXlMaXN0KClcbiAgICAgICAgICBjb25zdCB0cmlnZ2VyVHlwZSA9IGF3YWl0IHBhcmVudC5zZXRUcmlnZ2VyVHlwZSgpXG4gICAgICAgICAgY29uc3QgZ3VpZGUgPSBzZWxmLmd1aWRlXG4gICAgICAgICAgY29uc3QgbWVuc3RydWF0aW9uUGVyaW9kID0gZ2xvYmFsRGF0YS5ibVVzZXIubWVuc3RydWF0aW9uUGVyaW9kXG4gICAgICAgICAgaWYgKHRyaWdnZXJUeXBlID09IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHBlcmlvZCA9IFs2LCA2LCA3LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOSwgMjAsIDIxLCAyMiwgMjNdO1xuICAgICAgICAgICAgZ3VpZGVbMV0gPSB7XG4gICAgICAgICAgICAgICAgXCJkZXNjXCI6IGDmgqjnmoTlkajmnJ/kuLoke21lbnN0cnVhdGlvblBlcmlvZH3lpKnvvIzor7flnKjlkajmnJ/nrKwke3BlcmlvZFttZW5zdHJ1YXRpb25QZXJpb2QgLSAyMV195aSp5byA5aeL5L2/55So5o6S5Y216K+V57q4YFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlbGYuZ3VpZGUgPSBndWlkZVxuICAgICAgICAgIHNlbGYucmVjb3JkcyA9IGdsb2JhbERhdGEucmVjb3Jkc1RvZGF5U2hvd1xuICAgICAgICAgIHNlbGYuaW5kZXggPSB0cmlnZ2VyVHlwZVxuICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdsb2JhbERhdGEubWVuc3RydWF0aW9uUGVyaW9kRmxhZykge1xuICAgICAgICAgIGNvbnN0IHRyaWdnZXJUeXBlID0gYXdhaXQgcGFyZW50LnNldFRyaWdnZXJUeXBlKClcbiAgICAgICAgICBjb25zdCBndWlkZSA9IHNlbGYuZ3VpZGVcbiAgICAgICAgICBjb25zdCBtZW5zdHJ1YXRpb25QZXJpb2QgPSBnbG9iYWxEYXRhLmJtVXNlci5tZW5zdHJ1YXRpb25QZXJpb2RcbiAgICAgICAgICBpZiAodHJpZ2dlclR5cGUgPT0gMSkge1xuICAgICAgICAgICAgY29uc3QgcGVyaW9kID0gWzYsIDYsIDcsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCwgMjEsIDIyLCAyM107XG4gICAgICAgICAgICBndWlkZVsxXSA9IHtcbiAgICAgICAgICAgICAgICBcImRlc2NcIjogYOaCqOeahOWRqOacn+S4uiR7bWVuc3RydWF0aW9uUGVyaW9kfeWkqe+8jOivt+WcqOWRqOacn+esrCR7cGVyaW9kW21lbnN0cnVhdGlvblBlcmlvZCAtIDIxXX3lpKnlvIDlp4vkvb/nlKjmjpLljbXor5XnurhgXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc2VsZi5ndWlkZSA9IGd1aWRlXG4gICAgICAgICAgc2VsZi5pbmRleCA9IHRyaWdnZXJUeXBlXG4gICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygn5oiR5Lmf5LiN55+l6YGT5pyJ5rKh5pyJ5o6I5p2D77yM5Y+N5q2j6L+Y5rKh5pyJ55So5oi35pWw5o2uJylcbiAgICAgICAgY29uc3QgZ2V0VXNlckluZm9fRmxhZyA9IGF3YWl0IHBhcmVudC5nZXRVc2VySW5mbygpXG4gICAgICAgIGlmKGdldFVzZXJJbmZvX0ZsYWcgPT0gJ2ZhbHNlJykge1xuICAgICAgICAgIGNvbnN0IHRyeUF1dGhBZ2Fpbl9mbGFnID0gYXdhaXQgcGFyZW50LnRyeUF1dGhBZ2FpbigpXG4gICAgICAgICAgaWYgKHRyeUF1dGhBZ2Fpbl9mbGFnID09ICd0cnVlJykge1xuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+aVsOaNruWKoOi9veS4rScsXG4gICAgICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBhd2FpdCBwYXJlbnQubG9naW5XWCgpXG4gICAgICAgICAgICBhd2FpdCBwYXJlbnQuZ2V0Qk1Ub2tlbigpXG4gICAgICAgICAgICBhd2FpdCBwYXJlbnQudXBkYXRlQk1Vc2VyKClcbiAgICAgICAgICAgIGF3YWl0IHBhcmVudC5nZXRCTVVzZXJJbmZvKClcbiAgICAgICAgICAgIGF3YWl0IHBhcmVudC5nZXRUaXBzKClcbiAgICAgICAgICAgIGF3YWl0IHBhcmVudC5jb252ZXJ0UmVjb3JkKClcbiAgICAgICAgICAgIGF3YWl0IHBhcmVudC5nZXRSZWNvcmRzKClcbiAgICAgICAgICAgIGF3YWl0IHBhcmVudC5nZXRUb2RheUxpc3QoKVxuICAgICAgICAgICAgY29uc3QgdHJpZ2dlclR5cGUgPSBhd2FpdCBwYXJlbnQuc2V0VHJpZ2dlclR5cGUoKVxuICAgICAgICAgICAgY29uc3QgZ3VpZGUgPSBzZWxmLmd1aWRlXG4gICAgICAgICAgICBjb25zdCBtZW5zdHJ1YXRpb25QZXJpb2QgPSBnbG9iYWxEYXRhLmJtVXNlci5tZW5zdHJ1YXRpb25QZXJpb2RcbiAgICAgICAgICAgIGlmICh0cmlnZ2VyVHlwZSA9PSAxKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHBlcmlvZCA9IFs2LCA2LCA3LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOSwgMjAsIDIxLCAyMiwgMjNdO1xuICAgICAgICAgICAgICBndWlkZVsxXSA9IHtcbiAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBg5oKo55qE5ZGo5pyf5Li6JHttZW5zdHJ1YXRpb25QZXJpb2R95aSp77yM6K+35Zyo5ZGo5pyf56ysJHtwZXJpb2RbbWVuc3RydWF0aW9uUGVyaW9kIC0gMjFdfeWkqeW8gOWni+S9v+eUqOaOkuWNteivlee6uGBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmd1aWRlID0gZ3VpZGVcbiAgICAgICAgICAgIHNlbGYucmVjb3JkcyA9IGdsb2JhbERhdGEucmVjb3Jkc1RvZGF5U2hvd1xuICAgICAgICAgICAgc2VsZi5pbmRleCA9IHRyaWdnZXJUeXBlXG4gICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICB0aXRsZTogJ+aVsOaNruWKoOi9veS4rScsXG4gICAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICBhd2FpdCBwYXJlbnQubG9naW5XWCgpXG4gICAgICAgICAgYXdhaXQgcGFyZW50LmdldEJNVG9rZW4oKVxuICAgICAgICAgIGF3YWl0IHBhcmVudC51cGRhdGVCTVVzZXIoKVxuICAgICAgICAgIGF3YWl0IHBhcmVudC5nZXRCTVVzZXJJbmZvKClcbiAgICAgICAgICBhd2FpdCBwYXJlbnQuZ2V0VGlwcygpXG4gICAgICAgICAgYXdhaXQgcGFyZW50LmNvbnZlcnRSZWNvcmQoKVxuICAgICAgICAgIGF3YWl0IHBhcmVudC5nZXRSZWNvcmRzKClcbiAgICAgICAgICBhd2FpdCBwYXJlbnQuZ2V0VG9kYXlMaXN0KClcbiAgICAgICAgICBjb25zdCB0cmlnZ2VyVHlwZSA9IGF3YWl0IHBhcmVudC5zZXRUcmlnZ2VyVHlwZSgpXG4gICAgICAgICAgY29uc3QgZ3VpZGUgPSBzZWxmLmd1aWRlXG4gICAgICAgICAgY29uc3QgbWVuc3RydWF0aW9uUGVyaW9kID0gZ2xvYmFsRGF0YS5ibVVzZXIubWVuc3RydWF0aW9uUGVyaW9kXG4gICAgICAgICAgaWYgKHRyaWdnZXJUeXBlID09IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHBlcmlvZCA9IFs2LCA2LCA3LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOSwgMjAsIDIxLCAyMiwgMjNdO1xuICAgICAgICAgICAgZ3VpZGVbMV0gPSB7XG4gICAgICAgICAgICAgICAgXCJkZXNjXCI6IGDmgqjnmoTlkajmnJ/kuLoke21lbnN0cnVhdGlvblBlcmlvZH3lpKnvvIzor7flnKjlkajmnJ/nrKwke3BlcmlvZFttZW5zdHJ1YXRpb25QZXJpb2QgLSAyMV195aSp5byA5aeL5L2/55So5o6S5Y216K+V57q4YFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlbGYuZ3VpZGUgPSBndWlkZVxuICAgICAgICAgIHNlbGYucmVjb3JkcyA9IGdsb2JhbERhdGEucmVjb3Jkc1RvZGF5U2hvd1xuICAgICAgICAgIHNlbGYuaW5kZXggPSB0cmlnZ2VyVHlwZVxuICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=