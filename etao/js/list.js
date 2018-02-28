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
//								
				for(var i=0;i<response.data.length;i++){
					$("#navTop").append('<li><a href="list.html?cat_id=' +response.data[i].cat_id+ '">' +response.data[i].cat_name+ '</a></li>');
				}
				
//				'<li><a href="list.html">' +response.data[i].cat_name+ '</a></li>'			
				
			})


//实现页面分类列表导航功能
			$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(response){
//				
				
				for(var i=0;i<response.data.length;i++){
					$("#nav").append('<li><a href="list.html?cat_id=' +response.data[i].cat_id+ '">' +response.data[i].cat_name+ '</a></li>');
				}			
			})			
			//接受location.search获取get传参的数据
			var str = location.search.substr(1);
			//用分割方法得到 等号= 两把的内容
			var catId = str.split("=");
			//通过下标方式找到id的值
//			console.log(catId[1]);
					
			$.ajax({
				"url":"http://h6.duchengjiu.top/shop/api_goods.php",
				"type": "GET",
				"dataType": "json",
				"data": {
					"cat_id": catId[1]
				},
				"success": function(response){
					console.log(response.data.length);
					if(response.data.length===0){
						$("#goodsUl").append('<p>没有搜到您要找的商品......</p><img src="img/search0.jpg"/>')
					}					
					for(var i=0;i<response.data.length;i++){
					
						$("#goodsUl").append('<li><img src="' +response.data[i].goods_thumb+ '" alt="" /><p><a href="#">' +response.data[i].goods_name+  '</a></p><p>' +response.data[i].goods_desc+  '</p><p class="oP">￥' +response.data[i].price+'</p><button class="addCart">购&nbsp;&nbsp;物&nbsp;&nbsp;车</button></li>')
					
					}
					$(".addCart").click(function(){
//					console.log("1");
					if( !localStorage.getItem("token") ){
					alert("请登录后才能使用加入购物车功能！");					
					location.href = "login.html";
					return;
				}
				var aa= $(this).siblings().children("a");
				console.log(aa[0].href);
                var goodid=aa[0].href.substr().split("=")[1];
                console.log(goodid);
					var goods_number = localStorage.getItem("cart"+goodid);
					goods_number = goods_number ? parseInt(goods_number)+1 : 1;
					$.ajax({
					"url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+ localStorage.token,
					"type":"POST",
					"dataType": "json",
					"data": {
						"goods_id": goodid,
						"number": goods_number
					},
					"success": function(response){
//						console.log(response);
												
						//使用后存储商品数量到本地存储中
						localStorage.setItem("cart"+goodid,goods_number);
					}
				});
				})
				}
				
			});
			
			
	//根据搜索内容跳转到搜索页面
			$("#btn1").click(function(){
				//文本输入框内容
				var search = $("#search").val();				
//				console.log(search);			
				window.location.href =  "search.html?search_text=" + search;			
			})		
			
			//点击弹出购物车框
$("#dropDownMenu").click(function(){
				$(".pullcart").slideToggle();
				$.ajax({
				"url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
				"type":"GET",
				"dataType": "json",
				"success": function(response){
					console.log(response);	
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
			