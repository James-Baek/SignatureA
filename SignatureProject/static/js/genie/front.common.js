/*
 * author : anonymous
 * 작성 날짜 : 알수 없음
 * 최종 수정 날짜 :
 * descript :
 */

// UserAgent를 이용해서 IE인지를 체크합니다.
var ua = navigator.userAgent.toLowerCase();
// IE7엔 브라우저 엔진명인 Trident가 없고 IE11엔 MSIE란 문자열이 없으므로 두 가지 경우를 다 체크합니다.
if( ua.indexOf( 'msie' ) != -1 || ua.indexOf( 'trident' ) != -1 ) {
	var version = 11;
	ua = /msie ([0-9]{1,}[\.0-9]{0,})/.exec( ua );
	if( ua )
	{
		version = parseInt( ua[ 1 ] );
	}
	var classNames = '';
	// 기존의 방식에 is-ie 라는 클래스도 추가해봅니다.
	classNames += ' is-ie';
	// 마찬가지로 기존의 방식에 현재 버전 표시를 추가해봅니다.
	classNames += ' ie' + version;
	for( var i = version + 1; i <= 11; i++ ) {
		classNames +=  ' lt-ie' + i;
	}
	// html 태그에 클래스를 추가합니다.
	document.getElementsByTagName( 'html' )[ 0 ].className += classNames;
}

var vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit'
	: (/firefox/i).test(navigator.userAgent) ? 'Moz'
		: (/trident/i).test(navigator.userAgent) ? 'ms'
			: 'opera' in window ? 'O'
				: '';



var docElement = document.documentElement,
	ieVERSION = $(docElement).hasClass('ie8') ? 8
		: $(docElement).hasClass('ie7') ? 7
			: $(docElement).hasClass('ie6') ? 6
				: undefined;



var hasTouchEvent = ('ontouchstart' in document.documentElement && navigator.userAgent.toLowerCase().indexOf('chrome') == -1),
	RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
	CLICK_EV = hasTouchEvent ? 'touchend' : 'click',
	START_EV = hasTouchEvent ? 'touchstart' : 'mousedown',
	MOVE_EV = hasTouchEvent ? 'touchmove' : 'mousemove',
	END_EV = hasTouchEvent ? 'touchend' : 'mouseup',
	CANCEL_EV = hasTouchEvent ? 'touchcancel' : 'mouseup',
//	CLICK_EV = 'touchend click',
//	START_EV = 'touchstart mousedown',
//	MOVE_EV = 'touchmove mousemove',
//	END_EV = 'touchend mouseup',
//	CANCEL_EV = 'touchcancel mouseup',
	WHEEL_EV = vendor == 'Moz' ? 'DOMMouseScroll' : 'mousewheel',
	TRANSITIONEND_EV = (vendor == 'O') ? 'oTransitionEnd' : (vendor == 'webkit') ? 'webkitTransitionEnd' : 'transitionend';



// extend Object. inspired by Prototype.
Object.extend = function(target, source) {
	for (var property in source)
		target[property] = source[property];
	return target;
};



// 배열 비우기 arr.clear();
Array.prototype.clear = function() {
	this.splice(0, this.length);
};



/* setTimeout, setinterval을 이용한 애니메이션이 필요할경우 대신 사용
 * 출처 : http://msdn.microsoft.com/ko-kr/library/ie/hh920765%28v=vs.85%29.aspx
 */
window.requestAFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		// if all else fails, use setTimeout
		function(callback) {
			return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
		};
})();
window.cancelAFrame = (function() {
	return window.cancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.mozCancelAnimationFrame ||
		window.oCancelAnimationFrame ||
		function(id) {
			window.clearTimeout(id);
		};
})();

if (!Array.indexOf) {
	Array.prototype.indexOf = function (obj, start) {
		for (var i = (start || 0); i < this.length; i++) {
			if (this[i] == obj) {
				return i;
			}
		}
	}
}

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 * Copyright © 2008 George McGinley Smith
 */
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
	def:'easeOutQuad',
	swing:function(x, t, b, c, d) {
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInCirc:function(x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc:function(x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	}
});

/*
* ie8 toISOString polyfill
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
*/
if (!Date.prototype.toISOString) {
	(function() {

		function pad(number) {
			if (number < 10) {
				return '0' + number;
			}
			return number;
		}

		Date.prototype.toISOString = function() {
			return this.getUTCFullYear() +
				'-' + pad(this.getUTCMonth() + 1) +
				'-' + pad(this.getUTCDate()) +
				'T' + pad(this.getUTCHours()) +
				':' + pad(this.getUTCMinutes()) +
				':' + pad(this.getUTCSeconds()) +
				'.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
				'Z';
		};

	}());
}

/*
 * loading 이미지 프리 로드
 */
var FG_loadingImage = new Image();
FG_loadingImageSrc = '//image.genie.co.kr/imageg/web/common/loading_r1.png';
FG_loadingImage.src = FG_loadingImageSrc;


var FG_loading;
(function() {
	var LOADING = function() {
		this.loadingImageIntervalTime = 100;
		this.loadingImageCount = 11;
		this.loadingAppendTo = 'body';

		this.loadingImageValue = {
			width:55,
			height:48
		};

		this.loadingBoxStyle = {
			position:'absolute',
			left:0,
			right:0,
			top:0,
			zIndex:1000,
			height:this._size.oHeight,
			backgroundColor:'#000000',
			opacity:0.6
		};

		this.loadingImageStyle = {
			position:'fixed',
			left:'50%',
			top:'50%',
			display:'block',
			width:this.loadingImageValue.width,
			height:this.loadingImageValue.height,
			margin:'-'+ (this.loadingImageValue.height / 2) +'px 0 0 -'+ (this.loadingImageValue.width / 2) +'px',
			backgroundImage:'url('+ FG_loadingImageSrc +')'
		};
	};

	LOADING.prototype = {
		_start:function(obj, callback) {
			var that = this;
			that._set();

			if(obj == undefined) return;

			$(obj).bind('load', function() {
				that._end.apply(that, [callback]);
			});
		},
		_end:function(callback) {
			var that = this;

			that.loadingBox.animate({ opacity:0 }, 'fast', 'linear', function() {
				if(callback) callback();
				that.loadingBox.remove();
				clearInterval(that.interval);
			});
		},
		_size:{
			cWidth:document.documentElement.clientWidth,
			cHeight:document.documentElement.clientHeight,
			oHeight:function() {
				return Math.max(
					Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
					Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
					Math.max(document.body.clientHeight, document.documentElement.clientHeight)
				);
			}
		},
		_set:function() {
			var that = this;

			that.loadingBox = $('<div><span /></div>').appendTo(that.loadingAppendTo).css(that.loadingBoxStyle).attr('id','loading-box');
			that.loadingImage = that.loadingBox.find('span').css(that.loadingImageStyle);

			var i = 0;
			that.interval = setInterval(function() {
				i = i % that.loadingImageCount;
				i++;
				that.loadingImage.css({
					backgroundPosition:'0 ' + (i * -that.loadingImageValue.height) + 'px'
				});
			}, that.loadingImageIntervalTime);
		}
	};

	window.LOADING = LOADING;

	return {
		load:function() {
			FG_loading = new LOADING();
		}
	};
})().load();



/*
 * author :
 * 작성 날짜 : 2013-03-19
 * 최종 수정 날짜 :
 * descript : toggle button
 */
(function() {
	var TOGGLE_BUTTON = function() {};

	TOGGLE_BUTTON.prototype = {
		_element:null,
		_extend:null,
		findParent:function(t) {
			var that = this;
			while(t.parentNode != undefined) {
				if(t == that._element[0]) return t;
				//if(t == that.hook[0]) return t;
				else t = t.parentNode;
			}
		},
		_load:function() {
			var that = this;
			that.hook.each(function() {
				if ($(this).hasClass('notUse') == false){
					if($(this).hasClass('no-more')) $(this).find('> a').bind(CLICK_EV, $.proxy(that._toggle, that, $(this)));
					else {
						if($(this).children().hasClass('more_mp3')) $(this).find('.more_mp3').bind(CLICK_EV, $.proxy(that._toggle, that, $(this)));
						if($(this).children().hasClass('btn')) $(this).find('.btn').bind(CLICK_EV, $.proxy(that._toggle, that, $(this)));
						if($(this).children().hasClass('more')) $(this).find('.more').bind(CLICK_EV, $.proxy(that._toggle, that, $(this)));
					}
				}
			});

			if(that._extend !== null) that._extend();
		},
		_toggle:function(obj) {
			var that = this;

			if(that._element === obj) {
				that._close(that._element);
				that._element = null;
			} else {
				if(that._element !== null) that._close(that._element);
				that._element = obj;
				that._open(that._element);
			}

			return false;
		},
		parentCheck:function(t) {
			var currentNode = t[0];
			while(currentNode != undefined) {
				if($(currentNode).hasClass('layer-action'))
					return currentNode;
				else
					currentNode = currentNode.parentNode;
			}
			return currentNode;
		},
		_open:function(element) {
			var that = this;

			if(element.closest('.list-wrap').hasClass('scroll-wrap')) {
				var listWrap = element.closest('.list-wrap');
				var offsetY = element.offsetParent().offset().top + listWrap.scrollTop() + element.find('.list').outerHeight() - listWrap.offset().top + 40;

				if(offsetY >= listWrap.prop('scrollHeight')) element.addClass('reverse');
				else element.removeClass('reverse');
			}

			element.addClass('select-button');
			FG_addMyAlbum._close();

			if(typeof ieVERSION == 'undefined') {
				if(that.parentCheck(element) !== null) {
					that.cloneList = element.find('.list').hide().clone();
					that.cloneList.appendTo('body').addClass('toggle-button-list').css({
						left:element.offset().left,
						top:element.offset().top + element.height() + 1
					}).show();

					$('#content .body').bind('scroll', $.proxy(that._document, that));
					element.parents('.layer-action').bind('scroll', $.proxy(that._document, that));
				}
			}

			if(element.find('.close').index() > -1) {
				element.find('.close').bind(CLICK_EV, function() {
					$(".toggle-button-list").remove();
					that._close(element);
					that._element = null;
				});
			}

			$(document).bind(CLICK_EV, $.proxy(that._document, that));
		},
		_close:function(element, t) {
			if(typeof t == 'undefined') t = 'null';
			var that = this;

			if(element.hasClass('has-add-album') || element.hasClass('duplicate-add-album')) {
				if(t != null) {
					if(FG_addMyAlbum.findParent(t) === undefined) {
						element.removeClass('select-button');
						FG_addMyAlbum._close();
					}
				}
			} else {
				element.removeClass('select-button');
			}

			if(typeof ieVERSION == 'undefined') {
				if(that.parentCheck(element) !== null) {
					that.cloneList.remove();
					$('#content .body').unbind('scroll', $.proxy(that._document, that));
					element.parents('.layer-action').unbind('scroll', $.proxy(that._document, that));
				}
			}

			$(document).unbind(CLICK_EV, $.proxy(that._document, that));
		},
		_document:function(e) {
			var that = this,
				t = e.target;

			if(that.findParent(t) === undefined) {
				$(".toggle-button-list").remove();
				that._close(that._element, t);
				that._element = null;
			}
		}
	};

	window.TOGGLE_BUTTON = TOGGLE_BUTTON;

	return {
		load:function() {
			var initialize = function() {
				var toggleButton = new TOGGLE_BUTTON();
				toggleButton.hook = $('.toggle-button-box');
				toggleButton._load();
			};
			$(window).ready(initialize);
			$(document).ajaxStop(function() {
				$(window).unbind('load', initialize);
				initialize();
			});
		}
	};
})().load();



/*
 * author :
 * 작성 날짜 : 2013-03-19
 * 최종 수정 날짜 :
 * descript : 스크롤
 */
