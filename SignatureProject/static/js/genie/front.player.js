var isProgDrag = false;
(function() {
	var MUSIC_CONTROL = function() {};

	MUSIC_CONTROL.prototype = {
		thisControllerPosition:0,
		controllerPosition:0,
		volumePosition:50,
		thisVolumePosition:50,
		controllerTime:0,

		_callProgress:function() { return false; },
		_callVolume:function() { return false; },

		set:function() {
			var that = this;

			that.barWidth = that.bar.outerWidth();
			that.volumeWidth = that.volumebar.outerWidth();

			that.addTime();

			that.controller.bind(START_EV, $.proxy(that._start, that))
				.bind('focus', $.proxy(that._focus, that))
				.bind('blur', $.proxy(that._blur, that))
				.bind(CLICK_EV, function(e) { return false; });

			that.bar.bind(START_EV, $.proxy(that._touch, that));

			that.volumebar.bind(START_EV, $.proxy(that._volume, that));
			that.volume.bind(CLICK_EV, $.proxy(that._toggleVolume, that));

			$(window).bind('resize', function() {
				that.barWidth = that.bar.outerWidth();
			});
		},
		addZero: function(number){
			return parseInt(number, 10) < 10 ? '0' + number : number;
		},
		addTime:function() {
			var that = this,
				musicTime = that.addZero(Math.floor(that.playTime / 60)) + ':' + that.addZero(that.playTime % 60);

			$('.music-time').html(musicTime);

			that.thisTime();
		},
		thisTime:function() {
			var that = this;

			//var thisTime = Math.round(that.playTime * Math.round(that.controllerPosition) / 100);
			if(isNaN(that.controllerTime)) that.controllerTime = 0;

			thisTime = that.addZero(Math.floor(that.controllerTime / 60)) + ':' + that.addZero(that.controllerTime % 60);
			$('.play-time').html(thisTime);
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

			that.thisTime();
		},
		_keyEvent:function(e) {
			var that = this;
			switch(e.keyCode) {
				case 39:
					if(that.controllerPosition < 100)
						that.controllerPosition += 2;
					break;
				case 37:
					if(that.controllerPosition > 0)
						that.controllerPosition -= 2;
					break;
			}
			that.thisControllerPosition = that.controllerPosition;
			that._setProgress();
		},
		_focus:function() {
			var that = this;
			$(document).bind('keypress', $.proxy(that._keyEvent, that));
		},
		_blur:function() {
			var that = this;
			$(document).unbind('keypress', $.proxy(that._keyEvent, that));
		},
		_touch:function(e) {
			var that = this;

			var touchPoint = hasTouchEvent ? e.originalEvent.touches[0] : e.originalEvent;
			that.touchX = (touchPoint.pageX || touchPoint.clientX) - that.bar.offset().left;

			that.controllerPosition = (that.touchX / (that.barWidth - 5)) * 100;

			that.thisControllerPosition = that.controllerPosition;

			that.controllerTime = Math.round(that.playTime * that.controllerPosition / 100);

			that._setProgress();

			that._callProgress();
		},
		_start:function(e) {
			isProgDrag = true;
			var that = this;
			e.preventDefault();
			e.stopPropagation();

			var startPoint = hasTouchEvent ? e.originalEvent.touches[0] : e.originalEvent;
			that.startX = startPoint.pageX || startPoint.clientX;

			that.controller.addClass('show');
			/*
			that.bar.bind(MOVE_EV, $.proxy(that._move, that));
			that.bar.bind(END_EV, $.proxy(that._end, that));
			*/
			$(document).bind(MOVE_EV, $.proxy(that._move, that));
			$(document).bind(END_EV, $.proxy(that._end, that));

			//that.bar.bind('mouseout', $.proxy(that._mouseout, that));
		},
		_move:function(e) {
			var that = this;
			e.preventDefault();

			that.movePoint = hasTouchEvent ? e.originalEvent.touches[0] : e.originalEvent;
			that.deltaX = (that.movePoint.pageX || that.movePoint.clientX) - that.startX;

			that.controllerPosition = (that.deltaX / (that.barWidth - 5)) * 100 + that.thisControllerPosition;

			that.controllerTime = Math.round(that.playTime * that.controllerPosition / 100);

			if(that.controllerTime >= that.playTime) that.controllerTime = that.playTime;
			else if(that.controllerTime <= 0) that.controllerTime = 0;

			that._setProgress();
		},
		_end:function(e) {
			isProgDrag = false;
			var that = this;

			that.thisControllerPosition = that.controllerPosition;

			that.controllerTime = Math.round(that.playTime * that.controllerPosition / 100);

			that.controller.removeClass('show');

			/*
			that.bar.unbind(MOVE_EV, $.proxy(that._move, that));
			that.bar.unbind(END_EV, $.proxy(that._end, that));
			*/
			$(document).unbind(MOVE_EV, $.proxy(that._move, that));
			$(document).unbind(END_EV, $.proxy(that._end, that));

			//that.bar.unbind('mouseout', $.proxy(that._mouseout, that));

			that._callProgress();
		},
		_mouseout:function(e) {
			e = e.originalEvent;

			var that = this,
				t = e.relatedTarget || e.toElement,
				currentTarget = t;

			while(currentTarget != undefined) {
				if(currentTarget == that.bar[0]) return;
				else currentTarget = currentTarget.parentNode;
			}
			that._end(e);
		},
		_setVolume:function() {
			var that = this;

			that.volumePosition = Math.round(that.volumePosition);

			if(that.volumePosition <= 100 && that.volumePosition >= 0) {
				that.volumebar.find('a').css({
					width:that.volumePosition + '%'
				});
			}
			if(that.volumePosition <= 0) {
				that.volume.addClass('mute');
			} else
				that.volume.removeClass('mute');
		},
		_volume:function(e) {
			var that = this;
			e.preventDefault();
			e.stopPropagation();

			var touchPoint = hasTouchEvent ? e.originalEvent.touches[0] : e.originalEvent;
			that.volumeX = (touchPoint.pageX || touchPoint.clientX) - that.volumebar.offset().left;

			that.volumePosition = (that.volumeX / that.volumeWidth) * 100;

			$(document).bind(MOVE_EV, $.proxy(that._moveVolume, that));
			$(document).bind(END_EV, $.proxy(that._endVolume, that));

			that._setVolume();
		},
		_moveVolume:function(e) {
			var that = this;
			e.preventDefault();

			that.volumeMovePoint = hasTouchEvent ? e.originalEvent.touches[0] : e.originalEvent;
			that.volumeDeltaX = (that.volumeMovePoint.pageX || that.volumeMovePoint.clientX) - that.volumebar.offset().left;

			that.volumePosition = (that.volumeDeltaX / that.volumeWidth) * 100;

			that._setVolume();
		},
		_endVolume:function(e) {
			var that = this;

			that.thisVolumePosition = that.volumePosition;

			$(document).unbind(MOVE_EV, $.proxy(that._moveVolume, that));
			$(document).unbind(END_EV, $.proxy(that._endVolume, that));

			if(that.volumePosition >= 100)
				that.volumePosition = 100;
			else if(that.volumePosition <= 0)
				that.volumePosition = 0;

			that._setVolume();

			that._callVolume();
		},
		_toggleVolume:function(e) {
			var that = this;
			e.preventDefault();
			e.stopPropagation();

			if(that.volume.hasClass('mute')) {
				that.volumePosition = that.thisVolumePosition;

				that.volume.removeClass('mute');

				that._setVolume();

			} else {
				that.thisVolumePosition = that.volumePosition;
				that.volumePosition = 0;

				that.volume.addClass('mute');

				that._setVolume();
			}

			that._callVolume();
		}
	};

	window.MUSIC_CONTROL = MUSIC_CONTROL;
})();

