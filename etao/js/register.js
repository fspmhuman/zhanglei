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



//用户名验证是否重复
			$('input[name="username"]').blur(function(){
				var username = $('input[name="username"]').val();
//				console.log(username);
				
				$.ajax({
					"url": "http://h6.duchengjiu.top/shop/api_user.php",
					"type": "POST",
					"dataType": "json",
					"data": {
						"status": "check",
						"username": username
					},
					"success": function(response){
//						console.log(response);
						
						if(response.code === 0){
							//成功
							$(".success").show();
							$(".error").hide();
						}else{
							$(".error").show();
							$(".success").hide();
						}
					}
				});
			})
			
			
			//注册的验证
			$("#reg").click(function(){
				var username = $('input[name="username"]').val();
				var password = $('input[name="password"]').val();
			
//				console.log(username,password);
				
				if(password.length < 6 || password.length > 20){
					alert("密码长度应该是6-20位之间");
					return;
				}
				
//				http://h6.duchengjiu.top/shop/api_user.php
			  //协议      域名/ip: 端口/path/文件夹/文件名?查询的参数#a
				
				$.ajax({
					"url": "http://h6.duchengjiu.top/shop/api_user.php",
					"type": "POST",
					"dataType": "json",
					"data": {
						"status": "register",
						"username": username,
						"password": password
					},
					"success": function(response){
						console.log(response);
						
						if(response.code === 0){
							alert("注册成功！~");
							window.location.href = "login.html";
						}
					}
				});
				
			})