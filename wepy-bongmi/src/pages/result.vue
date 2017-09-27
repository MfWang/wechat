<style lang="less">
  Page{
    background: #000;
    padding-top: 50rpx;
  }
  .title{
    font-size: 28rpx;
    color: #FFFFFF;
  }
  .res{
    font-size: 28rpx;
    color: #D55397;
  }
  .tip{
    font-size: 24rpx;
    color: rgba(255,255,255,0.54);
    display: block;
  }
  .result_1{
    padding: 0 30rpx;
  }
  .result_2{
    padding: 0 30rpx;
  }
  .result_1 .res{
    display: block;
    margin-top: 24rpx;
  }
  .result_img{
    width: 690rpx;
    height: 110rpx;
    background: #fff;
    border-radius: 8rpx;
    margin: 92rpx auto 140rpx auto;
    position: relative;
  }
  .result_img .img{
    width: 690rpx;
    height: 110rpx;
    background: #fff;
    display: block;
  }
  .result_img .t{
    position: absolute;
    font-size: 30rpx;
    color: #FFFFFF;
    top: -62rpx;
    margin-left: -25rpx;
    /* left: calc(62% - 15rpx); */
  }
  .result_img .c{
    position: absolute;
    font-size: 30rpx;
    color: #FFFFFF;
    top: -62rpx;
    margin-left: -15rpx;
    /* left: calc(59% - 30rpx); */
  }
  .result_img .line{
    width: 2rpx;
    height: 162rpx;
    border-right: 4rpx dotted #E56BAB;
    position: absolute;
    top: -26rpx;
  }

  .result_2 .res{
    margin-left: 27rpx;
  }
  .result_2_img{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .result_2_img_item{
    width: 192rpx;
    height: 138rpx;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 24rpx;
    color: rgba(0,0,0,0.54);
    border: 6rpx solid #fff;
    border-radius: 8px;
    margin: 60rpx 0 40rpx 0;
  }
  .result_2_img_item.active{
    border: 6rpx solid #E56CAC;
  }
  .result_2_img .img{
    width: 150rpx;
    height: 40rpx;
    margin-bottom: 16rpx;
  }



  .cropper-buttons{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 220rpx;
    text-align: center;
    position: absolute;
    top: calc(~'100vh - 220rpx');
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.95);
  }

  .back{
    width: 96rpx;
    height: 96rpx;
    background: #878787;
    border-radius: 100%;
    margin-right: 279rpx;
    line-height: 96rpx;
    color: #D8D8D8;
  }
  .back .iconfont{
    font-size: 50rpx;
  }
  .complete{
    width: 96rpx;
    height: 96rpx;
    background: #fff;
    border-radius: 100%;
    line-height: 96rpx;
    color: #E87AB4;
  }
  .complete .iconfont{
    font-size: 50rpx;
  }

