/**
 * Created by sail on 2017/6/1.
 */

import weCropper from '../dist/weCropper'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
// const height = 250

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
				y: (height - 50) / 2,
        width: width - 8,
				height: 50
			}
		},
    	cutimg: ""
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
	getCropperImage () {
    	const that = this;
		this.wecropper.getCropperImage((src) => {
			if (src) {
				console.log(src)
        that.setData({ cutimg: src})
        wx.previewImage({
          current: '',
          urls: [src]
        })
			} else {
				console.log('获取图片地址失败，请稍后重试')
			}
		})
	},
	uploadTap () {
		const self = this

		wx.chooseImage({
			count: 1, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
			success (res) {
				const src = res.tempFilePaths[0]
				//  获取裁剪图片资源后，给data添加src属性及其值
				self.wecropper.pushOrign(src)
			}
		})
	},
  goback () {
    wx.navigateBack()
  },
  onLoad(options) {
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

    let item = JSON.parse(options.jsonStr);
    self.wecropper.pushOrign(item.tempFilePaths[0]); 
	}
})
