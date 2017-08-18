var app = getApp()

Page({
  onLoad: function() {
    this.setData({
      _timeStamp: wx.getStorageSync("_timeStamp")
    })
  },

  updata: function(){
    wx.clearStorage()
    wx.redirectTo({
      url: '/pages/load/load?page=about'
    })
  },

  onReachBottom: function() {}
})