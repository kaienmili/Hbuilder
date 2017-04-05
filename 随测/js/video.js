// JavaScript Document

/* 侧边栏定位 */
(function ($) {
    $.fn.mSidebarPos = function (options) {
        var defaults = {
            wWidth : 1190,
            mMaxTop : 70
        };
        var opts = $.extend({}, defaults, options);
        var _this = $(this);

        sidebarPos();
        $(window).resize(function(){
        	sidebarPos();
        });

        $('#js-video-sidebar').mRetailSidebarDetect();
        $('#js-sidebar-backtotop').click(function(){
        	$('body,html').stop().animate({scrollTop : 0}, 500);
        });

        function sidebarPos(){
        	var mRight = ($(window).width() - opts.wWidth) / 2 - _this.width() - 15;
	        var mTop = ($(window).height() - _this.outerHeight()) / 2;
	        if(mTop > opts.mMaxTop){
	        	mTop = opts.mMaxTop;
	        }
	        _this.css({'right' : mRight + 'px', 'top' : mTop + 'px'});
        }
    }
})(jQuery);

/* 侧边栏监测 */
(function ($) {
    $.fn.mRetailSidebarDetect = function (options) {
        var defaults = {
            mItem : 'li',
            mActive : 'active',
            mSpeed : 500
        };
        var opts = $.extend({}, defaults, options);
        var mH = [];

        //侧边栏监听
        var _this = $(this);
        var pItem = _this.find(opts.mItem);
        mRetailDetectPos();

        pItem.click(function(){
            $(this).addClass(opts.mActive).siblings().removeClass(opts.mActive);
            $(window).unbind('scroll');
            $('body,html').stop().animate({scrollTop : mH[$(this).index()]}, opts.mSpeed, function(){
                $(window).bind('scroll', wScrollFun);
            });
            return false;
        });

        function mRetailDetectPos(){
            for(var i = 0; i < pItem.length; i++){
                mH[i] = $(pItem.eq(i).attr('data-target')).offset().top;
            }
        }

        function wScrollFun(){
            var wH = $(window).height();
            var posTop = $(document).scrollTop();
            var diffValue = posTop + wH - $(pItem.eq(0).attr('data-target')).offset().top;

            if(diffValue > 0){
                _this.fadeIn();
            }else{
                _this.fadeOut();
            }

            $.each(mH, function(index, value){
                if(posTop >= value){
                    pItem.eq(index).addClass(opts.mActive).siblings().removeClass(opts.mActive);
                }
                if(index <= 0 && posTop + wH >= value){
                    pItem.eq(index).addClass(opts.mActive).siblings().removeClass(opts.mActive);
                }
            });
        }

        $(window).bind('scroll', wScrollFun).trigger('scroll');
    }
})(jQuery);

/* 视频滚动 */
(function ($) {
    $.fn.mActLinksScroll = function (options) {
        var defaults = {
        	mParent : 'ul',
        	mItem : 'li',
        	mPrev : '.m_actlinks_prev',
        	mNext : '.m_actlinks_next',
        	mSpeed : 5000,
            mScrollSpeed : 300,
            mCol : 1
        };
        var opts = $.extend({}, defaults, options);
		var _this = $(this);

        var mParent = _this.find(opts.mParent);
        mParent.html(mParent.html() + mParent.html());
        var mItem = mParent.find(opts.mItem);
        var mW = mItem.eq(0).outerWidth() * opts.mCol;
        var mPrev = _this.find(opts.mPrev);
        var mNext = _this.find(opts.mNext);

        mNext.click(function(){
        	mParent.animate({'marginLeft' : '-' + mW + 'px'}, opts.mScrollSpeed, function(){
        		for(var i = 0; i < opts.mCol; i++){
        			mItem = mParent.find(opts.mItem);
        			mItem.eq(0).appendTo(mParent);
        		}
        		mParent.css({'marginLeft' : 0});
        	});
        });
        mPrev.click(function(){
        	mParent.css({'marginLeft' : '-' + mW + 'px'});
        	for(var i = 0; i < opts.mCol; i++){
        		mItem = mParent.find(opts.mItem);
        		mItem.eq(mItem.length - 1).prependTo(mParent);
        	}
        	mParent.animate({'marginLeft' : '0px'}, opts.mScrollSpeed, function(){

        	});
        });

        var tScroll = setInterval(function(){
        	mNext.trigger('click');
        }, opts.mSpeed);

        _this.hover(function(){
        	clearInterval(tScroll);
        }, function(){
        	tScroll = setInterval(function(){
	        	mNext.trigger('click');
	        }, opts.mSpeed);
        });
    }
})(jQuery);