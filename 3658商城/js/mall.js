// JavaScript Document

/* 商城首页 优选活动 */
(function ($) {
    $.fn.mActNewsScroll = function (options) {
        var defaults = {
        	mParent : 'ul',
        	mItem : 'li',
        	mPrev : '.m_actnews_prev',
        	mNext : '.m_actnews_next',
        	mSpeed : 3000,
            mScrollSpeed : 200,
            mCol : 2
        };
        var opts = $.extend({}, defaults, options);
		var _this = $(this);

        var mParent = _this.find(opts.mParent);
        var mItem = mParent.find(opts.mItem);
        var mH = mItem.eq(0).height();
        var mPrev = _this.find(opts.mPrev);
        var mNext = _this.find(opts.mNext);

        mNext.click(function(){
        	mParent.animate({'marginTop' : '-' + mH + 'px'}, opts.mScrollSpeed, function(){
        		for(var i = 0; i < opts.mCol; i++){
        			mItem = mParent.find(opts.mItem);
        			mItem.eq(0).appendTo(mParent);
        		}
        		mParent.css({'marginTop' : 0});
        	});
        });
        mPrev.click(function(){
        	mParent.css({'marginTop' : '-' + mH + 'px'});
        	for(var i = 0; i < opts.mCol; i++){
        		mItem = mParent.find(opts.mItem);
        		mItem.eq(mItem.length - 1).prependTo(mParent);
        	}
        	mParent.animate({'marginTop' : '0px'}, opts.mScrollSpeed, function(){

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



