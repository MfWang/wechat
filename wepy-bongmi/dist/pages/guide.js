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
      navigationBarTitleText: '使用指导'
    }, _this.$props = { "record": { "xmlns:v-bind": "", "v-bind:records.sync": "records", "theme": "today", "date": "false", "tip": "false" } }, _this.$events = {}, _this.components = {
      record: _recorditem2.default
    }, _this.data = {
      list: [{
        title: "强弱阳识别",
        img: "../images/guide_pic_knowledge.png",
        items: ["测试线颜色等于或深于参考线，为强阳；", "测试线颜色浅于参考线，为弱阳；", "测试线看不到，阴性：", "两条线都看不到，无效。估计是试纸坏掉啦，重新测吧～"]
      }, {
        title: "如何确定排卵时间",
        items: ["在一个周期内，每天固定时间用试纸测量一次，首次测到强阳说明在24-48小时会排卵；", "出现强阳后，需要将频率改成每4个小时测量一次，如果测到强阳转弱阳，说明排卵已经发生；"]
      }, {
        title: "如何安排爱爱时间",
        items: ["首次测到强阳的当天爱爱，隔一天再爱爱一次；", "测到强转弱之后5小时以内，可以安排一次爱爱～"],
        tip: "嘿嘿：上述都爱满，应该中奖率很高吧！但是任何一次符合描述的爱爱，应该都会有中奖可能哦～"
      }, {
        title: "什么是LH值",
        items: ["棒米智能识别给出的LH值是通过图像识别分析，比较测试线T和参照线C的深浅给出的参考值。目的是帮助正在努力备孕的妈妈们更轻松的分辨出排卵试纸的测试结果，准确找出排卵时间。", "这里的LH值并不是准确的促黄体生成素（LH）含量值哦！因为不同体质、不同试纸测出来的深浅都有差异，如果需要准确的值，您需要去医院做六项激素检测呢～"]
      }],
      activeIndex: -1,
      records: []
    }, _this.methods = {
      toggleShow: function toggleShow(index) {
        var self = this;
        self.activeIndex = self.activeIndex == index ? -1 : index;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Guide, [{
    key: 'onShow',
    value: function onShow() {
      this.records = this.$parent.globalData.recordsTodayShow;
    }
  }]);

  return Guide;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Guide , 'pages/guide'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImd1aWRlLmpzIl0sIm5hbWVzIjpbIkd1aWRlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicmVjb3JkIiwiZGF0YSIsImxpc3QiLCJ0aXRsZSIsImltZyIsIml0ZW1zIiwidGlwIiwiYWN0aXZlSW5kZXgiLCJyZWNvcmRzIiwibWV0aG9kcyIsInRvZ2dsZVNob3ciLCJpbmRleCIsInNlbGYiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInJlY29yZHNUb2RheVNob3ciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVZDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxnQkFBZSxFQUFoQixFQUFtQix1QkFBc0IsU0FBekMsRUFBbUQsU0FBUSxPQUEzRCxFQUFtRSxRQUFPLE9BQTFFLEVBQWtGLE9BQU0sT0FBeEYsRUFBVixFLFFBQ1pDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNSQztBQURRLEssUUFJVkMsSSxHQUFPO0FBQ0xDLFlBQU0sQ0FDSjtBQUNFQyxlQUFPLE9BRFQ7QUFFRUMsYUFBSyxtQ0FGUDtBQUdFQyxlQUFPLENBQ0wsb0JBREssRUFFTCxpQkFGSyxFQUdMLFlBSEssRUFJTCwyQkFKSztBQUhULE9BREksRUFXSjtBQUNFRixlQUFPLFVBRFQ7QUFFRUUsZUFBTyxDQUNMLDJDQURLLEVBRUwsNENBRks7QUFGVCxPQVhJLEVBa0JKO0FBQ0VGLGVBQU8sVUFEVDtBQUVFRSxlQUFPLENBQ0wsdUJBREssRUFFTCx3QkFGSyxDQUZUO0FBTUVDLGFBQUs7QUFOUCxPQWxCSSxFQTBCSjtBQUNFSCxlQUFPLFFBRFQ7QUFFRUUsZUFBTyxDQUNMLHNGQURLLEVBRUwsMkVBRks7QUFGVCxPQTFCSSxDQUREO0FBbUNMRSxtQkFBYSxDQUFDLENBbkNUO0FBb0NMQyxlQUFTO0FBcENKLEssUUF1Q1BDLE8sR0FBVTtBQUNSQyxnQkFEUSxzQkFDSUMsS0FESixFQUNXO0FBQ2pCLFlBQU1DLE9BQU8sSUFBYjtBQUNBQSxhQUFLTCxXQUFMLEdBQW9CSyxLQUFLTCxXQUFMLElBQW9CSSxLQUFyQixHQUE4QixDQUFDLENBQS9CLEdBQW1DQSxLQUF0RDtBQUNEO0FBSk8sSzs7Ozs7NkJBT0Q7QUFDUCxXQUFLSCxPQUFMLEdBQWUsS0FBS0ssT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxnQkFBdkM7QUFDRDs7OztFQTNEZ0MsZUFBS0MsSTs7a0JBQW5CdEIsSyIsImZpbGUiOiJndWlkZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgUmVjb3JkSXRlbSBmcm9tICcuLi9jb21wb25lbnRzL3JlY29yZGl0ZW0nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VpZGUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvb/nlKjmjIflr7wnXG4gICAgfVxuXG4gICAkcHJvcHMgPSB7XCJyZWNvcmRcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnJlY29yZHMuc3luY1wiOlwicmVjb3Jkc1wiLFwidGhlbWVcIjpcInRvZGF5XCIsXCJkYXRlXCI6XCJmYWxzZVwiLFwidGlwXCI6XCJmYWxzZVwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICByZWNvcmQ6IFJlY29yZEl0ZW1cbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgbGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6IFwi5by65byx6Ziz6K+G5YirXCIsXG4gICAgICAgICAgaW1nOiBcIi4uL2ltYWdlcy9ndWlkZV9waWNfa25vd2xlZGdlLnBuZ1wiLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICBcIua1i+ivlee6v+minOiJsuetieS6juaIlua3seS6juWPguiAg+e6v++8jOS4uuW8uumYs++8m1wiLFxuICAgICAgICAgICAgXCLmtYvor5Xnur/popzoibLmtYXkuo7lj4LogIPnur/vvIzkuLrlvLHpmLPvvJtcIixcbiAgICAgICAgICAgIFwi5rWL6K+V57q/55yL5LiN5Yiw77yM6Zi05oCn77yaXCIsXG4gICAgICAgICAgICBcIuS4pOadoee6v+mDveeci+S4jeWIsO+8jOaXoOaViOOAguS8sOiuoeaYr+ivlee6uOWdj+aOieWVpu+8jOmHjeaWsOa1i+WQp++9nlwiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6IFwi5aaC5L2V56Gu5a6a5o6S5Y215pe26Ze0XCIsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIFwi5Zyo5LiA5Liq5ZGo5pyf5YaF77yM5q+P5aSp5Zu65a6a5pe26Ze055So6K+V57q45rWL6YeP5LiA5qyh77yM6aaW5qyh5rWL5Yiw5by66Ziz6K+05piO5ZyoMjQtNDjlsI/ml7bkvJrmjpLljbXvvJtcIixcbiAgICAgICAgICAgIFwi5Ye6546w5by66Ziz5ZCO77yM6ZyA6KaB5bCG6aKR546H5pS55oiQ5q+PNOS4quWwj+aXtua1i+mHj+S4gOasoe+8jOWmguaenOa1i+WIsOW8uumYs+i9rOW8semYs++8jOivtOaYjuaOkuWNteW3sue7j+WPkeeUn++8m1wiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6IFwi5aaC5L2V5a6J5o6S54ix54ix5pe26Ze0XCIsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIFwi6aaW5qyh5rWL5Yiw5by66Ziz55qE5b2T5aSp54ix54ix77yM6ZqU5LiA5aSp5YaN54ix54ix5LiA5qyh77ybXCIsXG4gICAgICAgICAgICBcIua1i+WIsOW8uui9rOW8seS5i+WQjjXlsI/ml7bku6XlhoXvvIzlj6/ku6XlronmjpLkuIDmrKHniLHniLHvvZ5cIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgdGlwOiBcIuWYv+WYv++8muS4iui/sOmDveeIsea7oe+8jOW6lOivpeS4reWllueOh+W+iOmrmOWQp++8geS9huaYr+S7u+S9leS4gOasoeespuWQiOaPj+i/sOeahOeIseeIse+8jOW6lOivpemDveS8muacieS4reWlluWPr+iDveWTpu+9nlwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogXCLku4DkuYjmmK9MSOWAvFwiLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICBcIuajkuexs+aZuuiDveivhuWIq+e7meWHuueahExI5YC85piv6YCa6L+H5Zu+5YOP6K+G5Yir5YiG5p6Q77yM5q+U6L6D5rWL6K+V57q/VOWSjOWPgueFp+e6v0PnmoTmt7HmtYXnu5nlh7rnmoTlj4LogIPlgLzjgILnm67nmoTmmK/luK7liqnmraPlnKjliqrlipvlpIflrZXnmoTlpojlpojku6zmm7Tovbvmnb7nmoTliIbovqjlh7rmjpLljbXor5XnurjnmoTmtYvor5Xnu5PmnpzvvIzlh4bnoa7mib7lh7rmjpLljbXml7bpl7TjgIJcIixcbiAgICAgICAgICAgIFwi6L+Z6YeM55qETEjlgLzlubbkuI3mmK/lh4bnoa7nmoTkv4Ppu4TkvZPnlJ/miJDntKDvvIhMSO+8ieWQq+mHj+WAvOWTpu+8geWboOS4uuS4jeWQjOS9k+i0qOOAgeS4jeWQjOivlee6uOa1i+WHuuadpeeahOa3sea1hemDveacieW3ruW8gu+8jOWmguaenOmcgOimgeWHhuehrueahOWAvO+8jOaCqOmcgOimgeWOu+WMu+mZouWBmuWFremhuea/gOe0oOajgOa1i+WRou+9nlwiXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgYWN0aXZlSW5kZXg6IC0xLFxuICAgICAgcmVjb3JkczogW11cbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgdG9nZ2xlU2hvdyAoaW5kZXgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuYWN0aXZlSW5kZXggPSAoc2VsZi5hY3RpdmVJbmRleCA9PSBpbmRleCkgPyAtMSA6IGluZGV4XG4gICAgICB9XG4gICAgfVxuXG4gICAgb25TaG93KCkge1xuICAgICAgdGhpcy5yZWNvcmRzID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEucmVjb3Jkc1RvZGF5U2hvd1xuICAgIH1cbiAgfVxuIl19