'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
      activeIndex: -1
    }, _this.methods = {
      toggleShow: function toggleShow(index) {
        var self = this;
        self.activeIndex = self.activeIndex == index ? -1 : index;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Guide;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Guide , 'pages/guide'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImd1aWRlLmpzIl0sIm5hbWVzIjpbIkd1aWRlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJsaXN0IiwidGl0bGUiLCJpbWciLCJpdGVtcyIsInRpcCIsImFjdGl2ZUluZGV4IiwibWV0aG9kcyIsInRvZ2dsZVNob3ciLCJpbmRleCIsInNlbGYiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsSSxHQUFPO0FBQ0xDLFlBQU0sQ0FDSjtBQUNFQyxlQUFPLE9BRFQ7QUFFRUMsYUFBSyxtQ0FGUDtBQUdFQyxlQUFPLENBQ0wsb0JBREssRUFFTCxpQkFGSyxFQUdMLFlBSEssRUFJTCwyQkFKSztBQUhULE9BREksRUFXSjtBQUNFRixlQUFPLFVBRFQ7QUFFRUUsZUFBTyxDQUNMLDJDQURLLEVBRUwsNENBRks7QUFGVCxPQVhJLEVBa0JKO0FBQ0VGLGVBQU8sVUFEVDtBQUVFRSxlQUFPLENBQ0wsdUJBREssRUFFTCx3QkFGSyxDQUZUO0FBTUVDLGFBQUs7QUFOUCxPQWxCSSxFQTBCSjtBQUNFSCxlQUFPLFFBRFQ7QUFFRUUsZUFBTyxDQUNMLHNGQURLLEVBRUwsMkVBRks7QUFGVCxPQTFCSSxDQUREO0FBbUNMRSxtQkFBYSxDQUFDO0FBbkNULEssUUFzQ1BDLE8sR0FBVTtBQUNSQyxnQkFEUSxzQkFDSUMsS0FESixFQUNXO0FBQ2pCLFlBQU1DLE9BQU8sSUFBYjtBQUNBQSxhQUFLSixXQUFMLEdBQW9CSSxLQUFLSixXQUFMLElBQW9CRyxLQUFyQixHQUE4QixDQUFDLENBQS9CLEdBQW1DQSxLQUF0RDtBQUNEO0FBSk8sSzs7OztFQTNDdUIsZUFBS0UsSTs7a0JBQW5CZCxLIiwiZmlsZSI6Imd1aWRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VpZGUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvb/nlKjmjIflr7wnXG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIGxpc3Q6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiBcIuW8uuW8semYs+ivhuWIq1wiLFxuICAgICAgICAgIGltZzogXCIuLi9pbWFnZXMvZ3VpZGVfcGljX2tub3dsZWRnZS5wbmdcIixcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgXCLmtYvor5Xnur/popzoibLnrYnkuo7miJbmt7Hkuo7lj4LogIPnur/vvIzkuLrlvLrpmLPvvJtcIixcbiAgICAgICAgICAgIFwi5rWL6K+V57q/6aKc6Imy5rWF5LqO5Y+C6ICD57q/77yM5Li65byx6Ziz77ybXCIsXG4gICAgICAgICAgICBcIua1i+ivlee6v+eci+S4jeWIsO+8jOmYtOaAp++8mlwiLFxuICAgICAgICAgICAgXCLkuKTmnaHnur/pg73nnIvkuI3liLDvvIzml6DmlYjjgILkvLDorqHmmK/or5XnurjlnY/mjonllabvvIzph43mlrDmtYvlkKfvvZ5cIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiBcIuWmguS9leehruWumuaOkuWNteaXtumXtFwiLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICBcIuWcqOS4gOS4quWRqOacn+WGhe+8jOavj+WkqeWbuuWumuaXtumXtOeUqOivlee6uOa1i+mHj+S4gOasoe+8jOmmluasoea1i+WIsOW8uumYs+ivtOaYjuWcqDI0LTQ45bCP5pe25Lya5o6S5Y2177ybXCIsXG4gICAgICAgICAgICBcIuWHuueOsOW8uumYs+WQju+8jOmcgOimgeWwhumikeeOh+aUueaIkOavjzTkuKrlsI/ml7bmtYvph4/kuIDmrKHvvIzlpoLmnpzmtYvliLDlvLrpmLPovazlvLHpmLPvvIzor7TmmI7mjpLljbXlt7Lnu4/lj5HnlJ/vvJtcIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiBcIuWmguS9leWuieaOkueIseeIseaXtumXtFwiLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICBcIummluasoea1i+WIsOW8uumYs+eahOW9k+WkqeeIseeIse+8jOmalOS4gOWkqeWGjeeIseeIseS4gOasoe+8m1wiLFxuICAgICAgICAgICAgXCLmtYvliLDlvLrovazlvLHkuYvlkI415bCP5pe25Lul5YaF77yM5Y+v5Lul5a6J5o6S5LiA5qyh54ix54ix772eXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIHRpcDogXCLlmL/lmL/vvJrkuIrov7Dpg73niLHmu6HvvIzlupTor6XkuK3lpZbnjoflvojpq5jlkKfvvIHkvYbmmK/ku7vkvZXkuIDmrKHnrKblkIjmj4/ov7DnmoTniLHniLHvvIzlupTor6Xpg73kvJrmnInkuK3lpZblj6/og73lk6bvvZ5cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGl0bGU6IFwi5LuA5LmI5pivTEjlgLxcIixcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgXCLmo5LnsbPmmbrog73or4bliKvnu5nlh7rnmoRMSOWAvOaYr+mAmui/h+WbvuWDj+ivhuWIq+WIhuaekO+8jOavlOi+g+a1i+ivlee6v1Tlkozlj4Lnhafnur9D55qE5rex5rWF57uZ5Ye655qE5Y+C6ICD5YC844CC55uu55qE5piv5biu5Yqp5q2j5Zyo5Yqq5Yqb5aSH5a2V55qE5aaI5aaI5Lus5pu06L275p2+55qE5YiG6L6o5Ye65o6S5Y216K+V57q455qE5rWL6K+V57uT5p6c77yM5YeG56Gu5om+5Ye65o6S5Y215pe26Ze044CCXCIsXG4gICAgICAgICAgICBcIui/memHjOeahExI5YC85bm25LiN5piv5YeG56Gu55qE5L+D6buE5L2T55Sf5oiQ57Sg77yITEjvvInlkKvph4/lgLzlk6bvvIHlm6DkuLrkuI3lkIzkvZPotKjjgIHkuI3lkIzor5XnurjmtYvlh7rmnaXnmoTmt7HmtYXpg73mnInlt67lvILvvIzlpoLmnpzpnIDopoHlh4bnoa7nmoTlgLzvvIzmgqjpnIDopoHljrvljLvpmaLlgZrlha3pobnmv4DntKDmo4DmtYvlkaLvvZ5cIlxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGFjdGl2ZUluZGV4OiAtMVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0b2dnbGVTaG93IChpbmRleCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5hY3RpdmVJbmRleCA9IChzZWxmLmFjdGl2ZUluZGV4ID09IGluZGV4KSA/IC0xIDogaW5kZXhcbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==