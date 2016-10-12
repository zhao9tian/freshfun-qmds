var webUrl = 'https://www.freshfun365.com/FreshFun';
var imgUrl = 'http://pic1.freshfun365.com';
var goodsId = window.location.href.split("?")[1].split("=")[1];
var userId =localStorage.getItem("userId");
var openId = localStorage.getItem("openid");
var code = localStorage.getItem("wxCode");
var shareImg;



var url= window.location.href.split("#")[0];
var sign = '';

$.ajax({
    url: "https://www.freshfun365.com/wz_pay/wx/share.php?url="+encodeURIComponent(url),
    type: 'get',
    dataType: 'JSON',
    success: function(res){
        var obj = eval(res);
        console.log(obj);
        wx.config({
            debug:false,
            appId:obj.appId,
            timestamp:obj.timestamp,
            nonceStr:obj.nonceStr,
            signature:obj.signature,
            jsApiList:['onMenuShareTimeline','onMenuShareAppMessage']
        });
        wx.ready(function(){
            wx.checkJsApi({
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ],
                success: function (res) {
                }
            });
            wx.onMenuShareTimeline({
                title: "全民电商",
                desc: "全球精选一流品牌,面向全国代理招商",
                link: url+"&sign="+sign,
                imgUrl: shareImg,
                success:function(){
                    console.log(url);
                    console.log("success");
                    console.log(eCodeBuild());
                },
                fail:function(res){
                    console.log("fail");
                }
            });
            wx.onMenuShareAppMessage({
                title: "全民电商", // 分享标题
                desc: "全球精选一流品牌,面向全国代理招商", // 分享描述
                link: url+"&sign="+sign, // 分享链接
                imgUrl: shareImg, // 分享图标
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    console.log(url);
                    console.log("success");
                },
                cancel: function () {
                    console.log("cancel");
                }
            });
        });
    }
});
function eCodeBuild(){
    var userId = localStorage.getItem("userId");
    var timestamp = Date.parse(new Date())/1000;
    var code_str = userId+"|"+timestamp;
    var code_val = base64encode(utf8to16(code_str));
    var eCode = encodeURIComponent(code_val);
    console.log(eCode);
    //微信分享
    return eCode;
}



getData();
//获取除商品详情图片以外的接口数据
function getData(){
    $.ajax({
        url: webUrl+"/proxy/goods.do?goodsID=" + goodsId,
        type: "get",
        dataType: "json",
        timeout: "30000",
        beforeSend: function() {
            $("#swiper-lb .swiper-wrapper").html("");
        },
        success: function(data) {
        	console.log(data);
            //以json格式存储到本地
            localStorage.setItem("goodsInfo", JSON.stringify(data));
            console.log(data);
            
            loadSwiperImg();
            loadText();
            detailImgs();
        },
        error: function() {
            console.log('焦点图未获取到');
        }
    });
}
//本地读取轮播数据
function loadSwiperImg(){
    var data = JSON.parse(localStorage.getItem("goodsInfo"));
    var headImg = '';
    var strs = new Array(); 
    //字符分割
    strs = data.goodsMongo[0].carouselImgPath.split(","); 
    shareImg = imgUrl + strs[0];
    for (var i = 0; i < strs.length; i++) {
        headImg += '<div class="swiper-slide"><img class="detail-imgs" src="' + imgUrl + strs[i] + '"></div>'
    };
//  console.log(headImg);
    $("#swiper-lb").find('.swiper-wrapper').html(headImg);
    var mySwiper_lb = new Swiper ('#swiper-lb', {
//      autoplay:4000,
		loop: true,
        pagination: '.swiper-pagination',
        paginationClickable :true,
        autoplayDisableOnInteraction: false,
    });
}
//本地读取文字数据
function loadText(){
    var data = JSON.parse(localStorage.getItem("goodsInfo"));
    console.log(data);
    var userId = data.goodsPOJO.merchantProxyId;
    var goodsId = data.goodsPOJO.id;
    var text = '';
    var shopPrice = '¥' + data.goodsPOJO.goodsMoney;
    var marketPrice = '¥' + data.goodsPOJO.marketMoney;
    var standardImg = '<img class="detail-imgs" src="' + imgUrl + data.goodsMongo[0].standardImgPath + '">'
    console.log(standardImg);

    var strs = new Array(); 
    //字符分割''
    strs = data.goodsMongo[0].des.split("@`"); 
    console.log(strs);
    $(".title span").html(strs[0]);
    $(".sub-title span").html(strs[1]);
    $(".content").html(strs[2]);
    $(".actual-price").html(shopPrice);
    $(".origin-price").html(marketPrice);
    $(".origin-price").prepend('<div class="delete-line"></div>');
    $(".standard").html(standardImg);
    //代理费
	$('.agentFeeTotal').html('￥'+data.goodsPOJO.agencyFees);
	//代理状态
	console.log(data.goodsPOJO.merchantProxyId);
	if(data.goodsPOJO.merchantProxyId == 0){
		$('.agentState').html('我要代理');
		$('.agentState').css('background','red');
		//调用支付接口
		pay();
	}else{
		$('.agentState').html('已代理');
		$('.agentState').css('background','#999');
	}
}

