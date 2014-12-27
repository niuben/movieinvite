var scrollPageY = require('scrollPageY');
var $ = require('zepto');
var wechat = require('wechat');

scrollPageY({
	parent: '.js-page-content',
	section: 'section',
	callback: function(cur){
		var $cur = $(cur),
			$tpl = $('#' + $cur.attr('id') + '-tpl');
		if($tpl.length && $tpl.html() && !$(cur).attr('appended')){
			if($cur.attr('id') != "page1") {
				$(cur).attr('appended', true);
				$(cur).find('.wrap').append($tpl.html());
			}

			if($cur.attr('id') == "page6") {
				$('.page6-botton, .page6-botton2').on('touchstart', function(e){
					var url = $(this).attr("_href");
					location.href = url; 
				});
			}
		}
		//window.location.hash = 'p' + $cur.index();
	}
});

var screenObj = {
	width: 0,
	isDrag: 0 ,
	touchmoveX: 0
};

$('.screen').on('touchstart', function(e){
	$(this).removeClass("screenAnimate");
	e.stopPropagation();
	screenObj.touchstartX = e.touches[0].clientX;	
	screenObj.width = window.innerWidth || 320;

});

$('body').on('touchmove', function(e){
	e.stopPropagation();
	screenObj.isDrag = true;
	screenObj.touchmoveX = e.touches[0].clientX;
	
	var parcent =  Math.floor( ( screenObj.touchmoveX - screenObj.touchstartX ) * 100 / screenObj.width)  ;
	if(parcent < 0 ) parcent = 0;


	$(".screen").css({
		"width": (100 - parcent) + "%",
		"margin-left": parcent + "%"
	});

	screenObj.parcent = parcent;
	//阻止滚动事件
	
	return false;
});
$('body').on('touchend', function(e){
	e.stopPropagation();
	if(!screenObj.isDrag){
		return false;
	};
	screenObj.isDrag = false;

	var width,marginLeft;
	if (screenObj.parcent > 30) {
		width = "0%";
		marginLeft = "100%";
		setTimeout(function(){
			$("#firstWrap").html($("#page1-tpl").html());
		}, 800);
	}else {
		width = "100%"
		marginLeft = "0%";
	}

	className = "screenShow";		
	$(".screen").addClass("screenAnimate").css({
		"width": width,
		"margin-left": marginLeft + "%"
	});

});


//分享到微信
wechat({
	imgUrl: 'http://lidashih5.duapp.com/movie/app/img/page1-logo.png',
	lineLink: 'http://lidashih5.duapp.com/movieslider/index.html?v=1',
	shareTitle: '电影《可爱的你》发布会邀请函',
	descContent: '电影《可爱的你》发布会邀请函'
});