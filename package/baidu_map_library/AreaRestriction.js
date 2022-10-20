/**
 * @fileoverview 鐧惧害鍦板浘娴忚鍖哄煙闄愬埗绫伙紝瀵瑰寮€鏀俱€�
 * 鍏佽寮€鍙戣€呰緭鍏ラ檺瀹氭祻瑙堢殑鍦板浘鍖哄煙鐨凚ounds鍊硷紝
 * 鍒欏湴鍥炬祻瑙堣€呭彧鑳藉湪闄愬畾鍖哄煙鍐呮祻瑙堝湴鍥俱€�
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
      * @exports AreaRestriction as BMapLib.AreaRestriction 
      */
     var AreaRestriction =
         /**
          * AreaRestriction绫伙紝闈欐€佺被锛屼笉鐢ㄥ疄渚嬪寲
          * @class AreaRestriction绫绘彁渚涚殑閮芥槸闈欐€佹柟娉曪紝鍕块渶瀹炰緥鍖栧嵆鍙娇鐢ㄣ€�     
          */
         BMapLib.AreaRestriction = function(){
         }
     
     /**
      * 鏄惁宸茬粡瀵瑰尯鍩熻繘琛岃繃闄愬畾鐨勬爣璇�
      * @private
      * @type {Boolean}
      */
     var _isRestricted = false;
 
     /**
      * map瀵硅薄
      * @private
      * @type {BMap}
      */
     var _map = null;
 
     /**
      * 寮€鍙戣€呴渶瑕侀檺瀹氱殑鍖哄煙
      * @private
      * @type {BMap.Bounds}
      */
     var _bounds = null;
 
     /**
      * 瀵瑰彲娴忚鍦板浘鍖哄煙鐨勯檺瀹氭柟娉�
      * @param {BMap} map map瀵硅薄
      * @param {BMap.Bounds} bounds 寮€鍙戣€呴渶瑕侀檺瀹氱殑鍖哄煙
      *
      * @return {Boolean} 瀹屾垚浜嗗鍖哄煙鐨勯檺鍒跺嵆杩斿洖true锛屽惁鍒欎负false
      */
     AreaRestriction.setBounds = function(map, bounds){
         // 楠岃瘉杈撳叆鍊肩殑鍚堟硶鎬�
         if (!map || 
             !bounds || 
             !(bounds instanceof BMap.Bounds)) {
                 throw "璇锋鏌ヤ紶鍏ュ弬鏁板€肩殑鍚堟硶鎬�";
                 return false;
         }
         
         if (_isRestricted) {
             this.clearBounds();
         }
         _map = map;
         _bounds = bounds;
 
         // 娣诲姞鍦板浘鐨刴oving浜嬩欢锛岀敤浠ュ娴忚鍖哄煙鐨勯檺鍒�
         _map.addEventListener("moveend", this._mapMoveendEvent);
         _isRestricted = true;
         return true;
     };
 
     /**
      * 闇€瑕佺粦瀹氬湪鍦板浘绉诲姩浜嬩欢涓殑鎿嶄綔锛屼富瑕佹帶鍒跺嚭鐣屾椂鐨勫湴鍥鹃噸鏂板畾浣�
      * @param {Event} e e瀵硅薄
      *
      * @return 鏃犺繑鍥炲€�
      */
     AreaRestriction._mapMoveendEvent = function(e) {
         // 濡傛灉褰撳墠瀹屽叏娌℃湁鍑虹晫锛屽垯鏃犳搷浣�
         if (_bounds.containsBounds(_map.getBounds())) {
             return;
         }
 
         // 涓や釜闇€瑕佸姣旂殑bound鍖哄煙鐨勮竟鐣屽€�
         var curBounds = _map.getBounds(),
               curBoundsSW = curBounds.getSouthWest(),
               curBoundsNE = curBounds.getNorthEast(),
               _boundsSW = _bounds.getSouthWest(),
               _boundsNE = _bounds.getNorthEast();
 
         // 闇€瑕佽绠楀畾浣嶄腑蹇冪偣鐨勫洓涓竟鐣�
         var boundary = {n : 0, e : 0, s : 0, w : 0};
         
         // 璁＄畻闇€瑕佸畾浣嶇殑涓績鐐圭殑涓婃柟杈圭晫
         boundary.n = (curBoundsNE.lat < _boundsNE.lat) ? 
                                     curBoundsNE.lat :
                                     _boundsNE.lat;
 
         // 璁＄畻闇€瑕佸畾浣嶇殑涓績鐐圭殑鍙宠竟杈圭晫
         boundary.e = (curBoundsNE.lng < _boundsNE.lng) ? 
                                     curBoundsNE.lng :
                                     _boundsNE.lng;
 
         // 璁＄畻闇€瑕佸畾浣嶇殑涓績鐐圭殑涓嬫柟杈圭晫
         boundary.s = (curBoundsSW.lat < _boundsSW.lat) ? 
                                     _boundsSW.lat :
                                     curBoundsSW.lat;
 
         // 璁＄畻闇€瑕佸畾浣嶇殑涓績鐐圭殑宸﹁竟杈圭晫
         boundary.w = (curBoundsSW.lng < _boundsSW.lng) ? 
                                     _boundsSW.lng :
                                     curBoundsSW.lng;
         
         // 璁剧疆鏂扮殑涓績鐐�
        var center = new BMap.Point(boundary.w + (boundary.e - boundary.w) / 2,
                                                          boundary.s + (boundary.n - boundary.s) / 2);
        setTimeout(function() {
             _map.panTo(center, {noAnimation : "no"});
         }, 1);
     };
 
     /**
      * 娓呴櫎瀵瑰湴鍥炬祻瑙堝尯鍩熼檺瀹氱殑鐘舵€�
      * @return 鏃犺繑鍥炲€�
      */
     AreaRestriction.clearBounds = function(){
         if (!_isRestricted) {
             return;
         }
         _map.removeEventListener("moveend", this._mapMoveendEvent);
         _isRestricted = false;
     };
 
 })();