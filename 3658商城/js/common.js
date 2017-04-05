// JavaScript Document

/*首页banner图片轮播代码*/
(function ($) {
    $.fn.mSliderBg = function (options) {
        var _options = {
            "speed": 5 * 1000,
            "fadespeed":0.5*1000,
			"fadeoutspeed":10,
			"bgtype": "image"
        };
        jQuery.extend(_options, options);
        var _this = $(this);
  		var _circle = _this.find('.circle');
		var img = _this.find(".banner_img");

		var _length = img.length;
		var n = 0, n_prev = 0;

		$("<ul></ul>").appendTo(_circle);
		for(var i = 0; i < _length; i++){
			_circle.find('ul').append('<li></li>');
		}

		var _prev = $(this).find('.prev');
		var _next = $(this).find('.next');

		var _li = _circle.find('ul li');
		_li.eq(0).addClass('active');
		if(_options.bgtype == "color"){
			img.each(function(){
				$(this).css({"background" : $(this).attr('bgColor') + " url('" + $(this).attr('bgImage') + "') no-repeat center top"});
			});
		}else if(_options.bgtype == "image"){
			img.each(function(){
				$(this).css({"background" : "url('" + $(this).attr('bgImage') + "') repeat-x top"});
			});
		}else if(_options.bgtype == "none"){
			img.each(function(){
				$(this).css({"background" : "#fff url('" + $(this).attr('bgImage') + "') no-repeat center top"});
			});
		}
		img.fadeOut().eq(0).fadeIn();

		var tShow = setInterval(sliderAuto, _options.speed);
		function sliderAuto(){
			n = n >= _length - 1 ? 0 : ++n;
			_li.eq(n).trigger('click');
		}

		_this.hover(function(){
			clearInterval(tShow);
			_prev.fadeIn();
        	_next.fadeIn();
		},function(){
			tShow = setInterval(sliderAuto, _options.speed);
			_prev.fadeOut();
        	_next.fadeOut();
		});

		_li.click(function(){
//			clearInterval(tShow);
			var mThis = $(this);
			if(!mThis.hasClass('active')){
				n = mThis.index();
				img.eq(n).css({'z-index' : '98'}).show();
				img.eq(n_prev).stop(false,true).fadeOut(_options.fadeinspeed,'linear', function(){
					img.eq(n).css({'z-index' : '100'});
				});
				$(this).addClass('active').siblings().removeClass('active');
				n_prev = n;
			}
//			tShow = setInterval(sliderAuto,_options.speed);
		});

		_prev.click(function(){
			n = n > 0 ? n-1 : _length - 1;
			_li.eq(n).trigger("click");
		});
		_next.click(function(){
			n = n < _length-1 ? n+1 : 0;
			_li.eq(n).trigger("click");
		});
    };
})(jQuery);

/* 页脚部分 图片链接向左滚动效果 */
(function ($) {
    $.fn.mScrollLeft = function (options) {
        /*默认配置*/
        var defaults = {
            mSpeed : 40,  /*滚动速度,值越大速度越慢*/
			mPadding : 20,
			mWidth : 1143
        };
        var opts = $.extend({}, defaults, options), intId = [];
		var _this = $(this);
        var _ul = $(this).find('ul');
		var _left, _widthLi;
		var _li = _ul.find('li');
/*
		var _width = 0;
		for(var i = 0; i <= _li.length; i++){
			_width = _width + _li.eq(i).width();
		}
		_width = 2 * opts.mPadding * _li.length + _width;
		if(_width >= opts.mWidth){
*/
			_ul.html(_ul.html() + _ul.html());
			var tScroll = setInterval(scrollAuto, opts.mSpeed);
			_this.hover(function(){
				clearInterval(tScroll);
			},function(){
				tScroll = setInterval(scrollAuto, opts.mSpeed);
			});
//		}
        function scrollAuto() {
			_widthLi = _ul.find("li:first").width() + opts.mPadding;
			_left = parseInt(_ul.css('margin-left'));
			_ul.animate({'margin-left': (_left - 1) + 'px'}, 0, function(){
				if((_left + _widthLi) <= 1){
					_ul.find("li:first").appendTo(_ul);
					_ul.css({'margin-left' : '0px'});
				}
			});
        }
    }
})(jQuery);

/*商城首页banner图片轮播代码*/
(function ($) {
    $.fn.mSlider_s = function (options) {
		var _options = {
            "speed": 5 * 1000,
            "fadespeed":0.5*1000
        };
        jQuery.extend(_options, options);
        var _slider = $(this);
		var img = _slider.find('.s_slider_d li');
		var _length = img.length;
		var bgIndex = 0;
		var _this = $('.s_banner');

		$("<ul class='s_slider_li'></ul>").appendTo(_slider);
		for(var i = 1; i <= _length; i++){
			_slider.find('.s_slider_li').append('<li>' + i + '</li>');
		}
		var _li = _slider.find('.s_slider_li li');

		img.eq(0).show().siblings().hide();
		_li.eq(0).addClass('on');
		_this.css({"background-color" : img.eq(0).attr('bgColor')});

		var tShow = setInterval(showAuto,_options.speed);
		function showAuto(){
			bgIndex = bgIndex >= _length - 1 ? 0 : ++bgIndex;
			_li.eq(bgIndex).trigger('click');
		}
		_li.click(function(){
//			clearInterval(tShow);
			bgIndex = $(this).index();
			_this.stop(false,true).animate({"backgroundColor" : img.eq(bgIndex).attr('bgColor')}, _options.fadespeed);
			img.filter(':visible').stop(false,true).fadeOut(_options.fadespeed,'linear');
			img.eq(bgIndex).stop(false,true).fadeIn(_options.fadespeed, 'linear');
			$(this).addClass('on').siblings().removeClass('on');;
//			tShow = setInterval(showAuto,_options.speed);
		});
		_slider.hover(function(){
			clearInterval(tShow);
			_this.stop().find('.s_prev, .s_next').fadeTo("show",0.9);
		},function(){
			_this.stop().find('.s_prev, .s_next').fadeTo("show",0.0);
			tShow = setInterval(showAuto,_options.speed);
		});
		_slider.find('.s_prev').click(function(){
			bgIndex = bgIndex <= 0 ? _length - 1 : --bgIndex;
			_li.eq(bgIndex).trigger('click');
		});
		_slider.find('.s_next').click(function(){
			bgIndex = bgIndex >= _length - 1 ? 0 : ++bgIndex;
			_li.eq(bgIndex).trigger('click');
		});
    };
})(jQuery);