(function() {
	var ROLLING = function() {
		this.status = true;
		this.pageIndex = 0;
		this.oldIndex = 0;
		this.wraps = [];
		this.wrapsHeight = [];
		this.nextText = '다음보기';
		this.prevText = '이전보기';
		this.positionGap = 50;
		this.auto = false;
		this.infiniteRolling = false;
		this.onBefore = null;
	};

	ROLLING.prototype = {
		_extend:null,
		_load:function() {
			var that = this;
			that.wrap = that.hook.children();

			that.positionGap = (that.option.gap) ? parseInt(that.option.gap) : that.positionGap;
			that.infiniteRolling = (that.option.infiniteRolling) ? that.option.infiniteRolling : that.infiniteRolling;
			that.onBefore = (that.option.onBefore) ? that.option.onBefore : that.onBefore;

			that._set();

			if(that.option.arrow === true) that._arrow();
			if(that.option.number === true) that._number();
			if(that.option.page === true) that._page();
			if(that.option.auto === true) that._auto();
			if(that._extend !== null) that._extend();
		},
		_set:function() {
			var that = this;

			that.wrapLength = Math.ceil(that.wrap.children().length / that.option.displayNum);

			var childNode = that.wrap.children(),
				wrapNode = (childNode.css('display') == 'list-item' || childNode[0].nodeName.toLowerCase() == 'li') ? '<ul />' : (childNode.css('display') == 'block') ? '<div />' : '<span />';

			for(var i=0; i<that.wrapLength; i++) {
				that.wraps[i] = $(wrapNode).appendTo(that.hook)
					.css({
						display:'none',
						width:that.hook.width() + 100,
						position:'absolute',
						right:0,
						left:0
					});
			}

			var wrapIndex = 0;
			that.wrap.children().each(function(j) {
				var clip = j % that.option.displayNum;

				$(this).remove().css({
					opacity:0,
					position:'relative',
					left:that.positionGap
				}).appendTo(that.wraps[wrapIndex]);

				that.wrapsHeight.push(that.wraps[wrapIndex].height());

				if(clip === that.option.displayNum - 1) wrapIndex++;
			});

			that.wrap.remove();

			that.hook.css({
				position:'relative',
				height:Math.max.apply(null, that.wrapsHeight)
			});

			that._show();
		},
		_show:function(callback, direction) {
			var that = this,
				childs = that.wraps[that.pageIndex].children(),
				index = (direction === 'prev') ? childs.size() - 1 : 0;

			that.wraps[that.pageIndex].css({
				display:'block'
				, width:'auto'/**/ //TODO : IE7
			}).children().each(function(i) {
				childs.eq(index).delay(50 * i).animate({
					opacity:1,
					left:0
				}, {
					duration:200,
					specialEasing:{
						left:'easeOutCirc',
						opacity:'linear'
					},
					complete:function() {
						if(i <= 0) {
							setTimeout(function() {
								if(callback) {
									callback();
									that.wraps[that.oldIndex].hide();
									that.oldIndex = that.pageIndex;
								}
								that.status = true;
							}, 100);
						}
					}
				});
				(direction === 'prev') ? index-- : index++;
			});
		},
		_hide:function(callback, direction) {
			var that = this,
				childs = that.wraps[that.oldIndex].children(),
				index = (direction === 'prev') ? childs.size() - 1 : 0;

			that.wraps[that.pageIndex].children('li').each(function(i) {
				$(this).css('left', ((direction === 'prev') ? -that.positionGap : that.positionGap) + 'px');
			});

			if(that.onBefore) {
				that.onBefore(that.pageIndex);
			}

			that.wraps[that.oldIndex].css({
				display:'block'
			}).children().each(function(i) {
				childs.eq(index).delay(50 * i).animate({
					opacity:0,
					left:(direction === 'prev') ? that.positionGap : that.positionGap * -1
				}, {
					duration:200,
					specialEasing:{
						left:'easeInCirc',
						opacity:'linear'
					},
					complete:function() {
						if(i <= 0) {
							setTimeout(function() {
								if(callback) {
									that.wraps[that.oldIndex].hide();
									callback();

									that.oldIndex = that.pageIndex;

								}
								that.status = true;
							}, 100);
						}
					}
				});
				(direction === 'prev') ? index-- : index++;
			});
		},
		_arrow:function() {
			var that = this;

			if(that.wrapLength <= 1) return false;

			that.arrowParentBox = that.option.arrowParent ? that.option.arrowParent : that.hook.parent();

			if(!that.option.arrowParent) {
				that.arrowWrap = $('<div />', {
					id:that.hook.attr('id') + '-arrow-navi',
					'class':'arrow-navi'
				}).appendTo(that.arrowParentBox);
			} else {
				that.arrowWrap = that.arrowParentBox;
			}

			that.arrowPrev = $('<a />', {
				'class':'prev',
				href:'#',
				title:that.prevText
			}).appendTo(that.arrowWrap).html(that.prevText).click($.proxy(that._prev, that)).addClass(function() {
				return that.pageIndex == 0 ? 'null' : '';
			});

			that.arrowNext = $('<a />', {
				'class':'next',
				href:'#',
				title:that.nextText
			}).appendTo(that.arrowWrap).html(that.nextText).click($.proxy(that._next, that));
		},
		_prev:function() {
			var that = this;

			if(this.infiniteRolling) {
				if(that.wrapLength == 1) return false;
				that.pageIndex--;
				if(that.pageIndex < 0) that.pageIndex = that.pageIndex + that.wrapLength;

			} else {
				if(that.status === false || that.pageIndex === 0) return false;
				that.status = false;
				that.pageIndex--;
			}

			that._change();
			that._hide($.proxy(that._show, that, null, 'prev'), 'prev');

			$(that.numberWrap).find('a').removeClass('active').eq(that.pageIndex).addClass('active');

			return false;
		},
		_next:function() {
			var that = this;

			if(this.infiniteRolling) {
				if(that.wrapLength == 1) return false;
				that.pageIndex++;
				if(that.pageIndex == that.wrapLength) that.pageIndex = 0;

			} else {
				if(that.status === false || that.pageIndex === that.wrapLength - 1) return false;
				that.status = false;
				that.pageIndex++;
			}
			that._change();
			that._hide($.proxy(that._show, that, null, 'next'), 'next');

			$(that.numberWrap).find('a').removeClass('active').eq(that.pageIndex).addClass('active');

			return false;
		},
		_change:function() {
			var that = this;

			if(that.option.arrow === true) {
				that.arrowNext.removeClass('null');
				that.arrowPrev.removeClass('null');

				if(that.pageIndex === 0)
					that.arrowPrev.addClass('null');
				else if(that.pageIndex === that.wrapLength - 1)
					that.arrowNext.addClass('null');
			}

			if(that.option.page === true)
				that.pageWrap.html('<em>' + (that.pageIndex + 1) + '</em><i>/</i>' + that.wrapLength);
		},
		_number:function() {
			var that = this;

			that.numberParentBox = that.option.numberParent ? that.option.numberParent : that.hook.parent();

			if(!that.option.numberParent) {
				that.numberWrap = $('<div />', {
					id:that.hook.attr('id') + '-number-navi',
					'class':'number-navi'
				}).appendTo(that.numberParentBox);
			} else
				that.numberWrap = that.numberParentBox;

			$.each(that.wraps, function(i) {
				var navi = $('<a />', {
					'class':'item' + (i + 1) + (i == 0 ? ' active' : ''),
					href:'#'
				}).html(i + 1).bind('click', function() {
					var element = $(this);
					return (function(i) {
						var pagePosition = (that.pageIndex > i) ? 'prev' : 'next';

						if(that.status === false || that.pageIndex === i) return false;
						that.status = false;
						that.pageIndex = i;

						that._change();

						that._hide($.proxy(that._show, that, null, pagePosition), pagePosition);

						$(that.numberWrap).find('a').removeClass('active');

						element.addClass('active');
						return false;
					})(i);
				}).appendTo(that.numberWrap);
			});
		},
		_page:function() {
			var that = this;

			that.pageParentBox = that.option.pageParent ? that.option.pageParent : that.hook.parent();

			if(!that.option.pageParent) {
				that.pageWrap = $('<div />', {
					id:that.hook.attr('id') + '-page-navi',
					'class':'page-navi'
				}).appendTo(that.pageParentBox);
			} else {
				that.pageWrap = that.pageParentBox;
			}
			that.pageWrap.html('<em>' + (that.pageIndex + 1) + '</em><i>/</i>' + that.wrapLength);
		},
		_auto:function(){
			var that = this;
			var intervalAuto = setInterval($.proxy(that._next, that), 3000);
			that.hook.parent().bind({
				mouseenter:function() {
					clearInterval(intervalAuto);
				},
				mouseleave:function() {
					intervalAuto = setInterval($.proxy(that._next, that), 3000);
				}
			})
		}
	};

	window.ROLLING = ROLLING;
})();



/*
 * author :
 * 작성 날짜 :
 * 최종 수정 날짜 :
 * descript : 앨범 리스트 보기 펼쳐 보기
 */
(function() {
	var PREVIEW_ALBUM = function() {};

	PREVIEW_ALBUM.prototype = {
		_extend:null,
		_index:null,
		_openText:'펼쳐보기',
		_closeText:'접기',
		_load:function() {
			var i = this.hook.length;
			this.hook.each(function() {
				$(this).css({ zIndex:i });
				i--;
			});
			this._set();

			if(this._extend !== null) this._extend();
		},
		_set:function() {
			var that = this;

			that.view = $('<a />', {
				href:'#',
				'class':'view'
			}).text(that._openText).appendTo(that.hook.children()).click($.proxy(that._toggle, that));
		},
		_toggle:function(e) {
			var that = this,
				t = e.target;

			var element = $(t).parents('.album-item');

			if(element.hasClass('opened')) that._close(element);
			else that._open(element);

			return false;
		},
		_open:function(element) {
			var that = this,
				i = that.hook.index(element);

			element.find(that.view).text(that._closeText);

			if(i == that._index) that._index = null;

			if(that._index !== null) that._close(that.hook.eq(that._index));

			var cloneElement = element.clone().addClass('opened').css({
				visibility:'hidden',
				height:'auto'
			}).appendTo(element.parent());
			var _height = cloneElement.outerHeight();
			cloneElement.remove();

			element.addClass('opened').find('.dumy').css({
				height:110
			}).animate({
				height:_height
			}, 200, 'linear', function() {
				that._index = i;
			});
		},
		_close:function(element) {
			var that = this;

			element.find(that.view).text(that._openText);

			element.find('.dumy').animate({
				height:110
			}, 200, 'linear', function() {
				$(this).css({
					height:'auto'
				}).parent().removeClass('opened');
			});
		}
	};

	window.PREVIEW_ALBUM = PREVIEW_ALBUM;
})();



/*
 * author :
 * 작성 날짜 :
 * 최종 수정 날짜 :
 * descript : 앨범 리스트 보기 펼쳐 보기
 */
var FG_addMyAlbum, FG_myAlbumScroll;
(function() {
	var _w = window;
	var MY_ALBUM = function() {
		this.layerLeft = 0;
		this.layerTop = 0;
		this._target = null;

		this.layerStyle = {
			display:'block',
			left:this.layerLeft,
			top:this.layerTop
		};
	};

	MY_ALBUM.prototype = {
		_extend:null,
		findParent: function(t) {
			var that = this;

			while(t.parentNode != undefined) {
				if(t == that.myAlbum[0]) return t;
				else t = t.parentNode;
			}
		},
		_load:function() {
			var that = this;

			/* login check
			if($('body').hasClass('is-login') === false) {
				that.hook.bind('click', function() {
					return false;
				});
				return false;
			}
			*/
			that.myAlbum = $('#my-album');

			$('body').on('click', that.hook, $.proxy(that._click, that));

			if(that._extend !== null) that._extend();
		},
		_setStyle:function() {
			var that = this;
			Object.extend(that.layerStyle, {
				left:that.layerLeft,
				top:that.layerTop
			});
		},
		_click:function(e) {
			var that = this,
				element = $(e.target);

			that.element = $(e.target);
			$('.add-my-album').removeClass('active');

			if(that.element.closest('.toggle-button-box').hasClass('has-add-album')) {
				that.layerLeft = that.element.offset().left - that.myAlbum.outerWidth() + that.element.outerWidth() + 1;
				that.layerTop = that.element.offset().top - 1;
			} else {
				that.layerLeft = that.element.offset().left - that.myAlbum.outerWidth() + that.element.outerWidth();
				that.layerTop = that.element.offset().top + that.element.outerHeight() + 4;
			}

			that._setStyle();

			if(!(that.element.closest('.toggle-button-box').hasClass('has-add-album') || that.element.closest('.toggle-button-box').hasClass('duplicate-add-album'))) {
				$('.toggle-button-box:visible').removeClass('select-button');
			}
			that.element.addClass('active');

			if(that._target != that.element[0]) {
				that.myAlbum.css(that.layerStyle).attr('tabindex', 0).focus();

				$(_w).bind('resize', $.proxy(that._resize, that));

				that._target = that.element[0];
			} else {
				that._close();
			}

			if(typeof ieVERSION != 'undefined' && ieVERSION < 8) {
				return false;
			} else {
				setTimeout(function() {
					$('#my-album .my-scroll').mCustomScrollbar({
						theme:"dark-thin"
					});
				}, 1);
			}

			//마이 앨범에 담기 기능을 위하여 추가함. 홍성호C. 2013-05-06
			$("#my-album").attr("songId", e.currentTarget.getAttribute("songId"));

			that.myAlbum.find('.list-basic li:last a').on('keyup', function(e) {
				if(e.keyCode == 9) {
					that.element.focus();
				}
			});

			if(that.element.hasClass('scroll-event')) that.element.closest('.scroll-wrap').bind('scroll', $.proxy(that._document, that));
			$(document).bind(CLICK_EV, $.proxy(that._document, that));

			return false;
		},
		_resize:function() {
			var that = this;

			that.layerLeft = that.element.offset().left - that.myAlbum.outerWidth() + that.element.outerWidth();
			that.layerTop = that.element.offset().top + that.element.outerHeight() + 3;

			that._setStyle();
			that.myAlbum.css(that.layerStyle);
		},
		_close:function() {
			var that = this;

			if(!that.myAlbum.is(':visible')) return false;

			that.myAlbum.hide();
			that.element.removeClass('active');

			var parents = that.element.closest('.toggle-button-box');
			if(parents.hasClass('has-add-album')) {
				parents.removeClass('select-button');
			}

			that._target = null;
			$('#my-album .my-scroll').mCustomScrollbar('destroy');

			$(_w).unbind('resize', $.proxy(that._resize, that));
			if(that.element.hasClass('scroll-event')) that.element.closest('.scroll-wrap').unbind('scroll', $.proxy(that._document, that));
			$(document).unbind(CLICK_EV, $.proxy(that._document, that));
		},
		_document:function(e) {
			var that = this,
				t = e.target;

			if(that.findParent(t) === undefined) {
				that._close(that._element);
				that._element = null;
			}
		}
	};

	window.MY_ALBUM = MY_ALBUM;

	return {
		load:function(element) {
			$(document).ready(function() {
				//$(_w).bind('load', function() {
				FG_addMyAlbum = new MY_ALBUM();
				FG_addMyAlbum.hook = '.add-my-album';
				FG_addMyAlbum._load();
			});
		}
	};
})().load();



/*
 * author :
 * 작성 날짜 :
 * 최종 수정 날짜 :
 * descript :
 */
(function() {
	var IMAGE_VIEW = function() {};

	IMAGE_VIEW.prototype = {
		_load:function() {
			var that = this;
			$('a[image-view="true"]').bind('click', function(e) {
				that._set.apply(that, [e, $(this)]);

				return false;
			});
		},
		_size:{
			cWidth:document.documentElement.clientWidth,
			cHeight:document.documentElement.clientHeight,
			oHeight:function() {
				return Math.max(
					Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
					Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
					Math.max(document.body.clientHeight, document.documentElement.clientHeight)
				);
			}
		},
		_set:function(e, element) {
			var that = this;

			that.lightBox = $('<div />').appendTo('body').click($.proxy(that._close, that));

			that.imageBox = $('<div class="zoom_img"><img /></div>').appendTo('body').css({
				position:'fixed',
				left:'50%',
				top:'50%',
				zIndex:1001
			}).find('img').attr({
				src:element.attr('href')
			});

			that.imageLoad();
		},
		_close:function() {
			this.lightBox.remove();
			this.imageBox.remove();
		},
		imageLoad:function() {
			var that = this;

			var imageLoading = new LOADING();
			Object.extend(imageLoading, {
				_end:function(callback) {
					this.loadingBox.remove();
					if(callback) callback();
				}
			});

			imageLoading._start(that.imageBox, function() {
				that.lightBox.css({
					position:'absolute',
					left:0,
					top:0,
					right:0,
					zIndex:99,
					height:that._size.oHeight,
					backgroundColor:'#000000',
					opacity:0.5
				});
				that.imageBox.css({
					width:600,
					height:'auto'
				}).parent().css({
					boxShadow:'0 0 10px 1px rgba(0, 0, 0, 0.15)',
					margin:'-'+ (that.imageBox.height() / 2) +'px 0 0 -'+ (that.imageBox.width() / 2) +'px'
				});
			});
		}
	};

	window.IMAGE_VIEW = IMAGE_VIEW;

	return {
		load:function() {
			$(window).bind('load', function() {
				var imageView = new IMAGE_VIEW();
				imageView._load();
			});
		}
	};
})().load();


