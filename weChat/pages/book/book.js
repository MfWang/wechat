// pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('white')
    ctx.fillRect(0, 0, 350, 200)
    ctx.moveTo(0, 0)
    ctx.setFillStyle('#dcf7fe')
    ctx.fillRect(0, 0, 350, 60)

    ctx.moveTo(0, 60)
    ctx.setFillStyle('#8fbf69')
    ctx.fillRect(0, 60, 350, 4)
    ctx.moveTo(0, 64)
    ctx.setFillStyle('#a5cc6f')
    ctx.fillRect(0, 64, 350, 6)
    ctx.moveTo(0, 70)
    ctx.setFillStyle('#8fbf69')
    ctx.fillRect(0, 70, 350, 8)
    ctx.moveTo(0, 78)
    ctx.setFillStyle('#a5cc6f')
    ctx.fillRect(0, 78, 350, 14)
    ctx.moveTo(0, 92)
    ctx.setFillStyle('#8fbf69')
    ctx.fillRect(0, 92, 350, 18)
    ctx.moveTo(0, 110)
    ctx.setFillStyle('#a5cc6f')
    ctx.fillRect(0, 110, 350, 26)
    ctx.moveTo(0, 136)
    ctx.setFillStyle('#8fbf69')
    ctx.fillRect(0, 136, 350, 44)
    ctx.moveTo(0, 180)
    ctx.setFillStyle('#a5cc6f')
    ctx.fillRect(0, 180, 350, 50)
    ctx.moveTo(0, 230)
    ctx.setFillStyle('#8fbf69')
    ctx.fillRect(0, 230, 350, 20)
    ctx.closePath()

    ctx.setFillStyle('#9bd5d7')
    ctx.moveTo(0, 50)
    ctx.lineTo(40, 20)
    ctx.lineTo(80, 60)
    ctx.lineTo(0, 60)
    ctx.moveTo(0, 50)
    ctx.fill()
    ctx.moveTo(100, 60)
    ctx.lineTo(150, 40)
    ctx.lineTo(170, 50)
    ctx.lineTo(210, 20)
    ctx.lineTo(250, 50)
    ctx.lineTo(300, 40)
    ctx.lineTo(340, 58)
    ctx.lineTo(350, 50)
    ctx.lineTo(350, 60)
    ctx.lineTo(100, 60)
    ctx.fill()
    ctx.closePath()

    ctx.setFillStyle('#fff')
    ctx.moveTo(150, 60)
    ctx.lineTo(50, 250)
    ctx.lineTo(260, 250)
    ctx.lineTo(205, 60)
    ctx.fill()
    ctx.closePath()

    ctx.draw()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
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