/*商城首页带箭头的tab标签hover切换代码*/
(function ($) {
    $.fn.mTabArrow = function (options) {
		/*默认配置*/
        var defaults = {
            speed : 0.2 * 1000
        };
        var opts = $.extend({}, defaults, options), intId = [];
        var _this = $(this);
        var item = _this.find('.tab_items');
        var hd = _this.find('.hd');
        var bd = _this.find('.bd');
        var arrow = _this.find('.tab_arrow');
        var w = hd.eq(0).width();
        hd.hover(function(){
        	var index = $(this).parent().index() - 1;
        	bd.filter(':visible').hide();
        	item.eq(index).find('.bd').show();
        	arrow.stop().animate({'left' : (w * index) + 'px'}, opts.speed);

        	//图片懒加载
        	$(window).trigger('resize');
        }, function(){});
    };
})(jQuery);

/*商城首页各楼层的tab标签click切换代码*/
(function ($) {
    $.fn.mTabFloor = function (options) {
		/*默认配置*/
        var defaults = {
            speed : 0.2 * 1000
        };
        var opts = $.extend({}, defaults, options), intId = [];
        var _this = $(this);
        var item = _this.find('.tab_items');
        var hd = _this.find('.hd li');
        var bd = _this.find('.bd .s_fr_d');
        var w = hd.eq(0).width();
        hd.click(function(){
        	var index = $(this).index();
        	hd.removeClass('on');
        	$(this).addClass('on');
        	bd.eq(index).show().siblings().hide();

        	//图片懒加载
        	$(window).trigger('resize');
        });
    };
})(jQuery);

/* 团购首页banner图片轮播代码 */
(function ($) {
    $.fn.mGroupSliderBg = function (options) {
        var _options = {
            "speed": 5 * 1000,
            "fadespeed":0.5*1000,
			"fadeoutspeed":10
        };
        jQuery.extend(_options, options);
        var _this = $(this);
  		var _div = _this.find('.w');
		var img = _this.find(".w>a");
		var _length = img.length;
		var bgIndex = 0;

		$("<ul></ul>").appendTo(_div);
		for(var i = 0; i < _length; i++){
			_div.find('ul').append('<li></li>');
		}

		var _li = _div.find('ul li');
		_li.eq(0).addClass('active');
		_this.css({"background" : img.eq(0).attr('bgColor')});
		img.fadeOut().eq(0).fadeIn();

		var tShow = setInterval(sliderAuto, _options.speed);
		function sliderAuto(){
			bgIndex = bgIndex >= _length - 1 ? 0 : ++bgIndex;
			_li.eq(bgIndex).trigger('click');
		}

		_li.click(function(){
//			clearInterval(tShow);
			bgIndex = $(this).index();
			_this.stop(false,true).animate({"backgroundColor" : img.eq(bgIndex).attr('bgColor')}, _options.fadespeed);
			img.filter(':visible').stop(false,true).fadeOut(_options.fadespeed,'linear');
			img.eq(bgIndex).stop(false,true).fadeIn(_options.fadespeed, 'linear');
			$(this).addClass('active').siblings().removeClass('active');;
//			tShow = setInterval(showAuto,_options.speed);
		});

		_div.hover(function(){
			clearInterval(tShow);
		},function(){
			tShow = setInterval(sliderAuto, _options.speed);
		});
    };
})(jQuery);

/* 订单确认页面修改地址 */
(function ($) {
    $.fn.mAddrModify = function (options) {
        var defaults = {
			_className : 'm_alert'
		};
		var opts = $.extend({}, defaults, options);
        var _this = $(this);
		var wHeight = $(window).height();
		var wWidth = $(window).width();
		var mAlert = $('.' + opts._className);
		var mLeft = (wWidth - mAlert.width()) / 2;
		var mTop = (wHeight - mAlert.height()) / 2;

		mAlert.css({'left' : mLeft + 'px', 'top' : mTop + 'px'});

		_this.click(function(){
			$("<div id='shadow'></div>").appendTo($('body'));
			var _shadow = $('#shadow');
			_shadow.css({width : wWidth + 'px', height : wHeight + 'px'});

			mAlert.find('input[type="text"]').css({'border-color' : '#e5e5e5'});
    		mAlert.find('span.u_notice').html('');

			mAlert.show();
			mAlert.find('.s_addr_dd_h span').click(function(){
				_shadow.remove();
				mAlert.hide();
			});
			//如果是则绑定弹出框数据
            if ($(this).parent('div').hasClass('s_addr_d'))
            {
                set_value_form($(this).parent('div'));
            }
		});
    };
})(jQuery);

//弹出框数据
function set_value_form(obj)
{
    $('.s_addr_dd_m input[name="consignee"]').val(obj.children('input[name="consignee"]').val());

    $('.s_addr_dd_m input[name="address"]').val(obj.children('input[name="address"]').val());
    $('.s_addr_dd_m input[name="zipcode"]').val(obj.children('input[name="zipcode"]').val());
    $('.s_addr_dd_m input[name="mobile"]').val(obj.children('input[name="mobile"]').val());
    $('.s_addr_dd_m input[name="address_id"]').val(obj.children('input[name="address_id"]').val());
    $('.s_addr_dd_m input[name="email"]').val(obj.children('input[name="email"]').val());
    var html = obj.children('.vz_add_op').html();

    re = new RegExp("vzsel", "g");
    var html = html.replace(re, "sel");

    $('.s_addr_dd_m .vz_add_op').html(html);

}


