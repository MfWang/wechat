// pages/discover/discover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  takePhoto: function () {
    var that = this;
    wx.chooseImage({
      count: 1, //张数， 默认9
      sizeType: ['compressed'], //建议压缩图
      sourceType: ['camera'], // 来源是相册、相机
      success: function (res) {
        let str = JSON.stringify(res);
        console.log(res)
        wx.navigateTo({
          url: '/pages/cutInside/cutInside?jsonStr=' + str,
          success: function (res) {
            console.log('success')
            // success
          },
          fail: function (res) {
            console.log(res)
            // fail
          },
          complete: function () {
            console.log('complete')
            // complete
          }
        })
      }
    });
  }
})