/**
 * @fileoverview 鐧惧害鍦板浘鐨勯紶鏍囩粯鍒跺伐鍏凤紝瀵瑰寮€鏀俱€�
 * 鍏佽鐢ㄦ埛鍦ㄥ湴鍥句笂鐐瑰嚮瀹屾垚榧犳爣缁樺埗鐨勫姛鑳姐€�
 * 浣跨敤鑰呭彲浠ヨ嚜瀹氫箟鎵€缁樺埗缁撴灉鐨勭浉鍏虫牱寮忥紝渚嬪绾垮銆侀鑹层€佹祴绾挎璺濈銆侀潰绉瓑绛夈€�
 * 涓诲叆鍙ｇ被鏄�<a href="symbols/BMapLib.DrawingManager.html">DrawingManager</a>锛�
 * 鍩轰簬Baidu Map API 1.4銆�
 *
 * @author Baidu Map Api Group 
 * @version 1.4
 */

/** 
 * @namespace BMap鐨勬墍鏈塴ibrary绫诲潎鏀惧湪BMapLib鍛藉悕绌洪棿涓�
 */
 var BMapLib = window.BMapLib = BMapLib || {};

 /**
  * 瀹氫箟甯搁噺, 缁樺埗鐨勬ā寮�
  * @final {Number} DrawingType
  */
 var BMAP_DRAWING_MARKER    = "marker",     // 榧犳爣鐢荤偣妯″紡
     BMAP_DRAWING_POLYLINE  = "polyline",   // 榧犳爣鐢荤嚎妯″紡
     BMAP_DRAWING_CIRCLE    = "circle",     // 榧犳爣鐢诲渾妯″紡
     BMAP_DRAWING_RECTANGLE = "rectangle",  // 榧犳爣鐢荤煩褰㈡ā寮�
     BMAP_DRAWING_POLYGON   = "polygon";    // 榧犳爣鐢诲杈瑰舰妯″紡
 
 (function() {
 
     /**
      * 澹版槑baidu鍖�
      */
     var baidu = baidu || {guid : "$BAIDU$"};
     (function() {
         // 涓€浜涢〉闈㈢骇鍒敮涓€鐨勫睘鎬э紝闇€瑕佹寕杞藉湪window[baidu.guid]涓�
         window[baidu.guid] = {};
 
         /**
          * 灏嗘簮瀵硅薄鐨勬墍鏈夊睘鎬ф嫹璐濆埌鐩爣瀵硅薄涓�
          * @name baidu.extend
          * @function
          * @grammar baidu.extend(target, source)
          * @param {Object} target 鐩爣瀵硅薄
          * @param {Object} source 婧愬璞�
          * @returns {Object} 鐩爣瀵硅薄
          */
         baidu.extend = function (target, source) {
             for (var p in source) {
                 if (source.hasOwnProperty(p)) {
                     target[p] = source[p];
                 }
             }    
             return target;
         };
 
         /**
          * @ignore
          * @namespace
          * @baidu.lang 瀵硅瑷€灞傞潰鐨勫皝瑁咃紝鍖呮嫭绫诲瀷鍒ゆ柇銆佹ā鍧楁墿灞曘€佺户鎵垮熀绫讳互鍙婂璞¤嚜瀹氫箟浜嬩欢鐨勬敮鎸併€�
          * @property guid 瀵硅薄鐨勫敮涓€鏍囪瘑
          */
         baidu.lang = baidu.lang || {};
 
         /**
          * 杩斿洖涓€涓綋鍓嶉〉闈㈢殑鍞竴鏍囪瘑瀛楃涓层€�
          * @function
          * @grammar baidu.lang.guid()
          * @returns {String} 褰撳墠椤甸潰鐨勫敮涓€鏍囪瘑瀛楃涓�
          */
         baidu.lang.guid = function() {
             return "TANGRAM__" + (window[baidu.guid]._counter ++).toString(36);
         };
 
         window[baidu.guid]._counter = window[baidu.guid]._counter || 1;
 
         /**
          * 鎵€鏈夌被鐨勫疄渚嬬殑瀹瑰櫒
          * key涓烘瘡涓疄渚嬬殑guid
          */
         window[baidu.guid]._instances = window[baidu.guid]._instances || {};
 
         /**
          * Tangram缁ф壙鏈哄埗鎻愪緵鐨勪竴涓熀绫伙紝鐢ㄦ埛鍙互閫氳繃缁ф壙baidu.lang.Class鏉ヨ幏鍙栧畠鐨勫睘鎬у強鏂规硶銆�
          * @function
          * @name baidu.lang.Class
          * @grammar baidu.lang.Class(guid)
          * @param {string} guid 瀵硅薄鐨勫敮涓€鏍囪瘑
          * @meta standard
          * @remark baidu.lang.Class鍜屽畠鐨勫瓙绫荤殑瀹炰緥鍧囧寘鍚竴涓叏灞€鍞竴鐨勬爣璇唃uid銆�
          * guid鏄湪鏋勯€犲嚱鏁颁腑鐢熸垚鐨勶紝鍥犳锛岀户鎵胯嚜baidu.lang.Class鐨勭被搴旇鐩存帴鎴栬€呴棿鎺ヨ皟鐢ㄥ畠鐨勬瀯閫犲嚱鏁般€�<br>
          * baidu.lang.Class鐨勬瀯閫犲嚱鏁颁腑浜х敓guid鐨勬柟寮忓彲浠ヤ繚璇乬uid鐨勫敮涓€鎬э紝鍙婃瘡涓疄渚嬮兘鏈変竴涓叏灞€鍞竴鐨刧uid銆�
          */
         baidu.lang.Class = function(guid) {
             this.guid = guid || baidu.lang.guid();
             window[baidu.guid]._instances[this.guid] = this;
         };
 
         window[baidu.guid]._instances = window[baidu.guid]._instances || {};
 
         /**
          * 鍒ゆ柇鐩爣鍙傛暟鏄惁string绫诲瀷鎴朣tring瀵硅薄
          * @name baidu.lang.isString
          * @function
          * @grammar baidu.lang.isString(source)
          * @param {Any} source 鐩爣鍙傛暟
          * @shortcut isString
          * @meta standard
          *             
          * @returns {boolean} 绫诲瀷鍒ゆ柇缁撴灉
          */
         baidu.lang.isString = function (source) {
             return '[object String]' == Object.prototype.toString.call(source);
         };
 
         /**
          * 鍒ゆ柇鐩爣鍙傛暟鏄惁涓篺unction鎴朏unction瀹炰緥
          * @name baidu.lang.isFunction
          * @function
          * @grammar baidu.lang.isFunction(source)
          * @param {Any} source 鐩爣鍙傛暟
          * @returns {boolean} 绫诲瀷鍒ゆ柇缁撴灉
          */
         baidu.lang.isFunction = function (source) {
             return '[object Function]' == Object.prototype.toString.call(source);
         };
 
         /**
          * 閲嶈浇浜嗛粯璁ょ殑toString鏂规硶锛屼娇寰楄繑鍥炰俊鎭洿鍔犲噯纭竴浜涖€�
          * @return {string} 瀵硅薄鐨凷tring琛ㄧず褰㈠紡
          */
         baidu.lang.Class.prototype.toString = function(){
             return "[object " + (this._className || "Object" ) + "]";
         };
 
         /**
          * 閲婃斁瀵硅薄鎵€鎸佹湁鐨勮祫婧愶紝涓昏鏄嚜瀹氫箟浜嬩欢銆�
          * @name dispose
          * @grammar obj.dispose()
          */
         baidu.lang.Class.prototype.dispose = function(){
             delete window[baidu.guid]._instances[this.guid];
             for(var property in this){
                 if (!baidu.lang.isFunction(this[property])) {
                     delete this[property];
                 }
             }
             this.disposed = true;
         };
 
         /**
          * 鑷畾涔夌殑浜嬩欢瀵硅薄銆�
          * @function
          * @name baidu.lang.Event
          * @grammar baidu.lang.Event(type[, target])
          * @param {string} type  浜嬩欢绫诲瀷鍚嶇О銆備负浜嗘柟渚垮尯鍒嗕簨浠跺拰涓€涓櫘閫氱殑鏂规硶锛屼簨浠剁被鍨嬪悕绉板繀椤讳互"on"(灏忓啓)寮€澶淬€�
          * @param {Object} [target]瑙﹀彂浜嬩欢鐨勫璞�
          * @meta standard
          * @remark 寮曞叆璇ユā鍧楋紝浼氳嚜鍔ㄤ负Class寮曞叆3涓簨浠舵墿灞曟柟娉曪細addEventListener銆乺emoveEventListener鍜宒ispatchEvent銆�
          * @see baidu.lang.Class
          */
         baidu.lang.Event = function (type, target) {
             this.type = type;
             this.returnValue = true;
             this.target = target || null;
             this.currentTarget = null;
         };
 
         /**
          * 娉ㄥ唽瀵硅薄鐨勪簨浠剁洃鍚櫒銆傚紩鍏aidu.lang.Event鍚庯紝Class鐨勫瓙绫诲疄渚嬫墠浼氳幏寰楄鏂规硶銆�
          * @grammar obj.addEventListener(type, handler[, key])
          * @param   {string}   type         鑷畾涔変簨浠剁殑鍚嶇О
          * @param   {Function} handler      鑷畾涔変簨浠惰瑙﹀彂鏃跺簲璇ヨ皟鐢ㄧ殑鍥炶皟鍑芥暟
          * @param   {string}   [key]        涓轰簨浠剁洃鍚嚱鏁版寚瀹氱殑鍚嶇О锛屽彲鍦ㄧЩ闄ゆ椂浣跨敤銆傚鏋滀笉鎻愪緵锛屾柟娉曚細榛樿涓哄畠鐢熸垚涓€涓叏灞€鍞竴鐨刱ey銆�
          * @remark  浜嬩欢绫诲瀷鍖哄垎澶у皬鍐欍€傚鏋滆嚜瀹氫箟浜嬩欢鍚嶇О涓嶆槸浠ュ皬鍐�"on"寮€澶达紝璇ユ柟娉曚細缁欏畠鍔犱笂"on"鍐嶈繘琛屽垽鏂紝鍗�"click"鍜�"onclick"浼氳璁や负鏄悓涓€绉嶄簨浠躲€� 
          */
         baidu.lang.Class.prototype.addEventListener = function (type, handler, key) {
             if (!baidu.lang.isFunction(handler)) {
                 return;
             }
             !this.__listeners && (this.__listeners = {});
             var t = this.__listeners, id;
             if (typeof key == "string" && key) {
                 if (/[^\w\-]/.test(key)) {
                     throw("nonstandard key:" + key);
                 } else {
                     handler.hashCode = key; 
                     id = key;
                 }
             }
             type.indexOf("on") != 0 && (type = "on" + type);
             typeof t[type] != "object" && (t[type] = {});
             id = id || baidu.lang.guid();
             handler.hashCode = id;
             t[type][id] = handler;
         };
          
         /**
          * 绉婚櫎瀵硅薄鐨勪簨浠剁洃鍚櫒銆傚紩鍏aidu.lang.Event鍚庯紝Class鐨勫瓙绫诲疄渚嬫墠浼氳幏寰楄鏂规硶銆�
          * @grammar obj.removeEventListener(type, handler)
          * @param {string}   type     浜嬩欢绫诲瀷
          * @param {Function|string} handler  瑕佺Щ闄ょ殑浜嬩欢鐩戝惉鍑芥暟鎴栬€呯洃鍚嚱鏁扮殑key
          * @remark  濡傛灉绗簩涓弬鏁癶andler娌℃湁琚粦瀹氬埌瀵瑰簲鐨勮嚜瀹氫箟浜嬩欢涓紝浠€涔堜篃涓嶅仛銆�
          */
         baidu.lang.Class.prototype.removeEventListener = function (type, handler) {
             if (baidu.lang.isFunction(handler)) {
                 handler = handler.hashCode;
             } else if (!baidu.lang.isString(handler)) {
                 return;
             }
             !this.__listeners && (this.__listeners = {});
             type.indexOf("on") != 0 && (type = "on" + type);
             var t = this.__listeners;
             if (!t[type]) {
                 return;
             }
             t[type][handler] && delete t[type][handler];
         };
 
         /**
          * 娲惧彂鑷畾涔変簨浠讹紝浣垮緱缁戝畾鍒拌嚜瀹氫箟浜嬩欢涓婇潰鐨勫嚱鏁伴兘浼氳鎵ц銆傚紩鍏aidu.lang.Event鍚庯紝Class鐨勫瓙绫诲疄渚嬫墠浼氳幏寰楄鏂规硶銆�
          * @grammar obj.dispatchEvent(event, options)
          * @param {baidu.lang.Event|String} event   Event瀵硅薄锛屾垨浜嬩欢鍚嶇О(1.1.1璧锋敮鎸�)
          * @param {Object} options 鎵╁睍鍙傛暟,鎵€鍚睘鎬ч敭鍊间細鎵╁睍鍒癊vent瀵硅薄涓�(1.2璧锋敮鎸�)
          * @remark 澶勭悊浼氳皟鐢ㄩ€氳繃addEventListenr缁戝畾鐨勮嚜瀹氫箟浜嬩欢鍥炶皟鍑芥暟涔嬪锛岃繕浼氳皟鐢ㄧ洿鎺ョ粦瀹氬埌瀵硅薄涓婇潰鐨勮嚜瀹氫箟浜嬩欢銆�
          * 渚嬪锛�<br>
          * myobj.onMyEvent = function(){}<br>
          * myobj.addEventListener("onMyEvent", function(){});
          */
         baidu.lang.Class.prototype.dispatchEvent = function (event, options) {
             if (baidu.lang.isString(event)) {
                 event = new baidu.lang.Event(event);
             }
             !this.__listeners && (this.__listeners = {});
             options = options || {};
             for (var i in options) {
                 event[i] = options[i];
             }
             var i, t = this.__listeners, p = event.type;
             event.target = event.target || this;
             event.currentTarget = this;
             p.indexOf("on") != 0 && (p = "on" + p);
             baidu.lang.isFunction(this[p]) && this[p].apply(this, arguments);
             if (typeof t[p] == "object") {
                 for (i in t[p]) {
                     t[p][i].apply(this, arguments);
                 }
             }
             return event.returnValue;
         };
 
         /**
          * 涓虹被鍨嬫瀯閫犲櫒寤虹珛缁ф壙鍏崇郴
          * @name baidu.lang.inherits
          * @function
          * @grammar baidu.lang.inherits(subClass, superClass[, className])
          * @param {Function} subClass 瀛愮被鏋勯€犲櫒
          * @param {Function} superClass 鐖剁被鏋勯€犲櫒
          * @param {string} className 绫诲悕鏍囪瘑
          * @remark 浣縮ubClass缁ф壙superClass鐨刾rototype锛�
          * 鍥犳subClass鐨勫疄渚嬭兘澶熶娇鐢╯uperClass鐨刾rototype涓畾涔夌殑鎵€鏈夊睘鎬у拰鏂规硶銆�<br>
          * 杩欎釜鍑芥暟瀹為檯涓婃槸寤虹珛浜唖ubClass鍜宻uperClass鐨勫師鍨嬮摼闆嗘垚锛屽苟瀵箂ubClass杩涜浜哻onstructor淇銆�<br>
          * <strong>娉ㄦ剰锛氬鏋滆缁ф壙鏋勯€犲嚱鏁帮紝闇€瑕佸湪subClass閲岄潰call涓€涓嬶紝鍏蜂綋瑙佷笅闈㈢殑demo渚嬪瓙</strong>
          * @shortcut inherits
          * @meta standard
          * @see baidu.lang.Class
          */
         baidu.lang.inherits = function (subClass, superClass, className) {
             var key, proto, 
                 selfProps = subClass.prototype, 
                 clazz = new Function();        
             clazz.prototype = superClass.prototype;
             proto = subClass.prototype = new clazz();
             for (key in selfProps) {
                 proto[key] = selfProps[key];
             }
             subClass.prototype.constructor = subClass;
             subClass.superClass = superClass.prototype;
 
             if ("string" == typeof className) {
                 proto._className = className;
             }
         };
 
         /**
          * @ignore
          * @namespace baidu.dom 鎿嶄綔dom鐨勬柟娉曘€�
          */
         baidu.dom = baidu.dom || {};
 
         /**
          * 浠庢枃妗ｄ腑鑾峰彇鎸囧畾鐨凞OM鍏冪礌
          * 
          * @param {string|HTMLElement} id 鍏冪礌鐨刬d鎴朌OM鍏冪礌
          * @meta standard
          * @return {HTMLElement} DOM鍏冪礌锛屽鏋滀笉瀛樺湪锛岃繑鍥瀗ull锛屽鏋滃弬鏁颁笉鍚堟硶锛岀洿鎺ヨ繑鍥炲弬鏁�
          */
         baidu._g = baidu.dom._g = function (id) {
             if (baidu.lang.isString(id)) {
                 return document.getElementById(id);
             }
             return id;
         };
 
         /**
          * 浠庢枃妗ｄ腑鑾峰彇鎸囧畾鐨凞OM鍏冪礌
          * @name baidu.dom.g
          * @function
          * @grammar baidu.dom.g(id)
          * @param {string|HTMLElement} id 鍏冪礌鐨刬d鎴朌OM鍏冪礌
          * @meta standard
          *             
          * @returns {HTMLElement|null} 鑾峰彇鐨勫厓绱狅紝鏌ユ壘涓嶅埌鏃惰繑鍥瀗ull,濡傛灉鍙傛暟涓嶅悎娉曪紝鐩存帴杩斿洖鍙傛暟
          */
         baidu.g = baidu.dom.g = function (id) {
             if ('string' == typeof id || id instanceof String) {
                 return document.getElementById(id);
             } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
                 return id;
             }
             return null;
         };
 
         /**
          * 鍦ㄧ洰鏍囧厓绱犵殑鎸囧畾浣嶇疆鎻掑叆HTML浠ｇ爜
          * @name baidu.dom.insertHTML
          * @function
          * @grammar baidu.dom.insertHTML(element, position, html)
          * @param {HTMLElement|string} element 鐩爣鍏冪礌鎴栫洰鏍囧厓绱犵殑id
          * @param {string} position 鎻掑叆html鐨勪綅缃俊鎭紝鍙栧€间负beforeBegin,afterBegin,beforeEnd,afterEnd
          * @param {string} html 瑕佹彃鍏ョ殑html
          * @remark
          * 
          * 瀵逛簬position鍙傛暟锛屽ぇ灏忓啓涓嶆晱鎰�<br>
          * 鍙傛暟鐨勬剰鎬濓細beforeBegin&lt;span&gt;afterBegin   this is span! beforeEnd&lt;/span&gt; afterEnd <br />
          * 姝ゅ锛屽鏋滀娇鐢ㄦ湰鍑芥暟鎻掑叆甯︽湁script鏍囩鐨凥TML瀛楃涓诧紝script鏍囩瀵瑰簲鐨勮剼鏈皢涓嶄細琚墽琛屻€�
          * 
          * @shortcut insertHTML
          * @meta standard
          *             
          * @returns {HTMLElement} 鐩爣鍏冪礌
          */
         baidu.insertHTML = baidu.dom.insertHTML = function (element, position, html) {
             element = baidu.dom.g(element);
             var range,begin;
 
             if (element.insertAdjacentHTML) {
                 element.insertAdjacentHTML(position, html);
             } else {
                 // 杩欓噷涓嶅仛"undefined" != typeof(HTMLElement) && !window.opera鍒ゆ柇锛屽叾瀹冩祻瑙堝櫒灏嗗嚭閿欙紵锛�
                 // 浣嗘槸鍏跺疄鍋氫簡鍒ゆ柇锛屽叾瀹冩祻瑙堝櫒涓嬬瓑浜庤繖涓嚱鏁板氨涓嶈兘鎵ц浜�
                 range = element.ownerDocument.createRange();
                 // FF涓媟ange鐨勪綅缃缃敊璇彲鑳藉鑷村垱寤哄嚭鏉ョ殑fragment鍦ㄦ彃鍏om鏍戜箣鍚巋tml缁撴瀯涔辨帀
                 // 鏀圭敤range.insertNode鏉ユ彃鍏tml, by wenyuxiang @ 2010-12-14.
                 position = position.toUpperCase();
                 if (position == 'AFTERBEGIN' || position == 'BEFOREEND') {
                     range.selectNodeContents(element);
                     range.collapse(position == 'AFTERBEGIN');
                 } else {
                     begin = position == 'BEFOREBEGIN';
                     range[begin ? 'setStartBefore' : 'setEndAfter'](element);
                     range.collapse(begin);
                 }
                 range.insertNode(range.createContextualFragment(html));
             }
             return element;
         };
 
         /**
          * 涓虹洰鏍囧厓绱犳坊鍔燾lassName
          * @name baidu.dom.addClass
          * @function
          * @grammar baidu.dom.addClass(element, className)
          * @param {HTMLElement|string} element 鐩爣鍏冪礌鎴栫洰鏍囧厓绱犵殑id
          * @param {string} className 瑕佹坊鍔犵殑className锛屽厑璁稿悓鏃舵坊鍔犲涓猚lass锛屼腑闂翠娇鐢ㄧ┖鐧界鍒嗛殧
          * @remark
          * 浣跨敤鑰呭簲淇濊瘉鎻愪緵鐨刢lassName鍚堟硶鎬э紝涓嶅簲鍖呭惈涓嶅悎娉曞瓧绗︼紝className鍚堟硶瀛楃鍙傝€冿細http://www.w3.org/TR/CSS2/syndata.html銆�
          * @shortcut addClass
          * @meta standard
          *              
          * @returns {HTMLElement} 鐩爣鍏冪礌
          */
         baidu.ac = baidu.dom.addClass = function (element, className) {
             element = baidu.dom.g(element);
             var classArray = className.split(/\s+/),
                 result = element.className,
                 classMatch = " " + result + " ",
                 i = 0,
                 l = classArray.length;
 
             for (; i < l; i++){
                  if ( classMatch.indexOf( " " + classArray[i] + " " ) < 0 ) {
                      result += (result ? ' ' : '') + classArray[i];
                  }
             }
 
             element.className = result;
             return element;
         };
 
         /**
          * @ignore
          * @namespace baidu.event 灞忚斀娴忚鍣ㄥ樊寮傛€х殑浜嬩欢灏佽銆�
          * @property target     浜嬩欢鐨勮Е鍙戝厓绱�
          * @property pageX      榧犳爣浜嬩欢鐨勯紶鏍噚鍧愭爣
          * @property pageY      榧犳爣浜嬩欢鐨勯紶鏍噛鍧愭爣
          * @property keyCode    閿洏浜嬩欢鐨勯敭鍊�
          */
         baidu.event = baidu.event || {};
 
         /**
          * 浜嬩欢鐩戝惉鍣ㄧ殑瀛樺偍琛�
          * @private
          * @meta standard
          */
         baidu.event._listeners = baidu.event._listeners || [];
 
         /**
          * 涓虹洰鏍囧厓绱犳坊鍔犱簨浠剁洃鍚櫒
          * @name baidu.event.on
          * @function
          * @grammar baidu.event.on(element, type, listener)
          * @param {HTMLElement|string|window} element 鐩爣鍏冪礌鎴栫洰鏍囧厓绱爄d
          * @param {string} type 浜嬩欢绫诲瀷
          * @param {Function} listener 闇€瑕佹坊鍔犵殑鐩戝惉鍣�
          * @remark
          *  1. 涓嶆敮鎸佽法娴忚鍣ㄧ殑榧犳爣婊氳疆浜嬩欢鐩戝惉鍣ㄦ坊鍔�<br>
          *  2. 鏀规柟娉曚笉涓虹洃鍚櫒鐏屽叆浜嬩欢瀵硅薄锛屼互闃叉璺╥frame浜嬩欢鎸傝浇鐨勪簨浠跺璞¤幏鍙栧け璐�            
          * @shortcut on
          * @meta standard
          * @see baidu.event.un
          *             
          * @returns {HTMLElement|window} 鐩爣鍏冪礌
          */
         baidu.on = baidu.event.on = function (element, type, listener) {
             type = type.replace(/^on/i, '');
             element = baidu._g(element);
             var realListener = function (ev) {
                 // 1. 杩欓噷涓嶆敮鎸丒ventArgument,  鍘熷洜鏄法frame鐨勪簨浠舵寕杞�
                 // 2. element鏄负浜嗕慨姝his
                 listener.call(element, ev);
             },
             lis = baidu.event._listeners,
             filter = baidu.event._eventFilter,
             afterFilter,
             realType = type;
             type = type.toLowerCase();
             // filter杩囨护
             if(filter && filter[type]){
                 afterFilter = filter[type](element, type, realListener);
                 realType = afterFilter.type;
                 realListener = afterFilter.listener;
             }
             // 浜嬩欢鐩戝惉鍣ㄦ寕杞�
             if (element.addEventListener) {
                 element.addEventListener(realType, realListener, false);
             } else if (element.attachEvent) {
                 element.attachEvent('on' + realType, realListener);
             }
           
             // 灏嗙洃鍚櫒瀛樺偍鍒版暟缁勪腑
             lis[lis.length] = [element, type, listener, realListener, realType];
             return element;
         };
 
         /**
          * 涓虹洰鏍囧厓绱犵Щ闄や簨浠剁洃鍚櫒
          * @name baidu.event.un
          * @function
          * @grammar baidu.event.un(element, type, listener)
          * @param {HTMLElement|string|window} element 鐩爣鍏冪礌鎴栫洰鏍囧厓绱爄d
          * @param {string} type 浜嬩欢绫诲瀷
          * @param {Function} listener 闇€瑕佺Щ闄ょ殑鐩戝惉鍣�
          * @shortcut un
          * @meta standard
          *             
          * @returns {HTMLElement|window} 鐩爣鍏冪礌
          */
         baidu.un = baidu.event.un = function (element, type, listener) {
             element = baidu._g(element);
             type = type.replace(/^on/i, '').toLowerCase();
             
             var lis = baidu.event._listeners, 
                 len = lis.length,
                 isRemoveAll = !listener,
                 item,
                 realType, realListener;
             
             //濡傛灉灏唋istener鐨勭粨鏋勬敼鎴恓son
             //鍙互鑺傜渷鎺夎繖涓惊鐜紝浼樺寲鎬ц兘
             //浣嗘槸鐢变簬un鐨勪娇鐢ㄩ鐜囧苟涓嶉珮锛屽悓鏃跺湪listener涓嶅鐨勬椂鍊�
             //閬嶅巻鏁扮粍鐨勬€ц兘娑堣€椾笉浼氬浠ｇ爜浜х敓褰卞搷
             //鏆備笉鑰冭檻姝や紭鍖�
             while (len--) {
                 item = lis[len];
                 
                 // listener瀛樺湪鏃讹紝绉婚櫎element鐨勬墍鏈変互listener鐩戝惉鐨則ype绫诲瀷浜嬩欢
                 // listener涓嶅瓨鍦ㄦ椂锛岀Щ闄lement鐨勬墍鏈塼ype绫诲瀷浜嬩欢
                 if (item[1] === type
                     && item[0] === element
                     && (isRemoveAll || item[2] === listener)) {
                     realType = item[4];
                     realListener = item[3];
                     if (element.removeEventListener) {
                         element.removeEventListener(realType, realListener, false);
                     } else if (element.detachEvent) {
                         element.detachEvent('on' + realType, realListener);
                     }
                     lis.splice(len, 1);
                 }
             }            
             return element;
         };
 
         /**
          * 鑾峰彇event浜嬩欢,瑙ｅ喅涓嶅悓娴忚鍣ㄥ吋瀹归棶棰�
          * @param {Event}
          * @return {Event}
          */
         baidu.getEvent = baidu.event.getEvent = function (event) {
             return window.event || event;
         }
 
         /**
          * 鑾峰彇event.target,瑙ｅ喅涓嶅悓娴忚鍣ㄥ吋瀹归棶棰�
          * @param {Event}
          * @return {Target}
          */
         baidu.getTarget = baidu.event.getTarget = function (event) {
             var event = baidu.getEvent(event);
             return event.target || event.srcElement;
         }
 
         /**
          * 闃绘浜嬩欢鐨勯粯璁よ涓�
          * @name baidu.event.preventDefault
          * @function
          * @grammar baidu.event.preventDefault(event)
          * @param {Event} event 浜嬩欢瀵硅薄
          * @meta standard
          */
         baidu.preventDefault = baidu.event.preventDefault = function (event) {
            var event = baidu.getEvent(event);
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
         };
 
         /**
          * 鍋滄浜嬩欢鍐掓场浼犳挱
          * @param {Event}
          */
         baidu.stopBubble = baidu.event.stopBubble = function (event) {
             event = baidu.getEvent(event);
             event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
         }
 
         baidu.browser = baidu.browser || {};
 
             if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
                 //IE 8涓嬶紝浠ocumentMode涓哄噯
                 //鍦ㄧ櫨搴︽ā鏉夸腑锛屽彲鑳戒細鏈�$锛岄槻姝㈠啿绐侊紝灏�$1 鍐欐垚 \x241
             /**
              * 鍒ゆ柇鏄惁涓篿e娴忚鍣�
              * @property ie ie鐗堟湰鍙�
              * @grammar baidu.browser.ie
              * @meta standard
              * @shortcut ie
              * @see baidu.browser.firefox,baidu.browser.safari,baidu.browser.opera,baidu.browser.chrome,baidu.browser.maxthon 
              */
                baidu.browser.ie = baidu.ie = document.documentMode || + RegExp['\x241'];
 }
 
     })();
 
     /** 
      * @exports DrawingManager as BMapLib.DrawingManager 
      */
     var DrawingManager =
         /**
          * DrawingManager绫荤殑鏋勯€犲嚱鏁�
          * @class 榧犳爣缁樺埗绠＄悊绫伙紝瀹炵幇榧犳爣缁樺埗绠＄悊鐨�<b>鍏ュ彛</b>銆�
          * 瀹炰緥鍖栬绫诲悗锛屽嵆鍙皟鐢ㄨ绫绘彁渚涚殑open
          * 鏂规硶寮€鍚粯鍒舵ā寮忕姸鎬併€�
          * 涔熷彲鍔犲叆宸ュ叿鏍忚繘琛岄€夋嫨鎿嶄綔銆�
          * 
          * @constructor
          * @param {Map} map Baidu map鐨勫疄渚嬪璞�
          * @param {Json Object} opts 鍙€夌殑杈撳叆鍙傛暟锛岄潪蹇呭～椤广€傚彲杈撳叆閫夐」鍖呮嫭锛�<br />
          * {"<b>isOpen</b>" : {Boolean} 鏄惁寮€鍚粯鍒舵ā寮�
          * <br />"<b>enableDrawingTool</b>" : {Boolean} 鏄惁娣诲姞缁樺埗宸ュ叿鏍忔帶浠讹紝榛樿涓嶆坊鍔�
          * <br />"<b>drawingToolOptions</b>" : {Json Object} 鍙€夌殑杈撳叆鍙傛暟锛岄潪蹇呭～椤广€傚彲杈撳叆閫夐」鍖呮嫭
          * <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<b>anchor</b>" : {ControlAnchor} 鍋滈潬浣嶇疆銆侀粯璁ゅ乏涓婅
          * <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<b>offset</b>" : {Size} 鍋忕Щ鍊笺€�
          * <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<b>scale</b>" : {Number} 宸ュ叿鏍忕殑缂╂斁姣斾緥,榛樿涓�1
          * <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<b>drawingModes</b>" : {DrawingType<Array>} 宸ュ叿鏍忎笂鍙互閫夋嫨鍑虹幇鐨勭粯鍒舵ā寮�,灏嗛渶瑕佹樉绀虹殑DrawingType浠ユ暟缁勫瀷褰㈠紡浼犲叆锛屽[BMAP_DRAWING_MARKER, BMAP_DRAWING_CIRCLE] 灏嗗彧鏄剧ず鐢荤偣鍜岀敾鍦嗙殑閫夐」
          * <br />"<b>enableCalculate</b>" : {Boolean} 缁樺埗鏄惁杩涜娴嬭窛(鐢荤嚎鏃跺€�)銆佹祴闈�(鐢诲渾銆佸杈瑰舰銆佺煩褰�)
          * <br />"<b>markerOptions</b>" : {CircleOptions} 鎵€鐢荤殑鐐圭殑鍙€夊弬鏁帮紝鍙傝€僡pi涓殑<a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E6%80%BB%E7%B1%BB/%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB">瀵瑰簲绫�</a>
          * <br />"<b>circleOptions</b>" : {CircleOptions} 鎵€鐢荤殑鍦嗙殑鍙€夊弬鏁帮紝鍙傝€僡pi涓殑<a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E6%80%BB%E7%B1%BB/%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB">瀵瑰簲绫�</a>
          * <br />"<b>polylineOptions</b>" : {CircleOptions} 鎵€鐢荤殑绾跨殑鍙€夊弬鏁帮紝鍙傝€僡pi涓殑<a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E6%80%BB%E7%B1%BB/%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB">瀵瑰簲绫�</a>
          * <br />"<b>polygonOptions</b>" : {PolygonOptions} 鎵€鐢荤殑澶氳竟褰㈢殑鍙€夊弬鏁帮紝鍙傝€僡pi涓殑<a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E6%80%BB%E7%B1%BB/%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB">瀵瑰簲绫�</a>
          * <br />"<b>rectangleOptions</b>" : {PolygonOptions} 鎵€鐢荤殑鐭╁舰鐨勫彲閫夊弬鏁帮紝鍙傝€僡pi涓殑<a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E6%80%BB%E7%B1%BB/%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB">瀵瑰簲绫�</a>
          *
          * @example <b>鍙傝€冪ず渚嬶細</b><br />
          * var map = new BMap.Map("container");<br />map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);<br />
          * var myDrawingManagerObject = new BMapLib.DrawingManager(map, {isOpen: true, 
          *     drawingType: BMAP_DRAWING_MARKER, enableDrawingTool: true,
          *     enableCalculate: false,
          *     drawingToolOptions: {
          *         anchor: BMAP_ANCHOR_TOP_LEFT,
          *         offset: new BMap.Size(5, 5),
          *         drawingTypes : [
          *             BMAP_DRAWING_MARKER,
          *             BMAP_DRAWING_CIRCLE,
          *             BMAP_DRAWING_POLYLINE,
          *             BMAP_DRAWING_POLYGON,
          *             BMAP_DRAWING_RECTANGLE 
          *          ]
          *     },
          *     polylineOptions: {
          *         strokeColor: "#333"
          *     });
          */
         BMapLib.DrawingManager = function(map, opts){
             if (!map) {
                 return;
             }
             instances.push(this);
             
             opts = opts || {};
 
             this._initialize(map, opts);
         }
 
     // 閫氳繃baidu.lang涓嬬殑inherits鏂规硶锛岃DrawingManager缁ф壙baidu.lang.Class
     baidu.lang.inherits(DrawingManager, baidu.lang.Class, "DrawingManager");
 
     /**
      * 寮€鍚湴鍥剧殑缁樺埗妯″紡
      *
      * @example <b>鍙傝€冪ず渚嬶細</b><br />
      * myDrawingManagerObject.open();
      */
     DrawingManager.prototype.open = function() {
         // 鍒ゆ柇缁樺埗鐘舵€佹槸鍚﹀凡缁忓紑鍚�
         if (this._isOpen == true){
             return true;
         }
         closeInstanceExcept(this);
 
         this._open();
     }
 
     /**
      * 鍏抽棴鍦板浘鐨勭粯鍒剁姸鎬�
      *
      * @example <b>鍙傝€冪ず渚嬶細</b><br />
      * myDrawingManagerObject.close();
      */
     DrawingManager.prototype.close = function() {
 
         // 鍒ゆ柇缁樺埗鐘舵€佹槸鍚﹀凡缁忓紑鍚�
         if (this._isOpen == false){
             return true;
         }
         var me = this;
         this._close();
         setTimeout(function(){
             me._map.enableDoubleClickZoom();
         },2000);
         
     }
 
     /**
      * 璁剧疆褰撳墠鐨勭粯鍒舵ā寮忥紝鍙傛暟DrawingType锛屼负5涓彲閫夊父閲�:
      * <br/>BMAP_DRAWING_MARKER    鐢荤偣
      * <br/>BMAP_DRAWING_CIRCLE    鐢诲渾
      * <br/>BMAP_DRAWING_POLYLINE  鐢荤嚎
      * <br/>BMAP_DRAWING_POLYGON   鐢诲杈瑰舰
      * <br/>BMAP_DRAWING_RECTANGLE 鐢荤煩褰�
      * @param {DrawingType} DrawingType
      * @return {Boolean} 
      *
      * @example <b>鍙傝€冪ず渚嬶細</b><br />
      * myDrawingManagerObject.setDrawingMode(BMAP_DRAWING_POLYLINE);
      */
     DrawingManager.prototype.setDrawingMode = function(drawingType) {
         //涓庡綋鍓嶆ā寮忎笉涓€鏍锋椂鍊欐墠杩涜閲嶆柊缁戝畾浜嬩欢
         if (this._drawingType != drawingType) {
             closeInstanceExcept(this);
             this._setDrawingMode(drawingType);
         }
     }
 
     /**
      * 鑾峰彇褰撳墠鐨勭粯鍒舵ā寮�
      * @return {DrawingType} 缁樺埗鐨勬ā寮�
      *
      * @example <b>鍙傝€冪ず渚嬶細</b><br />
      * alert(myDrawingManagerObject.getDrawingMode());
      */
     DrawingManager.prototype.getDrawingMode = function() {
         return this._drawingType;
     }
 
     /**
      * 鎵撳紑璺濈鎴栭潰绉绠�
      *
      * @example <b>鍙傝€冪ず渚嬶細</b><br />
      * myDrawingManagerObject.enableCalculate();
      */
     DrawingManager.prototype.enableCalculate = function() {
         this._enableCalculate = true;
         this._addGeoUtilsLibrary();
     }
 
     /**
      * 鍏抽棴璺濈鎴栭潰绉绠�
      *
      * @example <b>鍙傝€冪ず渚嬶細</b><br />
      * myDrawingManagerObject.disableCalculate();
      */
     DrawingManager.prototype.disableCalculate = function() {
         this._enableCalculate = false;
     }
 
     /**
      * 榧犳爣缁樺埗瀹屾垚鍚庯紝娲惧彂鎬讳簨浠剁殑鎺ュ彛
      * @name DrawingManager#overlaycomplete
      * @event
      * @param {Event Object} e 鍥炶皟鍑芥暟浼氳繑鍥瀍vent鍙傛暟锛屽寘鎷互涓嬭繑鍥炲€硷細
      * <br />{"<b>drawingMode</b> : {DrawingType} 褰撳墠鐨勭粯鍒舵ā寮�
      * <br />"<b>overlay</b>锛歿Marker||Polyline||Polygon||Circle} 瀵瑰簲鐨勭粯鍒舵ā寮忚繑鍥炲搴旂殑瑕嗙洊鐗�
      * <br />"<b>calculate</b>锛歿Number} 闇€瑕佸紑鍚绠楁ā寮忔墠浼氳繑鍥炶繖涓€硷紝褰撶粯鍒剁嚎鐨勬椂鍊欒繑鍥炶窛绂汇€佺粯鍒跺杈瑰舰銆佸渾銆佺煩褰㈡椂鍊欒繑鍥為潰绉紝鍗曚綅涓虹背锛�
      * <br />"<b>label</b>锛歿Label} 璁＄畻闈㈢Н鏃跺€欏嚭鐜板湪Map涓婄殑Label瀵硅薄
      *
      * @example <b>鍙傝€冪ず渚嬶細</b>
      * myDrawingManagerObject.addEventListener("overlaycomplete", function(e) {
      *     alert(e.drawingMode);
      *     alert(e.overlay);
      *     alert(e.calculate);
      *     alert(e.label);
      * });
      */
 
     /**
      * 缁樺埗鐐瑰畬鎴愬悗锛屾淳鍙戠殑浜嬩欢鎺ュ彛
      * @name DrawingManager#markercomplete
      * @event
      * @param {Marker} overlay 鍥炶皟鍑芥暟浼氳繑鍥炵浉搴旂殑瑕嗙洊鐗╋紝
      * <br />{"<b>overlay</b> : {Marker} 
      *
      * @example <b>鍙傝€冪ず渚嬶細</b>
      * myDrawingManagerObject.addEventListener("circlecomplete", function(e, overlay) {
      *     alert(overlay);
      * });
      */
 
     /**
      * 缁樺埗鍦嗗畬鎴愬悗锛屾淳鍙戠殑浜嬩欢鎺ュ彛
      * @name DrawingManager#circlecomplete
      * @event
      * @param {Circle} overlay 鍥炶皟鍑芥暟浼氳繑鍥炵浉搴旂殑瑕嗙洊鐗╋紝
      * <br />{"<b>overlay</b> : {Circle} 
      */
 
     /**
      * 缁樺埗绾垮畬鎴愬悗锛屾淳鍙戠殑浜嬩欢鎺ュ彛
      * @name DrawingManager#polylinecomplete
      * @event
      * @param {Polyline} overlay 鍥炶皟鍑芥暟浼氳繑鍥炵浉搴旂殑瑕嗙洊鐗╋紝
      * <br />{"<b>overlay</b> : {Polyline} 
      */
 
     /**
      * 缁樺埗澶氳竟褰㈠畬鎴愬悗锛屾淳鍙戠殑浜嬩欢鎺ュ彛
      * @name DrawingManager#polygoncomplete
      * @event
      * @param {Polygon} overlay 鍥炶皟鍑芥暟浼氳繑鍥炵浉搴旂殑瑕嗙洊鐗╋紝
      * <br />{"<b>overlay</b> : {Polygon} 
      */
 
     /**
      * 缁樺埗鐭╁舰瀹屾垚鍚庯紝娲惧彂鐨勪簨浠舵帴鍙�
      * @name DrawingManager#rectanglecomplete
      * @event
      * @param {Polygon} overlay 鍥炶皟鍑芥暟浼氳繑鍥炵浉搴旂殑瑕嗙洊鐗╋紝
      * <br />{"<b>overlay</b> : {Polygon} 
      */
 
     /**
      * 鍒濆鍖栫姸鎬�
      * @param {Map} 鍦板浘瀹炰緥
      * @param {Object} 鍙傛暟
      */
     DrawingManager.prototype._initialize = function(map, opts) {
 
         /**
          * map瀵硅薄
          * @private
          * @type {Map}
          */
         this._map = map;
 
         /**
          * 閰嶇疆瀵硅薄
          * @private
          * @type {Object}
          */
         this._opts = opts;
 
         /**
          * 褰撳墠鐨勭粯鍒舵ā寮�, 榛樿鏄粯鍒剁偣
          * @private
          * @type {DrawingType}
          */
         this._drawingType = opts.drawingMode || BMAP_DRAWING_MARKER;
 
         /**
          * 鏄惁娣诲姞娣诲姞榧犳爣缁樺埗宸ュ叿鏍忛潰鏉�
          */
         if (opts.enableDrawingTool) {
             var drawingTool  = new DrawingTool(this, opts.drawingToolOptions);
             this._drawingTool = drawingTool;
             map.addControl(drawingTool);
         }
 
         //鏄惁璁＄畻缁樺埗鍑虹殑闈㈢Н 
         if (opts.enableCalculate === true) {
             this.enableCalculate();
         } else {
             this.disableCalculate();
         }
 
         /**
          * 鏄惁宸茬粡寮€鍚簡缁樺埗鐘舵€�
          * @private
          * @type {Boolean}
          */
         this._isOpen = !!(opts.isOpen === true);
         if (this._isOpen) {
             this._open();
         }
 
         this.markerOptions    = opts.markerOptions    || {};
         this.circleOptions    = opts.circleOptions    || {};
         this.polylineOptions  = opts.polylineOptions  || {};
         this.polygonOptions   = opts.polygonOptions   || {};
         this.rectangleOptions = opts.rectangleOptions || {};
         this.controlButton =  opts.controlButton == "right" ? "right" : "left";
 
     },
 
     /**
      * 寮€鍚湴鍥剧殑缁樺埗鐘舵€�
      * @return {Boolean}锛屽紑鍚粯鍒剁姸鎬佹垚鍔燂紝杩斿洖true锛涘惁鍒欒繑鍥瀎alse銆�
      */
     DrawingManager.prototype._open = function() {
 
         this._isOpen = true;
 
         //娣诲姞閬僵锛屾墍鏈夐紶鏍囨搷浣滈兘鍦ㄨ繖涓伄缃╀笂瀹屾垚
         if (!this._mask) {
             this._mask = new Mask();
         }
         this._map.addOverlay(this._mask);
         this._setDrawingMode(this._drawingType);
 
     }
 
     /**
      * 璁剧疆褰撳墠鐨勭粯鍒舵ā寮�
      * @param {DrawingType}
      */
     DrawingManager.prototype._setDrawingMode = function(drawingType) {
 
         this._drawingType = drawingType;
 
         /**
          * 寮€鍚紪杈戠姸鎬佹椂鍊欐墠閲嶆柊杩涜浜嬩欢缁戝畾
          */
         if (this._isOpen) {
 
             //娓呯┖涔嬪墠鐨勮嚜瀹氫箟浜嬩欢
             this._mask.__listeners = {};
 
             switch (drawingType) {
                 case BMAP_DRAWING_MARKER:
                     this._bindMarker();
                     break;
                 case BMAP_DRAWING_CIRCLE:
                     this._bindCircle();
                     break;
                 case BMAP_DRAWING_POLYLINE:
                 case BMAP_DRAWING_POLYGON:
                     this._bindPolylineOrPolygon();
                     break;
                 case BMAP_DRAWING_RECTANGLE:
                     this._bindRectangle();
                     break;
             }
         }
 
         /** 
          * 濡傛灉娣诲姞浜嗗伐鍏锋爮锛屽垯涔熼渶瑕佹敼鍙樺伐鍏锋爮鐨勬牱寮�
          */
         if (this._drawingTool && this._isOpen) {
             this._drawingTool.setStyleByDrawingMode(drawingType);
         }
     }
 
     /**
      * 鍏抽棴鍦板浘鐨勭粯鍒剁姸鎬�
      * @return {Boolean}锛屽叧闂粯鍒剁姸鎬佹垚鍔燂紝杩斿洖true锛涘惁鍒欒繑鍥瀎alse銆�
      */
     DrawingManager.prototype._close = function() {
 
         this._isOpen = false;
 
 
         if (this._mask) {
             this._map.removeOverlay(this._mask);
         }
 
         /** 
          * 濡傛灉娣诲姞浜嗗伐鍏锋爮锛屽垯鍏抽棴鏃跺€欏皢宸ュ叿鏍忔牱寮忚缃负鎷栨嫿鍦板浘
          */
         if (this._drawingTool) {
             this._drawingTool.setStyleByDrawingMode("hander");
         }
     }
 
     /**
      * 缁戝畾榧犳爣鐢荤偣鐨勪簨浠�
      */
     DrawingManager.prototype._bindMarker = function() {
 
         var me   = this,
             map  = this._map,
             mask = this._mask;
 
         /**
          * 榧犳爣鐐瑰嚮鐨勪簨浠�
          */
         var clickAction = function (e) {
             // 寰€鍦板浘涓婃坊鍔爉arker
             var marker = new BMap.Marker(e.point, me.markerOptions);
             map.addOverlay(marker);
             me._dispatchOverlayComplete(marker);
         }
 
         mask.addEventListener('click', clickAction);
     }
 
     /**
      * 缁戝畾榧犳爣鐢诲渾鐨勪簨浠�
      */
     DrawingManager.prototype._bindCircle = function() {
 
         var me           = this,
             map          = this._map,
             mask         = this._mask,
             circle       = null,
             centerPoint  = null; //鍦嗙殑涓績鐐�
 
         /**
          * 寮€濮嬬粯鍒跺渾褰�
          */
         var startAction = function (e) {
             if(me.controlButton == "right" && (e.button == 1 || e.button==0)){
                 return ;
             }
             centerPoint = e.point;
             circle = new BMap.Circle(centerPoint, 0, me.circleOptions);
             map.addOverlay(circle);
             mask.enableEdgeMove();
             mask.addEventListener('mousemove', moveAction);
             baidu.on(document, 'mouseup', endAction);
         }
 
         /**
          * 缁樺埗鍦嗗舰杩囩▼涓紝榧犳爣绉诲姩杩囩▼鐨勪簨浠�
          */
         var moveAction = function(e) {
             circle.setRadius(me._map.getDistance(centerPoint, e.point));
         }
 
         /**
          * 缁樺埗鍦嗗舰缁撴潫
          */
         var endAction = function (e) {
             var calculate = me._calculate(circle, e.point);
             me._dispatchOverlayComplete(circle, calculate);
             centerPoint = null;
             mask.disableEdgeMove();
             mask.removeEventListener('mousemove', moveAction);
             baidu.un(document, 'mouseup', endAction);
         }
 
         /**
          * 榧犳爣鐐瑰嚮璧峰鐐�
          */
         var mousedownAction = function (e) {
             baidu.preventDefault(e);
             baidu.stopBubble(e);
             if(me.controlButton == "right" && e.button == 1){
                 return ;
             }
             if (centerPoint == null) {
                 startAction(e);
             } 
         }
 
         mask.addEventListener('mousedown', mousedownAction);
     }
 
     /**
      * 鐢荤嚎鍜岀敾澶氳竟褰㈢浉浼兼€ф瘮杈冨ぇ锛屽叕鐢ㄤ竴涓柟娉�
      */
     DrawingManager.prototype._bindPolylineOrPolygon = function() {
 
         var me           = this,
             map          = this._map,
             mask         = this._mask,
             points       = [],   //鐢ㄦ埛缁樺埗鐨勭偣
             drawPoint    = null; //瀹為檯闇€瑕佺敾鍦ㄥ湴鍥句笂鐨勭偣
             overlay      = null,
             isBinded     = false;
 
         /**
          * 榧犳爣鐐瑰嚮鐨勪簨浠�
          */
         var startAction = function (e) {
             if(me.controlButton == "right" && (e.button == 1 || e.button==0)){
                 return ;
             }
             points.push(e.point);
             drawPoint = points.concat(points[points.length - 1]);
             if (points.length == 1) {
                 if (me._drawingType == BMAP_DRAWING_POLYLINE) {
 
                     overlay = new BMap.Polyline(drawPoint, me.polylineOptions);
                 } else if (me._drawingType == BMAP_DRAWING_POLYGON) {
                     overlay = new BMap.Polygon(drawPoint, me.polygonOptions);
                 }
                 map.addOverlay(overlay);
             } else {
                 overlay.setPath(drawPoint);
             }
             if (!isBinded) {
                 isBinded = true;
                 mask.enableEdgeMove();
                 mask.addEventListener('mousemove', mousemoveAction);
                 mask.addEventListener('dblclick', dblclickAction);
             }
         }
 
         /**
          * 榧犳爣绉诲姩杩囩▼鐨勪簨浠�
          */
         var mousemoveAction = function(e) {
             overlay.setPositionAt(drawPoint.length - 1, e.point);
         }
 
         /**
          * 榧犳爣鍙屽嚮鐨勪簨浠�
          */
         var dblclickAction = function (e) {
             baidu.stopBubble(e);
             isBinded = false;
             mask.disableEdgeMove();
             mask.removeEventListener('mousedown',startAction);
             mask.removeEventListener('mousemove', mousemoveAction);
             mask.removeEventListener('dblclick', dblclickAction);
             //console.log(me.controlButton);
             if(me.controlButton == "right"){
                 points.push(e.point);
             }
             else if(baidu.ie <= 8){
             }else{
                 points.pop();
             }
             //console.log(points.length);
             overlay.setPath(points);
             var calculate = me._calculate(overlay, points.pop());
             me._dispatchOverlayComplete(overlay, calculate);
             points.length = 0;
             drawPoint.length = 0;
             me.close();
 
         }
         
         mask.addEventListener('mousedown', startAction);
 
         //鍙屽嚮鏃跺€欎笉鏀惧ぇ鍦板浘绾у埆
         mask.addEventListener('dblclick', function(e){
             baidu.stopBubble(e);
         });
     }
 
     /**
      * 缁戝畾榧犳爣鐢荤煩褰㈢殑浜嬩欢
      */
     DrawingManager.prototype._bindRectangle = function() {
 
         var me           = this,
             map          = this._map,
             mask         = this._mask,
             polygon      = null,
             startPoint   = null;
 
         /**
          * 寮€濮嬬粯鍒剁煩褰�
          */
         var startAction = function (e) {
             baidu.stopBubble(e);
             baidu.preventDefault(e);
             if(me.controlButton == "right" && (e.button == 1 || e.button==0)){
                 return ;
             }
             startPoint = e.point;
             var endPoint = startPoint;
             polygon = new BMap.Polygon(me._getRectanglePoint(startPoint, endPoint), me.rectangleOptions);
             map.addOverlay(polygon);
             mask.enableEdgeMove();
             mask.addEventListener('mousemove', moveAction);
             baidu.on(document, 'mouseup', endAction);
         }
 
         /**
          * 缁樺埗鐭╁舰杩囩▼涓紝榧犳爣绉诲姩杩囩▼鐨勪簨浠�
          */
         var moveAction = function(e) {
             polygon.setPath(me._getRectanglePoint(startPoint, e.point));
         }
 
         /**
          * 缁樺埗鐭╁舰缁撴潫
          */
         var endAction = function (e) {
             var calculate = me._calculate(polygon, polygon.getPath()[2]);
             me._dispatchOverlayComplete(polygon, calculate);
             startPoint = null;
             mask.disableEdgeMove();
             mask.removeEventListener('mousemove', moveAction);
             baidu.un(document, 'mouseup', endAction);
         }
 
         mask.addEventListener('mousedown', startAction);
     }
 
     /**
      * 娣诲姞鏄剧ず鎵€缁樺埗鍥惧舰鐨勯潰绉垨鑰呴暱搴�
      * @param {overlay} 瑕嗙洊鐗�
      * @param {point} 鏄剧ず鐨勪綅缃�
      */
     DrawingManager.prototype._calculate = function (overlay, point) {
         var result = {
             data  : 0,    //璁＄畻鍑烘潵鐨勯暱搴︽垨闈㈢Н
             label : null  //鏄剧ず闀垮害鎴栭潰绉殑label瀵硅薄
         };
         if (this._enableCalculate && BMapLib.GeoUtils) {
             var type = overlay.toString();
             //涓嶅悓瑕嗙洊鐗╄皟鐢ㄤ笉鍚岀殑璁＄畻鏂规硶
             switch (type) {
                 case "[object Polyline]":
                     result.data = BMapLib.GeoUtils.getPolylineDistance(overlay);
                     break;
                 case "[object Polygon]":
                     result.data = BMapLib.GeoUtils.getPolygonArea(overlay);
                     break;
                 case "[object Circle]":
                     var radius = overlay.getRadius();
                     result.data = Math.PI * radius * radius;
                     break;
             }
             //涓€鍦烘儏鍐靛鐞�
             if (!result.data || result.data < 0) {
                 result.data = 0;
             } else {
                 //淇濈暀2浣嶅皬鏁颁綅
                 result.data = result.data.toFixed(2);
             }
             result.label = this._addLabel(point, result.data);
         }
         return result;
     }
 
     /**
      * 寮€鍚祴璺濆拰娴嬮潰鍔熻兘闇€瑕佷緷璧栦簬GeoUtils搴�
      * 鎵€浠ヨ繖閲屽垽鏂敤鎴锋槸鍚﹀凡缁忓姞杞�,鑻ユ湭鍔犺浇鍒欑敤js鍔ㄦ€佸姞杞�
      */
     DrawingManager.prototype._addGeoUtilsLibrary = function () {
         if (!BMapLib.GeoUtils) {
             var script = document.createElement('script');
             script.setAttribute("type", "text/javascript");
             script.setAttribute("src", '/baidu_map_library/GeoUtils_min.js');
             document.body.appendChild(script);
         }
     }
 
     /**
      * 鍚戝湴鍥句腑娣诲姞鏂囨湰鏍囨敞
      * @param {Point}
      * @param {String} 鎵€浠ユ樉绀虹殑鍐呭
      */
     DrawingManager.prototype._addLabel = function (point, content) {
         var label = new BMap.Label(content, {
             position: point
         });
         this._map.addOverlay(label);
         return label;
     }
 
     /**
      * 鏍规嵁璧风粓鐐硅幏鍙栫煩褰㈢殑鍥涗釜椤剁偣
      * @param {Point} 璧风偣
      * @param {Point} 缁堢偣
      */
     DrawingManager.prototype._getRectanglePoint = function (startPoint, endPoint) {
         return [
             new BMap.Point(startPoint.lng,startPoint.lat),
             new BMap.Point(endPoint.lng,startPoint.lat),
             new BMap.Point(endPoint.lng,endPoint.lat),
             new BMap.Point(startPoint.lng,endPoint.lat)
         ];
     }
 
     /**
      * 娲惧彂浜嬩欢
      */
     DrawingManager.prototype._dispatchOverlayComplete = function (overlay, calculate) {
         var options = {
             'overlay'     : overlay,
             'drawingMode' : this._drawingType
         };
         if (calculate) {
             options.calculate = calculate.data || null;
             options.label = calculate.label || null;
         }
         this.dispatchEvent(this._drawingType + 'complete', overlay);
         this.dispatchEvent('overlaycomplete', options);
     }
 
     /**
      * 鍒涘缓閬僵瀵硅薄
      */
     function Mask(){
         /**
          * 榧犳爣鍒板湴鍥捐竟缂樼殑鏃跺€欐槸鍚﹁嚜鍔ㄥ钩绉诲湴鍥�
          */
         this._enableEdgeMove = false;
     }
 
     Mask.prototype = new BMap.Overlay();
 
     /**
      * 杩欓噷涓嶄娇鐢╝pi涓殑鑷畾涔変簨浠讹紝鏄负浜嗘洿鐏垫椿浣跨敤
      */
     Mask.prototype.dispatchEvent = baidu.lang.Class.prototype.dispatchEvent;
     Mask.prototype.addEventListener = baidu.lang.Class.prototype.addEventListener;
     Mask.prototype.removeEventListener = baidu.lang.Class.prototype.removeEventListener;
 
     Mask.prototype.initialize = function(map){
         var me = this;
         this._map = map;
         var div = this.container = document.createElement("div");
         var size = this._map.getSize();
         div.style.cssText = "position:absolute;background:url(about:blank);cursor:crosshair;width:" + size.width + "px;height:" + size.height + "px";
         this._map.addEventListener('resize', function(e) {
             me._adjustSize(e.size);
         });
         this._map.getPanes().floatPane.appendChild(div);
         this._bind();
         return div; 
     };
 
     Mask.prototype.draw = function() {
         var map   = this._map,
             point = map.pixelToPoint(new BMap.Pixel(0, 0)),
             pixel = map.pointToOverlayPixel(point);
         this.container.style.left = pixel.x + "px";
         this.container.style.top  = pixel.y + "px"; 
     };
 
     /**
      * 寮€鍚紶鏍囧埌鍦板浘杈圭紭锛岃嚜鍔ㄥ钩绉诲湴鍥�
      */
     Mask.prototype.enableEdgeMove = function() {
         this._enableEdgeMove = true;
     }
 
     /**
      * 鍏抽棴榧犳爣鍒板湴鍥捐竟缂橈紝鑷姩骞崇Щ鍦板浘
      */
     Mask.prototype.disableEdgeMove = function() {
         clearInterval(this._edgeMoveTimer);
         this._enableEdgeMove = false;
     }
 
     /**
      * 缁戝畾浜嬩欢,娲惧彂鑷畾涔変簨浠�
      */
     Mask.prototype._bind = function() {
 
         var me = this,
             map = this._map,
             container = this.container,
             lastMousedownXY = null,
             lastClickXY = null;
 
         /**
          * 鏍规嵁event瀵硅薄鑾峰彇榧犳爣鐨剎y鍧愭爣瀵硅薄
          * @param {Event}
          * @return {Object} {x:e.x, y:e.y}
          */
         var getXYbyEvent = function(e){
             return {
                 x : e.clientX,
                 y : e.clientY
             }
         };
 
         var domEvent = function(e) {
             var type = e.type;
                 e = baidu.getEvent(e);
                 point = me.getDrawPoint(e); //褰撳墠榧犳爣鎵€鍦ㄧ偣鐨勫湴鐞嗗潗鏍�
 
             var dispatchEvent = function(type) {
                 e.point = point;
                 me.dispatchEvent(e);
             }
 
             if (type == "mousedown") {
                 lastMousedownXY = getXYbyEvent(e);
             }
 
             var nowXY = getXYbyEvent(e);
             //click缁忚繃涓€浜涚壒娈婂鐞嗘淳鍙戯紝鍏朵粬鍚屼簨浠舵寜姝ｅ父鐨刣om浜嬩欢娲惧彂
             if (type == "click") {
                 //榧犳爣鐐瑰嚮杩囩▼涓嶈繘琛岀Щ鍔ㄦ墠娲惧彂click鍜宒blclick
                 if (Math.abs(nowXY.x - lastMousedownXY.x) < 5 && Math.abs(nowXY.y - lastMousedownXY.y) < 5 ) {
                     if (!lastClickXY || !(Math.abs(nowXY.x - lastClickXY.x) < 5 && Math.abs(nowXY.y - lastClickXY.y) < 5)) {
                         dispatchEvent('click');
                         lastClickXY = getXYbyEvent(e);
                     } else {
                         lastClickXY = null;
                     }
                 }
             } else {
                 dispatchEvent(type);
             }
         }
 
         /**
          * 灏嗕簨浠堕兘閬僵灞傜殑浜嬩欢閮界粦瀹氬埌domEvent鏉ュ鐞�
          */
         var events = ['click', 'mousedown', 'mousemove', 'mouseup', 'dblclick'],
             index = events.length;
         while (index--) {
             baidu.on(container, events[index], domEvent);
         }
 
         //榧犳爣绉诲姩杩囩▼涓紝鍒板湴鍥捐竟缂樺悗鑷姩骞崇Щ鍦板浘
         baidu.on(container, 'mousemove', function(e) {
             if (me._enableEdgeMove) {
                 me.mousemoveAction(e);
             }
         });
     };
 
     //榧犳爣绉诲姩杩囩▼涓紝鍒板湴鍥捐竟缂樺悗鑷姩骞崇Щ鍦板浘
     Mask.prototype.mousemoveAction = function(e) {
         function getClientPosition(e) {
             var clientX = e.clientX,
                 clientY = e.clientY;
             if (e.changedTouches) {
                 clientX = e.changedTouches[0].clientX;
                 clientY = e.changedTouches[0].clientY;
             }
             return new BMap.Pixel(clientX, clientY);
         }
 
         var map       = this._map,
             me        = this,
             pixel     = map.pointToPixel(this.getDrawPoint(e)),
             clientPos = getClientPosition(e),
             offsetX   = clientPos.x - pixel.x,
             offsetY   = clientPos.y - pixel.y;
         pixel = new BMap.Pixel((clientPos.x - offsetX), (clientPos.y - offsetY));
         this._draggingMovePixel = pixel;
         var point = map.pixelToPoint(pixel),
             eventObj = {
                 pixel: pixel,
                 point: point
             };
         // 鎷栨嫿鍒板湴鍥捐竟缂樼Щ鍔ㄥ湴鍥�
         this._panByX = this._panByY = 0;
         if (pixel.x <= 20 || pixel.x >= map.width - 20
             || pixel.y <= 50 || pixel.y >= map.height - 10) {
             if (pixel.x <= 20) {
                 this._panByX = 8;
             } else if (pixel.x >= map.width - 20) {
                 this._panByX = -8;
             }
             if (pixel.y <= 50) {
                 this._panByY = 8;
             } else if (pixel.y >= map.height - 10) {
                 this._panByY = -8;
             }
             if (!this._edgeMoveTimer) {
                 this._edgeMoveTimer = setInterval(function(){
                     map.panBy(me._panByX, me._panByY, {"noAnimation": true});
                 }, 30);
             }
         } else {
             if (this._edgeMoveTimer) {
                 clearInterval(this._edgeMoveTimer);
                 this._edgeMoveTimer = null;
             }
         }
     }
 
     /*
      * 璋冩暣澶у皬
      * @param {Size}
      */
     Mask.prototype._adjustSize = function(size) {
         this.container.style.width  = size.width + 'px';
         this.container.style.height = size.height + 'px';
     };
 
     /**
      * 鑾峰彇褰撳墠缁樺埗鐐圭殑鍦扮悊鍧愭爣
      *
      * @param {Event} e e瀵硅薄
      * @return Point瀵硅薄鐨勪綅缃俊鎭�
      */
     Mask.prototype.getDrawPoint = function(e) {
         
         var map = this._map,
         trigger = baidu.getTarget(e),
         x = e.offsetX || e.layerX || 0,
         y = e.offsetY || e.layerY || 0;
         if (trigger.nodeType != 1) trigger = trigger.parentNode;
         while (trigger && trigger != map.getContainer()) {
             if (!(trigger.clientWidth == 0 &&
                 trigger.clientHeight == 0 &&
                 trigger.offsetParent && trigger.offsetParent.nodeName == 'TD')) {
                 x += trigger.offsetLeft || 0;
                 y += trigger.offsetTop || 0;
             }
             trigger = trigger.offsetParent;
         }
         var pixel = new BMap.Pixel(x, y);
         var point = map.pixelToPoint(pixel);
         return point;
 
     }
 
     /**
      * 缁樺埗宸ュ叿闈㈡澘锛岃嚜瀹氫箟鎺т欢
      */
     function DrawingTool(drawingManager, drawingToolOptions) {
         this.drawingManager = drawingManager;
 
         drawingToolOptions = this.drawingToolOptions = drawingToolOptions || {};
         // 榛樿鍋滈潬浣嶇疆鍜屽亸绉婚噺
         this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
         this.defaultOffset = new BMap.Size(10, 10);
 
         //榛樿鎵€鏈夊伐鍏锋爮閮芥樉绀�
         this.defaultDrawingModes = [
             BMAP_DRAWING_MARKER,
             BMAP_DRAWING_CIRCLE,
             BMAP_DRAWING_POLYLINE,
             BMAP_DRAWING_POLYGON,
             BMAP_DRAWING_RECTANGLE
         ];
         //宸ュ叿鏍忓彲鏄剧ず鐨勭粯鍒舵ā寮�
         if (drawingToolOptions.drawingModes) {
             this.drawingModes = drawingToolOptions.drawingModes;
         } else {
             this.drawingModes = this.defaultDrawingModes
         }
 
         //鐢ㄦ埛璁剧疆鍋滈潬浣嶇疆鍜屽亸绉婚噺
         if (drawingToolOptions.anchor) {
             this.setAnchor(drawingToolOptions.anchor);
         }
         if (drawingToolOptions.offset) {
             this.setOffset(drawingToolOptions.offset);
         }
     }
 
     // 閫氳繃JavaScript鐨刾rototype灞炴€х户鎵夸簬BMap.Control
     DrawingTool.prototype = new BMap.Control();
 
     // 鑷畾涔夋帶浠跺繀椤诲疄鐜拌嚜宸辩殑initialize鏂规硶,骞朵笖灏嗘帶浠剁殑DOM鍏冪礌杩斿洖
     // 鍦ㄦ湰鏂规硶涓垱寤轰釜div鍏冪礌浣滀负鎺т欢鐨勫鍣�,骞跺皢鍏舵坊鍔犲埌鍦板浘瀹瑰櫒涓�
     DrawingTool.prototype.initialize = function(map){
         // 鍒涘缓涓€涓狣OM鍏冪礌
         var container = this.container = document.createElement("div");
         container.className = "BMapLib_Drawing";
         //鐢ㄦ潵璁剧疆澶栧眰杈规闃村奖
         var panel = this.panel = document.createElement("div");
         panel.className = "BMapLib_Drawing_panel";
         if (this.drawingToolOptions && this.drawingToolOptions.scale) {
             this._setScale(this.drawingToolOptions.scale);
         }
         container.appendChild(panel);
         // 娣诲姞鍐呭
         panel.innerHTML = this._generalHtml();
         //缁戝畾浜嬩欢
         this._bind(panel);
         // 娣诲姞DOM鍏冪礌鍒板湴鍥句腑
         map.getContainer().appendChild(container);
         // 灏咲OM鍏冪礌杩斿洖
         return container;
     }
 
     //鐢熸垚宸ュ叿鏍忕殑html鍏冪礌
     DrawingTool.prototype._generalHtml = function(map){
 
         //榧犳爣缁忚繃宸ュ叿鏍忎笂鐨勬彁绀轰俊鎭�
         var tips = {};
         tips["hander"]               = "鎷栧姩鍦板浘";
         tips[BMAP_DRAWING_MARKER]    = "鐢荤偣";
         tips[BMAP_DRAWING_CIRCLE]    = "鐢诲渾";
         tips[BMAP_DRAWING_POLYLINE]  = "鐢绘姌绾�";
         tips[BMAP_DRAWING_POLYGON]   = "鐢诲杈瑰舰";
         tips[BMAP_DRAWING_RECTANGLE] = "鐢荤煩褰�";
 
         var getItem = function(className, drawingType) {
             return '<a class="' + className + '" drawingType="' + drawingType + '" href="javascript:void(0)" title="' + tips[drawingType] + '" onfocus="this.blur()"></a>';
         }
 
         var html = [];
         html.push(getItem("BMapLib_box BMapLib_hander", "hander"));
         for (var i = 0, len = this.drawingModes.length; i < len; i++) {
             var classStr = 'BMapLib_box BMapLib_' + this.drawingModes[i];
             if (i == len-1) {
                 classStr += ' BMapLib_last';
             }
             html.push(getItem(classStr, this.drawingModes[i]));
         }
         return html.join('');
     }
 
     /**
      * 璁剧疆宸ュ叿鏍忕殑缂╂斁姣斾緥
      */
     DrawingTool.prototype._setScale = function(scale){
         var width  = 390,
             height = 50,
             ml = -parseInt((width - width * scale) / 2, 10),
             mt = -parseInt((height - height * scale) / 2, 10);
         this.container.style.cssText = [
             "-moz-transform: scale(" + scale + ");",
             "-o-transform: scale(" + scale + ");",
             "-webkit-transform: scale(" + scale + ");",
             "transform: scale(" + scale + ");",
             "margin-left:" + ml + "px;",
             "margin-top:" + mt + "px;",
             "*margin-left:0px;", //ie6銆�7
             "*margin-top:0px;",  //ie6銆�7
             "margin-left:0px\\0;", //ie8
             "margin-top:0px\\0;",  //ie8
             //ie涓嬩娇鐢ㄦ护闀�
             "filter: progid:DXImageTransform.Microsoft.Matrix(",
             "M11=" + scale + ",",
             "M12=0,",
             "M21=0,",
             "M22=" + scale + ",",
             "SizingMethod='auto expand');"
         ].join('');
     }
 
     //缁戝畾宸ュ叿鏍忕殑浜嬩欢
     DrawingTool.prototype._bind = function(panel){
         var me = this;
         baidu.on(this.panel, 'click', function (e) {
             var target = baidu.getTarget(e);
             var drawingType = target.getAttribute('drawingType');
             me.setStyleByDrawingMode(drawingType);
             me._bindEventByDraingMode(drawingType);
         });
     }
 
     //璁剧疆宸ュ叿鏍忓綋鍓嶉€変腑鐨勯」鏍峰紡
     DrawingTool.prototype.setStyleByDrawingMode = function(drawingType){
         if (!drawingType) {
             return;
         }
         var boxs = this.panel.getElementsByTagName("a");
         for (var i = 0, len = boxs.length; i < len; i++) {
             var box = boxs[i];
             if (box.getAttribute('drawingType') == drawingType) {
                 var classStr = "BMapLib_box BMapLib_" + drawingType + "_hover";
                 if (i == len - 1) {
                     classStr += " BMapLib_last";
                 }
                 box.className = classStr;
             } else {
                 box.className = box.className.replace(/_hover/, "");
             }
         }
     }
 
     //璁剧疆宸ュ叿鏍忓綋鍓嶉€変腑鐨勯」鏍峰紡
     DrawingTool.prototype._bindEventByDraingMode = function(drawingType){
         var me = this;
         var drawingManager = this.drawingManager;
         //鐐瑰湪鎷栨嫿鍦板浘鐨勬寜閽笂
         if (drawingType == "hander") {
             drawingManager.close();
             drawingManager._map.enableDoubleClickZoom();
         } else {
             drawingManager.setDrawingMode(drawingType);
             drawingManager.open();
             drawingManager._map.disableDoubleClickZoom();
         }
     }
 
     //鐢ㄦ潵瀛樺偍鐢ㄦ埛瀹炰緥鍖栧嚭鏉ョ殑drawingmanager瀵硅薄
     var instances = [];
 
     /*
      * 鍏抽棴鍏朵粬瀹炰緥鐨勭粯鍒舵ā寮�
      * @param {DrawingManager} 褰撳墠鐨勫疄渚�
      */
     function closeInstanceExcept(instance) {
         var index = instances.length;
         while (index--) {
             if (instances[index] != instance) {
                 instances[index].close();
             }
         }
     }
 
 })();