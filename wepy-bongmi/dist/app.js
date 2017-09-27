'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/today', 'pages/record', 'pages/guide', 'pages/result'],
      tabBar: {
        "color": "#A0A0A0",
        "selectedColor": "#E56CAC",
        "borderStyle": "black",
        "backgroundColor": "#FBFBFB",
        "list": [{
          "selectedIconPath": "images/btn_guide_press.png",
          "iconPath": "images/btn_guide.png",
          "pagePath": "pages/guide",
          "text": "使用指导"
        }, {
          "selectedIconPath": "images/btn_today_press.png",
          "iconPath": "images/btn_today.png",
          "pagePath": "pages/today",
          "text": "今日信息"
        }, {
          "selectedIconPath": "images/btn_edit_press.png",
          "iconPath": "images/btn_edit.png",
          "pagePath": "pages/record",
          "text": "我的记录"
        }]
      },
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      }
    };
    _this.globalData = {
      bongmiAPI: 'https://api-staging.bongmi.com/v1',
      appid: 'wx7e71d8c807fc0f58',
      secret: 'a76c9f9638f02c9b19d048a6fccefca1',
      code: null,
      bmUser: null,
      menstruationPeriodFlag: false,
      userInfo: null,
      pictureLocal: null,
      pictureOnline: null,
      tailorLocal: null,
      tailorOnline: null,
      result: null,
      qiniuUploadUrl: 'https://up.qbox.me',
      downloadUrl: 'https://img.bongmi.com',
      https: true,
      uploadInfo: null,
      todayBegin: 0,
      refresh: false,
      recordsAll: null,
      recordsTodayShow: null,
      recordsToday: null,
      datePicker: []
    };

    _this.use('requestfix');
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {}
  }, {
    key: 'tryAuthAgain',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var self, bmUser;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                self = this;
                bmUser = self.globalData.bmUser;
                return _context.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('tryAuthAgain start');
                  wx.showModal({
                    title: '是否要打开设置页面重新授权',
                    content: '需要获取您的公开信息(昵称、头像等)',
                    confirmColor: '#E56CAC',
                    success: function success(res) {
                      if (res.confirm) {
                        console.log('用户点击确定');
                        wx.openSetting({
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

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function tryAuthAgain() {
        return _ref.apply(this, arguments);
      }

      return tryAuthAgain;
    }()
  }, {
    key: 'getUserInfo',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var self;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                self = this;
                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('getWXUserInfo start');
                  wx.getUserInfo({
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
        return _ref2.apply(this, arguments);
      }

      return getUserInfo;
    }()
  }, {
    key: 'loginWX',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var self;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                self = this;
                return _context3.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('login start');
                  wx.login({
                    success: function success(res) {
                      if (res.code) {
                        console.log('login success');
                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                        self.globalData.code = res.code;
                        console.log(res.code);
                        resolve('true');
                      } else {
                        console.log('login fail');
                        wx.showModal({
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
        return _ref3.apply(this, arguments);
      }

      return loginWX;
    }()
  }, {
    key: 'getBMToken',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var self, globalData;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                self = this;
                globalData = self.globalData;
                return _context4.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('getBMToken start');
                  wx.request({
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
                      reject();
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
        return _ref4.apply(this, arguments);
      }

      return getBMToken;
    }()
  }, {
    key: 'updateBMUser',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var self, globalData;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                self = this;
                globalData = self.globalData;
                return _context5.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('updateBMUser start');
                  wx.request({
                    url: globalData.bongmiAPI + '/user/' + globalData.bmUser.userId + '?access_token=' + globalData.bmUser.accessToken,
                    data: {
                      id: globalData.bmUser.userId,
                      nickname: globalData.userInfo.nickName,
                      gender: globalData.userInfo.gender == 2 ? 'Female' : 'Male'
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
        return _ref5.apply(this, arguments);
      }

      return updateBMUser;
    }()
  }, {
    key: 'getBMUserInfo',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var self, globalData;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                self = this;
                globalData = self.globalData;
                return _context6.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('getBMUserInfo start');
                  wx.request({
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
        return _ref6.apply(this, arguments);
      }

      return getBMUserInfo;
    }()
  }, {
    key: 'getTips',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
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
                  wx.request({
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
                    },
                    fail: function fail() {
                      reject();
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
        return _ref7.apply(this, arguments);
      }

      return getTips;
    }()
  }, {
    key: 'convertRecord',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
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
                  recordsList.map(function (item, index) {
                    var time = new Date(item.timestamp * 1000);
                    item.date = time.getMonth() + 1 + '\u6708' + time.getDate() + '\u65E5';
                    if (item.date == date) {
                      item.dateFlag = false;
                    } else {
                      item.dateFlag = true;
                      date = item.date;
                    }
                    item.time = (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) + ':' + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes());
                    item.type = item.resultType == 1 ? '阴性' : item.resultType == 2 ? '弱阳' : '强阳';
                    item.classname = item.resultType == 1 ? 'peak' : item.resultType == 2 ? 'low' : 'high';
                    item.lineTag = true;
                    item.tip = false;
                    if (index != 0 && item.dateFlag) {
                      recordsList[index - 1].lineTag = false;
                    }
                    if (index != 0 && item.triggerType == 3) {
                      recordsList[index - 1].tip = true;
                    }
                  });
                  console.log(recordsList);
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
        return _ref8.apply(this, arguments);
      }

      return convertRecord;
    }()
  }, {
    key: 'getRecords',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
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
                  wx.request({
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
                    },
                    fail: function fail() {
                      console.log('getRecords fail');
                      reject();
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
        return _ref9.apply(this, arguments);
      }

      return getRecords;
    }()
  }, {
    key: 'getTodayList',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
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
                  resolve();
                }));

              case 2:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getTodayList() {
        return _ref10.apply(this, arguments);
      }

      return getTodayList;
    }()
  }, {
    key: 'setTriggerType',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var globalData, triggerType;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                globalData = this.globalData;
                triggerType = '';
                return _context11.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('setTriggerType start');
                  var menstruationPeriod = globalData.bmUser.menstruationPeriod;
                  triggerType = function triggerType() {
                    var triggerType = globalData.recordsAll.triggerType;
                    switch (triggerType) {
                      case 1:
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
                        return 5;
                      case 3:
                        return 4;
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
        return _ref11.apply(this, arguments);
      }

      return setTriggerType;
    }()
  }, {
    key: 'takePhoto',
    value: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var self;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                self = this;
                return _context12.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('takePhoto start');
                  wx.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    sourceType: ['camera'],
                    success: function success(res) {
                      self.globalData.pictureLocal = res.tempFilePaths[0];
                      console.log('takePhoto end');
                      resolve();
                    }
                  });
                }));

              case 2:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function takePhoto() {
        return _ref12.apply(this, arguments);
      }

      return takePhoto;
    }()
  }, {
    key: 'getQiniuToken',
    value: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var self, bmUser;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                self = this;
                bmUser = self.globalData.bmUser;
                return _context13.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('getQiniuToken start');
                  wx.request({
                    url: self.globalData.bongmiAPI + '/user/' + bmUser.userId + '/upload_info',
                    data: {
                      type: 2,
                      access_token: bmUser.accessToken
                    },
                    header: {
                      authorization: 'Lollypop-Weixin-Mini-Program'
                    },
                    success: function success(res) {
                      self.globalData.uploadInfo = res.data;
                      console.log('getQiniuToken end');
                      resolve();
                    }
                  });
                }));

              case 3:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function getQiniuToken() {
        return _ref13.apply(this, arguments);
      }

      return getQiniuToken;
    }()
  }, {
    key: 'uploadPhoto',
    value: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var self, globalData, bmUser;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                self = this;
                globalData = self.globalData;
                bmUser = globalData.bmUser;
                return _context14.abrupt('return', new Promise(function (resolve, reject) {
                  console.log('uploadPhoto start');
                  wx.uploadFile({
                    url: '' + globalData.qiniuUploadUrl,
                    filePath: globalData.pictureLocal,
                    // filePath: pictureType == 1 ? globalData.pictureLocal : globalData.tailorLocal,
                    name: 'file',
                    formData: {
                      token: globalData.uploadInfo.uploadToken,
                      key: globalData.uploadInfo.fileName
                    },
                    success: function success(res) {
                      var data = JSON.parse(res.data);
                      globalData.pictureOnline = data.key;
                      console.log('uploadPhoto end');
                      resolve();
                      // self.globalData.tailorOnline = data.key;
                      // wx.redirectTo({
                      //   url: '/pages/result/result',
                      //   success: function (res) {
                      //     console.log('success')
                      //     // success
                      //   },
                      //   fail: function (res) {
                      //     console.log(res)
                      //     // fail
                      //   },
                      //   complete: function () {
                      //     console.log('complete')
                      //     // complete
                      //   }
                      // })
                    }
                  });
                }));

              case 4:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function uploadPhoto() {
        return _ref14.apply(this, arguments);
      }

      return uploadPhoto;
    }()
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, undefined));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsInRhYkJhciIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwiYm9uZ21pQVBJIiwiYXBwaWQiLCJzZWNyZXQiLCJjb2RlIiwiYm1Vc2VyIiwibWVuc3RydWF0aW9uUGVyaW9kRmxhZyIsInVzZXJJbmZvIiwicGljdHVyZUxvY2FsIiwicGljdHVyZU9ubGluZSIsInRhaWxvckxvY2FsIiwidGFpbG9yT25saW5lIiwicmVzdWx0IiwicWluaXVVcGxvYWRVcmwiLCJkb3dubG9hZFVybCIsImh0dHBzIiwidXBsb2FkSW5mbyIsInRvZGF5QmVnaW4iLCJyZWZyZXNoIiwicmVjb3Jkc0FsbCIsInJlY29yZHNUb2RheVNob3ciLCJyZWNvcmRzVG9kYXkiLCJkYXRlUGlja2VyIiwidXNlIiwic2VsZiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY29uc29sZSIsImxvZyIsInd4Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY29uZmlybUNvbG9yIiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJvcGVuU2V0dGluZyIsImZhaWwiLCJjb21wbGV0ZSIsImNhbmNlbCIsImdldFVzZXJJbmZvIiwibG9naW4iLCJsb2dpbldYIiwicmVxdWVzdCIsInVybCIsImRhdGEiLCJhcHBfaWQiLCJ1c2VySWQiLCJhY2Nlc3NUb2tlbiIsImlkIiwibmlja25hbWUiLCJuaWNrTmFtZSIsImdlbmRlciIsImhlYWRlciIsImF1dGhvcml6YXRpb24iLCJtZXRob2QiLCJhY2Nlc3NfdG9rZW4iLCJPYmplY3QiLCJhc3NpZ24iLCJzZWxmTWVtYmVySWQiLCJhcHBfZmxhZyIsInJlY29yZHNMaXN0Iiwib3Z1bGF0aW9uVGVzdFJlc3VsdExpc3QiLCJkYXRlIiwibWFwIiwiaXRlbSIsImluZGV4IiwidGltZSIsIkRhdGUiLCJ0aW1lc3RhbXAiLCJnZXRNb250aCIsImdldERhdGUiLCJkYXRlRmxhZyIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsInR5cGUiLCJyZXN1bHRUeXBlIiwiY2xhc3NuYW1lIiwibGluZVRhZyIsInRpcCIsInRyaWdnZXJUeXBlIiwiTWF0aCIsImZsb29yIiwiZ2V0VGltZSIsImgiLCJtIiwicyIsImdldFNlY29uZHMiLCJpbnRlcnZhbCIsImRldGFpbCIsIkpTT04iLCJwYXJzZSIsInJlY29yZHMiLCJmaWx0ZXIiLCJtZW5zdHJ1YXRpb25QZXJpb2QiLCJjaG9vc2VJbWFnZSIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwidGVtcEZpbGVQYXRocyIsInVwbG9hZEZpbGUiLCJmaWxlUGF0aCIsIm5hbWUiLCJmb3JtRGF0YSIsInRva2VuIiwidXBsb2FkVG9rZW4iLCJrZXkiLCJmaWxlTmFtZSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBcUVFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUFsRWZBLE1Ba0VlLEdBbEVOO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsY0FGSyxFQUdMLGFBSEssRUFJTCxjQUpLLENBREE7QUFPUEMsY0FBUTtBQUNOLGlCQUFTLFNBREg7QUFFTix5QkFBaUIsU0FGWDtBQUdOLHVCQUFlLE9BSFQ7QUFJTiwyQkFBbUIsU0FKYjtBQUtOLGdCQUFRLENBQ047QUFDRSw4QkFBb0IsNEJBRHRCO0FBRUUsc0JBQVksc0JBRmQ7QUFHRSxzQkFBWSxhQUhkO0FBSUUsa0JBQVE7QUFKVixTQURNLEVBT047QUFDRSw4QkFBb0IsNEJBRHRCO0FBRUUsc0JBQVksc0JBRmQ7QUFHRSxzQkFBWSxhQUhkO0FBSUUsa0JBQVE7QUFKVixTQVBNLEVBYU47QUFDRSw4QkFBb0IsMkJBRHRCO0FBRUUsc0JBQVkscUJBRmQ7QUFHRSxz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QUFTVHJCLDZCQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEJaLDJCQUFLeEIsVUFBTCxDQUFnQmdCLFVBQWhCLEdBQTZCb0IsSUFBSVcsSUFBakM7QUFDQW5CLDhCQUFRQyxHQUFSLENBQVksbUJBQVo7QUFDQUg7QUFDRDtBQWJRLG1CQUFYO0FBZUgsaUJBakJNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkRGLG9CLEdBQU8sSTtBQUNQeEIsMEIsR0FBYXdCLEtBQUt4QixVO0FBQ2xCSyxzQixHQUFTTCxXQUFXSyxNO21EQUNuQixJQUFJb0IsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsMEJBQVFDLEdBQVIsQ0FBWSxtQkFBWjtBQUNBQyxxQkFBR3dFLFVBQUgsQ0FBYztBQUNaeEQsOEJBQVE5QyxXQUFXYSxjQURQO0FBRVowRiw4QkFBVXZHLFdBQVdRLFlBRlQ7QUFHWjtBQUNBZ0csMEJBQU0sTUFKTTtBQUtaQyw4QkFBVTtBQUNSQyw2QkFBTzFHLFdBQVdnQixVQUFYLENBQXNCMkYsV0FEckI7QUFFUkMsMkJBQUs1RyxXQUFXZ0IsVUFBWCxDQUFzQjZGO0FBRm5CLHFCQUxFO0FBU1oxRSw2QkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCLDBCQUFNVyxPQUFPNkMsS0FBS0MsS0FBTCxDQUFXekQsSUFBSVcsSUFBZixDQUFiO0FBQ0EvQyxpQ0FBV1MsYUFBWCxHQUEyQnNDLEtBQUs2RCxHQUFoQztBQUNBaEYsOEJBQVFDLEdBQVIsQ0FBWSxpQkFBWjtBQUNBSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7QUE5QlcsbUJBQWQ7QUFnQ0QsaUJBbENNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF6YWtCLGVBQUtvRixHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gICAgY29uZmlnID0ge1xuICAgICAgcGFnZXM6IFtcbiAgICAgICAgJ3BhZ2VzL3RvZGF5JyxcbiAgICAgICAgJ3BhZ2VzL3JlY29yZCcsXG4gICAgICAgICdwYWdlcy9ndWlkZScsXG4gICAgICAgICdwYWdlcy9yZXN1bHQnXG4gICAgICBdLFxuICAgICAgdGFiQmFyOiB7XG4gICAgICAgIFwiY29sb3JcIjogXCIjQTBBMEEwXCIsXG4gICAgICAgIFwic2VsZWN0ZWRDb2xvclwiOiBcIiNFNTZDQUNcIixcbiAgICAgICAgXCJib3JkZXJTdHlsZVwiOiBcImJsYWNrXCIsXG4gICAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI0ZCRkJGQlwiLFxuICAgICAgICBcImxpc3RcIjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImltYWdlcy9idG5fZ3VpZGVfcHJlc3MucG5nXCIsXG4gICAgICAgICAgICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL2J0bl9ndWlkZS5wbmdcIixcbiAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9ndWlkZVwiLFxuICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5L2/55So5oyH5a+8XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImltYWdlcy9idG5fdG9kYXlfcHJlc3MucG5nXCIsXG4gICAgICAgICAgICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL2J0bl90b2RheS5wbmdcIixcbiAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy90b2RheVwiLFxuICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5LuK5pel5L+h5oGvXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImltYWdlcy9idG5fZWRpdF9wcmVzcy5wbmdcIixcbiAgICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJpbWFnZXMvYnRuX2VkaXQucG5nXCIsXG4gICAgICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvcmVjb3JkXCIsXG4gICAgICAgICAgICBcInRleHRcIjogXCLmiJHnmoTorrDlvZVcIlxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHdpbmRvdzoge1xuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snXG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2xvYmFsRGF0YSA9IHtcbiAgICAgIGJvbmdtaUFQSTogJ2h0dHBzOi8vYXBpLXN0YWdpbmcuYm9uZ21pLmNvbS92MScsXG4gICAgICBhcHBpZDogJ3d4N2U3MWQ4YzgwN2ZjMGY1OCcsXG4gICAgICBzZWNyZXQ6ICdhNzZjOWY5NjM4ZjAyYzliMTlkMDQ4YTZmY2NlZmNhMScsXG4gICAgICBjb2RlOiBudWxsLFxuICAgICAgYm1Vc2VyOiBudWxsLFxuICAgICAgbWVuc3RydWF0aW9uUGVyaW9kRmxhZzogZmFsc2UsXG4gICAgICB1c2VySW5mbzogbnVsbCxcbiAgICAgIHBpY3R1cmVMb2NhbDogbnVsbCxcbiAgICAgIHBpY3R1cmVPbmxpbmU6IG51bGwsXG4gICAgICB0YWlsb3JMb2NhbDogbnVsbCxcbiAgICAgIHRhaWxvck9ubGluZTogbnVsbCxcbiAgICAgIHJlc3VsdDogbnVsbCxcbiAgICAgIHFpbml1VXBsb2FkVXJsOiAnaHR0cHM6Ly91cC5xYm94Lm1lJyxcbiAgICAgIGRvd25sb2FkVXJsOiAnaHR0cHM6Ly9pbWcuYm9uZ21pLmNvbScsXG4gICAgICBodHRwczogdHJ1ZSxcbiAgICAgIHVwbG9hZEluZm86IG51bGwsXG4gICAgICB0b2RheUJlZ2luOiAwLFxuICAgICAgcmVmcmVzaDogZmFsc2UsXG4gICAgICByZWNvcmRzQWxsOiBudWxsLFxuICAgICAgcmVjb3Jkc1RvZGF5U2hvdzogbnVsbCxcbiAgICAgIHJlY29yZHNUb2RheTogbnVsbCxcbiAgICAgIGRhdGVQaWNrZXI6IFtdXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgc3VwZXIoKVxuICAgICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIH1cblxuICAgIG9uTGF1bmNoKCkge1xuICAgIH1cblxuICAgIGFzeW5jIHRyeUF1dGhBZ2FpbiAoKSB7XG4gICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgY29uc3QgYm1Vc2VyID0gc2VsZi5nbG9iYWxEYXRhLmJtVXNlclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RyeUF1dGhBZ2FpbiBzdGFydCcpXG4gICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmmK/lkKbopoHmiZPlvIDorr7nva7pobXpnaLph43mlrDmjojmnYMnLFxuICAgICAgICAgIGNvbnRlbnQ6ICfpnIDopoHojrflj5bmgqjnmoTlhazlvIDkv6Hmga8o5pi156ew44CB5aS05YOP562JKScsXG4gICAgICAgICAgY29uZmlybUNvbG9yOiAnI0U1NkNBQycsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKVxuICAgICAgICAgICAgICB3eC5vcGVuU2V0dGluZyh7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyeUF1dGhBZ2FpbiBzdWNjZXNzJylcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ3RydWUnKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnZmFsc2UnKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpXG4gICAgICAgICAgICAgIHJlc29sdmUoJ2ZhbHNlJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIGFzeW5jIGdldFVzZXJJbmZvKCkge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnZ2V0V1hVc2VySW5mbyBzdGFydCcpXG4gICAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgICBzdWNjZXNzIChyZXMpIHtcbiAgICAgICAgICAgIHNlbGYuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldFdYVXNlckluZm8gc3VjY2VzcycpXG4gICAgICAgICAgICByZXNvbHZlKCd0cnVlJylcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWwgKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldFdYVXNlckluZm8gZmFpbCcpXG4gICAgICAgICAgICByZXNvbHZlKCdmYWxzZScpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyBsb2dpbldYICgpIHtcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb25zb2xlLmxvZygnbG9naW4gc3RhcnQnKVxuICAgICAgICB3eC5sb2dpbih7XG4gICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbG9naW4gc3VjY2VzcycpXG4gICAgICAgICAgICAgIC8vIOWPkemAgSByZXMuY29kZSDliLDlkI7lj7DmjaLlj5Ygb3BlbklkLCBzZXNzaW9uS2V5LCB1bmlvbklkXG4gICAgICAgICAgICAgIHNlbGYuZ2xvYmFsRGF0YS5jb2RlID0gcmVzLmNvZGVcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmNvZGUpXG4gICAgICAgICAgICAgIHJlc29sdmUoJ3RydWUnKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ2luIGZhaWwnKVxuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn6I635Y+W55So5oi355m75b2V5oCB5aSx6LSlJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn6YeN5paw55m75b2V77yfJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dpbldYKClcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdmYWxzZScpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0Qk1Ub2tlbiAoKSB7XG4gICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgY29uc3QgZ2xvYmFsRGF0YSA9IHNlbGYuZ2xvYmFsRGF0YVxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dldEJNVG9rZW4gc3RhcnQnKVxuICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6IGAke2dsb2JhbERhdGEuYm9uZ21pQVBJfS93ZWNoYXRfbXAvYWNjZXNzX3Rva2VuYCxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBhcHBfaWQ6IGdsb2JhbERhdGEuYXBwaWQsXG4gICAgICAgICAgICBjb2RlOiBnbG9iYWxEYXRhLmNvZGVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRCTVRva2VuIHN1Y2Nlc3MnKVxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICAgICAgICAgICBzZWxmLmdsb2JhbERhdGEuYm1Vc2VyID0gcmVzLmRhdGE7XG4gICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRCTVRva2VuIGZhaWwnKVxuICAgICAgICAgICAgcmVqZWN0KClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIGFzeW5jIHVwZGF0ZUJNVXNlciAoKSB7XG4gICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgY29uc3QgZ2xvYmFsRGF0YSA9IHNlbGYuZ2xvYmFsRGF0YVxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZUJNVXNlciBzdGFydCcpXG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogYCR7Z2xvYmFsRGF0YS5ib25nbWlBUEl9L3VzZXIvJHtnbG9iYWxEYXRhLmJtVXNlci51c2VySWR9P2FjY2Vzc190b2tlbj0ke2dsb2JhbERhdGEuYm1Vc2VyLmFjY2Vzc1Rva2VufWAsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgaWQ6IGdsb2JhbERhdGEuYm1Vc2VyLnVzZXJJZCxcbiAgICAgICAgICAgIG5pY2tuYW1lOiBnbG9iYWxEYXRhLnVzZXJJbmZvLm5pY2tOYW1lLFxuICAgICAgICAgICAgZ2VuZGVyOiBnbG9iYWxEYXRhLnVzZXJJbmZvLmdlbmRlciA9PSAyID8gJ0ZlbWFsZScgOiAnTWFsZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgYXV0aG9yaXphdGlvbjogJ0xvbGx5cG9wLVdlaXhpbi1NaW5pLVByb2dyYW0nXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGVCTVVzZXIgc3VjY2VzcycpXG4gICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIGFzeW5jIGdldEJNVXNlckluZm8gKCkge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgIGNvbnN0IGdsb2JhbERhdGEgPSBzZWxmLmdsb2JhbERhdGFcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXRCTVVzZXJJbmZvIHN0YXJ0JylcbiAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBgJHtnbG9iYWxEYXRhLmJvbmdtaUFQSX0vdXNlci8ke2dsb2JhbERhdGEuYm1Vc2VyLnVzZXJJZH1gLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGFjY2Vzc190b2tlbjogZ2xvYmFsRGF0YS5ibVVzZXIuYWNjZXNzVG9rZW5cbiAgICAgICAgICB9LFxuICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgYXV0aG9yaXphdGlvbjogJ0xvbGx5cG9wLVdlaXhpbi1NaW5pLVByb2dyYW0nXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0Qk1Vc2VySW5mbyBzdWNjZXNzJylcbiAgICAgICAgICAgIHNlbGYuZ2xvYmFsRGF0YS5ibVVzZXIgPSBPYmplY3QuYXNzaWduKGdsb2JhbERhdGEuYm1Vc2VyLCByZXMuZGF0YSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGdsb2JhbERhdGEpXG4gICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIGFzeW5jIGdldFRpcHMgKCkge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgIGNvbnN0IGdsb2JhbERhdGEgPSBzZWxmLmdsb2JhbERhdGFcbiAgICAgIGNvbnN0IGJtVXNlciA9IGdsb2JhbERhdGEuYm1Vc2VyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZ2V0VGlwcycpXG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogYCR7Z2xvYmFsRGF0YS5ib25nbWlBUEl9L3dlY2hhdF9tcC8ke2JtVXNlci51c2VySWR9LyR7Ym1Vc2VyLnNlbGZNZW1iZXJJZH0vb3Z1bGF0aW9uX3Rlc3RgLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGFwcF9mbGFnOiAxLFxuICAgICAgICAgICAgYWNjZXNzX3Rva2VuOiBibVVzZXIuYWNjZXNzVG9rZW5cbiAgICAgICAgICB9LFxuICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgYXV0aG9yaXphdGlvbjogJ0xvbGx5cG9wLVdlaXhpbi1NaW5pLVByb2dyYW0nXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0VGlwcyBzdWNjZXNzJylcbiAgICAgICAgICAgIHNlbGYuZ2xvYmFsRGF0YS5yZWNvcmRzQWxsID0gcmVzLmRhdGE7XG4gICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlamVjdCgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyBjb252ZXJ0UmVjb3JkICgpIHtcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY29udmVydFJlY29yZCBzdGFydCcpXG4gICAgICAgIGNvbnN0IHJlY29yZHNBbGwgPSBzZWxmLmdsb2JhbERhdGEucmVjb3Jkc0FsbFxuICAgICAgICBjb25zdCByZWNvcmRzTGlzdCA9IHJlY29yZHNBbGwub3Z1bGF0aW9uVGVzdFJlc3VsdExpc3RcbiAgICAgICAgbGV0IGRhdGUgPSAnJ1xuICAgICAgICByZWNvcmRzTGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKGl0ZW0udGltZXN0YW1wICogMTAwMClcbiAgICAgICAgICBpdGVtLmRhdGUgPSBgJHt0aW1lLmdldE1vbnRoKCkgKyAxfeaciCR7dGltZS5nZXREYXRlKCl95pelYFxuICAgICAgICAgIGlmIChpdGVtLmRhdGUgPT0gZGF0ZSkge1xuICAgICAgICAgICAgaXRlbS5kYXRlRmxhZyA9IGZhbHNlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uZGF0ZUZsYWcgPSB0cnVlXG4gICAgICAgICAgICBkYXRlID0gaXRlbS5kYXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGl0ZW0udGltZSA9IGAke3RpbWUuZ2V0SG91cnMoKSA8IDEwID8gJzAnICsgdGltZS5nZXRIb3VycygpIDogdGltZS5nZXRIb3VycygpfToke3RpbWUuZ2V0TWludXRlcygpIDwgMTAgPyAnMCcgKyB0aW1lLmdldE1pbnV0ZXMoKSA6IHRpbWUuZ2V0TWludXRlcygpfWBcbiAgICAgICAgICBpdGVtLnR5cGUgPSBpdGVtLnJlc3VsdFR5cGUgPT0gMSA/ICfpmLTmgKcnIDogKGl0ZW0ucmVzdWx0VHlwZSA9PSAyID8gJ+W8semYsycgOiAn5by66ZizJylcbiAgICAgICAgICBpdGVtLmNsYXNzbmFtZSA9IGl0ZW0ucmVzdWx0VHlwZSA9PSAxID8gJ3BlYWsnIDogKGl0ZW0ucmVzdWx0VHlwZSA9PSAyID8gJ2xvdycgOiAnaGlnaCcpXG4gICAgICAgICAgaXRlbS5saW5lVGFnID0gdHJ1ZVxuICAgICAgICAgIGl0ZW0udGlwID0gZmFsc2VcbiAgICAgICAgICBpZiAoaW5kZXggIT0gMCAmJiBpdGVtLmRhdGVGbGFnKSB7XG4gICAgICAgICAgICByZWNvcmRzTGlzdFtpbmRleCAtIDFdLmxpbmVUYWcgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaW5kZXggIT0gMCAmJiBpdGVtLnRyaWdnZXJUeXBlID09IDMpIHtcbiAgICAgICAgICAgIHJlY29yZHNMaXN0W2luZGV4IC0gMV0udGlwID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgY29uc29sZS5sb2cocmVjb3Jkc0xpc3QpXG4gICAgICAgIHNlbGYuZ2xvYmFsRGF0YS5yZWNvcmRzQWxsID0ge1xuICAgICAgICAgIG92dWxhdGlvblRlc3RSZXN1bHRMaXN0OiByZWNvcmRzTGlzdCxcbiAgICAgICAgICB0cmlnZ2VyVHlwZTogcmVjb3Jkc0FsbC50cmlnZ2VyVHlwZVxuICAgICAgICB9O1xuICAgICAgICBjb25zb2xlLmxvZygnY29udmVydFJlY29yZCBlbmQnKVxuICAgICAgICBjb25zb2xlLmxvZyhzZWxmLmdsb2JhbERhdGEucmVjb3Jkc0FsbClcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGFzeW5jIGdldFJlY29yZHMgKCkge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgIGNvbnN0IGJtVXNlciA9IHNlbGYuZ2xvYmFsRGF0YS5ibVVzZXJcblxuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IE1hdGguZmxvb3IoZGF0ZS5nZXRUaW1lKCkgLyAxMDAwKVxuICAgICAgY29uc3QgaCA9IGRhdGUuZ2V0SG91cnMoKVxuICAgICAgY29uc3QgbSA9IGRhdGUuZ2V0TWludXRlcygpXG4gICAgICBjb25zdCBzID0gZGF0ZS5nZXRTZWNvbmRzKClcbiAgICAgIGNvbnN0IGludGVydmFsID0gaCAqIDM2MDAgKyBtICogNjAgKyBzXG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXRSZWNvcmRzIHN0YXJ0JylcbiAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBgJHtzZWxmLmdsb2JhbERhdGEuYm9uZ21pQVBJfS9ib2R5X3N0YXR1cy8ke2JtVXNlci51c2VySWR9LyR7Ym1Vc2VyLnNlbGZNZW1iZXJJZH0vcmVwb3J0LzUxMi8ke3RpbWVzdGFtcH0vJHtpbnRlcnZhbH1gLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGFwcF9mbGFnOiAxLFxuICAgICAgICAgICAgYWNjZXNzX3Rva2VuOiBibVVzZXIuYWNjZXNzVG9rZW5cbiAgICAgICAgICB9LFxuICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgYXV0aG9yaXphdGlvbjogJ0xvbGx5cG9wLVdlaXhpbi1NaW5pLVByb2dyYW0nXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0UmVjb3JkcyBzdWNjZXNzJylcbiAgICAgICAgICAgIGNvbnN0IHJlY29yZHNUb2RheSA9IHJlcy5kYXRhWzBdXG4gICAgICAgICAgICBpZiAocmVjb3Jkc1RvZGF5KSB7XG4gICAgICAgICAgICAgIHJlY29yZHNUb2RheS5kZXRhaWwgPSBKU09OLnBhcnNlKHJlY29yZHNUb2RheS5kZXRhaWwpXG4gICAgICAgICAgICAgIGlmICghcmVjb3Jkc1RvZGF5LmRldGFpbC5tYXApIHtcbiAgICAgICAgICAgICAgICByZWNvcmRzVG9kYXkuZGV0YWlsID0gW3JlY29yZHNUb2RheS5kZXRhaWxdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2VsZi5nbG9iYWxEYXRhLnJlY29yZHNUb2RheSA9IHJlY29yZHNUb2RheVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0UmVjb3JkcyBmYWlsJylcbiAgICAgICAgICAgIHJlamVjdCgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyBnZXRUb2RheUxpc3QgKCkge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXRUb2RheUxpc3Qgc3RhcnQnKVxuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgICBjb25zdCBoID0gZGF0ZS5nZXRIb3VycygpXG4gICAgICAgIGNvbnN0IG0gPSBkYXRlLmdldE1pbnV0ZXMoKVxuICAgICAgICBjb25zdCBzID0gZGF0ZS5nZXRTZWNvbmRzKClcbiAgICAgICAgY29uc3QgdGltZXN0YW1wID0gTWF0aC5mbG9vcihkYXRlLmdldFRpbWUoKSAvIDEwMDApIC0gKGggKiAzNjAwICsgbSAqIDYwICsgcylcbiAgICAgICAgY29uc3QgcmVjb3JkcyA9IHNlbGYuZ2xvYmFsRGF0YS5yZWNvcmRzQWxsLm92dWxhdGlvblRlc3RSZXN1bHRMaXN0LmZpbHRlcigoaXRlbSkgPT4gKGl0ZW0udGltZXN0YW1wID49IHRpbWVzdGFtcCkpXG4gICAgICAgIHNlbGYuZ2xvYmFsRGF0YS5yZWNvcmRzVG9kYXlTaG93ID0gcmVjb3Jkc1xuICAgICAgICByZXNvbHZlKClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgYXN5bmMgc2V0VHJpZ2dlclR5cGUgKCkge1xuICAgICAgY29uc3QgZ2xvYmFsRGF0YSA9IHRoaXMuZ2xvYmFsRGF0YVxuICAgICAgbGV0IHRyaWdnZXJUeXBlID0gJydcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXRUcmlnZ2VyVHlwZSBzdGFydCcpXG4gICAgICAgIGNvbnN0IG1lbnN0cnVhdGlvblBlcmlvZCA9IGdsb2JhbERhdGEuYm1Vc2VyLm1lbnN0cnVhdGlvblBlcmlvZFxuICAgICAgICB0cmlnZ2VyVHlwZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyaWdnZXJUeXBlID0gZ2xvYmFsRGF0YS5yZWNvcmRzQWxsLnRyaWdnZXJUeXBlXG4gICAgICAgICAgICBzd2l0Y2ggKHRyaWdnZXJUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGlmIChtZW5zdHJ1YXRpb25QZXJpb2QpIHtcbiAgICAgICAgICAgICAgICBpZiAobWVuc3RydWF0aW9uUGVyaW9kIDwgMjEpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtZW5zdHJ1YXRpb25QZXJpb2QgPiA0MSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIDNcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gNVxuICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gNFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnc2V0VHJpZ2dlclR5cGUgZW5kJylcbiAgICAgICAgcmVzb2x2ZSh0cmlnZ2VyVHlwZSgpKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyB0YWtlUGhvdG8gKCkge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0YWtlUGhvdG8gc3RhcnQnKVxuICAgICAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgICAgIGNvdW50OiAxLFxuICAgICAgICAgICAgc2l6ZVR5cGU6IFsnY29tcHJlc3NlZCddLFxuICAgICAgICAgICAgc291cmNlVHlwZTogWydjYW1lcmEnXSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgc2VsZi5nbG9iYWxEYXRhLnBpY3R1cmVMb2NhbCA9IHJlcy50ZW1wRmlsZVBhdGhzWzBdXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0YWtlUGhvdG8gZW5kJylcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0UWluaXVUb2tlbiAoKSB7XG4gICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgY29uc3QgYm1Vc2VyID0gc2VsZi5nbG9iYWxEYXRhLmJtVXNlcjtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXRRaW5pdVRva2VuIHN0YXJ0JylcbiAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogYCR7c2VsZi5nbG9iYWxEYXRhLmJvbmdtaUFQSX0vdXNlci8ke2JtVXNlci51c2VySWR9L3VwbG9hZF9pbmZvYCxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgdHlwZTogMixcbiAgICAgICAgICAgICAgYWNjZXNzX3Rva2VuOiBibVVzZXIuYWNjZXNzVG9rZW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgYXV0aG9yaXphdGlvbjogJ0xvbGx5cG9wLVdlaXhpbi1NaW5pLVByb2dyYW0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICBzZWxmLmdsb2JhbERhdGEudXBsb2FkSW5mbyA9IHJlcy5kYXRhXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRRaW5pdVRva2VuIGVuZCcpXG4gICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIGFzeW5jIHVwbG9hZFBob3RvICgpIHtcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICBjb25zdCBnbG9iYWxEYXRhID0gc2VsZi5nbG9iYWxEYXRhXG4gICAgICBjb25zdCBibVVzZXIgPSBnbG9iYWxEYXRhLmJtVXNlclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3VwbG9hZFBob3RvIHN0YXJ0JylcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOiBgJHtnbG9iYWxEYXRhLnFpbml1VXBsb2FkVXJsfWAsXG4gICAgICAgICAgZmlsZVBhdGg6IGdsb2JhbERhdGEucGljdHVyZUxvY2FsLFxuICAgICAgICAgIC8vIGZpbGVQYXRoOiBwaWN0dXJlVHlwZSA9PSAxID8gZ2xvYmFsRGF0YS5waWN0dXJlTG9jYWwgOiBnbG9iYWxEYXRhLnRhaWxvckxvY2FsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBmb3JtRGF0YToge1xuICAgICAgICAgICAgdG9rZW46IGdsb2JhbERhdGEudXBsb2FkSW5mby51cGxvYWRUb2tlbixcbiAgICAgICAgICAgIGtleTogZ2xvYmFsRGF0YS51cGxvYWRJbmZvLmZpbGVOYW1lXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBnbG9iYWxEYXRhLnBpY3R1cmVPbmxpbmUgPSBkYXRhLmtleVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3VwbG9hZFBob3RvIGVuZCcpXG4gICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgIC8vIHNlbGYuZ2xvYmFsRGF0YS50YWlsb3JPbmxpbmUgPSBkYXRhLmtleTtcbiAgICAgICAgICAgIC8vIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgLy8gICB1cmw6ICcvcGFnZXMvcmVzdWx0L3Jlc3VsdCcsXG4gICAgICAgICAgICAvLyAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnc3VjY2VzcycpXG4gICAgICAgICAgICAvLyAgICAgLy8gc3VjY2Vzc1xuICAgICAgICAgICAgLy8gICB9LFxuICAgICAgICAgICAgLy8gICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgLy8gICAgIC8vIGZhaWxcbiAgICAgICAgICAgIC8vICAgfSxcbiAgICAgICAgICAgIC8vICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnY29tcGxldGUnKVxuICAgICAgICAgICAgLy8gICAgIC8vIGNvbXBsZXRlXG4gICAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgfVxuIl19