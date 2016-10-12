var userId = localStorage.getItem("userId");
console.log(userId);
//var userId = 1;
var webUrl = 'https://freshfun365.com/FreshFun';
var webUrl2 = 'http://192.168.3.28:8080';
var imgUrl = 'http://pic1.freshfun365.com';
var goodsUrl = 'https://www.freshfun365.com/api/app/FreshFunApp/goodsInfo.html?';

$.ajax({
	url:webUrl+"/proxy/toBrands.do?merchantProxyId=" + userId,
	type:"get",
	dataType:"json",
    success:function(data){
    	console.log(data);
    	if(data.length == 0){
    		console.log('kong1111');
    		var H = document.documentElement.clientHeight;
    		console.log(H);
    		$('section').css('padding','0');
    		$('.kong').css('display','block');
    		$('.kong').css('height',H);
    		$('button').click(function(){
    			window.location.href = "index.html";
    		})
    		return;
    	}
    	var str  = '';
    	var classArr = [];
    	$.each(data, function(n,obj) {
    		str += '<dl><dt><img src="'+imgUrl+obj.goodsImg+'"/></dt><dd><h4>'+obj.goodsName+'</h4><div class="goodsQRC'+obj.id+'">商品二维码</div></dd></dl>';
    		classArr.push('.goodsQRC'+obj.id);
    	});
    	$("section").html(str);
    	console.log(classArr);
    	//点击商品二维码
    	$.each(classArr, function(n,obj) {
    		$(obj).bind('touchstart',function(){
    			console.log(goodsUrl+data[n].id+'&isQRC='+userId);
    			//遮罩层没做，记得
				$('.maskLayer').css('display','block');
				$('.img img').attr('src',imgUrl+data[n].goodsDetailImg.split(',')[0]);
				$('.con h4').html(data[n].goodsName);
				$('.con h5').html(data[n].goodsDes);
				$('.pri span').html('￥'+data[n].goodsMoney);
				//微信二维码
				$('.QRC-img').html('').qrcode({
					text: goodsUrl+data[n].id+'&isQRC='+userId
				});
				var mycanvas1=document.getElementsByTagName('canvas')[0];
				var img=convertCanvasToImage(mycanvas1);  
				$('.QRC-img').html(img);
				//从 canvas 提取图片 image  
				function convertCanvasToImage(canvas) {  
				    //新Image对象，可以理解为DOM  
				    var image = new Image();  
				    // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持  
				    // 指定格式 PNG  
				    image.src = canvas.toDataURL("image/png");  
				    return image;  
				};
				
				$('.des').html("悦选   最愉悦的美食选择");
//				setDivCenter('.QRC');
//				console.log('.goodsQRC'+obj.id);
//				console.log('点击了'+obj);
//				if($('#rqrcode_share').length > 0) {
//					console.log(111);
//					$("#rqrcode_share").addClass("rqrcode_on");
//					$("#rqrcode_share").removeClass("rqrcode_off");
//					$("#rqrcode_share").css('display','block');
//				} else {
//					console.log(222);
//					$("body").qrcodeBox({
//				        title: "分享到微信朋友圈",
//				        des: "使用微信 “扫一扫” 即可分享网页到朋友圈",
//				        qrcodeText: "www.baidu.com",
//				        offsetX: 0,
//				        offsetY: 0
//				    });
//				}
			});
    	});
    		
    	
		
		//点击删除按钮
		$('.del').click(function(){
			$('.maskLayer').css('display','none');
		});
    },
    error: function() {
        console.log('焦点图未获取到');
    }
});



//让指定的DIV始终显示在屏幕正中间   
//  function setDivCenter(divName){   
//      var top = ($(window).height() - $(divName).height())/2;   
//      var left = ($(window).width() - $(divName).width())/2;   
//      var scrollTop = $(document).scrollTop();   
//      var scrollLeft = $(document).scrollLeft();   
//      $(divName).css( { position : 'absolute', 'top' : top + scrollTop, left : left + scrollLeft } ).show();  
//  }