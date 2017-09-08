// pages/guide/guide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        title: "强弱阳识别",
        img: "images/guide_pic_knowledge.png",
        items: [
          "测试线颜色等于或深于参考线，为强阳；",
          "测试线颜色浅于参考线，为弱阳；",
          "测试线看不到，阴性：",
          "两条线都看不到，无效。估计是试纸坏掉啦，重新测吧～"
        ]
      },
      {
        title: "如何确定排卵时间",
        items: [
          "在一个周期内，每天固定时间用试纸测量一次，首次测到强阳说明在24-48小时会排卵；",
          "出现强阳后，需要将频率改成每4个小时测量一次，如果测到强阳转弱阳，说明排卵已经发生；"
        ]
      },
      {
        title: "如何安排爱爱时间",
        items: [
          "首次测到强阳的当天爱爱，隔一天再爱爱一次；",
          "测到强转弱之后5小时以内，可以安排一次爱爱～"
        ],
        tip: "嘿嘿：上述都爱满，应该中奖率很高吧！但是任何一次符合描述的爱爱，应该都会有中奖可能哦～"
      },
      {
        title: "什么是LH值",
        items: [
          "棒米智能识别给出的LH值是通过图像识别分析，比较测试线T和参照线C的深浅给出的参考值。目的是帮助正在努力备孕的妈妈们更轻松的分辨出排卵试纸的测试结果，准确找出排卵时间。",
          "这里的LH值并不是准确的促黄体生成素（LH）含量值哦！因为不同体质、不同试纸测出来的深浅都有差异，如果需要准确的值，您需要去医院做六项激素检测呢～"
        ]
      }
    ],
    active_index: -1
  },

  toggleShow: function (event) {
    const that = this;
    const index = event.currentTarget.dataset.index;
    if (this.data.active_index == index) {
      that.setData({
        active_index: -1 
      });
    } else {
      that.setData({
        active_index: index
      });
    }
  }
  
})