var FG_layerPopup;
(function() {
	var LAYER_POPUP = function() {
		this.modalStyle = {
			position:'absolute',
			top:0,
			left:0,
			right:0,
			zIndex:99,
			height:this._size.oHeight
		};
		this.layerStyle = {
			display:'block',
			position:'fixed',
			left:'50%',
			top:'50%',
			zIndex:100
		};
		this.option = {
			modalHide:false,
			modalClose:false
		};

		this._target = null;
	};

	LAYER_POPUP.prototype = {
		_size:{
			cWidth:document.documentElement.clientWidth,
			cHeight:document.documentElement.clientHeight,
			oHeight:function() {
				return Math.max(
					Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),					Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
					Math.max(document.body.clientHeight, document.documentElement.clientHeight)
				);
			}
		},
		show:function(element) {
			//로그인 레이어를 더이상 노출하는 곳이 없지만 하드코딩된 곳이 많아 공통 처리 부분에서 예외처리함
			try {
				if (element.attr('id') == "login-def") {
					loginPopup();
					return false;
				}
			} catch(e) {}

			var that = this;
			if(arguments.callee.caller == null)
				that._target = null;
			else {
				that._target = window.event || arguments.callee.caller.arguments[0];
				if(that._target != undefined)
					that._target = (that._target.srcElement) ? that._target.srcElement : that._target.target;
			}

			that.layer = $(element);

			Object.extend(that.layerStyle, {
				marginTop:(that.layer.height() / 2 * -1),
				marginLeft:(that.layer.width() / 2 * -1)
			});

			that.layer.css(that.layerStyle).attr('tabindex', 0).focus();

			if(!that.option.modalHide) {
				that.lightBox = $('<div />').appendTo('body').css(that.modalStyle).addClass('modalLayer');

				if(that.option.modalClose === true)
					that.lightBox.click($.proxy(that.hide, that));
			}

			that.layer.find('.layer-close').bind('click', $.proxy(that.hide, that));

			FG_designForm.select._reset(that.layer);
			FG_designForm.placeholder._reset(that.layer);

			/*if(window.PIE && ieVERSION >= 8) {
				$('.radius').each(function() {
					PIE.attach(this);
				});
			}*/
		},
		hide:function(element) {
			var that = this;

			if(element !== undefined && element[0] !== undefined) that.layer = $(element);

			if(!that.option.modalHide) {
				if(that.lightBox) that.lightBox.remove();
			}

			if(that._target != null)
				$(that._target).attr('tabindex', 0).focus();

			that.layer.hide();

			/*if(window.PIE && ieVERSION >= 8) {
				$('.radius').each(function() {
					PIE.detach(this);
				});
			}*/

			return false;
		},
		hidepade:function(element) {
			var that = this;

			if(element !== undefined && element[0] !== undefined) that.layer = $(element);

			if(!that.option.modalHide) {
				if(that.lightBox) that.lightBox.remove();
			}

			if(that._target != null)
				$(that._target).attr('tabindex', 0).focus();

			that.layer.fadeOut();

			/*if(window.PIE && ieVERSION >= 8) {
				$('.radius').each(function() {
					PIE.detach(this);
				});
			}*/

			return false;
		}
	};

	window.LAYER_POPUP = LAYER_POPUP;

	return {
		load:function() {
			FG_layerPopup = new LAYER_POPUP();
		}
	}
})().load();

// FG_toggleLayer
(function(){
	var FG_toggleLayer = function(hook, option, callback){
		this.hook = hook;
		this.option = option;
		this.callback = callback;
		this._flag = null;
	};
	FG_toggleLayer.prototype = {
		_hide : function(){
			var that = this;
			that.hook.animate({ 'opacity' : 0 },'fast', function(){
				$(this).css({ 'display' : 'none' });
				if (that.callback) that.callback();
				that._flag = 'close';
			});
			if (that.option.mode == 'artistLayer'){
				$('.artist_etc').removeClass('active');
			}
			if (that.option.clickHide == true){
				$(document).unbind(CLICK_EV, $.proxy(that._document, that));
				$(window).unbind('scroll resize', $.proxy(that._document, that));
			}
		},
		_show : function(tar){
			var that = this;
			if (that._flag == 'open') {
				that._hide();
				return false;
			}
			if (that.option.mode == 'artistLayer'){
				$(tar).parents().children(".artist_etc_layer").css({
					display : 'block'
					,'opacity' : 0
					, 'position' : 'absolute'
					, 'top' : $(tar).position().top
					, 'left' : $(tar).position().left
				});
				$(tar).addClass('active');
			}else {
				that.hook.css({
					display : 'block'
					, 'opacity' : 0
					, 'position' : 'absolute'
					, 'top' : that.option.offset != undefined ? $(tar).offset().top + that.option.top : $(tar).position().top + that.option.top
					, 'left' : that.option.offset != undefined ? $(tar).offset().left + that.option.left : $(tar).position().left + that.option.left
				});
			}
			that.hook.animate({
				opacity : 1
			}, 'fast', function(){
				that._flag = 'open'
			});

			if (that.callback) that.callback(tar);

			if (that.option.clickHide == true){
				$(document).bind(CLICK_EV, $.proxy(that._document, that));
				$(window).bind('scroll resize', $.proxy(that._document, that));
			}

		},_document:function() {
			var that = this

			if (that._flag == 'open') {
				that._hide();
				that._flag = null;
			}
		}
	};
	window.FG_toggleLayer = FG_toggleLayer;

})();

var FG_cookie;
(function() {
	var COOKIE = function() {};

	COOKIE.prototype = {
		set:function(cName, cValue, cDay) {
			var expire = new Date();
			expire.setDate(expire.getDate() + cDay);
			cookies = cName + '=' + escape(cValue) + '; path=/; domain=genie.co.kr';
			if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
			document.cookie = cookies;
		},
		get:function(cName) {
			cName = cName + '=';
			var cookieData = document.cookie;
			var start = cookieData.indexOf(cName);
			var cValue = '';
			if(start != -1) {
				start += cName.length;
				var end = cookieData.indexOf(';', start);
				if(end == -1)end = cookieData.length;
				cValue = cookieData.substring(start, end);
			}
			return unescape(cValue);
		},
		del:function(cName) {
			var expireDate = new Date();
			expireDate.setDate(expireDate.getDate() - 1);
			document.cookie = cName + "=''" + "; expires=" + expireDate.toGMTString() + "; path=/; domain=genie.co.kr";
		}
	};

	window.COOKIE = COOKIE;

	return {
		load:function() {
			FG_cookie = new COOKIE();
		}
	};
})().load();


// FG_tabContent
(function() {
	var FG_tabContent = function(hook, currentNum){
		this.hook = hook;
		this.currentNum = currentNum;
		this.objAnchor = [];
		this.objLink = [];
		this.objLI = hook.find('li a[href!="#"]').parent('li');
	};

	FG_tabContent.prototype = {
		_load : function() {
			var that = this;
			for (var i=0; i<that.objLI.length; i++) {
				that.objLink[i] = that.objLI[i].getElementsByTagName('a')[0];
				that.objAnchor[i] = document.getElementById(that.objLink[i].getAttribute('href').split('#')[1]);
				if (i != 0) that.objAnchor[i].className += ' hidden';
				else that.objLink[i].parentNode.className += ' visible';
				that.objEvent(i);
			}
			if (!that.currentNum) that.objLink[0].onclick();
			if (that.currentNum) that.objLink[that.currentNum-1].onclick();
		},
		objEvent : function(num) {
			var that = this;
			that.objLink[num].onclick = function() {
				for (var i=0; i<that.objLI.length; i++) {
					var imgEl = that.objLink[i].getElementsByTagName('img')[0]
					if (i == num) {
						if (imgEl) imgEl.src = imgEl.src.replace('_off.gif', '_over.gif');
						if (that.objLink[i].parentNode.className.indexOf('visible') == -1) that.objLink[i].parentNode.className += ' visible';
						that.objAnchor[i].className = that.objAnchor[i].className.replace('hidden', '');
					} else {
						if (imgEl) imgEl.src = imgEl.src.replace('_over.gif', '_off.gif');
						that.objLink[i].parentNode.className = that.objLink[i].parentNode.className.replace('visible', '');
						if (that.objAnchor[i].className.indexOf('hidden') == -1) that.objAnchor[i].className += ' hidden';
					}
				} return false;
			}
		}
	};

	window.FG_tabContent = FG_tabContent;
})();


// FG_gnb
var FG_gnbMenu = function(){}
FG_gnbMenu.prototype = {
	flag : null,
	_hide : function(){
		var that = this;
		if (that.flag >= 0){
			//	$('#gnb .menu > li:not(:eq(that.flag)) .sub_menu').animate({opacity : 0}, 'fast', function(){
			$('#gnb .menu > li:not(:eq(that.flag))').removeClass('current');
			$('#gnb .sub_menu').css('opacity', 1);
			//	});
		}
	},
	_load : function(){
		var that = this;
		var _blur;
		$('#gnb .gnb-menu').bind('mouseenter focus', function(){
			clearTimeout(_blur);

			that.flag = $('#gnb .gnb-menu').index($(this));
			$('#gnb .menu > li').removeClass('current');
			$(this).parents('li').addClass('current');
			$(this).next().show();
		});
		$('#gnb li .gnb-menu').bind('mouseleave', function(){
			_blur = setTimeout($.proxy(that._hide, that), 100);
		});

		$('#gnb .sub_menu').bind('mouseenter', function(){
			clearTimeout(_blur);
		});
		$('#gnb .sub_menu').bind('mouseleave', function(){
			_blur = setTimeout($.proxy(that._hide, that), 100);
		});
	}
};


// FG_badge_tost
var FG_badgeTost = function(text){
	var badge_layer = $('#badge_tost');
	var up = function(){
		if (text) badge_layer.find('p strong').html(text);
		badge_layer.fadeIn();
	}
	var down = function(){
		badge_layer.fadeOut();
	}
	up();
	var fadeOut = setTimeout(down, 2000);
	badge_layer.find('.layer-close').bind('click', function(){
		down();
		clearTimeout(fadeOut);
	});
	badge_layer.bind('mouseenter', function(){
		clearTimeout(fadeOut);
	});
}


var FG_scrollbar;
(function() {
	SCROLLBAR = function() {
		this.scrollbarStyle = {
			font:'0/0',
			position:'absolute',
			display:'block',
			width:3,
			backgroundColor:'#dedede'
		};

		this.scrollbarThumbStyle = {
			font:'0/0',
			position:'absolute',
			right:0,
			top:0,
			display:'block',
			width:3,
			backgroundColor:'#999'
		};

		this.scrollbarThumbOverStyle = {
			width:10
		};

		this.scrollbarThumbOutStyle = {
			width:3
		};

		this.scrollWrapStyle = {
			marginRight:3
		};
	};

	SCROLLBAR.prototype = {
		_load:function() {
			var that = this;

			if($(that.hook)[0] == undefined) return;
			that._set();

			that.scrollBody.bind('scroll', $.proxy(that._scroll, that));
			that.scrollBody.bind(WHEEL_EV, $.proxy(that._wheel, that));
			that.scrollbarThumb.bind(START_EV, $.proxy(that._start, that))
				.bind('mouseenter', $.proxy(that._over, that))
				.bind('mouseleave', $.proxy(that._out, that));

			$(window).bind(RESIZE_EV, $.proxy(that.reset, that));
		},
		_set:function() {
			var that = this;

			$(that.hook).children().wrapAll('<div class="scroll-wrap" style="display:block;" />');

			that.scrollBody = $(that.hook).css({ overflow:'hidden' });
			that.scrollWrap = that.scrollBody.find('.scroll-wrap').css(that.scrollWrapStyle);

			that.scrollbar = $('<span><span /></span>').appendTo('body');
			that.scrollbarThumb = that.scrollbar.find('span');

			that.reset();
		},
		reset:function() {
			var that = this;

			that.scrollBody = $(that.hook);

			that.scrollBodyHeight = that.scrollBody.height();
			that.scrollWrapHeight = that.scrollWrap.height();

			if(that.scrollBodyHeight >= that.scrollWrapHeight) {
				//that.scrollbar.remove();
				return false;
			}

			that.scrollbarThumbHeight = that.scrollBodyHeight / that.scrollWrapHeight * 100;

			Object.extend(that.scrollbarStyle, {
				left:that.scrollBody.offset().left + that.scrollBody.outerWidth(true) - that.scrollbarStyle.width,
				top:that.scrollBody.offset().top,
				height:that.scrollBodyHeight
			});

			Object.extend(that.scrollbarThumbStyle, {
				top:(that.scrollBody.scrollTop() / that.scrollWrapHeight * 100) + '%',
				height:that.scrollbarThumbHeight + '%'
			});

			that.scrollbar.css(that.scrollbarStyle);
			that.scrollbarThumb.css(that.scrollbarThumbStyle);
		},
		_scroll:function() {
			var that = this;

			that.scrollbarThumb.css({
				top:(that.scrollBody.scrollTop() / that.scrollWrapHeight * 100) + '%'
			});
		},
		_over:function() {
			var that = this;

			that.scrollbarThumb.css(that.scrollbarThumbOverStyle);
		},
		_out:function() {
			var that = this;

			that.scrollbarThumb.css(that.scrollbarThumbOutStyle);
		},
		_start:function(e) {
			var that = this,
				startPoint = hasTouchEvent ? e.originalEvent.touches[0] : e.originalEvent;

			that.startY = (startPoint.pageY || startPoint.clientY);

			e.preventDefault();

			if(parseInt(that.scrollbarThumb.css('top')) > 0)
				that.startY = that.startY - parseInt(that.scrollbarThumb.css('top'));

			that.scrollBody.unbind('scroll', $.proxy(that._scroll, that));

			that.scrollbarThumb.unbind('mouseleave', $.proxy(that._out, that));

			$(document).bind(MOVE_EV, $.proxy(that._move, that));
			$(document).bind(END_EV, $.proxy(that._end, that));
		},
		_move:function(e) {
			var that = this;

			e.preventDefault();

			var movePoint = hasTouchEvent ? e.originalEvent.touches[0] : e.originalEvent,
				deltaY = (movePoint.pageY || movePoint.clientY) - that.startY;

			if(deltaY < 0)
				deltaY = 0;
			else if(deltaY > that.scrollBodyHeight - that.scrollbarThumb.height())
				deltaY = that.scrollBodyHeight - that.scrollbarThumb.height();

			that.scrollbarThumb.css({ top:deltaY });

			var scrollPosition = Math.ceil(that.scrollWrapHeight * Math.ceil(deltaY / that.scrollBodyHeight * 100) / 100);

			//c.add( scrollPosition )

			that.scrollBody.scrollTop(scrollPosition);
		},
		_end:function(e) {
			var that = this;

			that.scrollBody.bind('scroll', $.proxy(that._scroll, that));

			that.scrollbarThumb.bind('mouseleave', $.proxy(that._out, that));
			that.scrollbarThumb.trigger('mouseleave');

			$(document).unbind(MOVE_EV, $.proxy(that._move, that));
			$(document).unbind(END_EV, $.proxy(that._end, that));
		},
		_wheel:function(e) {
			var that = this,
				delta = e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0 ? 1 : -1;

			e.preventDefault();

			if (delta < 0) {
				that.scrollBody.scrollTop(that.scrollBody.scrollTop() + 40)
			} else {
				that.scrollBody.scrollTop(that.scrollBody.scrollTop() - 40);
			}
		}
	};

	window.SCROLLBAR = SCROLLBAR;

	return {
		load:function() {
			$(window).bind('load', function() {
				FG_scrollbar = new SCROLLBAR();
				FG_scrollbar.hook = '.scroll';
				//	FG_scrollbar._load();
			});
		}
	};
})().load();



