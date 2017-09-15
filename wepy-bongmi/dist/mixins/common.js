'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var commonMixin = function (_wepy$mixin) {
  _inherits(commonMixin, _wepy$mixin);

  function commonMixin() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, commonMixin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = commonMixin.__proto__ || Object.getPrototypeOf(commonMixin)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      mixin: 'This is mixin data.'
    }, _this.methods = {
      tap: function tap() {
        this.mixin = 'mixin data was changed';
        console.log('mixin method tap');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(commonMixin, [{
    key: 'tryAuthAgain',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', new Promise(function (resolve, reject) {
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
                }));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function tryAuthAgain() {
        return _ref2.apply(this, arguments);
      }

      return tryAuthAgain;
    }()
  }, {
    key: 'getUserInfo',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var self;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                self = this;
                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('getWXUserInfo start');
                  _wepy2.default.getUserInfo({
                    success: function success(res) {
                      self.globalData.userInfo = res.userInfo;
                      console.log('getWXUserInfo success');
                      resolve('true');
                    },
                    fail: function fail(res) {
                      console.log('getWXUserInfo fail');
                      resolve('false');
                    }
                  });
                }));

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getUserInfo() {
        return _ref3.apply(this, arguments);
      }

      return getUserInfo;
    }()
  }, {
    key: 'loginWX',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var self;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                self = this;
                return _context3.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('login start');
                  _wepy2.default.login({
                    success: function success(res) {
                      if (res.code) {
                        console.log('login success');
                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                        self.globalData.code = res.code;
                        console.log(res.code);
                        resolve('true');
                      } else {
                        console.log('login fail');
                        _wepy2.default.showModal({
                          title: '获取用户登录态失败',
                          content: '重新登录？',
                          success: function success(res) {
                            if (res.confirm) {
                              self.loginWX();
                            } else if (res.cancel) {
                              resolve('false');
                            }
                          }
                        });
                      }
                    }
                  });
                }));

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loginWX() {
        return _ref4.apply(this, arguments);
      }

      return loginWX;
    }()
  }, {
    key: 'getBMToken',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var self, globalData;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                self = this;
                globalData = self.globalData;
                return _context4.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('getBMToken start');
                  _wepy2.default.request({
                    url: globalData.bongmiAPI + '/wechat_mp/access_token',
                    data: {
                      app_id: globalData.appid,
                      code: globalData.code
                    },
                    success: function success(res) {
                      console.log('getBMToken success');
                      console.log(res.data);
                      self.globalData.bmUser = res.data;
                      resolve();
                    },
                    fail: function fail() {
                      console.log('getBMToken fail');
                    }
                  });
                }));

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getBMToken() {
        return _ref5.apply(this, arguments);
      }

      return getBMToken;
    }()
  }, {
    key: 'updateBMUser',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var self, globalData;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                self = this;
                globalData = self.globalData;
                return _context5.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('updateBMUser start');
                  _wepy2.default.request({
                    url: globalData.bongmiAPI + '/user/' + globalData.bmUser.userId + '?access_token=' + globalData.bmUser.accessToken,
                    data: {
                      id: globalData.bmUser.userId,
                      nickname: globalData.userInfo.nickName,
                      gender: globalData.userInfo.gender === 2 ? 'Female' : 'Male'
                    },
                    header: {
                      authorization: 'Lollypop-Weixin-Mini-Program'
                    },
                    method: 'PUT',
                    success: function success(res) {
                      console.log('updateBMUser success');
                      resolve();
                    }
                  });
                }));

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function updateBMUser() {
        return _ref6.apply(this, arguments);
      }

      return updateBMUser;
    }()
  }, {
    key: 'getBMUserInfo',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var self, globalData;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                self = this;
                globalData = self.globalData;
                return _context6.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('getBMUserInfo start');
                  _wepy2.default.request({
                    url: globalData.bongmiAPI + '/user/' + globalData.bmUser.userId,
                    data: {
                      access_token: globalData.bmUser.accessToken
                    },
                    header: {
                      authorization: 'Lollypop-Weixin-Mini-Program'
                    },
                    success: function success(res) {
                      console.log('getBMUserInfo success');
                      self.globalData.bmUser = Object.assign(globalData.bmUser, res.data);
                      console.log(globalData);
                      resolve();
                    }
                  });
                }));

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getBMUserInfo() {
        return _ref7.apply(this, arguments);
      }

      return getBMUserInfo;
    }()
  }, {
    key: 'getTips',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var self, globalData, bmUser;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                self = this;
                globalData = self.globalData;
                bmUser = globalData.bmUser;
                return _context7.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('getTips');
                  _wepy2.default.request({
                    url: globalData.bongmiAPI + '/wechat_mp/' + bmUser.userId + '/' + bmUser.selfMemberId + '/ovulation_test',
                    data: {
                      app_flag: 1,
                      access_token: bmUser.accessToken
                    },
                    header: {
                      authorization: 'Lollypop-Weixin-Mini-Program'
                    },
                    success: function success(res) {
                      console.log('getTips success');
                      self.globalData.recordsAll = res.data;
                      resolve();
                    }
                  });
                }));

              case 4:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getTips() {
        return _ref8.apply(this, arguments);
      }

      return getTips;
    }()
  }, {
    key: 'convertRecord',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var self;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                self = this;
                return _context8.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('convertRecord start');
                  var recordsAll = self.globalData.recordsAll;
                  var recordsList = recordsAll.ovulationTestResultList;
                  var date = '';
                  recordsList.map(function (item) {
                    var time = new Date(item.timestamp * 1000);
                    item.date = time.getMonth() + 1 + '\u6708' + time.getDate() + '\u65E5';
                    if (item.date === date) {
                      item.dateFlag = false;
                    } else {
                      item.dateFlag = true;
                      date = item.date;
                    }
                    item.time = (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) + ':' + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes());
                    item.type = item.resultType === 1 ? '阴性' : item.resultType === 2 ? '弱阳' : '强阳';
                    item.classname = item.resultType === 1 ? 'peak' : item.resultType === 2 ? 'low' : 'high';
                    item.tip = false;
                  });
                  self.globalData.recordsAll = {
                    ovulationTestResultList: recordsList,
                    triggerType: recordsAll.triggerType
                  };
                  console.log('convertRecord end');
                  console.log(self.globalData.recordsAll);
                  resolve();
                }));

              case 2:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function convertRecord() {
        return _ref9.apply(this, arguments);
      }

      return convertRecord;
    }()
  }, {
    key: 'getRecords',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var self, bmUser, date, timestamp, h, m, s, interval;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                self = this;
                bmUser = self.globalData.bmUser;
                date = new Date();
                timestamp = Math.floor(date.getTime() / 1000);
                h = date.getHours();
                m = date.getMinutes();
                s = date.getSeconds();
                interval = h * 3600 + m * 60 + s;
                return _context9.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('getRecords start');
                  _wepy2.default.request({
                    url: self.globalData.bongmiAPI + '/body_status/' + bmUser.userId + '/' + bmUser.selfMemberId + '/report/512/' + timestamp + '/' + interval,
                    data: {
                      app_flag: 1,
                      access_token: bmUser.accessToken
                    },
                    header: {
                      authorization: 'Lollypop-Weixin-Mini-Program'
                    },
                    success: function success(res) {
                      console.log('getRecords success');
                      var recordsToday = res.data[0];
                      if (recordsToday) {
                        recordsToday.detail = JSON.parse(recordsToday.detail);
                        if (!recordsToday.detail.map) {
                          recordsToday.detail = [recordsToday.detail];
                        }
                        self.globalData.recordsToday = recordsToday;
                      }
                      resolve();
                    }
                  });
                }));

              case 9:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getRecords() {
        return _ref10.apply(this, arguments);
      }

      return getRecords;
    }()
  }, {
    key: 'getTodayList',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var self;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                self = this;
                return _context10.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('getTodayList start');
                  var date = new Date();
                  var h = date.getHours();
                  var m = date.getMinutes();
                  var s = date.getSeconds();
                  var timestamp = Math.floor(date.getTime() / 1000) - (h * 3600 + m * 60 + s);
                  var records = self.globalData.recordsAll.ovulationTestResultList.filter(function (item) {
                    return item.timestamp >= timestamp;
                  });
                  self.globalData.recordsTodayShow = records;
                  resolve(records);
                }));

              case 2:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getTodayList() {
        return _ref11.apply(this, arguments);
      }

      return getTodayList;
    }()
  }, {
    key: 'setTriggerType',
    value: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var globalData, triggerType;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                globalData = this.globalData;
                triggerType = '';
                return _context11.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('setTriggerType start');
                  triggerType = function triggerType() {
                    switch (globalData.recordsAll.triggerType) {
                      case 1:
                        var menstruationPeriod = globalData.bmUser.menstruationPeriod;
                        if (menstruationPeriod) {
                          if (menstruationPeriod < 21) {
                            return 2;
                          } else if (menstruationPeriod > 41) {
                            return 3;
                          } else {
                            return 1;
                          }
                        } else {
                          return 0;
                        }
                      case 2:
                        return 4;
                      case 3:
                        return 5;
                    }
                  };
                  console.log('setTriggerType end');
                  resolve(triggerType());
                }));

              case 3:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function setTriggerType() {
        return _ref12.apply(this, arguments);
      }

      return setTriggerType;
    }()
  }]);

  return commonMixin;
}(_wepy2.default.mixin);

