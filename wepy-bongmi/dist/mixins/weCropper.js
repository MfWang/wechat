'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
	(typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.weCropper = factory();
})(undefined, function () {
	'use strict';

	var version = "1.1.4";

	/**
  * Created by sail on 2017/6/11.
  */
	var device = void 0;
	var TOUCH_STATE = ['touchstarted', 'touchmoved', 'touchended'];

	function firstLetterUpper(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function setTouchState(instance) {
		for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			arg[_key - 1] = arguments[_key];
		}

		TOUCH_STATE.forEach(function (key, i) {
			if (arg[i] !== undefined) {
				instance[key] = arg[i];
			}
		});
	}

	function validator(instance, o) {
		Object.defineProperties(instance, o);
	}

	function getDevice() {
		if (!device) {
			device = wx.getSystemInfoSync();
		}
		return device;
	}

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
		return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	};

	var classCallCheck = function classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	};

	var createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	var slicedToArray = function () {
		function sliceIterator(arr, i) {
			var _arr = [];
			var _n = true;
			var _d = false;
			var _e = undefined;

			try {
				for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
					_arr.push(_s.value);

					if (i && _arr.length === i) break;
				}
			} catch (err) {
				_d = true;
				_e = err;
			} finally {
				try {
					if (!_n && _i["return"]) _i["return"]();
				} finally {
					if (_d) throw _e;
				}
			}

			return _arr;
		}

		return function (arr, i) {
			if (Array.isArray(arr)) {
				return arr;
			} else if (Symbol.iterator in Object(arr)) {
				return sliceIterator(arr, i);
			} else {
				throw new TypeError("Invalid attempt to destructure non-iterable instance");
			}
		};
	}();

	var tmp = {};

	var DEFAULT = {
		id: {
			default: 'cropper',
			get: function get$$1() {
				return tmp.id;
			},
			set: function set$$1(value) {
				if (typeof value !== 'string') {
					console.error('id\uFF1A' + value + ' is invalid');
				}
				tmp.id = value;
			}
		},
		width: {
			default: 750,
			get: function get$$1() {
				return tmp.width;
			},
			set: function set$$1(value) {
				if (typeof value !== 'number') {
					console.error('width\uFF1A' + value + ' is invalid');
				}
				tmp.width = value;
			}
		},
		height: {
			default: 750,
			get: function get$$1() {
				return tmp.height;
			},
			set: function set$$1(value) {
				if (typeof value !== 'number') {
					console.error('height\uFF1A' + value + ' is invalid');
				}
				tmp.height = value;
			}
		},
		scale: {
			default: 2.5,
			get: function get$$1() {
				return tmp.scale;
			},
			set: function set$$1(value) {
				if (typeof value !== 'number') {
					console.error('scale\uFF1A' + value + ' is invalid');
				}
				tmp.scale = value;
			}
		},
		zoom: {
			default: 5,
			get: function get$$1() {
				return tmp.zoom;
			},
			set: function set$$1(value) {
				if (typeof value !== 'number') {
					console.error('zoom\uFF1A' + value + ' is invalid');
				} else if (value < 0 || value > 10) {
					console.error('zoom should be ranged in 0 ~ 10');
				}
				tmp.zoom = value;
			}
		},
		src: {
			default: 'cropper',
			get: function get$$1() {
				return tmp.src;
			},
			set: function set$$1(value) {
				if (typeof value !== 'string') {
					console.error('id\uFF1A' + value + ' is invalid');
				}
				tmp.src = value;
			}
		},
		cut: {
			default: {},
			get: function get$$1() {
				return tmp.cut;
			},
			set: function set$$1(value) {
				if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
					console.error('id\uFF1A' + value + ' is invalid');
				}
				tmp.cut = value;
			}
		},
		onReady: {
			default: null,
			get: function get$$1() {
				return tmp.ready;
			},
			set: function set$$1(value) {
				tmp.ready = value;
			}
		},
		onBeforeImageLoad: {
			default: null,
			get: function get$$1() {
				return tmp.beforeImageLoad;
			},
			set: function set$$1(value) {
				tmp.beforeImageLoad = value;
			}
		},
		onImageLoad: {
			default: null,
			get: function get$$1() {
				return tmp.imageLoad;
			},
			set: function set$$1(value) {
				tmp.imageLoad = value;
			}
		},
		onBeforeDraw: {
			default: null,
			get: function get$$1() {
				return tmp.beforeDraw;
			},
			set: function set$$1(value) {
				tmp.beforeDraw = value;
			}
		}
	};

	/**
  * Created by sail on 2017/6/11.
  */
	function prepare() {
		var self = this;

		var _getDevice = getDevice(),
		    windowWidth = _getDevice.windowWidth;

		self.attachPage = function () {
			var pages = getCurrentPages();
			//  获取到当前page上下文
			var pageContext = pages[pages.length - 1];
			//  把this依附在Page上下文的wecropper属性上，便于在page钩子函数中访问
			pageContext.wecropper = self;
		};

		self.createCtx = function () {
			var id = self.id;

			if (id) {
				self.ctx = wx.createCanvasContext(id);
			} else {
				console.error('constructor: create canvas context failed, \'id\' must be valuable');
			}
		};

		self.deviceRadio = windowWidth / 750;
	}

	/**
  *
  */
	function observer() {
		var self = this;

		var EVENT_TYPE = ['ready', 'beforeImageLoad', 'beforeDraw', 'imageLoad'];

		self.on = function (event, fn) {
			if (EVENT_TYPE.indexOf(event) > -1) {
				if (typeof fn === 'function') {
					event === 'ready' ? fn(self) : self['on' + firstLetterUpper(event)] = fn;
				}
			} else {
				console.error('event: ' + event + ' is invalid');
			}
			return self;
		};
	}

	/**
  * Created by sail on 2017/6/11.
  */
	function methods() {
		var self = this;

		var deviceRadio = self.deviceRadio;

		var boundWidth = self.width; // 裁剪框默认宽度，即整个画布宽度
		var boundHeight = self.height; // 裁剪框默认高度，即整个画布高度
		var _self$cut = self.cut,
		    _self$cut$x = _self$cut.x,
		    x = _self$cut$x === undefined ? 0 : _self$cut$x,
		    _self$cut$y = _self$cut.y,
		    y = _self$cut$y === undefined ? 0 : _self$cut$y,
		    _self$cut$width = _self$cut.width,
		    width = _self$cut$width === undefined ? boundWidth : _self$cut$width,
		    _self$cut$height = _self$cut.height,
		    height = _self$cut$height === undefined ? boundHeight : _self$cut$height;

		self.updateCanvas = function () {
			if (self.croperTarget) {
				//  画布绘制图片
				self.ctx.drawImage(self.croperTarget, self.imgLeft, self.imgTop, self.scaleWidth, self.scaleHeight);
			}
			typeof self.onBeforeDraw === 'function' && self.onBeforeDraw(self.ctx, self);

			self.setBoundStyle(); //	设置边界样式
			self.ctx.draw();
			return self;
		};

		self.pushOrign = function (src) {
			self.src = src;

			typeof self.onBeforeImageLoad === 'function' && self.onBeforeImageLoad(self.ctx, self);

			wx.getImageInfo({
				src: src,
				success: function success(res) {
					var innerAspectRadio = res.width / res.height;

					self.croperTarget = res.path;

					console.log(x, y);
					if (innerAspectRadio < width / height) {
						self.rectX = x;
						self.baseWidth = width;
						self.baseHeight = width / innerAspectRadio;
						self.rectY = y - Math.abs((height - self.baseHeight) / 2);
					} else {
						self.rectY = y;
						self.baseWidth = height * innerAspectRadio;
						self.baseHeight = height;
						self.rectX = x - Math.abs((width - self.baseWidth) / 2);
					}

					self.imgLeft = self.rectX;
					self.imgTop = self.rectY;
					self.scaleWidth = self.baseWidth;
					self.scaleHeight = self.baseHeight;

					self.updateCanvas();

					typeof self.onImageLoad === 'function' && self.onImageLoad(self.ctx, self);
				}
			});

			self.update();
			return self;
		};

		self.getCropperImage = function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var id = self.id;

			var ARG_TYPE = toString.call(args[0]);

			switch (ARG_TYPE) {
				case '[object Object]':
					var _args$0$quality = args[0].quality,
					    quality = _args$0$quality === undefined ? 10 : _args$0$quality;

					if (typeof quality !== 'number') {
						console.error('quality\uFF1A' + quality + ' is invalid');
					} else if (quality < 0 || quality > 10) {
						console.error('quality should be ranged in 0 ~ 10');
					}
					wx.canvasToTempFilePath({
						canvasId: id,
						x: x,
						y: y,
						width: width,
						height: height,
						destWidth: width * quality / (deviceRadio * 10),
						destHeight: height * quality / (deviceRadio * 10),
						success: function success(res) {
							typeof args[args.length - 1] === 'function' && args[args.length - 1](res.tempFilePath);
						}
					});break;
				case '[object Function]':
					wx.canvasToTempFilePath({
						canvasId: id,
						x: x,
						y: y,
						width: width,
						height: height,
						destWidth: width / deviceRadio,
						destHeight: height / deviceRadio,
						success: function success(res) {
							typeof args[args.length - 1] === 'function' && args[args.length - 1](res.tempFilePath);
						}
					});break;
			}

			return self;
		};
	}

	/**
  * Created by sail on 2017/6/11.
  */
	function update() {
		var self = this;

		if (!self.src) return;

		self.__oneTouchStart = function (touch) {
			self.touchX0 = touch.x;
			self.touchY0 = touch.y;
		};

		self.__oneTouchMove = function (touch) {
			var xMove = void 0,
			    yMove = void 0;
			//计算单指移动的距离
			if (self.touchended) {
				return self.updateCanvas();
			}
			xMove = touch.x - self.touchX0;
			yMove = touch.y - self.touchY0;

			var imgLeft = self.rectX + xMove;
			var imgTop = self.rectY + yMove;

			self.outsideBound(imgLeft, imgTop);

			self.updateCanvas();
		};

		self.__twoTouchStart = function (touch0, touch1) {
			var xMove = void 0,
			    yMove = void 0,
			    oldDistance = void 0;

			self.touchX1 = self.rectX + self.scaleWidth / 2;
			self.touchY1 = self.rectY + self.scaleHeight / 2;

			//计算两指距离
			xMove = touch1.x - touch0.x;
			yMove = touch1.y - touch0.y;
			oldDistance = Math.sqrt(xMove * xMove + yMove * yMove);

			self.oldDistance = oldDistance;
		};

		self.__twoTouchMove = function (touch0, touch1) {
			var xMove = void 0,
			    yMove = void 0,
			    newDistance = void 0;
			var scale = self.scale,
			    zoom = self.zoom;
			// 计算二指最新距离

			xMove = touch1.x - touch0.x;
			yMove = touch1.y - touch0.y;
			newDistance = Math.sqrt(xMove * xMove + yMove * yMove);

			//  使用0.005的缩放倍数具有良好的缩放体验
			self.newScale = self.oldScale + 0.001 * zoom * (newDistance - self.oldDistance);

			//  设定缩放范围
			self.newScale <= 1 && (self.newScale = 1);
			self.newScale >= scale && (self.newScale = scale);

			self.scaleWidth = self.newScale * self.baseWidth;
			self.scaleHeight = self.newScale * self.baseHeight;
			var imgLeft = self.touchX1 - self.scaleWidth / 2;
			var imgTop = self.touchY1 - self.scaleHeight / 2;

			self.outsideBound(imgLeft, imgTop);

			self.updateCanvas();
		};

		self.__xtouchEnd = function () {
			self.oldScale = self.newScale;
			self.rectX = self.imgLeft;
			self.rectY = self.imgTop;
		};
	}

	/**
  * Created by sail on 2017/6/11.
  */

	var handle = {
		//  图片手势初始监测
		touchStart: function touchStart(e) {
			var self = this;

			var _e$touches = slicedToArray(e.touches, 2),
			    touch0 = _e$touches[0],
			    touch1 = _e$touches[1];

			setTouchState(self, true, null, null);

			//计算第一个触摸点的位置，并参照改点进行缩放
			self.__oneTouchStart(touch0);

			// 两指手势触发
			if (e.touches.length >= 2) {
				self.__twoTouchStart(touch0, touch1);
			}
		},

		//  图片手势动态缩放
		touchMove: function touchMove(e) {
			var self = this;

			var _e$touches2 = slicedToArray(e.touches, 2),
			    touch0 = _e$touches2[0],
			    touch1 = _e$touches2[1];

			setTouchState(self, null, true);

			// 单指手势时触发
			if (e.touches.length === 1) {
				self.__oneTouchMove(touch0);
			}
			// 两指手势触发
			if (e.touches.length >= 2) {
				self.__twoTouchMove(touch0, touch1);
			}
		},
		touchEnd: function touchEnd(e) {
			var self = this;

			setTouchState(self, false, false, true);
			self.__xtouchEnd();
		}
	};

	/**
  * Created by sail on 1017/6/12.
  */
	function cut() {
		var self = this;
		var deviceRadio = self.deviceRadio;

		var boundWidth = self.width; // 裁剪框默认宽度，即整个画布宽度
		var boundHeight = self.height;
		// 裁剪框默认高度，即整个画布高度
		var _self$cut = self.cut,
		    _self$cut$x = _self$cut.x,
		    x = _self$cut$x === undefined ? 0 : _self$cut$x,
		    _self$cut$y = _self$cut.y,
		    y = _self$cut$y === undefined ? 0 : _self$cut$y,
		    _self$cut$width = _self$cut.width,
		    width = _self$cut$width === undefined ? boundWidth : _self$cut$width,
		    _self$cut$height = _self$cut.height,
		    height = _self$cut$height === undefined ? boundHeight : _self$cut$height;

		/**
   * 设置边界
   * @param imgLeft 图片左上角横坐标值
   * @param imgTop 图片左上角纵坐标值
   */

		self.outsideBound = function (imgLeft, imgTop) {
			self.imgLeft = imgLeft >= x ? x : self.scaleWidth + imgLeft - x <= width ? x + width - self.scaleWidth : imgLeft;

			self.imgTop = imgTop >= y ? y : self.scaleHeight + imgTop - y <= height ? y + height - self.scaleHeight : imgTop;
		};

		/**
   * 设置边界样式
   * @param color	边界颜色
   */
		self.setBoundStyle = function () {
			var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
			    _ref$color = _ref.color,
			    color = _ref$color === undefined ? '#E56CAB' : _ref$color,
			    _ref$mask = _ref.mask,
			    mask = _ref$mask === undefined ? 'rgba(0, 0, 0, 0.6)' : _ref$mask,
			    _ref$lineWidth = _ref.lineWidth,
			    lineWidth = _ref$lineWidth === undefined ? 2 : _ref$lineWidth;

			// 绘制半透明层
			self.ctx.beginPath();
			self.ctx.setFillStyle(mask);
			self.ctx.fillRect(0, 0, x, boundHeight);
			self.ctx.fillRect(x, 0, width, y);
			self.ctx.fillRect(x, y + height, width, boundHeight - y - height);
			self.ctx.fillRect(x + width, 0, boundWidth - x - width, boundHeight);
			self.ctx.fill();

			// 设置边界左上角样式
			// 为使边界样式处于边界外边缘，此时x、y均要减少lineWidth
			self.ctx.beginPath();
			self.ctx.setStrokeStyle(color);
			self.ctx.setLineWidth(lineWidth);
			self.ctx.moveTo(x - lineWidth, y + 10 - lineWidth);
			self.ctx.lineTo(x - lineWidth, y - lineWidth);
			self.ctx.lineTo(x + 10 - lineWidth, y - lineWidth);
			self.ctx.stroke();

			// 设置边界左下角样式
			// 为使边界样式处于边界外边缘，此时x要减少lineWidth、y要增加lineWidth
			self.ctx.beginPath();
			self.ctx.setStrokeStyle(color);
			self.ctx.setLineWidth(lineWidth);
			self.ctx.moveTo(x - lineWidth, y + height - 10 + lineWidth);
			self.ctx.lineTo(x - lineWidth, y + height + lineWidth);
			self.ctx.lineTo(x + 10 - lineWidth, y + height + lineWidth);
			self.ctx.stroke();

			// 设置边界右上角样式
			// 为使边界样式处于边界外边缘，此时x要增加lineWidth、y要减少lineWidth
			self.ctx.beginPath();
			self.ctx.setStrokeStyle(color);
			self.ctx.setLineWidth(lineWidth);
			self.ctx.moveTo(x + width - 10 + lineWidth, y - lineWidth);
			self.ctx.lineTo(x + width + lineWidth, y - lineWidth);
			self.ctx.lineTo(x + width + lineWidth, y + 10 - lineWidth);
			self.ctx.stroke();

			// 设置边界右下角样式
			// 为使边界样式处于边界外边缘，此时x、y均要增加lineWidth
			self.ctx.beginPath();
			self.ctx.setStrokeStyle(color);
			self.ctx.setLineWidth(lineWidth);
			self.ctx.moveTo(x + width + lineWidth, y + height - 10 + lineWidth);
			self.ctx.lineTo(x + width + lineWidth, y + height + lineWidth);
			self.ctx.lineTo(x + width - 10 + lineWidth, y + height + lineWidth);
			self.ctx.stroke();
		};
	}

	var weCropper = function () {
		function weCropper(params) {
			classCallCheck(this, weCropper);

			var self = this;
			var _default = {};

			validator(self, DEFAULT);

			Object.keys(DEFAULT).forEach(function (key) {
				_default[key] = DEFAULT[key].default;
			});
			Object.assign(self, _default, params);

			self.prepare();
			self.attachPage();
			self.createCtx();
			self.observer();
			self.cutt();
			self.methods();
			self.init();
			self.update();

			return self;
		}

		createClass(weCropper, [{
			key: 'init',
			value: function init() {
				var self = this;
				var src = self.src;

				self.version = version;

				typeof self.onReady === 'function' && self.onReady(self.ctx, self);

				if (src) {
					self.pushOrign(src);
				}
				setTouchState(self, false, false, false);

				self.oldScale = 1;
				self.newScale = 1;

				return self;
			}
		}]);
		return weCropper;
	}();

	Object.assign(weCropper.prototype, handle);

	weCropper.prototype.prepare = prepare;
	weCropper.prototype.observer = observer;
	weCropper.prototype.methods = methods;
	weCropper.prototype.cutt = cut;
	weCropper.prototype.update = update;

	return weCropper;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlQ3JvcHBlci5qcyJdLCJuYW1lcyI6WyJnbG9iYWwiLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsIndlQ3JvcHBlciIsInZlcnNpb24iLCJkZXZpY2UiLCJUT1VDSF9TVEFURSIsImZpcnN0TGV0dGVyVXBwZXIiLCJzdHIiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwic2V0VG91Y2hTdGF0ZSIsImluc3RhbmNlIiwiX2xlbiIsImFyZ3VtZW50cyIsImxlbmd0aCIsImFyZyIsIkFycmF5IiwiX2tleSIsImZvckVhY2giLCJrZXkiLCJpIiwidW5kZWZpbmVkIiwidmFsaWRhdG9yIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnRpZXMiLCJnZXREZXZpY2UiLCJ3eCIsImdldFN5c3RlbUluZm9TeW5jIiwiX3R5cGVvZiIsIlN5bWJvbCIsIml0ZXJhdG9yIiwib2JqIiwiY29uc3RydWN0b3IiLCJwcm90b3R5cGUiLCJjbGFzc0NhbGxDaGVjayIsIkNvbnN0cnVjdG9yIiwiVHlwZUVycm9yIiwiY3JlYXRlQ2xhc3MiLCJ0YXJnZXQiLCJwcm9wcyIsImRlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsInNsaWNlZFRvQXJyYXkiLCJzbGljZUl0ZXJhdG9yIiwiYXJyIiwiX2FyciIsIl9uIiwiX2QiLCJfZSIsIl9pIiwiX3MiLCJuZXh0IiwiZG9uZSIsInB1c2giLCJ2YWx1ZSIsImVyciIsImlzQXJyYXkiLCJ0bXAiLCJERUZBVUxUIiwiaWQiLCJkZWZhdWx0IiwiZ2V0IiwiZ2V0JCQxIiwic2V0Iiwic2V0JCQxIiwiY29uc29sZSIsImVycm9yIiwid2lkdGgiLCJoZWlnaHQiLCJzY2FsZSIsInpvb20iLCJzcmMiLCJjdXQiLCJvblJlYWR5IiwicmVhZHkiLCJvbkJlZm9yZUltYWdlTG9hZCIsImJlZm9yZUltYWdlTG9hZCIsIm9uSW1hZ2VMb2FkIiwiaW1hZ2VMb2FkIiwib25CZWZvcmVEcmF3IiwiYmVmb3JlRHJhdyIsInByZXBhcmUiLCJzZWxmIiwiX2dldERldmljZSIsIndpbmRvd1dpZHRoIiwiYXR0YWNoUGFnZSIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwicGFnZUNvbnRleHQiLCJ3ZWNyb3BwZXIiLCJjcmVhdGVDdHgiLCJjdHgiLCJjcmVhdGVDYW52YXNDb250ZXh0IiwiZGV2aWNlUmFkaW8iLCJvYnNlcnZlciIsIkVWRU5UX1RZUEUiLCJvbiIsImV2ZW50IiwiZm4iLCJpbmRleE9mIiwibWV0aG9kcyIsImJvdW5kV2lkdGgiLCJib3VuZEhlaWdodCIsIl9zZWxmJGN1dCIsIl9zZWxmJGN1dCR4IiwieCIsIl9zZWxmJGN1dCR5IiwieSIsIl9zZWxmJGN1dCR3aWR0aCIsIl9zZWxmJGN1dCRoZWlnaHQiLCJ1cGRhdGVDYW52YXMiLCJjcm9wZXJUYXJnZXQiLCJkcmF3SW1hZ2UiLCJpbWdMZWZ0IiwiaW1nVG9wIiwic2NhbGVXaWR0aCIsInNjYWxlSGVpZ2h0Iiwic2V0Qm91bmRTdHlsZSIsImRyYXciLCJwdXNoT3JpZ24iLCJnZXRJbWFnZUluZm8iLCJzdWNjZXNzIiwicmVzIiwiaW5uZXJBc3BlY3RSYWRpbyIsInBhdGgiLCJsb2ciLCJyZWN0WCIsImJhc2VXaWR0aCIsImJhc2VIZWlnaHQiLCJyZWN0WSIsIk1hdGgiLCJhYnMiLCJ1cGRhdGUiLCJnZXRDcm9wcGVySW1hZ2UiLCJhcmdzIiwiQVJHX1RZUEUiLCJ0b1N0cmluZyIsImNhbGwiLCJfYXJncyQwJHF1YWxpdHkiLCJxdWFsaXR5IiwiY2FudmFzVG9UZW1wRmlsZVBhdGgiLCJjYW52YXNJZCIsImRlc3RXaWR0aCIsImRlc3RIZWlnaHQiLCJ0ZW1wRmlsZVBhdGgiLCJfX29uZVRvdWNoU3RhcnQiLCJ0b3VjaCIsInRvdWNoWDAiLCJ0b3VjaFkwIiwiX19vbmVUb3VjaE1vdmUiLCJ4TW92ZSIsInlNb3ZlIiwidG91Y2hlbmRlZCIsIm91dHNpZGVCb3VuZCIsIl9fdHdvVG91Y2hTdGFydCIsInRvdWNoMCIsInRvdWNoMSIsIm9sZERpc3RhbmNlIiwidG91Y2hYMSIsInRvdWNoWTEiLCJzcXJ0IiwiX190d29Ub3VjaE1vdmUiLCJuZXdEaXN0YW5jZSIsIm5ld1NjYWxlIiwib2xkU2NhbGUiLCJfX3h0b3VjaEVuZCIsImhhbmRsZSIsInRvdWNoU3RhcnQiLCJlIiwiX2UkdG91Y2hlcyIsInRvdWNoZXMiLCJ0b3VjaE1vdmUiLCJfZSR0b3VjaGVzMiIsInRvdWNoRW5kIiwiX3JlZiIsIl9yZWYkY29sb3IiLCJjb2xvciIsIl9yZWYkbWFzayIsIm1hc2siLCJfcmVmJGxpbmVXaWR0aCIsImxpbmVXaWR0aCIsImJlZ2luUGF0aCIsInNldEZpbGxTdHlsZSIsImZpbGxSZWN0IiwiZmlsbCIsInNldFN0cm9rZVN0eWxlIiwic2V0TGluZVdpZHRoIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIiwicGFyYW1zIiwiX2RlZmF1bHQiLCJrZXlzIiwiYXNzaWduIiwiY3V0dCIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQyxXQUFVQSxNQUFWLEVBQWtCQyxPQUFsQixFQUEyQjtBQUMzQixTQUFPQyxPQUFQLDBDQUFPQSxPQUFQLE9BQW1CLFFBQW5CLElBQStCLE9BQU9DLE1BQVAsS0FBa0IsV0FBakQsR0FBK0RBLE9BQU9ELE9BQVAsR0FBaUJELFNBQWhGLEdBQ0EsT0FBT0csTUFBUCxLQUFrQixVQUFsQixJQUFnQ0EsT0FBT0MsR0FBdkMsR0FBNkNELE9BQU9ILE9BQVAsQ0FBN0MsR0FDQ0QsT0FBT00sU0FBUCxHQUFtQkwsU0FGcEI7QUFHQSxDQUpBLGFBSVEsWUFBWTtBQUFFOztBQUV2QixLQUFJTSxVQUFVLE9BQWQ7O0FBRUE7OztBQUdBLEtBQUlDLFNBQVMsS0FBSyxDQUFsQjtBQUNBLEtBQUlDLGNBQWMsQ0FBQyxjQUFELEVBQWlCLFlBQWpCLEVBQStCLFlBQS9CLENBQWxCOztBQUVBLFVBQVNDLGdCQUFULENBQTBCQyxH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QVYsQ0FBb0JrRSxRQUFwQixHQUErQkEsUUFBL0I7QUFDQW5HLFdBQVVpQyxTQUFWLENBQW9Cd0UsT0FBcEIsR0FBOEJBLE9BQTlCO0FBQ0F6RyxXQUFVaUMsU0FBVixDQUFvQnNLLElBQXBCLEdBQTJCMUgsR0FBM0I7QUFDQTdFLFdBQVVpQyxTQUFWLENBQW9Cd0csTUFBcEIsR0FBNkJBLE1BQTdCOztBQUVBLFFBQU96SSxTQUFQO0FBRUMsQ0FsdUJBLENBQUQiLCJmaWxlIjoid2VDcm9wcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLndlQ3JvcHBlciA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxudmFyIHZlcnNpb24gPSBcIjEuMS40XCI7XG5cbi8qKlxuICogQ3JlYXRlZCBieSBzYWlsIG9uIDIwMTcvNi8xMS5cbiAqL1xudmFyIGRldmljZSA9IHZvaWQgMDtcbnZhciBUT1VDSF9TVEFURSA9IFsndG91Y2hzdGFydGVkJywgJ3RvdWNobW92ZWQnLCAndG91Y2hlbmRlZCddO1xuXG5mdW5jdGlvbiBmaXJzdExldHRlclVwcGVyKHN0cikge1xuXHRyZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xufVxuXG5mdW5jdGlvbiBzZXRUb3VjaFN0YXRlKGluc3RhbmNlKSB7XG5cdGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmcgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG5cdFx0YXJnW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcblx0fVxuXG5cdFRPVUNIX1NUQVRFLmZvckVhY2goZnVuY3Rpb24gKGtleSwgaSkge1xuXHRcdGlmIChhcmdbaV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0aW5zdGFuY2Vba2V5XSA9IGFyZ1tpXTtcblx0XHR9XG5cdH0pO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0b3IoaW5zdGFuY2UsIG8pIHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoaW5zdGFuY2UsIG8pO1xufVxuXG5mdW5jdGlvbiBnZXREZXZpY2UoKSB7XG5cdGlmICghZGV2aWNlKSB7XG5cdFx0ZGV2aWNlID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcblx0fVxuXHRyZXR1cm4gZGV2aWNlO1xufVxuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xufTtcblxuXG5cblxuXG5cblxuXG5cblxuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxudmFyIGNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxudmFyIHNsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcbiAgICB2YXIgX24gPSB0cnVlO1xuICAgIHZhciBfZCA9IGZhbHNlO1xuICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSB0cnVlO1xuICAgICAgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7XG5cbnZhciB0bXAgPSB7fTtcblxudmFyIERFRkFVTFQgPSB7XG5cdGlkOiB7XG5cdFx0ZGVmYXVsdDogJ2Nyb3BwZXInLFxuXHRcdGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuXHRcdFx0cmV0dXJuIHRtcC5pZDtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24gc2V0JCQxKHZhbHVlKSB7XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdpZFxcdUZGMUEnICsgdmFsdWUgKyAnIGlzIGludmFsaWQnKTtcblx0XHRcdH1cblx0XHRcdHRtcC5pZCA9IHZhbHVlO1xuXHRcdH1cblx0fSxcblx0d2lkdGg6IHtcblx0XHRkZWZhdWx0OiA3NTAsXG5cdFx0Z2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG5cdFx0XHRyZXR1cm4gdG1wLndpZHRoO1xuXHRcdH0sXG5cdFx0c2V0OiBmdW5jdGlvbiBzZXQkJDEodmFsdWUpIHtcblx0XHRcdGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ3dpZHRoXFx1RkYxQScgKyB2YWx1ZSArICcgaXMgaW52YWxpZCcpO1xuXHRcdFx0fVxuXHRcdFx0dG1wLndpZHRoID0gdmFsdWU7XG5cdFx0fVxuXHR9LFxuXHRoZWlnaHQ6IHtcblx0XHRkZWZhdWx0OiA3NTAsXG5cdFx0Z2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG5cdFx0XHRyZXR1cm4gdG1wLmhlaWdodDtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24gc2V0JCQxKHZhbHVlKSB7XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdoZWlnaHRcXHVGRjFBJyArIHZhbHVlICsgJyBpcyBpbnZhbGlkJyk7XG5cdFx0XHR9XG5cdFx0XHR0bXAuaGVpZ2h0ID0gdmFsdWU7XG5cdFx0fVxuXHR9LFxuXHRzY2FsZToge1xuXHRcdGRlZmF1bHQ6IDIuNSxcblx0XHRnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcblx0XHRcdHJldHVybiB0bXAuc2NhbGU7XG5cdFx0fSxcblx0XHRzZXQ6IGZ1bmN0aW9uIHNldCQkMSh2YWx1ZSkge1xuXHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignc2NhbGVcXHVGRjFBJyArIHZhbHVlICsgJyBpcyBpbnZhbGlkJyk7XG5cdFx0XHR9XG5cdFx0XHR0bXAuc2NhbGUgPSB2YWx1ZTtcblx0XHR9XG5cdH0sXG5cdHpvb206IHtcblx0XHRkZWZhdWx0OiA1LFxuXHRcdGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuXHRcdFx0cmV0dXJuIHRtcC56b29tO1xuXHRcdH0sXG5cdFx0c2V0OiBmdW5jdGlvbiBzZXQkJDEodmFsdWUpIHtcblx0XHRcdGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ3pvb21cXHVGRjFBJyArIHZhbHVlICsgJyBpcyBpbnZhbGlkJyk7XG5cdFx0XHR9IGVsc2UgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+IDEwKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ3pvb20gc2hvdWxkIGJlIHJhbmdlZCBpbiAwIH4gMTAnKTtcblx0XHRcdH1cblx0XHRcdHRtcC56b29tID0gdmFsdWU7XG5cdFx0fVxuXHR9LFxuXHRzcmM6IHtcblx0XHRkZWZhdWx0OiAnY3JvcHBlcicsXG5cdFx0Z2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG5cdFx0XHRyZXR1cm4gdG1wLnNyYztcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24gc2V0JCQxKHZhbHVlKSB7XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdpZFxcdUZGMUEnICsgdmFsdWUgKyAnIGlzIGludmFsaWQnKTtcblx0XHRcdH1cblx0XHRcdHRtcC5zcmMgPSB2YWx1ZTtcblx0XHR9XG5cdH0sXG5cdGN1dDoge1xuXHRcdGRlZmF1bHQ6IHt9LFxuXHRcdGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuXHRcdFx0cmV0dXJuIHRtcC5jdXQ7XG5cdFx0fSxcblx0XHRzZXQ6IGZ1bmN0aW9uIHNldCQkMSh2YWx1ZSkge1xuXHRcdFx0aWYgKCh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgIT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ2lkXFx1RkYxQScgKyB2YWx1ZSArICcgaXMgaW52YWxpZCcpO1xuXHRcdFx0fVxuXHRcdFx0dG1wLmN1dCA9IHZhbHVlO1xuXHRcdH1cblx0fSxcblx0b25SZWFkeToge1xuXHRcdGRlZmF1bHQ6IG51bGwsXG5cdFx0Z2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG5cdFx0XHRyZXR1cm4gdG1wLnJlYWR5O1xuXHRcdH0sXG5cdFx0c2V0OiBmdW5jdGlvbiBzZXQkJDEodmFsdWUpIHtcblx0XHRcdHRtcC5yZWFkeSA9IHZhbHVlO1xuXHRcdH1cblx0fSxcblx0b25CZWZvcmVJbWFnZUxvYWQ6IHtcblx0XHRkZWZhdWx0OiBudWxsLFxuXHRcdGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuXHRcdFx0cmV0dXJuIHRtcC5iZWZvcmVJbWFnZUxvYWQ7XG5cdFx0fSxcblx0XHRzZXQ6IGZ1bmN0aW9uIHNldCQkMSh2YWx1ZSkge1xuXHRcdFx0dG1wLmJlZm9yZUltYWdlTG9hZCA9IHZhbHVlO1xuXHRcdH1cblx0fSxcblx0b25JbWFnZUxvYWQ6IHtcblx0XHRkZWZhdWx0OiBudWxsLFxuXHRcdGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuXHRcdFx0cmV0dXJuIHRtcC5pbWFnZUxvYWQ7XG5cdFx0fSxcblx0XHRzZXQ6IGZ1bmN0aW9uIHNldCQkMSh2YWx1ZSkge1xuXHRcdFx0dG1wLmltYWdlTG9hZCA9IHZhbHVlO1xuXHRcdH1cblx0fSxcblx0b25CZWZvcmVEcmF3OiB7XG5cdFx0ZGVmYXVsdDogbnVsbCxcblx0XHRnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcblx0XHRcdHJldHVybiB0bXAuYmVmb3JlRHJhdztcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24gc2V0JCQxKHZhbHVlKSB7XG5cdFx0XHR0bXAuYmVmb3JlRHJhdyA9IHZhbHVlO1xuXHRcdH1cblx0fVxufTtcblxuLyoqXG4gKiBDcmVhdGVkIGJ5IHNhaWwgb24gMjAxNy82LzExLlxuICovXG5mdW5jdGlvbiBwcmVwYXJlKCkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0dmFyIF9nZXREZXZpY2UgPSBnZXREZXZpY2UoKSxcblx0ICAgIHdpbmRvd1dpZHRoID0gX2dldERldmljZS53aW5kb3dXaWR0aDtcblxuXHRzZWxmLmF0dGFjaFBhZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XG5cdFx0Ly8gIOiOt+WPluWIsOW9k+WJjXBhZ2XkuIrkuIvmlodcblx0XHR2YXIgcGFnZUNvbnRleHQgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAxXTtcblx0XHQvLyAg5oqKdGhpc+S+nemZhOWcqFBhZ2XkuIrkuIvmlofnmoR3ZWNyb3BwZXLlsZ7mgKfkuIrvvIzkvr/kuo7lnKhwYWdl6ZKp5a2Q5Ye95pWw5Lit6K6/6ZeuXG5cdFx0cGFnZUNvbnRleHQud2Vjcm9wcGVyID0gc2VsZjtcblx0fTtcblxuXHRzZWxmLmNyZWF0ZUN0eCA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgaWQgPSBzZWxmLmlkO1xuXG5cdFx0aWYgKGlkKSB7XG5cdFx0XHRzZWxmLmN0eCA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQoaWQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdjb25zdHJ1Y3RvcjogY3JlYXRlIGNhbnZhcyBjb250ZXh0IGZhaWxlZCwgXFwnaWRcXCcgbXVzdCBiZSB2YWx1YWJsZScpO1xuXHRcdH1cblx0fTtcblxuXHRzZWxmLmRldmljZVJhZGlvID0gd2luZG93V2lkdGggLyA3NTA7XG59XG5cbi8qKlxuICpcbiAqL1xuZnVuY3Rpb24gb2JzZXJ2ZXIoKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHR2YXIgRVZFTlRfVFlQRSA9IFsncmVhZHknLCAnYmVmb3JlSW1hZ2VMb2FkJywgJ2JlZm9yZURyYXcnLCAnaW1hZ2VMb2FkJ107XG5cblx0c2VsZi5vbiA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcblx0XHRpZiAoRVZFTlRfVFlQRS5pbmRleE9mKGV2ZW50KSA+IC0xKSB7XG5cdFx0XHRpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdGV2ZW50ID09PSAncmVhZHknID8gZm4oc2VsZikgOiBzZWxmWydvbicgKyBmaXJzdExldHRlclVwcGVyKGV2ZW50KV0gPSBmbjtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS5lcnJvcignZXZlbnQ6ICcgKyBldmVudCArICcgaXMgaW52YWxpZCcpO1xuXHRcdH1cblx0XHRyZXR1cm4gc2VsZjtcblx0fTtcbn1cblxuLyoqXG4gKiBDcmVhdGVkIGJ5IHNhaWwgb24gMjAxNy82LzExLlxuICovXG5mdW5jdGlvbiBtZXRob2RzKCkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0dmFyIGRldmljZVJhZGlvID0gc2VsZi5kZXZpY2VSYWRpbztcblxuXHR2YXIgYm91bmRXaWR0aCA9IHNlbGYud2lkdGg7IC8vIOijgeWJquahhum7mOiupOWuveW6pu+8jOWNs+aVtOS4queUu+W4g+WuveW6plxuXHR2YXIgYm91bmRIZWlnaHQgPSBzZWxmLmhlaWdodDsgLy8g6KOB5Ymq5qGG6buY6K6k6auY5bqm77yM5Y2z5pW05Liq55S75biD6auY5bqmXG5cdHZhciBfc2VsZiRjdXQgPSBzZWxmLmN1dCxcblx0ICAgIF9zZWxmJGN1dCR4ID0gX3NlbGYkY3V0LngsXG5cdCAgICB4ID0gX3NlbGYkY3V0JHggPT09IHVuZGVmaW5lZCA/IDAgOiBfc2VsZiRjdXQkeCxcblx0ICAgIF9zZWxmJGN1dCR5ID0gX3NlbGYkY3V0LnksXG5cdCAgICB5ID0gX3NlbGYkY3V0JHkgPT09IHVuZGVmaW5lZCA/IDAgOiBfc2VsZiRjdXQkeSxcblx0ICAgIF9zZWxmJGN1dCR3aWR0aCA9IF9zZWxmJGN1dC53aWR0aCxcblx0ICAgIHdpZHRoID0gX3NlbGYkY3V0JHdpZHRoID09PSB1bmRlZmluZWQgPyBib3VuZFdpZHRoIDogX3NlbGYkY3V0JHdpZHRoLFxuXHQgICAgX3NlbGYkY3V0JGhlaWdodCA9IF9zZWxmJGN1dC5oZWlnaHQsXG5cdCAgICBoZWlnaHQgPSBfc2VsZiRjdXQkaGVpZ2h0ID09PSB1bmRlZmluZWQgPyBib3VuZEhlaWdodCA6IF9zZWxmJGN1dCRoZWlnaHQ7XG5cblxuXHRzZWxmLnVwZGF0ZUNhbnZhcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoc2VsZi5jcm9wZXJUYXJnZXQpIHtcblx0XHRcdC8vICDnlLvluIPnu5jliLblm77niYdcblx0XHRcdHNlbGYuY3R4LmRyYXdJbWFnZShzZWxmLmNyb3BlclRhcmdldCwgc2VsZi5pbWdMZWZ0LCBzZWxmLmltZ1RvcCwgc2VsZi5zY2FsZVdpZHRoLCBzZWxmLnNjYWxlSGVpZ2h0KTtcblx0XHR9XG5cdFx0dHlwZW9mIHNlbGYub25CZWZvcmVEcmF3ID09PSAnZnVuY3Rpb24nICYmIHNlbGYub25CZWZvcmVEcmF3KHNlbGYuY3R4LCBzZWxmKTtcblxuXHRcdHNlbGYuc2V0Qm91bmRTdHlsZSgpOyAvL1x06K6+572u6L6555WM5qC35byPXG5cdFx0c2VsZi5jdHguZHJhdygpO1xuXHRcdHJldHVybiBzZWxmO1xuXHR9O1xuXG5cdHNlbGYucHVzaE9yaWduID0gZnVuY3Rpb24gKHNyYykge1xuXHRcdHNlbGYuc3JjID0gc3JjO1xuXG5cdFx0dHlwZW9mIHNlbGYub25CZWZvcmVJbWFnZUxvYWQgPT09ICdmdW5jdGlvbicgJiYgc2VsZi5vbkJlZm9yZUltYWdlTG9hZChzZWxmLmN0eCwgc2VsZik7XG5cblx0XHR3eC5nZXRJbWFnZUluZm8oe1xuXHRcdFx0c3JjOiBzcmMsXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlcykge1xuXHRcdFx0XHR2YXIgaW5uZXJBc3BlY3RSYWRpbyA9IHJlcy53aWR0aCAvIHJlcy5oZWlnaHQ7XG5cblx0XHRcdFx0c2VsZi5jcm9wZXJUYXJnZXQgPSByZXMucGF0aDtcblxuXHRcdFx0XHRjb25zb2xlLmxvZyh4LCB5KTtcblx0XHRcdFx0aWYgKGlubmVyQXNwZWN0UmFkaW8gPCB3aWR0aCAvIGhlaWdodCkge1xuXHRcdFx0XHRcdHNlbGYucmVjdFggPSB4O1xuXHRcdFx0XHRcdHNlbGYuYmFzZVdpZHRoID0gd2lkdGg7XG5cdFx0XHRcdFx0c2VsZi5iYXNlSGVpZ2h0ID0gd2lkdGggLyBpbm5lckFzcGVjdFJhZGlvO1xuXHRcdFx0XHRcdHNlbGYucmVjdFkgPSB5IC0gTWF0aC5hYnMoKGhlaWdodCAtIHNlbGYuYmFzZUhlaWdodCkgLyAyKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzZWxmLnJlY3RZID0geTtcblx0XHRcdFx0XHRzZWxmLmJhc2VXaWR0aCA9IGhlaWdodCAqIGlubmVyQXNwZWN0UmFkaW87XG5cdFx0XHRcdFx0c2VsZi5iYXNlSGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdFx0XHRcdHNlbGYucmVjdFggPSB4IC0gTWF0aC5hYnMoKHdpZHRoIC0gc2VsZi5iYXNlV2lkdGgpIC8gMik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzZWxmLmltZ0xlZnQgPSBzZWxmLnJlY3RYO1xuXHRcdFx0XHRzZWxmLmltZ1RvcCA9IHNlbGYucmVjdFk7XG5cdFx0XHRcdHNlbGYuc2NhbGVXaWR0aCA9IHNlbGYuYmFzZVdpZHRoO1xuXHRcdFx0XHRzZWxmLnNjYWxlSGVpZ2h0ID0gc2VsZi5iYXNlSGVpZ2h0O1xuXG5cdFx0XHRcdHNlbGYudXBkYXRlQ2FudmFzKCk7XG5cblx0XHRcdFx0dHlwZW9mIHNlbGYub25JbWFnZUxvYWQgPT09ICdmdW5jdGlvbicgJiYgc2VsZi5vbkltYWdlTG9hZChzZWxmLmN0eCwgc2VsZik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRzZWxmLnVwZGF0ZSgpO1xuXHRcdHJldHVybiBzZWxmO1xuXHR9O1xuXG5cdHNlbGYuZ2V0Q3JvcHBlckltYWdlID0gZnVuY3Rpb24gKCkge1xuXHRcdGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG5cdFx0XHRhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuXHRcdH1cblxuXHRcdHZhciBpZCA9IHNlbGYuaWQ7XG5cblx0XHR2YXIgQVJHX1RZUEUgPSB0b1N0cmluZy5jYWxsKGFyZ3NbMF0pO1xuXG5cdFx0c3dpdGNoIChBUkdfVFlQRSkge1xuXHRcdFx0Y2FzZSAnW29iamVjdCBPYmplY3RdJzpcblx0XHRcdFx0dmFyIF9hcmdzJDAkcXVhbGl0eSA9IGFyZ3NbMF0ucXVhbGl0eSxcblx0XHRcdFx0ICAgIHF1YWxpdHkgPSBfYXJncyQwJHF1YWxpdHkgPT09IHVuZGVmaW5lZCA/IDEwIDogX2FyZ3MkMCRxdWFsaXR5O1xuXG5cblx0XHRcdFx0aWYgKHR5cGVvZiBxdWFsaXR5ICE9PSAnbnVtYmVyJykge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ3F1YWxpdHlcXHVGRjFBJyArIHF1YWxpdHkgKyAnIGlzIGludmFsaWQnKTtcblx0XHRcdFx0fSBlbHNlIGlmIChxdWFsaXR5IDwgMCB8fCBxdWFsaXR5ID4gMTApIHtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdxdWFsaXR5IHNob3VsZCBiZSByYW5nZWQgaW4gMCB+IDEwJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0d3guY2FudmFzVG9UZW1wRmlsZVBhdGgoe1xuXHRcdFx0XHRcdGNhbnZhc0lkOiBpZCxcblx0XHRcdFx0XHR4OiB4LFxuXHRcdFx0XHRcdHk6IHksXG5cdFx0XHRcdFx0d2lkdGg6IHdpZHRoLFxuXHRcdFx0XHRcdGhlaWdodDogaGVpZ2h0LFxuXHRcdFx0XHRcdGRlc3RXaWR0aDogd2lkdGggKiBxdWFsaXR5IC8gKGRldmljZVJhZGlvICogMTApLFxuXHRcdFx0XHRcdGRlc3RIZWlnaHQ6IGhlaWdodCAqIHF1YWxpdHkgLyAoZGV2aWNlUmFkaW8gKiAxMCksXG5cdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXMpIHtcblx0XHRcdFx0XHRcdHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicgJiYgYXJnc1thcmdzLmxlbmd0aCAtIDFdKHJlcy50ZW1wRmlsZVBhdGgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7YnJlYWs7XG5cdFx0XHRjYXNlICdbb2JqZWN0IEZ1bmN0aW9uXSc6XG5cdFx0XHRcdHd4LmNhbnZhc1RvVGVtcEZpbGVQYXRoKHtcblx0XHRcdFx0XHRjYW52YXNJZDogaWQsXG5cdFx0XHRcdFx0eDogeCxcblx0XHRcdFx0XHR5OiB5LFxuXHRcdFx0XHRcdHdpZHRoOiB3aWR0aCxcblx0XHRcdFx0XHRoZWlnaHQ6IGhlaWdodCxcblx0XHRcdFx0XHRkZXN0V2lkdGg6IHdpZHRoIC8gZGV2aWNlUmFkaW8sXG5cdFx0XHRcdFx0ZGVzdEhlaWdodDogaGVpZ2h0IC8gZGV2aWNlUmFkaW8sXG5cdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXMpIHtcblx0XHRcdFx0XHRcdHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicgJiYgYXJnc1thcmdzLmxlbmd0aCAtIDFdKHJlcy50ZW1wRmlsZVBhdGgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7YnJlYWs7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNlbGY7XG5cdH07XG59XG5cbi8qKlxuICogQ3JlYXRlZCBieSBzYWlsIG9uIDIwMTcvNi8xMS5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlKCkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0aWYgKCFzZWxmLnNyYykgcmV0dXJuO1xuXG5cdHNlbGYuX19vbmVUb3VjaFN0YXJ0ID0gZnVuY3Rpb24gKHRvdWNoKSB7XG5cdFx0c2VsZi50b3VjaFgwID0gdG91Y2gueDtcblx0XHRzZWxmLnRvdWNoWTAgPSB0b3VjaC55O1xuXHR9O1xuXG5cdHNlbGYuX19vbmVUb3VjaE1vdmUgPSBmdW5jdGlvbiAodG91Y2gpIHtcblx0XHR2YXIgeE1vdmUgPSB2b2lkIDAsXG5cdFx0ICAgIHlNb3ZlID0gdm9pZCAwO1xuXHRcdC8v6K6h566X5Y2V5oyH56e75Yqo55qE6Led56a7XG5cdFx0aWYgKHNlbGYudG91Y2hlbmRlZCkge1xuXHRcdFx0cmV0dXJuIHNlbGYudXBkYXRlQ2FudmFzKCk7XG5cdFx0fVxuXHRcdHhNb3ZlID0gdG91Y2gueCAtIHNlbGYudG91Y2hYMDtcblx0XHR5TW92ZSA9IHRvdWNoLnkgLSBzZWxmLnRvdWNoWTA7XG5cblx0XHR2YXIgaW1nTGVmdCA9IHNlbGYucmVjdFggKyB4TW92ZTtcblx0XHR2YXIgaW1nVG9wID0gc2VsZi5yZWN0WSArIHlNb3ZlO1xuXG5cdFx0c2VsZi5vdXRzaWRlQm91bmQoaW1nTGVmdCwgaW1nVG9wKTtcblxuXHRcdHNlbGYudXBkYXRlQ2FudmFzKCk7XG5cdH07XG5cblx0c2VsZi5fX3R3b1RvdWNoU3RhcnQgPSBmdW5jdGlvbiAodG91Y2gwLCB0b3VjaDEpIHtcblx0XHR2YXIgeE1vdmUgPSB2b2lkIDAsXG5cdFx0ICAgIHlNb3ZlID0gdm9pZCAwLFxuXHRcdCAgICBvbGREaXN0YW5jZSA9IHZvaWQgMDtcblxuXHRcdHNlbGYudG91Y2hYMSA9IHNlbGYucmVjdFggKyBzZWxmLnNjYWxlV2lkdGggLyAyO1xuXHRcdHNlbGYudG91Y2hZMSA9IHNlbGYucmVjdFkgKyBzZWxmLnNjYWxlSGVpZ2h0IC8gMjtcblxuXHRcdC8v6K6h566X5Lik5oyH6Led56a7XG5cdFx0eE1vdmUgPSB0b3VjaDEueCAtIHRvdWNoMC54O1xuXHRcdHlNb3ZlID0gdG91Y2gxLnkgLSB0b3VjaDAueTtcblx0XHRvbGREaXN0YW5jZSA9IE1hdGguc3FydCh4TW92ZSAqIHhNb3ZlICsgeU1vdmUgKiB5TW92ZSk7XG5cblx0XHRzZWxmLm9sZERpc3RhbmNlID0gb2xkRGlzdGFuY2U7XG5cdH07XG5cblx0c2VsZi5fX3R3b1RvdWNoTW92ZSA9IGZ1bmN0aW9uICh0b3VjaDAsIHRvdWNoMSkge1xuXHRcdHZhciB4TW92ZSA9IHZvaWQgMCxcblx0XHQgICAgeU1vdmUgPSB2b2lkIDAsXG5cdFx0ICAgIG5ld0Rpc3RhbmNlID0gdm9pZCAwO1xuXHRcdHZhciBzY2FsZSA9IHNlbGYuc2NhbGUsXG5cdFx0ICAgIHpvb20gPSBzZWxmLnpvb207XG5cdFx0Ly8g6K6h566X5LqM5oyH5pyA5paw6Led56a7XG5cblx0XHR4TW92ZSA9IHRvdWNoMS54IC0gdG91Y2gwLng7XG5cdFx0eU1vdmUgPSB0b3VjaDEueSAtIHRvdWNoMC55O1xuXHRcdG5ld0Rpc3RhbmNlID0gTWF0aC5zcXJ0KHhNb3ZlICogeE1vdmUgKyB5TW92ZSAqIHlNb3ZlKTtcblxuXHRcdC8vICDkvb/nlKgwLjAwNeeahOe8qeaUvuWAjeaVsOWFt+acieiJr+WlveeahOe8qeaUvuS9k+mqjFxuXHRcdHNlbGYubmV3U2NhbGUgPSBzZWxmLm9sZFNjYWxlICsgMC4wMDEgKiB6b29tICogKG5ld0Rpc3RhbmNlIC0gc2VsZi5vbGREaXN0YW5jZSk7XG5cblx0XHQvLyAg6K6+5a6a57yp5pS+6IyD5Zu0XG5cdFx0c2VsZi5uZXdTY2FsZSA8PSAxICYmIChzZWxmLm5ld1NjYWxlID0gMSk7XG5cdFx0c2VsZi5uZXdTY2FsZSA+PSBzY2FsZSAmJiAoc2VsZi5uZXdTY2FsZSA9IHNjYWxlKTtcblxuXHRcdHNlbGYuc2NhbGVXaWR0aCA9IHNlbGYubmV3U2NhbGUgKiBzZWxmLmJhc2VXaWR0aDtcblx0XHRzZWxmLnNjYWxlSGVpZ2h0ID0gc2VsZi5uZXdTY2FsZSAqIHNlbGYuYmFzZUhlaWdodDtcblx0XHR2YXIgaW1nTGVmdCA9IHNlbGYudG91Y2hYMSAtIHNlbGYuc2NhbGVXaWR0aCAvIDI7XG5cdFx0dmFyIGltZ1RvcCA9IHNlbGYudG91Y2hZMSAtIHNlbGYuc2NhbGVIZWlnaHQgLyAyO1xuXG5cdFx0c2VsZi5vdXRzaWRlQm91bmQoaW1nTGVmdCwgaW1nVG9wKTtcblxuXHRcdHNlbGYudXBkYXRlQ2FudmFzKCk7XG5cdH07XG5cblx0c2VsZi5fX3h0b3VjaEVuZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRzZWxmLm9sZFNjYWxlID0gc2VsZi5uZXdTY2FsZTtcblx0XHRzZWxmLnJlY3RYID0gc2VsZi5pbWdMZWZ0O1xuXHRcdHNlbGYucmVjdFkgPSBzZWxmLmltZ1RvcDtcblx0fTtcbn1cblxuLyoqXG4gKiBDcmVhdGVkIGJ5IHNhaWwgb24gMjAxNy82LzExLlxuICovXG5cbnZhciBoYW5kbGUgPSB7XG5cdC8vICDlm77niYfmiYvlir/liJ3lp4vnm5HmtYtcblx0dG91Y2hTdGFydDogZnVuY3Rpb24gdG91Y2hTdGFydChlKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0dmFyIF9lJHRvdWNoZXMgPSBzbGljZWRUb0FycmF5KGUudG91Y2hlcywgMiksXG5cdFx0ICAgIHRvdWNoMCA9IF9lJHRvdWNoZXNbMF0sXG5cdFx0ICAgIHRvdWNoMSA9IF9lJHRvdWNoZXNbMV07XG5cblx0XHRzZXRUb3VjaFN0YXRlKHNlbGYsIHRydWUsIG51bGwsIG51bGwpO1xuXG5cdFx0Ly/orqHnrpfnrKzkuIDkuKrop6bmkbjngrnnmoTkvY3nva7vvIzlubblj4LnhafmlLnngrnov5vooYznvKnmlL5cblx0XHRzZWxmLl9fb25lVG91Y2hTdGFydCh0b3VjaDApO1xuXG5cdFx0Ly8g5Lik5oyH5omL5Yq/6Kem5Y+RXG5cdFx0aWYgKGUudG91Y2hlcy5sZW5ndGggPj0gMikge1xuXHRcdFx0c2VsZi5fX3R3b1RvdWNoU3RhcnQodG91Y2gwLCB0b3VjaDEpO1xuXHRcdH1cblx0fSxcblxuXG5cdC8vICDlm77niYfmiYvlir/liqjmgIHnvKnmlL5cblx0dG91Y2hNb3ZlOiBmdW5jdGlvbiB0b3VjaE1vdmUoZSkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHZhciBfZSR0b3VjaGVzMiA9IHNsaWNlZFRvQXJyYXkoZS50b3VjaGVzLCAyKSxcblx0XHQgICAgdG91Y2gwID0gX2UkdG91Y2hlczJbMF0sXG5cdFx0ICAgIHRvdWNoMSA9IF9lJHRvdWNoZXMyWzFdO1xuXG5cdFx0c2V0VG91Y2hTdGF0ZShzZWxmLCBudWxsLCB0cnVlKTtcblxuXHRcdC8vIOWNleaMh+aJi+WKv+aXtuinpuWPkVxuXHRcdGlmIChlLnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRzZWxmLl9fb25lVG91Y2hNb3ZlKHRvdWNoMCk7XG5cdFx0fVxuXHRcdC8vIOS4pOaMh+aJi+WKv+inpuWPkVxuXHRcdGlmIChlLnRvdWNoZXMubGVuZ3RoID49IDIpIHtcblx0XHRcdHNlbGYuX190d29Ub3VjaE1vdmUodG91Y2gwLCB0b3VjaDEpO1xuXHRcdH1cblx0fSxcblx0dG91Y2hFbmQ6IGZ1bmN0aW9uIHRvdWNoRW5kKGUpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRzZXRUb3VjaFN0YXRlKHNlbGYsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG5cdFx0c2VsZi5fX3h0b3VjaEVuZCgpO1xuXHR9XG59O1xuXG4vKipcbiAqIENyZWF0ZWQgYnkgc2FpbCBvbiAxMDE3LzYvMTIuXG4gKi9cbmZ1bmN0aW9uIGN1dCgpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHR2YXIgZGV2aWNlUmFkaW8gPSBzZWxmLmRldmljZVJhZGlvO1xuXG5cdHZhciBib3VuZFdpZHRoID0gc2VsZi53aWR0aDsgLy8g6KOB5Ymq5qGG6buY6K6k5a695bqm77yM5Y2z5pW05Liq55S75biD5a695bqmXG5cdHZhciBib3VuZEhlaWdodCA9IHNlbGYuaGVpZ2h0O1xuXHQvLyDoo4HliarmoYbpu5jorqTpq5jluqbvvIzljbPmlbTkuKrnlLvluIPpq5jluqZcblx0dmFyIF9zZWxmJGN1dCA9IHNlbGYuY3V0LFxuXHQgICAgX3NlbGYkY3V0JHggPSBfc2VsZiRjdXQueCxcblx0ICAgIHggPSBfc2VsZiRjdXQkeCA9PT0gdW5kZWZpbmVkID8gMCA6IF9zZWxmJGN1dCR4LFxuXHQgICAgX3NlbGYkY3V0JHkgPSBfc2VsZiRjdXQueSxcblx0ICAgIHkgPSBfc2VsZiRjdXQkeSA9PT0gdW5kZWZpbmVkID8gMCA6IF9zZWxmJGN1dCR5LFxuXHQgICAgX3NlbGYkY3V0JHdpZHRoID0gX3NlbGYkY3V0LndpZHRoLFxuXHQgICAgd2lkdGggPSBfc2VsZiRjdXQkd2lkdGggPT09IHVuZGVmaW5lZCA/IGJvdW5kV2lkdGggOiBfc2VsZiRjdXQkd2lkdGgsXG5cdCAgICBfc2VsZiRjdXQkaGVpZ2h0ID0gX3NlbGYkY3V0LmhlaWdodCxcblx0ICAgIGhlaWdodCA9IF9zZWxmJGN1dCRoZWlnaHQgPT09IHVuZGVmaW5lZCA/IGJvdW5kSGVpZ2h0IDogX3NlbGYkY3V0JGhlaWdodDtcblxuXHQvKipcbiAgKiDorr7nva7ovrnnlYxcbiAgKiBAcGFyYW0gaW1nTGVmdCDlm77niYflt6bkuIrop5LmqKrlnZDmoIflgLxcbiAgKiBAcGFyYW0gaW1nVG9wIOWbvueJh+W3puS4iuinkue6teWdkOagh+WAvFxuICAqL1xuXG5cdHNlbGYub3V0c2lkZUJvdW5kID0gZnVuY3Rpb24gKGltZ0xlZnQsIGltZ1RvcCkge1xuXHRcdHNlbGYuaW1nTGVmdCA9IGltZ0xlZnQgPj0geCA/IHggOiBzZWxmLnNjYWxlV2lkdGggKyBpbWdMZWZ0IC0geCA8PSB3aWR0aCA/IHggKyB3aWR0aCAtIHNlbGYuc2NhbGVXaWR0aCA6IGltZ0xlZnQ7XG5cblx0XHRzZWxmLmltZ1RvcCA9IGltZ1RvcCA+PSB5ID8geSA6IHNlbGYuc2NhbGVIZWlnaHQgKyBpbWdUb3AgLSB5IDw9IGhlaWdodCA/IHkgKyBoZWlnaHQgLSBzZWxmLnNjYWxlSGVpZ2h0IDogaW1nVG9wO1xuXHR9O1xuXG5cdC8qKlxuICAqIOiuvue9rui+ueeVjOagt+W8j1xuICAqIEBwYXJhbSBjb2xvclx06L6555WM6aKc6ImyXG4gICovXG5cdHNlbGYuc2V0Qm91bmRTdHlsZSA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge30sXG5cdFx0ICAgIF9yZWYkY29sb3IgPSBfcmVmLmNvbG9yLFxuICAgICAgICBjb2xvciA9IF9yZWYkY29sb3IgPT09IHVuZGVmaW5lZCA/ICcjRTU2Q0FCJyA6IF9yZWYkY29sb3IsXG5cdFx0ICAgIF9yZWYkbWFzayA9IF9yZWYubWFzayxcblx0XHQgICAgbWFzayA9IF9yZWYkbWFzayA9PT0gdW5kZWZpbmVkID8gJ3JnYmEoMCwgMCwgMCwgMC42KScgOiBfcmVmJG1hc2ssXG5cdFx0ICAgIF9yZWYkbGluZVdpZHRoID0gX3JlZi5saW5lV2lkdGgsXG5cdFx0ICAgIGxpbmVXaWR0aCA9IF9yZWYkbGluZVdpZHRoID09PSB1bmRlZmluZWQgPyAyIDogX3JlZiRsaW5lV2lkdGg7XG5cblx0XHQvLyDnu5jliLbljYrpgI/mmI7lsYJcblx0XHRzZWxmLmN0eC5iZWdpblBhdGgoKTtcblx0XHRzZWxmLmN0eC5zZXRGaWxsU3R5bGUobWFzayk7XG5cdFx0c2VsZi5jdHguZmlsbFJlY3QoMCwgMCwgeCwgYm91bmRIZWlnaHQpO1xuXHRcdHNlbGYuY3R4LmZpbGxSZWN0KHgsIDAsIHdpZHRoLCB5KTtcblx0XHRzZWxmLmN0eC5maWxsUmVjdCh4LCB5ICsgaGVpZ2h0LCB3aWR0aCwgYm91bmRIZWlnaHQgLSB5IC0gaGVpZ2h0KTtcblx0XHRzZWxmLmN0eC5maWxsUmVjdCh4ICsgd2lkdGgsIDAsIGJvdW5kV2lkdGggLSB4IC0gd2lkdGgsIGJvdW5kSGVpZ2h0KTtcblx0XHRzZWxmLmN0eC5maWxsKCk7XG5cblx0XHQvLyDorr7nva7ovrnnlYzlt6bkuIrop5LmoLflvI9cblx0XHQvLyDkuLrkvb/ovrnnlYzmoLflvI/lpITkuo7ovrnnlYzlpJbovrnnvJjvvIzmraTml7Z444CBeeWdh+imgeWHj+WwkWxpbmVXaWR0aFxuXHRcdHNlbGYuY3R4LmJlZ2luUGF0aCgpO1xuXHRcdHNlbGYuY3R4LnNldFN0cm9rZVN0eWxlKGNvbG9yKTtcblx0XHRzZWxmLmN0eC5zZXRMaW5lV2lkdGgobGluZVdpZHRoKTtcblx0XHRzZWxmLmN0eC5tb3ZlVG8oeCAtIGxpbmVXaWR0aCwgeSArIDEwIC0gbGluZVdpZHRoKTtcblx0XHRzZWxmLmN0eC5saW5lVG8oeCAtIGxpbmVXaWR0aCwgeSAtIGxpbmVXaWR0aCk7XG5cdFx0c2VsZi5jdHgubGluZVRvKHggKyAxMCAtIGxpbmVXaWR0aCwgeSAtIGxpbmVXaWR0aCk7XG5cdFx0c2VsZi5jdHguc3Ryb2tlKCk7XG5cblx0XHQvLyDorr7nva7ovrnnlYzlt6bkuIvop5LmoLflvI9cblx0XHQvLyDkuLrkvb/ovrnnlYzmoLflvI/lpITkuo7ovrnnlYzlpJbovrnnvJjvvIzmraTml7Z46KaB5YeP5bCRbGluZVdpZHRo44CBeeimgeWinuWKoGxpbmVXaWR0aFxuXHRcdHNlbGYuY3R4LmJlZ2luUGF0aCgpO1xuXHRcdHNlbGYuY3R4LnNldFN0cm9rZVN0eWxlKGNvbG9yKTtcblx0XHRzZWxmLmN0eC5zZXRMaW5lV2lkdGgobGluZVdpZHRoKTtcblx0XHRzZWxmLmN0eC5tb3ZlVG8oeCAtIGxpbmVXaWR0aCwgeSArIGhlaWdodCAtIDEwICsgbGluZVdpZHRoKTtcblx0XHRzZWxmLmN0eC5saW5lVG8oeCAtIGxpbmVXaWR0aCwgeSArIGhlaWdodCArIGxpbmVXaWR0aCk7XG5cdFx0c2VsZi5jdHgubGluZVRvKHggKyAxMCAtIGxpbmVXaWR0aCwgeSArIGhlaWdodCArIGxpbmVXaWR0aCk7XG5cdFx0c2VsZi5jdHguc3Ryb2tlKCk7XG5cblx0XHQvLyDorr7nva7ovrnnlYzlj7PkuIrop5LmoLflvI9cblx0XHQvLyDkuLrkvb/ovrnnlYzmoLflvI/lpITkuo7ovrnnlYzlpJbovrnnvJjvvIzmraTml7Z46KaB5aKe5YqgbGluZVdpZHRo44CBeeimgeWHj+WwkWxpbmVXaWR0aFxuXHRcdHNlbGYuY3R4LmJlZ2luUGF0aCgpO1xuXHRcdHNlbGYuY3R4LnNldFN0cm9rZVN0eWxlKGNvbG9yKTtcblx0XHRzZWxmLmN0eC5zZXRMaW5lV2lkdGgobGluZVdpZHRoKTtcblx0XHRzZWxmLmN0eC5tb3ZlVG8oeCArIHdpZHRoIC0gMTAgKyBsaW5lV2lkdGgsIHkgLSBsaW5lV2lkdGgpO1xuXHRcdHNlbGYuY3R4LmxpbmVUbyh4ICsgd2lkdGggKyBsaW5lV2lkdGgsIHkgLSBsaW5lV2lkdGgpO1xuXHRcdHNlbGYuY3R4LmxpbmVUbyh4ICsgd2lkdGggKyBsaW5lV2lkdGgsIHkgKyAxMCAtIGxpbmVXaWR0aCk7XG5cdFx0c2VsZi5jdHguc3Ryb2tlKCk7XG5cblx0XHQvLyDorr7nva7ovrnnlYzlj7PkuIvop5LmoLflvI9cblx0XHQvLyDkuLrkvb/ovrnnlYzmoLflvI/lpITkuo7ovrnnlYzlpJbovrnnvJjvvIzmraTml7Z444CBeeWdh+imgeWinuWKoGxpbmVXaWR0aFxuXHRcdHNlbGYuY3R4LmJlZ2luUGF0aCgpO1xuXHRcdHNlbGYuY3R4LnNldFN0cm9rZVN0eWxlKGNvbG9yKTtcblx0XHRzZWxmLmN0eC5zZXRMaW5lV2lkdGgobGluZVdpZHRoKTtcblx0XHRzZWxmLmN0eC5tb3ZlVG8oeCArIHdpZHRoICsgbGluZVdpZHRoLCB5ICsgaGVpZ2h0IC0gMTAgKyBsaW5lV2lkdGgpO1xuXHRcdHNlbGYuY3R4LmxpbmVUbyh4ICsgd2lkdGggKyBsaW5lV2lkdGgsIHkgKyBoZWlnaHQgKyBsaW5lV2lkdGgpO1xuXHRcdHNlbGYuY3R4LmxpbmVUbyh4ICsgd2lkdGggLSAxMCArIGxpbmVXaWR0aCwgeSArIGhlaWdodCArIGxpbmVXaWR0aCk7XG5cdFx0c2VsZi5jdHguc3Ryb2tlKCk7XG5cdH07XG59XG5cbnZhciB3ZUNyb3BwZXIgPSBmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIHdlQ3JvcHBlcihwYXJhbXMpIHtcblx0XHRjbGFzc0NhbGxDaGVjayh0aGlzLCB3ZUNyb3BwZXIpO1xuXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHZhciBfZGVmYXVsdCA9IHt9O1xuXG5cdFx0dmFsaWRhdG9yKHNlbGYsIERFRkFVTFQpO1xuXG5cdFx0T2JqZWN0LmtleXMoREVGQVVMVCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRfZGVmYXVsdFtrZXldID0gREVGQVVMVFtrZXldLmRlZmF1bHQ7XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmFzc2lnbihzZWxmLCBfZGVmYXVsdCwgcGFyYW1zKTtcblxuXHRcdHNlbGYucHJlcGFyZSgpO1xuXHRcdHNlbGYuYXR0YWNoUGFnZSgpO1xuXHRcdHNlbGYuY3JlYXRlQ3R4KCk7XG5cdFx0c2VsZi5vYnNlcnZlcigpO1xuXHRcdHNlbGYuY3V0dCgpO1xuXHRcdHNlbGYubWV0aG9kcygpO1xuXHRcdHNlbGYuaW5pdCgpO1xuXHRcdHNlbGYudXBkYXRlKCk7XG5cblx0XHRyZXR1cm4gc2VsZjtcblx0fVxuXG5cdGNyZWF0ZUNsYXNzKHdlQ3JvcHBlciwgW3tcblx0XHRrZXk6ICdpbml0Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRcdHZhciBzcmMgPSBzZWxmLnNyYztcblxuXG5cdFx0XHRzZWxmLnZlcnNpb24gPSB2ZXJzaW9uO1xuXG5cdFx0XHR0eXBlb2Ygc2VsZi5vblJlYWR5ID09PSAnZnVuY3Rpb24nICYmIHNlbGYub25SZWFkeShzZWxmLmN0eCwgc2VsZik7XG5cblx0XHRcdGlmIChzcmMpIHtcblx0XHRcdFx0c2VsZi5wdXNoT3JpZ24oc3JjKTtcblx0XHRcdH1cblx0XHRcdHNldFRvdWNoU3RhdGUoc2VsZiwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XG5cblx0XHRcdHNlbGYub2xkU2NhbGUgPSAxO1xuXHRcdFx0c2VsZi5uZXdTY2FsZSA9IDE7XG5cblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH1cblx0fV0pO1xuXHRyZXR1cm4gd2VDcm9wcGVyO1xufSgpO1xuXG5PYmplY3QuYXNzaWduKHdlQ3JvcHBlci5wcm90b3R5cGUsIGhhbmRsZSk7XG5cbndlQ3JvcHBlci5wcm90b3R5cGUucHJlcGFyZSA9IHByZXBhcmU7XG53ZUNyb3BwZXIucHJvdG90eXBlLm9ic2VydmVyID0gb2JzZXJ2ZXI7XG53ZUNyb3BwZXIucHJvdG90eXBlLm1ldGhvZHMgPSBtZXRob2RzO1xud2VDcm9wcGVyLnByb3RvdHlwZS5jdXR0ID0gY3V0O1xud2VDcm9wcGVyLnByb3RvdHlwZS51cGRhdGUgPSB1cGRhdGU7XG5cbnJldHVybiB3ZUNyb3BwZXI7XG5cbn0pKSk7XG4iXX0=