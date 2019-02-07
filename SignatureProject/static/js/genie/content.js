define([
	'jquery',
	'core',
	'global',
	'loaders',
	'jqueryui',
	'analytics'
], function($, core, global) {

	'use strict';

	var NAMESPACE = 'contentbox';

	// Events
	var EVENT_CLICK = 'click.' + NAMESPACE;
	var EVENT_MOUSEUP = 'mouseup.' + NAMESPACE;
	var EVENT_MOUSEMOVE = 'mousemove.' + NAMESPACE;
	var EVENT_MOUSEDOWN = 'mousedown.' + NAMESPACE;
	var EVENT_CHANGE = 'change.' + NAMESPACE;
	var EVENT_KEYUP = 'keyup.' + NAMESPACE;
	var EVENT_DBLCLICK = 'dblclick.' + NAMESPACE;

	// keys
	var ESC_KEYCODE = 27;

	// classes
	var ARROW_DOWN_CLASS = "papago-bubble-arrowdown";
	var ARROW_UP_CLASS = "papago-bubble-arrowup";

	// regex
	var VALID_CHECK_REGEX = /^[0-9\s\$\^\&\]\[\/\\!@#<>%*)('"{};:?|+=.,_-]+$/;
	var VALID_ENG_WORD_REGEX = /^[a-zA-Z]+$/;

	function Contentbox(options) {
		this.options = $.extend({}, Contentbox.DEFAULTS, options);
		this.isBuilt = false; 	// tooltip의 body에 append 여부
		this.isShown = false; 	// tooltip show 여부 (pin 기능에 사용)
		this.isPinned = false; 	// pin 버튼 활성화 여부
		this.selectedText = '';

		this.init();
	}

	Contentbox.prototype = {
		constructor : Contentbox,

		init : function() {
			// 옵션 불러오기
			$.when(
				core.getPopupOption(),
				core.getDragOption(),
				core.getTransOption()
			).done(function(popupOption, dragOption, transOption) {
				this.popupOption = popupOption;
				this.dragOption = dragOption;
				this.transOption = transOption;

				this.build();
			}.bind(this));
		},

		build : function() {
			// 자주 사용되는 el 캐싱
			this.$button = $(this.options.template.button);
			var $tooltip = this.$tooltip = $(this.options.template.tooltip);
			this.$arrow = $tooltip.find('.papago-bubble-arrow-id:first');
			this.$sourceLang = $tooltip.find('#lang-source');
			this.$targetLang = $tooltip.find('#lang-target');
			this.$langAutoText = $tooltip.find('#papago-lang-auto');
			this.$saveButton = $tooltip.find('#save-button span');

			// 최근 사용 언어값 불러오기
			core.getLanguage().done($.proxy(this.setLanguage, this));

			this.bind();
		},

		bind : function() {
			var $button = this.$button,
				$tooltip = this.$tooltip,
				$body = $(document.body);

			// body 이벤트 등록
			$body
				.on(EVENT_MOUSEDOWN, $.proxy(this.dragStartHandler, this))
				.on(EVENT_MOUSEMOVE, $.proxy(this.dragMoveHandler, this))
				.on(EVENT_MOUSEUP, $.proxy(this.dragEndHandler, this))
				.on(EVENT_KEYUP, $.proxy(this.keyHandler, this));

			// 한국만 더블클릭 사전기능 지원
			if (window.navigator.language === 'ko') {
				$body.on(EVENT_DBLCLICK, $.proxy(this.dblclickHandler, this));
			}

			// 버튼 이벤트 등록
			$body
				.on(EVENT_MOUSEDOWN, '#papago-trans', function(e) {
					e.preventDefault();
					e.stopPropagation();
				})
				.on(EVENT_MOUSEUP, '#papago-trans', $.proxy(this.translate, this));

			// 툴팁 이벤트 등록
			$body
				.on(EVENT_MOUSEDOWN, '.papago-bubble', function(e) {
					e.stopPropagation();
				})
				.on(EVENT_MOUSEUP, '.papago-bubble', function(e) {
					if (!$(e.target).hasClass('papago-draggable')) {
						e.stopPropagation();
					}
				})
				.on(EVENT_CLICK, '.papago-bubble .papago-bubble-closebtn:first', $.proxy(this.hideTooltip, this))
				.on(EVENT_CLICK, '.papago-bubble #copy-button', $.proxy(this.copyResult, this))
				.on(EVENT_CLICK, '.papago-bubble #save-button', $.proxy(this.saveResult, this))
				.on(EVENT_CLICK, '.papago-bubble #swap-button', $.proxy(this.swapInput, this))
				.on(EVENT_CLICK, '.papago-bubble .listen-button', $.proxy(this.listen, this))
				.on(EVENT_CHANGE, '.papago-bubble .papago-lang-selector', $.proxy(this.changeLanguage, this))
				.on(EVENT_CLICK, '.papago-bubble .papago-gearbtn', $.proxy(this.openOptions, this))
				.on(EVENT_CLICK, '.papago-bubble #donateLink', $.proxy(this.openDonate, this));

			if (this.options.isDraggable) {
				$body.on(EVENT_CLICK, '.papago-bubble .papago-pinbtn', $.proxy(this.togglePinned, this));
			}
		},

		/////////////////////////////////////////////////////////////////////////////
		// Event listeners:

		dragStartHandler : function(e) {
			this.hideButton();

			if (!this.isPinned) {
				this.hideTooltip();
			}

			this.isDragStart = this.checkActive(e);
			this.isDragging = false;
		},

		dragMoveHandler : function() {
			this.isDragging = this.isDragStart;
		},

		dragEndHandler : function(e) {
			if (e && (e.shiftKey || (this.isDragStart && this.isDragging) || (e.originalEvent && e.originalEvent.detail && e.originalEvent.detail >= 3))
					&& !$(e.target).hasClass('papago-draggable') && this.checkActive(e) ) {
				var text = $.trim(window.getSelection().toString());

				if (text && text.length <= this.options.maxSize && !VALID_CHECK_REGEX.test(text)) {
					this.selectedText = text;
					(this.transOption === global.TransOption.ICON_BTN) ? this.showButton(e) : this.translate(e);
				}
			}

			this.isDragStart = this.isDragging = false;
		},

		dblclickHandler : function(e) {
			if (!$(e.target).hasClass('papago-txt') && this.checkActive(e)) {
				var text = $.trim(window.getSelection().toString());

				if (text && text.length <= this.options.maxSize && !VALID_CHECK_REGEX.test(text)) {
					this.selectedText = text;
					(this.transOption === global.TransOption.ICON_BTN) ? this.showButton(e) : this.translate(e);
				}
			}
		},

		keyHandler : function(e) {
			if (e.keyCode === ESC_KEYCODE) {
				if (this.isShown) {
					this.hideTooltip();
				}
			}
		},

		/////////////////////////////////////////////////////////////////////////////
		// Private methods:

		appendTooltip : function() {
			if (this.isBuilt) {
				return;
			}

			this.isBuilt = true;
			var $tooltip = this.$tooltip;
			var $message = $tooltip.find('#ad-msg');

			if (parseInt(Math.floor(Math.random() * 10) % 2)) {
				$message.html(chrome.i18n.getMessage('reviewFull') + ' <a style="color: #0099ec !important;" href="https://chrome.google.com/webstore/detail/papago-translate/enddgifdbfoefnelepppgaabobdfbcpe/reviews" target="_blank">' + chrome.i18n.getMessage('cheer') + '</a>');
			} else {
				$message.html(chrome.i18n.getMessage('coffeeFull') + ' <a style="color: #f96853 !important;" href="https://www.paypal.me/kkd927/5" target="_blank">' + chrome.i18n.getMessage('gift') + '</a>');
			}

			$(document.body).append($tooltip);

			if (this.options.isDraggable) {
				$tooltip.find('.papago-dragbtn').show();
				$tooltip.find('.papago-pinbtn').show();
				$tooltip.draggable({
					handle : '.papago-draggable'
				});
			}
		},

		checkActive : function(e) {
			if (this.popupOption === global.PopupOption.NOT_USE) {
				return false;
			}

			if (this.dragOption === global.DragOption.CTRL_DRAG) {
				if (global.isMacOS && !e.metaKey) {
					return false;
				}

				if (!global.isMacOS && !e.ctrlKey) {
					return false;
				}
			}

			if (this.dragOption === global.DragOption.ALT_DRAG && !e.altKey) {
				return false;
			}

			return true;
		},

		showButton : function(e, options) {
			setTimeout($.proxy(function() {
				//	f.style.left = a.clientX + document.body.scrollLeft - 13 + "px";
				//	a = a.clientY;
				//	a - b.top > b.height / 2 ? a = b.bottom + 1 : a = b.top - 1 - 27;
				//	f.style.top = a + document.body.scrollTop + "px";

				// var left = selection.getRangeAt(0).getBoundingClientRect().left - 20;
				// var top = $(selection.anchorNode.parentNode).offset().top - 30;

				var top, left;
				var $window = $(window);
				var selection = window.getSelection();
				var $button = this.$button;

				if (selection.focusNode instanceof Text) {
					var parent = selection.getRangeAt(0).getBoundingClientRect();
					var temp = e.clientY;

					temp = temp - parent.top > parent.height / 2 ? parent.bottom + 1 : parent.top - 1 - 27;
					top = temp + $window.scrollTop();

					temp = (parent.right + parent.left) / 2 > e.clientX ? -17 : 43;
					left = e.clientX + $window.scrollLeft() - temp;
				} else {
					top = e.clientY + $window.scrollTop() + 13;
					left = e.clientX + $window.scrollLeft() - 13;
				}

				if ( !$.isEmptyObject(options) ) {
					$button.data('options', options);
				}

				$(document.body).append($button);

				$button
					.css({
						top : top,
						left : left
					})
					.show();
			}, this), 0);
		},

		showTooltip : function() {
			if (!this.isBuilt) {
				this.appendTooltip();
			}

			var $tooltip = this.$tooltip;

			this.$langAutoText.text('');
			$tooltip.find('#papago-txt1').text(this.selectedText);
			$tooltip.find('#papago-txt2').addClass('ball-beat').loaders();

			if (!this.isShown) {
				this.hideButton();

				$tooltip.css({
					'visibility' : 'hidden',
					'display' : ''
				});

				if (!this.isPinned) {
					// var left = selection.getRangeAt(0).getBoundingClientRect().left + 20;
					// var top = $(selection.anchorNode.parentNode).offset().top - 30;

					var $window = $(window);
					var selection = window.getSelection();
					var focusNode = selection.anchorOffset > selection.focusOffset ? selection.anchorNode : selection.focusNode;
					var parent = (focusNode instanceof Text ? selection.getRangeAt(0) : focusNode).getBoundingClientRect();
					var left = (parent.right + parent.left) / 2 + $window.scrollLeft() - 160;
					var top = $window.scrollTop();

					this.$arrow.removeClass(ARROW_UP_CLASS).removeClass(ARROW_DOWN_CLASS);

					if ((parent.top + parent.bottom) > $window.height()) {
						var height = $tooltip.height();
						$tooltip.data('height', height);
						top += parent.top - height - 46;
						this.$arrow.addClass(ARROW_DOWN_CLASS);
					} else {
						top += parent.bottom + 10;
						this.$arrow.addClass(ARROW_UP_CLASS);
					}

					$tooltip.css({
						position: 'absolute',
						top : top > 0 ? top : 5,
						left : left > 0 ? left : 5
					});
				}

				$tooltip.css('visibility', '').show();
				wcs.event('view', 'content');
			}

			this.isShown = true;
		},

		hideButton : function() {
			this.$button.hide();
			this.$button.data('options', null);
			this.$button.remove();
		},

		hideTooltip : function() {
			this.isShown = false;
			this.selectedText = null;
			// this.$tooltip.hide();
			this.$saveButton.css('background-position', '-484px 1px');
			this.$tooltip.remove();
			this.isBuilt = false;
		},

		setLanguage : function(data) {
			this.$sourceLang.val(data.source);
			this.$targetLang.val(data.target);
		},

		translate : function(e, options) {
			e && e.stopPropagation();

			if (global.$ajax || !this.selectedText) {
				return;
			}

			// 사전을 위한 옵션 기능
			options = $.extend({}, options);

			var btnData = this.$button.data('options');

			if ( !$.isEmptyObject(btnData) ) {
				options = $.extend(options, btnData);
			}

			// show tooltip
			$.proxy(this.showTooltip(), this);

			setTimeout(function() {
				// 언어값 가져오기
				var source = options.sourceLang ? options.sourceLang : this.$sourceLang.val(),
					target = options.targetLang ? options.targetLang : this.$targetLang.val();

				if (source === 'auto') {
					source = core.languageAutoDetect(this.selectedText);
					this.$langAutoText.text(chrome.i18n.getMessage(source.replace('-', '_')));
				} else {
					this.$langAutoText.text('');
				}

				this.$sourceLang.data('lang', source);
				this.$targetLang.data('lang', target);

				this.$tooltip.find('.papago-audio-player source').attr('src', '');

				var $inputListen = this.$tooltip.find('#input-listen span');
				var $resultListen = this.$tooltip.find('#result-listen span');

				core.canSpeach(source) ? $inputListen.show() : $inputListen.hide();
				core.canSpeach(target) ? $resultListen.show() : $resultListen.hide();

				core.translate({
					'source' : source,
					'target' : target,
					'text' : this.selectedText
				})
					.done($.proxy(this.setResult, this))
					.fail($.proxy(this.failHandler, this));
			}.bind(this), 0);
		},

		setResult : function(data) {
			var $tooltip = this.$tooltip;
			var $result = $tooltip.find('#papago-txt2');

			$result.removeClass('ball-beat');
			if (data.isDic) {
				$result.html(data['translatedText']);
				$tooltip.data('dic', $tooltip.find('#papago-txt1').text());
			} else {
				$result.text(data['translatedText']);
				$tooltip.data('dic', '');
			}

			if (this.$arrow.hasClass(ARROW_DOWN_CLASS) && window.getSelection().toString()) {
				$tooltip.css('top', parseInt($tooltip.css('top')) - ($tooltip.height() - $tooltip.data('height')));
			}
		},

		failHandler : function() {
			var $result = this.$tooltip.find('#papago-txt2');
			$result.text(chrome.i18n.getMessage('tempError')).removeClass('ball-beat');

			this.$tooltip.find('#input-listen span').hide();
			this.$tooltip.find('#result-listen span').hide();
		},

		changeLanguage : function(e) {
			this.$tooltip.find('#papago-txt2').loaders();

			var $sourceLang = this.$sourceLang;
			var $targetLang = this.$targetLang;
			var $el = $(e.target);
			var $ne = $el.attr('id') === 'lang-source' ? $targetLang : $sourceLang;

			$el.find('option').show();
			$ne.find('option').show();
			$ne.find('option[value='+ $el.val() +']').hide();

			this.translate(e);

			core.setLanguage({
				'source' : $sourceLang.val(),
				'target' : $targetLang.val()
			});
		},

		togglePinned : function() {
			var isPinned = this.isPinned = !this.isPinned;
			var $tooltip = this.$tooltip;
			var position = $tooltip.position();

			if (isPinned) {
				$tooltip.css({
					position: 'fixed',
					top: position.top - $(window).scrollTop(),
					left: position.left - $(window).scrollLeft()
				});

				this.$arrow.hide();
			} else {
				$tooltip.css({
					position: 'absolute',
					top: position.top + $(window).scrollTop(),
					left: position.left + $(window).scrollLeft()
				});

				this.$arrow.show();
			}

			$tooltip.find('.papago-pinbtn:first').toggleClass('pinned', isPinned);
			wcs.event('content', 'pin');
		},

		copyResult : function() {
			core.copyToCilpboard(this.$tooltip.find('#papago-txt2').text());
			alert(chrome.i18n.getMessage('copySuccess'));
			wcs.event('content', 'copy');
		},

		saveResult : function() {
			var $tooltip = this.$tooltip;
			var $span = this.$saveButton;

			if ($span.data('added')) {
				$span.data('added', false);
				$span.css('background-position', '-484px 1px');

				core.deleteFavorite();
			} else {
				$span.data('added', true);
				$span.css('background-position', '-505px 1px');

				core.saveFavorite({
					sourceLang: chrome.i18n.getMessage(this.$sourceLang.data('lang').replace('-', '_')),
					sourceText: $tooltip.find('#papago-txt1').text(),
					targetLang: chrome.i18n.getMessage(this.$targetLang.data('lang').replace('-', '_')),
					targetText: $tooltip.find('#papago-txt2').text(),
					date: (new Date()).toLocaleDateString()
				});
			}

			wcs.event('content', 'save');
		},

		swapInput : function() {
			this.selectedText = this.$tooltip.find('#papago-txt2').text();

			var sourceLang = this.$sourceLang.data('lang');
			this.$targetLang.val(sourceLang);
			this.$targetLang.data('lang', sourceLang);

			this.translate();

			wcs.event('content', 'swap');
		},

		listen : function(e) {
			var $target = $(e.target);
			var $container = $target.closest('.box-container');
			var $audio = $container.find('.papago-audio-player:first');
			var $source = $audio.find('source');
			var dicData = this.$tooltip.data('dic');
			var text = dicData ? dicData : $container.find('.papago-txt:first').text();

			if (!$.trim(text)) {
				return false;
			}

			var lang = dicData ? 'en' : $container.find('.papago-lang-selector:first').data('lang');

			core.speak(text, lang);

			// if ($source.attr('src')) {
			// 	$audio[0].play();
			// } else {
			// 	var lang = dicData ? 'en' : $container.find('.papago-lang-selector:first').data('lang');
			// 	core.getSpeechId(text, lang)
			// 		.done(function(result) {
			// 			$audio.find('source').attr('src', 'https://api.papago-chrome.com/v2/speech/file?language=' + lang + '&text=' + text + '&vcode=' + result.vcode);
			// 			$audio[0].pause();
			// 			$audio[0].load();
			// 			$audio[0].play();
			// 		});
			// }

			wcs.event('content', 'listen');
		},

		openOptions : function() {
			core.openOptions();
			wcs.event('content', 'option');
		},

		openDonate : function() {
			window.open('http://papago-chrome.com/donate.html', '_blank');
			wcs.event('content', 'donate');
		}
	};

	Contentbox.DEFAULTS = {
		template : {
			button : 	'<div id="papago-trans" style="display: none; position: absolute !important; left: 297px; top: 626px;">' +
							'<div class="papago-trans-icon" style="background-image:url(' + chrome.extension.getURL('icons/papago19.png') + ')"></div>' +
						'</div>',

			tooltip : 	'<div class="papago-bubble" style="display: none; left: 282px; top: 887px; opacity: 1;">' +
							'<div class="papago-draggable papago-dragbar"></div>' +
							'<div class="box-container">' +
								'<select id="lang-source" class="papago-lang-selector" name="source">' +
									'<option value="auto" selected="">' + chrome.i18n.getMessage('autoDetect') + '</option>' +
									'<option value="en">' + chrome.i18n.getMessage('en') + '</option>' +
									'<option value="ja">' + chrome.i18n.getMessage('ja') + '</option>' +
									'<option value="zh-CN">' + chrome.i18n.getMessage('zh_CN') + '</option>' +
									'<option value="zh-TW">' + chrome.i18n.getMessage('zh_TW') + '</option>' +
									'<option value="ko">' + chrome.i18n.getMessage('ko') + '</option>' +
									'<option class="es" value="es">' + chrome.i18n.getMessage('es') + '</option>' +
									//'<option class="fr" value="fr">' + chrome.i18n.getMessage('fr') + '</option>' +
									'<option class="th" value="th">' + chrome.i18n.getMessage('th') + '</option>' +
								'</select>' +
								'<div id="input-listen" class="papago-toolbar-button listen-button" title="listen"><span class="papago-button-img" style="background:url(' + chrome.extension.getURL('icons/buttons11.png') + ') -84px 0px no-repeat;"></span></div>' +
								'<div style="display: inline-block !important; vertical-align: middle !important; margin: 0px 10px !important;"><p id="papago-lang-auto" style="margin: 0px !important; padding: 0px !important;"></p></div>' +
								'<div id="papago-txt1" class="papago-txt"></div>' +
								'<audio controls class="papago-audio-player">' +
									'<source src="" type="audio/mpeg">' +
								'</audio>' +
							'</div>' +
							'<div class="box-container">' +
								'<select id="lang-target" class="papago-lang-selector" name="target">' +
									'<option value="en">' + chrome.i18n.getMessage('en') + '</option>' +
									'<option value="ja">' + chrome.i18n.getMessage('ja') + '</option>' +
									'<option value="zh-CN">' + chrome.i18n.getMessage('zh_CN') + '</option>' +
									'<option value="zh-TW">' + chrome.i18n.getMessage('zh_TW') + '</option>' +
									'<option value="ko">' + chrome.i18n.getMessage('ko') + '</option>' +
									'<option class="es" value="es">' + chrome.i18n.getMessage('es') + '</option>' +
									'<option class="fr" value="fr">' + chrome.i18n.getMessage('fr') + '</option>' +
									'<option class="th" value="th">' + chrome.i18n.getMessage('th') + '</option>' +
								'</select>' +
								'<div id="copy-button" class="papago-toolbar-button" title="copy"><span class="papago-button-img" style="background:url(' + chrome.extension.getURL('icons/content_copy_black_18dp.png') + ') 2px 2px no-repeat"></span></div>' +
								'<div id="save-button" class="papago-toolbar-button" title="save"><span class="papago-button-img" style="background:url(' + chrome.extension.getURL('icons/buttons11.png') + ') -484px 1px no-repeat;"></span></div>' +
								'<div id="swap-button" class="papago-toolbar-button" title="swap"><span class="papago-button-img" style="background:url(' + chrome.extension.getURL('icons/buttons11.png') + ') 0px 1px no-repeat;"></span></div>' +
								'<div id="result-listen" class="papago-toolbar-button listen-button" title="listen"><span class="papago-button-img" style="background:url(' + chrome.extension.getURL('icons/buttons11.png') + ') -84px 0px no-repeat;"></span></div>' +
								'<audio controls class="papago-audio-player">' +
									'<source src="" type="audio/mpeg">' +
								'</audio>' +
								'<div id="papago-txt2" class="papago-txt"></div>' +
							'</div>' +
							'<div class="papago-bubble-closebtn" style="background:url(' + chrome.extension.getURL('icons/x_8px.png') + ') no-repeat;" role="button" tabindex="0"></div>' +
							'<span class="papago-dragbtn papago-draggable ui-icon ui-icon-grip-dotted-vertical" style="display: none; background-image:url(' + chrome.extension.getURL('icons/ui-icons.png') + ')"></span>' +
							'<span class="papago-gearbtn ui-icon ui-icon-gear" style="background-image:url(' + chrome.extension.getURL('icons/ui-icons.png') + ')"></span>' +
							'<span class="papago-pinbtn ui-icon ui-icon-pin-s" style="display: none; background-image:url(' + chrome.extension.getURL('icons/ui-icons.png') + ')"></span>' +
							'<div class="papago-bubble-arrow-id papago-bubble-arrow papago-bubble-arrowdown" style="left: 200px;">' +
								'<div class="papago-bubble-arrowimplbefore"></div><div class="papago-bubble-arrowimplafter"></div>' +
							'</div>' +
							'<hr>' +
							'<div class="papago-ad">' +
								'<center style="height: 25px !important; min-width: 300px !important;">' +
									/*'<p style="padding: 0px !important;">' + chrome.i18n.getMessage('donate') + '</p>' +
									'<a id="donateLink">' +
										'<img src="' + chrome.extension.getURL('icons/btn_donateCC_LG.gif') + '" border="0">' +
									'</a>' +*/
									'<p id="ad-msg" style="padding: 0px !important;">' + chrome.i18n.getMessage('coffeeFull') + ' <a style="color: #0099ec !important;" href="https://www.paypal.me/kkd927/5" target="_blank">' + chrome.i18n.getMessage('gift') + '</a></p>' +
								'</center>' +
							'</div>' +
						'</div>'
		},

		maxSize : 1000,

		isDraggable : true
	};

	return Contentbox;
});