/* tab选项卡切换 */
(function ($) {
    $.fn.mMenuTab = function (options) {
        var defaults = {
			detail: '.s_related_tab_d>div',
			li_c: 's_tab_c',
			act : 'default'
        };
		var opts = $.extend({}, defaults, options);
        var _this = $(this);

		var pli = _this.find('li');
		var pdetail = _this.parent().find(opts.detail);
		pli.eq(0).addClass(opts.li_c);
		pdetail.eq(0).show().siblings().hide();

		pli.click(function(){
			var n = $(this).index();
			var pay_code = $(this).attr('data-value');
			$(this).addClass(opts.li_c).siblings().removeClass(opts.li_c);
			pdetail.eq(n).show().siblings().hide();

			if(opts.act == 'checkout'){
				$('#m_pay_type').attr({'value' : pay_code});

				if( pay_code == 'pay_balance' ) {
					$("#balance").find('input:radio[name="payment_id"]:eq(0)').attr('checked', 'checked');
					$("#check_pay_password").show();
					$("#check_pay_password_link").show();
				} else if( pay_code == 'pay_offline' ){
					$("#online_banking").find('input:radio[name="payment_id"]:eq(0)').attr('checked', 'checked');
				} else if( pay_code == 'pay_credit' ) {
					$("input[name=payment]").attr({'value' : 'CMB|308'});
				} else if( pay_code == 'pay_cash' ) {
					$("input[name=payment]").attr({'value' : 'ICBC|1025'});
				} else if( pay_code == 'pay_platform' ) {
					$("input[name=payment]").attr({'value' : 'ALIPAY|36581'});
				}else if( pay_code == 'pay_xianfeng' ) {
					$("input[name=payment]").attr({'value' : 'CMB'});
				}

				if( pay_code != 'pay_balance' )
				{
					$("#check_pay_password").hide();
					$("#check_pay_password_link").hide();
				}
			}

			//图片懒加载
        	$(window).trigger('resize');
		});
    };
})(jQuery);

/* 银行卡选择 */
(function ($) {
    $.fn.mBankShow = function (options) {
        var defaults = {
        	operation: 'shopping',
			speed: 1000,
			page: 'default'
        };
		var opts = $.extend({}, defaults, options);
        var _this = $(this);
		var _click = _this.find('.s_bank_hclick');
		var _li_div = _this.find('.s_bank_list');
		var _li = _li_div.find('li');
		var flag = false;

		_click.click(function(){
			if(!flag){
				_li_div.show();
				_click.addClass('s_bank_hclick_c');
				flag = true;
			}else{
				_li_div.hide();
				_click.removeClass('s_bank_hclick_c');
				flag =false;
			}
		});
		_li.click(function(){
			var _index = $(this).index();
			var _parent = _click.parent();
			if(opts.operation == 'topup')
			{
				/*充值*/
				_parent.find("input[id=payment_code").attr({'value' : $(this).attr('id')});
			}
			else
			{
				 $("input[name=payment]").attr({'value' : $(this).attr('id')});
				 $("input[name=payment_id]").attr("checked",false);
			}
			_parent.find('.s_bank_hshow').html($(this).html());
			_li_div.hide();
			_click.removeClass('s_bank_hclick_c');
			if(opts.page == 'deposit'){
				var lmtday = $(this).attr('lmtday');
				var lmteach = $(this).attr('lmteach');
				_this.find('.u_fund_lmtday').html(lmtday);
				_this.find('.u_fund_lmteach').html(lmteach);
			}
			flag = false;
		});
    };
})(jQuery);

/* 订单确认页面其他信息 */
(function ($) {
    $.fn.mWrapToggler = function (options) {
        var defaults = {
			speed: 1000
        };
		var opts = $.extend({}, defaults, options);
        var _this = $(this);
		var _title = _this.find('h4');

		_title.toggle(function(){
			$(this).find('b').css({'background-position' : '0 -15px'});
			$(this).parent().find('.s_order_toggler_wrap').show();
		},function(){
			$(this).find('b').css({'background-position' : '0 0'});
			$(this).parent().find('.s_order_toggler_wrap').hide();
		});
    };
})(jQuery);

/* 公共部分 自执行代码 */
$(function() {
	var path = '/themes/3658mall';
	/* 页面顶部 弹出菜单效果 */
	$(".top .top_menu").hover(function(){
        $(this).addClass('hover');
    },function(){
        $(this).removeClass('hover');
    });


    /* 返回顶部代码 */
    $("#back-to-top").click(function () {
        $('body,html').animate({ scrollTop: 0 }, 500);
        return false;
    });

    /* 点击弹出二维码 */
    $('#js-code-wechat').click(function(){
        appAlert("3658mall微信公众号", path + "/images/code.jpg");
    });
    $('#js-app').click(function(){
        appAlert("3658mall官方APP下载", path + "/images/code_app.png");
    });

    $('#js-suspend-cart').click(function(){
    	var mSuspend = $('#js-suspend');
    	if(mSuspend.hasClass('on') ){
            mSuspend.removeClass('on');
            $(this).removeClass('active');
        }else{
            mSuspend.addClass('on');
            $(this).addClass('active');
        }
    });

    //任务中心代码
   	$('#js-taskcenter, #js-suspend-task').click(function(){
   		get_all_task_list(1 , 0);
   		if($('#shadow').length <= 0){
   			$('<div id="shadow"></div>').appendTo($('body'));
   		}
        $('#js-mytask').fadeIn();
        //点击叉号关闭
        $('#js-task-close').click(function(){
        	$('#js-mytask').fadeOut().hide();
        	$('#shadow').remove();
        });
    });

    //计算器
    var pcalc = $('#js-calc');
    pcalc.find('.m_calc_tab li').eq(0).addClass('m_calc_tab_c').siblings().removeClass('m_calc_tab_c');
    pcalc.find('.m_calc_tab_d>div').eq(0).show().siblings().hide();
    pcalc.find('.m_calc_tab li span').click(function(){
        var pindex = $(this).parent().index();
        $(this).parent().addClass('m_calc_tab_c').siblings().removeClass('m_calc_tab_c');
        pcalc.find('.m_calc_tab_d>div').eq(pindex).show().siblings().hide();
    });
});

/* 计算收益 */
function calculateEarnings(obj, val) {
    var money = parseInt(obj.elements['money'].value);
    var month = parseInt(obj.elements['month'].value);
    //var annual_min = parseFloat(obj.elements['annual_min'].value);
    var annual_max = parseFloat(obj.elements['annual_max'].value);
    if(money < 100 || isNaN(money))
    {
        $(".earnings" + val).html('请填写正确的投入金额');
        return false;
    }
    if(month < 1 || isNaN(month))
    {
        $(".earnings" + val).html('请填写正确的投入期限');
        return false;
    }
    //计算公式：  金额*年化/12*月份
    //var earnings_min = parseFloat(money * annual_min / 12 * month).toFixed(2);
    var earnings_max = parseFloat(money * annual_max / 12 * month).toFixed(2);
    $(".earnings"+ val).html('￥' + earnings_max + '元');
    return false;
}

