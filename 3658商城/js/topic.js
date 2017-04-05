// JavaScript Document
$(document).ready(function(){    
	var flagGetBonus = true;
    $('#btnGetBonus').click(function(){
        if(flagGetBonus){
            flagGetBonus = false;
            url='bonus.php?act=get';
            $.ajax({
                type:'POST',
                //data:$('#form_grap').serialize(),
                url:url,
                datatype: "json",
                success:function(data){
                    console.log(data);
                    var data = eval('(' + data + ')');
                    flagGetBonus = true;
                    if(data.status){
                        $('body').mBonus();
                    }else{                    
                        if(data.url=='')
                        {
                            if(data.flag>0)
                            {
                                $('body').mBonus();
                                $('.packet_reward').html(data.flag+"红金宝");
                                $('.packet_cue').html(data.flag+"红金宝"+"已放入您的账户");                                
                            }
                            $('body').mBonus();
                            if(is_first)
                            {
                            	$('#js-open').trigger("click");
                            	is_first=false;
                            }
                            //$('#js-open').trigger("click");
                            return false;
                        }
                        else
                        {
                            $('body').mBonus();    
                            if(is_first)
                            {
                            	$('#js-open').trigger("click");
                            	is_first=false;
                            }
                            return false;
                        }
                    }
                }
            });
        }
    });
});

//登陆跳转
function redirect_url(url)
{
    
        url='bonus.php?act=is_login';
        $.ajax({
            type:'POST',
            url:url,
            datatype: "json",
            success:function(data){
                console.log(data);
                var data = eval('(' + data + ')');
                if(data.status){
                    window.open(url);  
                }
                else{
                   if(data.type=="iframe"){
                        $.fancybox.open({
                            href: data.url,
                            type: data.type,
                            padding: 5,
                            fitToView: true,
                            width: data.width,
                            height: data.height,
                            showCloseButton:true,
                            helpers : {  
                               overlay : { closeClick: false }
                            }
                        });
                   }
                }
            }
        });
}


/* 点击签到 */
function btnSign(){
    url='bonus.php?act=gosign';
    $.ajax({
        type:'POST',
        //data:$('#form_grap').serialize(),
        url:url,
        datatype: "json",
        success:function(data){
            console.log(data);
            var data = eval('(' + data + ')');
            if(data.status){
               window.location='day_sign.php';
            }
            else{
                if(data.type=="iframe"){
                    $.fancybox.open({
                        href: data.url,
                        type: data.type,
                        padding: 5,
                        fitToView: true,
                        width: data.width,
                        height: data.height,
                        showCloseButton:true,
                        helpers : {  
                           overlay : { closeClick: false }
                        }
                    });
                }
                else{
                    $.fancybox.open({
                        href: data.url,
                        type: data.type,
                        padding: 5,
                        fitToView: true,
                        //autoSize: true,
                        showCloseButton:true,
                        helpers : {  
                           overlay : { closeClick: false }
                        }
                    });
                }
            }
        }
    });
}

function openAfterLogin(is_reload,uid)
{
	userId=uid;
	topid=$('#topid').val();
	url=$('#redirect_url').val();
	console.log(userId);
	if(is_reload==0 )
	{	
		$('#toploginbar').load('topic-41.html #toploginbar');
		$('.promo_login').hide();
		url='bonus.php?act=open';
        $.ajax({
            type:'POST',
            //data:$('#form_grap').serialize(),
            url:url,
            datatype: "json",
            success:function(data){
                console.log(data);
                var data = eval('(' + data + ')');
                flagOpen = true;
                if(data.status){
                	if(topid!='41')
                	{
	                	$('body').mBonus();
	//            		$('#js-open').trigger("click");
	            		$('#js-box-invite').html("邀请好友");
                	}
                	else
                	{
                		location.reload(); 
                	}
                }
                else
                {
                	if(data.url!='')
                	{
	                	if(data.type=="iframe"){
	                        $.fancybox.open({
	                            href: data.url,
	                            type: data.type,
	                            padding: 5,
	                            fitToView: true,
	                            width: data.width,
	                            height: data.height,
	                            closeClick: false,
	                            showCloseButton:true,
	                            helpers : {  
	                               overlay : { closeClick: false }
	                            }
	                        });
	                    }
	                    else{
	                        $.fancybox.open({
	                            href: data.url,
	                            type: data.type,
	                            padding: 5,
	                            fitToView: true,
	                            closeClick: false,
	                            showCloseButton:true,
	                            helpers : {  
	                               overlay : { closeClick: false }
	                            }
	                        });
	                    }  
                	}
                	else
                	{
                		if(data.is_old=='1')
                		{
                			location.reload(); 
                		}
                		else
                		{
                			alert(data.data);
                		}
                	}
                }
            }
        });
		
	}
	else
	{
		if(url=="" || typeof(url) == "undefined")
		{
			location.reload();
		}
		else
		{
			window.location.href=url;
		}
		 
	}
}


