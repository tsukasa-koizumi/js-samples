/**
 * main_image_anime.js
 * 
 * JavaScript with jQuery for main image animation.
 * 
 * @package js-samples
 * @author  Tsukasa Koizumi <tsukasa@koiz.me>
 * @copyright 2012 Tsukasa Koizumi
 * 
 */
// jQuery onload
$(function(){
    // class="mainImage"の要素リスト
    var mainImages = $(".mainImage");
    // class="menuBox"の要素リスト
    var menuBoxes = $(".menuBox");
    // class="menuBorders"の要素リスト
    var menuBorders = $(".menuBorder");
    // 現在表示しているイメージの配列インデクス
    var currentIdx = 0;
    // 現在ハイライトしているメニューの配列インデックス
    var currentMenuIdx = 0;
    
    /**
     * getNextIdx()
     * 次に表示するイメージの配列インデックスを取得
     * 
     */
    getNextIdx = function() {
        return currentIdx == (mainImages.length - 1) ? 0 : currentIdx + 1;
    }
    
    /**
     * getMenuIdx()
     * マウスオーバーまたはクリックされたメニューの配列インデックスを取得
     */
    getMenuIdx = function(obj) {
        for (var i = 0; i < menuBoxes.length; i++) {
            if (obj == menuBoxes[i] || obj == menuBorders[i]) {
                return i;
            }
        }
    }
    
    /**
     * fadeOutBorder()
     * メニューの枠線をフェードアウトする
     */
    fadeOutBorder = function(idx) {
        $(menuBorders).each(
            function() {
                if ($(this).css("display") != "none" && this != menuBorders[idx]) {
                    $(this).fadeOut("fast");
                }
            }
        );
    }
    
    /**
     * rotateMainImage()
     * メインイメージのローテーション
     */
    rotateMainImage = function() {
        $(mainImages[currentIdx]).fadeOut("slow");
        var nextIdx = getNextIdx();
        $(mainImages[nextIdx]).fadeIn("slow");
        fadeOutBorder(nextIdx);
        $(menuBorders[nextIdx]).fadeIn("fast");
        currentIdx     = nextIdx;
        currentMenuIdx = nextIdx;
    }
    
    /**
     * startRotation()
     * ローテーション開始
     */
    startRotation = function() {
        return setInterval("rotateMainImage()", 5000);
    }
    
    /**
     * メニューのマウスオーバーイベント
     */
    $(".menubox").mouseover(
        function () {
            var idx = getMenuIdx(this);
            fadeOutBorder(idx);
            if ($(menuBorders[idx]).css("display") == "none") {
                $(menuBorders[idx]).fadeIn("fast");
            }
            currentMenuIdx = idx;
        }
    );
    
    /**
     * メニューのクリックイベント
     */
    $(".menuborder").click(
        function () {
            var idx = getMenuIdx(this);
            if (currentIdx != idx) {
                $(mainImages[currentIdx]).fadeOut("slow");
                $(mainImages[idx]).fadeIn("slow");
                $(menuBorders[idx]).fadeIn("fast");
                currentIdx     = idx;
                currentMenuIdx = idx;
                clearInterval(rotationId);
                rotationId = startRotation();
            }
        }
    );

    // ローテーション開始
    rotationId = startRotation();
    
});