/* 任务中心页面切换代码 */
(function ($) {
    $.fn.mTaskRate = function (options) {
        var defaults = {
        	mItem : 'dl',
        	mPro : '.m_task_pro_d',
        	mProSign : '.task_get_in',
        	mProShare : '.task_day_in'
        };
		var opts = $.extend({}, defaults, options);
        var _this = $(this);
   		var mLi = _this.find(opts.mItem);

   		mTaskRateSwitch(mLi.eq(0));
   		mLi.hover(function(){
   			mTaskRateSwitch($(this));
   		},function(){});

   		//切换进度条
   		function mTaskRateSwitch(item){
   			var mType = item.attr('data-type');
   			var pRate = $('#js-rate-' + mType);
   			if(mType == 'sign'){
   				var pProSign = pRate.find(opts.mProSign);
   				var pProShare = pRate.find(opts.mProShare);
   				pProSign.css({'height': parseFloat(item.attr('data-sign')) + '%'});
   				pProShare.css({'height': parseFloat(item.attr('data-day')) + '%'});
   			}else{
   				var pPro = pRate.find(opts.mPro);
   				pPro.css({'height': parseFloat(item.attr('data-rate')) + '%'});
   			}
   			$('#js-rate-' + mType).show().siblings().hide();
   		}
    };
})(jQuery);


/* *
 * 加入购物车后的自定义函数，弹出确认窗口，css样式在style.css中
 */
function mAddToCart(str, href1, href2, prompt_link_title, prompt_link_title2, tip_type){

	$("<div id='shadow'></div>").appendTo($('body'));
	if(tip_type == 'cart')
	{
		var mHtml = "<div id='s_addcart'><div class='s_addcart_h'><span></span>温馨提示</div><div class='s_addcart_d'><p>" + str + "</p><a href=" + href1 + " class='btn btn_white'>"+prompt_link_title+"</a><a href=" + href2 + " class='btn btn_yellow'>"+prompt_link_title2+"</a><div class='hr_20'></div></div></div>";
	}
	else if(tip_type == 'tips')
	{
		var mHtml = "<div id='s_addcart'><div class='s_addcart_h'><span></span>温馨提示</div><div class='s_addcart_d'><p>" + str + "</p><a href=" + href1 + " class='btn btn_white'>"+prompt_link_title+"</a><a href=" + href2 + " class='btn btn_yellow'>"+prompt_link_title2+"</a><div class='hr_20'></div></div></div>";
	}

	$(mHtml).appendTo($('body'));
	var pshadow = $('#shadow');
	var msn = $('#s_addcart');
	var mleft = ($(window).width() - msn.width())/2;
	var mtop = ($(window).height() - msn.height())/2;
	msn.css({left : mleft + 'px', top : mtop + 'px'});
	msn.find('.s_addcart_h span,.btn').click(function(){
		mConfirmClose(msn);
	});
}

/* 关闭弹窗 */
function mConfirmClose(item){
	if($('#shadow').length > 0){
		$('#shadow').remove();
	}
	if(item.length > 0){
    	item.remove();
	}
}


//签到
(function($){
	$.fn.mSign=function(options){
		var defaults={
			mUrl : location.href,
			mTitle : "",
			mPic : "https://www.3658mall.com/themes/3658mall/images/logo.gif",
			mFrom : "1、我在3658商城拿到分红了，你也来拿吧！2、3658分红平台，我的赚钱神器，你也来赚吧！3、去3658分红平台，天天白领钱！",
			Shade:true,
			Event:"click",
			Content:"Sign",
			Title:"您已获得10红金宝奖励"
		};
		var opts=$.extend(defaults, options);
		var _this = $(this);

		_this.click(function(){
			var share_title = opts.mTitle;
			var share_data = opts.mFrom;
			var mData = $(this).attr('data');

			var share_html = "";
			share_html += '<div id="Sign"><ul>';
			share_html += '<li title="分享到QQ空间"><a href="javascript:void(0)" class="share1"><i></i><span></span></a></li>';
			//share_html += '<li title="分享到新浪微博"><a href="javascript:void(0)" class="share2"><i></i><span></span></a></li>';
			share_html += '</ul>';
			share_html += '<div class="sign_tips">签到分享，每次好友点击，您可获得10红金宝额外奖励！<a href="https://www.3658mall.com/article.php?id=384" target="_black">点击查看详情</a></div>';
			share_html += '</div>';
			$('body').prepend(share_html);

			var layer_width=$('#'+opts.Content).outerWidth(true);
			var layer_height=$('#'+opts.Content).outerHeight(true) + 40;
			var layer_top=(layer_height+40)/2;
			var layer_left=(layer_width+40)/2;
			var load_left=(layer_width-36)/2;
			var load_top=(layer_height-100)/2;
			var layerhtml="";
			if((opts.Shade==true) && !$('.Smohan_Layer_Shade').length){
				layerhtml+='<div class="Smohan_Layer_Shade" style="display:none;"></div>';
			}
			layerhtml+='<div class="Smohan_Layer_box" style="width:'+layer_width+'px;height:'+layer_height+'px; margin-top:-'+layer_top+'px;margin-left:-'+layer_left+'px;display:none;" id="layer_'+opts.Content+'">';
			layerhtml+='<h3><b class="text">'+opts.Title+'</b><a href="javascript:void(0)" class="close"></a></h3>';
			layerhtml+='<div class="layer_content">';
			layerhtml+='<div class="loading" style="left:'+load_left+'px;top:'+load_top+'px;"></div>';
			layerhtml+='<div id="'+opts.Content+'" style="display:block;">'+$("#"+opts.Content).html()+'</div>';
			layerhtml+='</div>';
			layerhtml+='</div>';
			$('body').prepend(layerhtml);

			$('#layer_'+opts.Content).animate({opacity:'show',marginTop:'-'+layer_top+'px'},"slow",function(){
				$('.Smohan_Layer_Shade').show();
				$('.Smohan_Layer_box .loading').hide();
			});

			$('#Sign li').each(function() {
				$(this).hover(function(e) {
				  $(this).find('a i').animate({ marginTop: 2}, 'easeInOutExpo');
				  $(this).find('span').animate({opacity:0.2},'easeInOutExpo');
				 },function(){
				  $(this).find('a i').animate({ marginTop: 12}, 'easeInOutExpo');
				  $(this).find('span').animate({opacity:1},'easeInOutExpo');
				});
			});
			var share_url = mData;
			var share_desc = share_data;
			var share_pic = opts.mPic;  //默认的分享图片
			var share_from = encodeURIComponent(opts.mFrom); //分享自（仅用于QQ空间和朋友网，新浪的只需更改appkey 和 ralateUid就行）

			$('#Sign li a.share1').click(function(e)	//QQ空间
					{
						/*记录签到记录*/
						var param = {
						  url:share_url,
						  title:share_title,
						  pics:share_pic,
						  summary:share_desc,
						  site:share_from
						}

						var data = new Array();
						data['url'] = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
						data['param'] = param;
						$.mGoToSign('qq', data);
			});

			$('#Sign li a.share2').click(function(e) {	//新浪微博
				var param = {
				  url:share_url ,
				  appkey:'',
				  title:share_title +"\n"+ share_desc,
				  pic:share_pic,
				  ralateUid:'5586335385',
				  rnd:new Date().valueOf()
				}
				/*记录签到记录*/
				var data = new Array();
				data['url'] = 'http://v.t.sina.com.cn/share/share.php?';
				data['param'] = param;
				$.mGoToSign('sina', data);
			});

			$('.Smohan_Layer_box .close').click(function(e){
				$('.Smohan_Layer_box').animate({opacity:'hide',marginTop:'-300px'},"slow",function(){
					clearShare();
				});
			});

		});
	};
})(jQuery);