</style>
<template>
  <view class="result">
    <view class="result_1">
      <text class="title">1. 智能识别出的位置（T为测试线，C为参考线）</text>
      <text class="res" wx:if="{{show.detectType == 3}}">说明：未检测到参考线</text>
      <view class="result_img">
        <block wx:if="{{flag}}">
          <image class="img" src="{{show.imgUrl}}"></image>
          <block wx:if="{{show.detectType != 3}}">
            <text wx:if="{{show.detectType == 1}}" class="t" style="left:{{ show.testLineX}}">T</text>
            <view wx:if="{{show.detectType == 1}}" class="line line1" style="left:{{ show.testLineX}}"></view>
            <text class="c" style="left:{{ show.refLineX}}">C</text>
            <view class="line line2" style="left:{{ show.refLineX}}"></view>
          </block>
        </block>
      </view>
    </view>
    <view class="result_2">
      <text class="title">2. 检测结果：</text>
      <text class="res">{{show.text}}</text>
      <view class="result_2_img">
        <block wx:for="{{results}}" wx:key="{{index}}">
          <view
            class="result_2_img_item {{index == resultIndex ? 'active' : ''}}"
            data-wepy-params="{{index}}"
            bindtap="changeResult"
          >
            <image class="img" src="{{item.img}}"></image>
            <text>{{item.name}}</text>
          </view>
        </block>
      </view>
      <text class="tip">说明：您可以尝试重新拍摄，如果您已经很清楚排卵试纸的状态，也可以选择直接标记状态并保存即可。</text>
    </view>

    <view class="cropper-buttons">
      <view class="back" bindtap="takePhoto"><text class="iconfont icon-btn_back"></text> </view>
      <view class="complete" bindtap="uploadOvulation"> <text class="iconfont icon-btn_correct"></text> </view>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy'
  import 'wepy-async-function'

  export default class Result extends wepy.page {
    config = {
      navigationBarBackgroundColor: '#000',
      navigationBarTitleText: '智能监测结果',
      navigationBarTextStyle: '#fff',
      backgroundColor: 'black'
    }

    data = {
      result: null,
      resultIndex: -1,
      show: null,
      flag: false,
      results: [
        {
          "img": "../images/high.png",
          "name": "强阳"
        },
        {
          "img": "../images/low.png",
          "name": "弱阳"
        },
        {
          "img": "../images/peak.png",
          "name": "阴性"
        }
      ]
    }

    methods = {
      changeResult (event) {
        const self = this
        const index = parseInt(event.currentTarget.dataset.wepyParams, 10)
        self.resultIndex = index
        self.$apply();
        console.log(self.resultIndex)
      },
      async takePhoto () {
        const self = this
        const parent = self.$parent
        await parent.takePhoto()
        await parent.getQiniuToken()
        const picData = await parent.uploadPhoto(1) //1:原图 2:裁剪图
        parent.globalData.pictureOnline = picData.key
        console.log(parent.globalData)
        wx.redirectTo({
          url: '/pages/result',
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
      },
      uploadOvulation: function () {
        const self = this
        const parent = self.$parent
        const globalData = parent.globalData
        const bmUser = globalData.bmUser;
        const result = self.result;
        const show = self.show;
        const resultIndex = self.resultIndex;
        console.log(show)
        console.log(result)
        if (resultIndex == -1) {
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
          if (resultIndex == 0) {
            result.resultType = 3
          } else if (resultIndex == 1) {
            result.resultType = 2
          } else if (resultIndex == 2) {
            result.resultType = 1
          }
          result.originalImgUrl = `${globalData.downloadUrl}/${globalData.pictureOnline}`;
          result.timestamp = Math.floor(new Date().valueOf() / 1000)
          console.log('------注意----------')
          if (globalData.recordsToday == null) {
            var date = new Date();
            date.setHours(0);
            date.setMilliseconds(0);
            date.setSeconds(0);
            date.setMinutes(0);
            console.log('-----globalData.recordsToday==null')
            console.log(result)
            globalData.recordsToday = {
              timestamp: Math.floor(date.valueOf() / 1000),
              type: 'OVULATION_TEST',
              userId: bmUser.userId,
              familyMemberId: bmUser.selfMemberId,
              detail: result,
              appFlag: 1,
            }
          } else {
            console.log('-----globalData.recordsToday!=null')
            console.log(show.index)
            console.log(result)
            globalData.recordsToday.detail.push(result)
          }
          var data = globalData.recordsToday
          data.detail = JSON.stringify(data.detail)
          console.log('上传')
          console.log(JSON.parse(data.detail))
          console.log(data)
          wx.request({
            url: `${globalData.bongmiAPI}/body_status/${bmUser.userId}/${bmUser.selfMemberId}?access_token=${bmUser.accessToken}`,
            data: data,
            header: {
              authorization: 'Lollypop-Weixin-Mini-Program'
            },
            method: "PUT",
            success: function (res) {
              globalData.refresh = true;
              wx.switchTab({
                url: '/pages/today'
              })
            }
          })
        }
      }
    }

    async onLoad (options) {
      const self = this
      const parent = self.$parent
      const globalData = parent.globalData
      const bmUser = globalData.bmUser;
      wx.request({
        url: `${globalData.bongmiAPI}/body_status/${bmUser.userId}/ovulation?url=` + encodeURIComponent(`${globalData.downloadUrl}/${globalData.pictureOnline}`),
        data: {
          access_token: bmUser.accessToken
        },
        header: {
          authorization: 'Lollypop-Weixin-Mini-Program'
        },
        success: function (res) {
          console.log('--------------')
          console.log(res)
          const show = res.data
          let resultIndex = ''
          const result = JSON.parse(JSON.stringify(res.data))
          if (show.detectType == 3) {
            show.text = '检测失败';
            resultIndex = -1;
          } else {
            if (show.resultType == 1) {
              show.text = '阴性'
              resultIndex = 2;
            } else if (show.resultType == 2) {
              show.text = '弱阳'
              resultIndex = 1;
            } else if (show.resultType == 3) {
              show.text = '强阳'
              resultIndex = 0;
            }
          }
          show.testLineX = show.testLineX + '%'
          show.refLineX = show.refLineX + '%'
          self.result = result
          self.show = show
          self.resultIndex = resultIndex
          self.flag = true
          self.$apply();
        }
      })
    }
  }
</script>
