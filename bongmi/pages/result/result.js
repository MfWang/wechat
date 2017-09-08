// pages/result/result.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: {
      index: -1
    },
    flag: false,
    results: [
      {
        "img": "./images/high.png",
        "name": "强阳"
      },
      {
        "img": "./images/low.png",
        "name": "弱阳"
      },
      {
        "img": "./images/peak.png",
        "name": "阴性"
      }
    ]
  },
  changeResult: function(e) {
    var that = this;
    const index = e.currentTarget.id.split('_')[1];
    const result = that.data.result;
    result.index = index;
    this.setData({
      result: result
    })
  },
  takePhoto: function () {
    app.takePhoto();
  },
  getCropperImage: function () {
    this.uploadOvulation();
  },
  getResult: function () {
    var that = this;
    const bmUser = app.globalData.bmUser;
    // app.globalData.tailorOnline = 'ovulation-test-paper/55159/67e555ad-a03d-4933-92f9-8e69063ee66f'
    wx.request({
      url: `${app.globalData.bongmiAPI}/body_status/${bmUser.userId}/ovulation?url=` + encodeURIComponent(`${app.globalData.downloadUrl}/${app.globalData.tailorOnline}`),
      data: {
        access_token: bmUser.accessToken
      },
      header: {
        authorization: 'Lollypop-Weixin-Mini-Program'
      },
      success: function (res) {
        console.log(res)
        
        const data = res.data;
        if (data.detectType == 3) {
          data.text = '检测失败';
          data.index = -1;
        } else {
          if (data.resultType == 1) {
            data.text = '阴性'
            data.index = 2;
          } else if (data.resultType == 2) {
            data.text = '弱阳'
            data.index = 1;
          } else if (data.resultType == 3) {
            data.text = '强阳'
            data.index = 0;
          }
        }
        data.testLineX = data.testLineX + '%'
        data.refLineX = data.refLineX + '%'
        // data.testLineX = data.testLineX / 100 * 100% 
        // data.refLineX = data.refLineX / 100 * 100%
        console.log(data)
        that.setData({
          result: data,
          flag: true
        });
      }
    })
  },
  uploadOvulation: function () {
    var that = this;
    const bmUser = app.globalData.bmUser;
    const result = that.data.result;
    if (that.data.result.index == -1) {
      wx.showModal({
        title: '提示',
        content: '请选择检测结果再上传',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {
      if (that.data.result.index == 0) {
        result.resultType = 3
      } else if (that.data.result.index == 1) {
        result.resultType = 2
      } else if (that.data.result.index == 2) {
        result.resultType = 1
      }
      result.originalImgUrl = `${app.globalData.downloadUrl}/${app.globalData.pictureOnline}`;
      wx.request({
        url: `${app.globalData.bongmiAPI}/body_status/${bmUser.userId}/${bmUser.selfMemberId}?access_token=${bmUser.accessToken}`,
        data: {
          timestamp: Math.floor(new Date().valueOf() / 1000),
          type: 'OVULATION_TEST',
          userId: bmUser.userId,
          familyMemberId: bmUser.selfMemberId,
          detail: JSON.stringify(result),
          appFlag: 1,
        },
        header: {
          authorization: 'Lollypop-Weixin-Mini-Program'
        },
        method: "PUT",
        success: function (res) {
          app.globalData.refreshToday = true;
          app.globalData.refreshRecord = true;
          wx.switchTab({
            url: '/pages/today/today'
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getResult();
  }
})