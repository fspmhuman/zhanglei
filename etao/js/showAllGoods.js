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
//根据搜索内容跳转到搜索页面
			$("#btn1").click(function(){
				//文本输入框内容
				var search = $("#search").val();
				
//				console.log(search);
				
				
				window.location.href =  "search.html?search_text=" + search;
				
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
			


//信号量
			var page = 1;
			showShop(page);
			
			function showShop(page){
				
				$.ajax({
					"url":"http://h6.duchengjiu.top/shop/api_goods.php?page="+page+"&pagesize=10",
					"type":"GET",
					"dataType": "json",
					"success": function(response){
						console.log(response);
						
						//添加数据
						for(var i=0;i<response.data.length;i++){
							$("#shop").append('<li><img src="' +response.data[i].goods_thumb+ '" alt="" /><p><a href="detail.html?goods_id=' +response.data[i].goods_id+ '">' +response.data[i].goods_name+  '</a></p><p>' +response.data[i].goods_desc+  '</p><p class="oP">￥' +response.data[i].price+'</p><button class="addCart" goodid="' +response.data[i].goods_id+ '">加入购物车</button></li>')
						}
						
						//分页
						for(var j=0;j<response.page.page_count;j++){
							$("#ButtonCenter").append('<span>' +(j+1)+ '</span>');
						}
					$(".addCart").click(function(){
					console.log("1");
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
						console.log(response);
												
						//使用后存储商品数量到本地存储中
						localStorage.setItem("cart"+goodid,goods_number);
					}
				});
				})
					}
					
				});
		
			}
			
			//上一页事件
			$("#ButtonPrev").click(function(){
				//信号量改变
				page--;
				//范围
				if(page <=1 ){
					page = 1;
				}
				$("#shop").html('');
				$("#ButtonCenter").html('');
				
				showShop(page);
				
				
				ButtonCenter.style.marginLeft = (page-1) * -52 + "px";
			})
			
			//下一页事件
			$("#ButtonNext").click(function(){
				//信号量改变
				page++;
				//范围
				
				$("#shop").html('');
				$("#ButtonCenter").html('');
				
				showShop(page);
				
				
				ButtonCenter.style.marginLeft = (page-1) * -52 + "px";
			})
			
			//分页的点击跳转
			$("#ButtonCenter").click(function(event){
				event = event || window.event;
				
				var target = event.target || event.srcElement;
				
//				console.log(target.nodeName);
				
				if(target.nodeName === "SPAN"){
					//得到当前分页的内容，存入变量
					page = target.innerText;
					
					$("#shop").html('');
					$("#ButtonCenter").html('');
				
					showShop(page);
				
				
					ButtonCenter.style.marginLeft = (page-1) * -52 + "px";
					
				}
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
			

				