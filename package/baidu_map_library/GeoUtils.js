/**
 * @fileoverview GeoUtils绫绘彁渚涜嫢骞插嚑浣曠畻娉曪紝鐢ㄦ潵甯姪鐢ㄦ埛鍒ゆ柇鐐逛笌鐭╁舰銆�
 * 鍦嗗舰銆佸杈瑰舰绾裤€佸杈瑰舰闈㈢殑鍏崇郴,骞舵彁渚涜绠楁姌绾块暱搴﹀拰澶氳竟褰㈢殑闈㈢Н鐨勫叕寮忋€� 
 * 涓诲叆鍙ｇ被鏄�<a href="symbols/BMapLib.GeoUtils.html">GeoUtils</a>锛�
 * 鍩轰簬Baidu Map API 1.2銆�
 *
 * @author Baidu Map Api Group 
 * @version 1.2
 */

/** 
 * @namespace BMap鐨勬墍鏈塴ibrary绫诲潎鏀惧湪BMapLib鍛藉悕绌洪棿涓�
 */
 var BMapLib = window.BMapLib = BMapLib || {};
 (function() { 
     
     /**
      * 鍦扮悆鍗婂緞
      */
     var EARTHRADIUS = 6370996.81; 
 
     /** 
      * @exports GeoUtils as BMapLib.GeoUtils 
      */
     var GeoUtils =
     /**
      * GeoUtils绫伙紝闈欐€佺被锛屽嬁闇€瀹炰緥鍖栧嵆鍙娇鐢�
      * @class GeoUtils绫荤殑<b>鍏ュ彛</b>銆�
      * 璇ョ被鎻愪緵鐨勯兘鏄潤鎬佹柟娉曪紝鍕块渶瀹炰緥鍖栧嵆鍙娇鐢ㄣ€�     
      */
     BMapLib.GeoUtils = function(){
         
     }
     
     /**
      * 鍒ゆ柇鐐规槸鍚﹀湪鐭╁舰鍐�
      * @param {Point} point 鐐瑰璞�
      * @param {Bounds} bounds 鐭╁舰杈圭晫瀵硅薄
      * @returns {Boolean} 鐐瑰湪鐭╁舰鍐呰繑鍥瀟rue,鍚﹀垯杩斿洖false
      */
     GeoUtils.isPointInRect = function(point, bounds){
         //妫€鏌ョ被鍨嬫槸鍚︽纭�
         if (!(point instanceof BMap.Point) || 
             !(bounds instanceof BMap.Bounds)) {
             return false;
         }
         var sw = bounds.getSouthWest(); //瑗垮崡鑴氱偣
         var ne = bounds.getNorthEast(); //涓滃寳鑴氱偣
         return (point.lng >= sw.lng && point.lng <= ne.lng && point.lat >= sw.lat && point.lat <= ne.lat);
     }
     
     /**
      * 鍒ゆ柇鐐规槸鍚﹀湪鍦嗗舰鍐�
      * @param {Point} point 鐐瑰璞�
      * @param {Circle} circle 鍦嗗舰瀵硅薄
      * @returns {Boolean} 鐐瑰湪鍦嗗舰鍐呰繑鍥瀟rue,鍚﹀垯杩斿洖false
      */
     GeoUtils.isPointInCircle = function(point, circle){
         //妫€鏌ョ被鍨嬫槸鍚︽纭�
         if (!(point instanceof BMap.Point) || 
             !(circle instanceof BMap.Circle)) {
             return false;
         }
 
         //point涓庡渾蹇冭窛绂诲皬浜庡渾褰㈠崐寰勶紝鍒欑偣鍦ㄥ渾鍐咃紝鍚﹀垯鍦ㄥ渾澶�
         var c = circle.getCenter();
         var r = circle.getRadius();
 
         var dis = GeoUtils.getDistance(point, c);
         if(dis <= r){
             return true;
         } else {
             return false;
         }
     }
     
     /**
      * 鍒ゆ柇鐐规槸鍚﹀湪鎶樼嚎涓�
      * @param {Point} point 鐐瑰璞�
      * @param {Polyline} polyline 鎶樼嚎瀵硅薄
      * @returns {Boolean} 鐐瑰湪鎶樼嚎涓婅繑鍥瀟rue,鍚﹀垯杩斿洖false
      */
     GeoUtils.isPointOnPolyline = function(point, polyline){
         //妫€鏌ョ被鍨�
         if(!(point instanceof BMap.Point) ||
             !(polyline instanceof BMap.Polyline)){
             return false;
         }
 
         //棣栧厛鍒ゆ柇鐐规槸鍚﹀湪绾跨殑澶栧寘鐭╁舰鍐咃紝濡傛灉鍦紝鍒欒繘涓€姝ュ垽鏂紝鍚﹀垯杩斿洖false
         var lineBounds = polyline.getBounds();
         if(!this.isPointInRect(point, lineBounds)){
             return false;
         }
 
         //鍒ゆ柇鐐规槸鍚﹀湪绾挎涓婏紝璁剧偣涓篞锛岀嚎娈典负P1P2 锛�
         //鍒ゆ柇鐐筈鍦ㄨ绾挎涓婄殑渚濇嵁鏄細( Q - P1 ) 脳 ( P2 - P1 ) = 0锛屼笖 Q 鍦ㄤ互 P1锛孭2涓哄瑙掗《鐐圭殑鐭╁舰鍐�
         var pts = polyline.getPath();
         for(var i = 0; i < pts.length - 1; i++){
             var curPt = pts[i];
             var nextPt = pts[i + 1];
             //棣栧厛鍒ゆ柇point鏄惁鍦╟urPt鍜宯extPt涔嬮棿锛屽嵆锛氭鍒ゆ柇璇ョ偣鏄惁鍦ㄨ绾挎鐨勫鍖呯煩褰㈠唴
             if (point.lng >= Math.min(curPt.lng, nextPt.lng) && point.lng <= Math.max(curPt.lng, nextPt.lng) &&
                 point.lat >= Math.min(curPt.lat, nextPt.lat) && point.lat <= Math.max(curPt.lat, nextPt.lat)){
                 //鍒ゆ柇鐐规槸鍚﹀湪鐩寸嚎涓婂叕寮�
                 var precision = (curPt.lng - point.lng) * (nextPt.lat - point.lat) - 
                     (nextPt.lng - point.lng) * (curPt.lat - point.lat);                
                 if(precision < 2e-10 && precision > -2e-10){//瀹炶川鍒ゆ柇鏄惁鎺ヨ繎0
                     return true;
                 }                
             }
         }
         
         return false;
     }
     
     /**
      * 鍒ゆ柇鐐规槸鍚﹀杈瑰舰鍐�
      * @param {Point} point 鐐瑰璞�
      * @param {Polyline} polygon 澶氳竟褰㈠璞�
      * @returns {Boolean} 鐐瑰湪澶氳竟褰㈠唴杩斿洖true,鍚﹀垯杩斿洖false
      */
     GeoUtils.isPointInPolygon = function(point, polygon){
         //妫€鏌ョ被鍨�
         if(!(point instanceof BMap.Point) ||
             !(polygon instanceof BMap.Polygon)){
             return false;
         }
 
         //棣栧厛鍒ゆ柇鐐规槸鍚﹀湪澶氳竟褰㈢殑澶栧寘鐭╁舰鍐咃紝濡傛灉鍦紝鍒欒繘涓€姝ュ垽鏂紝鍚﹀垯杩斿洖false
         var polygonBounds = polygon.getBounds();
         if(!this.isPointInRect(point, polygonBounds)){
             return false;
         }
 
         var pts = polygon.getPath();//鑾峰彇澶氳竟褰㈢偣
         
         //涓嬭堪浠ｇ爜鏉ユ簮锛歨ttp://paulbourke.net/geometry/insidepoly/锛岃繘琛屼簡閮ㄥ垎淇敼
         //鍩烘湰鎬濇兂鏄埄鐢ㄥ皠绾挎硶锛岃绠楀皠绾夸笌澶氳竟褰㈠悇杈圭殑浜ょ偣锛屽鏋滄槸鍋舵暟锛屽垯鐐瑰湪澶氳竟褰㈠锛屽惁鍒�
         //鍦ㄥ杈瑰舰鍐呫€傝繕浼氳€冭檻涓€浜涚壒娈婃儏鍐碉紝濡傜偣鍦ㄥ杈瑰舰椤剁偣涓婏紝鐐瑰湪澶氳竟褰㈣竟涓婄瓑鐗规畩鎯呭喌銆�
         
         var N = pts.length;
         var boundOrVertex = true; //濡傛灉鐐逛綅浜庡杈瑰舰鐨勯《鐐规垨杈逛笂锛屼篃绠楀仛鐐瑰湪澶氳竟褰㈠唴锛岀洿鎺ヨ繑鍥瀟rue
         var intersectCount = 0;//cross points count of x 
         var precision = 2e-10; //娴偣绫诲瀷璁＄畻鏃跺€欎笌0姣旇緝鏃跺€欑殑瀹瑰樊
         var p1, p2;//neighbour bound vertices
         var p = point; //娴嬭瘯鐐�
         
         p1 = pts[0];//left vertex        
         for(var i = 1; i <= N; ++i){//check all rays            
             if(p.equals(p1)){
                 return boundOrVertex;//p is an vertex
             }
             
             p2 = pts[i % N];//right vertex            
             if(p.lat < Math.min(p1.lat, p2.lat) || p.lat > Math.max(p1.lat, p2.lat)){//ray is outside of our interests                
                 p1 = p2; 
                 continue;//next ray left point
             }
             
             if(p.lat > Math.min(p1.lat, p2.lat) && p.lat < Math.max(p1.lat, p2.lat)){//ray is crossing over by the algorithm (common part of)
                 if(p.lng <= Math.max(p1.lng, p2.lng)){//x is before of ray                    
                     if(p1.lat == p2.lat && p.lng >= Math.min(p1.lng, p2.lng)){//overlies on a horizontal ray
                         return boundOrVertex;
                     }
                     
                     if(p1.lng == p2.lng){//ray is vertical                        
                         if(p1.lng == p.lng){//overlies on a vertical ray
                             return boundOrVertex;
                         }else{//before ray
                             ++intersectCount;
                         } 
                     }else{//cross point on the left side                        
                         var xinters = (p.lat - p1.lat) * (p2.lng - p1.lng) / (p2.lat - p1.lat) + p1.lng;//cross point of lng                        
                         if(Math.abs(p.lng - xinters) < precision){//overlies on a ray
                             return boundOrVertex;
                         }
                         
                         if(p.lng < xinters){//before ray
                             ++intersectCount;
                         } 
                     }
                 }
             }else{//special case when ray is crossing through the vertex                
                 if(p.lat == p2.lat && p.lng <= p2.lng){//p crossing over p2                    
                     var p3 = pts[(i+1) % N]; //next vertex                    
                     if(p.lat >= Math.min(p1.lat, p3.lat) && p.lat <= Math.max(p1.lat, p3.lat)){//p.lat lies between p1.lat & p3.lat
                         ++intersectCount;
                     }else{
                         intersectCount += 2;
                     }
                 }
             }            
             p1 = p2;//next ray left point
         }
         
         if(intersectCount % 2 == 0){//鍋舵暟鍦ㄥ杈瑰舰澶�
             return false;
         } else { //濂囨暟鍦ㄥ杈瑰舰鍐�
             return true;
         }            
     }
 
     /**
      * 灏嗗害杞寲涓哄姬搴�
      * @param {degree} Number 搴�     
      * @returns {Number} 寮у害
      */
     GeoUtils.degreeToRad =  function(degree){
         return Math.PI * degree/180;    
     }
     
     /**
      * 灏嗗姬搴﹁浆鍖栦负搴�
      * @param {radian} Number 寮у害     
      * @returns {Number} 搴�
      */
     GeoUtils.radToDegree = function(rad){
         return (180 * rad) / Math.PI;       
     }
     
     /**
      * 灏唙鍊奸檺瀹氬湪a,b涔嬮棿锛岀含搴︿娇鐢�
      */
     function _getRange(v, a, b){
         if(a != null){
           v = Math.max(v, a);
         }
         if(b != null){
           v = Math.min(v, b);
         }
         return v;
     }
     
     /**
      * 灏唙鍊奸檺瀹氬湪a,b涔嬮棿锛岀粡搴︿娇鐢�
      */
     function _getLoop(v, a, b){
         while( v > b){
           v -= b - a
         }
         while(v < a){
           v += b - a
         }
         return v;
     }
 
     /**
      * 璁＄畻涓ょ偣涔嬮棿鐨勮窛绂�,涓ょ偣鍧愭爣蹇呴』涓虹粡绾害
      * @param {point1} Point 鐐瑰璞�
      * @param {point2} Point 鐐瑰璞�
      * @returns {Number} 涓ょ偣涔嬮棿璺濈锛屽崟浣嶄负绫�
      */
     GeoUtils.getDistance = function(point1, point2){
         //鍒ゆ柇绫诲瀷
         if(!(point1 instanceof BMap.Point) ||
             !(point2 instanceof BMap.Point)){
             return 0;
         }
 
         point1.lng = _getLoop(point1.lng, -180, 180);
         point1.lat = _getRange(point1.lat, -74, 74);
         point2.lng = _getLoop(point2.lng, -180, 180);
         point2.lat = _getRange(point2.lat, -74, 74);
         
         var x1, x2, y1, y2;
         x1 = GeoUtils.degreeToRad(point1.lng);
         y1 = GeoUtils.degreeToRad(point1.lat);
         x2 = GeoUtils.degreeToRad(point2.lng);
         y2 = GeoUtils.degreeToRad(point2.lat);
 
         return EARTHRADIUS * Math.acos((Math.sin(y1) * Math.sin(y2) + Math.cos(y1) * Math.cos(y2) * Math.cos(x2 - x1)));    
     }
     
     /**
      * 璁＄畻鎶樼嚎鎴栬€呯偣鏁扮粍鐨勯暱搴�
      * @param {Polyline|Array<Point>} polyline 鎶樼嚎瀵硅薄鎴栬€呯偣鏁扮粍
      * @returns {Number} 鎶樼嚎鎴栫偣鏁扮粍瀵瑰簲鐨勯暱搴�
      */
     GeoUtils.getPolylineDistance = function(polyline){
         //妫€鏌ョ被鍨�
         if(polyline instanceof BMap.Polyline || 
             polyline instanceof Array){
             //灏唒olyline缁熶竴涓烘暟缁�
             var pts;
             if(polyline instanceof BMap.Polyline){
                 pts = polyline.getPath();
             } else {
                 pts = polyline;
             }
             
             if(pts.length < 2){//灏忎簬2涓偣锛岃繑鍥�0
                 return 0;
             }
 
             //閬嶅巻鎵€鏈夌嚎娈靛皢鍏剁浉鍔狅紝璁＄畻鏁存潯绾挎鐨勯暱搴�
             var totalDis = 0;
             for(var i =0; i < pts.length - 1; i++){
                 var curPt = pts[i];
                 var nextPt = pts[i + 1]
                 var dis = GeoUtils.getDistance(curPt, nextPt);
                 totalDis += dis;
             }
 
             return totalDis;
             
         } else {
             return 0;
         }
     }
     
     /**
      * 璁＄畻澶氳竟褰㈤潰鎴栫偣鏁扮粍鏋勫缓鍥惧舰鐨勯潰绉�,娉ㄦ剰锛氬潗鏍囩被鍨嬪彧鑳芥槸缁忕含搴︼紝涓斾笉閫傚悎璁＄畻鑷浉浜ゅ杈瑰舰鐨勯潰绉�
      * @param {Polygon|Array<Point>} polygon 澶氳竟褰㈤潰瀵硅薄鎴栬€呯偣鏁扮粍
      * @returns {Number} 澶氳竟褰㈤潰鎴栫偣鏁扮粍鏋勬垚鍥惧舰鐨勯潰绉�
      */
     GeoUtils.getPolygonArea = function(polygon){
         //妫€鏌ョ被鍨�
         if(!(polygon instanceof BMap.Polygon) &&
             !(polygon instanceof Array)){
             return 0;
         }
         var pts;
         if(polygon instanceof BMap.Polygon){
             pts = polygon.getPath();
         }else{
             pts = polygon;    
         }
         
         if(pts.length < 3){//灏忎簬3涓《鐐癸紝涓嶈兘鏋勫缓闈�
             return 0;
         }
         
         var totalArea = 0;//鍒濆鍖栨€婚潰绉�
         var LowX = 0.0;
         var LowY = 0.0;
         var MiddleX = 0.0;
         var MiddleY = 0.0;
         var HighX = 0.0;
         var HighY = 0.0;
         var AM = 0.0;
         var BM = 0.0;
         var CM = 0.0;
         var AL = 0.0;
         var BL = 0.0;
         var CL = 0.0;
         var AH = 0.0;
         var BH = 0.0;
         var CH = 0.0;
         var CoefficientL = 0.0;
         var CoefficientH = 0.0;
         var ALtangent = 0.0;
         var BLtangent = 0.0;
         var CLtangent = 0.0;
         var AHtangent = 0.0;
         var BHtangent = 0.0;
         var CHtangent = 0.0;
         var ANormalLine = 0.0;
         var BNormalLine = 0.0;
         var CNormalLine = 0.0;
         var OrientationValue = 0.0;
         var AngleCos = 0.0;
         var Sum1 = 0.0;
         var Sum2 = 0.0;
         var Count2 = 0;
         var Count1 = 0;
         var Sum = 0.0;
         var Radius = EARTHRADIUS; //6378137.0,WGS84妞悆鍗婂緞 
         var Count = pts.length;        
         for (var i = 0; i < Count; i++) {
             if (i == 0) {
                 LowX = pts[Count - 1].lng * Math.PI / 180;
                 LowY = pts[Count - 1].lat * Math.PI / 180;
                 MiddleX = pts[0].lng * Math.PI / 180;
                 MiddleY = pts[0].lat * Math.PI / 180;
                 HighX = pts[1].lng * Math.PI / 180;
                 HighY = pts[1].lat * Math.PI / 180;
             }
             else if (i == Count - 1) {
                 LowX = pts[Count - 2].lng * Math.PI / 180;
                 LowY = pts[Count - 2].lat * Math.PI / 180;
                 MiddleX = pts[Count - 1].lng * Math.PI / 180;
                 MiddleY = pts[Count - 1].lat * Math.PI / 180;
                 HighX = pts[0].lng * Math.PI / 180;
                 HighY = pts[0].lat * Math.PI / 180;
             }
             else {
                 LowX = pts[i - 1].lng * Math.PI / 180;
                 LowY = pts[i - 1].lat * Math.PI / 180;
                 MiddleX = pts[i].lng * Math.PI / 180;
                 MiddleY = pts[i].lat * Math.PI / 180;
                 HighX = pts[i + 1].lng * Math.PI / 180;
                 HighY = pts[i + 1].lat * Math.PI / 180;
             }
             AM = Math.cos(MiddleY) * Math.cos(MiddleX);
             BM = Math.cos(MiddleY) * Math.sin(MiddleX);
             CM = Math.sin(MiddleY);
             AL = Math.cos(LowY) * Math.cos(LowX);
             BL = Math.cos(LowY) * Math.sin(LowX);
             CL = Math.sin(LowY);
             AH = Math.cos(HighY) * Math.cos(HighX);
             BH = Math.cos(HighY) * Math.sin(HighX);
             CH = Math.sin(HighY);
             CoefficientL = (AM * AM + BM * BM + CM * CM) / (AM * AL + BM * BL + CM * CL);
             CoefficientH = (AM * AM + BM * BM + CM * CM) / (AM * AH + BM * BH + CM * CH);
             ALtangent = CoefficientL * AL - AM;
             BLtangent = CoefficientL * BL - BM;
             CLtangent = CoefficientL * CL - CM;
             AHtangent = CoefficientH * AH - AM;
             BHtangent = CoefficientH * BH - BM;
             CHtangent = CoefficientH * CH - CM;
             AngleCos = (AHtangent * ALtangent + BHtangent * BLtangent + CHtangent * CLtangent) / (Math.sqrt(AHtangent * AHtangent + BHtangent * BHtangent + CHtangent * CHtangent) * Math.sqrt(ALtangent * ALtangent + BLtangent * BLtangent + CLtangent * CLtangent));
             AngleCos = Math.acos(AngleCos);            
             ANormalLine = BHtangent * CLtangent - CHtangent * BLtangent;
             BNormalLine = 0 - (AHtangent * CLtangent - CHtangent * ALtangent);
             CNormalLine = AHtangent * BLtangent - BHtangent * ALtangent;
             if (AM != 0)
                 OrientationValue = ANormalLine / AM;
             else if (BM != 0)
                 OrientationValue = BNormalLine / BM;
             else
                 OrientationValue = CNormalLine / CM;
             if (OrientationValue > 0) {
                 Sum1 += AngleCos;
                 Count1++;
             }
             else {
                 Sum2 += AngleCos;
                 Count2++;
             }
         }        
         var tempSum1, tempSum2;
         tempSum1 = Sum1 + (2 * Math.PI * Count2 - Sum2);
         tempSum2 = (2 * Math.PI * Count1 - Sum1) + Sum2;
         if (Sum1 > Sum2) {
             if ((tempSum1 - (Count - 2) * Math.PI) < 1)
                 Sum = tempSum1;
             else
                 Sum = tempSum2;
         }
         else {
             if ((tempSum2 - (Count - 2) * Math.PI) < 1)
                 Sum = tempSum2;
             else
                 Sum = tempSum1;
         }
         totalArea = (Sum - (Count - 2) * Math.PI) * Radius * Radius;
 
         return totalArea; //杩斿洖鎬婚潰绉�
     }
    
 })();//闂寘缁撴潫