//弹窗分享函数
function shareBox(options){
    var host =  window.location.host;
	var defaults = {
        mTitle : "3658商城红包雨来袭，最高999元红包免费拆！",
        mUrl : "https://"+host+"/topic-41.html",
        mPic : "https://"+host+"/themes/3658mall/images/user/share.png",
        mFrom : "3658商城",
        mDesc : "该网站已稳定运营一年多，本人亲测，从注册开始，每一步都在赚钱，提现到账及时，天天有人发工资！",
        userId : 0,
        wechatImg : "/themes/3658mall/images/code.jpg",
        bonus_real_money_number: 0,
        bonus_refresh_number: 0,
        is_refresh:0  //是否刷新红包
    }
    var opts = $.extend({}, defaults, options);

    $("<div id='shadow_a'></div>").appendTo($('body'));
    var share = $('#js-share');
    share.show().removeClass('fadeOutDown').addClass('fadeInUp');
    if(userId>0)
    {
//    	opts.mDesc="我刚刚在3658商城领取了"+opts.bonus_real_money_number+"元（随机9-999元）现金红包，签到、分享天天送钱（随机1-99元）。更有苹果手机、电脑、数码、各类家电免费白拿，还有月奖励高达30%的超级红筹噢！赶紧去看看！";
    }
    
    if(opts.is_refresh==1)
    {
    	$('#share_title').html("分享链接可刷新红包金额，您还有"+opts.bonus_refresh_number+"次机会刷新红包");
    }

    if(opts.bonus_refresh_number==0 && opts.is_refresh==1)
    {    	
    	opts.is_refresh=0;
    }
    
    
    var shareOptions = {
        mTitle : opts.mTitle,
        mUrl : "https://"+host+"/topic-41-" + opts.userId + ".html",
        mPic : opts.mPic,
        mFrom : opts.mFrom,
        mDesc : opts.mDesc,
        wechatImg : opts.wechatImg,
        bonus_refresh_number:opts.bonus_refresh_number,
        is_refresh:opts.is_refresh
    };
    share.find('.popup-share a').mShare(shareOptions);

    share.find('.close').click(function(){
        share.removeClass('fadeInUp').addClass('fadeOutDown').hide();
        $('#shadow_a').remove();
        if(opts.is_refresh==1 )
        {
        	if(is_share==1)
        	{
        		location.reload();
        	}
        }
    });
}