var FG_designForm;
(function() {
	var FORM_STYLE = function() {
		this.select.list = null;
		this.select.thisIndex = null;
		this.select.selects = [];
		this.select.size = 0;
		this.select.option = this.option;

		this.placeholder.labels = [];
	};

	FORM_STYLE.prototype.option = {
		_keyevent:function(e, element) {
			var that = this;
			switch(e.keyCode) {
				case 38:
				case 40:
					element.parent().find('.selected').text(element.find('option:selected').text());
					break;
			}
		}
	};

	FORM_STYLE.prototype.select = {
		init:function() {
			var that = this;

			$('select.select')
				.bind('blur', $.proxy(that._blur, that))
				.bind('focus', $.proxy(that._focus, that))
				.bind('change', function() {
					that._change.apply(that, [$(this)]);
				})
				.each(function(i) {
					that.selects[i] = $(this);
					that.create(that.selects[i], i);
				});

			that.size = $('select.select').size();
		},
		create:function(element, i) {
			var that = this;

			if(element.is('[select-design=true]') === false) {
				element.wrap('<span class="select-box" />')
					.attr('select-design', 'true')
					.parent()
					.append('<span class="selected">'+ element.find('option:selected').text() +'</span><span class="arrow"></span>')
					.bind('click', function(e) {
						that._click.apply(that, [e, i]);

						return false;
					});

				var classNames = element.attr('class').split(/[\s]+/);

				$.each(classNames, function(j) {
					if(classNames[j] != 'select')
						element.parent().addClass(classNames[j]);
				});
			}
		},
		createList:function(element) {
			var that = this;

			that.list = $('<div><ul /></div>').appendTo('body').addClass('select-list');

			element.find('option').each(function() {
				$('<li>'+ $(this).text() +'</li>').appendTo(that.list.find('ul')).click(function() {
					var index = that.list.find('li').index(this);

					element.find('select').change(function() {
						$(this).val(element.find('option').eq(index).val());
					}).change();

					element.find('.selected').text(element.find('option').eq(index).text());
					that._close(element);
					$(document).unbind(START_EV, $.proxy(that._document, that));
				}).hover(function() {
					$(this).addClass('hover');
				}, function() {
					$(this).removeClass('hover');
				});
			});

			var classNames = element.find('select').attr('class').split(/[\s]+/);

			$.each(classNames, function(j) {
				if(classNames[j] != 'select')
					that.list.addClass(classNames[j] + '-list');
			});

			that.list.css({
				position:'absolute',
				left:element.offset().left,
				top:element.offset().top + element.outerHeight(),
				zIndex:100,
				width:function() {
					var w = element.outerWidth(true)
						- parseInt($(this).css('borderLeftWidth'))
						- parseInt($(this).css('borderRightWidth'))
						- parseInt($(this).css('paddingLeft'))
						- parseInt($(this).css('paddingRight'));

					return (that.list.find('ul').width() < w) ? w : 'auto';
				}
			}).bind('mouseenter', function() {
				$(window).unbind('scroll', $.proxy(that._close, that, that.selects[that.thisIndex].parent()));
				$(document).unbind(WHEEL_EV, $.proxy(that._close, that, that.selects[that.thisIndex].parent()));
			}).bind('mouseleave', function() {
				$(window).bind('scroll', $.proxy(that._close, that, that.selects[that.thisIndex].parent()));
				$(document).bind(WHEEL_EV, $.proxy(that._close, that, that.selects[that.thisIndex].parent()));
			});
		},
		_click:function(e, i) {
			var that = this;

			if(that.thisIndex === i) {
				that._close(that.selects[i].parent());
				return;
			}

			that.thisIndex = i;

			that._open(that.selects[i].parent());
			that.createList(that.selects[i].parent());

			$(document).bind(START_EV, $.proxy(that._document, that));

			$(window).bind('resize scroll', $.proxy(that._close, that, that.selects[that.thisIndex].parent()));
			$(document).bind(WHEEL_EV, $.proxy(that._close, that, that.selects[that.thisIndex].parent()));
		},
		_focus:function(e) {
			var that = this,
				t = $(e.target);

			if(that.list) {
				that._close(that.selects[that.thisIndex].parent());
			}

			that._open(t.parent());

			t.bind('keyup', function(e) {
				that.option._keyevent.apply(that, [e, t]);
			});
		},
		_blur:function(e) {
			var that = this,
				t = e.target;

			that._close($(t).parent());
			$(t).unbind('keyup');
		},
		_open:function(element) {
			var that = this;
			element.addClass('select-focus');
		},
		_close:function(element) {
			var that = this;

			element.removeClass('select-focus');

			if(that.list != null) {
				that.list.remove();
				that.list = null;
				$(window).unbind('resize scroll', $.proxy(that._close, that, that.selects[that.thisIndex].parent()));
				$(document).unbind(WHEEL_EV, $.proxy(that._close, that, that.selects[that.thisIndex].parent()));
			}

			that.thisIndex = null;
			$(document).unbind(START_EV, $.proxy(that._document, that));
		},
		_change:function(element) {
			element.parent().find('.selected').text(element.find('option:selected').text());
		},
		_document:function(e) {
			var that = this,
				t = e.target,
				currentTarget = t;

			while(currentTarget != undefined) {
				if(currentTarget == that.selects[that.thisIndex].parent()[0] || currentTarget == that.list[0]) {
					return;
				} else currentTarget = currentTarget.parentNode;
			}

			if(currentTarget === null) {
				that._close(that.selects[that.thisIndex].parent());
			}
		},
		add:function() {
			this.init();
		},
		_reset:function() {}
	};

	FORM_STYLE.prototype.placeholder = {
		init:function() {
			var that = this;

			$('[placeholder]').after(function() {
				var element = $(this),
					valFor = element.attr('id') || '';

				var index = $('[placeholder]').index(this);

				if(element.is('[placeholder-status=true]') === false) {
					that.labels[index] = $('<label for="'+ valFor +'">'+ element.attr('placeholder') +'</label>').css({
						position:'absolute',
						left:element.position().left,
						top:function() {
							var mTop = (isNaN(parseInt(element.css('marginTop')))) ? 0 : parseInt(element.css('marginTop'));
							var pTop = (isNaN(parseInt(element.parent().css('paddingTop')))) ? 0 : parseInt(element.parent().css('paddingTop'));
							return element.position().top + mTop + pTop;
						},
						zIndex:1,
						margin:element.css('borderTopWidth') + ' ' + element.css('borderRightWidth') + ' ' + element.css('borderBottomWidth') + ' ' + element.css('borderRightWidth'),
						borderWidth:0
					}).addClass('ph-' + element[0].tagName.toLowerCase() + ' ' + element.attr('class'));
				}

				return that.labels[index];
			}).bind('focus', function() {
				var index = $('[placeholder]').index(this);
				that._click.apply(that, [that.labels[index], $(this)]);
			}).each(function(i) {
				that._setStyle($(this), i);
			}).attr('placeholder-status', 'true');
		},
		_setStyle:function(element, i) {
			var that = this;

			$(that.labels[i]).css({
				font:element.css('font'),
				lineHeight:element.css('line-height'),
				overflow:'hidden',
				display:(element.val().length <= 0) ? 'block' : 'none',
				width:element.width(),
				height:element.height(),
				padding:element.css('paddingTop') + ' ' + element.css('paddingRight') + ' ' + element.css('paddingBottom') + ' ' + element.css('paddingLeft'),
				background:'none'
			}).on('click', function() {
				element.focus();
			});
		},
		_click:function(label, input) {
			var that = this;

			label.addClass('focus');

			input.bind('keyup', function() {
				if($(this).val().length > 0) label.hide();
			}).bind('blur', function() {
				if($(this).val().length <= 0) {
					label.show().removeClass('focus');
				}
			});
		},
		add:function() {
			if(!Modernizr.input.placeholder)
				this.init();
		},
		_reset:function(parent) {
			var that = this;
			if(Modernizr.input.placeholder) return;

			var pl = parent ? parent.find('[placeholder-status=true]') : $('[placeholder-status=true]');

			pl.each(function(i) {
				var element = $(this),
					index = $('[placeholder-status=true]').index(this);

				that.labels[index].css({
					left:element.position().left,
					top:element.position().top + (isNaN(parseInt(element.css('marginTop'))) ? 0 : parseInt(element.css('marginTop')))
				});
			});
		}
	};

	FORM_STYLE.prototype.check = {
		init:function() {
		}
	};

	return {
		load:function() {
			FG_designForm = new FORM_STYLE();
			var initialize = function() {
				FG_designForm.select.init();

				if(!Modernizr.input.placeholder)
					FG_designForm.placeholder.init();
			};

			$(document).ready(initialize)
				.ajaxStop(initialize);
		}
	};
})().load();



(function() {
	var RANGE = function() {};

	RANGE.prototype = {
		thisControllerPosition:0,
		controllerPosition:0,
		_load:function() {
			var that = this;

			that.barWidth = that.bar.outerWidth();
			that._set();

			that.valueThis.bind({
				keydown:function(e) {
					var key = e.which;
					var val = parseInt(that.valueThis.val());
					if(key === 38) {
						that.valueThis.val(val + 1);
						that._keyup();
					} else if(key === 40) {
						that.valueThis.val(val - 1);
						that._keyup();
					}
					if(!(key==8 || key==9 || key==13 || key==46 || key==144 || key==110 || key==190 || key==39 || key==37 || (key>=48 && key<=57) || (key>=96 && key<=105)))
						e.preventDefault();
				},
				keyup:function() {
					that._keyup();
				}
			});
		},
		_keyup:function() {
			var that = this;
			that.controllerPosition = that.valueThis.val() / that.maxNum * 100;
			that._setProgress();

			if(parseInt(that.valueThis.val()) > that.maxNum)
				that.valueThis.val(that.maxNum);
			else if(parseInt(that.valueThis.val()) < 0)
				that.valueThis.val(0);

			that.thisControllerPosition = that.controllerPosition;
		},
		_set:function() {
			var that = this;
			that.controller.bind(START_EV, $.proxy(that._start, that));

			that.valueMax.html(that.maxNum);

			if(that.valueThis.val() > 0) {
				that.controllerPosition = that.valueThis.val() / that.maxNum * 100;
				that._setProgress();

				that.thisControllerPosition = that.controllerPosition;

				that._setValue();
			}
		},
		_setProgress:function() {
			var that = this;
			if(that.controllerPosition >= 100)
				that.controllerPosition = 100;
			else if(that.controllerPosition <= 0)
				that.controllerPosition = 0;

			that.progress.css({
				width:that.controllerPosition + '%'
			});
			that.controller.css({
				left:that.controllerPosition + '%'
			});
		},
		_setValue:function() {
			var that = this;

			that.thisNum = Math.round(that.maxNum * that.controllerPosition / 100);
			that.valueThis.val(that.thisNum);
		},
		_start:function(e) {
			var that = this;
			e.preventDefault();

			var startPoint = hasTouchEvent ? e.originalEvent.touches[0] : e.originalEvent;
			that.startX = startPoint.pageX || startPoint.clientX;

			$(document).bind(MOVE_EV, $.proxy(that._move, that));
			$(document).bind(END_EV, $.proxy(that._end, that));
		},
		_move:function(e) {
			var that = this;
			e.preventDefault();

			that.movePoint = hasTouchEvent ? e.originalEvent.touches[0] : e.originalEvent;
			that.deltaX = (that.movePoint.pageX || that.movePoint.clientX) - that.startX;

			that.controllerPosition = (that.deltaX / (that.barWidth - 5)) * 100 + that.thisControllerPosition;

			that._setProgress();
			that._setValue();
		},
		_end:function() {
			var that = this;

			that.thisControllerPosition = that.controllerPosition;
			$(document).unbind(MOVE_EV, $.proxy(that._move, that));
			$(document).unbind(END_EV, $.proxy(that._end, that));
		}
	};

	window.RANGE = RANGE;
})();



