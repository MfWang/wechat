// pages/result/result.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: null,
    show: {
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
    const show = that.data.show;
    show.index = index;
    this.setData({
      show: show
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
    wx.request({
      url: `${app.globalData.bongmiAPI}/body_status/${bmUser.userId}/ovulation?url=` + encodeURIComponent(`${app.globalData.downloadUrl}/${app.globalData.tailorOnline}`),
      data: {
        access_token: bmUser.accessToken
      },
      header: {
        authorization: 'Lollypop-Weixin-Mini-Program'
      },
      success: function (res) {
        console.log('--------------')
        console.log(res)
        const data = res.data;
        const result = JSON.parse(JSON.stringify(res.data));
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
        console.log(data)
        console.log(data)
        that.setData({
          result: result,
          show: data,
          flag: true
        });
      }
    })
  },
  uploadOvulation: function () {
    var that = this;
    const bmUser = app.globalData.bmUser;
    const result = that.data.result;
    const show = that.data.show;
    if (show.index == -1) {
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
      if (show.index == 0) {
        result.resultType = 3
      } else if (show.index == 1) {
        result.resultType = 2
      } else if (show.index == 2) {
        result.resultType = 1
      }
      result.originalImgUrl = `${app.globalData.downloadUrl}/${app.globalData.pictureOnline}`;
      result.timestamp = Math.floor(new Date().valueOf() / 1000)
      console.log('------注意----------')
      if (app.globalData.recordsToday == null) {
        var date = new Date();
        date.setHours(0);
        date.setMilliseconds(0);
        date.setSeconds(0);
        date.setMinutes(0);
        console.log(result)
        app.globalData.recordsToday = {
          timestamp: Math.floor(date.valueOf() / 1000),
          // timestamp: 1505318400,
          type: 'OVULATION_TEST',
          userId: bmUser.userId,
          familyMemberId: bmUser.selfMemberId,
          detail: result,
          appFlag: 1,
        }
      } else {
        app.globalData.recordsToday.detail.push(result)
      }
      var data = app.globalData.recordsToday
      data.detail = JSON.stringify(data.detail)
      console.log('上传')
      console.log(data)
      wx.request({
        url: `${app.globalData.bongmiAPI}/body_status/${bmUser.userId}/${bmUser.selfMemberId}?access_token=${bmUser.accessToken}`,
        data: data,
        header: {
          authorization: 'Lollypop-Weixin-Mini-Program'
        },
        method: "PUT",
        success: function (res) {
          app.globalData.refresh = true;
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