function ctul(){
	var oul =document.createElement("ul")
 document.body.appendChild(oul);
 function createview(tagname,cont,supele){
 	var ele =document.createElement(tagname);
 	    ele.textContent = cont;
 	    supele.appendChild(ele);
 }
  
  createview("li","首页",oul);
  createview("li","搜索",oul);
  createview("li","注册",oul);
  createview("li","登录",oul);
};