/**
 * 签到
 */
jQuery.mGoToSign = function (share_type, data) {
	$.ajax({
		async: false,
		url: "sign.html",
		type: "post",
		data:'act=sign_in&t=' + new Date().getTime(),
		success: function(result){
			result = $.parseJSON(result);
			if(result.error == 1 && result.msg != '') {
				alert(result.msg);
			} else if (result.url != '') {
				window.location.href = result.url;
			} else {
				if(share_type == 'sina') {
					data.param['url'] = result.msg;
					var temp = [];
					for( var p in data.param ){
					  temp.push(p + '=' + encodeURIComponent( data.param[p] || '' ) )
					}
				} else if (share_type == 'qq') {
					data.param['url'] = result.msg;
					var temp = [];
					for( var p in data.param ){
					  temp.push(p + '=' + encodeURIComponent( data.param[p] || '' ) )
					}
				}
				window.open(data.url + temp.join('&'));
			}
		}
	});
};

function clearShare(){
	$('.Smohan_Layer_Shade').hide();
	$('.Smohan_Layer_box .loading').show();
	window.location.reload();
}

/* 银联接口充值时弹窗，样式在style.css中 */
(function ($) {
    $.fn.mBankBefore = function (options) {
        var defaults = {};
		var opts = $.extend({}, defaults, options);
        var _this = $(this);
		var mAlert = $('.m_alert');
		var mLeft = ($(window).width() - mAlert.width()) / 2;
		var mTop = ($(window).height() - mAlert.height()) / 2;

		mAlert.css({'left' : mLeft + 'px', 'top' : mTop + 'px'});

		_this.click(function(){
			$("<div id='shadow'></div>").appendTo($('body'));
			mAlert.show();
			mAlert.find('h3 span').click(function(){
				$('#shadow').remove();
				mAlert.hide();
			});
		});
    };
})(jQuery);

/* 底部APP下载点击弹窗 */
function appAlert(str, path){
	$('<div id="shadow"></div>').appendTo($('body'));
	var mHtml = '<div id="m_app">';
	mHtml += '<div class="m_app_close"></div>';
	mHtml += '<div class="m_app_h">' + str + '</div>';
	mHtml += '<div class="m_app_d">';
	mHtml += '<p>打开微信，点击右上角的“+”，选择“扫一扫”，对准下方二维码。</p>';
	mHtml += '<img src="' + path + '" alt="" />';
	mHtml += '</div>';
	mHtml += '</div>';

	$(mHtml).appendTo($('body'));
	var pdiv = $('#m_app');
	var pLeft = ($(window).width() - pdiv.width()) / 2;
	var pTop = ($(window).height() - pdiv.height()) / 2;
	pdiv.css({left : pLeft + 'px', top : pTop + 'px'});

	pdiv.find('.m_app_close').click(function(){
		mConfirmClose(pdiv);
	})
}

/* 聚宝盆页面弹窗 */
function cartAlert(str1, str2, path1, path2){
	$('<div id="shadow"></div>').appendTo($('body'));
	var mHtml = '<div id="m_alert2">';
	mHtml += '<div class="m_alert2_d">';
	mHtml += '<p><span>' + str1 + '</span></p>';
	mHtml += str2;
	mHtml += '</div><div class="m_alert2_b">';
	mHtml += '<a href="' + path1 + '">立即设置</a>';
	mHtml += '<a href="' + path2 + '">继续认购</a>';
	mHtml += '<div class="clr"></div><span></span>';
	mHtml += '</div>';
	mHtml += '<span class="m_alert2_close"></span>';
	mHtml += '</div>';
	$(mHtml).appendTo($('body'));

	var pdiv = $('#m_alert2');
	var pLeft = ($(window).width() - pdiv.width()) / 2;
	var pTop = ($(window).height() - pdiv.height()) / 2;
	pdiv.css({left : pLeft + 'px', top : pTop + 'px'});

	pdiv.find('.m_alert2_close').click(function(){
		mConfirmClose(pdiv);
	})
}

/* 白拿白赚订单支付页面-银行卡选择 */
function mBankSelect(content){
    var pHtml = '<div class="mp-bank-select" id="js-bank-select">';
    pHtml += '<div class="mp-bank-select_h"><span>&times;</span>请选择银行卡</div>';
    pHtml += '<div class="mp-bank-select_d">';
    pHtml += content;
    pHtml += '<div class="clr"></div>';
    pHtml += '</div>';
    pHtml += '</div>';

    $("<div id='shadow'></div>").appendTo($('body'));
    $(pHtml).appendTo($('body'));

    var pdiv = $('#js-bank-select');
    var mTop = ($(window).height() - pdiv.height()) / 3;
    pdiv.css({'top' : mTop + 'px'});

    pdiv.find('.mp-bank-select_h span').click(function(){
        mConfirmClose(pdiv);
    });

    pdiv.find('li img').click(function(){
        var mSrc = $(this).attr('src');
        $('#js-bank-selected').attr({'src' : mSrc});
        mConfirmClose(pdiv);
    });
}

/**
 * 分享奖励
 * @param rsId
 * @param module
 */
