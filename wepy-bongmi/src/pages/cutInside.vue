<style lang="less">
  .pages{
    background: #000;
    position: relative;
    border-top: none;
  }
  .cropper{
    width: 100%;
    height: 100%;
    background-color: #000;
  }
  .cropper-wrapper{
    width: 100%;
    height: calc(100vh - 156rpx);
    height: 100vh;
    background: rgba(0,0,0,0.8);
  }
  .cropper{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .cover-img{
    position: absolute;
    top: 347rpx;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 308rpx;
  }
  .tips{
    width: 100%;
    position: absolute;
    top: 180rpx;
    left: 50%;
    color: #fff;
    font-size: 24rpx;
    text-align: center;
    transform: translateX(-50%);
    z-index: 10;
  }
  .tips2{
    width: 100%;
    position: absolute;
    top: 735rpx;
    left: 50%;
    color: #fff;
    font-size: 24rpx;
    text-align: center;
    transform: translateX(-50%);
    z-index: 10;
  }
  .cropper-buttons{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 156rpx;
    text-align: center;
    // position: absolute;
    top: calc(100vh - 156rpx);
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
  <view class="pages">
    <view class="cropper-wrapper">

    </view>
    <view class="cropper-buttons">
      <view class="back" bindtap="takePhoto"><text class="iconfont icon-btn_back"></text> </view>
      <view class="complete" bindtap="uploadToResult"> <text class="iconfont icon-btn_correct"></text> </view>
    </view>
  </view>
</template>

<script>
  const device = wx.getSystemInfoSync()
  const width = device.windowWidth
  // const height = device.windowHeight
  const height = device.windowHeight - width / 750 * 156
  import wepy from 'wepy'
  import weCropper from '../mixins/weCropper'

  export default class Cutinside extends wepy.page {
    config = {
      navigationBarTitleText: '局部裁剪',
      navigationBarBackgroundColor: '#000',
      navigationBarTextStyle: '#fff'
    }
    components = {
    }

    mixins = []

    data = {
      cropperOpt: {
        id: 'cropper',
        width,
        height,
        scale: 2.5,
        zoom: 8,
        cut: {
          x: 4,
          y: width / 750 * 558,
          width: width - 8,
          height: width / 750 * 50
        }
      },
    	cutimg: null,
      uploadInfo: null,
      photoInfo: null
    }

    methods = {

    }


    onLoad() {
    }
  }
</script>
