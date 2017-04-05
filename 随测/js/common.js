$(function(){
	$("#srchSub").click(function(){
		var url = window.location.href;
		var key = $('#srchText').val();
		url = url.toLowerCase();
		if (url.indexOf("jquery.aspx")>0 || url.indexOf("show.aspx")>0){
			if (key.lenght==0 || key=="请输入搜索关键字"){
				location.href = "http://www.jq-school.com/Jquery.aspx";
			}else{
				location.href = encodeURI("http://www.jq-school.com/Jquery.aspx?action=search&key="+key);
			}
		}else if (url.indexOf("material.aspx")>0 || url.indexOf("md.aspx")>0){
			if (key.lenght==0 || key=="请输入搜索关键字"){
				location.href = "Material.aspx";
			}else{
				location.href = encodeURI("http://www.jq-school.com/Material.aspx?action=search&key="+key);
			}
		}else{
			if (key.lenght==0 || key=="请输入搜索关键字"){
				location.href = "Article.aspx";
			}else{
				location.href = encodeURI("http://www.jq-school.com/Article.aspx?action=search&key="+key);
			}
		}
	});
	
	//页面加载
	var $window = $(window),
		$doc = $(document),
		$body = $("body"),
	    winWidth = $window.width(),
		docWidth = $doc.width(),
		docHeight = $doc.height(),
		winHeight = $window.height(),
		headHeight = $("#head").height(),
		$minute = $("#minute"),
		$container = $("#container"),
		minuteHeight = $minute.height(),
		afterheadHeight = $("#logowraper").height()+$("#navwraper").height()+30,
		speed = 250;
	//判断对象
	//$container.animate({"top":headHeight},speed*1.5);

	$(window).scroll(function(){
		if($(this).scrollTop() > 100){	
			//$container.stop().animate({"top":afterheadHeight},speed*1.5);
			$('#updown').fadeIn(300); 
			$("#head").css({"background":"url(images/bg2.gif) repeat-x 0 0"});
			$("#logowraper").hide();
			
		} else if($(this).scrollTop() < 100) {		
			//$container.stop().animate({"top":headHeight},speed*1.5);
			$('#updown').fadeOut(300); 
			$("#head").css({"background":"url(images/bg.gif) repeat-x 0 0"});
			$("#logowraper").show();
		};
	});
	
	// 导航效果 调用（外层框架，菜单外框架，列表标签，指针标签，速度，列表跟进指针样式名）
	navScroll(fnEach($("#navwraper")),fnEach($("#nav")),fnEach($("#navmenu")),"dd","dt",speed,"curr");  
	srchEff(fnEach($("#srchText")),176,140,speed);

	function fnEach(Dom){
		if(Dom.length !=0 ){
			return Dom;
		} else {
			return $(null);
		};
	};
	
	//搜索
	function srchEff(Dom,maxWidth,minWdith,speed){
		var value = Dom.val();
		Dom.focusin(function(e){
			var _self = $(e.target);
			//_self.animate({
			//	"width":maxWidth
			//},speed).val("");
			_self.val("");
			//return false;
		}).focusout(function(e){
			var _self = $(e.target);
			//_self.animate({"width":minWdith},speed);
			if(_self.val() === "") {
				_self.val(value);
			};
			//return false;
		});
		//return false;
	};
	
	//导航
	function navScroll(navwrap,Dom,Menu,list,curr,speed,defClass){
		var $list = Dom.find(list),
			listLen = $list.length,
			$menuList = Menu.find("dl"),
			menuLen = $menuList.length;
			i=0,arrListInfo = [],
			bool = true,
			currIdx = 0;
		for(i = 0;i<listLen; i++){
			var othis = $list.eq(i),
			    sPath = othis.find("a").attr("href"),
				sText = othis.text(),
				nPosX = othis.position().left,z;
			arrListInfo.push([sText,nPosX,sPath]);
			if(othis.hasClass(defClass)&&bool){
				Dom.append("<dt style=\"display:none;left:"+nPosX+"px;\"><a href=\""+ sPath +"\"><span>"+ sText +"</span><em></em></a></dt>")
				   .find(curr)
				   .fadeIn(200);
				bool = false;
				currIdx = i;
			};
			for(z=0;z<menuLen;z++){
				var omenu = $menuList.eq(z);
				if(Number(omenu.attr("name")) == i){
					omenu.css("left",nPosX)
					     .find("dd:last a").css("background","none");
				};
			};
		};
		setTimeout(function(){
			$list.bind("mouseover",function(){
				var index = $(this).index();
				fnAnimate(Dom,arrListInfo,index,$menuList,true);
				return false;
			});
			navwrap.bind("mouseleave",function(){
				$menuList.fadeOut(speed);
				fnAnimate(Dom,arrListInfo,currIdx,$menuList,false);
				return false;
			});
		},speed);
		function fnMenuShow(d,y){
			if(y != -1){
				d.eq(y).fadeIn(speed).siblings().fadeOut(speed);
			};
			return false;
		};
		function fnAnimate(d,a,x,m,b){
			d.find(curr)
			   .stop()
			   .animate({
				"left": a[x][1]
				},speed,function(){
					$(this).find("a")
						   .attr("href",a[x][2])
						   .find("span")
						   .text(a[x][0])
						   //.fadeIn(100);
					if(b){
						m.fadeOut(speed);
						fnMenuShow(m,x-1);
					};
				})
				.find("span")
				.hide();
			return false;
		};
		return false;
	};
});