Object.extend(LIST_SORT.prototype, {
	toggleExtend:function() {
		var that = this,
			wrap = $('#music-tab .list-wrap'),
			scrollPosition = (wrap.scrollTop() + that.lists.filter('.select-list').position().top) - (wrap.height() / 2) + (function() {
				var l = that.lists.filter('.select-list');
				return ((l.size() * l.outerHeight()) / 2);
			})();

		wrap.scrollTop(scrollPosition);
		//wrap.stop().animate({ scrollTop:scrollPosition });
	}
});

(function() {
	var MUSIC_PLAYER = function() {
		this._option = {
			repeat: null,
			random: null
		}
		this._hook = null;
	};

	MUSIC_PLAYER.prototype = {
		_load:function(hook) {
			var that = this;
			that._hook = hook;
			//set btns
			$('<button type="button" class="fp-icon fp-random" title="순차">순차재생</button>').prependTo('.fp-controls');
			$('<button type="button" class="fp-icon fp-repeat" title="반복해제">반복해제</button>').prependTo('.fp-controls');
			$('<button type="button" class="fp-icon fp-prev">이전 곡 듣기</button>').insertBefore('.fp-controls .fp-playbtn');
			$('<button type="button" class="fp-icon fp-next">다음 곡 듣기</button>').insertAfter('.fp-controls .fp-playbtn');
			$('<button type="button" class="fp-icon fp-lyrics" title="가사전체보기">가사전체보기</button>').insertAfter('.fp-volume');

			//set play / pause
			hook.on('click', '.fp-playbtn', function(e) {
				e.preventDefault();
				if(hook.hasClass('is-playing')) {
					$(this).text('재생');
				} else {
					$(this).text('일시정지');
				}
			}).find('.fp-playbtn').attr('href','#').text('재생');

			hook.on('click', '.fp-prev', function(e) {
				fnPlayPrev();
			});

			hook.on('click', '.fp-next', function(e) {
				fnPlayNext();
			});

			//set repeat
			hook.on('click', '.fp-repeat', function(e) {
				if($(this).hasClass('all')) {
					$(this).removeClass('all').addClass('one').text('1곡반복').attr('title','1곡반복');
				} else if($(this).hasClass('one')) {
					$(this).removeClass('one').text('반복해제').attr('title','반복해제');
				} else {
					$(this).addClass('all').text('전체반복').attr('title','전체반복');
				}

				fnRepeatClick();
			});
			if(that._option.repeat != null) {
				if(that._option.repeat == 'all') {
					hook.find('.fp-repeat').attr('class', 'fp-icon fp-repeat all').text('전체반복').attr('title','전체반복');
				} else if(that._option.repeat == 'one') {
					hook.find('.fp-repeat').attr('class', 'fp-icon fp-repeat one').text('1곡반복').attr('title','1곡반복');
				}
			}

			//set random
			hook.on('click', '.fp-random', function(e) {
				if($(this).hasClass('active')) {
					$(this).removeClass('active').text('순차재생').attr('title','순차');
				} else {
					$(this).addClass('active').text('교차재생').attr('title','교차');
				}

				fnRandomClick();
			});

			if(that._option.random != null) {
				hook.find('.fp-random').attr('class', 'fp-icon fp-random active').text('교차재생').attr('title','교차');
			}

			//set volume
			hook.find('.fp-volumebtn').attr('href','#');

			//set lyrics
			hook.on('click', '.fp-lyrics', function(e) {
				that._toggleLyrics(e);
			});

			$('.lyrics-main').on('click', function(e) {
				$('.fp-lyrics').trigger('click');
			});

			if(!(typeof ieVERSION != 'undefined' && ieVERSION < 8)) {
				$('.lyrics-all').mCustomScrollbar({
					theme:"dark-thin"
				});
			}

			$('.lyrics-mode').on('click', '.btn-viewer', function(e) {
				$('#img-viewer').addClass('active').attr('tabindex',0).focus();
			});

			//select-quality
			$('.select-quality').on('click', '.item', function(e) {
				$(this).closest('.toggle-button-box').find('.btn').text($(this).text()).trigger('click');
			});
		},
		_setLyrics:function(isExist) {
			var $lyrics = this._hook.find('.fp-lyrics');
			if(isExist) $lyrics.removeClass('disabled');
			else $lyrics.addClass('disabled');
		},
		_toggleLyrics:function(e) {
			if($('.fp-lyrics').hasClass('disabled')) {
				e.preventDefault();
			} else if($('.fp-lyrics').hasClass('active')) {
				$('.fp-lyrics').add('.lyrics-mode').removeClass('active');
				$('.lyrics-all').hide();
				$('.lyrics-main').fadeIn(200).attr('tabindex',0).focus();
			} else {
				$('.fp-lyrics').add('.lyrics-mode').addClass('active');
				$('.lyrics-main').hide();
				$('.lyrics-all').fadeIn(200).attr('tabindex',0).focus();
			}
		}
	};

	window.MUSIC_PLAYER = MUSIC_PLAYER;
})();

