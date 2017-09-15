import wepy from 'wepy'

export default class commonMixin extends wepy.mixin {
  data = {
    mixin: 'This is mixin data.'
  }
  methods = {
    tap () {
      this.mixin = 'mixin data was changed'
      console.log('mixin method tap')
    }
  }
  async tryAuthAgain () {
    return new Promise(function (resolve, reject) {
      console.log('tryAuthAgain start')
      wepy.showModal({
        title: '是否要打开设置页面重新授权',
        content: '需要获取您的公开信息(昵称、头像等)',
        confirmColor: '#E56CAC',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wepy.openSetting({
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
      wepy.getUserInfo({
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
      wepy.login({
        success: res => {
          if (res.code) {
            console.log('login success')
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            self.globalData.code = res.code
            console.log(res.code)
            resolve('true')
          } else {
            console.log('login fail')
            wepy.showModal({
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
      wepy.request({
        url: `${globalData.bongmiAPI}/wechat_mp/access_token`,
        data: {
          app_id: globalData.appid,
          code: globalData.code
        },
        success: function (res) {
          console.log('getBMToken success')
          console.log(res.data)
          self.globalData.bmUser = res.data
          resolve()
        },
        fail: function () {
          console.log('getBMToken fail')
        }
      })
    })
  }

  async updateBMUser () {
    const self = this
    const globalData = self.globalData
    return new Promise(function (resolve, reject) {
      console.log('updateBMUser start')
      wepy.request({
        url: `${globalData.bongmiAPI}/user/${globalData.bmUser.userId}?access_token=${globalData.bmUser.accessToken}`,
        data: {
          id: globalData.bmUser.userId,
          nickname: globalData.userInfo.nickName,
          gender: globalData.userInfo.gender === 2 ? 'Female' : 'Male'
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
      wepy.request({
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
      wepy.request({
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
          self.globalData.recordsAll = res.data
          resolve()
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
      recordsList.map((item) => {
        const time = new Date(item.timestamp * 1000)
        item.date = `${time.getMonth() + 1}月${time.getDate()}日`
        if (item.date === date) {
          item.dateFlag = false
        } else {
          item.dateFlag = true
          date = item.date
        }
        item.time = `${time.getHours() < 10 ? '0' + time.getHours() : time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`
        item.type = item.resultType === 1 ? '阴性' : (item.resultType === 2 ? '弱阳' : '强阳')
        item.classname = item.resultType === 1 ? 'peak' : (item.resultType === 2 ? 'low' : 'high')
        item.tip = false
      })
      self.globalData.recordsAll = {
        ovulationTestResultList: recordsList,
        triggerType: recordsAll.triggerType
      }
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
      wepy.request({
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
      resolve(records)
    })
  }

  async setTriggerType () {
    const globalData = this.globalData
    let triggerType = ''
    return new Promise((resolve, reject) => {
      console.log('setTriggerType start')
      triggerType = () => {
        switch (globalData.recordsAll.triggerType) {
          case 1:
            const menstruationPeriod = globalData.bmUser.menstruationPeriod
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
          case 2: return 4
          case 3: return 5
        }
      }
      console.log('setTriggerType end')
      resolve(triggerType())
    })
  }
}
