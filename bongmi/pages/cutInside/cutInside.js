/**
 * Created by sail on 2017/6/1.
 */
const app = getApp()

import weCropper from '../dist/weCropper'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
// const height = device.windowHeight
const height = device.windowHeight - width / 750 * 156

Page({
	data: {
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
	},
	touchStart (e) {
		this.wecropper.touchStart(e)
	},
	touchMove (e) {
		this.wecropper.touchMove(e)
	},
	touchEnd (e) {
		this.wecropper.touchEnd(e)
	},
  takePhoto: function () {
    app.takePhoto();
  },
  uploadToResult: function () {
    const that = this;
    this.wecropper.getCropperImage((src) => {
      if (src) {
        app.globalData.tailorLocal = src;
        app.getQiniuToken(2);
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  },
  onLoad(options) {
    console.log(app.globalData)
    const self = this
		const { cropperOpt } = this.data
    new weCropper(cropperOpt)
    .on('ready', (ctx) => {
      console.log(`wecropper is ready for work!`)
    })
    .on('beforeImageLoad', (ctx) => {
      console.log(`before picture loaded, i can do something`)
      console.log(`current canvas context:`, ctx)
      wx.showToast({
        title: '上传中',
        icon: 'loading',
        duration: 20000
      })
    })
    .on('imageLoad', (ctx) => {
      console.log(`picture loaded`)
      console.log(`current canvas context:`, ctx)
      wx.hideToast()
    })
    .on('beforeDraw', (ctx, instance) => {
      console.log(`before canvas draw,i can do something`)
      console.log(`current canvas context:`, ctx)
    })
    .updateCanvas()
    self.wecropper.pushOrign(app.globalData.pictureLocal);
	}
})