(function() {
	var MV_PLAYER = function() {
		this._option = {
			repeat: null,
			random: null
		}
	};

	MV_PLAYER.prototype = {
		_load:function(hook) {
			var that = this;

			//set btns
			$('.toggle-button-box.more').detach().insertAfter('.fp-title');
			$('.fp-controls .fp-playbtn').detach().insertBefore('.fp-controls');
			$('<button type="button" class="fp-icon fp-prev">이전 곡 듣기</button>').insertAfter('.fp-pause');
			$('<button type="button" class="fp-icon fp-next">다음 곡 듣기</button>').insertBefore('.fp-controls');
			$('<button type="button" class="fp-icon fp-repeat" title="반복해제">반복해제</button>').insertBefore('.fp-volume');
			$('<button type="button" class="fp-icon fp-random" title="순차">순차재생</button>').insertBefore('.fp-volume');
			$('<span class="btn-radius blt-pps" title="음악감상 차감 이용" style="display:none;">PPS차감</span>').appendTo('.fp-controls');
			$('.select-quality').detach().appendTo('.fp-controls');
			hook.find('.fp-fullscreen').clone().attr('href','#').text('전체화면 전환').attr('title','전체화면').appendTo('.fp-controls');

			//set play / pause
			hook.on('click', '.fp-play .playbtn', function(e) {
				e.preventDefault();
				if(hook.hasClass('is-playing')) {
					$(this).text('재생');
				} else {
					$(this).text('일시정지');
				}
			}).find('.fp-playbtn').attr('href','#').text('재생');

			hook.on('click', '.fp-prev', function(e) {
				fnPlayPrev();
			});

			hook.on('click', '.fp-next', function(e) {
				fnPlayNext();
			});

			//set repeat
			hook.on('click', '.fp-repeat', function(e) {
				if($(this).hasClass('all')) {
					$(this).removeClass('all').addClass('one').text('1곡반복').attr('title','1곡반복');
				} else if($(this).hasClass('one')) {
					$(this).removeClass('one').text('반복해제').attr('title','반복해제');
				} else {
					$(this).addClass('all').text('전체반복').attr('title','전체반복');
				}

				fnRepeatClick();
			});

			if(that._option.repeat != null) {
				if(that._option.repeat == 'all') {
					hook.find('.fp-repeat').attr('class', 'fp-icon fp-repeat all').text('전체반복').attr('title','전체반복');
				} else if(that._option.repeat == 'one') {
					hook.find('.fp-repeat').attr('class', 'fp-icon fp-repeat one').text('1곡반복').attr('title','1곡반복');
				}
			}

			//set random
			hook.on('click', '.fp-random', function(e) {
				if($(this).hasClass('active')) {
					$(this).removeClass('active').text('순차재생').attr('title','순차');
				} else {
					$(this).addClass('active').text('교차재생').attr('title','교차');
				}

				fnRandomClick();
			});
			if(that._option.random != null) {
				hook.find('.fp-random').attr('class', 'fp-icon fp-random active').text('교차재생').attr('title','교차');
			}

			//set volume
			hook.find('.fp-volumebtn').attr('href','#');

			//select-quality
			$('.select-quality').on('click', '.item', function(e) {
				var quality = $(this);
				quality.closest('.toggle-button-box').find('.btn').text($(this).text()).trigger('click');
				if(quality.hasClass('red')) quality.closest('.select-quality').addClass('red');
				else quality.closest('.select-quality').removeClass('red');
			});
		}
	};

	window.MV_PLAYER = MV_PLAYER;
})();