(function() {
	var LIST_SORT = function() {
		this.checkLists = [];
		this.arrayLists = [];
		this.status;
		this.listType = '';
		this.cookieName = 'genie-player-list';
		this.localstorageName = 'geniePlayerList';
		this.keyName = 'music-id';
		this.callback = function() {};
	};

	LIST_SORT.prototype = {
		_load:function() {
			var that = this;

			this.checks = $(this.checksSelect);
			this.lists = $(this.listsSelect);

			that.hook.bind('click', function() {
				that._click.apply(that, [this]);
				return false;
			});
		},
		_click:function(element) {
			var that = this;

			that._check();

			if(that.checkLists.length <= 0) return;

			if($(element).hasClass('up')) {
				that.up();
			} else if($(element).hasClass('down')) {
				that.down();
			}

			that._reset();
			that.saveData();
			that.callback();

			if(that.toggleExtend != undefined) that.toggleExtend();
		},
		_check:function() {
			var that = this;

			that.checkLists.clear();

			that.checks.each(function(i) {
				if($(this).prop('checked') === true) {
					that.checkLists.push({
						index:i,
						element:$(this).parents('.list')[0]
					});
				}
			});
		},
		up:function() {
			/*
			 * 체크한 목록 1개 일 때
			 * - 체크한 목록이 재생목록 첫번째 곡일 때 : 명령 무시
			 * - 첫번째 곡 아래일 때 : -1 이동
			 *
			 * 체크한 목록이 2개 이상일 때
			 * - 체크한 목록 중 재생목록 첫번째 곡이 포함되어 있을 때 : 첫번째 곡 명령 무시
			 * - 체크한 목록 중 재생목록 첫번쨰 곡이 없을 때 : 첫번째 곡 -1 이동
			 * - 나머지 곡들은 첫번째곡 아래로 순서대로 이동
			 */
			var that = this,
				firstIndex = that.checkLists[0].index,
				checkListsLength = that.checkLists.length;

			that.status = 'up';

			if(firstIndex > 0) {
				that.arrayLists.splice(firstIndex - 1, 0, that.arrayLists.splice(firstIndex, 1)[0]);
				$(that.checkLists[0].element).insertBefore(that.lists.eq(firstIndex - 1));
				firstIndex = firstIndex - 1;
			}

			if(checkListsLength > 1) {
				for(var i = 1; i < checkListsLength; i++) {
					var idx = that.checkLists[i].index;
					that.arrayLists.splice(firstIndex + i, 0, that.arrayLists.splice(idx, 1)[0]);
					$(that.checkLists[i].element).insertAfter(that.checkLists[i - 1].element);
				}
			}
		},
		down:function() {
			/*
			 * 체크한 목록 1개 일 때
			 * - 체크한 목록이 재생목록 마지막 곡일 때 : 명령 무시
			 * - 마지막 곡 위일 때 : 1 이동
			 *
			 * 체크한 목록이 2개 이상일 때
			 * - 체크한 목록 중 재생목록 마지막 곡이 포함되어 있을 때 : 마지막 곡 명령 무시
			 * - 체크한 목록 중 재생목록 마지막 곡이 없을 때 : 마지막 곡 1 이동
			 * - 나머지 곡들은 마지막 곡 위로 순서대로 이동
			 */
			var that = this,
				checkListsLength = that.checkLists.length,
				lastIndex = that.checkLists[checkListsLength - 1].index;

			that.status = 'down';

			if(lastIndex < that.lists.length - 1) {
				that.arrayLists.splice(lastIndex + 1, 0, that.arrayLists.splice(lastIndex, 1)[0]);
				$(that.checkLists[checkListsLength-1].element).insertAfter(that.lists.eq(lastIndex + 1));
				lastIndex = lastIndex + 1;
			}

			if(checkListsLength > 1) {
				var j = 1;

				for(var i = checkListsLength - 2; i >= 0; i--) {
					var idx = that.checkLists[i].index;
					that.arrayLists.splice(lastIndex - j, 0, that.arrayLists.splice(idx, 1)[0]);
					$(that.checkLists[i].element).insertBefore(that.checkLists[checkListsLength - j].element);
					j++;
				}
			}
		},
		saveDataCookie:function(callback) {
			var that = this,
				splitNum = 250,
				streamList = [],
				cookieSize = 0;;

			that.setArrData = [];

			that._reset();

			var cookieList = document.cookie.split(';');
			var findRegExp = new RegExp(that.cookieName + '\[[0-9]+\]', ''),
				replaceRegExp = new RegExp(that.cookieName + '\[([0-9]+)\](.*)', '');

			for(var i=0; i<cookieList.length; i++) {
				if(findRegExp.test(cookieList[i])) {
					var cookieIndex = cookieList[i].replace(replaceRegExp, "$1");
					cookieIndex = $.trim(cookieIndex);

					FG_cookie.del(that.cookieName + '['+ cookieIndex +']');

					cookieSize++;
				}
			}

			var j = 0;
			that.lists.each(function(i) {
				that.setArrData.push($(this).attr(that.keyName));
				streamList.push($(this).attr(that.keyName));

				if(i % splitNum == (splitNum - 1)) {
					FG_cookie.set(that.cookieName + '[' + j + ']', that.setArrData.join(';') + ';', 1000);
					that.setArrData.clear();
					j++;
				}
			});

			var listsLength = that.lists.length,
				remainder = listsLength - (listsLength % splitNum);

			that.setArrData.clear();
			for(var i=listsLength - 1; i>=remainder; i--) {
				that.setArrData.push(that.lists.eq(i).attr(that.keyName));
			}
			if(that.setArrData.length > 0 && (listsLength % splitNum) > 0) {
				var reverseData = that.setArrData.reverse().join(';') + ';';
				FG_cookie.set(that.cookieName + '[' + j + ']', reverseData, 1000);
				that.setArrData.clear();
			}

			strStreamList = streamList.join(';');

			if(callback) {
				var checkCookie = '';
				for(var c=0; c<cookieSize; c++)
					checkCookie += FG_cookie.get(that.cookieName + '[' + c + ']');

				if(that.lists.size() === checkCookie.split(';').length - 1)
					callback();
			}

			//삭제 금지//
//			if (iPlaySeq > 0){
//				iPlaySeq = parseInt($('div.list').index($('.this-play'))) + 1;
//				musicList._reset();
//				iPlaySongId = musicList.list.eq(parseInt(iPlaySeq)-1).attr('music-id');
//			}
			//삭제 금지//
		},
		saveData:function(callback) {
			var that = this,
				isLocalstorage = (function() {
					var uid = new Date;
					var storage;
					var result;
					try {
						(storage = window.localStorage).setItem(uid, uid);
						result = storage.getItem(uid) == uid;
						storage.removeItem(uid);
						return (result && storage ? true : false);
					} catch (exception) {}
				}());

			if(!isLocalstorage) {
				that.saveDataCookie(callback);
				return false;
			}

			that._reset();

			window.localStorage[that.localstorageName] = JSON.stringify(that.arrayLists);

			if(callback) {
				var checkList = window.localStorage[that.localstorageName];
				var jsonList = null;

				if(checkList != null && typeof checkList != "undefined") {
					jsonList = JSON.parse(checkList);
				}

				if(jsonList != null)
					if(that.lists.size() === jsonList.length)
						callback();
			}
		},
		createNumber:function() {
			var that = this;

			that.lists.each(function(i) {
				$(this).find('> span.num > span').html(i + 1);
				$(this).find('> span.num > input[type=checkbox]').val(i + 1);
			});
		},
		_reset:function() {
			var that = this;

			that.checks = $(that.checksSelect);
			that.lists = $(that.listsSelect);
		},
		_sort:function(prop, asc) {
			var that = this;

			if(prop == "RANDOM") {
				var shuffle = [],
					shuffleDiv = $('<div></div>').css({'display': 'none'});

				while(that.arrayLists.length > 0) {
					var ran = Math.floor(Math.random() * that.arrayLists.length);
					var temp = that.arrayLists.splice(ran, 1)[0];
					var tempList = that.lists.splice(ran, 1);

					shuffle.push(temp);
					shuffleDiv.append(tempList);
				}

				/*
				var val = new Array();
				for(var i = 0; i < that.arrayLists.length ; i++){
					val[i] = Math.random() + ","+i;
				}

				val.sort();
				for (var i=0; i<val.length; i++){
					var myPos = i;
					var myLi = that.lists.eq(parseInt(val[i].split(',')[1]));
					shuffle.push(that.arrayLists[parseInt(val[i].split(',')[1])]);
					that.lists.eq(myPos).before(myLi);
				}
				*/

				that.arrayLists = shuffle;
				that.lists = shuffleDiv.children().clone();
				shuffleDiv.remove();

			} else {
				that.arrayLists = arraySort(that.arrayLists, prop, asc);

				that.lists.sort(function (a, b) {
					var an = $.trim($(a).find('[sort-field="' + prop + '"]').text().replace('19금', '').replace(/뮤비|공연|티저|팬미팅|메이킹|기타|방송|스페셜|지니스픽/g, '')),
						bn = $.trim($(b).find('[sort-field="' + prop + '"]').text().replace('19금', '').replace(/뮤비|공연|티저|팬미팅|메이킹|기타|방송|스페셜|지니스픽/g, ''));

					return (asc ? (an > bn ? 1 : (an < bn ? -1 : 0)) : (an < bn ? 1 : (an > bn ? -1 : 0)));
				});
			}

			that.lists.detach().appendTo($(that.listsWrap));
			that.saveData();
			that.callback();

			if(prop == "RANDOM") {
				var toggleButton = new TOGGLE_BUTTON();
				toggleButton.hook = $('#music-tab .toggle-button-box');
				toggleButton._load();
			}
		},
		_unique: function(seq) {
			var that = this,
				delArr = [],
				uIds= {};

			$.each(that.arrayLists, function(idx, arr) {
				var myId = '';

				if(that.listType == 'play_list_mv') {
					myId = arr.MV_ID;
				} else {
					myId = arr.SONG_ID;
				}

				if(uIds.hasOwnProperty(myId)) {
					if(idx == (seq - 1)) {
						//중복곡이 재생중인 곡인 경우
						delArr.push(uIds[myId]);
						uIds[myId] = idx;
					} else {
						delArr.push(idx);
					}
				} else {
					uIds[myId] = idx;
				}
			});

			that.arrayLists = $.grep(that.arrayLists, function(n, i) {
				return $.inArray(i, delArr) == -1;
			});

			return delArr;
		},
		_template:function(arr) {
			var html = '',
				songId = '',
				albumId = '';

			switch(this.listType.toLowerCase()) {
				case 'play_list':
					html += '<li class="list" music-id="' + arr.SONG_ID + '">';
					//html += '	<div class="sort-handle" style="position:absolute;left:0px;top:0px;width:15px;height:100%;"></div>';
					html += '	<input type="checkbox" class="select-check" />';
					html += '	<a href="#" onclick="fnPlayOn(this); return false;" title="' + decodeURIComponent(arr.SONG) + ' / ' + decodeURIComponent(arr.ARTIST) + '">';
					html += '		<span class="title ellipsis" sort-field="SONG">';

					if(arr.ADLT_YN == "Y") {
						html += '		<span class="icon icon-19">19<span class="hide">금</span></span>';
					}

					html += decodeURIComponent(arr.SONG) + '</span>';
					html += '		<span class="artist ellipsis" sort-field="ARTIST">' + decodeURIComponent(arr.ARTIST) + '</span>';
					html += '	</a>';
					html += '	<a href="#" class="btn-basic btn-listen" onclick="fnPlayOn(this); return false;">듣기</a>';
					html += '	<div class="toggle-button-box has-add-album">';
					html += '		<button type="button" class="btn btn-basic btn-more">더보기</button>';
					html += '		<ul class="list">';
					html += '			<li><a href="#" class="item" title="새창 열림" onclick="fnViewSongInfoPop(\'' + arr.SONG_ID + '\'); return false;">가사</a></li>';
					html += '			<li><a href="#" class="item" title="새창 열림" onclick="shareDo(\'' + arr.SONG_ID + '\');return false;">공유하기/음악나누기</a></li>';
					if(arr.ADLT_YN != "Y") {
						html += '			<li><a href="#" class="item" title="새창 열림" onclick="fnGiftSong(\'' + arr.SONG_ID + '\');return false;">선물하기</a></li>';
					}
					html += '		</ul>';
					html += '	</div>';
					html += '	<div sort-field="ALBUM" style="display:none;">' + decodeURIComponent(arr.ALBUM) + '</div>';
					html += '	<div sort-field="REG_DT" style="display:none;">' + arr.REG_DT + '</div>';
					html += '	<div sort-field="RELEASE" style="display:none;">' + arr.RELEASE + '</div>';
					html += '</li>';
					break;

				case 'play_list_mv':
					songId = (arr.SONG_ID == '' || arr.SONG_ID == null || typeof arr.SONG_ID == 'undefined') ? '-1' : arr.SONG_ID;
					albumId = (arr.ALBUM_ID == '' || arr.ALBUM_ID == null || typeof arr.ALBUM_ID == 'undefined') ? '-1' : arr.ALBUM_ID;

					html += '<li class="list" music-id="' + arr.SONG_ID + '" mv-id="' + arr.MV_ID + '">';
					html += '	<input type="checkbox" class="select-check">';
					html += '	<a href="#" onclick="fnPlayOnMovie(this); return false;" title="' + arr.MV + ' / ' + arr.ARTIST + '">';
					html += '		<div class="cover-mv">';
					html += '		   <span class="mask"></span>';
					html += '		   <img src="//image.genie.co.kr' + arr.IMG + '" onerror="this.src=\'//image.genie.co.kr/imageg/web/common/blank_mv_120.gif\';" alt="' + arr.MV + '">';
					html += '		   <span class="duration">' + arr.DURATION + '</span>';
					html += '	   </div>';

					var typeTag = '';

					if(arr.MV_TYPE != '') {
						typeTag = '<span class="icon icon-box">' + arr.MV_TYPE + '</span>';
					}

					html += '		<span class="title ellipsis" sort-field="MV">' + typeTag + arr.MV + '</span>';
					html += '		<span class="artist ellipsis" sort-field="ARTIST">' + arr.ARTIST + '</span>';
					html += '	</a>';
					html += '	<div class="toggle-button-box">';
					html += '		<button type="button" class="btn btn-basic btn-more">더보기</button>';
					html += '		<ul class="list">';
					html += ( songId == '-1' ? '' : '			<li><a href="#" class="item" title="새창 열림" onclick="fnViewSongInfoPop(\'' + songId + '\'); return false;">곡 정보</a></li>' );
					html += ( albumId == '-1' ? '' : '			<li><a href="#" class="item" title="새창 열림" onclick="fnViewAlbumPop(\'' + albumId + '\'); return false;">앨범 정보</a></li>' );
					html += '			<li><a href="#" class="item" title="새창 열림" onclick="fnViewArtistPop(\'' + arr.ARTIST_ID + '\'); return false;">아티스트 정보</a></li>';
					html += '			<li><a href="#" class="item" title="새창 열림" onclick="fnViewVideoPop(\'' + arr.MV_ID + '\'); return false;">영상 정보</a></li>';
					html += '		</ul>';
					html += '	</div>'
					html += '	<div sort-field="ALBUM" style="display:none;">' + arr.ALBUM + '</div>';
					html += '	<div sort-field="REG_DT" style="display:none;">' + arr.REG_DT + '</div>';
					html += '	<div sort-field="RELEASE" style="display:none;">' + arr.RELEASE + '</div>';
					html += '</li>';
					break;
			}

			return html;
		},
		_redraw:function() {
			var that = this,
				html = '';

			for(var i = 0; i < that.arrayLists.length; i++) {
				html += that._template(that.arrayLists[i]);
			}

			$(that.listsWrap).html(html);
			that._load();
			that.createNumber();
		},
		_del:function() {
			var that = this,
				delArr = [];

			that.checks.filter(':checked').each(function(i) {
				var li = $(this).parent();

				delArr.push(li.index());
			});

			that.arrayLists = $.grep(that.arrayLists, function(n, i) {
				return $.inArray(i, delArr) == -1;
			});

		},
		_updateMeta: function(idx, meta) {
			var that = this;

			if(that.listType == 'play_list_mv') {
				that.arrayLists[idx].SONG = meta.SONG_NAME;
				that.arrayLists[idx].ALBUM = meta.ALBUM_NAME;
				that.arrayLists[idx].ARTIST = meta.ARTIST_NAME;
				that.arrayLists[idx].MV = meta.MV_NAME;
			} else {
				that.arrayLists[idx].SONG = meta.SONG_NAME;
				that.arrayLists[idx].ALBUM = meta.ALBUM_NAME;
				that.arrayLists[idx].ARTIST = meta.ARTIST_NAME;
			}
		}
	};

	window.LIST_SORT = LIST_SORT;
})();