/* 拆红包效果 */
(function ($) {
    $.fn.mBonus = function (options) {
        /*默认配置*/
        var defaults = {
            mStar : 'packet_star',
            mHua : 'packet_hua',
            sumHua : 9,
            sumStar : 7,
            downTime : 3 * 1000,
            outTime : 1 * 1000,
            speed : 0.8 * 1000
        };
        var opts = $.extend({}, defaults, options);
        var _this = $(this);

        var pdiv = $('#js-bonus');
        var popen = pdiv.find('.packet_open');
        var pclose = pdiv.find('.packet_close');
        var tShow;

//        _this.click(function(){
            if($('#shadow').length <= 0){
                $('<div id="shadow"><div class="packet_bg animated"></div><div class="packet_meter"></div></div>').appendTo($('body'));
            }
            var shadow = $('#shadow');
            var wBg = shadow.find('.packet_bg').width();
            var leftBg = (wBg - shadow.find('.packet_bg').height())/2;

            shadow.find('.packet_bg').height(wBg).css({'margin-top' : '-' + leftBg + 'px'});

            shadow.find('animated').addClass('fadeIn');
            pdiv.show().addClass('fadeIn');

            pdiv.find('.close').click(function(){
                $('#shadow').remove();
                pdiv.removeClass('fadeIn').hide();
                clearInterval(tShow);
            });

            var flagOpen = true;
            $('#js-open').click(function(){
                if(flagOpen){
                    flagOpen = false;
                    url='bonus.php?act=open';
                    $.ajax({
                        type:'POST',
                        //data:$('#form_grap').serialize(),
                        url:url,
                        datatype: "json",
                        success:function(data){
                            console.log(data);
                            var data = eval('(' + data + ')');
                            flagOpen = true;
                            if(data.status){
                            	if(data.flag=='1')
                            	{
                            		$('.packet_reward').html(data.data+"红金宝");
                                    $('.packet_cue').html(data.data+"红金宝"+"已放入您的账户");
                            	}
                            	else
                            	{
                            		$('.packet_reward').html(data.data+"红金宝");
                                    $('.packet_cue').html("恭喜您获得"+(data.data/100)+"元("+(data.data)+"红金宝)");
                            	}
                                pclose.addClass('mshake');
                                setTimeout(function(){
                                    pclose.hide();
                                    popen.show();
                                    tShow = setInterval(bonusOpen, opts.speed);
                                    for(var i = 0; i < opts.sumStar; i++){
                                        $('<i></i>').appendTo(popen.find('.' + opts.mStar));
                                    }
                                    $('<div class="packet_light"></div>').appendTo(shadow);
                                }, opts.outTime);
                            }
                            else
                            {
                            	if(data.data>0)
                            	{
                            		$('.packet_reward').html(data.data+"红金宝");
                            		$('.packet_cue').html("恭喜您获得"+(data.data/100)+"元("+(data.data)+"红金宝)");
                                    $('#bonus_tip').html("注册完成即刻到账");
                                    $('#js-box-invite').html("注册领取");
                                    
                                    pclose.addClass('mshake');
                                    setTimeout(function(){
	                                    pclose.hide();
	                                    popen.show();
	                                    tShow = setInterval(bonusOpen, opts.speed);
	                                    for(var i = 0; i < opts.sumStar; i++){
	                                        $('<i></i>').appendTo(popen.find('.' + opts.mStar));
	                                    }
	                                    $('<div class="packet_light"></div>').appendTo(shadow);
	                                }, opts.outTime);
                            	}
                            	else
                            	{
                            		alert(data.msg);
                            	}                         	                         
                            }
                        }
                    });
                }
            });
//        });

        $('#js-box-invite').click(function(){
        	if($('#js-box-invite').html()!="邀请好友")
        	{
        	 flagOpen = false;
             url='bonus.php?act=open';
             $.ajax({
                 type:'POST',
                 url:url,
                 datatype: "json",
                 success:function(data){
                     console.log(data);
                     var data = eval('(' + data + ')');
                     flagOpen = true;
                     if(data.status){
                     	if(data.flag=='1')
                     	{
                     		$('.packet_reward').html(data.data+"红金宝");
                             $('.packet_cue').html(data.data+"红金宝"+"已放入您的账户");
                     	}
                     	else
                     	{
                     		$('.packet_reward').html(data.data+"红金宝");
                             $('.packet_cue').html("恭喜您获得"+(data.data/100)+"元("+(data.data)+"红金宝)");
                     	}
                         pclose.addClass('mshake');
                         setTimeout(function(){
                             pclose.hide();
                             popen.show();
                             tShow = setInterval(bonusOpen, opts.speed);
                             for(var i = 0; i < opts.sumStar; i++){
                                 $('<i></i>').appendTo(popen.find('.' + opts.mStar));
                             }
                             $('<div class="packet_light"></div>').appendTo(shadow);
                         }, opts.outTime);
                     }
                     else
                     {
                     	
                         	if(data.type=="iframe"){
	                                $.fancybox.open({
	                                    href: data.url,
	                                    type: data.type,
	                                    padding: 5,
	                                    fitToView: true,
	                                    width: data.width,
	                                    height: data.height,
	                                    showCloseButton:true,
	    	                            helpers : {  
	    	                               overlay : { closeClick: false }
	    	                            }
	                                });
	                            }
	                            else{
	                                $.fancybox.open({
	                                    href: data.url,
	                                    type: data.type,
	                                    padding: 5,
	                                    fitToView: true,
	                                    showCloseButton:true,
	    	                            helpers : {  
	    	                               overlay : { closeClick: false }
	    	                            }
	                                });
	                            }
                        
                     }
                 }
             });
        	}
             else
             {
            	 shareBox({userId:userId,wechatImg:wxQrcode,bonus_real_money_number:bonus_real_money_number});
             }
        	pdiv.find('.close').trigger("click");
        });
        /* 花束下落效果 */
        function bonusOpen(){
            var wh = $(window).height();
            var sum = opts.sumHua;
            var n = Math.ceil(Math.random() * sum);
            var left = Math.random() * 100;
            $('<img class="' + opts.mHua + '" src="/themes/3658mall/images/topic/packet/hua' + n + '.png" />').appendTo($('body'));
            var hua = $('.' + opts.mHua);
            var index = $('.' + opts.mHua).length - 1;
            hua.eq(index).css({left : left + '%'}).animate({top : wh + 'px'}, opts.downTime, 'linear');
            for(var i = index; i >= 0; i--){
                if(parseFloat(hua.eq(i).css('top')) >= wh){
                    hua.eq(i).remove();
                }
            }
        }
    }
})(jQuery);