/*
 * mobile
 */
if($(document.documentElement).hasClass('touch')) {
	var anchorCheck = function(t) {
		var currentNode = t;
		while(currentNode != undefined) {
			if(currentNode.nodeName.toLowerCase() == 'a')
				return currentNode;
			else
				currentNode = currentNode.parentNode;
		}
		return currentNode;
	};

	Object.extend(MUSIC_LIST.prototype, {
		touchMove:false,
		_selectCheck:function() {
			var that = this;
			that.selectLength = that.hook.find('.list-wrap .list input[type=checkbox]:checked').length;

			$('#content .foot .list-info .select em').html(that.selectLength);
		},
		_listStart:function(e) {
			var that = this,
				t = e.target,
				e = e.originalEvent;

			var startPoint = hasTouchEvent ? e.touches[0] : e;
			that.startX = startPoint.pageX;
			that.startY = startPoint.pageY;

			that.isScrolling = undefined;

			that.list.bind(MOVE_EV, $.proxy(that._listMove, that));
			that.list.bind(END_EV, $.proxy(that._listEnd, that));
		},
		_listMove:function(e) {
			var that = this;

			e = e.originalEvent;

			var point = hasTouchEvent ? e.touches[0] : e,
				deltaX = point.pageX - that.startX,
				deltaY = point.pageY - that.startY;

			if(typeof that.isScrolling == 'undefined')
				that.isScrolling = !!( that.isScrolling || Math.abs(deltaX) < Math.abs(point.pageY - that.startY) );

			if(!!that.isScrolling) that.touchMove = true;
		},
		_listEnd:function(e) {
			var that = this,
				t = e.target;

			that._endNum = that._getThisIndex(t);

			if(anchorCheck(t) === null && that.touchMove === false) {
				that._listToggleSelect(that.list.eq(that._endNum));
			}

			that.list.unbind(MOVE_EV, $.proxy(that._listMove, that));
			that.list.unbind(END_EV, $.proxy(that._listEnd, that));

			that.touchMove = false;
		},
		_docEvent:null
	});
}


