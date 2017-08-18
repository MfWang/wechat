var app = getApp()

Page({
  onLoad: function() {
    if(wx.getStorageSync("_timeStamp") == "" || wx.getStorageSync("_ver") == "") {
      wx.redirectTo({
        url:"/pages/load/load?page=index"
      })
    }
    this.setData({
      _timeStamp: wx.getStorageSync("_timeStamp"),
      _CSS2Title: "",
      inputFocus: true
    })
  },
  onHide: function(){
    this.setData({
      inputFocus: false
    })
  },
  onShow: function(){
    this.setData({
      inputFocus: true
    })
  },

  // CSS2 属性列表的展示
  showCSS2: function(findValue) {
    var CSS2 = wx.getStorageSync("_CSS2"),
        _CSS2List = []

    if(findValue != ""){
      for( var b = 0; b < CSS2.length; b++){
        if(CSS2[b].toLowerCase().match(new RegExp(findValue))){
          _CSS2List.push(CSS2[b])
        }
      }
    }else{
      _CSS2List = []
    }

    if(_CSS2List.length > 0){
      this.setData({
        _CSS2Title: "CSS 2.1 属性：",
        _CSS2Descrtion: "该区域内 绿色 文字的属性都已经支持目前所有浏览器（包含 IE6+, Firefox 2+, Chrome 1+ 等）。",
        _CSS2List
      })
    }else{
      this.setData({
        _CSS2Title: ""
      })
    }
  },

  // json 文件中读取的信息列表
  showCSS3: function(findValue){
    var storageInfo = wx.getStorageInfoSync(),
        storageInfoLen = storageInfo.keys.length,
        getCSS3 = {},
        waitLoad = {},
        findNumber = 0,
        total = 0
    wx.showLoading({
      title: "数据加载中"
    })
    for(var a = 0; a < storageInfoLen; a++) {
      var attrList = {}
      if( !storageInfo.keys[a].match(/_.*/ig) ){
        if( storageInfo.keys[a].toLowerCase().match(new RegExp(findValue)) || wx.getStorageSync(storageInfo.keys[a]).title.toLowerCase().match(new RegExp(findValue)) || wx.getStorageSync(storageInfo.keys[a]).keywords.toLowerCase().match(new RegExp(findValue)) || wx.getStorageSync(storageInfo.keys[a]).description.toLowerCase().match(new RegExp(findValue)) ) {

          attrList.title = (total+1) + "、" + wx.getStorageSync(storageInfo.keys[a]).title
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
          waitLoad[storageInfo.keys[a]] = attrList
          total++

          if( findNumber >= 5 ) {
            if( total - findNumber > 0){
              this.setData({
                _showEnd: "showEnd",
                _theEnd: "上拉加载更多...",
                _total: total,
                _pager: 1
              })
            }
          }else{
            getCSS3[storageInfo.keys[a]] = attrList
            findNumber++
            this.setData({
              _theEnd: "...列表已经全部加载...",
              _findNumber: findNumber,
              _total: total
            })
          }

          this.setData({
            _showEnd: "showEnd",
            getCSS3,
            waitLoad
          })
        }
      }
    }

    wx.showToast({
      title: "有 " + findNumber + " 条数据",
      duration: 2500,
      mask: true,
      image: "/images/find-no.png"
    })

    if(findNumber==0){
      wx.showToast({
        title: "什么东西都找不到",
        duration: 2000,
        mask: true,
        image: "/images/find-no.png"
      })
    }
  },

  onReachBottom: function(){
    var getCSS3 = this.data.getCSS3,
        cardNumber = this.data._pager * this.data._findNumber,
        pager = this.data._pager,
        loopTimes = (this.data._total - this.data._total % this.data._findNumber)/this.data._findNumber

    if(this.data._total < 5) {
      return false
    }

    if(pager <= loopTimes){
      var temp = 1;
      for(var c in this.data.waitLoad) {
        if(temp<=5) {
          if(this.data.getCSS3[c] != undefined){
            cardNumber++
           
            getCSS3[c] = this.data.getCSS3[c]
            this.setData({
              getCSS3
            })
          }else{
            getCSS3[c] = this.data.waitLoad[c]
            console.log(this.data.waitLoad[c])
            temp++
            this.setData({
              getCSS3
            })
          }
        }else{
          wx.showToast({
            title: "新增 " + (temp-1) + " 条数据",
            duration: 2000,
            mask: true,
            image: "/images/find-no.png"
          })
          break;
        }
      }
      pager++
      this.setData({
        _pager: pager
      })
    }else{
      if(this.data._total != undefined){
        wx.showToast({
          title: "共有 " + this.data._total + " 条数据",
          duration: 2500,
          mask: true,
          image: "/images/find-no.png"
        })
        this.setData({
          _theEnd: "..." + this.data._total + " 条数据已经全部加载..."
        })
      }
    }
  },

  touchStart: function(e) {
    this.setData({
      _touchStart: e.timeStamp,
    })
  },

  touchEnd: function(e) {
    this.setData({
      _touchEnd: e.timeStamp,
      _selectItem: ""
    })
  },

  longTap: function(e) {
    var touchTime = this.data._touchEnd - this.data._touchStart,
        showTag = e.currentTarget.id,
        shareTheTag = this.data.getCSS3[showTag].title.match(/(\d.*、)|(.*)/ig)[1]

    if(touchTime > 300){      
      wx.showModal({
        title: "分享提示：",
        content: "你要分享的是 " + shareTheTag + " 这块内容吗？",
        success: function(res) {
          if(res.confirm){
            wx.redirectTo({
              url: '/pages/share/share?shareTag=' + showTag
            })
          }else if(res.cancel) {
            wx.showToast({
              title: "那就重新选择一个吧！^o^",
              mask: true,
              duration: 1000,
              image: "/images/find-no.png"
            })
          }
        }
      })
    }
  },

  beginSearch: function(e) {
    this.setData({
      inputValue: e.detail.value.replace(/(^\s*)|(\s*$)/ig,"").toLowerCase(),
      getCSS3: "",
      waitLoad: "",
      _showEnd: ""
    })
    this.showCSS2(this.data.inputValue)
  },

  bindconfirm: function() {
    var getValue = this.data.inputValue
    if( getValue == "" || getValue == undefined ) {
      wx.showToast({
        title: "你确认输入东西？",
        duration: 2000,
        mask: true,
        image: "/images/find-no.png"
      })
    }else{
      this.setData({
        getCSS3: "",
        waitLoad: "",
        _showEnd: "",
        inputFocus: false
      })
      this.showCSS3(this.data.inputValue)
    }
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
  }
})