function share_module_detail(rsId,module,mPic,mTitle,mDesc)
{
    
	var shareUrl,html;
    var host =  window.location.host;
	html = '<div id="shadow"  class = "m_shadow"></div>';
	html += '<div class=" m-share-a animated  popup" id="js-share">';
	html += '<a href="javascript:void(0);" class="popup-close "></a>';
	html += '<h3>分享链接</h3>';
	html +=	    '<div class="m-share-ad  popup-share">';
    html+= '<div class ="popup-qq">';
	html+= '<a href="javascript:void(0);" class="m-qq js-qq"></a>';
	html+= '<span class ="popup-introduction"  href ="">分享到QQ</span>';
	html+= '</div>';
	html+= '<div class ="popup-weibo">';
	html+= '<a  href="javascript:void(0);" class ="m-sina js-sina">' +
		'</a>';
	html+= '<span class ="popup-introduction" href ="">分享到微博</span>';
	html+= '</div>';
	html+= '<div class ="popup-space">';
	html+= '<a  href="javascript:void(0);" class ="m-qzone js-qzone"></a>';
	html+= '<span class ="popup-introduction" href ="">分享到空间</span>';
	html+= '</div>';
	html+= '<div class ="clr"></div>';
	html+= '</div></div>';
	$(html).appendTo($('body'));
	//是否登录
	Ajax.call('share.php?act=get_share_url', "module="+module, function(result){
		shareUrl = "https://"+host+"/sharenew-reward-"+module+"-"+rsId+"-"+result.userId+"-"+result.shareToken+".html";
		//分享
		var share = $('#js-share');
        share.show().removeClass('fadeOutDown').addClass('fadeInUp');
        share.find('.close,.popup-close').click(function(){
            $('#shadow').remove();
            share.removeClass('fadeInUp').addClass('fadeOutDown').hide();
            if(module=="goods")
            {
            	//console.log($('#is_zhongqiu').val());
            	if($('#is_zhongqiu').val()==1)
            	{
            		location.reload();
            	}            	
            }
        });
        //分享参数
        var shareOptions = {
        		mUrl : shareUrl
            };
        if(mPic != '')
        { 
        	if(mPic.indexOf('http://') <0 && mPic.indexOf('https://') <0 ) mPic = "https://"+host+"/"+mPic;
        	shareOptions.mPic = mPic;
        }
        if(mTitle != '') shareOptions.mTitle = mTitle;
        if(mDesc != '') shareOptions.mDesc = mDesc;
        if(module=="goods")
        {
        	if(rsId != ''){
        		shareOptions.is_goods_share = 1;
        		shareOptions.goods_id = rsId;
        	}
//        	if(rsId=="22304")
//        	{
//        		shareOptions.mTitle = "今年中秋，送礼不花钱！3658商城月饼礼盒免费领取啦！";
//                shareOptions.mDesc = "中秋送礼还在花钱？快来3658商城白拿吧！月饼、茶叶、智能手环、手机...数百种礼品，全部免费白拿！";
//        	}
//        	else if(rsId=="23063")
//        	{
//        		shareOptions.mTitle = "中秋礼，品茶香！正山小种免费领取中！";
//                shareOptions.mDesc = "3658商城中秋活动，联合正山小种全国代理商，推出精品正山小种喜庆礼盒装，让你白拿白赚，送亲戚、送父母，高端上档次！";
//        	}
//        	else if(rsId=="22827")
//        	{
//        		shareOptions.mTitle = "中秋活动，限量版定制手环免费领取！";
//                shareOptions.mDesc = "过节送礼，健康当先！3658商城智能手环，定制机芯，智能更稳定。运动计步、睡眠监测、来电提醒...随时随地，健康相伴！";
//        	}        	
        }
        $('#js-share li a').mShareNew(shareOptions);  //分享弹窗改版之前
        $('#js-share  .m-share-ad  a').mShareNew(shareOptions);//分享弹窗改版之后

        return;
    }, "POST", "JSON");
}

