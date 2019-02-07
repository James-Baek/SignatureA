/**
 * 기존 ASP에서 존재하지 않는 스크립트 추가
 */

/**
 * br문자열을 개행문자열로 치환<p>
 * @param str
 * @returns
 */
String.prototype.br = function() {
    //	console.log(this);
    //	console.log(this.replace(/<br\s*[\/]?>/gi, "\n"));
        return this.replace(/<br\s*[\/]?>/gi, "\n");
    }
    
    /**
     * 문자열 Null 체크<p>
     * @param str
     * @returns
     */
    String.prototype.isEmpty = function() {
        if(this == null || this == "") {
            return true;
        }
    
        return false;
    }
    
    /**
     * 문자열 Null 체크<p>
     * @param str
     * @returns
     */
    String.prototype.isNotEmpty = function() {
        if(this == null || this == "") {
            return false;
        }
    
        return true;
    }
    
    var StringUtils = {
            /**
             * String 문자열을 boolean형으로 변환
             * @param string
             * @returns
             */
            stringToBoolean : function(string) {
                try {
                    switch(string.toLowerCase()){
                        case "true": case "yes": case "1": return true;
                        case "false": case "no": case "0": case null: return false;
                        default: return Boolean(string);
                    }
                } catch(err) {
                    return false;
                }
            },
    
            /**
             * 문자열 empty 체크
             * @param val
             * @returns {Boolean}
             */
            isEmpty : function(val) {
                var undef, key, i, len;
                var emptyValues = [undef, null, false, 0, '', '0'];
    
                for (i = 0, len = emptyValues.length; i < len; i++) {
                    if (val === emptyValues[i]) { return true; }
                }
    
                if (typeof val === 'object') {
                    for (key in val) {
                        // TODO: should we check for own properties only?
                        //if (val.hasOwnProperty(key)) {
                        return false;
                        //}
                    }
                    return true;
                }
    
                return false;
            }
    }
    
    String.prototype.formatUnicorn = String.prototype.formatUnicorn || function() {
        "use strict";
        var str = this.toString();
        if (arguments.length) {
            var t = typeof arguments[0];
            var key;
            var args = ("string" === t || "number" === t) ? Array.prototype.slice.call(arguments) : arguments[0];
    
            for (key in args) {
                str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
            }
        }
    
        return str;
    };
    