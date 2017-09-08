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

  getRecords: function () {
    const that = this;
    const bmUser = app.globalData.bmUser;
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    const timestamp = Math.floor(date.getTime() / 1000);
    const interval = timestamp;
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
        console.log('getRecords success')
        console.log(res.data)
        const record = [];
        let refDate = '';
        let refObj = '';
        res.data && res.data.map((item, index) => {
          const detail = JSON.parse(item.detail);
          const time = new Date(item.timestamp * 1000);
          item.date = time.getMonth() + 1 + '月' + time.getDay() + '号'
          item.time = `${time.getHours() < 10 ? '0' + time.getHours() : time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`;
          item.detail = detail;
          item.type = item.detail.resultType == 1 ? '阴性' : (item.detail.resultType == 2 ? '弱阳' : '强阳');
          item.classname = item.detail.resultType == 1 ? 'peak' : (item.detail.resultType == 2 ? 'low' : 'high');
          if (item.date == refDate) {
            item.dateFlag = false;
          } else {
            item.dateFlag = true;
            refDate = item.date;
          }
          item.lineTag = true;
          if (index != 0 && item.dateFlag) {
            record[index - 1].lineTag = false;
          }
          record.push(item)
        });
        that.setData({
          records: record,
          menstruationPeriod: app.globalData.bmUser.menstruationPeriod
        }, () => {
          wx.hideLoading()
        })
      }
    })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
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
  onShow: function () {
    var that = this;
    console.log(app.globalData);
    if (app.globalData.userInfo) {
      if (!that.data.records) {
        wx.showLoading({
          title: '数据加载中',
          mask: true
        })
        that.getRecords()
      } else if (app.globalData.refreshRecord) {
        wx.showLoading({
          title: '数据加载中',
          mask: true
        })
        app.globalData.refreshRecord = false;
        that.getRecords()
      }
      
    } else {
      app.getWXSetting()
        .then(app.authorize)
        .then(app.openWXSetting)
        .then(() => {
          wx.showLoading({
            title: '数据加载中',
            mask: true
          })
        })
        .then(app.loginWX)
        .then(app.getWXUserInfo)
        .then(app.getBMToken)
        .then(app.updateBMUser)
        .then(app.getBMUserInfo)
        .then(() => {
          that.getRecords()
        })
        .catch(function () {
          wx.hideLoading()
        })
    }
  }
})