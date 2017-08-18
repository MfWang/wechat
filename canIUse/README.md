# caniuse简化版（微信小程序）

![小程序二维码](http://lab.tianyizone.com/caniuse.png)

一次无意间在 GitHub 上看到 [@Fyrd](https://github.com/Fyrd) 的仓库中有一个 [caniuse](https://github.com/Fyrd/caniuse)，并且发现最关键的一点就是 http://caniuse.com 网站中的数据在这里可以直接看到，于是乎就冒出用这个 json 文件写一个小程序的想法。

> https://raw.githubusercontent.com/Fyrd/caniuse/master/data.json

在这里必须要感谢 [@Fyrd](https://github.com/Fyrd) 对这个 **data.json** 的开源。



## 📌 License

> The data in this repo is available for use under a CC BY 4.0 license ([https://creativecommons.org/licenses/by/4.0/](https://creativecommons.org/licenses/by/4.0/)). 

在 https://github.com/Fyrd/caniuse 上 [@Fyrd](https://github.com/Fyrd) 提到这个源是基于 **CC BY 4.0 license** 的，所以，我这个微信小程序的要采用的是 **CC BY-NC-SA 4.0**。

![CC](https://creativecommons.org/wp-content/themes/creativecommons.org/images/chooser_cc.png)![BY](https://creativecommons.org/wp-content/themes/creativecommons.org/images/chooser_by.png)![NC](https://creativecommons.org/wp-content/themes/creativecommons.org/images/chooser_nc.png)![SA](https://creativecommons.org/wp-content/themes/creativecommons.org/images/chooser_sa.png)

**[署名-非商业性使用-相同方式共享 4.0 国际](http://creativecommons.org/licenses/by-nc-sa/4.0/)** ![CC-BY-NC-SA](https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png)



## 📌 小程序使用说明

其实这个小程序使用起来很简单，在目前最新的一版中（暂且叫 2.0.0 版本）对分享的模式进行了改变，对页面中的一些交互点也做了一些调整。

### 分享方式

搞这个小程序当时也是因为在微信群里经常看到有人在说兼容性的问题，然后再就是截图或者拍照发出来，感觉挺麻烦，所以，这个小程序必须是要有分享的。

分享的方法很简单：

* 长按某一个属性的卡片（长按时间大于 300ms 即可）；
* 长按放开后，弹出一个提示，如果是自己需要分享的卡片，直接点”确定“，否则”取消“即可；
* ”确定“之后会单独展示这个卡片内容，然后就可以点微信顶部的那个”···“来分享到你需要分享的地方（好友或者微信群）；



## 📌 加载问题

这个问题是大家提到最多的，也是我个人最头痛的，在我自己的能力范围内，自认为已经在第一版的基础上做了不少的改进了，不过应该还是会有改进的空间，只是我自己目前暂时做不到。

当然，加载也有可能是因为网络请求问题。在开发的过程中，有时候我看到 “network“ 面板中的 data.json 请求时间是将近 50s 的，虽然经过压缩后只有 256K（这个数据会变，data.json 一直在修改和增加）。

目前我设置了超过 30s 就提示加载过久，是否需要重新加载。

当加载完之后，把 data.json 中 N 多层级的内容取出来，放到小程序的 `localStorage` 中。

所以，加载的时间大部分都是在做这个事情。

### 第二次打开之后加载为什么初始化

当第一次加载完成之后，并存放在 `localStorage` 中后，第二次打开，就算你没网络一样也可以用。但是无论你是否有网络状态，第二次打开会有一个初始化的提示。

这个是因为我当时想从 `localStorage` 中把需要的数据再取出来放到 AppData 中，然后再去使用。

不过好像代码上没处理好…….😓



## 📌 其他

好像就没有其他什么了，如果各位看得起，就给个✨；然后那啥，源代码发出来，并不是说大家可以直接使用这个提交给微信小程序审核，而是用来学习交流的，当然，如果有愿意把这个代码再提交给微信小程序审核的，那我也无法可说了，简单两个字：**投诉**！🤔