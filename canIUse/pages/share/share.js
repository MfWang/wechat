var app = getApp(),
    tipsTitle = ""

Page({
  onLoad: function(res){
    console.log(res)
    if(wx.getStorageSync("_timeStamp") == "" || wx.getStorageSync("_ver") == "") {
      wx.redirectTo({
        url:"/pages/load/load?page=share&shareTag=" + res.shareTag
      })
    }else{
      this.setData({
        _timeStamp: wx.getStorageSync("_timeStamp")
      })
      if(res.shareTag == undefined) {
        wx.showToast({
          title: "错误的分享页面",
          duration: 3000,
          mask: true,
          image: "/images/find-no.png"
        })
        wx.switchTab({
          url:"/pages/index/index"
        })
      }else{
        this.setData({
          inputValue: res.shareTag
        })
        this.showCSS3(this.data.inputValue)
      }
    }
  },

  touchStart: function(e) {
    this.setData({
      _touchStart: e.timeStamp
    })
  },

  touchEnd: function(e) {
    this.setData({
      _touchEnd: e.timeStamp
    })
  },

  longTap: function(e) {
    var touchTime = this.data._touchEnd - this.data._touchStart

    if(touchTime > 300){
      wx.setClipboardData({
        data: '/pages/share/share?shareTag=' + this.data.inputValue,
        success: function(res) {
          wx.getClipboardData({
            success: function(res) {
              console.log(res.data)
              wx.showToast({
                title: "已经将该页面路径复制到剪贴板",
                duration: 2000,
                mask: true,
                image: "/images/find-no.png"
              })
            }
          })
        }
      })
    }
  },

  onShareAppMessage: function (res) {
    return {
      title: tipsTitle + ' 兼容信息分享',
      path: '/pages/share/share?shareTag=' + this.data.inputValue,
      success: function(res) {
        wx.showToast({
          title: "已成功分享给好友！ ^o^",
          duration: 1500,
          mask: true,
          image: "/images/find-no.png"
        })
      },
      fail: function(res) {
        wx.showToast({
          title: "分享失败！ >_< ",
          duration: 1500,
          mask: true,
          image: "/images/find-no.png"
        })
      }
    }
  },

  gotoHome: function() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  // json 文件中读取的信息列表
  showCSS3: function(findValue){
    var storageInfo = wx.getStorageInfoSync(),
        storageInfoLen = storageInfo.keys.length,
        getCSS3 = {}
    wx.showLoading({
      title: "数据加载中"
    })
    for(var a = 0; a < storageInfoLen; a++) {
      var attrList = {}
      if( !storageInfo.keys[a].match(/_.*/ig) ){
        if( storageInfo.keys[a].toLowerCase() == findValue ) {

          tipsTitle = attrList.title = wx.getStorageSync(storageInfo.keys[a]).title
          attrList.keywords = wx.getStorageSync(storageInfo.keys[a]).keywords
          attrList.description = wx.getStorageSync(storageInfo.keys[a]).description
          attrList.usage_perc_a = "部分支持情况：" + wx.getStorageSync(storageInfo.keys[a]).usage_perc_a
          attrList.usage_perc_y = "浏览器支持率：" + wx.getStorageSync(storageInfo.keys[a]).usage_perc_y
          attrList.stats = wx.getStorageSync(storageInfo.keys[a]).stats

          let compatibility = [],
              browserTypeArray = {}
          for(let type in attrList.stats) {
            let brwoserVerY = 0,
                brwoserVerN = 0,
                brwoserVerU = 0,
                brwoserVerA = 0
            for(let ver in attrList.stats[type]) {
              compatibility = attrList.stats[type][ver] // 兼容性列表
              if(compatibility.match(/y/ig)){
                brwoserVerY = this.judgeVerThan(brwoserVerY,ver)
              }else if(compatibility.match(/a|p/ig)) {
                brwoserVerA = this.judgeVer(brwoserVerA,ver)
              }else if(compatibility.match(/u/ig)) {
                brwoserVerU = this.judgeVer(brwoserVerU,ver)
              }else if(compatibility.match(/n/ig)) {
                brwoserVerN = this.judgeVer(brwoserVerN,ver)
              }
            }
            browserTypeArray[type] =  {brwoserVerY,brwoserVerA,brwoserVerU,brwoserVerN}
          }
          attrList.browser = browserTypeArray
          getCSS3[storageInfo.keys[a]] = attrList

          this.setData({
            getCSS3
          })
        }
      }
    }

    wx.setNavigationBarTitle({
      title: tipsTitle + " 的兼容列表"
    })

    wx.showToast({
      title: "可将该页面转发给好友",
      duration: 1500,
      mask: true,
      image: "/images/find-no.png"
    })
  },
  
  // 判断浏览器的版本，获取最低版本
  judgeVer: function(brwoserVerTemp,version) {
    if(version.match(/\-/ig)){
      version = version.split(/\-/ig)[1]
    }
    if(brwoserVerTemp < parseFloat(Number(version))) {
      brwoserVerTemp = version
    }else if(isNaN(Number(version)) && version == "all") {
      brwoserVerTemp = version
    }
    return brwoserVerTemp
  },

  // 判断浏览器的版本，获取最高版本
  judgeVerThan: function(brwoserVerTemp,version) {
    if(version.match(/\-/ig)){
      version = version.split(/\-/ig)[1]
    }
    if(brwoserVerTemp < parseFloat(Number(version))) {
      if( brwoserVerTemp == 0) {
        brwoserVerTemp = version
      }
    }else if(isNaN(Number(version)) && version == "all") {
      brwoserVerTemp = version
    }
    return brwoserVerTemp
  },

  onReachBottom: function() {}
})