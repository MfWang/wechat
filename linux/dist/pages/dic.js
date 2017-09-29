'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dic = function (_wepy$page) {
  _inherits(Dic, _wepy$page);

  function Dic() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Dic);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dic.__proto__ || Object.getPrototypeOf(Dic)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '字典'
    }, _this.data = {
      index: 0,
      array: ['查命令', '查语义'],
      results: [{
        abb: 'cal',
        Benelux: 'calndar',
        mean: '日历。不是计算的意思，很有趣，敲个命令试一下，会显示当前月的日历',
        lists: ['$ cd ..', '$ cd ~', '$ cd /usr/local']
      }, {
        abb: 'cal',
        Benelux: 'calndar',
        mean: '日历。不是计算的意思，很有趣，敲个命令试一下，会显示当前月的日历',
        lists: ['$ cd ..', '$ cd ~', '$ cd /usr/local']
      }]
    }, _this.methods = {
      bindPickerChange: function bindPickerChange(e) {
        this.index = e.detail.value;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Dic, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Dic;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Dic , 'pages/dic'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpYy5qcyJdLCJuYW1lcyI6WyJEaWMiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImluZGV4IiwiYXJyYXkiLCJyZXN1bHRzIiwiYWJiIiwiQmVuZWx1eCIsIm1lYW4iLCJsaXN0cyIsIm1ldGhvZHMiLCJiaW5kUGlja2VyQ2hhbmdlIiwiZSIsImRldGFpbCIsInZhbHVlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsRzs7Ozs7Ozs7Ozs7Ozs7Z0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsSSxHQUFPO0FBQ0xDLGFBQU8sQ0FERjtBQUVMQyxhQUFPLENBQ0wsS0FESyxFQUVMLEtBRkssQ0FGRjtBQU1MQyxlQUFTLENBQ1A7QUFDRUMsYUFBSyxLQURQO0FBRUVDLGlCQUFTLFNBRlg7QUFHRUMsY0FBTSxrQ0FIUjtBQUlFQyxlQUFPLENBQ0wsU0FESyxFQUVMLFFBRkssRUFHTCxpQkFISztBQUpULE9BRE8sRUFXUDtBQUNFSCxhQUFLLEtBRFA7QUFFRUMsaUJBQVMsU0FGWDtBQUdFQyxjQUFNLGtDQUhSO0FBSUVDLGVBQU8sQ0FDTCxTQURLLEVBRUwsUUFGSyxFQUdMLGlCQUhLO0FBSlQsT0FYTztBQU5KLEssUUE2QlBDLE8sR0FBVTtBQUNSQyx3QkFBa0IsMEJBQVVDLENBQVYsRUFBYTtBQUM3QixhQUFLVCxLQUFMLEdBQWFTLEVBQUVDLE1BQUYsQ0FBU0MsS0FBdEI7QUFDRDtBQUhPLEs7Ozs7OzZCQU1ELENBQ1I7Ozs7RUF6QzhCLGVBQUtDLEk7O2tCQUFqQmhCLEciLCJmaWxlIjoiZGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGljIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5a2X5YW4J1xuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBpbmRleDogMCxcbiAgICAgIGFycmF5OiBbXG4gICAgICAgICfmn6Xlkb3ku6QnLFxuICAgICAgICAn5p+l6K+t5LmJJ1xuICAgICAgXSxcbiAgICAgIHJlc3VsdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGFiYjogJ2NhbCcsXG4gICAgICAgICAgQmVuZWx1eDogJ2NhbG5kYXInLFxuICAgICAgICAgIG1lYW46ICfml6XljobjgILkuI3mmK/orqHnrpfnmoTmhI/mgJ3vvIzlvojmnInotqPvvIzmlbLkuKrlkb3ku6Tor5XkuIDkuIvvvIzkvJrmmL7npLrlvZPliY3mnIjnmoTml6XljoYnLFxuICAgICAgICAgIGxpc3RzOiBbXG4gICAgICAgICAgICAnJCBjZCAuLicsXG4gICAgICAgICAgICAnJCBjZCB+JyxcbiAgICAgICAgICAgICckIGNkIC91c3IvbG9jYWwnXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgYWJiOiAnY2FsJyxcbiAgICAgICAgICBCZW5lbHV4OiAnY2FsbmRhcicsXG4gICAgICAgICAgbWVhbjogJ+aXpeWOhuOAguS4jeaYr+iuoeeul+eahOaEj+aAne+8jOW+iOaciei2o++8jOaVsuS4quWRveS7pOivleS4gOS4i++8jOS8muaYvuekuuW9k+WJjeaciOeahOaXpeWOhicsXG4gICAgICAgICAgbGlzdHM6IFtcbiAgICAgICAgICAgICckIGNkIC4uJyxcbiAgICAgICAgICAgICckIGNkIH4nLFxuICAgICAgICAgICAgJyQgY2QgL3Vzci9sb2NhbCdcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGJpbmRQaWNrZXJDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBlLmRldGFpbC52YWx1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICB9XG4gIH1cbiJdfQ==