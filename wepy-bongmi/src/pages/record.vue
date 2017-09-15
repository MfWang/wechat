<style lang="less">
  .record{
    padding-bottom: 50rpx;
  }
  .period{
    height: 278rpx;
    border-top: 1px solid rgba(0,0,0,0.12);
  }
  .period_content{
    margin: 0 50rpx;
    padding: 38rpx 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px dashed rgba(0,0,0,0.12);
  }
  .circle{
    width: 234rpx;
    height: 234rpx;
    border-radius: 100%;
    background: #E56CAC;
    background-image: linear-gradient(-180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.00) 100%);
    box-shadow: 0 7rpx 22rpx 0 rgba(0,0,0,0.05);
    text-align: center;
    display: block;
  }
  .period .text{
    display: block;
    font-size: 24rpx;
    color: #FFFFFF;
    padding: 65rpx 0 4rpx 0;
  }
  .period .day{
    font-size: 60rpx;
    color: #FFFFFF;
    line-height: 60rpx;
  }
  .records_empty{
    padding-top: 170rpx;
    font-size: 24rpx;
    color: #C5C5C5;
    text-align: center;
  }
  .records_empty .img{
    display: block;
    width: 288rpx;
    height: 124rpx;
    margin: 0 auto 30rpx auto;
  }

  .date{
    font-size: 20rpx;
    color: #FFFFFF;
    line-height: 40rpx;
    background-image: linear-gradient(-159deg, #F782BF 0%, #E56DAC 100%);
    border-radius: 0 29rpx 29rpx 0;
    display: inline-block;
    height: 40rpx;
    padding: 0 30rpx 0 20rpx;
    margin-left: -30rpx;
  }
  .record_list{
    padding: 60rpx 40rpx 0 30rpx;
  }
  .record_list_item{
    width: 680rpx;
    display: flex;
    justify-content: space-between;
    align-items: top;
    position: relative;
    margin: 40rpx 0;
  }
  .record_list_item:before{
    content: "";
    width: 10rpx;
    height: 10rpx;
    border-radius: 100%;
    opacity: 0.5;
    background: #C4C4C4;
    position: absolute;
    top: 58rpx;
    left: 0;
    margin-top: -5rpx;
  }
  .record_list_item.line:after{
    content: '';
    width: 2rpx;
    height: 100%;
    opacity: 0.3;
    background: #A0A0A0;
    border-radius: 8rpx;
    position: absolute;
    left: 5rpx;
    top: calc(~'58rpx + 15rpx');
  }
  .record_list .record_list_item:last-child:after{
    display: none;
  }
  .content{
    width: 580rpx;
  }
  .flex-row{
    height: 116rpx;
    padding: 0 24rpx 0 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #FEFEFE;
    border: 1rpx solid rgba(0,0,0,0.12);
    border-radius: 4rpx;
    position: relative;
  }
  .flex-row:before{
    content: '';
    width: 10rpx;
    height: 116rpx;
    position: absolute;
    top: -1rpx;
    left: -1rpx;
    border-radius: 4rpx 0 0 4rpx;
    border: 1rpx solid rgba(0,0,0,0.12);
  }
  .low:before{
    background: #F7D2E5;
  }
  .peak:before{
    background: #D5D5D5;
  }
  .high:before{
    background: #E76FAD;
  }
  .time{
    font-size: 22rpx;
    color: rgba(0,0,0,0.33);
    padding-left: 14rpx;
    line-height: 116rpx;
  }
  .item_img{
    width: 428rpx;
    height: 68rpx;
  }
  .type{
    font-size: 24rpx;
    color: rgba(0,0,0,0.54);
    line-height: 24rpx;
  }
  .number{
    display: block;
    margin-top: 12rpx;
    font-size: 24rpx;
    color: rgba(0,0,0,0.26);
    line-height: 24rpx;
  }
  .tip{
    height: 40rpx;
    line-height: 40rpx;
    padding: 0 30rpx;
    background-image: linear-gradient(-162deg, #B1B1B1 0%, #9D9D9D 100%);
    border-radius: 44rpx 34rpx 34rpx 44rpx;
    font-size: 24rpx;
    color: #FFFFFF;
    display: inline-block;
  }

</style>
<template>
  <view class="record">

    <view class="period">
      <view class="period_content">
        <picker class="circle" bindchange="bindPickerChange" value="{{menstruationPeriod == 0 ? 18 : menstruationPeriod - 10}}" range="{{array}}">
          <text class="text">周期长度(天)</text>
          <text class="day">{{menstruationPeriod == 0 ? '--' : menstruationPeriod}}</text>
        </picker>
      </view>
    </view>
    <view wx:if="{{records.length == 0}}" class="records_empty">
      <image class="img" src="./images/empty.png"></image>
      <text>虽然记录空空如也，心情依旧愉悦～</text>
    </view>

    <view class="record_list" wx:if="{{flag}}">
      <repeat for="{{records}}" key="records_{{index}}">
        <view wx:if="{{item.dateFlag}}" class="date">{{item.date}}</view>
        <view class="record_list_item {{item.lineTag ? 'line' : ''}}" >
          <text class="time">{{item.time}}</text>
          <view class="content">
            <view class="flex-row {{item.classname}}">
              <text class="type">{{item.type }}\n<text class="number">LH{{item.lh}}</text></text>
              <image class="item_img" src="{{item.imgUrl}}"></image>
            </view>
            <view wx:if="{{item.tip}}" class="tip">发生强转弱，可能排卵</view>
          </view>
        </view>
      </repeat>
    </view>

    <record
      :records.sync="records"
      theme="all"
      date="true"
      tip="true"
    />

  </view>
</template>

<script>
  import wepy from 'wepy'
  import RecordItem from '../components/recorditem'

  export default class Record extends wepy.page {
    config = {
      navigationBarTitleText: '我的记录'
    }
    components = {
      record: RecordItem
    }

    data = {
      flag: false,
      records: null,
      array: [],
      menstruationPeriod: 0
    }

    methods = {
      bindPickerChange: function (e) {
        const that = this;
        const days = parseInt(e.detail.value, 10) + 10;
        if (days != that.data.minPeriodDays) {
          wx.showModal({
            title: '提示',
            content: '确认修改周期长度？',
            success: function (res) {
              if (res.confirm) {
                that.updatePeriodDays(days);
                wx.showLoading({
                  title: '更新中',
                  mask: true
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    }

    onLoad (options) {
      const self = this;
      const parent = self.$parent
      const globalData = parent.globalData
      var array = [];
      for (let i = 10; i <= 90; i++) {
        array.push(i)
      }
      console.log(array)
      globalData.datePicker = array
      self.array = array
      self.$apply();
    }

    updatePeriodDays (days) {
      const self = this
      const parent = self.$parent
      const globalData = parent.globalData
      wx.request({
        url: `${globalData.bongmiAPI}/user/${globalData.bmUser.userId}?access_token=${globalData.bmUser.accessToken}`,
        data: {
          menstruationPeriod: days
        },
        header: {
          authorization: 'Lollypop-Weixin-Mini-Program'
        },
        method: 'PUT',
        success: function (res) {
          self.menstruationPeriod = days
          self.$apply();
          globalData.bmUser.menstruationPeriod = days;
          globalData.menstruationPeriodFlag = true;
          wx.hideLoading()
          wx.showToast({
            title: '更新成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (res) {
          console.log('fail')
          console.log(res)
        }
      })
    }

    async onShow (options) {
      const self = this
      const parent = self.$parent
      const globalData = parent.globalData
      // self.array = globalData.datePicker
      if (globalData.userInfo) {
        console.log('shouquan')

        if (globalData.refresh) {
          console.log('refresh true')
          wx.showLoading({
            title: '数据加载中',
            mask: true
          })
          await parent.getTips()
          await parent.convertRecord()
          await parent.getRecords()
          self.menstruationPeriod = globalData.bmUser.menstruationPeriod
          self.records = globalData.recordsAll.ovulationTestResultList
          self.$apply();
          wx.hideLoading()
        } else {
          console.log('refresh false')
          self.menstruationPeriod = globalData.bmUser.menstruationPeriod
          self.records = globalData.recordsAll.ovulationTestResultList
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
            self.menstruationPeriod = globalData.bmUser.menstruationPeriod
            self.records = globalData.recordsAll.ovulationTestResultList
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
          self.menstruationPeriod = globalData.bmUser.menstruationPeriod
          self.records = globalData.recordsAll.ovulationTestResultList
          self.$apply();
          wx.hideLoading()
        }
      }
    }
  }
</script>