(function() {
	var LIST_DISPLAY = function() {};

	LIST_DISPLAY.prototype = {
		_load:function(delay) {
			var that = this,
				wrapWidth = that.wrap.width(), // 감싸는 영역 넓이
				box = that.wrap.find('li'), // 블럭 배열
				boxLine = box.css('border-right-width').split('px')[0]; // 보더 넓이
			boxCount = box.length, // 블럭 총갯수
				boxWidth = box.eq(0).outerWidth(true), // 블럭 넓이
				boxHeight = box.eq(0).outerHeight(true), // 블럭 높이
				rowCount = parseInt(wrapWidth / boxWidth), // 가로 갯수
				columnCount = Math.ceil(boxCount / rowCount), // 세로 갯수
				delayTime = delay ? delay : 1500 //시작 멈춤 시간
			boxGt = rowCount*(columnCount-1)-1;

			box.filter(':first-child').addClass('left');
			box.filter(':nth-child('+rowCount+'n+1)').addClass('left');
			box.filter(':nth-child('+rowCount+'n)').addClass('right');
			if (boxGt > 0){
				box.filter(':gt('+boxGt+')').addClass('lastcol');
			}else {
				box.addClass('lastcol');
			}

			that.wrap.css({
				position:'relative',
				height: (boxHeight*columnCount)-boxLine
			});

			box.css({
				position:'absolute',
				left:0,
				top:0,
				opacity:1
			});
			box.each(function(i){
				$(this).css({
					zIndex:30-i
				});
			});

			setTimeout(function() {
				box.each(function(i){
					$(this).animate({
						top : parseInt(i/rowCount)*boxHeight,
						left : i%rowCount*boxWidth,
						opacity : 1
					},i*150);
				});
			},delayTime);

			setTimeout(function() {
				//alert('빡 끝')
			},boxCount*150);

		}
	};

	window.LIST_DISPLAY = LIST_DISPLAY;
})();

(function() {
	var AUTO_SEARCH = function() {
		this.keyIndex = 0;
		this.keyEvent = false;
		this.krInterval;
	};

	AUTO_SEARCH.prototype = {
		_load:function() {
			var that = this;

			that.autoComplete = $('<div />').addClass('auto_complete').insertAfter(that.hook);
			that.autoCompleteResult = $('<div />').addClass('search-result').appendTo(that.autoComplete);
			that.searchRecommend = $('<div />').addClass('search-recommend').appendTo(that.autoComplete);

			that._createRecommend().popular();
			that._createRecommend().recent();

			that.searchRecommend.on('click', '.tab button', function() {
				that.searchRecommend.find('.list-search').removeClass('active');
				$(this).closest('.list-search').addClass('active');
				that.hook.focus();
				that.keyIndex = 0;
			});

			that.hook
				.on('keyup', $.proxy(that._keyup, that))
				.on('focus', $.proxy(that._focus, that))
				.on('blur', $.proxy(that._blur, that))
				.on('mouseup', $.proxy(that._mouseup, that));
			that.autoComplete.hide();
		},
		_focus:function(e) {
			var that = this;
			that._search();
		},
		_blur:function(e) {
			var that = this;
			if(that.hook.val() == '') {
				that.hook.val(that.hotKeyword);
			}
		},
		_mouseup:function(e) {
			var that = this;

			var oldValue = that.hook.val();

			if (oldValue == "") return;

			setTimeout(function(){
				var newValue = that.hook.val();

				if (newValue == ""){
					that._search();
				}
			}, 1);
		},
		_keyup:function(e) {
			var that = this;
			if(e.keyCode == 38 || e.keyCode == 40) {
				var browser = fnGetBrowser();
				if (browser == 'firefox') {
					if (that.krInterval) {
						clearInterval(that.krInterval);
					}
				}
				if (that.searchRecommend.is(':visible')) {
					that.recommend = that.searchRecommend.find('.active').hasClass('popular') ? that.searchRecommend.find('.popular') : that.searchRecommend.find('.recent');
					switch (e.keyCode) {
						case 38:
							that.keyIndex--;
							if (that.keyIndex <= 0) that.keyIndex = that.recommend.find('li').size();

							that.recommend.find('li').removeClass('hover');
							var list = that.recommend.find('li').eq(that.keyIndex - 1).addClass('hover');
							that.hook.val(list.attr('data-title'));
							break;
						case 40:
							that.keyIndex++;
							if (that.keyIndex >= that.recommend.find('li').size()) that.keyIndex = 0;

							that.recommend.find('li').removeClass('hover');
							var list = that.recommend.find('li').eq(that.keyIndex - 1).addClass('hover');
							that.hook.val(list.attr('data-title'));
							break;
					}
				} else {
					switch (e.keyCode) {
						case 38:
							that.keyIndex--;

							if (that.keyIndex <= 0) that.keyIndex = that.autoCompleteResult.find('li').size();

							that.autoCompleteResult.find('li').removeClass('hover');

							var list = that.autoCompleteResult.find('li').eq(that.keyIndex - 1).addClass('hover');

							that.hook.val(list.attr('data-title'));
							break;
						case 40:
							that.keyIndex++;

							if (that.keyIndex >= that.autoCompleteResult.find('li').size()) that.keyIndex = 0;

							that.autoCompleteResult.find('li').removeClass('hover');

							var list = that.autoCompleteResult.find('li').eq(that.keyIndex - 1).addClass('hover');
							that.hook.val(list.attr('data-title'));
							break;
					}
				}

			} else if(e.keyCode == 37 || e.keyCode == 39) {
				//좌우키 클릭시 검색하지 않도록 차단
				return false;
			} else {
				that._search();
				this.keyIndex = 0;
			}

		},
		_search:function() {
			var that = this,
				krDB = null;
			var browser = fnGetBrowser();

			if(that.hook.val() == that.hotKeyword) {
				that.hook.val('');
				$('#hdSearchType').val('');
				$('#hdSearchID').val('');
			}

			if(browser == 'firefox') {

				if(that.krInterval) { clearInterval(that.krInterval); }

				that.krInterval = setInterval(function() {
					if(krDB != that.hook.val() && that.hook.val().length > 0) {
						that._getJsonData();
						krDB = that.hook.val();
					}
				}, 100);
			}

			// 인기검색어 처리
			if(that.hook.val() == '') {

				if($('.list-search.popular').hasClass('active')) {
					$.ajax({
						dataType:'json',
						url:'/search/popular'
					}).done($.proxy(that._getRecommendJson, that));
				}

				if($('.list-search.recent').hasClass('active')) {
					that._loadRecent();
				}
				$(".search-recommend").show();
				$(".search-result").hide();
				that.autoComplete.show();
			} else {
				that._getJsonData();
			}

			$(document).bind('click', $.proxy(that._doc, that));

		},
		_getJsonData:function() {
			var that = this;
			if(that.keyEvent === false) {
				$.ajax({
					dataType:'json',
					data:"query=" + encodeURIComponent(encodeURIComponent($.trim(that.hook.val()))),
					url:'/search/searchAuto'
				}).done($.proxy(that._getJson, that));
			}

			$(".search-recommend").hide();
			$(".search-result").show();
			that.autoComplete.show();
		},
		_getJson:function(json) {
			var that = this;

			that.autoCompleteResult.empty();

			if(json.tag != undefined) {
				that._create(json).tag();
			}
			if(json.artist != undefined) {
				that._create(json).artist();
			}
			if(json.song != undefined) {
				that._create(json).song();
			}
			if(json.album != undefined) {
				that._create(json).album();
			}

			if(json.tag == undefined && json.artist == undefined && json.song == undefined && json.album == undefined) {
				that.autoComplete.hide();
			}

		},
		_getRecommendJson:function(json) {
			var that = this;

			that.popularContents.empty();
			that.popularList = [];

			$.each(json.result.items, function(i) {
                var arrow = json.result.items[i].changes,
                    className, datalab, numb;

            	if (arrow == 999){
                    className = 'rank-new';
                    datalab = 'new';
                }else if(arrow > 0){
                    className = 'rank-up';
                    datalab = '상승';
                    numb =  Math.abs(arrow);
                }else if (arrow < 0) {
                    className = 'rank-down';
                    datalab = '하강';
                    numb =  Math.abs(arrow);
                }else if (arrow == 0) {
                    className = 'rank-none';
                    datalab = '유지';
                    numb =  '-';
                }

                if (datalab == 'new') {
                    numb =  'new';
                }
                that.popularList[i] = '<li data-title="'+json.result.items[i].keyword+'"><a href="#" onclick="fnGoSearchKeyword(\''+ json.result.items[i].keyword +'\');return false;">'+json.result.items[i].keyword+'</a><span class="rank"><span class="'+ className +'">'+ numb +'<span class="hide">'+ datalab+'</span></span></span>';
            });
			$('<ol />').prependTo(that.popularContents).html(that.popularList.join(''));
			that.popularFoot = $('<div />').appendTo(that.popularContents).html('<button type="button" class="close">닫기</button>').addClass('btns clearfix');
			that.popularFoot.on('click', '.close', $.proxy(that._close, that));

		},
		_create:function(json) {
			var that = this;

			return {
				tag:function() {
					that.tagTitle = $('<h3 />').appendTo(that.autoCompleteResult).html('관련 태그').addClass('hide');
					that.tagWrap = $('<ul />').appendTo(that.autoCompleteResult).addClass('list-tag');
					that.tagList = [];

					$.each(json.tag, function(i) {
						that.tagList[i] = $('<li><a href="#" class="btn-tag" onclick="goTagsSearch(\''+ json.tag[i].id +'\', \'Y\');return false;">#'+json.tag[i].word+'</a></li>').attr('data-title', json.tag[i].word).appendTo(that.tagWrap);
					});
				},
				song:function() {
					that.songTitle = $('<h3 />').appendTo(that.autoCompleteResult).html('<a href="http://www.genie.co.kr/Search/f_Search_Song.asp?query=' + that.hook.val() + '">곡</a>').addClass('title');
					that.songWrap = $('<ul />').appendTo(that.autoCompleteResult).addClass('list-basic');
					that.songList = [];

					$.each(json.song, function(i) {
						var imgURL = (json.song[i].image == null) ? '//image.genie.co.kr/imageg/web/common/blank_68.gif' : '//image.genie.co.kr' + json.song[i].image,
							_cover = $('<div />', {
								'class':'cover'
							}).html('<span class="mask"></span><img src="'+ imgURL +'"  onerror="this.src=\'//image.genie.co.kr/imageg/web/common/blank_68.gif\';" alt="곡 제목이 들어갑니다." />'),
							_title = $('<span />', {
								'class':'track ellipsis',
								title:json.song[i].word
							}).text(json.song[i].word),
							_artist = $('<span />', {
								'class':'artist ellipsis',
								title:json.song[i].field1
							}).text(json.song[i].field1);
						that.songList[i] = $('<li><a href="#" onclick="fnViewSongInfo(' + json.song[i].id + '); return false;"></a></li>').attr('data-title', json.song[i].word).appendTo(that.songWrap)
							.find('a')
							.append(_cover, _title, _artist);
					});
				},
				artist:function() {
					that.artistTitle = $('<h3 />').appendTo(that.autoCompleteResult).html('<a href="http://www.genie.co.kr/Search/f_Search_Artist.asp?query=' + that.hook.val() + '">아티스트</a>').addClass('title');
					that.artistWrap = $('<ul />').appendTo(that.autoCompleteResult).addClass('list-basic list-artist');
					that.artistList = [];

					$.each(json.artist, function(i) {
						var imgURL = (json.artist[i].image == null) ? '//image.genie.co.kr/imageg/web/common/blank_artist_68.gif' : '//image.genie.co.kr' + json.artist[i].image,
							_cover = $('<div />', {
								'class':'cover'
							}).html('<span class="mask"></span><img src="'+ imgURL +'"  onerror="this.src=\'//image.genie.co.kr/imageg/web/common/blank_68.gif\';" alt="아티스트명이 들어갑니다." />'),
							_artist = $('<span />', {
								'class':'artist ellipsis'
							}).text(json.artist[i].word),
							_type = $('<span />', {
								'class':'desc ellipsis'
							}).html(function() {
								return (function(i) {
									var field_1 = json.artist[i].field1.replace('/', ' / '),
										field_2 = json.artist[i].field2.replace('/', ' / ');
									return field_1 + ' / ' + field_2;
								})(i);
							});

						that.artistList[i] = $('<li><a href="#" onclick="fnViewArtist(' + json.artist[i].id + '); return false;"></a></li>').attr('data-title', json.artist[i].word).appendTo(that.artistWrap)
							.find('a')
							.append(_cover, _artist, _type);
					});
				},
				album:function() {
					that.albumTitle = $('<h3 />').appendTo(that.autoCompleteResult).html('<a href="http://www.genie.co.kr/Search/f_Search_Album.asp?query=' + that.hook.val() + '">앨범</a>').addClass('title');
					that.albumWrap = $('<ul />').appendTo(that.autoCompleteResult).addClass('list-basic');
					that.albumList = [];

					$.each(json.album, function(i) {
						var imgURL = (json.album[i].image == null) ? '//image.genie.co.kr/imageg/web/common/blank_68.gif' : '//image.genie.co.kr' + json.album[i].image,
							_cover = $('<div />', {
								'class':'cover'
							}).html('<span class="mask"></span><img src="'+ imgURL +'"  onerror="this.src=\'//image.genie.co.kr/imageg/web/common/blank_68.gif\';" alt="앨범명이 들어갑니다." />'),
							_album = $('<span />', {
								'class':'track ellipsis'
							}).text(json.album[i].word),
							_artist = $('<span />', {
								'class':'artist ellipsis'
							}).html( json.album[i].field1);

						that.albumList[i] = $('<li><a href="#" onclick="fnViewAlbumLayer(' + json.album[i].id + '); return false;"></a></li>').attr('data-title', json.album[i].word).appendTo(that.albumWrap)
							.find('a')
							.append(_cover, _album, _artist);
					});
				}
			};
		},
		_createRecommend:function() {
			var that = this;
			return {
				popular:function() {
					that.popularWrap = $('<div />').appendTo(that.searchRecommend).addClass('list-search popular active');
					that.popularTitle = $('<h3 />').appendTo(that.popularWrap).html('<button type="button">인기검색어</button>').addClass('tab');
					that.popularContents = $('<div />').insertAfter(that.popularTitle).addClass('list');
					that.popularFoot = $('<div />').appendTo(that.popularContents).html('<button type="button" class="close">닫기</button>').addClass('btns clearfix');
					that.popularFoot.on('click', '.close', $.proxy(that._close, that));
				},
				recent:function() {
					that.recentWrap = $('<div />').appendTo(that.searchRecommend).addClass('list-search recent');
					that.recentTitle = $('<h3 />').appendTo(that.recentWrap).html('<button type="button">최근검색어</button>').addClass('tab');
					that.recentContents = $('<div />').insertAfter(that.recentTitle).addClass('list');
					$('<p />').prependTo(that.recentContents).html('최근 검색어가 없습니다.').addClass('no-data');
					that.recentFoot = $('<div />').appendTo(that.recentContents).html('<button type="button" class="btn-delete">최근검색어 전체삭제</button><button type="button" class="close">닫기</button>').addClass('btns clearfix');
					that.recentFoot.on('click', '.btn-delete', $.proxy(that._deleteRecent, that));
					that.recentFoot.on('click', '.close', $.proxy(that._close, that));
				}
			}
		},
		_doc:function(e) {
			var that = this,
				t = e.target,
				currentTarget = t;

			while(currentTarget != undefined) {
				if(currentTarget == that.autoComplete[0] || currentTarget == that.hook[0]) {
					return;
				} else currentTarget = currentTarget.parentNode;
			}

			if(currentTarget === null) {
				that._close();
			}
		},
		_close:function(e) {
			var that = this;

			that.autoComplete.hide();
		},
		_saveRecent:function(searchWord) {
			var that = this;

			var date = new Date();
			var month = new String(date.getMonth()+1);
			var day = new String(date.getDate());

			// 한자리수일 경우 0을 채워준다.
			if(month.length == 1){
				month = "0" + month;
			}
			if(day.length == 1){
				day = "0" + day;
			}

			var searchHistory = new Object();
			searchHistory.word = searchWord;
			searchHistory.date = month + '.' + day;

			var cookieObj = FG_cookie.get('genie-recent');
			var jsonText;
			if(cookieObj != "") {
				var recentJson = JSON.parse(cookieObj);
				recentJson.unshift(searchHistory);
				if(recentJson.length > 20) {
					recentJson.pop();
				}
				// recentJson.length = 20;
				jsonText = JSON.stringify(recentJson);
			} else {
				var newHistoryArray = new Array();
				newHistoryArray.push(searchHistory);
				jsonText = JSON.stringify(newHistoryArray);
			}

			FG_cookie.set('genie-recent', jsonText, 1000);

		},
		_loadRecent:function() {
			var that = this;

			// init
			that.recentContents.find('ul').remove();
			that.recentContents.find('p').remove();

			var cookieObj = FG_cookie.get('genie-recent');

			if(cookieObj != "") {

				var recentJson = JSON.parse(cookieObj);
				that.recentList = [];
				if(recentJson.length > 0) {
					$.each(recentJson, function(i) {
						that.recentList[i] = '<li data-title="'+recentJson[i].word+'"><a href="#" onclick="fnGoSearchKeyword(\'' + recentJson[i].word + '\');return false;">'+recentJson[i].word+' <span class="date">'+recentJson[i].date+'</span></a></li>';
					});

					$('<ul />').prependTo(that.recentContents).html(that.recentList.join(''));
				}
			} else {
				$('<p />').prependTo(that.recentContents).html('최근 검색어가 없습니다.').addClass('no-data');
			}

		},
		_deleteRecent:function() {
			var that = this;
			// 쿠키삭제 후 로드
			FG_cookie.del('genie-recent');
			that._loadRecent();
		}
	};

	window.AUTO_SEARCH = AUTO_SEARCH;
})();

