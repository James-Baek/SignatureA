/**
 * Created by yeomchangryong on 2016. 4. 21..
 */
(function() {
    var GENIE_STORE = function() {
        this.isLocalstorage = (function() {
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
        this.cookieMaxSize = 250 * 9;   //songid 기준 split
        this.map = {'geniePlayerList': 'genie-player-list'};
    };

    GENIE_STORE.prototype = {
        get: function (_nm) {
            var that = this,
                rtn = '';

            if(that.isLocalstorage) {
                rtn = window.localStorage[_nm];
            } else {
                _nm = that.mapping(_nm);

                var cookieList = document.cookie.split(';'),
                    cookiePtn = new RegExp(_nm + '\[[0-9]+\]', 'i'),
                    cookieIdxPtn = new RegExp(_nm + '\\[([0-9]+)\\](.*)', 'i');

                if (cookiePtn.test(document.cookie)) {
                    for (var i = 0; i < cookieList.length; i++) {
                        if (cookiePtn.test(cookieList[i])) {
                            var cookieIndex = cookieList[i].replace(cookieIdxPtn, "$1");
                            cookieIndex = $.trim(cookieIndex);

                            rtn += FG_cookie.get(_nm + '[' + cookieIndex + ']');
                        }
                    }
                } else {
                    rtn = FG_cookie.get(_nm);
                }
            }

            return rtn;
        },

        set: function (_nm, _val) {
            var that = this;

            if(that.isLocalstorage) {
                window.localStorage[_nm] = _val;
            } else {
                var l = Math.ceil(_val.length / that.cookieMaxSize);

                if (l > 1) {
                    for (var i = 0; i < i; i++) {
                        FG_cookie.set(_nm + '[' + i + ']', _val.substring(i * that.cookieMaxSize, (i + 1) * that.cookieMaxSize) - 1);
                    }
                } else {
                    FG_cookie.set(_nm, _val);
                }
            }
        },

        del: function(_nm) {
            var that = this;

            if(that.isLocalstorage) {
                window.localStorage.removeItem(_nm);
            } else {
                _nm = that.mapping(_nm);

                var cookieList = document.cookie.split(';'),
                    cookiePtn = new RegExp(_nm + '\[[0-9]+\]', 'i'),
                    cookieIdxPtn = new RegExp(_nm + '\\[([0-9]+)\\](.*)', 'i');

                if (cookiePtn.test(document.cookie)) {
                    for (var i = 0; i < cookieList.length; i++) {
                        if (cookiePtn.test(cookieList[i])) {
                            var cookieIndex = cookieList[i].replace(cookieIdxPtn, "$1");
                            cookieIndex = $.trim(cookieIndex);

                            FG_cookie.del(_nm + '[' + cookieIndex + ']');
                        }
                    }
                } else {
                    FG_cookie.del(_nm);
                }
            }
        },

        mapping: function(_nm) {
            var _cnm = this.map[_nm];

            if(_cnm == '' || _cnm == null || typeof _cnm == 'undefined') {
                return _nm;
            } else {
                return _cnm;
            }
        }
    };

    window.GENIE_STORE = GENIE_STORE;
})();