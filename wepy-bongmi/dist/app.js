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
      pages: ['pages/today', 'pages/result', 'pages/guide', 'pages/record', 'pages/index'],
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
                      // self.getQiniuToken(1)
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
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(pictureType) {
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
                    filePath: pictureType == 1 ? globalData.pictureLocal : globalData.tailorLocal,
                    name: 'file',
                    formData: {
                      token: globalData.uploadInfo.uploadToken,
                      key: globalData.uploadInfo.fileName
                    },
                    success: function success(res) {
                      var data = JSON.parse(res.data);
                      console.log(data);
                      console.log('uploadPhoto end');
                      resolve(data);
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

      function uploadPhoto(_x) {
        return _ref14.apply(this, arguments);
      }

      return uploadPhoto;
    }()
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, undefined));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsInRhYkJhciIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwiYm9uZ21pQVBJIiwiYXBwaWQiLCJzZWNyZXQiLCJjb2RlIiwiYm1Vc2VyIiwibWVuc3RydWF0aW9uUGVyaW9kRmxhZyIsInVzZXJJbmZvIiwicGljdHVyZUxvY2FsIiwicGljdHVyZU9ubGluZSIsInRhaWxvckxvY2FsIiwidGFpbG9yT25saW5lIiwicmVzdWx0IiwicWluaXVVcGxvYWRVcmwiLCJkb3dubG9hZFVybCIsImh0dHBzIiwidXBsb2FkSW5mbyIsInRvZGF5QmVnaW4iLCJyZWZyZXNoIiwicmVjb3Jkc0FsbCIsInJlY29yZHNUb2RheVNob3ciLCJyZWNvcmRzVG9kYXkiLCJkYXRlUGlja2VyIiwidXNlIiwic2VsZiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY29uc29sZSIsImxvZyIsInd4Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY29uZmlybUNvbG9yIiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJvcGVuU2V0dGluZyIsImZhaWwiLCJjb21wbGV0ZSIsImNhbmNlbCIsImdldFVzZXJJbmZvIiwibG9naW4iLCJsb2dpbldYIiwicmVxdWVzdCIsInVybCIsImRhdGEiLCJhcHBfaWQiLCJ1c2VySWQiLCJhY2Nlc3NUb2tlbiIsImlkIiwibmlja25hbWUiLCJuaWNrTmFtZSIsImdlbmRlciIsImhlYWRlciIsImF1dGhvcml6YXRpb24iLCJtZXRob2QiLCJhY2Nlc3NfdG9rZW4iLCJPYmplY3QiLCJhc3NpZ24iLCJzZWxmTWVtYmVySWQiLCJhcHBfZmxhZyIsInJlY29yZHNMaXN0Iiwib3Z1bGF0aW9uVGVzdFJlc3VsdExpc3QiLCJkYXRlIiwibWFwIiwiaXRlbSIsImluZGV4IiwidGltZSIsIkRhdGUiLCJ0aW1lc3RhbXAiLCJnZXRNb250aCIsImdldERhdGUiLCJkYXRlRmxhZyIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsInR5cGUiLCJyZXN1bHRUeXBlIiwiY2xhc3NuYW1lIiwibGluZVRhZyIsInRpcCIsInRyaWdnZXJUeXBlIiwiTWF0aCIsImZsb29yIiwiZ2V0VGltZSIsImgiLCJtIiwicyIsImdldFNlY29uZHMiLCJpbnRlcnZhbCIsImRldGFpbCIsIkpTT04iLCJwYXJzZSIsInJlY29yZHMiLCJmaWx0ZXIiLCJtZW5zdHJ1YXRpb25QZXJpb2QiLCJjaG9vc2VJbWFnZSIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwidGVtcEZpbGVQYXRocyIsInBpY3R1cmVUeXBlIiwidXBsb2FkRmlsZSIsImZpbGVQYXRoIiwibmFtZSIsImZvcm1EYXRhIiwidG9rZW4iLCJ1cGxvYWRUb2tlbiIsImtleSIsImZpbGVOYW1lIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUFzRUUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQW5FZkEsTUFtRWUsR0FuRU47QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxjQUZLLEVBR0wsYUFISyxFQUlMLGNBSkssRUFLTCxhQUxLLENBREE7QUFRUEMsY0FBUTtBQUNOLGlCQUFTLFNBREg7QUFFTix5QkFBaUIsU0FGWDtBQUdOLHVCQUFlLE9BSFQ7QUFJTiwyQkFBbUIsU0FKYjtBQUtOLGdCQUFRLENBQ047QUFDRSw4QkFBb0IsNEJBRHRCO0FBRUUsc0JBQVksc0JBRmQ7QUFHRSxzQkFBWSxhQUhkO0FBSUUsa0JBQVE7QUFKVixTQURNLEVBT047QUFDRSw4QkFBb0IsNEJBRHRCO0FBRUUsc0JBQVksc0JBRmQ7QUFHRSxzQkFBWSxhQUhkO0FBSUUsa0JBQVE7QUFKVixTQVBNLEVBYU47QUFDRSw4QkFBb0IsMkJBRHRC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YXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBwYWdlczogW1xuICAgICAgICAncGFnZXMvdG9kYXknLFxuICAgICAgICAncGFnZXMvcmVzdWx0JyxcbiAgICAgICAgJ3BhZ2VzL2d1aWRlJyxcbiAgICAgICAgJ3BhZ2VzL3JlY29yZCcsXG4gICAgICAgICdwYWdlcy9pbmRleCdcbiAgICAgIF0sXG4gICAgICB0YWJCYXI6IHtcbiAgICAgICAgXCJjb2xvclwiOiBcIiNBMEEwQTBcIixcbiAgICAgICAgXCJzZWxlY3RlZENvbG9yXCI6IFwiI0U1NkNBQ1wiLFxuICAgICAgICBcImJvcmRlclN0eWxlXCI6IFwiYmxhY2tcIixcbiAgICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjRkJGQkZCXCIsXG4gICAgICAgIFwibGlzdFwiOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2J0bl9ndWlkZV9wcmVzcy5wbmdcIixcbiAgICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJpbWFnZXMvYnRuX2d1aWRlLnBuZ1wiLFxuICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL2d1aWRlXCIsXG4gICAgICAgICAgICBcInRleHRcIjogXCLkvb/nlKjmjIflr7xcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2J0bl90b2RheV9wcmVzcy5wbmdcIixcbiAgICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJpbWFnZXMvYnRuX3RvZGF5LnBuZ1wiLFxuICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL3RvZGF5XCIsXG4gICAgICAgICAgICBcInRleHRcIjogXCLku4rml6Xkv6Hmga9cIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2J0bl9lZGl0X3ByZXNzLnBuZ1wiLFxuICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcImltYWdlcy9idG5fZWRpdC5wbmdcIixcbiAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9yZWNvcmRcIixcbiAgICAgICAgICAgIFwidGV4dFwiOiBcIuaIkeeahOiusOW9lVwiXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgd2luZG93OiB7XG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXG4gICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnbG9iYWxEYXRhID0ge1xuICAgICAgYm9uZ21pQVBJOiAnaHR0cHM6Ly9hcGktc3RhZ2luZy5ib25nbWkuY29tL3YxJyxcbiAgICAgIGFwcGlkOiAnd3g3ZTcxZDhjODA3ZmMwZjU4JyxcbiAgICAgIHNlY3JldDogJ2E3NmM5Zjk2MzhmMDJjOWIxOWQwNDhhNmZjY2VmY2ExJyxcbiAgICAgIGNvZGU6IG51bGwsXG4gICAgICBibVVzZXI6IG51bGwsXG4gICAgICBtZW5zdHJ1YXRpb25QZXJpb2RGbGFnOiBmYWxzZSxcbiAgICAgIHVzZXJJbmZvOiBudWxsLFxuICAgICAgcGljdHVyZUxvY2FsOiBudWxsLFxuICAgICAgcGljdHVyZU9ubGluZTogbnVsbCxcbiAgICAgIHRhaWxvckxvY2FsOiBudWxsLFxuICAgICAgdGFpbG9yT25saW5lOiBudWxsLFxuICAgICAgcmVzdWx0OiBudWxsLFxuICAgICAgcWluaXVVcGxvYWRVcmw6ICdodHRwczovL3VwLnFib3gubWUnLFxuICAgICAgZG93bmxvYWRVcmw6ICdodHRwczovL2ltZy5ib25nbWkuY29tJyxcbiAgICAgIGh0dHBzOiB0cnVlLFxuICAgICAgdXBsb2FkSW5mbzogbnVsbCxcbiAgICAgIHRvZGF5QmVnaW46IDAsXG4gICAgICByZWZyZXNoOiBmYWxzZSxcbiAgICAgIHJlY29yZHNBbGw6IG51bGwsXG4gICAgICByZWNvcmRzVG9kYXlTaG93OiBudWxsLFxuICAgICAgcmVjb3Jkc1RvZGF5OiBudWxsLFxuICAgICAgZGF0ZVBpY2tlcjogW11cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICBzdXBlcigpXG4gICAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gICAgfVxuXG4gICAgb25MYXVuY2goKSB7XG4gICAgfVxuXG4gICAgYXN5bmMgdHJ5QXV0aEFnYWluICgpIHtcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICBjb25zdCBibVVzZXIgPSBzZWxmLmdsb2JhbERhdGEuYm1Vc2VyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb25zb2xlLmxvZygndHJ5QXV0aEFnYWluIHN0YXJ0JylcbiAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aYr+WQpuimgeaJk+W8gOiuvue9rumhtemdoumHjeaWsOaOiOadgycsXG4gICAgICAgICAgY29udGVudDogJ+mcgOimgeiOt+WPluaCqOeahOWFrOW8gOS/oeaBryjmmLXnp7DjgIHlpLTlg4/nrYkpJyxcbiAgICAgICAgICBjb25maXJtQ29sb3I6ICcjRTU2Q0FDJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+ehruWumicpXG4gICAgICAgICAgICAgIHd4Lm9wZW5TZXR0aW5nKHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndHJ5QXV0aEFnYWluIHN1Y2Nlc3MnKVxuICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgndHJ1ZScpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlKCdmYWxzZScpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJylcbiAgICAgICAgICAgICAgcmVzb2x2ZSgnZmFsc2UnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0VXNlckluZm8oKSB7XG4gICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdnZXRXWFVzZXJJbmZvIHN0YXJ0JylcbiAgICAgICAgd3guZ2V0VXNlckluZm8oe1xuICAgICAgICAgIHN1Y2Nlc3MgKHJlcykge1xuICAgICAgICAgICAgc2VsZi5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0V1hVc2VySW5mbyBzdWNjZXNzJylcbiAgICAgICAgICAgIHJlc29sdmUoJ3RydWUnKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbCAocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0V1hVc2VySW5mbyBmYWlsJylcbiAgICAgICAgICAgIHJlc29sdmUoJ2ZhbHNlJylcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIGFzeW5jIGxvZ2luV1ggKCkge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdsb2dpbiBzdGFydCcpXG4gICAgICAgIHd4LmxvZ2luKHtcbiAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb2RlKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2dpbiBzdWNjZXNzJylcbiAgICAgICAgICAgICAgLy8g5Y+R6YCBIHJlcy5jb2RlIOWIsOWQjuWPsOaNouWPliBvcGVuSWQsIHNlc3Npb25LZXksIHVuaW9uSWRcbiAgICAgICAgICAgICAgc2VsZi5nbG9iYWxEYXRhLmNvZGUgPSByZXMuY29kZVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuY29kZSlcbiAgICAgICAgICAgICAgcmVzb2x2ZSgndHJ1ZScpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbG9naW4gZmFpbCcpXG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfojrflj5bnlKjmiLfnmbvlvZXmgIHlpLHotKUnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfph43mlrDnmbvlvZXvvJ8nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvZ2luV1goKVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ2ZhbHNlJylcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyBnZXRCTVRva2VuICgpIHtcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICBjb25zdCBnbG9iYWxEYXRhID0gc2VsZi5nbG9iYWxEYXRhXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZ2V0Qk1Ub2tlbiBzdGFydCcpXG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogYCR7Z2xvYmFsRGF0YS5ib25nbWlBUEl9L3dlY2hhdF9tcC9hY2Nlc3NfdG9rZW5gLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGFwcF9pZDogZ2xvYmFsRGF0YS5hcHBpZCxcbiAgICAgICAgICAgIGNvZGU6IGdsb2JhbERhdGEuY29kZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldEJNVG9rZW4gc3VjY2VzcycpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSlcbiAgICAgICAgICAgIHNlbGYuZ2xvYmFsRGF0YS5ibVVzZXIgPSByZXMuZGF0YTtcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldEJNVG9rZW4gZmFpbCcpXG4gICAgICAgICAgICByZWplY3QoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgYXN5bmMgdXBkYXRlQk1Vc2VyICgpIHtcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICBjb25zdCBnbG9iYWxEYXRhID0gc2VsZi5nbG9iYWxEYXRhXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb25zb2xlLmxvZygndXBkYXRlQk1Vc2VyIHN0YXJ0JylcbiAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBgJHtnbG9iYWxEYXRhLmJvbmdtaUFQSX0vdXNlci8ke2dsb2JhbERhdGEuYm1Vc2VyLnVzZXJJZH0/YWNjZXNzX3Rva2VuPSR7Z2xvYmFsRGF0YS5ibVVzZXIuYWNjZXNzVG9rZW59YCxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBpZDogZ2xvYmFsRGF0YS5ibVVzZXIudXNlcklkLFxuICAgICAgICAgICAgbmlja25hbWU6IGdsb2JhbERhdGEudXNlckluZm8ubmlja05hbWUsXG4gICAgICAgICAgICBnZW5kZXI6IGdsb2JhbERhdGEudXNlckluZm8uZ2VuZGVyID09IDIgPyAnRmVtYWxlJyA6ICdNYWxlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICBhdXRob3JpemF0aW9uOiAnTG9sbHlwb3AtV2VpeGluLU1pbmktUHJvZ3JhbSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZUJNVXNlciBzdWNjZXNzJylcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0Qk1Vc2VySW5mbyAoKSB7XG4gICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgY29uc3QgZ2xvYmFsRGF0YSA9IHNlbGYuZ2xvYmFsRGF0YVxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dldEJNVXNlckluZm8gc3RhcnQnKVxuICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6IGAke2dsb2JhbERhdGEuYm9uZ21pQVBJfS91c2VyLyR7Z2xvYmFsRGF0YS5ibVVzZXIudXNlcklkfWAsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYWNjZXNzX3Rva2VuOiBnbG9iYWxEYXRhLmJtVXNlci5hY2Nlc3NUb2tlblxuICAgICAgICAgIH0sXG4gICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICBhdXRob3JpemF0aW9uOiAnTG9sbHlwb3AtV2VpeGluLU1pbmktUHJvZ3JhbSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRCTVVzZXJJbmZvIHN1Y2Nlc3MnKVxuICAgICAgICAgICAgc2VsZi5nbG9iYWxEYXRhLmJtVXNlciA9IE9iamVjdC5hc3NpZ24oZ2xvYmFsRGF0YS5ibVVzZXIsIHJlcy5kYXRhKVxuICAgICAgICAgICAgY29uc29sZS5sb2coZ2xvYmFsRGF0YSlcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0VGlwcyAoKSB7XG4gICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgY29uc3QgZ2xvYmFsRGF0YSA9IHNlbGYuZ2xvYmFsRGF0YVxuICAgICAgY29uc3QgYm1Vc2VyID0gZ2xvYmFsRGF0YS5ibVVzZXJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXRUaXBzJylcbiAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBgJHtnbG9iYWxEYXRhLmJvbmdtaUFQSX0vd2VjaGF0X21wLyR7Ym1Vc2VyLnVzZXJJZH0vJHtibVVzZXIuc2VsZk1lbWJlcklkfS9vdnVsYXRpb25fdGVzdGAsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYXBwX2ZsYWc6IDEsXG4gICAgICAgICAgICBhY2Nlc3NfdG9rZW46IGJtVXNlci5hY2Nlc3NUb2tlblxuICAgICAgICAgIH0sXG4gICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICBhdXRob3JpemF0aW9uOiAnTG9sbHlwb3AtV2VpeGluLU1pbmktUHJvZ3JhbSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRUaXBzIHN1Y2Nlc3MnKVxuICAgICAgICAgICAgc2VsZi5nbG9iYWxEYXRhLnJlY29yZHNBbGwgPSByZXMuZGF0YTtcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVqZWN0KClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIGFzeW5jIGNvbnZlcnRSZWNvcmQgKCkge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjb252ZXJ0UmVjb3JkIHN0YXJ0JylcbiAgICAgICAgY29uc3QgcmVjb3Jkc0FsbCA9IHNlbGYuZ2xvYmFsRGF0YS5yZWNvcmRzQWxsXG4gICAgICAgIGNvbnN0IHJlY29yZHNMaXN0ID0gcmVjb3Jkc0FsbC5vdnVsYXRpb25UZXN0UmVzdWx0TGlzdFxuICAgICAgICBsZXQgZGF0ZSA9ICcnXG4gICAgICAgIHJlY29yZHNMaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoaXRlbS50aW1lc3RhbXAgKiAxMDAwKVxuICAgICAgICAgIGl0ZW0uZGF0ZSA9IGAke3RpbWUuZ2V0TW9udGgoKSArIDF95pyIJHt0aW1lLmdldERhdGUoKX3ml6VgXG4gICAgICAgICAgaWYgKGl0ZW0uZGF0ZSA9PSBkYXRlKSB7XG4gICAgICAgICAgICBpdGVtLmRhdGVGbGFnID0gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5kYXRlRmxhZyA9IHRydWVcbiAgICAgICAgICAgIGRhdGUgPSBpdGVtLmRhdGVcbiAgICAgICAgICB9XG4gICAgICAgICAgaXRlbS50aW1lID0gYCR7dGltZS5nZXRIb3VycygpIDwgMTAgPyAnMCcgKyB0aW1lLmdldEhvdXJzKCkgOiB0aW1lLmdldEhvdXJzKCl9OiR7dGltZS5nZXRNaW51dGVzKCkgPCAxMCA/ICcwJyArIHRpbWUuZ2V0TWludXRlcygpIDogdGltZS5nZXRNaW51dGVzKCl9YFxuICAgICAgICAgIGl0ZW0udHlwZSA9IGl0ZW0ucmVzdWx0VHlwZSA9PSAxID8gJ+mYtOaApycgOiAoaXRlbS5yZXN1bHRUeXBlID09IDIgPyAn5byx6ZizJyA6ICflvLrpmLMnKVxuICAgICAgICAgIGl0ZW0uY2xhc3NuYW1lID0gaXRlbS5yZXN1bHRUeXBlID09IDEgPyAncGVhaycgOiAoaXRlbS5yZXN1bHRUeXBlID09IDIgPyAnbG93JyA6ICdoaWdoJylcbiAgICAgICAgICBpdGVtLmxpbmVUYWcgPSB0cnVlXG4gICAgICAgICAgaXRlbS50aXAgPSBmYWxzZVxuICAgICAgICAgIGlmIChpbmRleCAhPSAwICYmIGl0ZW0uZGF0ZUZsYWcpIHtcbiAgICAgICAgICAgIHJlY29yZHNMaXN0W2luZGV4IC0gMV0ubGluZVRhZyA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpbmRleCAhPSAwICYmIGl0ZW0udHJpZ2dlclR5cGUgPT0gMykge1xuICAgICAgICAgICAgcmVjb3Jkc0xpc3RbaW5kZXggLSAxXS50aXAgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZyhyZWNvcmRzTGlzdClcbiAgICAgICAgc2VsZi5nbG9iYWxEYXRhLnJlY29yZHNBbGwgPSB7XG4gICAgICAgICAgb3Z1bGF0aW9uVGVzdFJlc3VsdExpc3Q6IHJlY29yZHNMaXN0LFxuICAgICAgICAgIHRyaWdnZXJUeXBlOiByZWNvcmRzQWxsLnRyaWdnZXJUeXBlXG4gICAgICAgIH07XG4gICAgICAgIGNvbnNvbGUubG9nKCdjb252ZXJ0UmVjb3JkIGVuZCcpXG4gICAgICAgIGNvbnNvbGUubG9nKHNlbGYuZ2xvYmFsRGF0YS5yZWNvcmRzQWxsKVxuICAgICAgICByZXNvbHZlKClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0UmVjb3JkcyAoKSB7XG4gICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgY29uc3QgYm1Vc2VyID0gc2VsZi5nbG9iYWxEYXRhLmJtVXNlclxuXG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgY29uc3QgdGltZXN0YW1wID0gTWF0aC5mbG9vcihkYXRlLmdldFRpbWUoKSAvIDEwMDApXG4gICAgICBjb25zdCBoID0gZGF0ZS5nZXRIb3VycygpXG4gICAgICBjb25zdCBtID0gZGF0ZS5nZXRNaW51dGVzKClcbiAgICAgIGNvbnN0IHMgPSBkYXRlLmdldFNlY29uZHMoKVxuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBoICogMzYwMCArIG0gKiA2MCArIHNcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dldFJlY29yZHMgc3RhcnQnKVxuICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6IGAke3NlbGYuZ2xvYmFsRGF0YS5ib25nbWlBUEl9L2JvZHlfc3RhdHVzLyR7Ym1Vc2VyLnVzZXJJZH0vJHtibVVzZXIuc2VsZk1lbWJlcklkfS9yZXBvcnQvNTEyLyR7dGltZXN0YW1wfS8ke2ludGVydmFsfWAsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYXBwX2ZsYWc6IDEsXG4gICAgICAgICAgICBhY2Nlc3NfdG9rZW46IGJtVXNlci5hY2Nlc3NUb2tlblxuICAgICAgICAgIH0sXG4gICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICBhdXRob3JpemF0aW9uOiAnTG9sbHlwb3AtV2VpeGluLU1pbmktUHJvZ3JhbSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRSZWNvcmRzIHN1Y2Nlc3MnKVxuICAgICAgICAgICAgY29uc3QgcmVjb3Jkc1RvZGF5ID0gcmVzLmRhdGFbMF1cbiAgICAgICAgICAgIGlmIChyZWNvcmRzVG9kYXkpIHtcbiAgICAgICAgICAgICAgcmVjb3Jkc1RvZGF5LmRldGFpbCA9IEpTT04ucGFyc2UocmVjb3Jkc1RvZGF5LmRldGFpbClcbiAgICAgICAgICAgICAgaWYgKCFyZWNvcmRzVG9kYXkuZGV0YWlsLm1hcCkge1xuICAgICAgICAgICAgICAgIHJlY29yZHNUb2RheS5kZXRhaWwgPSBbcmVjb3Jkc1RvZGF5LmRldGFpbF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZWxmLmdsb2JhbERhdGEucmVjb3Jkc1RvZGF5ID0gcmVjb3Jkc1RvZGF5XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRSZWNvcmRzIGZhaWwnKVxuICAgICAgICAgICAgcmVqZWN0KClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIGFzeW5jIGdldFRvZGF5TGlzdCAoKSB7XG4gICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dldFRvZGF5TGlzdCBzdGFydCcpXG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICAgIGNvbnN0IGggPSBkYXRlLmdldEhvdXJzKClcbiAgICAgICAgY29uc3QgbSA9IGRhdGUuZ2V0TWludXRlcygpXG4gICAgICAgIGNvbnN0IHMgPSBkYXRlLmdldFNlY29uZHMoKVxuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBNYXRoLmZsb29yKGRhdGUuZ2V0VGltZSgpIC8gMTAwMCkgLSAoaCAqIDM2MDAgKyBtICogNjAgKyBzKVxuICAgICAgICBjb25zdCByZWNvcmRzID0gc2VsZi5nbG9iYWxEYXRhLnJlY29yZHNBbGwub3Z1bGF0aW9uVGVzdFJlc3VsdExpc3QuZmlsdGVyKChpdGVtKSA9PiAoaXRlbS50aW1lc3RhbXAgPj0gdGltZXN0YW1wKSlcbiAgICAgICAgc2VsZi5nbG9iYWxEYXRhLnJlY29yZHNUb2RheVNob3cgPSByZWNvcmRzXG4gICAgICAgIHJlc29sdmUocmVjb3JkcylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgYXN5bmMgc2V0VHJpZ2dlclR5cGUgKCkge1xuICAgICAgY29uc3QgZ2xvYmFsRGF0YSA9IHRoaXMuZ2xvYmFsRGF0YVxuICAgICAgbGV0IHRyaWdnZXJUeXBlID0gJydcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXRUcmlnZ2VyVHlwZSBzdGFydCcpXG4gICAgICAgIHRyaWdnZXJUeXBlID0gKCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChnbG9iYWxEYXRhLnJlY29yZHNBbGwudHJpZ2dlclR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY29uc3QgbWVuc3RydWF0aW9uUGVyaW9kID0gZ2xvYmFsRGF0YS5ibVVzZXIubWVuc3RydWF0aW9uUGVyaW9kXG4gICAgICAgICAgICAgIGlmIChtZW5zdHJ1YXRpb25QZXJpb2QpIHtcbiAgICAgICAgICAgICAgICBpZiAobWVuc3RydWF0aW9uUGVyaW9kIDwgMjEpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtZW5zdHJ1YXRpb25QZXJpb2QgPiA0MSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIDNcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gNFxuICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gNVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnc2V0VHJpZ2dlclR5cGUgZW5kJylcbiAgICAgICAgcmVzb2x2ZSh0cmlnZ2VyVHlwZSgpKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyB0YWtlUGhvdG8gKCkge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0YWtlUGhvdG8gc3RhcnQnKVxuICAgICAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgICAgIGNvdW50OiAxLFxuICAgICAgICAgICAgc2l6ZVR5cGU6IFsnY29tcHJlc3NlZCddLFxuICAgICAgICAgICAgc291cmNlVHlwZTogWydjYW1lcmEnXSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgc2VsZi5nbG9iYWxEYXRhLnBpY3R1cmVMb2NhbCA9IHJlcy50ZW1wRmlsZVBhdGhzWzBdXG4gICAgICAgICAgICAgIC8vIHNlbGYuZ2V0UWluaXVUb2tlbigxKVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGFrZVBob3RvIGVuZCcpXG4gICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIGFzeW5jIGdldFFpbml1VG9rZW4gKCkge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgIGNvbnN0IGJtVXNlciA9IHNlbGYuZ2xvYmFsRGF0YS5ibVVzZXI7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZ2V0UWluaXVUb2tlbiBzdGFydCcpXG4gICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IGAke3NlbGYuZ2xvYmFsRGF0YS5ib25nbWlBUEl9L3VzZXIvJHtibVVzZXIudXNlcklkfS91cGxvYWRfaW5mb2AsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIHR5cGU6IDIsXG4gICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogYm1Vc2VyLmFjY2Vzc1Rva2VuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgIGF1dGhvcml6YXRpb246ICdMb2xseXBvcC1XZWl4aW4tTWluaS1Qcm9ncmFtJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgc2VsZi5nbG9iYWxEYXRhLnVwbG9hZEluZm8gPSByZXMuZGF0YVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0UWluaXVUb2tlbiBlbmQnKVxuICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyB1cGxvYWRQaG90byAocGljdHVyZVR5cGUpIHtcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICBjb25zdCBnbG9iYWxEYXRhID0gc2VsZi5nbG9iYWxEYXRhXG4gICAgICBjb25zdCBibVVzZXIgPSBnbG9iYWxEYXRhLmJtVXNlclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3VwbG9hZFBob3RvIHN0YXJ0JylcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOiBgJHtnbG9iYWxEYXRhLnFpbml1VXBsb2FkVXJsfWAsXG4gICAgICAgICAgZmlsZVBhdGg6IHBpY3R1cmVUeXBlID09IDEgPyBnbG9iYWxEYXRhLnBpY3R1cmVMb2NhbCA6IGdsb2JhbERhdGEudGFpbG9yTG9jYWwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgICAgICB0b2tlbjogZ2xvYmFsRGF0YS51cGxvYWRJbmZvLnVwbG9hZFRva2VuLFxuICAgICAgICAgICAga2V5OiBnbG9iYWxEYXRhLnVwbG9hZEluZm8uZmlsZU5hbWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndXBsb2FkUGhvdG8gZW5kJylcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YSlcbiAgICAgICAgICAgIC8vIHNlbGYuZ2xvYmFsRGF0YS50YWlsb3JPbmxpbmUgPSBkYXRhLmtleTtcbiAgICAgICAgICAgIC8vIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgLy8gICB1cmw6ICcvcGFnZXMvcmVzdWx0L3Jlc3VsdCcsXG4gICAgICAgICAgICAvLyAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnc3VjY2VzcycpXG4gICAgICAgICAgICAvLyAgICAgLy8gc3VjY2Vzc1xuICAgICAgICAgICAgLy8gICB9LFxuICAgICAgICAgICAgLy8gICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgLy8gICAgIC8vIGZhaWxcbiAgICAgICAgICAgIC8vICAgfSxcbiAgICAgICAgICAgIC8vICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnY29tcGxldGUnKVxuICAgICAgICAgICAgLy8gICAgIC8vIGNvbXBsZXRlXG4gICAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgfVxuIl19