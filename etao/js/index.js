//判断当前用户是否已经登录，如果已经登录显示用户名，否则显示登录注册的a标签
if(localStorage.getItem("token")) {
	$(".login").html("用户：" + localStorage.getItem("username") + "<button class='clear'>取消登录</button>")
	$(".loginBTNall").html("欢迎回来：" + localStorage.getItem("username") + "<button class='clear'>取消登录</button>");
	$(".head_portrait")[0].src = "img/5e08b97af6ee8cc7b9f06dcfcb491994.jpg"
}

$(".clear").click(function() {
	mizhu.confirm('', '是否要取消登陆？', function(flag) {
		if(flag) {
			mizhu.alert('', '退出成功');
			localStorage.clear(); //清除所有数据了！
			$(".login").html("<button id='login'>亲，请先登录</button>");
			$(".loginBTNall").html("<button id='loginBTN'>用户登录</button><button id=' register'>新用户注册</button>")
			$(".head_portrait")[0].src = "img/head.png"
		}
	});
})

//页面跳转按钮
$(".register").click(function() {
	location.href = "register.html";
	return;
})
$("#register").click(function() {
	location.href = "register.html";
	return;
})
$(".login #login").click(function() {
	location.href = "login.html";
	return;
})
$("#loginBTN").click(function() {
	location.href = "login.html";
	return;
})

//轮播-左边小
var $lis_lf = $(".m_unit_left ul li");
var idxlf = 0;
//右边按钮添加事件
$(".rightBtn").click(function() {
	if($lis_lf.eq(idxlf).is(":animated")) {
		return;
	}
	$lis_lf.eq(idxlf).fadeOut(300);
	idxlf++;
	if(idxlf > $lis_lf.length - 1) {
		idxlf = 0;
	}
	$lis_lf.eq(idxlf).fadeIn(300);
})
$(".leftBtn").click(function() {
	if($lis_lf.eq(idxlf).is(":animated")) {
		return;
	}
	$lis_lf.eq(idxlf).fadeOut(300);
	idxlf--;
	if(idxlf < 0) {
		idxlf = $lis_lf.length - 1;
	}
	$lis_lf.eq(idxlf).fadeIn(300);
})
var timer_lf = null;

function funlf() {
	//自动播放
	timer_lf = setInterval(function() {
		move_lf();
	}, 3000);
}
funlf();

function move_lf() {
	//函数节流，防止bug 动画累积
	if($lis_lf.eq(idxlf).is(":animated")) {
		return;
	}
	$lis_lf.eq(idxlf).fadeOut(1000);
	//信号量改变
	idxlf++;
	//范围
	if(idxlf > $lis_lf.length - 1) {
		idxlf = 0;
	}
	//新图淡入
	$lis_lf.eq(idxlf).fadeIn(1000);
}
//左右按钮移入显示	
$(".m_unit_left").mouseenter(function() {
	$(".btns a")[1].style.display = "block";
	$(".btns a")[0].style.display = "block";
})
$(".m_unit_left").mouseleave(function() {
	$(".btns a")[0].style.display = "none";
	$(".btns a")[1].style.display = "none";
})

//轮播-中间大
var $lis = $(".m_unit ul li");
//信号量
var idx = 0;

function move() {
	//函数节流，防止bug 动画累积
	if($lis.eq(idx).is(":animated")) {
		return;
	}
	$(".circles ol li").removeClass("cur");
	$lis.eq(idx).fadeOut(1000);
	//信号量改变
	idx++;
	//范围
	if(idx > $lis.length - 1) {
		idx = 0;
	}
	//新图淡入
	$lis.eq(idx).fadeIn(1000);
	$(".circles ol li").get(idx).className = "cur";
}
var timer = null;

function fun() {
	//自动播放
	timer = setInterval(function() {
		move();
	}, 3000);
}
fun();
$(".carousel").mouseenter(function() {
	clearInterval(timer);
})
$(".carousel").mouseleave(function() {
	fun();
})
$(".circles ol li").click(function() {
	$(".circles ol li").removeClass("cur");
	this.className = "cur";
	move()
})

//中间-登陆注册
//移入按钮变色
$("#login-center .loginBTNall button").mouseenter(function() {
	$("#login-center .loginBTNall button").removeClass("me");
	this.className = "me";
})
$("#login-center .loginBTNall button").mouseleave(function() {
	$("#login-center .loginBTNall button").removeClass("me");
})

$.get("http://h6.duchengjiu.top/shop/api_goods.php", function(response) {
	//								
	for(var i = 0; i < response.data.length; i++) {
		$("#navTop").append('<li><a href="list.html?cat_id=' + response.data[i].cat_id + '">' + response.data[i].cat_name + '</a></li>');
	}

	//				'<li><a href="list.html">' +response.data[i].cat_name+ '</a></li>'			

})

//实现页面分类列表导航功能
$.get("http://h6.duchengjiu.top/shop/api_goods.php", function(response) {
	//								
	for(var i = 0; i < response.data.length; i++) {
		$("#nav").append('<li><a href="list.html?cat_id=' + response.data[i].cat_id + '">' + response.data[i].cat_name + '</a></li>');
	}

	//				'<li><a href="list.html">' +response.data[i].cat_name+ '</a></li>'			

})
//获取数据
$.get("http://h6.duchengjiu.top/shop/api_goods.php", function(response) {
	console.log(response)
	for(var i = 0; i < response.data.length; i++) {
		$("#goodsUl").append('<li><img src="' + response.data[i].goods_thumb + '" alt="" /><p class="pA"><a class="pid" href="detail.html?goods_id=' + response.data[i].goods_id + '">' + response.data[i].goods_name + '</a></p><p class="desc">' + response.data[i].goods_desc + '</p><p class="oP">￥' + response.data[i].price + '</p><button class="Btn2">库存告急，快快下手抢！</button></li>')
	}

	//鼠标移入显示文字
	$("#show_part .goodsUl li").mouseenter(function() {
		console.log($(this).children(".pA")[0].children[0].style.color);
		$(this).children(".pA")[0].children[0].style.color = "blue";
		$(this).children(".desc").slideDown();
	})
	$("#show_part .goodsUl li").mouseleave(function() {
		$(this).children(".pA")[0].children[0].style.color = "darkcyan";
		$(this).children(".desc").slideUp();
	})

	$(".Btn2").click(function() {
		//					console.log("1");
		if(!localStorage.getItem("token")) {
			alert("请登录后才能使用加入购物车功能！");
			location.href = "login.html";
			return;
		}
		var aa = $(this).siblings().children("a");
		//				console.log(aa[0].href);
		var goodid = aa[0].href.substr().split("=")[1];
		//              console.log(goodid);
		var goods_number = localStorage.getItem("cart" + goodid);
		goods_number = goods_number ? parseInt(goods_number) + 1 : 1;
		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
			"type": "POST",
			"dataType": "json",
			"data": {
				"goods_id": goodid,
				"number": goods_number
			},
			"success": function(response) {
				console.log(response);

				//使用后存储商品数量到本地存储中
				localStorage.setItem("cart" + goodid, goods_number);
			}
		});
	})
});

//根据搜索内容跳转到搜索页面
$("#btn1").click(function() {
	//文本输入框内容
	var search = $("#search").val();

	//				console.log(search);

	window.location.href = "search.html?search_text=" + search;

})

//	购物车下拉及数据获取
$("#dropDownMenu").click(function() {
	$(".pullcart").slideToggle();

	$.ajax({
		"url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
		"type": "GET",
		"dataType": "json",
		"success": function(response) {
			//					console.log(response);
			$(".pullcart").html("");
			if(response.data.length === 0) {
				$(".pullcart").html("您还没有购物");
				return;
			}
			if(response.data.length > 0) {
				//循环数据
				for(var i = 0; i < response.data.length; i++) {
					var obj = response.data[i];
					var html = "";
					html += `<div>
							<img src=${obj.goods_thumb}>
							<span>${ obj.goods_name }</span>
							<span class="goods-one">${ obj.goods_price }</span>		
							</div>`;
					$(".pullcart").html($(".pullcart").html() + html);
				}
			}
		}
	});
})