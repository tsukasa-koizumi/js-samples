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
    fadeOutBorder = function() {
        $(menuBorders).each(
            function() {
                if ($(this).css("display") != "none") {
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
        $(mainImages[currentIdx]).fadeOut("normal");
        fadeOutBorder();
        var nextIdx = getNextIdx();
        $(mainImages[nextIdx]).fadeIn("slow");
        $(menuBorders[nextIdx]).fadeIn("fast");
        currentIdx     = nextIdx;
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
            fadeOutBorder();
            idx = getMenuIdx(this);
            if ($(menuBorders[idx]).css("display") == "none") {
                $(menuBorders[idx]).fadeIn("normal");
            }
        }
    );
    
    /**
     * メニューのクリックイベント
     */
    $(".menuborder").click(
        function () {
            $(mainImages[currentIdx]).fadeOut("normal");
            fadeOutBorder();
            var idx = getMenuIdx(this);
            $(mainImages[idx]).fadeIn("slow");
            $(menuBorders[idx]).fadeIn("fast");
            currentIdx     = idx;
            clearInterval(rotationId);
            rotationId = startRotation();
        }
    );

    // ローテーション開始
    rotationId = startRotation();
    
});
