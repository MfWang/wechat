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
      navigationBarTitleText: '支付'
    }, _this.data = {
      appid: 'wx7e71d8c807fc0f58',
      secret: 'a76c9f9638f02c9b19d048a6fccefca1',
      index: -1,
      userInfo: null,
      code: null,
      openInfo: null
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Payment, [{
    key: 'tryAuthAgain',
    value: function tryAuthAgain() {
      return new Promise(function (resolve, reject) {
        console.log('tryAuthAgain start');
        _wepy2.default.showModal({
          title: '是否要打开设置页面重新授权',
          content: '需要获取您的公开信息(昵称、头像等)',
          confirmColor: '#E56CAC',
          success: function success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              _wepy2.default.openSetting({
                success: function success(res) {
                  console.log('tryAuthAgain success');
                  resolve('true');
                },
                fail: function fail(res) {
                  resolve('false');
                },
                complete: function complete(res) {}
              });
            } else if (res.cancel) {
              console.log('用户点击取消');
              resolve('false');
            }
          }
        });
      });
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo() {
      var that = this;
      return new Promise(function (resolve, reject) {
        console.log('getWXUserInfo start');
        _wepy2.default.getUserInfo({
          success: function success(res) {
            that.userInfo = res.userInfo;
            that.$apply();
            console.log('getWXUserInfo success');
            resolve('true');
          },
          fail: function fail(res) {
            console.log('getWXUserInfo fail');
            resolve('false');
          }
        });
      });
    }
  }, {
    key: 'loginWX',
    value: function loginWX() {
      var that = this;
      return new Promise(function (resolve, reject) {
        console.log('login start');
        _wepy2.default.login({
          success: function success(res) {
            if (res.code) {
              console.log('login success');
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              console.log(res.code);
              that.code = res.code;
              that.$apply();
              resolve('true');
            } else {
              console.log('login fail');
              _wepy2.default.showModal({
                title: '获取用户登录态失败',
                content: '重新登录？',
                success: function success(res) {
                  if (res.confirm) {
                    that.loginWX();
                  } else if (res.cancel) {
                    resolve('false');
                  }
                }
              });
            }
          }
        });
      });
    }
  }, {
    key: 'getOpenId',
    value: function getOpenId() {
      var that = this;
      return new Promise(function (resolve, reject) {
        console.log('getOpenId start');
        _wepy2.default.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: that.appid,
            secret: that.secret,
            js_code: that.code,
            grant_type: 'authorization_code'
          },
          success: function success(res) {
            console.log('getOpenId success');
            console.log(res);
            that.openInfo = res.data;
            that.$apply();
            resolve('true');
          },
          fail: function fail() {
            console.log('getOpenId fail');
            resolve('false');
          }
        });
      });
    }
    // 生成商户订单

  }, {
    key: 'generateOrder',
    value: function generateOrder() {
      var that = this;
      // 统一支付签名
      // appid
      var appid = that.appid;
      // 商户名
      var body = '';
      // 商户号
      var mchId = '';
      // 随机字符串，不长于32位。
      var nonceStr = that.randomString();
      // 通知地址
      var notifyUrl = '';
      // ip
      var spbillCreateIp = '替换为自己的终端IP';
      var totalFee = 100;
      var tradeType = 'JSAPI';
      var key = that.openInfo.key;
      var unifiedPayment = '\n        appid=' + appid + '&body' + body + '&mch_id' + mchId + '\n        &nonce_str=' + nonceStr + '\xACify_url=' + notifyUrl + '\n        &openid=' + that.openInfo.openid + '&out_trade_no=' + that.openInfo.paySn + '\n        &spbill_create_ip=' + spbillCreateIp + '&total_fee=' + totalFee + '\n        &trade_type=' + tradeType + '&key=' + key + '\n      ';
      var sign = MD5.MD5(unifiedPayment).toUpperCase();
      console.log(sign);

      // 封装统一支付xml参数
      var formData = '\n        <xml>\n          <appid>' + appid + '</appid>\n          <body>' + body + '</body>\n          <mch_id>' + mchId + '</mch_id>\n          <nonce_str>' + nonceStr + '</nonce_str>\n          <notify_url>' + notifyUrl + '</notify_url>\n          <openid>' + that.openInfo.openid + '</openid>\n          <out_trade_no>' + that.openInfo.paySn + '</out_trade_no>\n          <spbill_create_ip>' + spbillCreateIp + '</spbill_create_ip>\n          <total_fee>' + totalFee + '</total_fee>\n          <trade_type>' + tradeType + '</trade_type>\n          <sign>' + sign + '</sign>\n        </xml>\n      ';
      _wepy2.default.request({
        url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
        method: 'POST',
        head: 'application/x-www-form-urlencoded',
        data: formData, // 设置请求的 header
        success: function success(res) {
          console.log(res.data);
          var resultCode = that.getXMLNodeValue('result_code', res.data.toString('utf-8'));
          resultCode = resultCode.split('[')[2].split(']')[0];
          if (resultCode === 'FAIL') {
            var errCodeDes = that.getXMLNodeValue('err_code_des', res.data.toString('utf-8'));
            var errDes = errCodeDes.split('[')[2].split(']')[0];
            _wepy2.default.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
              success: function success(res) {
                _wepy2.default.showToast({
                  title: errDes,
                  icon: 'success',
                  duration: 2000
                });
              }
            });
          } else {
            // 发起支付
            var prepayId = that.getXMLNodeValue('prepay_id', res.data.toString('utf-8'));
            var tmp = prepayId.split('[');
            var tmp1 = tmp[2].split(']');
            // 签名
            var key = that.openInfo.key;
            var appId = that.appid;
            var timeStamp = that.createTimeStamp();
            var nonceStr = that.randomString();
            var stringSignTemp = '\n              appId=' + appId + '&nonceStr=' + nonceStr + '&package=prepay_id=' + tmp1[0] + '\n              &signType=MD5&timeStamp=' + timeStamp + '&key=' + key + '\n            ';
            var sign = MD5.MD5(stringSignTemp).toUpperCase();
            console.log(sign);
            var param = {
              'timeStamp': timeStamp,
              'package': 'prepay_id=' + tmp1[0],
              'paySign': sign,
              'signType': 'MD5',
              'nonceStr': nonceStr
            };
            that.pay(param);
          }
        }
      });
    }
    // 发起支付

  }, {
    key: 'pay',
    value: function pay(param) {
      console.log('pay start');
      console.log(param);
      _wepy2.default.requestPayment({
        timeStamp: param.timeStamp,
        nonceStr: param.nonceStr,
        package: param.package,
        signType: param.signType,
        paySign: param.paySign,
        success: function success(res) {
          // success
          console.log(res);
          _wepy2.default.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
            success: function success(res) {
              _wepy2.default.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              });
            },
            fail: function fail() {
              // fail
            },
            complete: function complete() {
              // complete
            }
          });
        },
        fail: function fail() {
          // fail
          console.log('支付失败');
        },
        complete: function complete() {
          // complete
          console.log('pay complete');
        }
      });
    }
    /* 随机数 */

  }, {
    key: 'randomString',
    value: function randomString() {
      // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
      var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      var maxPos = chars.length;
      var pwd = '';
      for (var i = 0; i < 32; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    }
    // 时间戳

  }, {
    key: 'createTimeStamp',
    value: function createTimeStamp() {
      return parseInt(new Date().getTime() / 1000) + '';
    }
  }, {
    key: 'onShow',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var that, getUserInfoFlag, tryAuthAgainFlag;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;

                if (!that.userInfo) {
                  _context.next = 5;
                  break;
                }

                console.log('已经授权过啦，并且用户信息也有了~');
                _context.next = 32;
                break;

              case 5:
                console.log('我也不知道有没有授权，反正还没有用户数据');
                _context.next = 8;
                return that.getUserInfo();

              case 8:
                getUserInfoFlag = _context.sent;

                if (!(getUserInfoFlag === 'true')) {
                  _context.next = 17;
                  break;
                }

                console.log('getUserInfoFlag === true');
                _context.next = 13;
                return that.loginWX();

              case 13:
                _context.next = 15;
                return that.getOpenId();

              case 15:
                _context.next = 32;
                break;

              case 17:
                console.log('getUserInfoFlag ===false');
                _context.next = 20;
                return that.tryAuthAgain();

              case 20:
                tryAuthAgainFlag = _context.sent;

                if (!(tryAuthAgainFlag === 'true')) {
                  _context.next = 31;
                  break;
                }

                console.log('tryAuthAgainFlag === true');
                _context.next = 25;
                return that.getUserInfo();

              case 25:
                _context.next = 27;
                return that.loginWX();

              case 27:
                _context.next = 29;
                return that.getOpenId();

              case 29:
                _context.next = 32;
                break;

              case 31:
                console.log('tryAuthAgainFlag === false');

              case 32:
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

  return Payment;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Payment , 'pages/payment'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheW1lbnQuanMiXSwibmFtZXMiOlsiUGF5bWVudCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiYXBwaWQiLCJzZWNyZXQiLCJpbmRleCIsInVzZXJJbmZvIiwiY29kZSIsIm9wZW5JbmZvIiwibWV0aG9kcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY29uc29sZSIsImxvZyIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImNvbmZpcm1Db2xvciIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwib3BlblNldHRpbmciLCJmYWlsIiwiY29tcGxldGUiLCJjYW5jZWwiLCJ0aGF0IiwiZ2V0VXNlckluZm8iLCIkYXBwbHkiLCJsb2dpbiIsImxvZ2luV1giLCJyZXF1ZXN0IiwidXJsIiwianNfY29kZSIsImdyYW50X3R5cGUiLCJib2R5IiwibWNoSWQiLCJub25jZVN0ciIsInJhbmRvbVN0cmluZyIsIm5vdGlmeVVybCIsInNwYmlsbENyZWF0ZUlwIiwidG90YWxGZWUiLCJ0cmFkZVR5cGUiLCJrZXkiLCJ1bmlmaWVkUGF5bWVudCIsIm9wZW5pZCIsInBheVNuIiwic2lnbiIsIk1ENSIsInRvVXBwZXJDYXNlIiwiZm9ybURhdGEiLCJtZXRob2QiLCJoZWFkIiwicmVzdWx0Q29kZSIsImdldFhNTE5vZGVWYWx1ZSIsInRvU3RyaW5nIiwic3BsaXQiLCJlcnJDb2RlRGVzIiwiZXJyRGVzIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCJwcmVwYXlJZCIsInRtcCIsInRtcDEiLCJhcHBJZCIsInRpbWVTdGFtcCIsImNyZWF0ZVRpbWVTdGFtcCIsInN0cmluZ1NpZ25UZW1wIiwicGFyYW0iLCJwYXkiLCJyZXF1ZXN0UGF5bWVudCIsInBhY2thZ2UiLCJzaWduVHlwZSIsInBheVNpZ24iLCJjaGFycyIsIm1heFBvcyIsImxlbmd0aCIsInB3ZCIsImkiLCJjaGFyQXQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJwYXJzZUludCIsIkRhdGUiLCJnZXRUaW1lIiwiZ2V0VXNlckluZm9GbGFnIiwiZ2V0T3BlbklkIiwidHJ5QXV0aEFnYWluIiwidHJ5QXV0aEFnYWluRmxhZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsSSxHQUFPO0FBQ0xDLGFBQU8sb0JBREY7QUFFTEMsY0FBUSxrQ0FGSDtBQUdMQyxhQUFPLENBQUMsQ0FISDtBQUlMQyxnQkFBVSxJQUpMO0FBS0xDLFlBQU0sSUFMRDtBQU1MQyxnQkFBVTtBQU5MLEssUUFRUEMsTyxHQUFVLEU7Ozs7O21DQUdNO0FBQ2QsYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBVUMsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDNUNDLGdCQUFRQyxHQUFSLENBQVksb0JBQVo7QUFDQSx1QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLGlCQUFPLGVBRE07QUFFYkMsbUJBQVMsb0JBRkk7QUFHYkMsd0JBQWMsU0FIRDtBQUliQyxtQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCLGdCQUFJQSxJQUFJQyxPQUFSLEVBQWlCO0FBQ2ZSLHNCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNBLDZCQUFLUSxXQUFMLENBQWlCO0FBQ2ZILHlCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEJQLDBCQUFRQyxHQUFSLENBQVksc0JBQVo7QUFDQUgsMEJBQVEsTUFBUjtBQUNELGlCQUpjO0FBS2ZZLHNCQUFNLGNBQUNILEdBQUQsRUFBUztBQUNiVCwwQkFBUSxPQUFSO0FBQ0QsaUJBUGM7QUFRZmEsMEJBQVUsa0JBQUNKLEdBQUQsRUFBUyxDQUNsQjtBQVRjLGVBQWpCO0FBV0QsYUFiRCxNQWFPLElBQUlBLElBQUlLLE1BQVIsRUFBZ0I7QUFDckJaLHNCQUFRQyxHQUFSLENBQVksUUFB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Ozs7O0FBRU43RSx3QkFBUUMsR0FBUixDQUFZLDRCQUFaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBblMyQixlQUFLK0UsSTs7a0JBQXJCOUYsTyIsImZpbGUiOiJwYXltZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQYXltZW50IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pSv5LuYJ1xuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBhcHBpZDogJ3d4N2U3MWQ4YzgwN2ZjMGY1OCcsXG4gICAgICBzZWNyZXQ6ICdhNzZjOWY5NjM4ZjAyYzliMTlkMDQ4YTZmY2NlZmNhMScsXG4gICAgICBpbmRleDogLTEsXG4gICAgICB1c2VySW5mbzogbnVsbCxcbiAgICAgIGNvZGU6IG51bGwsXG4gICAgICBvcGVuSW5mbzogbnVsbFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgIH1cblxuICAgIHRyeUF1dGhBZ2FpbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb25zb2xlLmxvZygndHJ5QXV0aEFnYWluIHN0YXJ0JylcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5piv5ZCm6KaB5omT5byA6K6+572u6aG16Z2i6YeN5paw5o6I5p2DJyxcbiAgICAgICAgICBjb250ZW50OiAn6ZyA6KaB6I635Y+W5oKo55qE5YWs5byA5L+h5oGvKOaYteensOOAgeWktOWDj+etiSknLFxuICAgICAgICAgIGNvbmZpcm1Db2xvcjogJyNFNTZDQUMnLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye756Gu5a6aJylcbiAgICAgICAgICAgICAgd2VweS5vcGVuU2V0dGluZyh7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyeUF1dGhBZ2FpbiBzdWNjZXNzJylcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ3RydWUnKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnZmFsc2UnKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpXG4gICAgICAgICAgICAgIHJlc29sdmUoJ2ZhbHNlJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRVc2VySW5mbygpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZ2V0V1hVc2VySW5mbyBzdGFydCcpXG4gICAgICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgICAgIHN1Y2Nlc3MgKHJlcykge1xuICAgICAgICAgICAgdGhhdC51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldFdYVXNlckluZm8gc3VjY2VzcycpXG4gICAgICAgICAgICByZXNvbHZlKCd0cnVlJylcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWwgKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldFdYVXNlckluZm8gZmFpbCcpXG4gICAgICAgICAgICByZXNvbHZlKCdmYWxzZScpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gICAgbG9naW5XWCAoKSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2xvZ2luIHN0YXJ0JylcbiAgICAgICAgd2VweS5sb2dpbih7XG4gICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbG9naW4gc3VjY2VzcycpXG4gICAgICAgICAgICAgIC8vIOWPkemAgSByZXMuY29kZSDliLDlkI7lj7DmjaLlj5Ygb3BlbklkLCBzZXNzaW9uS2V5LCB1bmlvbklkXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5jb2RlKVxuICAgICAgICAgICAgICB0aGF0LmNvZGUgPSByZXMuY29kZVxuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICAgIHJlc29sdmUoJ3RydWUnKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ2luIGZhaWwnKVxuICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfojrflj5bnlKjmiLfnmbvlvZXmgIHlpLHotKUnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfph43mlrDnmbvlvZXvvJ8nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmxvZ2luV1goKVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ2ZhbHNlJylcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0T3BlbklkICgpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZ2V0T3BlbklkIHN0YXJ0JylcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL2FwaS53ZWl4aW4ucXEuY29tL3Nucy9qc2NvZGUyc2Vzc2lvbicsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYXBwaWQ6IHRoYXQuYXBwaWQsXG4gICAgICAgICAgICBzZWNyZXQ6IHRoYXQuc2VjcmV0LFxuICAgICAgICAgICAganNfY29kZTogdGhhdC5jb2RlLFxuICAgICAgICAgICAgZ3JhbnRfdHlwZTogJ2F1dGhvcml6YXRpb25fY29kZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRPcGVuSWQgc3VjY2VzcycpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICB0aGF0Lm9wZW5JbmZvID0gcmVzLmRhdGFcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICAgIHJlc29sdmUoJ3RydWUnKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldE9wZW5JZCBmYWlsJylcbiAgICAgICAgICAgIHJlc29sdmUoJ2ZhbHNlJylcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgICAvLyDnlJ/miJDllYbmiLforqLljZVcbiAgICBnZW5lcmF0ZU9yZGVyICgpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgLy8g57uf5LiA5pSv5LuY562+5ZCNXG4gICAgICAvLyBhcHBpZFxuICAgICAgdmFyIGFwcGlkID0gdGhhdC5hcHBpZFxuICAgICAgLy8g5ZWG5oi35ZCNXG4gICAgICB2YXIgYm9keSA9ICcnXG4gICAgICAvLyDllYbmiLflj7dcbiAgICAgIHZhciBtY2hJZCA9ICcnXG4gICAgICAvLyDpmo/mnLrlrZfnrKbkuLLvvIzkuI3plb/kuo4zMuS9jeOAglxuICAgICAgdmFyIG5vbmNlU3RyID0gdGhhdC5yYW5kb21TdHJpbmcoKVxuICAgICAgLy8g6YCa55+l5Zyw5Z2AXG4gICAgICB2YXIgbm90aWZ5VXJsID0gJydcbiAgICAgIC8vIGlwXG4gICAgICB2YXIgc3BiaWxsQ3JlYXRlSXAgPSAn5pu/5o2i5Li66Ieq5bex55qE57uI56uvSVAnXG4gICAgICB2YXIgdG90YWxGZWUgPSAxMDBcbiAgICAgIHZhciB0cmFkZVR5cGUgPSAnSlNBUEknXG4gICAgICBjb25zdCBrZXkgPSB0aGF0Lm9wZW5JbmZvLmtleVxuICAgICAgdmFyIHVuaWZpZWRQYXltZW50ID0gYFxuICAgICAgICBhcHBpZD0ke2FwcGlkfSZib2R5JHtib2R5fSZtY2hfaWQke21jaElkfVxuICAgICAgICAmbm9uY2Vfc3RyPSR7bm9uY2VTdHJ9wqxpZnlfdXJsPSR7bm90aWZ5VXJsfVxuICAgICAgICAmb3BlbmlkPSR7dGhhdC5vcGVuSW5mby5vcGVuaWR9Jm91dF90cmFkZV9ubz0ke3RoYXQub3BlbkluZm8ucGF5U259XG4gICAgICAgICZzcGJpbGxfY3JlYXRlX2lwPSR7c3BiaWxsQ3JlYXRlSXB9JnRvdGFsX2ZlZT0ke3RvdGFsRmVlfVxuICAgICAgICAmdHJhZGVfdHlwZT0ke3RyYWRlVHlwZX0ma2V5PSR7a2V5fVxuICAgICAgYFxuICAgICAgdmFyIHNpZ24gPSBNRDUuTUQ1KHVuaWZpZWRQYXltZW50KS50b1VwcGVyQ2FzZSgpXG4gICAgICBjb25zb2xlLmxvZyhzaWduKVxuXG4gICAgICAvLyDlsIHoo4Xnu5/kuIDmlK/ku5h4bWzlj4LmlbBcbiAgICAgIHZhciBmb3JtRGF0YSA9IGBcbiAgICAgICAgPHhtbD5cbiAgICAgICAgICA8YXBwaWQ+JHthcHBpZH08L2FwcGlkPlxuICAgICAgICAgIDxib2R5PiR7Ym9keX08L2JvZHk+XG4gICAgICAgICAgPG1jaF9pZD4ke21jaElkfTwvbWNoX2lkPlxuICAgICAgICAgIDxub25jZV9zdHI+JHtub25jZVN0cn08L25vbmNlX3N0cj5cbiAgICAgICAgICA8bm90aWZ5X3VybD4ke25vdGlmeVVybH08L25vdGlmeV91cmw+XG4gICAgICAgICAgPG9wZW5pZD4ke3RoYXQub3BlbkluZm8ub3BlbmlkfTwvb3BlbmlkPlxuICAgICAgICAgIDxvdXRfdHJhZGVfbm8+JHt0aGF0Lm9wZW5JbmZvLnBheVNufTwvb3V0X3RyYWRlX25vPlxuICAgICAgICAgIDxzcGJpbGxfY3JlYXRlX2lwPiR7c3BiaWxsQ3JlYXRlSXB9PC9zcGJpbGxfY3JlYXRlX2lwPlxuICAgICAgICAgIDx0b3RhbF9mZWU+JHt0b3RhbEZlZX08L3RvdGFsX2ZlZT5cbiAgICAgICAgICA8dHJhZGVfdHlwZT4ke3RyYWRlVHlwZX08L3RyYWRlX3R5cGU+XG4gICAgICAgICAgPHNpZ24+JHtzaWdufTwvc2lnbj5cbiAgICAgICAgPC94bWw+XG4gICAgICBgXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwczovL2FwaS5tY2gud2VpeGluLnFxLmNvbS9wYXkvdW5pZmllZG9yZGVyJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWQ6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgICAgICBkYXRhOiBmb3JtRGF0YSwgLy8g6K6+572u6K+35rGC55qEIGhlYWRlclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICAgICAgICAgbGV0IHJlc3VsdENvZGUgPSB0aGF0LmdldFhNTE5vZGVWYWx1ZSgncmVzdWx0X2NvZGUnLCByZXMuZGF0YS50b1N0cmluZygndXRmLTgnKSlcbiAgICAgICAgICByZXN1bHRDb2RlID0gcmVzdWx0Q29kZS5zcGxpdCgnWycpWzJdLnNwbGl0KCddJylbMF1cbiAgICAgICAgICBpZiAocmVzdWx0Q29kZSA9PT0gJ0ZBSUwnKSB7XG4gICAgICAgICAgICB2YXIgZXJyQ29kZURlcyA9IHRoYXQuZ2V0WE1MTm9kZVZhbHVlKCdlcnJfY29kZV9kZXMnLCByZXMuZGF0YS50b1N0cmluZygndXRmLTgnKSlcbiAgICAgICAgICAgIHZhciBlcnJEZXMgPSBlcnJDb2RlRGVzLnNwbGl0KCdbJylbMl0uc3BsaXQoJ10nKVswXVxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICBkZWx0YTogMSwgLy8g5Zue6YCA5YmNIGRlbHRhKOm7mOiupOS4ujEpIOmhtemdolxuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6IGVyckRlcyxcbiAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g5Y+R6LW35pSv5LuYXG4gICAgICAgICAgICB2YXIgcHJlcGF5SWQgPSB0aGF0LmdldFhNTE5vZGVWYWx1ZSgncHJlcGF5X2lkJywgcmVzLmRhdGEudG9TdHJpbmcoJ3V0Zi04JykpXG4gICAgICAgICAgICB2YXIgdG1wID0gcHJlcGF5SWQuc3BsaXQoJ1snKVxuICAgICAgICAgICAgdmFyIHRtcDEgPSB0bXBbMl0uc3BsaXQoJ10nKVxuICAgICAgICAgICAgLy8g562+5ZCNXG4gICAgICAgICAgICB2YXIga2V5ID0gdGhhdC5vcGVuSW5mby5rZXlcbiAgICAgICAgICAgIHZhciBhcHBJZCA9IHRoYXQuYXBwaWRcbiAgICAgICAgICAgIHZhciB0aW1lU3RhbXAgPSB0aGF0LmNyZWF0ZVRpbWVTdGFtcCgpXG4gICAgICAgICAgICB2YXIgbm9uY2VTdHIgPSB0aGF0LnJhbmRvbVN0cmluZygpXG4gICAgICAgICAgICB2YXIgc3RyaW5nU2lnblRlbXAgPSBgXG4gICAgICAgICAgICAgIGFwcElkPSR7YXBwSWR9Jm5vbmNlU3RyPSR7bm9uY2VTdHJ9JnBhY2thZ2U9cHJlcGF5X2lkPSR7dG1wMVswXX1cbiAgICAgICAgICAgICAgJnNpZ25UeXBlPU1ENSZ0aW1lU3RhbXA9JHt0aW1lU3RhbXB9JmtleT0ke2tleX1cbiAgICAgICAgICAgIGBcbiAgICAgICAgICAgIHZhciBzaWduID0gTUQ1Lk1ENShzdHJpbmdTaWduVGVtcCkudG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgY29uc29sZS5sb2coc2lnbilcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtID0ge1xuICAgICAgICAgICAgICAndGltZVN0YW1wJzogdGltZVN0YW1wLFxuICAgICAgICAgICAgICAncGFja2FnZSc6ICdwcmVwYXlfaWQ9JyArIHRtcDFbMF0sXG4gICAgICAgICAgICAgICdwYXlTaWduJzogc2lnbixcbiAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogJ01ENScsXG4gICAgICAgICAgICAgICdub25jZVN0cic6IG5vbmNlU3RyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGF0LnBheShwYXJhbSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIC8vIOWPkei1t+aUr+S7mFxuICAgIHBheSAocGFyYW0pIHtcbiAgICAgIGNvbnNvbGUubG9nKCdwYXkgc3RhcnQnKVxuICAgICAgY29uc29sZS5sb2cocGFyYW0pXG4gICAgICB3ZXB5LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgdGltZVN0YW1wOiBwYXJhbS50aW1lU3RhbXAsXG4gICAgICAgIG5vbmNlU3RyOiBwYXJhbS5ub25jZVN0cixcbiAgICAgICAgcGFja2FnZTogcGFyYW0ucGFja2FnZSxcbiAgICAgICAgc2lnblR5cGU6IHBhcmFtLnNpZ25UeXBlLFxuICAgICAgICBwYXlTaWduOiBwYXJhbS5wYXlTaWduLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICBkZWx0YTogMSwgLy8g5Zue6YCA5YmNIGRlbHRhKOm7mOiupOS4ujEpIOmhtemdolxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmlK/ku5jmiJDlip8nLFxuICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgLy8gZmFpbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIC8vIGNvbXBsZXRlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGZhaWxcbiAgICAgICAgICBjb25zb2xlLmxvZygn5pSv5LuY5aSx6LSlJylcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBjb21wbGV0ZVxuICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXkgY29tcGxldGUnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICAvKiDpmo/mnLrmlbAgKi9cbiAgICByYW5kb21TdHJpbmcgKCkge1xuICAgICAgLy8g6buY6K6k5Y675o6J5LqG5a655piT5re35reG55qE5a2X56ymb09MbCw5Z3EsVnYsVXUsSTFcbiAgICAgIHZhciBjaGFycyA9ICdBQkNERUZHSEpLTU5QUVJTVFdYWVphYmNkZWZoaWprbW5wcnN0d3h5ejIzNDU2NzgnXG4gICAgICB2YXIgbWF4UG9zID0gY2hhcnMubGVuZ3RoXG4gICAgICB2YXIgcHdkID0gJydcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgICBwd2QgKz0gY2hhcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heFBvcykpXG4gICAgICB9XG4gICAgICByZXR1cm4gcHdkXG4gICAgfVxuICAgIC8vIOaXtumXtOaIs1xuICAgIGNyZWF0ZVRpbWVTdGFtcCAoKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKSArICcnXG4gICAgfVxuXG4gICAgYXN5bmMgb25TaG93KCkge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICAgIGlmICh0aGF0LnVzZXJJbmZvKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCflt7Lnu4/mjojmnYPov4fllabvvIzlubbkuJTnlKjmiLfkv6Hmga/kuZ/mnInkuoZ+JylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfmiJHkuZ/kuI3nn6XpgZPmnInmsqHmnInmjojmnYPvvIzlj43mraPov5jmsqHmnInnlKjmiLfmlbDmja4nKVxuICAgICAgICBjb25zdCBnZXRVc2VySW5mb0ZsYWcgPSBhd2FpdCB0aGF0LmdldFVzZXJJbmZvKClcbiAgICAgICAgaWYgKGdldFVzZXJJbmZvRmxhZyA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2dldFVzZXJJbmZvRmxhZyA9PT0gdHJ1ZScpXG4gICAgICAgICAgYXdhaXQgdGhhdC5sb2dpbldYKClcbiAgICAgICAgICBhd2FpdCB0aGF0LmdldE9wZW5JZCgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2dldFVzZXJJbmZvRmxhZyA9PT1mYWxzZScpXG4gICAgICAgICAgY29uc3QgdHJ5QXV0aEFnYWluRmxhZyA9IGF3YWl0IHRoYXQudHJ5QXV0aEFnYWluKClcbiAgICAgICAgICBpZiAodHJ5QXV0aEFnYWluRmxhZyA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndHJ5QXV0aEFnYWluRmxhZyA9PT0gdHJ1ZScpXG4gICAgICAgICAgICBhd2FpdCB0aGF0LmdldFVzZXJJbmZvKClcbiAgICAgICAgICAgIGF3YWl0IHRoYXQubG9naW5XWCgpXG4gICAgICAgICAgICBhd2FpdCB0aGF0LmdldE9wZW5JZCgpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0cnlBdXRoQWdhaW5GbGFnID09PSBmYWxzZScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=