function detailImgs(){
	var data = JSON.parse(localStorage.getItem("goodsInfo"));
	console.log(data);
	var detailImg = '';
	var strs = new Array();  
	strs = data.goodsMongo[0].detailImgPath.split(",");
	for (var i = 0; i < strs.length; i++) {
	    detailImg += '<div class="detail-img"><img src="' + imgUrl + strs[i] + '"></div>'
	};
	$("#detailImgs").html(detailImg);   
	loadSwiperImg(); 
}



//去结算调支付
function pay(){
	$("#pay").click(function(){
	    if (typeof WeixinJSBridge == "undefined"){
	        if( document.addEventListener ){
	            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	        }else if (document.attachEvent){
	            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
	            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	        }
	    }else {
	        
	        $.ajax({
	            type: 'post',
	            url: 'https://www.freshfun365.com/FreshFun/quanMingPay.do',
	            dataType: 'JSON',
	            contentType: 'application/json;charset=utf-8',
	            data: JSON.stringify({
	                "userId": userId,
	                "goodsId": goodsId,
	                "openId":openId,
	                "code": code
	            }),
	            success: function (data) {
	                console.log(data);
	                console.log(data.data);
	                onBridgeReady(data.data);
	                
	            },
	            error: function (data) {
	                console.log(data);
	                
	            }
	        });
	    }
	});
	
	function onBridgeReady(payId){
	    var timestamp=new Date().getTime().toString();
	    var nonceStr = randomString(32);
	    var stringA = "appId=wx9820b9bacf3ba98a&nonceStr="+nonceStr+"&package=prepay_id="+payId+"&signType=MD5&timeStamp="+timestamp;
	    var stringSignTemp = stringA+"&key=lvfjkbdwyulnbcd441RYUIU563lkhfss";
	    var sign=hex_md5(stringSignTemp).toUpperCase();
	    console.log(sign);
	    WeixinJSBridge.invoke(
	        'getBrandWCPayRequest', {
	            "appId" : "wx9820b9bacf3ba98a",     //公众号名称，由商户传入
	            "timeStamp": timestamp,         //时间戳，自1970年以来的秒数
	            "nonceStr" : nonceStr, //随机串
	            "package" : "prepay_id="+payId,
	            "signType" : "MD5",         //微信签名方式：
	            "paySign" : sign //微信签名
	        },
	        function(res){
	            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
					var dataCon = JSON.parse(localStorage.getItem("goodsInfo"));
	                window.location.href = "withdrawSuccess.html?goodsName="+dataCon.goodsPOJO.goodsName+"&agencyFees="+dataCon.goodsPOJO.agencyFees;
	            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
	            else{
	            	var dataCon = JSON.parse(localStorage.getItem("goodsInfo"));
					window.location.href = "withdrawFail.html?goodsName="+dataCon.goodsPOJO.goodsName+"&agencyFees="+dataCon.goodsPOJO.agencyFees;
	            }
	        }
	    );
	    function randomString(len) {
	        len = len || 32;
	        var $chars = 'ABCDEFGHJKMNPQRSTWXYZ2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	        var maxPos = $chars.length;
	        var pwd = '';
	        for (i = 0; i < len; i++) {
	            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	        }
	        return pwd;
	    }
	}
}