(function() {
	var GRAPH = function() {
		this._hook = 'svgContainer';
		this._parent;
		this._canvas;
		this._arrTimeList;
		this._borderColor;
		this._dataPath = new Array();
		this._dataPathArr = new Array();
		this._rankingArr;
		this._pointArr;
		this._blindFlag = true;
		this._blindArr;
		this._blindPositionY = new Array();
		this._overPathArr = new Array();
		this._drawIdx = 0;
		this._btnTrigger = null;
		this._loop = true;
		this._rollingId;
		this._rollingIdx = 0;
		this._rollingTime = 4000;
		this._cnt = 0;
		this._isMinimal = false;
		this._isMinimalSetting = false;
		this._minimalIdx = 0;
		this._option = {
			w: 502,
			h: 290
		}
	};

	GRAPH.prototype = {
		_init:function() {
			Raphael.el.trigger = function(eventName){
				for(var i = 0, len = this.events.length; i < len; i++) {
					if (this.events[i].name == eventName) {
						this.events[i].f.call(this);
					}
				}
			}

			this._blindFlag = (function() {
				var date = new Date(),
					ymd = 'ymd'.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]'),
					regex = new RegExp('[\\?&]' + ymd + '=([^&#]*)'),
					result;
				date.setHours(date.getHours() + 9);
				result = ((regex.exec(location.search) === null) ? date.toISOString().slice(0,10).replace(/-/g,'') : decodeURIComponent(regex.exec(location.search)[1].replace(/\+/g, ' '))) * 1;
				return (result >= 20180711) ?  true : false ;
			})();
		},
		_load:function() {
			var that = this,
				unitWidth = (that._isMinimal) ? 38 : 20,
				blindCount = 0,
				and = 0,
				minX = [],
				maxX = [],
				endPath = [],
				blindArea, blindRectWidth, blindKey, current;
			that._canvas = Raphael(that._hook, this._option.w, this._option.h);
			that._parent = $('#'+that._hook).parent();
			that._cnt = that._dataPath.length;
			that._loop = that._isMinimal ? false : true;
			that._blindPositionY = [[],[]];
			blindRectWidth = [unitWidth, unitWidth];

			that._rankingArr = that._canvas.set();
			for(var i=0;i<that._cnt;i++) {
				that._dataPathArr[i] = that._dataPath[i][that._dataPath[i].length-1].replace('M','').replace('L','').split(' ');
				if(this._isMinimal)	that._rankingArr.push(that._canvas.path(that._dataPath[i]).attr({'stroke':that._borderColor[i], 'stroke-width':2, 'stroke-opacity':1}));
				else that._rankingArr.push(that._canvas.path('M'+that._dataPathArr[i][0]+' '+that._dataPathArr[i][1]).attr({'stroke':that._borderColor[i], 'stroke-width':2, 'stroke-opacity':0.5}));
				that._setClickRanking(i);
			}

			for(var i=0;i<that._arrTimeList.length;i++) {
				var positionX = parseFloat(that._dataPathArr[0][i*2]);
				blindArea = that._arrTimeList[i].toString().replace(/(^0)/, "");

				if (that._blindFlag && 0 < blindArea  && blindArea < 7) {
					blindCount++;
					blindKey = (typeof current === 'undefined' || (i - 1 === current && typeof current !== 'undefined') && !(blindKey === 1)) ? 0 : 1;
					current = i;
					blindRectWidth[blindKey] += unitWidth;
					if((i + 1 == that._arrTimeList.length) && blindCount !== 6 || (i == (that._isMinimal ? 11 : 23) && blindCount === 6) ){
						// blindCount가 6이 아닌데 끝나버림
						blindRectWidth[blindKey] -= unitWidth;
						and = unitWidth;
					}

					if(typeof minX[blindKey] === 'undefined') {
						minX[blindKey] = positionX;
						for(var j=0; j<that._cnt; j++) {
							that._blindPositionY[blindKey].push(parseFloat(that._dataPathArr[j][i*2+1]));
						}
					}else if(minX[blindKey] !== positionX) {
						maxX[blindKey] = positionX + unitWidth;
					}
					if(blindArea === 6) maxX[blindKey] += unitWidth;
					if(i == 23 && blindCount === 6 || (i + 1 == that._arrTimeList.length) && blindCount !== 6) maxX[blindKey] -= unitWidth;
				}
				if(blindArea == 7){
					for(var k=0; k<that._cnt; k++) {
						endPath.push(parseFloat(that._dataPathArr[k][i*2+1]));
					}
				}
			}

			if(that._blindFlag){
				that._blindArr = that._canvas.set();
				$.map(blindRectWidth, function (value, label, array) {
					var imgUrl = (that._isMinimal) ? 'bg_grid_freeze.png' : 'bg_grid_freeze_top200.png';
					var pathAttr = (that._isMinimal) ? {'stroke':'#d4d6d8', 'stroke-width':2, 'stroke-opacity':1} : {'stroke':'#d4d6d8', 'stroke-width':2, 'stroke-opacity':1};
					var andWidth = (that._isMinimal) ? and : (label !== 0 || (blindRectWidth[label]/6 == unitWidth) ) ? and : 0;

					maxX[label] = maxX[label] ? maxX[label] : minX[label] + unitWidth;
					if (value !== unitWidth) {
						that._blindArr[label + 10] = that._canvas.rect(minX[label], 0, blindRectWidth[label] - unitWidth , that._option.h).attr({'stroke': 0, 'fill': 'url("//image.genie.co.kr/imageg/web/main/' + imgUrl + '")'}).toBack();

						for(var i=0;i<that._cnt;i++) {
							that._blindArr.push(that._canvas.path(
									"M"+ minX[label] +"," + that._blindPositionY[label][i] +
									" L" + (maxX[label] - unitWidth + andWidth - ((that._arrTimeList[0] == 2 || that._arrTimeList[that._arrTimeList.length - 1] == 6 ) ? unitWidth : '') ) +"," + that._blindPositionY[label][i] +
									((label == 0 && !(that._arrTimeList[that._arrTimeList.length-1] == 6)) || (label == 1 && blindRectWidth[label]/6 == unitWidth) ? " L" + (maxX[label] ) + "," + endPath[i] : "")
								).attr(pathAttr)).toFront();
						}
					}
				});
			}

			that._pointArr = that._canvas.set();
			for(var i=0;i<that._arrTimeList.length;i++) {
				blindArea = that._arrTimeList[i].toString().replace(/(^0)/, "");
				if (!(that._blindFlag && 1 < blindArea  && blindArea < 6)) {
					that._pointArr[i] = that._canvas.rect(0, 0, unitWidth, 20).attr('stroke-width', 0).toFront();
				}
			}
			that._pointArr.attr('opacity',0);

			that._parent.find('.icon-chart').each(function(idx, arr) {
				$(this).css('top', parseInt(that._dataPathArr[idx][47])+'px');
			});

			if(!that._isMinimal) {
				$('<span />').addClass('bg-line').css({'left': (that._arrTimeList.indexOf('00')*0)+'px'}).prependTo('#'+that._hook);
				$('<span />').addClass('bg-line').css({'left': (that._arrTimeList.indexOf('12')*20)+'px'}).prependTo('#'+that._hook);

				that._draw();
			} else {
				that._rankingArr[1].trigger('click');
			}

			if(that._btnTrigger != null) {
				that._btnTrigger.each(function(idx, arr) {
					$(this).click(function(e) {
						that._rankingArr[idx].trigger('click');
						that._btnTrigger.removeClass('active');
						$(this).addClass('active');
						return false;
					});
				});
			}

			$('#'+that._hook).mouseleave(function(e) {
				that._parent.find('.detail-info').clearQueue().delay(2000).queue(function() {
					$(this).fadeOut(150).dequeue();
					that._parent.find('.time span').removeClass('active');
				});
			});
		},
		_draw:function() {
			var that = this;

			for(var i=0;i<that._cnt;i++) {
				that._rankingArr[i].animate({path:that._dataPath[i][that._drawIdx]}, 75);
			}
			that._drawIdx++;

			if (that._drawIdx < that._dataPath[0].length)
			{
				setTimeout(function(){
					that._draw();
					if(that._drawIdx == (that._dataPath[0].length-1)) {
						setTimeout(function() {
							that._rankingArr[0].trigger('click');
							if(that._loop) that._rolling();
						}, 1000);
					}
				},75);
			}
		},
		_setClickRanking:function(i) {
			var that = this;
			that._rankingArr[i].data('i', i).click(function(e) {
				if((!that._isMinimal && this.attr('stroke-opacity') == 1) || (that._isMinimal && that._isMinimalSetting)) return false;
				that._parent.find('.detail-info').clearQueue().fadeOut(150);
				that._parent.find('.time span').removeClass('active');
				that._rankingArr.attr({'stroke-width':2, 'stroke-opacity':(that._isMinimal ? 1:0.5)});

				this.toFront();

				for(var j=0;j<that._cnt;j++) {
					if(this.data('i') == j) {
						if(that._blindFlag && that._blindArr[j]){
							that._blindArr[0].toFront();
							for (var k = 0; k < that._blindArr.length; k++){
								that._blindArr[k].attr({'stroke-width':2, 'stroke-opacity':1}).toFront();
							}
							that._blindArr[j].attr({'stroke-width':4, 'stroke-opacity':1}).toFront();
							if(that._blindArr.length > 5) that._blindArr[(j+5)].attr({'stroke-width':4, 'stroke-opacity':1}).toFront();
						}
						that._rankingArr[j].attr({'stroke-width':3, 'stroke-opacity':1});
						that._rankingArr[j].g = that._rankingArr[j].glow({'width':3, 'offsety':5, 'opacity':0.07}).toBack();
					} else {
						if(typeof that._rankingArr[j].g != 'undefined') that._rankingArr[j].g.remove();
					}
				}

				for(var k=0;k<that._arrTimeList.length;k++) {
					that._setPoint(this.data('i'), k);
				}
				that._pointArr.attr('opacity',1);

				that._parent.find('.icon-chart, .chart-info li, .ranking-link button').removeClass('active');
				that._parent.find('.ranking-'+(this.data('i')+1)).addClass('active');

				that._rollingIdx = i;
				that._isMinimalSetting = true;
			});
		},
		_setPoint:function(i, k) {
			var that = this, isTop = false, blindArea;
			if(!that._isMinimal && that._overPathArr[i][k] >= 11) isTop = true;

			blindArea = that._arrTimeList[k].toString().replace(/(^0)/, "");

			if (that._blindFlag && 1 < blindArea  && blindArea < 7) return;

			if(that._isMinimal) that._pointArr[k].attr({'x':parseFloat(that._dataPathArr[i][k*2])-19, 'y':that._dataPathArr[i][k*2+1]-10, 'fill':'url("//image.genie.co.kr/imageg/web/main/point_'+that._minimalIdx+(k === 11?'_active' :'')+'.png")'}).toFront();
			else that._pointArr[k].attr({'x':parseFloat(that._dataPathArr[i][k*2])-10, 'y':that._dataPathArr[i][k*2+1]-10, 'fill':'url("//image.genie.co.kr/imageg/web/chart/point_'+i+(isTop ? '_top':'')+'.png")'}).toFront();
			if(!that._isMinimal) {
				
				that._pointArr[k].data({'i':i, 'k':k, 'cx':parseFloat(that._dataPathArr[i][k*2])+0.5, 'isTop':isTop}).mouseover(function() {
					var i = this.data('i'), k = this.data('k'), isTop = this.data('isTop');
					var cy_idx = k*2+1;
					var speed = that._parent.find('.detail-info').is(':visible') ? 500 : 0;
					var rank = parseFloat(that._dataPathArr[i][cy_idx]), rank_idx = 0;

					if(that._parent.find('.detail-info').attr('data-num') == k) return false;
					if(typeof that._rollingId != 'undefined') {
						that._rollingId = clearTimeout(that._rollingId);
						setTimeout(function() {
							that._rolling();
						}, that._rollingTime);
					}

					for(var m=0;m<that._cnt;m++) {
						if(m == i) continue;
						else if(rank > parseFloat(that._dataPathArr[m][cy_idx])) rank_idx++;
						else	rank_idx--;
					}

					that._parent.find('.detail-info').clearQueue().stop().show().attr({'data-num':k, 'class':'detail-info ranking-'+(parseInt(i)+1)+((that._dataPathArr[i][cy_idx] < 60) ? ' reverse':'')}).animate({left: this.data('cx')}, {
						duration: speed,
						specialEasing: {left: 'swing'},
						complete: function() {
							if(isTop) $(this).addClass('top');
							that._parent.find('.time span').removeClass('active');
							that._parent.find('.time span:eq('+k+')').addClass('active');
						}
					});

					for(var l=0;l<that._cnt;l++) {
						if(l == i) {
							that._parent.find('.detail-info .info, .detail-info .point-'+(l+1)).stop().animate({top: that._dataPathArr[l][cy_idx]}, {
								duration: speed,
								specialEasing: {top: 'swing'}
							});
						} else {
							that._parent.find('.detail-info .point-'+(l+1)).stop().animate({top: that._dataPathArr[l][cy_idx]}, {
								duration: speed,
								specialEasing: {top: 'swing'}
							});
						}
					}
					that._parent.find('.detail-info .info').html(that._arrTimeList[k]+':00<br />'+(rank_idx/2+3)+'위');
				});
			}
		},
		_rolling:function() {
			var that = this;

			that._rollingId = clearTimeout(that._rollingId);
			that._rollingId = setTimeout(function() {
				if(that._rollingIdx >= 4) that._rollingIdx = 0;
				else that._rollingIdx++;

				that._rankingArr[that._rollingIdx].trigger('click');
				that._rolling();
			}, that._rollingTime);
		}
	}
	window.GRAPH = GRAPH;
})();

