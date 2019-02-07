define([
	'jquery',
	'global',
	'franc'
], function ($, global, franc) {
	var API_URL = 'https://api.papago-chrome.com/v2/translate/openapi';
	var IP_KEY = 'PA-CLIENT-IP';
	var LANG_KEY = 'PA-LANGS';
	var POPUP_OPTION_KEY = 'PA-POPUP-OPTION';
	var DRAG_OPTION_KEY = 'PA-DRAG-OPTION';
	var TRANS_OPTION_KEY = 'PA-TRANS-OPTION';
	var FAVORITE_KEY = 'PA-FAVORITE';

	var _scope = {
		ip: null,
		whitelist: ['cmn', 'kor', 'eng', 'jpn', 'spa', 'fra', 'tha'],
		apiWhitelist: ['zh-CN', 'zh-TW', 'ko', 'en', 'ja', 'es', 'fr', 'th'],
		lang: {
			'cmn' : 'zh-CN',
			'kor' : 'ko',
			'eng' : 'en',
			'jpn' : 'ja',
			'spa' : 'es',
			'fra' : 'fr',
			'tha' : 'th'
		}
	};

	var storage = {
		save : function(key, jsonData, expirationMin){
			var expirationMS = expirationMin * 60 * 1000;
			var record = {value: JSON.stringify(jsonData), timestamp: new Date().getTime() + expirationMS}
			localStorage.setItem(key, JSON.stringify(record));
			return jsonData;
		},
		load : function(key){
			var record = JSON.parse(localStorage.getItem(key));
			if (!record){return false;}
			return (new Date().getTime() < record.timestamp && JSON.parse(record.value));
		}
	};

	var core = (function () {

		var init = function() {
			chrome.storage.sync.get(IP_KEY, function(data) {
				if ($.isEmptyObject(data)) {
					$.getJSON('//api.ipify.org?format=json')
						.done(function(result) {
							var storage = {};
							storage[IP_KEY] = result['ip'];
							chrome.storage.sync.set(storage);
						})
				} else {
					_scope.ip = data[IP_KEY];
				}
			});
		};

		init();

		/**
		 * @param {String} key
		 * @param {Object} data
		 */
		var setData = function(key, data) {
			var storage = {};
			storage[key] = data;
			chrome.storage.sync.set(storage);
		};

		/**
		 * @param {String} key
		 * @param {*} defaultData
		 * @return {*}
		 */
		var getData = function(key, defaultData) {
			var $deferred = $.Deferred();

			chrome.storage.sync.get(key, function(data) {
				if ($.isEmptyObject(data)) {
					$deferred.resolve(defaultData);
				} else {
					$deferred.resolve(defaultData instanceof Object ? $.extend({}, defaultData, data[key]) : data[key]);
				}
			});

			return $deferred.promise();
		};

		var setLanguage = function(data) {
			setData(LANG_KEY, data);
		};

		var getLanguage = function() {
			return getData(LANG_KEY, {
				source: 'auto',
				target: 'ko'
			});
		};

		var setPopupOption = function(data) {
			setData(POPUP_OPTION_KEY, data);
		};

		var getPopupOption = function() {
			return getData(POPUP_OPTION_KEY, global.PopupOption.USE);
		};

		var setDragOption = function(data) {
			setData(DRAG_OPTION_KEY, data);
		};

		var getDragOption = function() {
			return getData(DRAG_OPTION_KEY, global.DragOption.DRAG);
		};

		var setTransOption = function(data) {
			setData(TRANS_OPTION_KEY, data);
		};

		var getTransOption = function() {
			return getData(TRANS_OPTION_KEY, global.TransOption.ICON_BTN);
		};

		/**
		 * @param {String} url
		 * @param {String} method (GET/POST/PUT/DELETE)
		 * @param {*} data
		 */
		var jsonAjax = function (url, method, data) {

			if (global.$ajax) {
				return;
			}

			var param = null,
				method = method.toUpperCase();

			if (method === 'GET') {
				param = $.param(data);
			} else {
				param = data instanceof Object ? JSON.stringify(data) : data;
			}

			return global.$ajax = $.ajax({
				url: url,
				type: method,
				contentType: "application/json; charset=UTF-8",
				headers: {
		            'X-ORIGIN-IP': _scope.ip
		        },
		        dataType: 'json',
		        data: param
			}).always(function() {
				global.$ajax = null;
			})
		};

		var syncJsonAjax = function (url, method, data) {
			var param = null,
				method = method.toUpperCase();

			if (method === 'GET') {
				param = $.param(data);
			} else {
				param = data instanceof Object ? JSON.stringify(data) : data;
			}

			return $.ajax({
				url: url,
				type: method,
				contentType: "application/json; charset=UTF-8",
				headers: {
					'X-ORIGIN-IP': _scope.ip
				},
				dataType: 'json',
				data: param,
				async: false
			});
		};

		var translateRequest = function(data) {
			data.text = $.trim(data.text);

			if (data.text.length > global.maxTransSize) {
				return $.Deferred().resolve({
					'translatedText' : chrome.i18n.getMessage('maxSize')
				}).promise();
			}

			if (data.source === data.target) {
				return $.Deferred().resolve({
					'translatedText' : data.text
				}).promise();
			}

			var cacheKey = JSON.stringify(data);
			var cacheData = storage.load(cacheKey);

			if (cacheData) {
				return $.Deferred().resolve(cacheData).promise();
			}

			var $deferred = $.Deferred();

			if (data.source === 'en' && data.target === 'ko' && data.text.split(' ').length === 1) {
				chrome.runtime.sendMessage({type: 'dic', text: data.text}, function(result) {
					if (result.status && result.data !== '검색 결과가 없습니다.') {
						var $result = $('<div class=\"papago-dic\">' + result.data.replace(/http:\/\/dicimg\.naver\.net.+.gif/g, '').replace(/성우 발음듣기/g, '').replace(/TTS 발음듣기/g, '') + '</div>');
						$result.find('dt.last').remove();
						$result.find('p.desc').remove();
						$result.find('img').remove();
						$result.find('a').contents().unwrap();
						$result.find('a').remove();

						$deferred.resolve({
							'translatedText' : $result,
							'isDic' : true
						});
					} else {
						jsonAjax(API_URL, 'POST', data)
							.done(function() { $deferred.resolve.apply(this, arguments); })
							.fail(function() { $deferred.reject.apply(this, arguments); });
					}
				});
			} else {
				/*
				var v3Request = {
					dict: true,
					dictDisplay: 5,
					source: data.source,
					target: data.target,
					text: data.text,
					deviceId: generateDeviceId()
				};

				jsonAjax('https://api.papago-chrome.com/v3/translate', 'POST', encodeData(v3Request))
					.done(function(data) {
						$deferred.resolve(data);
					})
					.fail(function() {
						jsonAjax(API_URL, 'POST', data)
							.done(function() { $deferred.resolve.apply(this, arguments); })
							.fail(function() { $deferred.reject.apply(this, arguments); });
					});
				*/
				jsonAjax(API_URL, 'POST', data)
					.done(function(result) {
						storage.save(cacheKey, result, 3);
						$deferred.resolve.apply(this, arguments);
					})
					.fail(function() { $deferred.reject.apply(this, arguments); });
			}

			return $deferred.promise();
		};

		var openOptions = function() {
			if (chrome.runtime.openOptionsPage) {
				// New way to open options pages, if supported (Chrome 42+).
				chrome.runtime.openOptionsPage();
			} else {
				// Reasonable fallback.
				window.open(chrome.runtime.getURL('/src/html/options.html'), '_blank');
			}
		};

		var copyToCilpboard = function(text) {
			var $temp = $('<input>');

			$("body").append($temp);
			$temp.val(text).select();
			document.execCommand("copy");
			$temp.remove();
		};

		var languageAutoDetect = function(text) {
			text = $.trim(text);

			if (!text) {
				return 'en';
			}

			var cacheKey = 'PAPAGO_LANG_DETECT_' + text;
			var cacheData = storage.load(cacheKey);

			if (cacheData) {
				return cacheData;
			}

			var result = null;

			syncJsonAjax('https://api.papago-chrome.com/v2/translate/detect', 'POST', text)
				.done(function(data) {
					result = $.inArray(data.langCode, _scope.apiWhitelist) > -1 ? data.langCode : 'en';
					storage.save(cacheKey, result, 3);
				})
				.fail(function() {
					var langList = franc.all(text, {minLength: 1, whitelist: _scope.whitelist});
					var topLang = langList[0][0];

					if (topLang === 'eng' || topLang === 'spa') {
						var enScore = 0;
						var esScore = 0;

						$.map(langList, function(lang) {
							if (lang[0] === 'eng') {
								enScore = lang[1];
							} else if (lang[0] === 'spa') {
								esScore = lang[1];
							}
						});

						result = enScore + 0.4 >= esScore ? 'en' : 'es';
					} else {
						result = $.inArray(topLang, _scope.whitelist) > -1 ? _scope.lang[topLang] : 'en';
					}
				});

			return result;
		};

		var francDetect = function(text) {
			var langList = franc.all(text, {minLength: 1, whitelist: _scope.whitelist});
			var topLang = langList[0][0];

			if (topLang === 'eng' || topLang === 'spa') {
				var enScore = 0;
				var esScore = 0;

				$.map(langList, function(lang) {
					if (lang[0] === 'eng') {
						enScore = lang[1];
					} else if (lang[0] === 'spa') {
						esScore = lang[1];
					}
				});

				return enScore + 0.4 >= esScore ? 'en' : 'es';
			} else {
				return $.inArray(topLang, _scope.whitelist) > -1 ? _scope.lang[topLang] : 'en';
			}
		};

		var saveFavorite = function(favorite) {
			chrome.storage.sync.get(FAVORITE_KEY, function(data) {
				if ($.isEmptyObject(data)) {
					var storage = {};
					storage[FAVORITE_KEY] = [favorite];
					chrome.storage.sync.set(storage);
				} else {
					var favorites = data[FAVORITE_KEY] || [];
					favorites.unshift(favorite);
					data[FAVORITE_KEY] = favorites;
					chrome.storage.sync.set(data);
				}
			});
		};

		var deleteFavorite = function() {
			chrome.storage.sync.get(FAVORITE_KEY, function(data) {
				data[FAVORITE_KEY].shift();
				chrome.storage.sync.set(data);
			});
		};

		var getSpeechId = function(text, lang) {
			/*
			var speaker = 'clara';

			switch (lang) {
				case 'en':
					speaker = 'clara';
					break;
				case 'ko':
					speaker = 'kyuri';
					break;
				case 'ja':
					speaker = 'yuri';
					break;
				case 'zh-CN':
					speaker = 'meimei';
			}

			var data = {
				alpha: 0,
				pitch: 0,
				speaker: speaker,
				speed: 0,
				text: $.trim(text)
			};

			return jsonAjax('https://api.papago-chrome.com/v3/speech', 'POST', encodeData(data))
			*/
			return jsonAjax('https://api.papago-chrome.com/v2/speech/code', 'POST', text);
		};

		var encodeData = function(e) {
			if (e instanceof Object) {
				e = JSON.stringify(e);
			}
			// encodeURIComponent(r(e));
			return r(e);
		};

		var o = function(e) {
			return e.replace(/([a-m])|([n-z])/gi, function(e, t, n) {
				return String.fromCharCode(t ? t.charCodeAt(0) + 13 : n ? n.charCodeAt(0) - 13 : 0) || e
			})
		};

		var r = function(e) {
			var t = b64EncodeUnicode(e);
			return o(t.slice(0, 16)) + t.slice(16)
		};

		var b64EncodeUnicode = function(str) {
			// first we use encodeURIComponent to get percent-encoded UTF-8,
			// then we convert the percent encodings into raw bytes which
			// can be fed into btoa.
			return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
				function toSolidBytes(match, p1) {
					return String.fromCharCode('0x' + p1);
				}));
		};

		var generateDeviceId = function() {
			var t = (new Date).getTime();
			return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
				var n = (t + 16 * Math.random()) % 16 | 0;
				return t = Math.floor(t / 16), ("x" === e ? n : 3 & n | 8).toString(16)
			})
		};

		var canSpeach = function(lang) {
			var whiteList = ['en', 'ja', 'ko', 'zh-CN', 'zh-TW'];

			return $.inArray(lang, whiteList) > -1
		};

		var speak = function(text, lang) {
			var table = {
				'en': 'en-US',
				'ja': 'ja-JP',
				'ko': 'ko-KR',
				'zh-CN': 'zh-CN',
				'zh-TW': 'zh-TW'
			};

			var ut = new SpeechSynthesisUtterance(text);
			ut.lang = table[lang];

			speechSynthesis.speak(ut);
		};

		return {
			translate: translateRequest,
			setLanguage: setLanguage,
			getLanguage: getLanguage,
			setPopupOption: setPopupOption,
			getPopupOption: getPopupOption,
			setDragOption: setDragOption,
			getDragOption: getDragOption,
			setTransOption: setTransOption,
			getTransOption: getTransOption,
			openOptions: openOptions,
			copyToCilpboard: copyToCilpboard,
			languageAutoDetect: languageAutoDetect,
			saveFavorite: saveFavorite,
			deleteFavorite: deleteFavorite,
			getSpeechId: getSpeechId,
			canSpeach: canSpeach,
			speak: speak
		};
	})();

	return core;
});