/* 红包效果 */
(function ($) {
    $.fn.mPackage = function (options) {
        var defaults = {
            mItem : '.m_packet',
            mClose : '.m_packet_close',
            mOpen : '.m_packet_con',
            close : '.m_close',
            openSpeed : 1000,
            turnSpeed : 1500,
            mWidth : 328,
            mHeight : 429,
            mTop : 300,
            mScrollParent : 'ul',
            mScrollItem : 'li',
            scrollSpeed : 8 * 1000
        };
        var opts = $.extend({}, defaults, options);
        var pDiv = $(this);

        var msUl = pDiv.find(opts.mScrollParent).eq(0);
        var msLi = msUl.find(opts.mScrollItem);
        var msLeft = msLi.eq(0).outerWidth();
        var msRatio = 1;

        scrollAuto();
        function scrollAuto() {
            msUl.animate({'marginLeft' : '-' + msLeft + 'px'}, opts.scrollSpeed * msRatio, 'linear', function(){
                msLi.eq(0).appendTo(msUl);
                msUl.css({'margin-left' : 0});
                msLi = msUl.find(opts.mTags);
                msRatio = 1;
                scrollAuto();
            });
        }
        msLi.hover(function(){
            msUl.stop();
            msRatio = (1 - Math.abs(parseFloat(msUl.css('margin-left')))/msLeft);
        },function(){
            scrollAuto();
        });

        pDiv.find(opts.mScrollItem).click(function(){
            var mLi = $(this);
            var mLeft = mLi.offset().left - $(document).scrollLeft();
            var mTop = mLi.offset().top - $(document).scrollTop();
            var mW = mLi.width();
            var mH = mLi.height();
            var mLeft1 = ($(window).width() - opts.mWidth) / 2;

            //alert(mLeft + ' & ' + mTop + ' & ' + mW + ' & ' + mH);
            //初始化
            $(opts.mItem).hide();
            $(opts.mClose).show();
            $(opts.mOpen).hide();

            $(opts.mClose).css({'width' : mW + 'px', 'height' : mH + 'px', 'left' : mLeft + 'px', 'top' : mTop + 'px'});
            $(opts.mItem).show();
            $(opts.mClose).animate({'width' : opts.mWidth + 'px', 'height' : opts.mHeight + 'px', 'left' : mLeft1 + 'px', 'top' : opts.mTop + 'px'}, opts.openSpeed, function(){
                $(opts.mClose).hide();
                $(opts.mOpen).show();
                $('<div id="shadow"></div>').appendTo($('body'));
            });

            /* $('.js-get').click(function(event) {
                $(opts.mItem).find('.m_packet_reg').addClass('m_packet_reg_h');
                $(opts.mItem).find('.m_packet_open').addClass('m_packet_open_h');
            }); */

            $(opts.close).click(function(event) {
                $('#shadow').remove();
                $(opts.mItem).hide();
                $(opts.mItem).find('.m_packet_reg').removeClass('m_packet_reg_h');
                $(opts.mItem).find('.m_packet_reg').hide();
                $(opts.mItem).find('.m_packet_open').removeClass('m_packet_open_h');
                $(opts.mItem).find('.m_packet_open').show();
            });

        });


    }
})(jQuery);

