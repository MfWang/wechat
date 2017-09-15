// pages/today/today.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    guide: [
      [
        {
          "desc": "您还没有设置过周期长度，设置周期长度后，小助手可以指导您使用排卵试纸的时间。"
        }
      ],
      [
        {
          "desc": "您的周期为X天，请在周期第N天开始使用排卵试纸"
        }
      ],
      [
        {
          "desc": "您的周期过短，建议您咨询一下专科医生，或者在经期结束之后，即刻开始坚持记录排卵试纸情况～"
        }
      ],
      [
        {
          "desc": "您的周期较长，建议您咨询一下专科医生，或者您预计下次经期来潮之前20天开始记录排卵试纸情况～"
        }
      ],
      [
        {
          "desc": "在一个周期里，出现强阳之后，需要增加测量频率，最好能保证四个小时测量一次。",
          "desc2": "因为24-48小时随时都有可能发生排卵，排卵后立刻会转成弱阳。需要增加频率来更精确的捕捉到强阳转弱阳的时间。"
        },
        {
          "desc": "出现强阳之后的当天可以安排爱爱哦！然后隔天再爱爱一次，直到捕捉到强阳转弱阳～如此，中奖的几率能大大提高呢！",
          "desc2": ""
        }
      ],
      [
        {
          "desc": "在一个周期内出现强阳转弱阳，说明排卵已经发生，5个小时内的爱爱也还是有很高的中奖几率的！",
          "desc2": "您如果不能确定身体是否完全健康，可以坚持继续测量排卵试纸。因为有一些疾病可能会造成一个周期内出现多次小的强阳弱阳的交替变化，如果您发现这种情况，也不用胡思乱想，及时去看一下医生就好～"
        }
      ],
    ],
    records: null
  },

  takePhoto: function () {
    app.takePhoto();
  },
  setting: function () {
    wx.switchTab({
      url: '/pages/record/record'
    })
  },
  handleData: function () {
    const that = this;
    return new Promise(function (resolve, reject) {
      console.log('handleData start')
      const date = new Date();
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      const timestamp = Math.floor(date.getTime() / 1000) - (h * 3600 + m * 60 + s);

      const records = app.globalData.recordsAll.ovulationTestResultList.filter((item) => (item.timestamp >= timestamp))
      that.setData({
        records: records
      })
      console.log('handleData end')
      resolve()
    });
  },
  regetAuth: function () {
    const that = this;
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        console.log('getWXUserInfo success')
        app.globalData.userInfo = res.userInfo

        // wx.showLoading({
        //   title: '数据加载中',
        //   mask: true
        // })
        app.loginWX()
          .then(app.getBMToken)
          .then(app.updateBMUser)
          .then(app.getBMUserInfo)
          .then(app.getTips)
          .then(app.convertRecord)
          .then(app.getRecords)
          .then(that.handleData)
          .then(that.setTriggerType)
      },
      fail: function (res) {
        console.log('getWXUserInfo fail')
        console.log(res)
        wx.showModal({
          title: '是否要打开设置页面重新授权',
          content: '需要获取您的公开信息(昵称、头像等)',
          confirmColor: '#E56CAC',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.openSetting({
                success: (res) => {

                  // wx.showLoading({
                  //   title: '数据加载中',
                  //   mask: true
                  // })
                  app.loginWX()
                    .then(app.getBMToken)
                    .then(app.updateBMUser)
                    .then(app.getBMUserInfo)
                    .then(app.getTips)
                    .then(app.convertRecord)
                    .then(app.getRecords)
                    .then(that.handleData)
                    .then(that.setTriggerType)
                },
                fail: (res) => {
                },
                complete: (res) => {
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  setTriggerType: function () {
    const that = this;
    return new Promise(function (resolve, reject) {
      console.log('setTriggerType start')
      let triggerType = '';
      triggerType = () => {
        switch (app.globalData.recordsAll.triggerType) {
          case 1:
            const menstruationPeriod = app.globalData.bmUser.menstruationPeriod;
            if (menstruationPeriod) {
              if (menstruationPeriod < 21) {
                return 2;
              } else if (menstruationPeriod > 41) {
                return 3;
              } else {
                const guide = that.data.guide;
                const period = [6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
                return period[menstruationPeriod - 21];
                guide[1] = {
                  "desc": `您的周期为${menstruationPeriod}天，请在周期第${period[menstruationPeriod - 21]}天开始使用排卵试纸`
                }
                this.setData({
                  guide: guide
                })
                return 1;
              }
            } else {
              return 0;
            }
          case 2: return 4;
          case 3: return 5;
        }
      }
      that.setData({
        index: triggerType()
      })
      console.log('setTriggerType end')
      resolve()
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    console.log('onshow')
    const that = this;
    console.log('today')
    if (app.globalData.userInfo) {
      if (app.globalData.refresh) {
        console.log(2)
        // wx.showLoading({
        //   title: '数据加载中',
        //   mask: true
        // })
        app.getTips()
          .then(app.convertRecord)
          .then(app.getRecords)
          .then(that.handleData)
          .then(that.setTriggerType)
      } else {
        console.log(that.data.records)
          that.handleData()
          .then(that.setTriggerType)
      }
      if (app.globalData.menstruationPeriodFlag) {
        console.log(3)
        that.setTriggerType();
      }
    } else {
      that.regetAuth()
    }
  }
})