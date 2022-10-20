/**
 * @fileoverview 鐧惧害鍦板浘鐨勫瘜Marker绫伙紝瀵瑰寮€鏀俱€�
 * 鍏佽鐢ㄦ埛鍦ㄨ嚜瀹氫箟涓板瘜鐨凪arker灞曠幇锛屽苟娣诲姞鐐瑰嚮銆佸弻鍑汇€佹嫋鎷界瓑浜嬩欢銆�
 * 鍩轰簬Baidu Map API 1.2銆�
 *
 * @author Baidu Map Api Group 
 * @version 1.2
 */
/** 
 * @namespace BMap鐨勬墍鏈塴ibrary绫诲潎鏀惧湪BMapLib鍛藉悕绌洪棿涓�
 */
 var BMapLib = window.BMapLib = BMapLib || {};

 (function () {
     /**
      * 澹版槑baidu鍖�
      */
     var baidu = baidu || {
         guid: "$BAIDU$"
     };
 
     (function () {
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
         baidu.lang.guid = function () {
             return "TANGRAM__" + (window[baidu.guid]._counter++).toString(36);
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
          * @param {string} guid	瀵硅薄鐨勫敮涓€鏍囪瘑
          * @meta standard
          * @remark baidu.lang.Class鍜屽畠鐨勫瓙绫荤殑瀹炰緥鍧囧寘鍚竴涓叏灞€鍞竴鐨勬爣璇唃uid銆�
          * guid鏄湪鏋勯€犲嚱鏁颁腑鐢熸垚鐨勶紝鍥犳锛岀户鎵胯嚜baidu.lang.Class鐨勭被搴旇鐩存帴鎴栬€呴棿鎺ヨ皟鐢ㄥ畠鐨勬瀯閫犲嚱鏁般€�<br>
          * baidu.lang.Class鐨勬瀯閫犲嚱鏁颁腑浜х敓guid鐨勬柟寮忓彲浠ヤ繚璇乬uid鐨勫敮涓€鎬э紝鍙婃瘡涓疄渚嬮兘鏈変竴涓叏灞€鍞竴鐨刧uid銆�
          */
         baidu.lang.Class = function (guid) {
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
         baidu.isString = baidu.lang.isString;
 
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
          * 鑷畾涔夌殑浜嬩欢瀵硅薄銆�
          * @function
          * @name baidu.lang.Event
          * @grammar baidu.lang.Event(type[, target])
          * @param {string} type	 浜嬩欢绫诲瀷鍚嶇О銆備负浜嗘柟渚垮尯鍒嗕簨浠跺拰涓€涓櫘閫氱殑鏂规硶锛屼簨浠剁被鍨嬪悕绉板繀椤讳互"on"(灏忓啓)寮€澶淬€�
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
          * @param 	{string}   type         鑷畾涔変簨浠剁殑鍚嶇О
          * @param 	{Function} handler      鑷畾涔変簨浠惰瑙﹀彂鏃跺簲璇ヨ皟鐢ㄧ殑鍥炶皟鍑芥暟
          * @param 	{string}   [key]		涓轰簨浠剁洃鍚嚱鏁版寚瀹氱殑鍚嶇О锛屽彲鍦ㄧЩ闄ゆ椂浣跨敤銆傚鏋滀笉鎻愪緵锛屾柟娉曚細榛樿涓哄畠鐢熸垚涓€涓叏灞€鍞竴鐨刱ey銆�
          * @remark 	浜嬩欢绫诲瀷鍖哄垎澶у皬鍐欍€傚鏋滆嚜瀹氫箟浜嬩欢鍚嶇О涓嶆槸浠ュ皬鍐�"on"寮€澶达紝璇ユ柟娉曚細缁欏畠鍔犱笂"on"鍐嶈繘琛屽垽鏂紝鍗�"click"鍜�"onclick"浼氳璁や负鏄悓涓€绉嶄簨浠躲€� 
          */
         baidu.lang.Class.prototype.addEventListener = function (type, handler, key) {
             if (!baidu.lang.isFunction(handler)) {
                 return;
             }!this.__listeners && (this.__listeners = {});
             var t = this.__listeners,
                 id;
             if (typeof key == "string" && key) {
                 if (/[^\w\-]/.test(key)) {
                     throw ("nonstandard key:" + key);
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
          * @remark 	濡傛灉绗簩涓弬鏁癶andler娌℃湁琚粦瀹氬埌瀵瑰簲鐨勮嚜瀹氫箟浜嬩欢涓紝浠€涔堜篃涓嶅仛銆�
          */
         baidu.lang.Class.prototype.removeEventListener = function (type, handler) {
             if (baidu.lang.isFunction(handler)) {
                 handler = handler.hashCode;
             } else if (!baidu.lang.isString(handler)) {
                 return;
             }!this.__listeners && (this.__listeners = {});
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
          * @param {baidu.lang.Event|String} event 	Event瀵硅薄锛屾垨浜嬩欢鍚嶇О(1.1.1璧锋敮鎸�)
          * @param {Object} options 鎵╁睍鍙傛暟,鎵€鍚睘鎬ч敭鍊间細鎵╁睍鍒癊vent瀵硅薄涓�(1.2璧锋敮鎸�)
          * @remark 澶勭悊浼氳皟鐢ㄩ€氳繃addEventListenr缁戝畾鐨勮嚜瀹氫箟浜嬩欢鍥炶皟鍑芥暟涔嬪锛岃繕浼氳皟鐢ㄧ洿鎺ョ粦瀹氬埌瀵硅薄涓婇潰鐨勮嚜瀹氫箟浜嬩欢銆�
          * 渚嬪锛�<br>
          * myobj.onMyEvent = function(){}<br>
          * myobj.addEventListener("onMyEvent", function(){});
          */
         baidu.lang.Class.prototype.dispatchEvent = function (event, options) {
             if (baidu.lang.isString(event)) {
                 event = new baidu.lang.Event(event);
             }!this.__listeners && (this.__listeners = {});
             options = options || {};
             for (var i in options) {
                 event[i] = options[i];
             }
             var i, t = this.__listeners,
                 p = event.type;
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
          * @ignore
          * @namespace baidu.dom 
          * 鎿嶄綔dom鐨勬柟娉�
          */
         baidu.dom = baidu.dom || {};
 
         /**
          * 浠庢枃妗ｄ腑鑾峰彇鎸囧畾鐨凞OM鍏冪礌
          * **鍐呴儴鏂规硶**
          * 
          * @param {string|HTMLElement} id 鍏冪礌鐨刬d鎴朌OM鍏冪礌
          * @meta standard
          * @return {HTMLElement} DOM鍏冪礌锛屽鏋滀笉瀛樺湪锛岃繑鍥瀗ull锛屽鏋滃弬鏁颁笉鍚堟硶锛岀洿鎺ヨ繑鍥炲弬鏁�
          */
         baidu.dom._g = function (id) {
             if (baidu.lang.isString(id)) {
                 return document.getElementById(id);
             }
             return id;
         };
         baidu._g = baidu.dom._g;
 
         /**
          * @ignore
          * @namespace baidu.event 灞忚斀娴忚鍣ㄥ樊寮傛€х殑浜嬩欢灏佽銆�
          * @property target 	浜嬩欢鐨勮Е鍙戝厓绱�
          * @property pageX 		榧犳爣浜嬩欢鐨勯紶鏍噚鍧愭爣
          * @property pageY 		榧犳爣浜嬩欢鐨勯紶鏍噛鍧愭爣
          * @property keyCode 	閿洏浜嬩欢鐨勯敭鍊�
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
          * 
         1. 涓嶆敮鎸佽法娴忚鍣ㄧ殑榧犳爣婊氳疆浜嬩欢鐩戝惉鍣ㄦ坊鍔�<br>
         2. 鏀规柟娉曚笉涓虹洃鍚櫒鐏屽叆浜嬩欢瀵硅薄锛屼互闃叉璺╥frame浜嬩欢鎸傝浇鐨勪簨浠跺璞¤幏鍙栧け璐�
             
          * @shortcut on
          * @meta standard
          * @see baidu.event.un
          * @returns {HTMLElement|window} 鐩爣鍏冪礌
          */
         baidu.event.on = function (element, type, listener) {
             type = type.replace(/^on/i, '');
             element = baidu.dom._g(element);
 
             var realListener = function (ev) {
                     listener.call(element, ev);
                 },
                 lis = baidu.event._listeners,
                 filter = baidu.event._eventFilter,
                 afterFilter, realType = type;
             type = type.toLowerCase();
             if (filter && filter[type]) {
                 afterFilter = filter[type](element, type, realListener);
                 realType = afterFilter.type;
                 realListener = afterFilter.listener;
             }
             if (element.addEventListener) {
                 element.addEventListener(realType, realListener, false);
             } else if (element.attachEvent) {
                 element.attachEvent('on' + realType, realListener);
             }
             lis[lis.length] = [element, type, listener, realListener, realType];
             return element;
         };
         baidu.on = baidu.event.on;
 
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
          * @see baidu.event.on
          *             
          * @returns {HTMLElement|window} 鐩爣鍏冪礌
          */
         baidu.event.un = function (element, type, listener) {
             element = baidu.dom._g(element);
             type = type.replace(/^on/i, '').toLowerCase();
 
             var lis = baidu.event._listeners,
                 len = lis.length,
                 isRemoveAll = !listener,
                 item, realType, realListener;
             while (len--) {
                 item = lis[len];
                 if (item[1] === type && item[0] === element && (isRemoveAll || item[2] === listener)) {
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
         baidu.un = baidu.event.un;
 
         /**
          * 闃绘浜嬩欢鐨勯粯璁よ涓�
          * @name baidu.event.preventDefault
          * @function
          * @grammar baidu.event.preventDefault(event)
          * @param {Event} event 浜嬩欢瀵硅薄
          * @meta standard
          */
         baidu.preventDefault = baidu.event.preventDefault = function (event) {
             if (event.preventDefault) {
                 event.preventDefault();
             } else {
                 event.returnValue = false;
             }
         };
     })();
 
     /** 
      * @exports RichMarker as BMapLib.RichMarker 
      */
     var RichMarker =
     /**
      * RichMarker绫荤殑鏋勯€犲嚱鏁�
      * @class 瀵孧arker瀹氫箟绫伙紝瀹炵幇涓板瘜鐨凪arker灞曠幇鏁堟灉銆�
      * 
      * @constructor
      * @param {String | HTMLElement} content 鐢ㄦ埛鑷畾涔夌殑Marker鍐呭锛屽彲浠ユ槸瀛楃涓诧紝涔熷彲浠ユ槸dom鑺傜偣
      * @param {BMap.Point} position marker鐨勪綅缃�
      * @param {Json} RichMarkerOptions 鍙€夌殑杈撳叆鍙傛暟锛岄潪蹇呭～椤广€傚彲杈撳叆閫夐」鍖呮嫭锛�<br />
      * {"<b>anchor</b>" : {BMap.Size} Marker鐨勭殑浣嶇疆鍋忕Щ鍊�,
      * <br />"<b>enableDragging</b>" : {Boolean} 鏄惁鍚敤鎷栨嫿锛岄粯璁や负false}
      *
      * @example <b>鍙傝€冪ず渚嬶細</b>
      * var map = new BMap.Map("container");
      * map.centerAndZoom(new BMap.Point(116.309965, 40.058333), 17);
      * var htm = "&lt;div style='background:#E7F0F5;color:#0082CB;border:1px solid #333'&gt;"
      *              +     "娆㈣繋浣跨敤鐧惧害鍦板浘锛�"
      *              +     "&lt;img src='http://map.baidu.com/img/logo-map.gif' border='0' /&gt;"
      *              + "&lt;/div&gt;";
      * var point = new BMap.Point(116.30816, 40.056863);
      * var myRichMarkerObject = new BMapLib.RichMarker(htm, point, {"anchor": new BMap.Size(-72, -84), "enableDragging": true});
      * map.addOverlay(myRichMarkerObject);
      */
     BMapLib.RichMarker = function (content, position, opts) {
             if (!content || !position || !(position instanceof BMap.Point)) {
                 return;
             }
 
             /**
              * map瀵硅薄
              * @private
              * @type {Map}
              */
             this._map = null;
 
             /**
              * Marker鍐呭
              * @private
              * @type {String | HTMLElement}
              */
             this._content = content;
 
             /**
              * marker鏄剧ず浣嶇疆
              * @private
              * @type {BMap.Point}
              */
             this._position = position;
 
             /**
              * marker涓诲鍣�
              * @private
              * @type {HTMLElement}
              */
             this._container = null;
 
             /**
              * marker涓诲鍣ㄧ殑灏哄
              * @private
              * @type {BMap.Size}
              */
             this._size = null;
 
             opts = opts || {};
             /**
              * _opts鏄粯璁ゅ弬鏁拌祴鍊笺€�
              * 涓嬮潰閫氳繃鐢ㄦ埛杈撳叆鐨刼pts锛屽榛樿鍙傛暟璧嬪€�
              * @private
              * @type {Json}
              */
             this._opts = baidu.extend(
             baidu.extend(this._opts || {}, {
 
                 /**
                  * Marker鏄惁鍙互鎷栨嫿
                  * @private
                  * @type {Boolean}
                  */
                 enableDragging: false,
 
                 /**
                  * Marker鐨勫亸绉婚噺
                  * @private
                  * @type {BMap.Size}
                  */
                 anchor: new BMap.Size(0, 0)
             }), opts);
         }
 
         // 缁ф壙瑕嗙洊鐗╃被
         RichMarker.prototype = new BMap.Overlay();
 
     /**
      * 鍒濆鍖栵紝瀹炵幇鑷畾涔夎鐩栫墿鐨刬nitialize鏂规硶
      * 涓昏鐢熸垚Marker鐨勪富瀹瑰櫒锛屽～鍏呰嚜瀹氫箟鐨勫唴瀹癸紝骞堕檮鍔犱簨浠�
      * 
      * @private
      * @param {BMap} map map瀹炰緥瀵硅薄
      * @return {Dom} 杩斿洖鑷畾涔夌敓鎴愮殑dom鑺傜偣
      */
     RichMarker.prototype.initialize = function (map) {
         var me = this,
             div = me._container = document.createElement("div");
         me._map = map;
         baidu.extend(div.style, {
             position: "absolute",
             zIndex: BMap.Overlay.getZIndex(me._position.lat),
             background: "#FFF",
             cursor: "pointer"
         });
         map.getPanes().labelPane.appendChild(div);
 
         // 缁欎富瀹瑰櫒娣诲姞涓婄敤鎴疯嚜瀹氫箟鐨勫唴瀹�
         me._appendContent();
         // 缁欎富瀹瑰櫒娣诲姞浜嬩欢澶勭悊
         me._setEventDispath();
         // 鑾峰彇涓诲鍣ㄧ殑楂樺
         me._getContainerSize();
 
         return div;
     }
 
     /**
      * 涓鸿嚜瀹氫箟鐨凪arker璁惧畾鏄剧ず浣嶇疆锛屽疄鐜拌嚜瀹氫箟瑕嗙洊鐗╃殑draw鏂规硶
      * 
      * @private
      */
     RichMarker.prototype.draw = function () {
         var map = this._map,
             anchor = this._opts.anchor,
             pixel = map.pointToOverlayPixel(this._position);
         this._container.style.left = pixel.x + anchor.width + "px";
         this._container.style.top = pixel.y + anchor.height + "px";
     }
 
     /**
      * 璁剧疆Marker鍙互鎷栨嫿
      * @return 鏃犺繑鍥炲€�
      * 
      * @example <b>鍙傝€冪ず渚嬶細</b>
      * myRichMarkerObject.enableDragging();
      */
     RichMarker.prototype.enableDragging = function () {
         this._opts.enableDragging = true;
     }
 
     /**
      * 璁剧疆Marker涓嶈兘鎷栨嫿
      * @return 鏃犺繑鍥炲€�
      * 
      * @example <b>鍙傝€冪ず渚嬶細</b>
      * myRichMarkerObject.disableDragging();
      */
     RichMarker.prototype.disableDragging = function () {
         this._opts.enableDragging = false;
     }
 
     /**
      * 鑾峰彇Marker鏄惁鑳借鎷栨嫿鐨勭姸鎬�
      * @return {Boolean} true涓哄彲浠ユ嫋鎷斤紝false涓轰笉鑳借鎷栨嫿
      * 
      * @example <b>鍙傝€冪ず渚嬶細</b>
      * myRichMarkerObject.isDraggable();
      */
     RichMarker.prototype.isDraggable = function () {
         return this._opts.enableDragging;
     }
 
     /**
      * 鑾峰彇Marker鐨勬樉绀轰綅缃�
      * @return {BMap.Point} 鏄剧ず鐨勪綅缃�
      * 
      * @example <b>鍙傝€冪ず渚嬶細</b>
      * myRichMarkerObject.getPosition();
      */
     RichMarker.prototype.getPosition = function () {
         return this._position;
     }
 
     /**
      * 璁剧疆Marker鐨勬樉绀轰綅缃�
      * @param {BMap.Point} position 闇€瑕佽缃殑浣嶇疆
      * @return 鏃犺繑鍥炲€�
      * 
      * @example <b>鍙傝€冪ず渚嬶細</b>
      * myRichMarkerObject.setPosition(new BMap.Point(116.30816, 40.056863));
      */
     RichMarker.prototype.setPosition = function (position) {
         if (!position instanceof BMap.Point) {
             return;
         }
         this._position = position;
         this.draw();
     }
 
     /**
      * 鑾峰彇Marker鐨勫亸绉婚噺
      * @return {BMap.Size} Marker鐨勫亸绉婚噺
      * 
      * @example <b>鍙傝€冪ず渚嬶細</b>
      * myRichMarkerObject.getAnchor();
      */
     RichMarker.prototype.getAnchor = function () {
         return this._opts.anchor;
     }
 
     /**
      * 璁剧疆Marker鐨勫亸绉婚噺
      * @param {BMap.Size} anchor 闇€瑕佽缃殑鍋忕Щ閲�
      * @return 鏃犺繑鍥炲€�
      * 
      * @example <b>鍙傝€冪ず渚嬶細</b>
      * myRichMarkerObject.setAnchor(new BMap.Size(-72, -84));
      */
     RichMarker.prototype.setAnchor = function (anchor) {
         if (!anchor instanceof BMap.Size) {
             return;
         }
         this._opts.anchor = anchor;
         this.draw();
     }
 
     /**
      * 娣诲姞鐢ㄦ埛鐨勮嚜瀹氫箟鐨勫唴瀹�
      * 
      * @private
      * @return 鏃犺繑鍥炲€�
      */
     RichMarker.prototype._appendContent = function () {
         var content = this._content;
         // 鐢ㄦ埛杈撳叆鐨勫唴瀹规槸瀛楃涓诧紝闇€瑕佽浆鍖栨垚dom鑺傜偣
         if (typeof content == "string") {
             var div = document.createElement('DIV');
             div.innerHTML = content;
             if (div.childNodes.length == 1) {
                 content = (div.removeChild(div.firstChild));
             } else {
                 var fragment = document.createDocumentFragment();
                 while (div.firstChild) {
                     fragment.appendChild(div.firstChild);
                 }
                 content = fragment;
             }
         }
         this._container.innerHTML = "";
         this._container.appendChild(content);
     }
 
     /**
      * 鑾峰彇Marker鐨勫唴瀹�
      * @return {String | HTMLElement} 褰撳墠鍐呭
      * 
      * @example <b>鍙傝€冪ず渚嬶細</b>
      * myRichMarkerObject.getContent();
      */
     RichMarker.prototype.getContent = function () {
         return this._content;
     }
 
     /**
      * 璁剧疆Marker鐨勫唴瀹�
      * @param {String | HTMLElement} content 闇€瑕佽缃殑鍐呭
      * @return 鏃犺繑鍥炲€�
      * 
      * @example <b>鍙傝€冪ず渚嬶細</b>
      * var htm = "&lt;div style='background:#E7F0F5;color:#0082CB;border:1px solid #333'&gt;"
      *              +     "娆㈣繋浣跨敤鐧惧害鍦板浘API锛�"
      *              +     "&lt;img src='http://map.baidu.com/img/logo-map.gif' border='0' /&gt;"
      *              + "&lt;/div&gt;";
      * myRichMarkerObject.setContent(htm);
      */
     RichMarker.prototype.setContent = function (content) {
         if (!content) {
             return;
         }
         // 瀛樺偍鐢ㄦ埛杈撳叆鐨凪arker鏄剧ず鍐呭
         this._content = content;
         // 娣诲姞杩涗富瀹瑰櫒
         this._appendContent();
     }
 
     /**
      * 鑾峰彇Marker鐨勯珮瀹�
      * 
      * @private
      * @return {BMap.Size} 褰撳墠楂樺
      */
     RichMarker.prototype._getContainerSize = function () {
         if (!this._container) {
             return;
         }
         var h = this._container.offsetHeight;
         var w = this._container.offsetWidth;
         this._size = new BMap.Size(w, h);
     }
 
     /**
      * 鑾峰彇Marker鐨勫搴�
      * @return {Number} 褰撳墠瀹藉害
      * 
      * @example <b>鍙傝€冪ず渚嬶細</b>
      * myRichMarkerObject.getWidth();
      */
     RichMarker.prototype.getWidth = function () {
         if (!this._size) {
             return;
         }
         return this._size.width;
     }
 
     /**
      * 璁剧疆Marker鐨勫搴�
      * @param {Number} width 闇€瑕佽缃殑瀹藉害
      * @return 鏃犺繑鍥炲€�
      * 
      * @example <b>鍙傝€冪ず渚嬶細</b>
      * myRichMarkerObject.setWidth(300);
      */
     RichMarker.prototype.setWidth = function (width) {
         if (!this._container) {
             return;
         }
         this._container.style.width = width + "px";
         this._getContainerSize();
     }
 
     /**
      * 鑾峰彇Marker鐨勯珮搴�
      * @return {Number} 褰撳墠楂樺害
      * 
      * @example <b>鍙傝€冪ず渚嬶細</b>
      * myRichMarkerObject.getHeight();
      */
     RichMarker.prototype.getHeight = function () {
         if (!this._size) {
             return;
         }
         return this._size.height;
     }
 
     /**
      * 璁剧疆Marker鐨勯珮搴�
      * @param {Number} height 闇€瑕佽缃殑楂樺害
      * @return 鏃犺繑鍥炲€�
      * 
      * @example <b>鍙傝€冪ず渚嬶細</b>
      * myRichMarkerObject.setHeight(200);
      */
     RichMarker.prototype.setHeight = function (height) {
         if (!this._container) {
             return;
         }
         this._container.style.height = height + "px";
         this._getContainerSize();
     }
 
     /**
      * 璁剧疆Marker鐨勫悇绉嶄簨浠�
      * 
      * @private
      * @return 鏃犺繑鍥炲€�
      */
     RichMarker.prototype._setEventDispath = function () {
         var me = this,
             div = me._container,
             isMouseDown = false,
             // 榧犳爣鏄惁鎸変笅锛岀敤浠ュ垽鏂紶鏍囩Щ鍔ㄨ繃绋嬩腑鐨勬嫋鎷借绠�
             startPosition = null; // 鎷栨嫿鏃讹紝榧犳爣鎸変笅鐨勫垵濮嬩綅缃紝鎷栨嫿鐨勮緟鍔╄绠楀弬鏁�   
             
         // 閫氳繃e鍙傛暟鑾峰彇褰撳墠榧犳爣鎵€鍦ㄤ綅缃�
         function _getPositionByEvent(e) {
             var e = window.event || e,
                 x = e.pageX || e.clientX || 0,
                 y = e.pageY || e.clientY || 0,
                 pixel = new BMap.Pixel(x, y),
                 point = me._map.pixelToPoint(pixel);
             return {
                 "pixel": pixel,
                 "point": point
             };
         }
 
         // 鍗曞嚮浜嬩欢
         baidu.on(div, "onclick", function (e) {
             /**
              * 鐐瑰嚮Marker鏃讹紝娲惧彂浜嬩欢鐨勬帴鍙�
              * @name RichMarker#onclick
              * @event
              * @param {Event Object} e 鍥炶皟鍑芥暟浼氳繑鍥瀍vent鍙傛暟锛屽寘鎷互涓嬭繑鍥炲€硷細
              * <br />{"<b>target</b> : {BMap.Overlay} 瑙﹀彂浜嬩欢鐨勫厓绱�,
              * <br />"<b>type</b>锛歿String} 浜嬩欢绫诲瀷}
              *
              * @example <b>鍙傝€冪ず渚嬶細</b>
              * myRichMarkerObject.addEventListener("onclick", function(e) { 
              *     alert(e.type);  
              * });
              */
             _dispatchEvent(me, "onclick");
             _stopAndPrevent(e);
         });
 
         // 鍗曞嚮浜嬩欢
         baidu.on(div, "ontouchend", function (e) {
             /**
              * 鐐瑰嚮Marker鏃讹紝娲惧彂浜嬩欢鐨勬帴鍙�
              * @name RichMarker#onclick
              * @event
              * @param {Event Object} e 鍥炶皟鍑芥暟浼氳繑鍥瀍vent鍙傛暟锛屽寘鎷互涓嬭繑鍥炲€硷細
              * <br />{"<b>target</b> : {BMap.Overlay} 瑙﹀彂浜嬩欢鐨勫厓绱�,
              * <br />"<b>type</b>锛歿String} 浜嬩欢绫诲瀷}
              *
              * @example <b>鍙傝€冪ず渚嬶細</b>
              * myRichMarkerObject.addEventListener("onclick", function(e) { 
              *     alert(e.type);  
              * });
              */
              _dispatchEvent(me, "ontouchend");
              _dispatchEvent(me, "onclick");
              _stopAndPrevent(e);
         });
         // 鍙屽嚮浜嬩欢
         baidu.on(div, "ondblclick", function (e) {
             var position = _getPositionByEvent(e);
             /**
              * 鍙屽嚮Marker鏃讹紝娲惧彂浜嬩欢鐨勬帴鍙�
              * @name RichMarker#ondblclick
              * @event
              * @param {Event Object} e 鍥炶皟鍑芥暟浼氳繑鍥瀍vent鍙傛暟锛屽寘鎷互涓嬭繑鍥炲€硷細
              * <br />{"<b>target</b> : {BMap.Overlay} 瑙﹀彂浜嬩欢鐨勫厓绱�,
              * <br />"<b>type</b>锛歿String} 浜嬩欢绫诲瀷,
              * <br />"<b>point</b>锛歿BMap.Point} 榧犳爣鐨勭墿鐞嗗潗鏍�,
              * <br />"<b>pixel</b>锛歿BMap.Pixel} 榧犳爣鐨勫儚绱犲潗鏍噠
              *
              * @example <b>鍙傝€冪ず渚嬶細</b>
              * myRichMarkerObject.addEventListener("ondblclick", function(e) { 
              *     alert(e.type);  
              * });
              */
             _dispatchEvent(me, "ondblclick", {
                 "point": position.point,
                 "pixel": position.pixel
             });
             _stopAndPrevent(e);
         });
 
         // 榧犳爣绉讳笂浜嬩欢
         div.onmouseover = function (e) {
             var position = _getPositionByEvent(e);
             /**
              * 榧犳爣绉诲埌Marker涓婃椂锛屾淳鍙戜簨浠剁殑鎺ュ彛
              * @name RichMarker#onmouseover
              * @event
              * @param {Event Object} e 鍥炶皟鍑芥暟浼氳繑鍥瀍vent鍙傛暟锛屽寘鎷互涓嬭繑鍥炲€硷細
              * <br />{"<b>target</b> : {BMap.Overlay} 瑙﹀彂浜嬩欢鐨勫厓绱�,
              * <br />"<b>type</b>锛歿String} 浜嬩欢绫诲瀷,
              * <br />"<b>point</b>锛歿BMap.Point} 榧犳爣鐨勭墿鐞嗗潗鏍�,
              * <br />"<b>pixel</b>锛歿BMap.Pixel} 榧犳爣鐨勫儚绱犲潗鏍噠
              *
              * @example <b>鍙傝€冪ず渚嬶細</b>
              * myRichMarkerObject.addEventListener("onmouseover", function(e) { 
              *     alert(e.type);  
              * });
              */
             _dispatchEvent(me, "onmouseover", {
                 "point": position.point,
                 "pixel": position.pixel
             });
             _stopAndPrevent(e);
         }
 
         // 榧犳爣绉诲嚭浜嬩欢
         div.onmouseout = function (e) {
             var position = _getPositionByEvent(e);
             /**
              * 榧犳爣绉诲嚭Marker鏃讹紝娲惧彂浜嬩欢鐨勬帴鍙�
              * @name RichMarker#onmouseout
              * @event
              * @param {Event Object} e 鍥炶皟鍑芥暟浼氳繑鍥瀍vent鍙傛暟锛屽寘鎷互涓嬭繑鍥炲€硷細
              * <br />{"<b>target</b> : {BMap.Overlay} 瑙﹀彂浜嬩欢鐨勫厓绱�,
              * <br />"<b>type</b>锛歿String} 浜嬩欢绫诲瀷,
              * <br />"<b>point</b>锛歿BMap.Point} 榧犳爣鐨勭墿鐞嗗潗鏍�,
              * <br />"<b>pixel</b>锛歿BMap.Pixel} 榧犳爣鐨勫儚绱犲潗鏍噠
              *
              * @example <b>鍙傝€冪ず渚嬶細</b>
              * myRichMarkerObject.addEventListener("onmouseout", function(e) { 
              *     alert(e.type);  
              * });
              */
             _dispatchEvent(me, "onmouseout", {
                 "point": position.point,
                 "pixel": position.pixel
             });
             _stopAndPrevent(e);
         }
 
         // 榧犳爣寮硅捣浜嬩欢
         var mouseUpEvent = function (e) {
                 var position = _getPositionByEvent(e);
                 /**
                  * 鍦∕arker涓婂脊璧烽紶鏍囨椂锛屾淳鍙戜簨浠剁殑鎺ュ彛
                  * @name RichMarker#onmouseup
                  * @event
                  * @param {Event Object} e 鍥炶皟鍑芥暟浼氳繑鍥瀍vent鍙傛暟锛屽寘鎷互涓嬭繑鍥炲€硷細
                  * <br />{"<b>target</b> : {BMap.Overlay} 瑙﹀彂浜嬩欢鐨勫厓绱�,
                  * <br />"<b>type</b>锛歿String} 浜嬩欢绫诲瀷,
                  * <br />"<b>point</b>锛歿BMap.Point} 榧犳爣鐨勭墿鐞嗗潗鏍�,
                  * <br />"<b>pixel</b>锛歿BMap.Pixel} 榧犳爣鐨勫儚绱犲潗鏍噠
                  *
                  * @example <b>鍙傝€冪ず渚嬶細</b>
                  * myRichMarkerObject.addEventListener("onmouseup", function(e) { 
                  *     alert(e.type);  
                  * });
                  */
                 _dispatchEvent(me, "onmouseup", {
                     "point": position.point,
                     "pixel": position.pixel
                 });
 
                 if (me._container.releaseCapture) {
                     baidu.un(div, "onmousemove", mouseMoveEvent);
                     baidu.un(div, "onmouseup", mouseUpEvent);
                 } else {
                     baidu.un(window, "onmousemove", mouseMoveEvent);
                     baidu.un(window, "onmouseup", mouseUpEvent);
                 }
 
                 // 鍒ゆ柇鏄惁闇€瑕佽繘琛屾嫋鎷戒簨浠剁殑澶勭悊
                 if (!me._opts.enableDragging) {
                     _stopAndPrevent(e);
                     return;
                 }
                 // 鎷栨嫿缁撴潫鏃讹紝閲婃斁榧犳爣鎹曡幏
                 me._container.releaseCapture && me._container.releaseCapture();
                 /**
                  * 鎷栨嫿Marker缁撴潫鏃讹紝娲惧彂浜嬩欢鐨勬帴鍙�
                  * @name RichMarker#ondragend
                  * @event
                  * @param {Event Object} e 鍥炶皟鍑芥暟浼氳繑鍥瀍vent鍙傛暟锛屽寘鎷互涓嬭繑鍥炲€硷細
                  * <br />{"<b>target</b> : {BMap.Overlay} 瑙﹀彂浜嬩欢鐨勫厓绱�,
                  * <br />"<b>type</b>锛歿String} 浜嬩欢绫诲瀷,
                  * <br />"<b>point</b>锛歿BMap.Point} 榧犳爣鐨勭墿鐞嗗潗鏍�,
                  * <br />"<b>pixel</b>锛歿BMap.Pixel} 榧犳爣鐨勫儚绱犲潗鏍噠
                  *
                  * @example <b>鍙傝€冪ず渚嬶細</b>
                  * myRichMarkerObject.addEventListener("ondragend", function(e) { 
                  *     alert(e.type);  
                  * });
                  */
                 _dispatchEvent(me, "ondragend", {
                     "point": position.point,
                     "pixel": position.pixel
                 });
                 isMouseDown = false;
                 startPosition = null;
                 // 璁剧疆鎷栨嫿缁撴潫鍚庣殑榧犳爣鎵嬪瀷
                 me._setCursor("dragend");
                 // 鎷栨嫿杩囩▼涓槻姝㈡枃瀛楄閫変腑
                 me._container.style['MozUserSelect'] = '';
                 me._container.style['KhtmlUserSelect'] = '';
                 me._container.style['WebkitUserSelect'] = '';
                 me._container['unselectable'] = 'off';
                 me._container['onselectstart'] = function () {};
 
                 _stopAndPrevent(e);
             }
 
             // 榧犳爣绉诲姩浜嬩欢
         var mouseMoveEvent = function (e) {
                 // 鍒ゆ柇鏄惁闇€瑕佽繘琛屾嫋鎷戒簨浠剁殑澶勭悊
                 if (!me._opts.enableDragging || !isMouseDown) {
                     return;
                 }
                 var position = _getPositionByEvent(e);
 
                 // 璁＄畻褰撳墠marker搴旇鎵€鍦ㄧ殑浣嶇疆
                 var startPixel = me._map.pointToPixel(me._position);
                 var x = position.pixel.x - startPosition.x + startPixel.x;
                 var y = position.pixel.y - startPosition.y + startPixel.y;
 
                 startPosition = position.pixel;
                 me._position = me._map.pixelToPoint(new BMap.Pixel(x, y));
                 me.draw();
                 // 璁剧疆鎷栨嫿杩囩▼涓殑榧犳爣鎵嬪瀷
                 me._setCursor("dragging");
                 /**
                  * 鎷栨嫿Marker鐨勮繃绋嬩腑锛屾淳鍙戜簨浠剁殑鎺ュ彛
                  * @name RichMarker#ondragging
                  * @event
                  * @param {Event Object} e 鍥炶皟鍑芥暟浼氳繑鍥瀍vent鍙傛暟锛屽寘鎷互涓嬭繑鍥炲€硷細
                  * <br />{"<b>target</b> : {BMap.Overlay} 瑙﹀彂浜嬩欢鐨勫厓绱�,
                  * <br />"<b>type</b>锛歿String} 浜嬩欢绫诲瀷,
                  * <br />"<b>point</b>锛歿BMap.Point} 榧犳爣鐨勭墿鐞嗗潗鏍�,
                  * <br />"<b>pixel</b>锛歿BMap.Pixel} 榧犳爣鐨勫儚绱犲潗鏍噠
                  *
                  * @example <b>鍙傝€冪ず渚嬶細</b>
                  * myRichMarkerObject.addEventListener("ondragging", function(e) { 
                  *     alert(e.type);  
                  * });
                  */
                 _dispatchEvent(me, "ondragging", {
                     "point": position.point,
                     "pixel": position.pixel
                 });
                 _stopAndPrevent(e);
             }
 
             // 榧犳爣鎸変笅浜嬩欢
             baidu.on(div, "onmousedown", function (e) {
                 var position = _getPositionByEvent(e);
                 /**
                  * 鍦∕arker涓婃寜涓嬮紶鏍囨椂锛屾淳鍙戜簨浠剁殑鎺ュ彛
                  * @name RichMarker#onmousedown
                  * @event
                  * @param {Event Object} e 鍥炶皟鍑芥暟浼氳繑鍥瀍vent鍙傛暟锛屽寘鎷互涓嬭繑鍥炲€硷細
                  * <br />{"<b>target</b> : {BMap.Overlay} 瑙﹀彂浜嬩欢鐨勫厓绱�,
                  * <br />"<b>type</b>锛歿String} 浜嬩欢绫诲瀷,
                  * <br />"<b>point</b>锛歿BMap.Point} 榧犳爣鐨勭墿鐞嗗潗鏍�,
                  * <br />"<b>pixel</b>锛歿BMap.Pixel} 榧犳爣鐨勫儚绱犲潗鏍噠
                  *
                  * @example <b>鍙傝€冪ず渚嬶細</b>
                  * myRichMarkerObject.addEventListener("onmousedown", function(e) { 
                  *     alert(e.type);  
                  * });
                  */
                 _dispatchEvent(me, "onmousedown", {
                     "point": position.point,
                     "pixel": position.pixel
                 });
 
                 if (me._container.setCapture) {
                     baidu.on(div, "onmousemove", mouseMoveEvent);
                     baidu.on(div, "onmouseup", mouseUpEvent);
                 } else {
                     baidu.on(window, "onmousemove", mouseMoveEvent);
                     baidu.on(window, "onmouseup", mouseUpEvent);
                 }
 
                 // 鍒ゆ柇鏄惁闇€瑕佽繘琛屾嫋鎷戒簨浠剁殑澶勭悊
                 if (!me._opts.enableDragging) {
                     _stopAndPrevent(e);
                     return;
                 }
                 startPosition = position.pixel;
                 /**
                  * 寮€濮嬫嫋鎷組arker鏃讹紝娲惧彂浜嬩欢鐨勬帴鍙�
                  * @name RichMarker#ondragstart
                  * @event
                  * @param {Event Object} e 鍥炶皟鍑芥暟浼氳繑鍥瀍vent鍙傛暟锛屽寘鎷互涓嬭繑鍥炲€硷細
                  * <br />{"<b>target</b> : {BMap.Overlay} 瑙﹀彂浜嬩欢鐨勫厓绱�,
                  * <br />"<b>type</b>锛歿String} 浜嬩欢绫诲瀷,
                  * <br />"<b>point</b>锛歿BMap.Point} 榧犳爣鐨勭墿鐞嗗潗鏍�,
                  * <br />"<b>pixel</b>锛歿BMap.Pixel} 榧犳爣鐨勫儚绱犲潗鏍噠
                  *
                  * @example <b>鍙傝€冪ず渚嬶細</b>
                  * myRichMarkerObject.addEventListener("ondragstart", function(e) { 
                  *     alert(e.type);  
                  * });
                  */
                 _dispatchEvent(me, "ondragstart", {
                     "point": position.point,
                     "pixel": position.pixel
                 });
                 isMouseDown = true;
                 // 璁剧疆鎷栨嫿寮€濮嬬殑榧犳爣鎵嬪瀷
                 me._setCursor("dragstart");
                 // 鎷栨嫿寮€濮嬫椂锛岃缃紶鏍囨崟鑾�
                 me._container.setCapture && me._container.setCapture();
                 // 鎷栨嫿杩囩▼涓槻姝㈡枃瀛楄閫変腑
                 me._container.style['MozUserSelect'] = 'none';
                 me._container.style['KhtmlUserSelect'] = 'none';
                 me._container.style['WebkitUserSelect'] = 'none';
                 me._container['unselectable'] = 'on';
                 me._container['onselectstart'] = function () {
                     return false;
                 };
                 _stopAndPrevent(e);
             });
     }
 
     /**
      * 璁剧疆鎷栨嫿杩囩▼涓殑鎵嬪瀷
      *
      * @private 
      * @param {string} cursorType 闇€瑕佽缃殑鎵嬪瀷绫诲瀷
      */
     RichMarker.prototype._setCursor = function (cursorType) {
         var cursor = '';
         var cursorStylies = {
             "moz": {
                 "dragstart": "-moz-grab",
                 "dragging": "-moz-grabbing",
                 "dragend": "pointer"
             },
             "other": {
                 "dragstart": "move",
                 "dragging": "move",
                 "dragend": "pointer"
             }
         };
 
         if (navigator.userAgent.indexOf('Gecko/') !== -1) {
             cursor = cursorStylies.moz[cursorType];
         } else {
             cursor = cursorStylies.other[cursorType];
         }
 
         if (this._container.style.cursor != cursor) {
             this._container.style.cursor = cursor;
         }
     }
 
     /**
      * 鍒犻櫎Marker
      * 
      * @private
      * @return 鏃犺繑鍥炲€�
      */
     RichMarker.prototype.remove = function () {
         _dispatchEvent(this, "onremove");
         // 娓呴櫎涓诲鍣ㄤ笂鐨勪簨浠剁粦瀹�
         if (this._container) {
             _purge(this._container);
         }
         // 鍒犻櫎涓诲鍣�
         if (this._container && this._container.parentNode) {
             this._container.parentNode.removeChild(this._container);
         }
     }
 
     /**
      * 闆嗕腑娲惧彂浜嬩欢鍑芥暟
      *
      * @private
      * @param {Object} instance 娲惧彂浜嬩欢鐨勫疄渚�
      * @param {String} type 娲惧彂鐨勪簨浠跺悕
      * @param {Json} opts 娲惧彂浜嬩欢閲屾坊鍔犵殑鍙傛暟锛屽彲閫�
      */
     function _dispatchEvent(instance, type, opts) {
         type.indexOf("on") != 0 && (type = "on" + type);
         var event = new baidu.lang.Event(type);
         if ( !! opts) {
             for (var p in opts) {
                 event[p] = opts[p];
             }
         }
         instance.dispatchEvent(event);
     }
 
     /**
      * 娓呯悊DOM浜嬩欢锛岄槻姝㈠惊鐜紩鐢�
      *
      * @type {DOM} dom 闇€瑕佹竻鐞嗙殑dom瀵硅薄
      */
     function _purge(dom) {
         if (!dom) {
             return;
         }
         var attrs = dom.attributes,
             name = "";
         if (attrs) {
             for (var i = 0, n = attrs.length; i < n; i++) {
                 name = attrs[i].name;
                 if (typeof dom[name] === "function") {
                     dom[name] = null;
                 }
             }
         }
         var child = dom.childnodes;
         if (child) {
             for (var i = 0, n = child.length; i < n; i++) {
                 _purge(dom.childnodes[i]);
             }
         }
     }
 
     /**
      * 鍋滄浜嬩欢鍐掓场浼犳挱
      *
      * @type {Event} e e瀵硅薄
      */
     function _stopAndPrevent(e) {
         var e = window.event || e;
         e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
         return baidu.preventDefault(e);
     }
 })();