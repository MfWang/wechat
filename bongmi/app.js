 //app.js
var util = require('utils/util')
App({
  onLaunch: function() {
    // var that = this;
    // that.loginWX()
    // .then(that.getWXUserInfo)
    // .then(that.getBMToken)
    // .then(that.updateBMUser)
    //   .then(that.getBMUserInfo)
    //   .then(that.getRecords)
    //   .then(that.convertRecord)
    //   // .then(that.getTips)
    // .then(function () {
    //   console.log('-------------------------------------')
    // })
    
  },
  getWXUserInfo: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      console.log('getWXUserInfo start')
        if (that.globalData.userInfo) {
        } else {
          //调用登录接口
          wx.getUserInfo({
            withCredentials: false,
            success: function (res) {
              console.log('getWXUserInfo success')
              that.globalData.userInfo = res.userInfo
              resolve()
            },
            fail: function (res) {
              console.log('getWXUserInfo fail')
              console.log(res)
              reject()
            }
          })
        }
    });
  },
  loginWX: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      console.log('login start')
      wx.login({
        success: res => {
          if (res.code) {
            console.log('login success')
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            that.globalData.code = res.code
            console.log(res.code)
            resolve()
          } else {
            console.log('login fail')
            reject();
            wx.showModal({
              title: '获取用户登录态失败',
              content: '重新登录？',
              success: function (res) {
                if (res.confirm) {
                  that.loginWX()
                } else if (res.cancel) {
                }
              }
            })
          }
        }
      })
    });
  },
  getBMToken: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      console.log('getBMToken start')
      wx.request({
        url: `${that.globalData.bongmiAPI}/wechat_mp/access_token`,
        data: {
          app_id: that.globalData.appid,
          code: that.globalData.code
        },
        success: function (res) {
          console.log('getBMToken success')
          console.log(res.data)
          that.globalData.bmUser = res.data;
          resolve()
        },
        fail: function () {
          console.log('getBMToken fail')
          reject()
        }
      })
    });
  },
  updateBMUser: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      console.log('updateBMUser start')
      wx.request({
        url: `${that.globalData.bongmiAPI}/user/${that.globalData.bmUser.userId}?access_token=${that.globalData.bmUser.accessToken}`,
        data: {
          id: that.globalData.bmUser.userId,
          nickname: that.globalData.userInfo.nickName,
          gender: that.globalData.userInfo.gender == 2 ? 'Female' : 'Male'
        },
        header: {
          authorization: 'Lollypop-Weixin-Mini-Program'
        },
        method: 'PUT',
        success: function (res) {
          console.log('updateBMUser success')
          resolve()
        }
      })
    });
    
  },
  getBMUserInfo: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      console.log('getBMUserInfo start')
      wx.request({
        url: `${that.globalData.bongmiAPI}/user/${that.globalData.bmUser.userId}`,
        data: {
          access_token: that.globalData.bmUser.accessToken
        },
        header: {
          authorization: 'Lollypop-Weixin-Mini-Program'
        },
        success: function (res) {
          console.log('getBMUserInfo success')
          that.globalData.bmUser = Object.assign(that.globalData.bmUser, res.data);
          console.log(that.globalData)
          resolve()
        }
      })
    });
    
  },
  takePhoto: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success: function (res) {
        that.globalData.pictureLocal = res.tempFilePaths[0]
        that.getQiniuToken(1);
      }
    });
  },
  getQiniuToken: function (pictureType) {
    const that = this;
    const bmUser = that.globalData.bmUser;
    wx.request({
      url: `${that.globalData.bongmiAPI}/user/${bmUser.userId}/upload_info`,
      data: {
        type: 2,
        access_token: bmUser.accessToken
      },
      header: {
        authorization: 'Lollypop-Weixin-Mini-Program'
      },
      success: function (res) {
        that.globalData.uploadInfo = res.data
        that.uploadPhoto(pictureType);
      }
    })
  },
  uploadPhoto: function (pictureType) {
    const that = this;
    const bmUser = that.globalData.bmUser;
    wx.uploadFile({
      url: `${that.globalData.qiniuUploadUrl}`,
      filePath: pictureType == 1 ? that.globalData.pictureLocal : that.globalData.tailorLocal,
      name: 'file',
      formData: {
        token: that.globalData.uploadInfo.uploadToken,
        key: that.globalData.uploadInfo.fileName
      },
      success: function (res) {
        const data = JSON.parse(res.data);
        if (pictureType == 1) {
          that.globalData.pictureOnline = data.key;
          wx.redirectTo({
            url: '/pages/cutInside/cutInside',
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
        } else {
          that.globalData.tailorOnline = data.key;
          wx.redirectTo({
            url: '/pages/result/result',
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
      }
    })
  },
  getTips: function () {
    const that = this;
    const bmUser = that.globalData.bmUser;
    return new Promise(function (resolve, reject) {
      console.log('getTips')
      wx.request({
        url: `${that.globalData.bongmiAPI}/wechat_mp/${bmUser.userId}/${bmUser.selfMemberId}/ovulation_test`,
        data: {
          app_flag: 1,
          access_token: bmUser.accessToken
        },
        header: {
          authorization: 'Lollypop-Weixin-Mini-Program'
        },
        success: function (res) {
          console.log(res.data)
          that.globalData.recordsAll = res.data;
          resolve()
        },
        fail: function () {
          reject()
        }
      })
    });
  },
  convertRecord: function () {
    const that = this;
    return new Promise(function (resolve, reject) {
      console.log('convertRecord start')
      const records = that.globalData.recordsAll;
      const recordsList = that.globalData.recordsAll.ovulationTestResultList;
      let date = '';
      recordsList.map((item) => {
        const time = new Date(item.timestamp * 1000);
        item.date = `${time.getMonth() + 1}月${time.getDate()}日`;
        console.log(item.date)
        if (item.date == date) {
          item.dateFlag = false;
        } else {
          item.dateFlag = true;
          date = item.date;
        }
        item.time = `${time.getHours() < 10 ? '0' + time.getHours() : time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`;
        item.type = item.resultType == 1 ? '阴性' : (item.resultType == 2 ? '弱阳' : '强阳');
        item.classname = item.resultType == 1 ? 'peak' : (item.resultType == 2 ? 'low' : 'high');
        item.tip = false;
      })
      that.globalData.recordsAll = {
        ovulationTestResultList: recordsList,
        triggerType: records.triggerType
      };
      console.log(that.globalData.recordsAll)
      console.log('convertRecord end')
      resolve()
    });
  },
  getRecords: function () {
    const that = this;
    const bmUser = that.globalData.bmUser;

    const date = new Date();
    const timestamp = Math.floor(date.getTime() / 1000);
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    const interval = h * 3600 + m * 60 + s;

    return new Promise(function (resolve, reject) {
      console.log('getRecords start')
      wx.request({
        url: `${that.globalData.bongmiAPI}/body_status/${bmUser.userId}/${bmUser.selfMemberId}/report/512/${timestamp}/${interval}`,
        data: {
          app_flag: 1,
          access_token: bmUser.accessToken
        },
        header: {
          authorization: 'Lollypop-Weixin-Mini-Program'
        },
        success: function (res) {
          console.log('getRecords success')
          const recordsToday = res.data[0]
          if (recordsToday) {
            recordsToday.detail = JSON.parse(recordsToday.detail);
            if (!recordsToday.detail.map) {
              recordsToday.detail = [recordsToday.detail];
            }
            that.globalData.recordsToday = recordsToday;
          }
          resolve()
        },
        fail: function () {
          console.log('getRecords fail')
          reject()
        }
      })
    });
  },
  globalData: {
    bongmiAPI: 'https://api-staging.bongmi.com/v1',
    appid: 'wx7e71d8c807fc0f58',
    secret: 'a76c9f9638f02c9b19d048a6fccefca1',
    code: null,
    bmUser: null,
    menstruationPeriodFlag: false,
    userInfo: null,
    pictureLocal: null,
    pictureOnline: null,
    tailorLocal: null,
    tailorOnline: null,
    result: null,
    qiniuUploadUrl: 'https://up.qbox.me',
    downloadUrl: 'https://img.bongmi.com',
    https: true,
    uploadInfo: null,
    todayBegin: 0,
    refresh: false,
    recordsAll: null,
    recordsToday: null,
  }
})
