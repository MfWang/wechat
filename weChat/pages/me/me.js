// pages/me/me.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    count: 0,
    userInfo: {},
    block: [
      [
        {
          "imgUrl": "images/user-wallet.png",
          "name": "钱包"
        }
      ],
      [
        {
          "imgUrl": "images/user-collection.png",
          "name": "收藏"
        },
        {
          "imgUrl": "images/user-photo.png",
          "name": "相册"
        },
        {
          "imgUrl": "images/user-card.png",
          "name": "卡包"
        },
        {
          "imgUrl": "images/user-expression.png",
          "name": "表情"
        }
      ],
      [
        {
          "imgUrl": "images/user-setting.png",
          "name": "设置"
        }
      ]
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})