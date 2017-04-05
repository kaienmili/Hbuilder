// JavaScript Document
//;(function(){
var mLayerSrc = '/themes/3658mall/plugins/mlayer/';

//引入css文件
$("<link>").attr({rel : "stylesheet", type: "text/css", href: mLayerSrc + 'skin/mlayer.css'}).appendTo($('head'));
//$('head').append('<link href="' + mLayerSrc + 'skin/mlayer.css' + '" rel="stylesheet" type="text/css" />');

var mlayer = {
	load : function(options){
		var defaults = {
            mType : 1,
			mBgColor : '#fff',
			mOpacity : 0.1
        };
        var opts = $.extend({}, defaults, options);

        var pHtml = '<div class="mlayer-shadow" style="background:' + opts.mBgColor + ';filter:alpha(opacity=' + (opts.mOpacity * 100) + ');-moz-opacity:'+ opts.mOpacity +';opacity:'+ opts.mOpacity +';">';
        pHtml += '</div>';
        pHtml += '<div class="mlayer-loading">';
        pHtml += '<img src="' + mLayerSrc + 'skin/default/loading-'+ opts.mType + '.gif" alt="">';
        pHtml += '</div>';
        $(pHtml).appendTo($('body'));

        $('.mlayer-loading').show();

	},

	msg : function(options){
		var defaults = {
			mBgColor : '#fff',
			mOpacity : 0.1,
            mContent : '提示信息',
            speed : 2000
        };
        var opts = $.extend({}, defaults, options);
        var pHtml = '<div class="mlayer-shadow" style="background:' + opts.mBgColor + ';filter:alpha(opacity=' + (opts.mOpacity * 100) + ');-moz-opacity:'+ opts.mOpacity +';opacity:'+ opts.mOpacity +';">';
        pHtml += '</div>';
        pHtml += '<div class="mlayer-msg">';
        pHtml += '<div class="mlayer-msg-m">' + opts.mContent + '</div>';
        pHtml += '</div>';
        $(pHtml).appendTo($('body'));

        var mMsg = $('.mlayer-msg');
        var mMsg_d = mMsg.find('.mlayer-msg-m');

        //var mLeft = ($(window).width() - mMsg_d.width()) / 2;
        var mTop = ($(window).height() - mMsg_d.height()) / 2;
        mMsg.css({'top' : mTop + 'px', 'display' : 'block'});
        mMsg.show();

        setTimeout(function(){
	        mlayer.closeAll({mItem : 'msg'});
	    }, opts.speed);
	},

	closeAll : function(options){
		var defaults = {
            mItem : 'loading'
        };
        var opts = $.extend({}, defaults, options);

        if($('.mlayer-shadow').length > 0){
        	$('.mlayer-shadow').remove();
        }

        if($('.mlayer-' + opts.mItem).length > 0){
        	$('.mlayer-' + opts.mItem).remove();
        }
	}

}
//})();