/* 向上无缝滚动代码 */
(function ($) {
    $.fn.mScrollUp = function (options) {
        var defaults = {
            mParent : 'ul',
            mTags : 'li',
            mSpeed : 2 * 1000
        };
        var opts = $.extend({}, defaults, options);
        var pDiv = $(this);

        var mUl = pDiv.find(opts.mParent).eq(0);
        var mLi = mUl.find(opts.mTags);
        var mTop = mLi.eq(0).outerHeight();
        var mRatio = 1;

        //mUl.html(mUl.html() + mUl.html());
        scrollAuto();

        pDiv.hover(function(){
            mUl.stop();
            mRatio = (1 - Math.abs(parseFloat(mUl.css('margin-top')))/mTop);
        },function(){
            scrollAuto();
        });

        function scrollAuto() {
            mUl.animate({'marginTop' : '-' + mTop + 'px'}, opts.mSpeed * mRatio, 'linear', function(){
                mLi.eq(0).appendTo(mUl);
                mUl.css({'margin-top' : 0});
                mLi = mUl.find(opts.mTags);
                mRatio = 1;
                scrollAuto()
            });
        }
    }
})(jQuery);
/* 商品向上滚动代码 */
(function ($) {
    $.fn.mGoodsScroll = function (options) {
        var defaults = {
            mParent : '.newget1_goods_d',
            mItems : 'ul',
            mItem : 'li',
            divider : 6,
            mPrev : '.newget1_prev',
            mNext : '.newget1_next',
            speed : 500,
            spaceSpeed : 5000
        };
        var opts = $.extend({}, defaults, options);
        var pDiv = $(this);

        var len = pDiv.find(opts.mItem).length;
        var mWidth = pDiv.width();
        var page = Math.ceil(len/opts.divider);

        var tScroll = setInterval(scrollAuto, opts.spaceSpeed);
        function scrollAuto(){
            $(opts.mNext).trigger('click');
        }

        $(opts.mNext).click(function(event) {
            clearInterval(tScroll);
            var mContainer = pDiv.find(opts.mParent);
            mContainer.stop(false, false).animate({'marginLeft' : '-' + mWidth + 'px'}, opts.speed, function(){
                mContainer.find(opts.mItems).eq(0).appendTo(mContainer);
                mContainer.css({'marginLeft' : 0});
                tScroll = setInterval(scrollAuto, opts.spaceSpeed);
            });
        });
        $(opts.mPrev).click(function(event) {
            clearInterval(tScroll);
            var mContainer = pDiv.find(opts.mParent);
            mContainer.find(opts.mItems).eq(page - 1).prependTo(mContainer);
            mContainer.css({'marginLeft' : '-' + mWidth + 'px'});
            mContainer.stop(false, false).animate({'marginLeft' : '0px'}, opts.speed, function(){
                tScroll = setInterval(scrollAuto, opts.spaceSpeed);
            });
        });
        pDiv.hover(function(){
            clearInterval(tScroll);
        }, function(){
            tScroll = setInterval(scrollAuto, opts.spaceSpeed);
        });
    }
})(jQuery);