var FG_alertArr = [];
function showAlert(data, is_continue) {
	if(typeof is_continue == 'undefined') is_continue = false;

	var alertLayer = $('#player .controller .alert'),
		alertStatus = true,
		delayTime = 3000;

	var setPosition = function(p) {
		alertLayer = $('#player .controller .alert');
		return (alertLayer.size() > 0) ?
			function() {
				alertLayer.each(function() {
					p += $(this).outerHeight() + 1;
				});
				return p;
			}
			: p;
	};

	if ($('#player').hasClass('mv-player') == false){
		var layerStyle = ($(document).width() >= 650) ?
			{ top:'auto', bottom:setPosition(140) } :
			{ top:setPosition(-71), bottom:'auto' };
	}else{
		var layerStyle ={ top:setPosition(178), bottom:'auto' };
	}

	var fadeOutDone = function(element) {
		var elementHeight = element.outerHeight() + 1;
		alertLayer = $('#player .controller .alert').not('.alert-continue');
		element.remove();
		FG_alertArr.shift();

		if(alertLayer.size() > 0) {
			if(element.css('top') == 'auto') {
				alertLayer.css({ bottom:'-=' + elementHeight });
			} else if(element.css('bottom') == 'auto') {
				alertLayer.css({ top:'-=' + elementHeight });
			}
		}
	};

	$.each(FG_alertArr, function(i) {
		if(String(this) == String(data)) {
			alertLayer.eq(i).fadeOut(function() {
				fadeOutDone($(this));
			});
			alertStatus = false;
			return false;
		} else {
			alertStatus = true;
		}
	});

	if(alertStatus === true) {
		var layer;

		if(!is_continue) {
			layer = $('<div />', {'class':'alert'})
				.appendTo('#player .controller')
				.html(data)
				.css(layerStyle)
				.fadeIn()
				.delay(delayTime)
				.fadeOut('normal', function() {
					fadeOutDone($(this));
				});
		} else {
			layer = $('<div />', {'class':'alert alert-continue'})
				.appendTo('#player .controller')
				.html(data)
				.css(layerStyle)
				.fadeIn();
		}

		FG_alertArr.push(data);
	}
}


function toggleSetting(element) {
	layer = $('.layer-setting');

	if(layer.is(':hidden')) {
		layer.show();
		$(element).addClass('active');
		layer.find('.close').bind('click', function() {
			layer.hide();
			$(element).removeClass('active');
		});
	} else {
		layer.hide();
		$(element).removeClass('active');
	}
}

function resizeWindow(standard, w, h) {
	var window_w = $(window).width();
	if(window_w > standard) {
		try { window.resizeTo(w, h); }
		catch(e) {}
	}
}

var toastIDs = [];
function toastPopup(id, msg, isFadeOut) {
	if(typeof isFadeOut == 'undefined') isFadeOut = true;
	var bottom = 0;

	if($.inArray(id, toastIDs) > -1) return false;

	if($('.toast-popup').size() > 0) bottom = $(window).height() - $('.toast-popup:last').offset().top;

	var toast = $('<div id="' + id + '" class="toast-popup" style="bottom:'+bottom+'px"><p>'+msg+'</p><button type="button" class="close">닫기</button></div>');

	toast.hide().appendTo('body').on('click', '.close', function(e) {
		toastClose($(this));
	});

	if(isFadeOut) {
		toast.fadeIn(500).delay(3000).fadeOut(400, function(){
			var obj = $(this), objId = obj.attr('id');
			toastIDs.splice($.inArray(objId, toastIDs), 1);
			obj.remove();
		});
	} else {
		toast.on('click', 'a', function(e) {
			toastClose($(this));
		}).fadeIn(500);
	}

	toastIDs.push(id);
}

