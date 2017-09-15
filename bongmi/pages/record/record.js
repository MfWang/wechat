// pages/record/record.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: null,
    array: [],
    menstruationPeriod: 0
  },
  bindPickerChange: function (e) {
    const that = this;
    const days = parseInt(e.detail.value, 10) + 10;
    if (days != that.data.minPeriodDays) {
      wx.showModal({
        title: '提示',
        content: '确认修改周期长度？',
        success: function (res) {
          if (res.confirm) {
            that.updatePeriodDays(days);
            wx.showLoading({
              title: '更新中',
              mask: true
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  updatePeriodDays: function (days) {
    var that = this;
    wx.request({
      url: `${app.globalData.bongmiAPI}/user/${app.globalData.bmUser.userId}?access_token=${app.globalData.bmUser.accessToken}`,
      data: {
        menstruationPeriod: days
      },
      header: {
        authorization: 'Lollypop-Weixin-Mini-Program'
      },
      method: 'PUT',
      success: function (res) {
        setTimeout(function () {
          that.setData({
            menstruationPeriod: days
          }, () => {
            app.globalData.bmUser.menstruationPeriod = days;
            app.globalData.menstruationPeriodFlag = true;
            wx.hideLoading()
            wx.showToast({
              title: '更新成功',
              icon: 'success',
              duration: 2000
            })
          })
        }, 2000)
      },
      fail: function (res) {
        console.log('fail')
        console.log(res)
      }
    })
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
          .then(() => {
            that.setData({
              menstruationPeriod: app.globalData.bmUser.menstruationPeriod,
              records: app.globalData.recordsAll.ovulationTestResultList
            }, () => {
              wx.hideLoading()
            })
          })
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
                    .then(() => {
                      that.setData({
                        menstruationPeriod: app.globalData.bmUser.menstruationPeriod,
                        records: app.globalData.recordsAll.ovulationTestResultList
                      }, () => {
                        wx.hideLoading()
                      })
                    })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    var array = [];
    for (let i = 10; i <= 90; i++) {
      array.push(i)
    }
    that.setData({
      array: array
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    const that = this;
    if (app.globalData.userInfo) {
      if (app.globalData.refresh) {
        // wx.showLoading({
        //   title: '数据加载中',
        //   mask: true
        // })
        app.getTips()
          .then(app.convertRecord)
          .then(app.getRecords)
          .then(() => {
            that.setData({
              menstruationPeriod: app.globalData.bmUser.menstruationPeriod,
              records: app.globalData.recordsAll.ovulationTestResultList
            }, () => {
              wx.hideLoading()
            })
          })
      } else {
        // wx.showLoading({
        //   title: '数据加载中',
        //   mask: true
        // })
        that.setData({
          menstruationPeriod: app.globalData.bmUser.menstruationPeriod,
          records: app.globalData.recordsAll.ovulationTestResultList
        }, () => {
          wx.hideLoading()
        })
      }
    } else {
      that.regetAuth()
    }
  }
})