// pages/today/today.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 2,
    guide: [
      [
        {
          "desc": "您的周期为50天，建议您咨询一下专科医生，或者在经期结束之后，即刻开始坚持记录排卵试纸情况～"
        }
      ],
      [
        {
          "desc": "强阳转弱阳出现了！排卵已经发生，5个小时内的爱爱也还是有很高的中奖几率的！",
          "desc2": "您如果不能确定身体是否完全健康，可以坚持继续测量排卵试纸。因为有一些疾病可能会造成一个周期内出现多次小的强阳弱阳的交替变化，如果您发现这种情况，也不用胡思乱想，及时去看一下医生就好～"
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
          "desc": "您的周期为26天，请在周期第9天开始使用排卵试纸～"
        }
      ],
      [
        {
          "desc": "您还没有设置过周期长度，设置周期长度后，小助手可以指导您使用排卵试纸的时间。"
        }
      ]
    ],
    records: []
  },

  takePhoto: function () {
    app.takePhoto();
  },

  
  getRecords: function () {

    const that = this;
    const bmUser = app.globalData.bmUser;
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    const timestamp = Math.floor(date.getTime() / 1000);
    const interval = h * 3600 + m * 60 + s;
    console.log('getRecords')
    console.log(app.globalData)
    wx.request({
      url: `${app.globalData.bongmiAPI}/body_status/${bmUser.userId}/${bmUser.selfMemberId}/report/512/${timestamp}/${interval}`,
      data: {
        app_flag: 1,
        access_token: bmUser.accessToken
      },
      header: {
        authorization: 'Lollypop-Weixin-Mini-Program'
      },
      success: function (res) {
        const record = [];
        res.data && res.data.map((item) => {
          const detail = JSON.parse(item.detail);
          const time = new Date(item.timestamp * 1000);
          item.time = `${time.getHours() < 10 ? '0' + time.getHours() : time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`;
          item.detail = detail;
          item.type = item.detail.resultType == 1 ? '阴性' : (item.detail.resultType == 2 ? '弱阳' : '强阳');
          item.classname = item.detail.resultType == 1 ? 'peak' : (item.detail.resultType == 2 ? 'low' : 'high');
          item.tip = false;
          record.push(item)
        });
        that.setData({
          records: record
        }, () => {
          wx.hideLoading()
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  getWXSetting: function () {
    var that = this;
    console.log('getWXSetting start')
    wx.getSetting({
      success() {
        console.log('getWXSetting success')
        that.authorize()
      },
      fail: function () {
        console.log('接口调用失败')
      }
    })
  },
  authorize: function (res) {
    var that = this;
    console.log('authorize start')
    if (!res.authSetting['scope.userInfo']) {
      wx.authorize({
        scope: 'scope.userInfo',
        success() {
          console.log('authorize success')
          that.openWXSetting()
        },
        fail: function () {
          console.log('authorize fail')
          resolve(true)
        }
      })
    }
  },
  openWXSetting: function (flag) {
    var that = this;
    console.log('openWXSetting start')
    wx.openSetting({
      success: (res) => {
        console.log(66)
        resolve()
      },
      fail: (res) => {
        console.log(res)
      },
      complete: (res) => {
        console.log(0)
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var that = this;
    if (app.globalData.userInfo) {
      if (!that.data.records) {
        wx.showLoading({
          title: '数据加载中',
          mask: true
        })
        that.getRecords()
      } else if (app.globalData.refreshToday) {
        wx.showLoading({
          title: '数据加载中',
          mask: true
        })
        app.globalData.refreshToday = false;
        that.getRecords()
      }
      
    } else {
      console.log('没有数据，从头开始')
      if(wx.getSetting){
        wx.getSetting({
          success(res) {
              if (!res.authSetting['scope.userInfo']) {
                  wx.authorize({
                      scope: 'scope.userInfo',
                      success() {
                          console.log(222)
                      }
                  })
              }
          }
        })
      }else{
          //不兼容处理
          console.log('哭死，不兼容')
          wx.showModal({
            title: '提示',
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
          })
      }
      
      // app.loginWX()
      //   .then(app.authorize)
      //   .then(app.openWXSetting)
      //   .then(() => {
      //     wx.showLoading({
      //       title: '数据加载中',
      //       mask: true
      //     })
      //   })
      //   .then(app.loginWX)
      //   .then(app.getWXUserInfo)
      //   .then(app.getBMToken)
      //   .then(app.updateBMUser)
      //   .then(app.getBMUserInfo)
      //   .then(() => {
      //     that.getRecords()
      //   })
      //   .catch(function (res) {
      //     console.log('catch')
      //     console.log(res)
      //     wx.hideLoading()
      //   })
    }
  }

})