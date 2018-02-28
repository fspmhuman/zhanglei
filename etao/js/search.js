//判断当前用户是否已经登录，如果已经登录显示用户名，否则显示登录注册的a标签
			if( localStorage.getItem("token") ){
				$(".login").html("用户：" + localStorage.getItem("username") + "<button class='clear'>取消登录</button>")
				$(".loginBTNall").html("欢迎回来：" + localStorage.getItem("username")+ "<button class='clear'>取消登录</button>");
			}
			
			$(".clear").click(function(){
				localStorage.clear();  //清除所有数据了！
				$(".login").html("<button id='login'>亲，请先登录</button>");
				$(".loginBTNall").html("<button id='loginBTN'>用户登录</button><button id=' register'>新用户注册</button>")
			})
//页面跳转按钮
$(".register").click(function(){
	location.href = "register.html";
	return;
})
$("#register").click(function(){
	location.href = "register.html";
	return;
})
$(".login #login").click(function(){
	location.href = "login.html";
	return;
})
$("#loginBTN").click(function(){
	location.href = "login.html";
	return;
})

$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(response){
						
                 		
				for(var i=0;i<response.data.length;i++){
					$("#navTop").append('<li><a href="list.html?cat_id=' +response.data[i].cat_id+ '">' +response.data[i].cat_name+ '</a></li>');
				}				
//				'<li><a href="list.html">' +response.data[i].cat_name+ '</a></li>'						
			})
//根据搜索内容跳转到搜索页面
			$("#btn1").click(function(){
				//文本输入框内容
				var search = $("#search").val();
				
//				console.log(search);
				
				
				window.location.href =  "search.html?search_text=" + search;
				
			})
			

			
//实现页面分类列表导航功能
$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(response){
//							  	
				for(var i=0;i<response.data.length;i++){
					$("#nav").append('<li><a href="list.html?cat_id=' +response.data[i].cat_id+ '">' +response.data[i].cat_name+ '</a></li>');
				}
				
//				'<li><a href="list.html">' +response.data[i].cat_name+ '</a></li>'			
				
			})

$("#dropDownMenu").click(function(){
				$(".pullcart").slideToggle();	
				$.ajax({
				"url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
				"type":"GET",
				"dataType": "json",
				"success": function(response){
//					console.log(response);
					$(".pullcart").html("");
					if(response.data.length === 0){
					$(".pullcart").html("您还没有购物");
					 return;
					}
					if(response.data.length > 0){
						//循环数据
						for(var i=0;i<response.data.length;i++){
							var obj = response.data[i];				
							var html="";
							html += `<div>
							<img src=${obj.goods_thumb}>
							<span>${ obj.goods_name }</span>
							<span class="goods-one">${ obj.goods_price }</span>		
							</div>`;														
							$(".pullcart").html( $(".pullcart").html()+html );
						}
					}
				}
			});
			})
			