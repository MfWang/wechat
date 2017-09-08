 //app.js
var util = require('utils/util')
App({
  onLaunch: function() {

    // var that = this;
    // that.loginWX()
    // .then(that.getWXUserInfo)
    // .then(that.getBMToken)
    // .then(that.updateBMUser)
    // .then(that.getBMUserInfo)
    // .then(function () {
    //   console.log(that.globalData);
    // })
    
  },
  getWXSetting: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      console.log('getWXSetting start')
      wx.getSetting({
        success(res) {
          console.log('getWXSetting success')
          resolve(res)
        },
        fail: function (res) {
          console.log('接口调用失败')
          reject();
        }
      })
    });
  },
  authorize: function (res) {
    var that = this;
    return new Promise(function (resolve, reject) {
      console.log('authorize start')
      if (!res.authSetting['scope.userInfo']) {
        console.log(222)
        wx.authorize({
          scope: 'scope.userInfo',
          success() {
            console.log('authorize success')
            resolve(false)
          },
          fail: function () {
            console.log('authorize fail')
            resolve(true)
          }
        })
      } else {
        console.log('authorize else')
        resolve(false)
      }
    });
  },
  openWXSetting: function (flag) {
    var that = this;
    return new Promise(function (resolve, reject) {
      console.log('openWXSetting start')
      console.log(flag)
      if (!flag) {
        resolve()
      } else {
        wx.openSetting({
          success: (res) => {
            console.log(66)
            resolve()
          },
          fail: (res) => {
            console.log(res)
          },
          complete: (res) => {
            console.log(0)
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
  globalData: {
    bongmiAPI: 'https://api-staging.bongmi.com/v1',
    appid: 'wx7e71d8c807fc0f58',
    secret: 'a76c9f9638f02c9b19d048a6fccefca1',
    code: null,
    bmUser: null,
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
    refreshToday: false,
    refreshRecord: false,
  }
})
