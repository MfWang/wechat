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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Result = function (_wepy$page) {
  _inherits(Result, _wepy$page);

  function Result() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Result);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Result.__proto__ || Object.getPrototypeOf(Result)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarBackgroundColor: '#000',
      navigationBarTitleText: '智能监测结果',
      navigationBarTextStyle: '#fff',
      backgroundColor: 'black'
    }, _this.mixins = [_test2.default, _common2.default], _this.data = {
      result: null,
      resultIndex: -1,
      show: null,
      flag: false,
      results: [{
        "img": "../images/high.png",
        "name": "强阳"
      }, {
        "img": "../images/low.png",
        "name": "弱阳"
      }, {
        "img": "../images/peak.png",
        "name": "阴性"
      }]
    }, _this.methods = {
      changeResult: function changeResult(event) {
        var self = this;
        var index = parseInt(event.currentTarget.dataset.wepyParams, 10);
        self.resultIndex = index;
        self.$apply();
        console.log(self.resultIndex);
      },
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

      uploadOvulation: function uploadOvulation() {
        var self = this;
        var parent = self.$parent;
        var globalData = parent.globalData;
        var bmUser = globalData.bmUser;
        var result = self.result;
        var show = self.show;
        var resultIndex = self.resultIndex;
        console.log(show);
        console.log(result);
        if (resultIndex == -1) {
          wx.showModal({
            title: '提示',
            content: '请选择检测结果再上传',
            showCancel: false,
            success: function success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
              }
            }
          });
        } else {
          if (resultIndex == 0) {
            result.resultType = 3;
          } else if (resultIndex == 1) {
            result.resultType = 2;
          } else if (resultIndex == 2) {
            result.resultType = 1;
          }
          result.originalImgUrl = globalData.downloadUrl + '/' + globalData.pictureOnline;
          result.timestamp = Math.floor(new Date().valueOf() / 1000);
          console.log('------注意----------');
          if (globalData.recordsToday == null) {
            var date = new Date();
            date.setHours(0);
            date.setMilliseconds(0);
            date.setSeconds(0);
            date.setMinutes(0);
            console.log('-----globalData.recordsToday==null');
            console.log(result);
            globalData.recordsToday = {
              timestamp: Math.floor(date.valueOf() / 1000),
              type: 'OVULATION_TEST',
              userId: bmUser.userId,
              familyMemberId: bmUser.selfMemberId,
              detail: result,
              appFlag: 1
            };
          } else {
            console.log('-----globalData.recordsToday!=null');
            console.log(show.index);
            console.log(result);
            globalData.recordsToday.detail.push(result);
          }
          var data = globalData.recordsToday;
          data.detail = JSON.stringify(data.detail);
          console.log('上传');
          console.log(JSON.parse(data.detail));
          console.log(data);
          wx.request({
            url: globalData.bongmiAPI + '/body_status/' + bmUser.userId + '/' + bmUser.selfMemberId + '?access_token=' + bmUser.accessToken,
            data: data,
            header: {
              authorization: 'Lollypop-Weixin-Mini-Program'
            },
            method: "PUT",
            success: function success(res) {
              globalData.refresh = true;
              wx.switchTab({
                url: '/pages/today'
              });
            }
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Result, [{
    key: 'onLoad',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
        var self, parent, globalData, bmUser;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                self = this;
                parent = self.$parent;
                globalData = parent.globalData;
                bmUser = globalData.bmUser;

                wx.request({
                  url: globalData.bongmiAPI + '/body_status/' + bmUser.userId + '/ovulation?url=' + encodeURIComponent(globalData.downloadUrl + '/' + globalData.pictureOnline),
                  data: {
                    access_token: bmUser.accessToken
                  },
                  header: {
                    authorization: 'Lollypop-Weixin-Mini-Program'
                  },
                  success: function success(res) {
                    console.log('--------------');
                    console.log(res);
                    var show = res.data;
                    var resultIndex = '';
                    var result = JSON.parse(JSON.stringify(res.data));
                    if (show.detectType == 3) {
                      show.text = '检测失败';
                      resultIndex = -1;
                    } else {
                      if (show.resultType == 1) {
                        show.text = '阴性';
                        resultIndex = 2;
                      } else if (show.resultType == 2) {
                        show.text = '弱阳';
                        resultIndex = 1;
                      } else if (show.resultType == 3) {
                        show.text = '强阳';
                        resultIndex = 0;
                      }
                    }
                    show.testLineX = show.testLineX + '%';
                    show.refLineX = show.refLineX + '%';
                    self.result = result;
                    self.show = show;
                    self.resultIndex = resultIndex;
                    self.flag = true;
                    self.$apply();
                  }
                });

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onLoad(_x) {
        return _ref2.apply(this, arguments);
      }

      return onLoad;
    }()
  }]);

  return Result;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Result , 'pages/result'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC5qcyJdLCJuYW1lcyI6WyJSZXN1bHQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtaXhpbnMiLCJkYXRhIiwicmVzdWx0IiwicmVzdWx0SW5kZXgiLCJzaG93IiwiZmxhZyIsInJlc3VsdHMiLCJtZXRob2RzIiwiY2hhbmdlUmVzdWx0IiwiZXZlbnQiLCJzZWxmIiwiaW5kZXgiLCJwYXJzZUludCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwid2VweVBhcmFtcyIsIiRhcHBseSIsImNvbnNvbGUiLCJsb2ciLCJ0YWtlUGhvdG8iLCJwYXJlbnQiLCIkcGFyZW50IiwiZ2V0UWluaXVUb2tlbiIsInVwbG9hZFBob3RvIiwicGljRGF0YSIsImdsb2JhbERhdGEiLCJwaWN0dXJlT25saW5lIiwia2V5Iiwid3giLCJyZWRpcmVjdFRvIiwidXJsIiwic3VjY2VzcyIsInJlcyIsImZhaWwiLCJjb21wbGV0ZSIsInVwbG9hZE92dWxhdGlvbiIsImJtVXNlciIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJjb25maXJtIiwicmVzdWx0VHlwZSIsIm9yaWdpbmFsSW1nVXJsIiwiZG93bmxvYWRVcmwiLCJ0aW1lc3RhbXAiLCJNYXRoIiwiZmxvb3IiLCJEYXRlIiwidmFsdWVPZiIsInJlY29yZHNUb2RheSIsImRhdGUiLCJzZXRIb3VycyIsInNldE1pbGxpc2Vjb25kcyIsInNldFNlY29uZHMiLCJzZXRNaW51dGVzIiwidHlwZSIsInVzZXJJZCIsImZhbWlseU1lbWJlcklkIiwic2VsZk1lbWJlcklkIiwiZGV0YWlsIiwiYXBwRmxhZyIsInB1c2giLCJKU09OIiwic3RyaW5naWZ5IiwicGFyc2UiLCJyZXF1ZXN0IiwiYm9uZ21pQVBJIiwiYWNjZXNzVG9rZW4iLCJoZWFkZXIiLCJhdXRob3JpemF0aW9uIiwibWV0aG9kIiwicmVmcmVzaCIsInN3aXRjaFRhYiIsIm9wdGlvbnMiLCJlbmNvZGVVUklDb21wb25lbnQiLCJhY2Nlc3NfdG9rZW4iLCJkZXRlY3RUeXBlIiwidGV4dCIsInRlc3RMaW5lWCIsInJlZkxpbmVYIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxNLEdBQVM7QUFDUEMsb0NBQThCLE1BRHZCO0FBRVBDLDhCQUF3QixRQUZqQjtBQUdQQyw4QkFBd0IsTUFIakI7QUFJUEMsdUJBQWlCO0FBSlYsSyxRQU9UQyxNLEdBQVMsa0MsUUFDVEMsSSxHQUFPO0FBQ0xDLGNBQVEsSUFESDtBQUVMQyxtQkFBYSxDQUFDLENBRlQ7QUFHTEMsWUFBTSxJQUhEO0FBSUxDLFlBQU0sS0FKRDtBQUtMQyxlQUFTLENBQ1A7QUFDRSxlQUFPLG9CQURUO0FBRUUsZ0JBQVE7QUFGVixPQURPLEVBS1A7QUFDRSxlQUFPLG1CQURUO0FBRUUsZ0JBQVE7QUFGVixPQUxPLEVBU1A7QUFDRSxlQUFPLG9CQURUO0FBRUUsZ0JBQVE7QUFGVixPQVRPO0FBTEosSyxRQXFCUEMsTyxHQUFVO0FBQ1JDLGtCQURRLHdCQUNNQyxLQUROLEVBQ2E7QUFDbkIsWUFBTUMsT0FBTyxJQUFiO0FBQ0EsWUFBTUMsUUFBUUMsU0FBU0gsTUFBTUksYUFBTixDQUFvQkMsT0FBcEIsQ0FBNEJDLFVBQXJDLEVBQWlELEVBQWpELENBQWQ7QUFDQUwsYUFBS1AsV0FBTCxHQUFtQlEsS0FBbkI7QUFDQUQsYUFBS00sTUFBTDtBQUNBQyxnQkFBUUMsR0FBUixDQUFZUixLQUFLUCxXQUFqQjtBQUNELE9BUE87QUFRRmdCLGVBUkUsdUJBUVc7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDWFQsc0JBRFc7QUFFWFUsd0JBRlcsR0FFRlYsS0FBS1csT0FGSDtBQUFB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U0FBTCxHQUFpQixHQUFsQztBQUNBM0UseUJBQUs0RSxRQUFMLEdBQWdCNUUsS0FBSzRFLFFBQUwsR0FBZ0IsR0FBaEM7QUFDQXRFLHlCQUFLUixNQUFMLEdBQWNBLE1BQWQ7QUFDQVEseUJBQUtOLElBQUwsR0FBWUEsSUFBWjtBQUNBTSx5QkFBS1AsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQU8seUJBQUtMLElBQUwsR0FBWSxJQUFaO0FBQ0FLLHlCQUFLTSxNQUFMO0FBQ0Q7QUFwQ1EsaUJBQVg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFoSmdDLGVBQUtpRSxJOztrQkFBcEJ2RixNIiwiZmlsZSI6InJlc3VsdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG4gIGltcG9ydCB0ZXN0TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXG4gIGltcG9ydCBjb21tb25NaXhpbiBmcm9tICcuLi9taXhpbnMvY29tbW9uJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3VsdCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyMwMDAnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aZuuiDveebkea1i+e7k+aenCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnI2ZmZicsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdibGFjaydcbiAgICB9XG5cbiAgICBtaXhpbnMgPSBbdGVzdE1peGluLCBjb21tb25NaXhpbl1cbiAgICBkYXRhID0ge1xuICAgICAgcmVzdWx0OiBudWxsLFxuICAgICAgcmVzdWx0SW5kZXg6IC0xLFxuICAgICAgc2hvdzogbnVsbCxcbiAgICAgIGZsYWc6IGZhbHNlLFxuICAgICAgcmVzdWx0czogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJpbWdcIjogXCIuLi9pbWFnZXMvaGlnaC5wbmdcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCLlvLrpmLNcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJpbWdcIjogXCIuLi9pbWFnZXMvbG93LnBuZ1wiLFxuICAgICAgICAgIFwibmFtZVwiOiBcIuW8semYs1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImltZ1wiOiBcIi4uL2ltYWdlcy9wZWFrLnBuZ1wiLFxuICAgICAgICAgIFwibmFtZVwiOiBcIumYtOaAp1wiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2hhbmdlUmVzdWx0IChldmVudCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgICBjb25zdCBpbmRleCA9IHBhcnNlSW50KGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC53ZXB5UGFyYW1zLCAxMClcbiAgICAgICAgc2VsZi5yZXN1bHRJbmRleCA9IGluZGV4XG4gICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNlbGYucmVzdWx0SW5kZXgpXG4gICAgICB9LFxuICAgICAgYXN5bmMgdGFrZVBob3RvICgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgY29uc3QgcGFyZW50ID0gc2VsZi4kcGFyZW50XG4gICAgICAgIGF3YWl0IHBhcmVudC50YWtlUGhvdG8oKVxuICAgICAgICBhd2FpdCBwYXJlbnQuZ2V0UWluaXVUb2tlbigpXG4gICAgICAgIGNvbnN0IHBpY0RhdGEgPSBhd2FpdCBwYXJlbnQudXBsb2FkUGhvdG8oMSkgLy8xOuWOn+WbviAyOuijgeWJquWbvlxuICAgICAgICBwYXJlbnQuZ2xvYmFsRGF0YS5waWN0dXJlT25saW5lID0gcGljRGF0YS5rZXlcbiAgICAgICAgY29uc29sZS5sb2cocGFyZW50Lmdsb2JhbERhdGEpXG4gICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgIHVybDogJy9wYWdlcy9yZXN1bHQnLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzJylcbiAgICAgICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgIC8vIGZhaWxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29tcGxldGUnKVxuICAgICAgICAgICAgLy8gY29tcGxldGVcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdXBsb2FkT3Z1bGF0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHNlbGYuJHBhcmVudFxuICAgICAgICBjb25zdCBnbG9iYWxEYXRhID0gcGFyZW50Lmdsb2JhbERhdGFcbiAgICAgICAgY29uc3QgYm1Vc2VyID0gZ2xvYmFsRGF0YS5ibVVzZXI7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHNlbGYucmVzdWx0O1xuICAgICAgICBjb25zdCBzaG93ID0gc2VsZi5zaG93O1xuICAgICAgICBjb25zdCByZXN1bHRJbmRleCA9IHNlbGYucmVzdWx0SW5kZXg7XG4gICAgICAgIGNvbnNvbGUubG9nKHNob3cpXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAgICAgaWYgKHJlc3VsdEluZGV4ID09IC0xKSB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfor7fpgInmi6nmo4DmtYvnu5Pmnpzlho3kuIrkvKAnLFxuICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAocmVzdWx0SW5kZXggPT0gMCkge1xuICAgICAgICAgICAgcmVzdWx0LnJlc3VsdFR5cGUgPSAzXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHRJbmRleCA9PSAxKSB7XG4gICAgICAgICAgICByZXN1bHQucmVzdWx0VHlwZSA9IDJcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdEluZGV4ID09IDIpIHtcbiAgICAgICAgICAgIHJlc3VsdC5yZXN1bHRUeXBlID0gMVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXN1bHQub3JpZ2luYWxJbWdVcmwgPSBgJHtnbG9iYWxEYXRhLmRvd25sb2FkVXJsfS8ke2dsb2JhbERhdGEucGljdHVyZU9ubGluZX1gO1xuICAgICAgICAgIHJlc3VsdC50aW1lc3RhbXAgPSBNYXRoLmZsb29yKG5ldyBEYXRlKCkudmFsdWVPZigpIC8gMTAwMClcbiAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0t5rOo5oSPLS0tLS0tLS0tLScpXG4gICAgICAgICAgaWYgKGdsb2JhbERhdGEucmVjb3Jkc1RvZGF5ID09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGRhdGUuc2V0SG91cnMoMCk7XG4gICAgICAgICAgICBkYXRlLnNldE1pbGxpc2Vjb25kcygwKTtcbiAgICAgICAgICAgIGRhdGUuc2V0U2Vjb25kcygwKTtcbiAgICAgICAgICAgIGRhdGUuc2V0TWludXRlcygwKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLWdsb2JhbERhdGEucmVjb3Jkc1RvZGF5PT1udWxsJylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAgICAgICAgIGdsb2JhbERhdGEucmVjb3Jkc1RvZGF5ID0ge1xuICAgICAgICAgICAgICB0aW1lc3RhbXA6IE1hdGguZmxvb3IoZGF0ZS52YWx1ZU9mKCkgLyAxMDAwKSxcbiAgICAgICAgICAgICAgdHlwZTogJ09WVUxBVElPTl9URVNUJyxcbiAgICAgICAgICAgICAgdXNlcklkOiBibVVzZXIudXNlcklkLFxuICAgICAgICAgICAgICBmYW1pbHlNZW1iZXJJZDogYm1Vc2VyLnNlbGZNZW1iZXJJZCxcbiAgICAgICAgICAgICAgZGV0YWlsOiByZXN1bHQsXG4gICAgICAgICAgICAgIGFwcEZsYWc6IDEsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLWdsb2JhbERhdGEucmVjb3Jkc1RvZGF5IT1udWxsJylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNob3cuaW5kZXgpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgICAgICAgICBnbG9iYWxEYXRhLnJlY29yZHNUb2RheS5kZXRhaWwucHVzaChyZXN1bHQpXG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBkYXRhID0gZ2xvYmFsRGF0YS5yZWNvcmRzVG9kYXlcbiAgICAgICAgICBkYXRhLmRldGFpbCA9IEpTT04uc3RyaW5naWZ5KGRhdGEuZGV0YWlsKVxuICAgICAgICAgIGNvbnNvbGUubG9nKCfkuIrkvKAnKVxuICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UoZGF0YS5kZXRhaWwpKVxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IGAke2dsb2JhbERhdGEuYm9uZ21pQVBJfS9ib2R5X3N0YXR1cy8ke2JtVXNlci51c2VySWR9LyR7Ym1Vc2VyLnNlbGZNZW1iZXJJZH0/YWNjZXNzX3Rva2VuPSR7Ym1Vc2VyLmFjY2Vzc1Rva2VufWAsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgIGF1dGhvcml6YXRpb246ICdMb2xseXBvcC1XZWl4aW4tTWluaS1Qcm9ncmFtJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgZ2xvYmFsRGF0YS5yZWZyZXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvdG9kYXknXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIG9uTG9hZCAob3B0aW9ucykge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgIGNvbnN0IHBhcmVudCA9IHNlbGYuJHBhcmVudFxuICAgICAgY29uc3QgZ2xvYmFsRGF0YSA9IHBhcmVudC5nbG9iYWxEYXRhXG4gICAgICBjb25zdCBibVVzZXIgPSBnbG9iYWxEYXRhLmJtVXNlcjtcbiAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGAke2dsb2JhbERhdGEuYm9uZ21pQVBJfS9ib2R5X3N0YXR1cy8ke2JtVXNlci51c2VySWR9L292dWxhdGlvbj91cmw9YCArIGVuY29kZVVSSUNvbXBvbmVudChgJHtnbG9iYWxEYXRhLmRvd25sb2FkVXJsfS8ke2dsb2JhbERhdGEucGljdHVyZU9ubGluZX1gKSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGFjY2Vzc190b2tlbjogYm1Vc2VyLmFjY2Vzc1Rva2VuXG4gICAgICAgIH0sXG4gICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgIGF1dGhvcml6YXRpb246ICdMb2xseXBvcC1XZWl4aW4tTWluaS1Qcm9ncmFtJ1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tJylcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgY29uc3Qgc2hvdyA9IHJlcy5kYXRhXG4gICAgICAgICAgbGV0IHJlc3VsdEluZGV4ID0gJydcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcy5kYXRhKSlcbiAgICAgICAgICBpZiAoc2hvdy5kZXRlY3RUeXBlID09IDMpIHtcbiAgICAgICAgICAgIHNob3cudGV4dCA9ICfmo4DmtYvlpLHotKUnO1xuICAgICAgICAgICAgcmVzdWx0SW5kZXggPSAtMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNob3cucmVzdWx0VHlwZSA9PSAxKSB7XG4gICAgICAgICAgICAgIHNob3cudGV4dCA9ICfpmLTmgKcnXG4gICAgICAgICAgICAgIHJlc3VsdEluZGV4ID0gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hvdy5yZXN1bHRUeXBlID09IDIpIHtcbiAgICAgICAgICAgICAgc2hvdy50ZXh0ID0gJ+W8semYsydcbiAgICAgICAgICAgICAgcmVzdWx0SW5kZXggPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzaG93LnJlc3VsdFR5cGUgPT0gMykge1xuICAgICAgICAgICAgICBzaG93LnRleHQgPSAn5by66ZizJ1xuICAgICAgICAgICAgICByZXN1bHRJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHNob3cudGVzdExpbmVYID0gc2hvdy50ZXN0TGluZVggKyAnJSdcbiAgICAgICAgICBzaG93LnJlZkxpbmVYID0gc2hvdy5yZWZMaW5lWCArICclJ1xuICAgICAgICAgIHNlbGYucmVzdWx0ID0gcmVzdWx0XG4gICAgICAgICAgc2VsZi5zaG93ID0gc2hvd1xuICAgICAgICAgIHNlbGYucmVzdWx0SW5kZXggPSByZXN1bHRJbmRleFxuICAgICAgICAgIHNlbGYuZmxhZyA9IHRydWVcbiAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19