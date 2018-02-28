//判断当前用户是否已经登录，如果已经登录显示用户名，否则显示登录注册的a标签
			if( localStorage.getItem("token") ){
				$("#login").html("用户：" + localStorage.getItem("username") + "<button class='clear'>取消登录</button>")
				$(".loginBTNall").html("欢迎回来：" + localStorage.getItem("username")+ "<button class='clear'>取消登录</button>");
			}			
			$(".clear").click(function(){
				localStorage.clear();  //清除所有数据了！
				$("#login").html("<button id='login'>亲，请先登录</button>");
				$(".loginBTNall").html("<button id='loginBTN'>用户登录</button><button id=' register'>新用户注册</button>")
			})

//信号量
		address_id = 0;
			
			
		//通过ajax调用数据库收货地址
		function addreddAjax(){
			$.ajax({
				"url": "http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.token,
				"type": "GET",
				"dataType": "json",
				"success": function(response){
					console.log(response);
					
					var html = '';
					for(var i=0;i<response.data.length;i++){
						var obj = response.data[i];
						
						html += '<li class="address-item" data-id="' + obj.address_id +'">收货人：'
								+ obj.address_name
								+ '省份：' + obj.province
								+ '市：'   + obj.city
								+ '地区：' + obj.district
								+ '街道：' + obj.address
								+ '手机号' + obj.mobile
								+ '<span class="remove">移除此地址</span></li>';
						
					}
					
					$(".addess-ul").html(html);
					
					//点击改变样式
					$(".address-item").click(function(event){
						$(this).addClass("active").siblings().removeClass("active");
						
						if(event.target){
							address_id = event.target.getAttribute("data-id");
							console.log(address_id);
						}
					})
					
					//删除事件
					$(".remove").click(function(){
						console.log(this.parentNode);
						//找到父级li元素
						var removeLi = this.parentNode;
						//DOM删除
						removeLi.parentNode.removeChild(removeLi);
						//调用ajax删除数据
						removeAjax(removeLi);
					})
					
				}
			})
		}
			
		addreddAjax();	
		
		
		
		
		//删除地址业务
		function removeAjax(obj){
			console.log( $(obj).attr("data-id") );
			
			var address_id = $(obj).attr("data-id");
			
			$.ajax({
				"url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token=" +localStorage.token+ "&status=delete&address_id="+address_id,
				"type":"get",
				"dataType": "json",
				"success": function(response){
					console.log(response);
				}
			});
			
		}
		
		//显示新增地址
		$(".newAddress").click(function(){
			$("#add").show();
		})
		//通过点击x字，关闭新增地址
		$(".close").click(function(){
			$("#add").hide();
		})
		
		//新建收货地址
		$("#btn").click(function(){
			var data = $("form").serialize();
			console.log(data);
						
			$.ajax({
				"url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.token+"&status=add",
				"type":"POST",
				"dataType": "json",
				"data": data,
				"success": function(response){
					console.log(response)
					if(response.code === 0){
						$("#add").hide();
						addreddAjax();
					}						
				}
			});
		})
		
		//获取总金额放入页面
		//通过location.erarch
		var sum = location.search.substr(5);
		
		$("#sum").html("<h3>当前订单总金额是：￥"+sum+"</h3>");
				
		//下订单
		$("#order").click(function(){
			
			if(address_id === 0){
				alert("请选择地址后在下订单");
				return;
			}			
			//订单
			$.ajax({
				"url":"http://h6.duchengjiu.top/shop/api_order.php?token="+localStorage.token+"&status=add",
				"type":"POST",
				"dataType": "json",
				"data": {
					"address_id": address_id, //用户地址id
					"total_prices": sum
				},
				"success": function(response){
					console.log(response);
					if(response.code === 0){
						alert("您的订单已成功提交！");
						location.href = "order.html";
					}
				}
			});			
		})