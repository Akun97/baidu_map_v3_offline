/**
 * @fileoverview 鐧惧害鍦板浘鐨勭敾寮х嚎绫伙紝瀵瑰寮€鏀俱€�
 * 鍏佽鐢ㄦ埛鍦ㄥ湴鍥句笂瀹屾垚鐢诲姬绾跨殑鍔熻兘銆�
 * 浣跨敤鑰呭彲浠ヨ嚜瀹氫箟寮х嚎鐨勭浉鍏虫牱寮忥紝渚嬪绾垮銆侀鑹茬瓑绛夈€�
 * 涓诲叆鍙ｇ被鏄�<a href="symbols/BMapLib.CurveLine.html">CurveLine</a>锛�
 * 鍏蜂綋绫诲弬鑰冨悓锛�<a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB/Polyline" target="_blank">Polyline</a>
 * 鍩轰簬Baidu Map API 1.5銆�
 *
 * @author Baidu Map Api Group 
 * @version 1.5
 */

/** 
 * @namespace BMap鐨勬墍鏈塴ibrary绫诲潎鏀惧湪BMapLib鍛藉悕绌洪棿涓�
 */
 var BMapLib = window.BMapLib = BMapLib || {};

 (function() {
   /**
    * CurveLine绫荤殑鏋勯€犲嚱鏁�
    * @class 寮х嚎绫伙紝瀹炵幇鏁堟灉鐨�<b>鍏ュ彛</b>銆�
    * 瀹炰緥鍖栬绫诲悗锛屽嵆鍙繑鍥炰竴涓姬绾跨殑Polyline瀵硅薄锛屼娇鐢ㄦ柟娉曞悓<a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB/Polyline" target="_blank">Polyline</a>
    * 鍗冲彲璋冪敤map.addOverlay鏂规硶娣诲姞鍒板湴鍥惧綋涓�
    * 
    * @constructor
    * @param {Array<Point>} Array<Point> Point鏁扮粍瀵硅薄
    * @param {Json Object} opts 鍙€夌殑杈撳叆鍙傛暟锛岄潪蹇呭～椤广€傚彲杈撳叆閫夐」鍙傝€�<a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB/PolylineOptions" target="_blank">PolylineOptions</a><br />
    *
    * @example <b>鍙傝€冪ず渚嬶細</b><br />
    * var map = new BMap.Map("container");<br />map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);<br/>var points = [new BMap.Point(116.432045,39.910683), new BMap.Point(116.388522,39.985964), <br/>new BMap.Point(117.218862,39.141468), new BMap.Point(121.485947,31.510083)];
    * <br />var curve = new BMapLib.CurveLine(points, {strokeColor:"blue", strokeWeight:3, strokeOpacity:0.5}); //鏂板缓寮х嚎瑕嗙洊鐗╁璞�
    * <br />map.addOverlay(curve); //娣诲姞鍒板湴鍥�
    * <br/>curve.enableEditing(); //寮€鍚紪杈戝姛鑳�
    */
   BMapLib.CurveLine = CurveLine;
 
   function CurveLine(points, opts) {
     var self = this;
     var curvePoints = getCurvePoints(points);
     var polyline = new BMap.Polyline(curvePoints, opts);
 
     polyline.addEventListener('lineupdate', function(){
       if (this.isEditing) {
         this.enableEditing();
       }
     });
 
     polyline.cornerPoints = points;
     polyline.editMarkers = []; //缂栬緫鍔熻兘鐨勯《鐐�
 
     /**
      * 閲嶅啓寮х嚎鐨勭紪杈戝姛鑳�
      */
     polyline.enableEditing = function () {
       var self = this;
 
       if (self.map) {
         self.disableEditing();
         for (var i = 0; i < self.cornerPoints.length; i++) {
           var marker = new BMap.Marker(self.cornerPoints[i], {
             icon: new BMap.Icon(bmapConfig.home_dir+'/baidu_map_library/images/circle.png', new BMap.Size(16,16)),
             enableDragging: true,
             raiseOnDrag: true
           });
           marker.addEventListener('dragend', function(){
             self.cornerPoints.length = 0;
             for (var i = 0; i < self.editMarkers.length; i++) {
               self.cornerPoints.push(self.editMarkers[i].getPosition());
             }
             var curvePoints = getCurvePoints(self.cornerPoints)
             self.setPath(curvePoints);
           });
           marker.index = i;
           self.editMarkers.push(marker);
           self.map.addOverlay(marker);
         }
       }
       self.isEditing = true;
     }
 
     /**
      * 閲嶅啓寮х嚎鐨勭紪杈戝姛鑳�
      */
     polyline.disableEditing = function() {
       this.isEditing = false;
       //娓呯┖涔嬪墠鐨勭紪杈戠偣
       for (var i = 0; i < this.editMarkers.length; i++) {
         this.map.removeOverlay(this.editMarkers[i]);
         this.editMarkers[i] = null;
       }
       this.editMarkers.length = 0;
     }
 
     /**
      * 鑾峰彇寮х嚎鐨勫潗鏍囩偣
      */
     polyline.getPath = function() {
       return curvePoints;
     }
 
     // polyline.points = points; //寮х嚎鐨勫潗鏍囬《鐐�
     // polyline.enableEditing = enableEditing;
     // polyline.disableEditing = disableEditing;
     // polyline.getPath = getPath;
     return polyline;
   }
 
   function extend(child, parent) {
     for (var p in parent) {
       if (parent.hasOwnProperty(p)) {
         child[p] = parent[p];
       }
     }
     
     return child;
   };
 
 
   /**
    * 鏍规嵁寮х嚎鐨勫潗鏍囪妭鐐规暟缁�
    */
   function getCurvePoints(points) {
     var curvePoints = [];
     for (var i = 0; i < points.length - 1; i++) {
       var p = getCurveByTwoPoints(points[i], points[i + 1]);
       if (p && p.length > 0) {
         curvePoints = curvePoints.concat(p);
       }
     }
     return curvePoints;
   }
 
   /**
    * 鏍规嵁涓ょ偣鑾峰彇鏇茬嚎鍧愭爣鐐规暟缁�
    * @param Point 璧风偣
    * @param Point 缁堢偣
    */
   function getCurveByTwoPoints(obj1, obj2) {
     if (!obj1 || !obj2 || !(obj1 instanceof BMap.Point) || !(obj2 instanceof BMap.Point)) {
       return null;
     }
 
     var B1 = function(x) {
       return 1 - 2 * x + x * x;
     };
     var B2 = function(x) {
       return 2 * x - 2 * x * x;
     };
     var B3 = function(x) {
       return x * x;
     };
 
     curveCoordinates = [];
 
     var count=30; // 鏇茬嚎鏄敱涓€浜涘皬鐨勭嚎娈电粍鎴愮殑锛岃繖涓〃绀鸿繖涓洸绾挎墍鏈夊埌鐨勬姌绾跨殑涓暟
     var isFuture=false;
     var t, h, h2, lat3, lng3, j, t2;
     var LnArray = [];
     var i = 0;
     var inc = 0;
 
     if (typeof(obj2) == "undefined") {
       if (typeof(curveCoordinates) != "undefined") {
         curveCoordinates = [];
       }
       return;
     }
 
     var lat1 = parseFloat(obj1.lat);
     var lat2 = parseFloat(obj2.lat);
     var lng1 = parseFloat(obj1.lng);
     var lng2 = parseFloat(obj2.lng);
       
     // 璁＄畻鏇茬嚎瑙掑害鐨勬柟娉�
     if (lng2 > lng1) {
       if (parseFloat(lng2-lng1) > 180) {
         if (lng1 < 0) {
           lng1 = parseFloat(180 + 180 + lng1);
         }
       }
     }
     
     if (lng1 > lng2) {
       if (parseFloat(lng1-lng2) > 180) {
         if (lng2 < 0) {
           lng2 = parseFloat(180 + 180 + lng2);
         }
       }
     }
     j = 0;
     t2 = 0;
     if (lat2 == lat1) {
       t = 0;
       h = lng1 - lng2;
     } else if (lng2 == lng1) {
       t = Math.PI / 2;
       h = lat1 - lat2;
     } else {
       t = Math.atan((lat2 - lat1) / (lng2 - lng1));
       h = (lat2 - lat1) / Math.sin(t);
     }
     if (t2 == 0) {
       t2 = (t + (Math.PI / 5));
     }
     h2 = h / 2;
     lng3 = h2 * Math.cos(t2) + lng1;
     lat3 = h2 * Math.sin(t2) + lat1;
 
     for (i = 0; i < count + 1; i++) {
       curveCoordinates.push(new BMap.Point(
         (lng1 * B1(inc) + lng3 * B2(inc)) + lng2 * B3(inc),
         (lat1 * B1(inc) + lat3 * B2(inc) + lat2 * B3(inc))
       ));
       inc = inc + (1 / count);
     }
     return curveCoordinates;
   }
 
 })();