exports.default = commonMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJjb21tb25NaXhpbiIsImRhdGEiLCJtaXhpbiIsIm1ldGhvZHMiLCJ0YXAiLCJjb25zb2xlIiwibG9nIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJjb25maXJtQ29sb3IiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsIm9wZW5TZXR0aW5nIiwiZmFpbCIsImNvbXBsZXRlIiwiY2FuY2VsIiwic2VsZiIsImdldFVzZXJJbmZvIiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwibG9naW4iLCJjb2RlIiwibG9naW5XWCIsInJlcXVlc3QiLCJ1cmwiLCJib25nbWlBUEkiLCJhcHBfaWQiLCJhcHBpZCIsImJtVXNlciIsInVzZXJJZCIsImFjY2Vzc1Rva2VuIiwiaWQiLCJuaWNrbmFtZSIsIm5pY2tOYW1lIiwiZ2VuZGVyIiwiaGVhZGVyIiwiYXV0aG9yaXphdGlvbiIsIm1ldGhvZCIsImFjY2Vzc190b2tlbiIsIk9iamVjdCIsImFzc2lnbiIsInNlbGZNZW1iZXJJZCIsImFwcF9mbGFnIiwicmVjb3Jkc0FsbCIsInJlY29yZHNMaXN0Iiwib3Z1bGF0aW9uVGVzdFJlc3VsdExpc3QiLCJkYXRlIiwibWFwIiwiaXRlbSIsInRpbWUiLCJEYXRlIiwidGltZXN0YW1wIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZGF0ZUZsYWciLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJ0eXBlIiwicmVzdWx0VHlwZSIsImNsYXNzbmFtZSIsInRpcCIsInRyaWdnZXJUeXBlIiwiTWF0aCIsImZsb29yIiwiZ2V0VGltZSIsImgiLCJtIiwicyIsImdldFNlY29uZHMiLCJpbnRlcnZhbCIsInJlY29yZHNUb2RheSIsImRldGFpbCIsIkpTT04iLCJwYXJzZSIsInJlY29yZHMiLCJmaWx0ZXIiLCJyZWNvcmRzVG9kYXlTaG93IiwibWVuc3RydWF0aW9uUGVyaW9kIl0sIm1hcHBpbmdz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O0FBQ1IsMkJBQUssQ0FBTDtBQUFRLCtCQUFPLENBQVA7QUFmVjtBQWlCRCxtQkFsQkQ7QUFtQkE3RSwwQkFBUUMsR0FBUixDQUFZLG9CQUFaO0FBQ0FFLDBCQUFRMEQsYUFBUjtBQUNELGlCQXZCTSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBL1E4QixlQUFLaEUsSzs7a0JBQXpCRixXIiwiZmlsZSI6ImNvbW1vbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGNvbW1vbk1peGluIGV4dGVuZHMgd2VweS5taXhpbiB7XG4gIGRhdGEgPSB7XG4gICAgbWl4aW46ICdUaGlzIGlzIG1peGluIGRhdGEuJ1xuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgdGFwICgpIHtcbiAgICAgIHRoaXMubWl4aW4gPSAnbWl4aW4gZGF0YSB3YXMgY2hhbmdlZCdcbiAgICAgIGNvbnNvbGUubG9nKCdtaXhpbiBtZXRob2QgdGFwJylcbiAgICB9XG4gIH1cbiAgYXN5bmMgdHJ5QXV0aEFnYWluICgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgY29uc29sZS5sb2coJ3RyeUF1dGhBZ2FpbiBzdGFydCcpXG4gICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5piv5ZCm6KaB5omT5byA6K6+572u6aG16Z2i6YeN5paw5o6I5p2DJyxcbiAgICAgICAgY29udGVudDogJ+mcgOimgeiOt+WPluaCqOeahOWFrOW8gOS/oeaBryjmmLXnp7DjgIHlpLTlg4/nrYkpJyxcbiAgICAgICAgY29uZmlybUNvbG9yOiAnI0U1NkNBQycsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKVxuICAgICAgICAgICAgd2VweS5vcGVuU2V0dGluZyh7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndHJ5QXV0aEFnYWluIHN1Y2Nlc3MnKVxuICAgICAgICAgICAgICAgIHJlc29sdmUoJ3RydWUnKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBmYWlsOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgnZmFsc2UnKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBjb21wbGV0ZTogKHJlcykgPT4ge1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpXG4gICAgICAgICAgICByZXNvbHZlKCdmYWxzZScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBhc3luYyBnZXRVc2VySW5mbygpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnZ2V0V1hVc2VySW5mbyBzdGFydCcpXG4gICAgICB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAgICAgc3VjY2VzcyAocmVzKSB7XG4gICAgICAgICAgc2VsZi5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgICAgY29uc29sZS5sb2coJ2dldFdYVXNlckluZm8gc3VjY2VzcycpXG4gICAgICAgICAgcmVzb2x2ZSgndHJ1ZScpXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwgKHJlcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRXWFVzZXJJbmZvIGZhaWwnKVxuICAgICAgICAgIHJlc29sdmUoJ2ZhbHNlJylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgbG9naW5XWCAoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgY29uc29sZS5sb2coJ2xvZ2luIHN0YXJ0JylcbiAgICAgIHdlcHkubG9naW4oe1xuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIGlmIChyZXMuY29kZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ2luIHN1Y2Nlc3MnKVxuICAgICAgICAgICAgLy8g5Y+R6YCBIHJlcy5jb2RlIOWIsOWQjuWPsOaNouWPliBvcGVuSWQsIHNlc3Npb25LZXksIHVuaW9uSWRcbiAgICAgICAgICAgIHNlbGYuZ2xvYmFsRGF0YS5jb2RlID0gcmVzLmNvZGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5jb2RlKVxuICAgICAgICAgICAgcmVzb2x2ZSgndHJ1ZScpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2dpbiBmYWlsJylcbiAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfojrflj5bnlKjmiLfnmbvlvZXmgIHlpLHotKUnLFxuICAgICAgICAgICAgICBjb250ZW50OiAn6YeN5paw55m75b2V77yfJyxcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgc2VsZi5sb2dpbldYKClcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ2ZhbHNlJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBhc3luYyBnZXRCTVRva2VuICgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgIGNvbnN0IGdsb2JhbERhdGEgPSBzZWxmLmdsb2JhbERhdGFcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgY29uc29sZS5sb2coJ2dldEJNVG9rZW4gc3RhcnQnKVxuICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBgJHtnbG9iYWxEYXRhLmJvbmdtaUFQSX0vd2VjaGF0X21wL2FjY2Vzc190b2tlbmAsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBhcHBfaWQ6IGdsb2JhbERhdGEuYXBwaWQsXG4gICAgICAgICAgY29kZTogZ2xvYmFsRGF0YS5jb2RlXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0Qk1Ub2tlbiBzdWNjZXNzJylcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSlcbiAgICAgICAgICBzZWxmLmdsb2JhbERhdGEuYm1Vc2VyID0gcmVzLmRhdGFcbiAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRCTVRva2VuIGZhaWwnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBhc3luYyB1cGRhdGVCTVVzZXIgKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgY29uc3QgZ2xvYmFsRGF0YSA9IHNlbGYuZ2xvYmFsRGF0YVxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBjb25zb2xlLmxvZygndXBkYXRlQk1Vc2VyIHN0YXJ0JylcbiAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgIHVybDogYCR7Z2xvYmFsRGF0YS5ib25nbWlBUEl9L3VzZXIvJHtnbG9iYWxEYXRhLmJtVXNlci51c2VySWR9P2FjY2Vzc190b2tlbj0ke2dsb2JhbERhdGEuYm1Vc2VyLmFjY2Vzc1Rva2VufWAsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBpZDogZ2xvYmFsRGF0YS5ibVVzZXIudXNlcklkLFxuICAgICAgICAgIG5pY2tuYW1lOiBnbG9iYWxEYXRhLnVzZXJJbmZvLm5pY2tOYW1lLFxuICAgICAgICAgIGdlbmRlcjogZ2xvYmFsRGF0YS51c2VySW5mby5nZW5kZXIgPT09IDIgPyAnRmVtYWxlJyA6ICdNYWxlJ1xuICAgICAgICB9LFxuICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICBhdXRob3JpemF0aW9uOiAnTG9sbHlwb3AtV2VpeGluLU1pbmktUHJvZ3JhbSdcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGVCTVVzZXIgc3VjY2VzcycpXG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIGdldEJNVXNlckluZm8gKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgY29uc3QgZ2xvYmFsRGF0YSA9IHNlbGYuZ2xvYmFsRGF0YVxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBjb25zb2xlLmxvZygnZ2V0Qk1Vc2VySW5mbyBzdGFydCcpXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGAke2dsb2JhbERhdGEuYm9uZ21pQVBJfS91c2VyLyR7Z2xvYmFsRGF0YS5ibVVzZXIudXNlcklkfWAsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBhY2Nlc3NfdG9rZW46IGdsb2JhbERhdGEuYm1Vc2VyLmFjY2Vzc1Rva2VuXG4gICAgICAgIH0sXG4gICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgIGF1dGhvcml6YXRpb246ICdMb2xseXBvcC1XZWl4aW4tTWluaS1Qcm9ncmFtJ1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2dldEJNVXNlckluZm8gc3VjY2VzcycpXG4gICAgICAgICAgc2VsZi5nbG9iYWxEYXRhLmJtVXNlciA9IE9iamVjdC5hc3NpZ24oZ2xvYmFsRGF0YS5ibVVzZXIsIHJlcy5kYXRhKVxuICAgICAgICAgIGNvbnNvbGUubG9nKGdsb2JhbERhdGEpXG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIGdldFRpcHMgKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgY29uc3QgZ2xvYmFsRGF0YSA9IHNlbGYuZ2xvYmFsRGF0YVxuICAgIGNvbnN0IGJtVXNlciA9IGdsb2JhbERhdGEuYm1Vc2VyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdnZXRUaXBzJylcbiAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgIHVybDogYCR7Z2xvYmFsRGF0YS5ib25nbWlBUEl9L3dlY2hhdF9tcC8ke2JtVXNlci51c2VySWR9LyR7Ym1Vc2VyLnNlbGZNZW1iZXJJZH0vb3Z1bGF0aW9uX3Rlc3RgLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgYXBwX2ZsYWc6IDEsXG4gICAgICAgICAgYWNjZXNzX3Rva2VuOiBibVVzZXIuYWNjZXNzVG9rZW5cbiAgICAgICAgfSxcbiAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgYXV0aG9yaXphdGlvbjogJ0xvbGx5cG9wLVdlaXhpbi1NaW5pLVByb2dyYW0nXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0VGlwcyBzdWNjZXNzJylcbiAgICAgICAgICBzZWxmLmdsb2JhbERhdGEucmVjb3Jkc0FsbCA9IHJlcy5kYXRhXG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIGNvbnZlcnRSZWNvcmQgKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdjb252ZXJ0UmVjb3JkIHN0YXJ0JylcbiAgICAgIGNvbnN0IHJlY29yZHNBbGwgPSBzZWxmLmdsb2JhbERhdGEucmVjb3Jkc0FsbFxuICAgICAgY29uc3QgcmVjb3Jkc0xpc3QgPSByZWNvcmRzQWxsLm92dWxhdGlvblRlc3RSZXN1bHRMaXN0XG4gICAgICBsZXQgZGF0ZSA9ICcnXG4gICAgICByZWNvcmRzTGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKGl0ZW0udGltZXN0YW1wICogMTAwMClcbiAgICAgICAgaXRlbS5kYXRlID0gYCR7dGltZS5nZXRNb250aCgpICsgMX3mnIgke3RpbWUuZ2V0RGF0ZSgpfeaXpWBcbiAgICAgICAgaWYgKGl0ZW0uZGF0ZSA9PT0gZGF0ZSkge1xuICAgICAgICAgIGl0ZW0uZGF0ZUZsYWcgPSBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uZGF0ZUZsYWcgPSB0cnVlXG4gICAgICAgICAgZGF0ZSA9IGl0ZW0uZGF0ZVxuICAgICAgICB9XG4gICAgICAgIGl0ZW0udGltZSA9IGAke3RpbWUuZ2V0SG91cnMoKSA8IDEwID8gJzAnICsgdGltZS5nZXRIb3VycygpIDogdGltZS5nZXRIb3VycygpfToke3RpbWUuZ2V0TWludXRlcygpIDwgMTAgPyAnMCcgKyB0aW1lLmdldE1pbnV0ZXMoKSA6IHRpbWUuZ2V0TWludXRlcygpfWBcbiAgICAgICAgaXRlbS50eXBlID0gaXRlbS5yZXN1bHRUeXBlID09PSAxID8gJ+mYtOaApycgOiAoaXRlbS5yZXN1bHRUeXBlID09PSAyID8gJ+W8semYsycgOiAn5by66ZizJylcbiAgICAgICAgaXRlbS5jbGFzc25hbWUgPSBpdGVtLnJlc3VsdFR5cGUgPT09IDEgPyAncGVhaycgOiAoaXRlbS5yZXN1bHRUeXBlID09PSAyID8gJ2xvdycgOiAnaGlnaCcpXG4gICAgICAgIGl0ZW0udGlwID0gZmFsc2VcbiAgICAgIH0pXG4gICAgICBzZWxmLmdsb2JhbERhdGEucmVjb3Jkc0FsbCA9IHtcbiAgICAgICAgb3Z1bGF0aW9uVGVzdFJlc3VsdExpc3Q6IHJlY29yZHNMaXN0LFxuICAgICAgICB0cmlnZ2VyVHlwZTogcmVjb3Jkc0FsbC50cmlnZ2VyVHlwZVxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coJ2NvbnZlcnRSZWNvcmQgZW5kJylcbiAgICAgIGNvbnNvbGUubG9nKHNlbGYuZ2xvYmFsRGF0YS5yZWNvcmRzQWxsKVxuICAgICAgcmVzb2x2ZSgpXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIGdldFJlY29yZHMgKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgY29uc3QgYm1Vc2VyID0gc2VsZi5nbG9iYWxEYXRhLmJtVXNlclxuXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBNYXRoLmZsb29yKGRhdGUuZ2V0VGltZSgpIC8gMTAwMClcbiAgICBjb25zdCBoID0gZGF0ZS5nZXRIb3VycygpXG4gICAgY29uc3QgbSA9IGRhdGUuZ2V0TWludXRlcygpXG4gICAgY29uc3QgcyA9IGRhdGUuZ2V0U2Vjb25kcygpXG4gICAgY29uc3QgaW50ZXJ2YWwgPSBoICogMzYwMCArIG0gKiA2MCArIHNcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBjb25zb2xlLmxvZygnZ2V0UmVjb3JkcyBzdGFydCcpXG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGAke3NlbGYuZ2xvYmFsRGF0YS5ib25nbWlBUEl9L2JvZHlfc3RhdHVzLyR7Ym1Vc2VyLnVzZXJJZH0vJHtibVVzZXIuc2VsZk1lbWJlcklkfS9yZXBvcnQvNTEyLyR7dGltZXN0YW1wfS8ke2ludGVydmFsfWAsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBhcHBfZmxhZzogMSxcbiAgICAgICAgICBhY2Nlc3NfdG9rZW46IGJtVXNlci5hY2Nlc3NUb2tlblxuICAgICAgICB9LFxuICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICBhdXRob3JpemF0aW9uOiAnTG9sbHlwb3AtV2VpeGluLU1pbmktUHJvZ3JhbSdcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRSZWNvcmRzIHN1Y2Nlc3MnKVxuICAgICAgICAgIGNvbnN0IHJlY29yZHNUb2RheSA9IHJlcy5kYXRhWzBdXG4gICAgICAgICAgaWYgKHJlY29yZHNUb2RheSkge1xuICAgICAgICAgICAgcmVjb3Jkc1RvZGF5LmRldGFpbCA9IEpTT04ucGFyc2UocmVjb3Jkc1RvZGF5LmRldGFpbClcbiAgICAgICAgICAgIGlmICghcmVjb3Jkc1RvZGF5LmRldGFpbC5tYXApIHtcbiAgICAgICAgICAgICAgcmVjb3Jkc1RvZGF5LmRldGFpbCA9IFtyZWNvcmRzVG9kYXkuZGV0YWlsXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5nbG9iYWxEYXRhLnJlY29yZHNUb2RheSA9IHJlY29yZHNUb2RheVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgZ2V0VG9kYXlMaXN0ICgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnZ2V0VG9kYXlMaXN0IHN0YXJ0JylcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICBjb25zdCBoID0gZGF0ZS5nZXRIb3VycygpXG4gICAgICBjb25zdCBtID0gZGF0ZS5nZXRNaW51dGVzKClcbiAgICAgIGNvbnN0IHMgPSBkYXRlLmdldFNlY29uZHMoKVxuICAgICAgY29uc3QgdGltZXN0YW1wID0gTWF0aC5mbG9vcihkYXRlLmdldFRpbWUoKSAvIDEwMDApIC0gKGggKiAzNjAwICsgbSAqIDYwICsgcylcbiAgICAgIGNvbnN0IHJlY29yZHMgPSBzZWxmLmdsb2JhbERhdGEucmVjb3Jkc0FsbC5vdnVsYXRpb25UZXN0UmVzdWx0TGlzdC5maWx0ZXIoKGl0ZW0pID0+IChpdGVtLnRpbWVzdGFtcCA+PSB0aW1lc3RhbXApKVxuICAgICAgc2VsZi5nbG9iYWxEYXRhLnJlY29yZHNUb2RheVNob3cgPSByZWNvcmRzXG4gICAgICByZXNvbHZlKHJlY29yZHMpXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIHNldFRyaWdnZXJUeXBlICgpIHtcbiAgICBjb25zdCBnbG9iYWxEYXRhID0gdGhpcy5nbG9iYWxEYXRhXG4gICAgbGV0IHRyaWdnZXJUeXBlID0gJydcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3NldFRyaWdnZXJUeXBlIHN0YXJ0JylcbiAgICAgIHRyaWdnZXJUeXBlID0gKCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGdsb2JhbERhdGEucmVjb3Jkc0FsbC50cmlnZ2VyVHlwZSkge1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNvbnN0IG1lbnN0cnVhdGlvblBlcmlvZCA9IGdsb2JhbERhdGEuYm1Vc2VyLm1lbnN0cnVhdGlvblBlcmlvZFxuICAgICAgICAgICAgaWYgKG1lbnN0cnVhdGlvblBlcmlvZCkge1xuICAgICAgICAgICAgICBpZiAobWVuc3RydWF0aW9uUGVyaW9kIDwgMjEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMlxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1lbnN0cnVhdGlvblBlcmlvZCA+IDQxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDNcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgMjogcmV0dXJuIDRcbiAgICAgICAgICBjYXNlIDM6IHJldHVybiA1XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKCdzZXRUcmlnZ2VyVHlwZSBlbmQnKVxuICAgICAgcmVzb2x2ZSh0cmlnZ2VyVHlwZSgpKVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==