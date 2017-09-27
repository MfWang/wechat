<style lang="less">
  .today{
    padding-bottom: 50rpx;
  }
  .tips{
    position: relative;
    padding: 20rpx 20rpx 0 20rpx;
  }
  .bg_shadow{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 750rpx;
  }
  .tips_content{
    position: relative;
    background-image: linear-gradient(-159deg, #F9ADCF 0%, #EE85AF 96%);
    border-radius: 36rpx 36rpx 0 0;
    padding: 80rpx 60rpx 50rpx 60rpx;
    height: 100%;
  }
  .tips_img{
    position: absolute;
    top: 0;
    left: 0;
    width: 132rpx;
    height: 132rpx;
  }
  .bell_img{
    position: absolute;
    top: 0;
    right: 0;
    width: 182rpx;
    height: 257rpx;
  }

  .desc{
    font-size: 28rpx;
    color: #FFFFFF;
    line-height: 42rpx;
    display: block;
  }
  .desc2{
    font-size: 24rpx;
    color: rgba(255,255,255,0.66);
    line-height: 30rpx;
    display: block;
  }
  .setting{
    width: 160rpx;
    height: 60rpx;
    background: #FFFFFF;
    box-shadow: 0 0 8rpx 0 rgba(0,0,0,0.10);
    border-radius: 30rpx;
    font-size: 24rpx;
    color: #E56CAC;
    margin-top: 40rpx;
    margin-bottom: 20rpx;
  }

  .photo{
    width: 400rpx;
    height: 88rpx;
    border: 2rpx solid #E56CAC;
    border-radius: 100rpx;
    font-size: 28rpx;
    color: #E56CAC;
    line-height: 88rpx;
    background: #fff;
    margin-top: 120rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50rpx;
  }
  .photo .iconfont{
    font-size: 40rpx;
    margin-right: 20rpx;
  }
</style>
<template>
  <view class="today">
    <view class="tips">
      <image class="bg_shadow" src="../images/bg_shadow.png"></image>
      <view class="tips_content">
        <image class="tips_img" src="../images/tips.png"></image>
        <image class="bell_img" src="../images/bell.png"></image>
        <block wx:if="{{index == 5}}">
          <swiper
            indicator-dots="true"
            autoplay="true"
            interval="5000"
            duration="1000"
            circular="true"
            indicator-color="#FCD0E2"
            indicator-active-color="#fff"
          >
            <repeat for="{{guide[index]}}">
              <swiper-item class="item">
                <text wx:if="{{item.desc}}" class="desc">{{item.desc}}</text>
                <text wx:if="{{item.desc2}}" class="desc2">{{item.desc2}}</text>
              </swiper-item>
            </repeat>
          </swiper>
        </block>

        <block wx:else>
          <view>
            <text wx:if="{{guide[index].desc}}" class="desc">{{guide[index].desc}}</text>
            <text wx:if="{{guide[index].desc2}}" class="desc2">{{guide[index].desc2}}</text>
          </view>
          <button wx:if="{{index == 0}}" class="setting" bindtap="setting">去设置</button>
        </block>

      </view>
    </view>

    <record
      :records.sync="records"
      :theme.sync="today"
      :date.sync="date"
      :tip.sync="tip"
    />

    <button class="photo" @tap="takePhoto"><text class="iconfont icon-btn_camera"></text>智能记录排卵试纸</button>

  </view>
</template>

<script>
  import wepy from 'wepy'
  import 'wepy-async-function'
  import RecordItem from '../components/recorditem'

  export default class Guide extends wepy.page {
    config = {
      navigationBarTitleText: '今日信息'
    }

    components = {
      record: RecordItem
    }
    data = {
      flag: false,
      index: 0,
      guide: [
        {
          "desc": "您还没有设置过周期长度，设置周期长度后，小助手可以指导您使用排卵试纸的时间。"
        },
        {
          "desc": "您的周期为X天，请在周期第N天开始使用排卵试纸"
        },
        {
          "desc": "您的周期过短，建议您咨询一下专科医生，或者在经期结束之后，即刻开始坚持记录排卵试纸情况～"
        },
        {
          "desc": "您的周期较长，建议您咨询一下专科医生，或者您预计下次经期来潮之前20天开始记录排卵试纸情况～"
        },
        {
          "desc": "在一个周期内出现强阳转弱阳，说明排卵已经发生，5个小时内的爱爱也还是有很高的中奖几率的！",
          "desc2": "您如果不能确定身体是否完全健康，可以坚持继续测量排卵试纸。因为有一些疾病可能会造成一个周期内出现多次小的强阳弱阳的交替变化，如果您发现这种情况，也不用胡思乱想，及时去看一下医生就好～"
        },
        [
          {
            "desc": "在一个周期里，出现强阳之后，需要增加测量频率，最好能保证四个小时测量一次。",
            "desc2": "因为24-48小时随时都有可能发生排卵，排卵后立刻会转成弱阳。需要增加频率来更精确的捕捉到强阳转弱阳的时间。"
          },
          {
            "desc": "出现强阳之后的当天可以安排爱爱哦！然后隔天再爱爱一次，直到捕捉到强阳转弱阳～如此，中奖的几率能大大提高呢！",
            "desc2": ""
          }
        ],
      ],
      records: null,
      today: 'today',
      date: false,
      tip: false
    }

    methods = {
      async takePhoto () {
        const self = this
        const parent = self.$parent
        await parent.takePhoto()
        wx.showLoading({
          title: '照片上传中',
          mask: true
        })
        await parent.getQiniuToken()
        await parent.uploadPhoto() //1:原图 2:裁剪图
        wx.hideLoading()
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
      setting: function () {
        wx.switchTab({
          url: '/pages/record'
        })
      },
    }

    async onShow (options) {
      const self = this
      const parent = self.$parent
      const globalData = parent.globalData
      if (globalData.userInfo) {
        console.log('已经授权过啦，并且用户信息也有了~')
        if (globalData.refresh) {
          wx.showLoading({
            title: '数据加载中',
            mask: true
          })
          await parent.getTips()
          await parent.convertRecord()
          await parent.getRecords()
          await parent.getTodayList()
          const triggerType = await parent.setTriggerType()
          const guide = self.guide
          const menstruationPeriod = globalData.bmUser.menstruationPeriod
          if (triggerType == 1) {
            const period = [6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
            guide[1] = {
                "desc": `您的周期为${menstruationPeriod}天，请在周期第${period[menstruationPeriod - 21]}天开始使用排卵试纸`
              }
          }
          self.guide = guide
          self.records = globalData.recordsTodayShow
          self.index = triggerType
          self.$apply();
          wx.hideLoading()
        } else if (globalData.recordsTodayShow && !self.records) {
          wx.showLoading({
            title: '数据加载中',
            mask: true
          })
          await parent.getTodayList()
          const triggerType = await parent.setTriggerType()
          const guide = self.guide
          const menstruationPeriod = globalData.bmUser.menstruationPeriod
          if (triggerType == 1) {
            const period = [6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
            guide[1] = {
                "desc": `您的周期为${menstruationPeriod}天，请在周期第${period[menstruationPeriod - 21]}天开始使用排卵试纸`
              }
          }
          self.guide = guide
          self.records = globalData.recordsTodayShow
          self.index = triggerType
          self.$apply();
          wx.hideLoading()
        } else {
        }

        if (globalData.menstruationPeriodFlag) {
          const triggerType = await parent.setTriggerType()
          const guide = self.guide
          const menstruationPeriod = globalData.bmUser.menstruationPeriod
          if (triggerType == 1) {
            const period = [6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
            guide[1] = {
                "desc": `您的周期为${menstruationPeriod}天，请在周期第${period[menstruationPeriod - 21]}天开始使用排卵试纸`
              }
          }
          self.guide = guide
          self.index = triggerType
          self.$apply();
        }

      } else {
        console.log('我也不知道有没有授权，反正还没有用户数据')
        const getUserInfo_Flag = await parent.getUserInfo()
        if(getUserInfo_Flag == 'false') {
          const tryAuthAgain_flag = await parent.tryAuthAgain()
          if (tryAuthAgain_flag == 'true') {
            wx.showLoading({
              title: '数据加载中',
              mask: true
            })
            await parent.loginWX()
            await parent.getBMToken()
            await parent.updateBMUser()
            await parent.getBMUserInfo()
            await parent.getTips()
            await parent.convertRecord()
            await parent.getRecords()
            await parent.getTodayList()
            const triggerType = await parent.setTriggerType()
            const guide = self.guide
            const menstruationPeriod = globalData.bmUser.menstruationPeriod
            if (triggerType == 1) {
              const period = [6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
              guide[1] = {
                  "desc": `您的周期为${menstruationPeriod}天，请在周期第${period[menstruationPeriod - 21]}天开始使用排卵试纸`
                }
            }
            self.guide = guide
            self.records = globalData.recordsTodayShow
            self.index = triggerType
            self.$apply();
            wx.hideLoading()
          }
        } else {
          wx.showLoading({
            title: '数据加载中',
            mask: true
          })
          await parent.loginWX()
          await parent.getBMToken()
          await parent.updateBMUser()
          await parent.getBMUserInfo()
          await parent.getTips()
          await parent.convertRecord()
          await parent.getRecords()
          await parent.getTodayList()
          const triggerType = await parent.setTriggerType()
          const guide = self.guide
          const menstruationPeriod = globalData.bmUser.menstruationPeriod
          if (triggerType == 1) {
            const period = [6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
            guide[1] = {
                "desc": `您的周期为${menstruationPeriod}天，请在周期第${period[menstruationPeriod - 21]}天开始使用排卵试纸`
              }
          }
          self.guide = guide
          self.records = globalData.recordsTodayShow
          self.index = triggerType
          self.$apply();
          wx.hideLoading()
        }
      }
    }
  }
</script>
