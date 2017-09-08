//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    banner: [],
    showcase: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    headImg: []
  },
  
  onLoad: function () {
    var that = this//不要漏了这句，很重要
    wx.request({
      url: 'https://api-staging.bongmi.com/v1/w/index_banner',
      data: {
        language: 1,
        primary_num: 3,
        secondary_num: 0,
        terminal_type: 2
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          banner: res.data
        })
      }
    })
    wx.request({
      url: 'https://api-staging.bongmi.com/v1/w/index_banner',
      data: {
        language: 1,
        primary_num: 0,
        secondary_num: 5,
        terminal_type: 2
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          showcase: res.data
        })
      }
    })
  }
})
