var Class = 
{
    create: function() {
        return function() {
        	//返回一个function对象
            this.initialize.apply(this, arguments);
        }
    }
}
var Scroll = Class.create();
Scroll.prototype = 
{
	initialize: function(options) {
		this.setOptions(options);
		this.doScroll();
	},
	setOptions: function(options) {
		this.current = 1;
		this.speed = options.speed;
		this.timer = options.timer;
		this.auto = options.auto;
		this.clickStopauto = options.clickStopauto;
		this.slides = options.slides;
		this.point = options.point;
		this.totWidth = 0;
		this.positions = new Array();
		_this = this;
		$(".banner .slide").each(function(i) {
			_this.positions[i] = _this.totWidth;
			_this.totWidth += $(this).width();
		})
		$(".banner").css("width", this.totWidth);
		if(this.auto) 
			this.createInterval();
	},
	doScroll: function() {
		$(".number ul li img").click(function(e, keepScroll) {
			var self = _this;
			$(".number ul li img").attr("src", "../images/dot2.jpg");
			$(this).attr("src", "../images/dot1.jpg");
			var pos = $(this).parents("li").prevAll().length;	
			$('.banner').stop().animate({marginLeft:-_this.positions[pos]+'px'}, _this.speed);			
			if(_this.clickStopauto) {
				if(!keepScroll) 
					clearInterval(_this.itvl);
			} else {
				if(!keepScroll)
					_this.current = $(".number ul li img").index(this) + 1;
			}
		})
	},
	autoAdvance: function() {
		if(this.current == -1) 
			return false;	
		$(".number ul li img").eq(this.current%$(".number ul li img").length).trigger('click', true);
		this.current++;		
	},
	createInterval: function() {
		var changeEvery = this.timer;
		_this.itvl = setInterval( function() {
			_this.autoAdvance();
		}, _this.timer*1000);
	}
}