function allSelect(obj) {
	var selectObject = obj ? $(obj)[0] : $('.page-lyric .body .view')[0];

	if(window.getSelection) {
		var selected = window.getSelection();

		selected.selectAllChildren(selectObject);
	} else if(document.body.createTextRange) {
		var range = document.body.createTextRange();

		range.moveToElementText(selectObject);
		range.select();
	}
}



function alertLayer() {
	var val = arguments;

	var layer = $('<div />').addClass('layer-popup').appendTo('body').css({
		width:388
	}).show();

	var inner = $('<div />').addClass('inner').appendTo(layer).html(val[0].replace(/\n/g, '<br />'));
	var foot = $('<div />').addClass('confirm-btn').appendTo(layer);

	$.each(val[1], function(i) {
		var btn = $('<a />', {
			href:'#'
		}).appendTo(foot)
			.addClass('conf-btn radius' + ' btn-' + val[1][i][1])
			.html(val[1][i][0]);

		if(val[1][i][2]) {
			btn.bind('click', function() {
				val[1][i][2]();
				return false;
			});
		}
		if(val[1][i][3] == 'close') {
			btn.bind('click', function() {
				FG_layerPopup.hide(layer);
				return false;
			});
		}
	});

	if(val[2] == 'close') {
		var close = $('<div class="close"><a href="#" class="layer-close">close</a></div>').appendTo(layer).find('a').bind('click', function() {
			layer.remove();
			return false;
		});
	}

	FG_layerPopup.show(layer);
}

function alertLayerNew() {
    var val = arguments;

    var layer = $('<div />').addClass('layer-popup').appendTo('body').css({
        width:388
    }).show();

    var inner = $('<div />').addClass('inner').appendTo(layer).html(val[0].replace(/\n/g, '<br />'));
    var foot = $('<div />').addClass('confirm-btn').appendTo(layer);

    $.each(val[1], function(i) {
        var btn = $('<a />', {
            href:'#'
        }).appendTo(foot)
            .addClass('conf-btn radius' + ' btn-' + val[1][i][1])
            .html(val[1][i][0]);

        if(val[1][i][2]) {
            btn.bind('click', function() {
                val[1][i][2]();
                return false;
            });
        }
        if(val[1][i][3] == 'close') {
            btn.bind('click', function() {
                FG_layerPopup.hide(layer);
                opener.location.reload();
                self.close();
                return false;
            });
        }
    });

    if(val[2] == 'close') {
        var close = $('<div class="close"><a href="#" class="layer-close">close</a></div>').appendTo(layer).find('a').bind('click', function() {
            layer.remove();
            return false;
        });
    }

    FG_layerPopup.show(layer);
}

//popup
function ow_no(xurl, tar, wid, hei){
	var winl = (screen.width - wid) / 2;
	var wint = (screen.height - hei) / 2;
	set = 'width='+wid+',height='+hei+',top='+wint+',left='+winl+', toolbar=no,location=no,directory=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no'
	win = window.open(xurl,tar,set);
}

$(document).ready(function() {
	if($('#wrap-main').size() > 0 && !Modernizr.testAllProps('transition')) {
		var obj = $('.new-album .body .roll-wrap .cover a');
		var glass = $('<i class="glass" />').appendTo(obj);

		obj.bind('mouseenter', function() {
			$(this).find('.glass').css({
				left:-328
			}).animate({
				left:164
			});
		});
	}

	// 화면 이탈시 스크롤 복귀
	(function (){
		return $('#accessibility') ? $('#accessibility') : $('body')
	})().attr('tabIndex','-1').focus();
});

// 뮤직비디오 팝업
$(function() {
	$(".mvPopOpen").bind('click', function() {

		var pl = $(this).offset().left-313;
		var pt = $(this).offset().top-80;

		$("#mvPop").css({
			display:'block',
			position:'absolute',
			left:'50%',
			top:pt+'px',
			zIndex:100,
			marginLeft:'-245px'
		});
		//alert(popup)

		return false;
	});
});

// 말줄임
(function($) {
	$.fn.ellipsis = function() {
		return this.each(function() {
			var el = $(this);

			if(el.css("overflow") == "hidden") {
				var text = el.html();
				var multiline = el.hasClass('multiline');
				var t = $(this.cloneNode(true))
					.hide()
					.css('position', 'absolute')
					.css('overflow', 'visible')
					.width(el ? el.width() : 'auto')
					.height(el ? 'auto' : el.height());

				el.after(t);

				function height() { return t.height() > el.height(); };
				function width() { return t.width() > el.width(); };

				var func = el ? height : width;
				do {
					if (text.length > 0 && func()){
						text = text.substr(0, text.length - 1);
						t.html(text+"...");
					} else {
					}

				} while (text.length > 0 && func()){
					var lengths = text.length;
					var strs = text.substr(lengths-1,lengths);
					if (strs == " "){
						text = text.substr(0, text.length - 1);
						t.html(text+"...");
					}
				}

				el.html(t.html());
				t.remove();
			}
		});
	};
})(jQuery);


function mvPopClose(){
	$("#mvPop").hide();

}

//payment tab
function fixDiv($cache, top) {
	if ($(window).scrollTop() > top){
		$cache.addClass('fixed');
	}else{
		$cache.removeClass('fixed');
	}
}

function setMagazineMenu() {
	$('.magazine .btn-fold').click(function(e) {
		$('.magazine .complete').toggleClass('expand');
	});
}

function fnGetBrowser(){
	var agt=navigator.userAgent.toLowerCase();
	if( ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1)) || (agt.indexOf("trident") != -1) ){
		return "IE";
	}else if( agt.indexOf('chrome')!=-1  ){
		return "chrome";
	}else if( agt.indexOf('safari')!=-1  ){
		return "safari";
	}else if( agt.indexOf('firefox')!=-1  ){
		return "firefox";
	}else{
		return "unknown";
	}
}
var FG_layerPopup_etc;
(function() {
	var LAYER_POPUP_etc = function() {
		this.modalStyle = {
			position:'absolute',
			top:0,
			left:0,
			right:0,
			zIndex:99,
			height:this._size.oHeight
		};
		this.layerStyle = {
			display:'block',
			position:'fixed',
			left:'50%',
			top:'50%',
			zIndex:100
		};
		this.option = {
			modalHide:false,
			modalClose:false
		};

		this._target = null;
	};

	LAYER_POPUP_etc.prototype = {
		_size:{
			cWidth:document.documentElement.clientWidth,
			cHeight:document.documentElement.clientHeight,
			oHeight:function() {
				return Math.max(
					Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
					Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
					Math.max(document.body.clientHeight, document.documentElement.clientHeight)
				);
			}
		},
		show:function(element) {
			//로그인 레이어를 더이상 노출하는 곳이 없지만 하드코딩된 곳이 많아 공통 처리 부분에서 예외처리함
			try {
				if (element.attr('id') == "login-def") {
					loginPopup();
					return false;
				}
			} catch(e) {}

			var that = this;
			if(arguments.callee.caller == null)
				that._target = null;
			else {
				that._target = window.event || arguments.callee.caller.arguments[0];
				if(that._target != undefined)
					that._target = (that._target.srcElement) ? that._target.srcElement : that._target.target;
			}

			that.layer = $(element);

			Object.extend(that.layerStyle, {
				marginTop:(that.layer.height() / 2 * -1),
				marginLeft:(that.layer.width() / 2 * -1)
			});

			that.layer.css(that.layerStyle);

			if(!that.option.modalHide) {
				that.lightBox = $('<div />').appendTo('body').css(that.modalStyle).addClass('modalLayer');

				if(that.option.modalClose === true)
					that.lightBox.click($.proxy(that.hide, that));
			}
			that.layer.find('.layer-close').bind('click', $.proxy(that.hide, that));
		},
		hide:function(element) {
			var that = this;

			if(element !== undefined && element[0] !== undefined) that.layer = $(element);

			if(!that.option.modalHide) {
				if(that.lightBox) that.lightBox.remove();
			}
			that.layer.hide();

			return false;
		},
		hidepade:function(element) {
			var that = this;

			if(element !== undefined && element[0] !== undefined) that.layer = $(element);

			if(!that.option.modalHide) {
				if(that.lightBox) that.lightBox.remove();
			}
			that.layer.fadeOut();

			return false;
		}
	};

	window.LAYER_POPUP_etc = LAYER_POPUP_etc;

	return {
		load:function() {
			FG_layerPopup_etc = new LAYER_POPUP_etc();
		}
	}
})().load();
