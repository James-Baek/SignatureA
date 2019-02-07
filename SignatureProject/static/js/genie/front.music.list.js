/*
 * author :
 * 작성 날짜 : 2013-03-18
 * 최종 수정 날짜 :
 * descript : 음악 리스트
 * 추가 || 수정필요 내역
 * - 다운로드 정의
 * - 키보드 선택
 * - document 선택시 체크 풀리는 부분 제어
 */
(function() {
	var _w = window, _d = document;

	var _keyDown = null;
	var _oldSelect = [];

	var MUSIC_LIST = function() {
		this.selectLenght = 0;
		this.selectArray = [];
		this.listType = '';
		this.keyName = '';
	};

	MUSIC_LIST.prototype = {
		_extend:null,
		_startNum:null,
		_moveNum:null,
		_endNum:null,
		_oldNum:null,
		_firstNum:null,
		_lastNum:null,
		_thisNum:null,
		_moveStatus:true,
		_dragStatus:false,

		removeSameArray:function(a) {
			var b = [];
			var j = 0;
			a.sort();
			while(a.length > 0) {
				var newKey = a.shift();
				if(j == 0) {
					b.push(newKey);
					j++;
				} else if(b[j-1] != newKey) {
					b.push(newKey);
					j++;
				}
			}
			return b;
		},
		sameArray:function(n, o) {
			var s = [];
			for(var i=0; i<n.length; i++) {
				for(var j=0; j<o.length; j++) {
					if(n[i] == o[j]) s.push(n[i]);
				}
			}
			return s;
		},
		findParent:function(t) {
			var that = this;
			while(t.parentNode != undefined) {
				if(t == that.hook[0]) return t;
				else t = t.parentNode;
			}
		},

		_load:function() {
			var that = this;

			that.checkboxs = that.hook.find('.list-wrap .list .select-check');
			that.allCheck = that.hook.find('.all-check');

			if((that.checkboxs).length == 0){
				$('.all-check').attr('class','all-check disabled');
				return false;
			}

			if(that.option == undefined || !!that.option.multiple)
				that._list();

			that._checked();

			that.hook.find('.all-check')
				.off('click')
				.click(function(e) {
					that._checkAll($(this));
				});

			that.hook.find('.select-check').click($.proxy(that._checked, that));

			if(that.list != undefined) {
				that.list.find('a').dblclick(function() {
					return false;
				});
			}

			if(that._extend !== null) that._extend();
		},
		_checkAll:function(element) {
			var that = this;

			if(element.prop('checked') === true) {
				that.checkboxs.each(function() { $(this).prop('checked', true); });
			} else {
				that.checkboxs.each(function() { $(this).prop('checked', false); });
			}

			that._checked();
		},
		_checked:function() {
			var that = this;
			that.checkboxs.each(function() {
				if($(this).prop('checked') === true) {
					$(this).parents('.list').addClass('select-list');
				} else {
					$(this).parents('.list').removeClass('select-list');
					that.allCheck.removeClass('checked');
				}
			});
			that._selectCheck();

			if($('.list-focus'))
				$('.list-focus').removeClass('list-focus');
		},
		_selectCheck:function() {
			var that = this;
			that.selectLength = that.hook.find('.list-wrap .list .select-check:checked').length;

			that.hook.find('.check-length').css({
				display:((that.selectLength > 0) ? 'inline-block' : 'none')
			}).find('em').html(that.selectLength);

			var i = 0;
			that.checkboxs.each(function(j) {
				if($(this).prop('checked') === true) i++;
			});

			if(i <= that.checkboxs.length - 1)
				that.allCheck.prop('checked', false);
			else
				that.allCheck.prop('checked', true);
		},
		_getCheckKey:function() {
			var that = this,
				keyList = '';

			that.checkboxs.parent('.select-list').each(function() {
				var t = $(this).attr(that.keyName);

				if(t != '' && t != null && typeof t != 'undefined') {
					keyList += t + ';';
				}
			});

			if(keyList.length > 1) {
				keyList = keyList.substr(0, keyList.length-1);
			}

			return (keyList == null || typeof keyList == 'undefined') ? '' : keyList;
		},
		//select
		_getThisIndex:function(element) {
			while(element != undefined) {
				if($(element).hasClass('list') === true && element.tagName.toLowerCase() == 'div')
					return this.list.index(element);
				else
					element = element.parentNode;
			}
			return null;
		},
		_list:function() {
			var that = this;
			that.list = that.hook.find('.list-wrap > * > .list');

			that.checkboxs.bind({
				focus:function() {
					$(this).closest('.list').addClass('list-focus');
				},
				blur:function() {
					$(this).closest('.list').removeClass('list-focus');
				}
			});
		},
		_reset:function() {
			var that = this;
			that.checkboxs = that.hook.find('.list-wrap .list input[type=checkbox]');
			that.list = that.hook.find('.list-wrap > * > .list');
		},
		_updateMeta: function(idx, meta) {
			var that = this;

			if(that.listType == 'play_list_mv') {
				that.list.eq(idx).find('[sort-field=MV]').html(meta.MV_NAME);
				that.list.eq(idx).find('[sort-field=ARTIST]').html(meta.ARTIST_NAME);
			} else {
				var adltTag = '';

				if(meta.ADULT_YN == 'Y') {
					adltTag = '<span class="icon icon-19">19<span class="hide">금</span></span>';
				}

				that.list.eq(idx).find('[sort-field=SONG]').html(adltTag + decodeURIComponent(meta.SONG_NAME));
				that.list.eq(idx).find('[sort-field=ALBUM]').html(decodeURIComponent(meta.ALBUM_NAME));
				that.list.eq(idx).find('[sort-field=ARTIST]').html(decodeURIComponent(meta.ARTIST_NAME));
			}
		}
	};

	$(_d).bind({
		keydown:function(e) {
			/*
			if(e.ctrlKey)
				_keyDown = 'ctrl';
			if(e.shiftKey)
				_keyDown = 'shift';
			*/
		},
		keyup:function() {
			_keyDown = null;
		}
	});

	window.MUSIC_LIST = MUSIC_LIST;
})();


// 간편다운 설정 (추가)
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