/*倒计时-sentangle*/
(function ($) {
	$.fn.timeLeft = function (options) {
		var defaults = {
			'end_time':'2017/9/23 15:00:00'
		};
		var opts = $.extend({}, defaults, options);
		var _this = $(this);
		opts.end_time = _this.attr("data-value");
		var EndTime= new Date(opts.end_time); //截止时间 
		var NowTime = new Date(); 
		var t =EndTime.getTime() - NowTime.getTime();
		var timeLeft =  function(){ 
			if(t<0)
		    {
				clearInterval(sint);
		    }
			t = t-1000;
			var d=Math.floor(t/1000/60/60/24); 
			var h=Math.floor(t/1000/60/60%24); 
			var m=Math.floor(t/1000/60%60); 
			var s=Math.floor(t/1000%60);
			if(d<=0)
			{
				_this.find(".t_d").hide();
			}
			else
			{
				_this.find(".t_d").html(d + "天"); 
			}
						
			if(h<=0 && d<=0)
			{
				_this.find(".t_h").hide(); 
			}
			else
			{
				_this.find(".t_h").html(h + "时"); 
			}
			if(m<=0 && h<=0 && d<=0)
			{
				_this.find(".t_m").hide();
			}
			else
			{
				_this.find(".t_m").html(m + "分"); 
			}
			if(m<=0 && h<=0 && d<=0 && s<=0)
			{
				_this.find(".t_s").html("订单正在取消中，请勿操作订单");
			}
			else
			{
				_this.find(".t_s").html(s + "秒"); 
			}
		}
		var sint = setInterval(timeLeft,1000); 
	}
})(jQuery);
/* 签到页面-签到完成后分享 */
(function ($) {
	$.fn.mShareNew = function (options) {
		var defaults = {	/*默认配置*/
				mTitle : "3658商城红包雨来袭，最高999元红包免费拆！",
				mUrl : "https://www.3658mall.com/topic-41.html",
				mPic : "https://www.3658mall.com/themes/3658mall/images/user/share.png",
				mFrom : "3658商城",
				mDesc : "该网站已稳定运营一年多，本人亲测，从注册开始，每一步都在赚钱，提现到账及时，天天有人发工资！",
				wechatTitle : "扫码分享",
				wechatImg : "/themes/3658mall/images/code.jpg",
				is_refresh:0, //是否刷新红包
				is_goods_share:0,//是否统计产品分享
				goods_id:0 //分享产品id
		};
		var opts = $.extend({}, defaults, options), intId = [];
		var _this = $(this);
		
		_this.click(function(){
			var mLi = $(this);
//			var share_title = $(this).attr('data-title');
//			var share_data = $(this).attr('data-content');
			var en_share_title = encodeURIComponent(opts.mTitle);
			var en_share_desc = encodeURIComponent(opts.mDesc);
			
			if(mLi.hasClass('js-kaixin')){	//开心网
				window.open('http://www.kaixin001.com/rest/records.php?title='+en_share_title+'&url='+opts.mUrl+'&content='+en_share_desc+'&pic='+opts.mPic+'&style=111&from='+opts.mFrom,'newwindow');
				if(opts.is_refresh==1)
				{
					is_share=1;
					$.ajax({url:"bonus.php?act=refresh"});
				}
			}
			
			if(mLi.hasClass('js-qzone')){		//QQ空间
				window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+opts.mUrl+"&title="+en_share_title+"&pics="+opts.mPic+"&summary="+en_share_desc+"&site="+en_share_desc+"","newwindow");
				if(opts.is_refresh==1)
				{
					is_share=1;
					$.ajax({url:"bonus.php?act=refresh"});
				}
				if(opts.is_goods_share==1)
				{
					$.ajax({url:"goods.php?act=ajax_set_share_count&goods_id="+opts.goods_id});
				}
			}
			
			if(mLi.hasClass('js-friend')){	//朋友网
				window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url='+opts.mUrl+'&pics='+opts.mPic+'&title='+en_share_title+'&summary='+en_share_desc+'&site='+en_share_desc+'','newwindow');
				if(opts.is_refresh==1)
				{
					is_share=1;
					$.ajax({url:"bonus.php?act=refresh"});
				}
			}
			
			if(mLi.hasClass('js-sina')){		//新浪微博
				var param = {
						url:opts.mUrl ,
						appkey:'',
						title:en_share_title +"\n"+ en_share_desc,
						pic:opts.mPic,
						ralateUid:'5586335385',
						rnd:new Date().valueOf()
				}
				var temp = [];
				for( var p in param ){
					temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
				}
				window.open('http://v.t.sina.com.cn/share/share.php?' + temp.join('&'));
				if(opts.is_goods_share==1)
				{
					$.ajax({url:"goods.php?act=ajax_set_share_count&goods_id="+opts.goods_id});
				}
			}
			
			if(mLi.hasClass('js-renren')){	//人人
				window.open('http://widget.renren.com/dialog/share?resourceUrl='+opts.mUrl+'&title='+en_share_title+'&pic=&description='+en_share_desc+'','newwindow');
				if(opts.is_refresh==1)
				{
					is_share=1;
					$.ajax({url:"bonus.php?act=refresh"});
				}
			}
			
			if(mLi.hasClass('js-qqblog')){	//腾讯微博
				window.open('http://share.v.t.qq.com/index.php?c=share&a=index&title='+en_share_title+"\n"+en_share_desc+'&site='+opts.mFrom+'&pic='+opts.mPic+'&url='+opts.mUrl+'','newwindow');
				if(opts.is_refresh==1)
				{
					is_share=1;
					$.ajax({url:"bonus.php?act=refresh"});
				}
			}
			
			if(mLi.hasClass('js-qq')){       //QQ好友
				var p = {
						url : opts.mUrl, /*获取URL，可加上来自分享到QQ标识，方便统计*/
						desc : opts.mDesc, /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
						title : opts.mTitle, /*分享标题(可选)*/
						summary : opts.mDesc, /*分享摘要(可选)*/
						pics : opts.mPic, /*分享图片(可选)*/
						flash : '', /*视频地址(可选)*/
						site : en_share_desc, /*分享来源(可选) 如：QQ分享*/
						style : '201',
						width : 32,
						height : 32
				};
				var s = [];
				for(var i in p){
					s.push(i + '=' + encodeURIComponent(p[i]||''));
				}
				
				window.open('http://connect.qq.com/widget/shareqq/index.html?' + s.join('&'));
				if(opts.is_refresh==1)
				{
					is_share=1;
					$.ajax({url:"bonus.php?act=refresh"});
				}
				if(opts.is_goods_share==1)
				{
					$.ajax({url:"goods.php?act=ajax_set_share_count&goods_id="+opts.goods_id});
				}
				//    window.open('http://connect.qq.com/widget/shareqq/index.html?url='+encodeURIComponent(opts.mUrl)+'&desc='+en_share_desc+'&title='+en_share_title+'&summary='+en_share_desc+'&pics='+opts.mPic+'&flash=&site='+en_share_desc+'&style=201&width=32&height=32&showcount=', 'newwindow');
			}
			
			if(mLi.hasClass('js-wechat')){  //微信
				var mHtml = '<div class="wechat_alert">';
				mHtml += '<div class="wechat_h"><span class="close">&times;</span>' + opts.wechatTitle + '</div>';
				mHtml += '<div class="wechat_d">';
				mHtml += '<img src="' + opts.wechatImg + '" alt="">';
				mHtml += '</div></div>';
				$(mHtml).appendTo($('body'));
				var pWechat = $('.wechat_alert');
				pWechat.find('.close').click(function(){
					pWechat.remove();
				});
				if(opts.is_refresh==1)
				{
					is_share=1;
					$.ajax({url:"bonus.php?act=refresh"});
				}
			}
		});
	}
})(jQuery);