function toastMVPopup(id, msg, isFadeOut) {
	if(typeof isFadeOut == 'undefined') isFadeOut = true;
	var top = 0;

	if($.inArray(id, toastIDs) > -1) return false;

	if($('.toast-popup').size() > 0) top = $('.toast-popup:last').offset().top + $('.toast-popup:last').outerHeight() - 50;

	var toast = $('<div id="' + id + '" class="toast-popup" style="top:'+top+'px"><p>'+msg+'</p><button type="button" class="close">닫기</button></div>');

	toast.hide().appendTo('.fp-ui').on('click', '.close', function(e) {
		toastClose($(this));
	})

	if(isFadeOut) {
		toast.fadeIn(500).delay(3000).fadeOut(400, function(){
			var obj = $(this), objId = obj.attr('id');
			toastIDs.splice($.inArray(objId, toastIDs), 1);
			obj.remove();
		});
	} else {
		toast.on('click', 'a', function(e) {
			toastClose($(this));
		}).fadeIn(500);
	}

	toastIDs.push(id);
}

function toastClose(obj) {
	var objId = obj.attr('id');
	toastIDs.splice($.inArray(objId, toastIDs), 1);
	obj.closest('.toast-popup').stop().remove();
}

function resetToastPopup() {
	if($('.toast-popup').size() > 0) $('.toast-popup').stop().remove();
}

var imgViewerSlider;

function setImageViewer(json) {
	$('.btn-viewer').show();

	var html = new Array();

	for(var i=0;i<json.length;i++) {
		html.push('<li><img src="//image.genie.co.kr'+json[i].IMG_PATH+'" onerror="this.src=\'//image.genie.co.kr/imageg/web/common/blank.png\';" alt="" /></li>');
	}

	if(imgViewerSlider != null) imgViewerSlider.destroySlider();

	var pager = true;
	if(navigator.userAgent.indexOf("MSIE 8") > 0) {
		pager = false;
	}

	imgViewerSlider = $('#img-viewer .bxslider').html(html.join('')).bxSlider({
		mode: 'fade',
		pager: pager,
		pagerType: 'short',
		pagerShortSeparator: ' / ',
		infiniteLoop: false,
		hideControlOnEnd: true,
		prevSelector: '.img-viewer .btn-prev',
		nextSelector: '.img-viewer .btn-next',
		speed: 400
	});

	$('#img-viewer').off('click').on('click', '.close', function(e) {
		$('#img-viewer').removeClass('active');
		$('.btn-viewer').focus();
	});
}

function loadingPlayer(hook) {
	FG_loading.loadingAppendTo = hook;
	Object.extend(FG_loading.loadingBoxStyle, {
		height: 'auto',
		bottom: 0
	});

	Object.extend(FG_loading.loadingImageStyle, {
		position:'absolute'
	});

	FG_loading._start();

	setTimeout(function() {
		FG_loading._end();
	}, 5000);
}

function loadingPage() {
	var FG_popupLoad = new LOADING();

	FG_popupLoad.loadingImageIntervalTime = 200;
	FG_popupLoad.loadingImageCount = 6;
	Object.extend(FG_popupLoad.loadingImageValue, {
		width:175,
		height:58
	});

	Object.extend(FG_popupLoad.loadingBoxStyle, {
		opacity:0.85
	});
	Object.extend(FG_popupLoad.loadingImageStyle, {
		width:FG_popupLoad.loadingImageValue.width,
		height:FG_popupLoad.loadingImageValue.height,
		margin:'-'+ (FG_popupLoad.loadingImageValue.height / 2) +'px 0 0 -'+ (FG_popupLoad.loadingImageValue.width / 2) +'px',
		backgroundImage:'url("//image.genie.co.kr/imageg/web/common/loading_pop_r1.png")'
	});

	FG_popupLoad._start();

	setTimeout(function() {
		FG_popupLoad._end();
	}, 5000);
}
