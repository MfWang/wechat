<style lang="less">
  @import 'style/weui.wxss';
  page{
      width: 100%;
      height: 100%;
      background: #fff;
      font-family: Arial, Helvetica, sans-serif;
      overflow-x: hidden;
      border-top: 1rpx solid rgba(0,0,0,0.12);
  }

  .flex{
      display: flex;
      justify-content: center;
      align-items: center;
  }

  @font-face {
    font-family: 'iconfont';
    src: url(data:application/font-woff;charset=utf-8;base64,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) format('woff'),
      url('iconfont.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  .iconfont {
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-guide_icon_heart:before { content: "\e64a"; }

  .icon-btn_back:before { content: "\e64b"; }

  .icon-btn_correct:before { content: "\e64c"; }

  .icon-btn_camera:before { content: "\e64d"; }
</style>

<script>
  import wepy from 'wepy'
  import 'wepy-async-function'

  export default class extends wepy.app {
    config = {
      pages: [
        'pages/today',
        'pages/record',
        'pages/guide',
        'pages/result'
      ],
      tabBar: {
        "color": "#A0A0A0",
        "selectedColor": "#E56CAC",
        "borderStyle": "black",
        "backgroundColor": "#FBFBFB",
        "list": [
          {
            "selectedIconPath": "images/btn_guide_press.png",
            "iconPath": "images/btn_guide.png",
            "pagePath": "pages/guide",
            "text": "使用指导"
          },
          {
            "selectedIconPath": "images/btn_today_press.png",
            "iconPath": "images/btn_today.png",
            "pagePath": "pages/today",
            "text": "今日信息"
          },
          {
            "selectedIconPath": "images/btn_edit_press.png",
            "iconPath": "images/btn_edit.png",
            "pagePath": "pages/record",
            "text": "我的记录"
          }
        ]
      },
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      }
    }

    globalData = {
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
      recordsTodayShow: null,
      recordsToday: null,
      datePicker: []
    }

    constructor () {
      super()
      this.use('requestfix')
    }

    onLaunch() {
    }

    async tryAuthAgain () {
      const self = this
      const bmUser = self.globalData.bmUser
      return new Promise(function (resolve, reject) {
        console.log('tryAuthAgain start')
        wx.showModal({
          title: '是否要打开设置页面重新授权',
          content: '需要获取您的公开信息(昵称、头像等)',
          confirmColor: '#E56CAC',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.openSetting({
                success: (res) => {
                  console.log('tryAuthAgain success')
                  resolve('true')
                },
                fail: (res) => {
                  resolve('false')
                },
                complete: (res) => {
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
              resolve('false')
            }
          }
        })
      })
    }

    async getUserInfo() {
      const self = this
      return new Promise((resolve, reject) => {
      console.log('getWXUserInfo start')
        wx.getUserInfo({
          success (res) {
            self.globalData.userInfo = res.userInfo
            console.log('getWXUserInfo success')
            resolve('true')
          },
          fail (res) {
            console.log('getWXUserInfo fail')
            resolve('false')
          }
        })
      })
    }

    async loginWX () {
      const self = this
      return new Promise(function (resolve, reject) {
        console.log('login start')
        wx.login({
          success: res => {
            if (res.code) {
              console.log('login success')
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              self.globalData.code = res.code
              console.log(res.code)
              resolve('true')
            } else {
              console.log('login fail')
              wx.showModal({
                title: '获取用户登录态失败',
                content: '重新登录？',
                success: function (res) {
                  if (res.confirm) {
                    self.loginWX()
                  } else if (res.cancel) {
                    resolve('false')
                  }
                }
              })
            }
          }
        })
      })
    }

    async getBMToken () {
      const self = this
      const globalData = self.globalData
      return new Promise(function (resolve, reject) {
        console.log('getBMToken start')
        wx.request({
          url: `${globalData.bongmiAPI}/wechat_mp/access_token`,
          data: {
            app_id: globalData.appid,
            code: globalData.code
          },
          success: function (res) {
            console.log('getBMToken success')
            console.log(res.data)
            self.globalData.bmUser = res.data;
            resolve()
          },
          fail: function () {
            console.log('getBMToken fail')
            reject()
          }
        })
      })
    }

    async updateBMUser () {
      const self = this
      const globalData = self.globalData
      return new Promise(function (resolve, reject) {
        console.log('updateBMUser start')
        wx.request({
          url: `${globalData.bongmiAPI}/user/${globalData.bmUser.userId}?access_token=${globalData.bmUser.accessToken}`,
          data: {
            id: globalData.bmUser.userId,
            nickname: globalData.userInfo.nickName,
            gender: globalData.userInfo.gender == 2 ? 'Female' : 'Male'
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
      })
    }

    async getBMUserInfo () {
      const self = this
      const globalData = self.globalData
      return new Promise(function (resolve, reject) {
        console.log('getBMUserInfo start')
        wx.request({
          url: `${globalData.bongmiAPI}/user/${globalData.bmUser.userId}`,
          data: {
            access_token: globalData.bmUser.accessToken
          },
          header: {
            authorization: 'Lollypop-Weixin-Mini-Program'
          },
          success: function (res) {
            console.log('getBMUserInfo success')
            self.globalData.bmUser = Object.assign(globalData.bmUser, res.data)
            console.log(globalData)
            resolve()
          }
        })
      })
    }

    async getTips () {
      const self = this
      const globalData = self.globalData
      const bmUser = globalData.bmUser
      return new Promise(function (resolve, reject) {
        console.log('getTips')
        wx.request({
          url: `${globalData.bongmiAPI}/wechat_mp/${bmUser.userId}/${bmUser.selfMemberId}/ovulation_test`,
          data: {
            app_flag: 1,
            access_token: bmUser.accessToken
          },
          header: {
            authorization: 'Lollypop-Weixin-Mini-Program'
          },
          success: function (res) {
            console.log('getTips success')
            self.globalData.recordsAll = res.data;
            resolve()
          },
          fail: function () {
            reject()
          }
        })
      })
    }

    async convertRecord () {
      const self = this
      return new Promise(function (resolve, reject) {
        console.log('convertRecord start')
        const recordsAll = self.globalData.recordsAll
        const recordsList = recordsAll.ovulationTestResultList
        let date = ''
        recordsList.map((item, index) => {
          const time = new Date(item.timestamp * 1000)
          item.date = `${time.getMonth() + 1}月${time.getDate()}日`
          if (item.date == date) {
            item.dateFlag = false
          } else {
            item.dateFlag = true
            date = item.date
          }
          item.time = `${time.getHours() < 10 ? '0' + time.getHours() : time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`
          item.type = item.resultType == 1 ? '阴性' : (item.resultType == 2 ? '弱阳' : '强阳')
          item.classname = item.resultType == 1 ? 'peak' : (item.resultType == 2 ? 'low' : 'high')
          item.lineTag = true
          item.tip = false
          if (index != 0 && item.dateFlag) {
            recordsList[index - 1].lineTag = false
          }
          if (index != 0 && item.triggerType == 3) {
            recordsList[index - 1].tip = true
          }
        })
        console.log(recordsList)
        self.globalData.recordsAll = {
          ovulationTestResultList: recordsList,
          triggerType: recordsAll.triggerType
        };
        console.log('convertRecord end')
        console.log(self.globalData.recordsAll)
        resolve()
      })
    }

    async getRecords () {
      const self = this
      const bmUser = self.globalData.bmUser

      const date = new Date()
      const timestamp = Math.floor(date.getTime() / 1000)
      const h = date.getHours()
      const m = date.getMinutes()
      const s = date.getSeconds()
      const interval = h * 3600 + m * 60 + s

      return new Promise(function (resolve, reject) {
        console.log('getRecords start')
        wx.request({
          url: `${self.globalData.bongmiAPI}/body_status/${bmUser.userId}/${bmUser.selfMemberId}/report/512/${timestamp}/${interval}`,
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
              recordsToday.detail = JSON.parse(recordsToday.detail)
              if (!recordsToday.detail.map) {
                recordsToday.detail = [recordsToday.detail]
              }
              self.globalData.recordsToday = recordsToday
            }
            resolve()
          },
          fail: function () {
            console.log('getRecords fail')
            reject()
          }
        })
      })
    }

    async getTodayList () {
      const self = this
      return new Promise((resolve, reject) => {
        console.log('getTodayList start')
        const date = new Date()
        const h = date.getHours()
        const m = date.getMinutes()
        const s = date.getSeconds()
        const timestamp = Math.floor(date.getTime() / 1000) - (h * 3600 + m * 60 + s)
        const records = self.globalData.recordsAll.ovulationTestResultList.filter((item) => (item.timestamp >= timestamp))
        self.globalData.recordsTodayShow = records
        resolve()
      })
    }

    async setTriggerType () {
      const globalData = this.globalData
      let triggerType = ''
      return new Promise((resolve, reject) => {
        console.log('setTriggerType start')
        const menstruationPeriod = globalData.bmUser.menstruationPeriod
        triggerType = () => {
            const triggerType = globalData.recordsAll.triggerType
            switch (triggerType) {
            case 1:
              if (menstruationPeriod) {
                if (menstruationPeriod < 21) {
                  return 2
                } else if (menstruationPeriod > 41) {
                  return 3
                } else {
                  return 1
                }
              } else {
                return 0
              }
            case 2: return 5
            case 3: return 4
          }
        }
        console.log('setTriggerType end')
        resolve(triggerType())
      })
    }

    async takePhoto () {
      const self = this
      return new Promise((resolve, reject) => {
        console.log('takePhoto start')
          wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['camera'],
            success: function (res) {
              self.globalData.pictureLocal = res.tempFilePaths[0]
              console.log('takePhoto end')
              resolve()
            }
          })
      })
    }

    async getQiniuToken () {
      const self = this
      const bmUser = self.globalData.bmUser;
      return new Promise((resolve, reject) => {
        console.log('getQiniuToken start')
          wx.request({
            url: `${self.globalData.bongmiAPI}/user/${bmUser.userId}/upload_info`,
            data: {
              type: 2,
              access_token: bmUser.accessToken
            },
            header: {
              authorization: 'Lollypop-Weixin-Mini-Program'
            },
            success: function (res) {
              self.globalData.uploadInfo = res.data
              console.log('getQiniuToken end')
              resolve()
            }
          })
      })
    }

    async uploadPhoto () {
      const self = this
      const globalData = self.globalData
      const bmUser = globalData.bmUser
      return new Promise((resolve, reject) => {
        console.log('uploadPhoto start')
        wx.uploadFile({
          url: `${globalData.qiniuUploadUrl}`,
          filePath: globalData.pictureLocal,
          // filePath: pictureType == 1 ? globalData.pictureLocal : globalData.tailorLocal,
          name: 'file',
          formData: {
            token: globalData.uploadInfo.uploadToken,
            key: globalData.uploadInfo.fileName
          },
          success: function (res) {
            const data = JSON.parse(res.data);
            globalData.pictureOnline = data.key
            console.log('uploadPhoto end')
            resolve()
            // self.globalData.tailorOnline = data.key;
            // wx.redirectTo({
            //   url: '/pages/result/result',
            //   success: function (res) {
            //     console.log('success')
            //     // success
            //   },
            //   fail: function (res) {
            //     console.log(res)
            //     // fail
            //   },
            //   complete: function () {
            //     console.log('complete')
            //     // complete
            //   }
            // })
          }
        })
      })
    }

  }
</script>
