var userId = localStorage.getItem("userId");
console.log(userId);
//var userId = 1;

var webUrl = 'https://www.freshfun365.com/FreshFun';

$("#add").click(function() {
	window.location.href = "addWithdraw.html";
});





//var blockInfo = '<div class="block"><span class="info-name">' + localStorage.getItem("infoName") + '</span><span id="content" class="info-num">' + localStorage.getItem("infoNum") + '</span></div>';
//var infoImg = localStorage.getItem("infoImg");
//$(".fill").prepend(blockInfo);
//$(".block").css("background-image", infoImg);
//$(".block").click(function() {
//	var infoName = $(".info-name").text();
//	var infoImg = $(".block").css("background-image");
//	var infoNum = $(".info-num").text();
//	localStorage.setItem("infoName", infoName);
//	localStorage.setItem("infoImg", infoImg);
//	localStorage.setItem("infoNum", infoNum);
//	window.location.href = "withdraw.html";
//});

//数据交互
$.ajax({
	url: webUrl+"/agentwithdraw/findAgentWithdrawWay.do?userId="+userId,
	type:"get",
	dataType:"json",
	success:function(data){
		console.log(data);
		var  blockInfo = '';
		var withdrawChannel;
		var channelArr = [];
		var classArr = [];
		$.each(data, function(n,obj) {
//			console.log(obj.withdrawChannel) ;
			if(obj.withdrawChannel == 0){
				withdrawChannel = "微信账号";
				
			}else if(obj.withdrawChannel == 1){
				withdrawChannel = "支付宝账号";

			}else if(obj.withdrawChannel == 2){
				withdrawChannel = "银行卡号";

			}
			blockInfo += '<div class="block block'+obj.id+'"><span class="info-name">' + withdrawChannel + '</span><span id="content" class="info-num">' + obj.withdrawAccount + '</span></div>';
			classArr.push('.block'+obj.id);
			channelArr.push(obj.withdrawChannel);
		});
		$(".fill").prepend(blockInfo);
		console.log(classArr);
		$.each(classArr, function(n,obj) {
			if(channelArr[n]==0){
				console.log(0);
				$(classArr[n]).css('background-image','url(./img/wechat.png)');
			}else if(channelArr[n]==1){
				console.log(1);
				$(classArr[n]).css('background-image','url(./img/pay.png)');
			}else if(channelArr[n]==2){
				console.log(2);
				$(classArr[n]).css('background-image','url(./img/card.png)');
			}
			$(classArr[n]).click(function(){
				$.ajax({
			    	url: webUrl+"/agentwithdraw/setDefaultWay.do?userId="+userId+"&id="+data[n].id,
			    	type:"get",
			    	dataType:"json",
			    	success:function(data){
			    		console.log(data);
			    		//数据交互成功后才跳转
			    		window.location.href = "withdraw.html";
			    	},
			    	error:function(){
			    		console.log('未获取')
			    	}
			    });
//				window.location.href = "withdraw.html";
			})
		});
		
	},
	error:function(){
		console.log('未获取')
	}
});