/* 公用弹窗 */
function mnConfirm(options){
	var defaults = {
        mTitle : '温馨提示',
        mContent : '警告！',
        nextFun: function(){}
    }
    var opts = $.extend({}, defaults, options);
    var pHtml = '<div id="m_confirm">';
    pHtml += '<div class="m_confirm_h">' + opts.mTitle + '<span></span></div>';
    pHtml += '<div class="m_confirm_d">' + opts.mContent + '</div>';
    pHtml += '<div class="m_confirm_b">';
    pHtml += '<a href="javascript:void(0)" class="btn btn_red">确定</a>';
    pHtml += '<a href="javascript:void(0);" class="btn btn_gray">取消</a>';
    pHtml += '<div class="hr_20"></div>';
    pHtml += '</div>';
    pHtml += '</div>';

    $("<div id='shadow'></div>").appendTo($('body'));
    $(pHtml).appendTo($('body'));
    var pdiv = $('#m_confirm');
    pdiv.css({'margin-left': '-' + pdiv.width()/2 + 'px'});

    pdiv.find('.m_confirm_h span, .m_confirm_b a.btn_gray').click(function(){
        mnConfirmClose();
    });

    pdiv.find('.m_confirm_b a.btn_red').click(function(){
        opts.nextFun();
        mnConfirmClose();
    });
}
function mnAlert(options){
	var defaults = {
        mTitle : '温馨提示',
        mContent : '警告！'
    }
    var opts = $.extend({}, defaults, options);
    var pHtml = '<div id="m_confirm">';
    pHtml += '<div class="m_confirm_h">' + opts.mTitle + '<span></span></div>';
    pHtml += '<div class="m_confirm_d">' + opts.mContent + '</div>';
    pHtml += '<div class="m_confirm_bs">';
    pHtml += '<a href="javascript:void(0);" class="btn btn_red">确定</a>';
    pHtml += '<div class="hr_20"></div>';
    pHtml += '</div>';
    pHtml += '</div>';

    $("<div id='shadow'></div>").appendTo($('body'));
    $(pHtml).appendTo($('body'));
    var pdiv = $('#m_confirm');
    pdiv.css({'margin-left': '-' + pdiv.width()/2 + 'px'});
    pdiv.find('.m_confirm_h span, .m_confirm_bs a.btn').click(function(){
        mnConfirmClose();
    });
}
function mnConfirmClose(options){
	var defaults = {
		mShadow : $('#shadow'),
        mItem : $('#m_confirm')
    }
    var opts = $.extend({}, defaults, options);
	if(opts.mShadow.length > 0){
		opts.mShadow.remove();
	}
	if(opts.mItem.length > 0){
    	opts.mItem.remove();
	}
}

//商城首页弹窗
(function ($) {
    $.fn.mMallAd = function (options) {
        var defaults = {
            speed : 1000,
            autoSpeed : 3000,
            mItem : '#mask',
            mClose : '.mask_close',
            mLinks : '.mask_links',
            mLinks1 : '.mask_links1',
            mReg : '.mask_reg',
            mRegLinks : '.mask_reg_links'
        };
        var opts = $.extend({}, defaults, options);
        var mThis = $(this);
        var pDiv = $(opts.mItem);
        var mW = pDiv.width();
        var top_distance  = mThis.offset().top - $(document).scrollTop() + 32.5;
        var left_distance  = mThis.offset().left + 50;
        var mLeft = $(window).width()/2 - mW/2;
        var mTop = $(window).height()/10;
        var loginFlag = false;
        var closeFlag = false;

        var today_user_id = $(".js-user").attr("data-id");

        $(window).scroll(function(){
        	top_distance  = mThis.offset().top - $(document).scrollTop() + 32.5;
        	left_distance  = mThis.offset().left + 50;
        });
        $(window).resize(function(){
        	top_distance  = mThis.offset().top - $(document).scrollTop() + 32.5;
        	left_distance  = mThis.offset().left + 50;
        	mLeft = $(window).width()/2 - mW/2;
        	mTop = $(window).height()/10;
        });

        if(typeof(today_user_id)!='undefined'){
            //登录状态
            loginFlag = true;
            var today_date = new Date().toLocaleDateString();
            if($.cookie("ela_layti") !=null && (today_date == $.cookie("ela_layti"))&&($.cookie('user_id') != null)&&(today_user_id == $.cookie('user_id') )){  //同一个用户同一天内登录
                //不是首次登录
                $(opts.mLinks).hide();
                $(opts.mReg).hide();
                $(opts.mClose).hide();
            }else{ //用户是首次登录
                $(opts.mRegLinks).hide();
                pDiv.css({"left" : mLeft + 'px', "top" : mTop + 'px', "width" : mW + 'px'}).stop().show();
                $('<div id="shadow"></div>').appendTo($('body'));
                ela_layti  = new Date().toLocaleDateString(); //先获取弹层弹出的时间
                $.cookie("ela_layti ", ela_layti,{path: '/'});  //然后把它存到cookie
                $.cookie('user_id', $('.js-user').attr('data-id'));
                $('#shadow').click(function(){
                    mMaskClose();
                });
            }
        }else{  //未登录状态
            loginFlag = false;
            pDiv.css({"left" : mLeft + 'px', "top" : mTop + 'px', "width" : mW + 'px'}).stop().show();;
            $('<div id="shadow"></div>').appendTo($('body'));
            setTimeout(function(){
                if(!closeFlag){
                    mMaskClose();
                }
            }, opts.autoSpeed);
            $('#shadow').click(function(){
                mMaskClose();
            });
        }


        //close
        pDiv.find(opts.mClose).click(function(){
            mMaskClose();
        });

        //open
        mThis.click(function(){
            mMaskOpen();
        });


        function mMaskOpen(){
            if(loginFlag){
                $(opts.mRegLinks).hide();
            }else{
                $(opts.mRegLinks).show();
            }
            pDiv.css({"left" : left_distance + 'px', "top" : top_distance + 'px', "width" : '0px'}).stop().show();
            pDiv.animate({"left" : mLeft + 'px', "top" : mTop + 'px', "width" : mW + 'px'}, opts.speed, function(){
                $('<div id="shadow"></div>').appendTo($('body'));

                if(loginFlag){
                    ela_layti  = new Date().toLocaleDateString(); //先获取弹层弹出的时间
                    $.cookie("ela_layti ", ela_layti,{path: '/'});  //然后把它存到cookie
                    $.cookie('user_id', $('.js-user').attr('data-id'));
                }

                $(opts.mLinks).show();
                $(opts.mReg).show();
                $(opts.mClose).show();

                $('#shadow').click(function(){
                    mMaskClose();
                });
            });
        }

        function mMaskClose(){
            $(opts.mLinks).hide();
            $(opts.mReg).hide();
            $(opts.mClose).hide();
            $('#shadow').remove();
            pDiv.animate({"left" : left_distance  , "top" : top_distance, "width" : '0px'}, opts.speed, function(){
                closeFlag = true;
            });
        }
    }
})(jQuery);

//输入框清除 注册等页面用
(function ($) {
    $.fn.mInputClear = function (options) {
        var defaults = {
            mClose : '.username_close'
        };
        var opts = $.extend({}, defaults, options);
        var pDiv = $(this);
        var pClose = pDiv.parent().find(opts.mClose);
        pDiv.on("focus keyup", function(){
            pDiv.val().length == 0 ? pClose.hide() : pClose.show();
        });
        pClose.on('click',function(){
            pDiv.val("").focus();
            $(this).hide();
        });
    };
})(jQuery);

/* 商城首页 广告向左滚动 */
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