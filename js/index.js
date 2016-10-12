var webUrl = 'https://freshfun365.com/FreshFun';
var imgUrl = "http://pic1.freshfun365.com"

//动态加载商品
$.ajax({
	url: webUrl+"/proxy/homepage.do",
	type:"get",
	dataType:"json",
	beforeSend: function() {
        $("section").html("");
    },
	success:function(data){
		console.log(data);
		var str = '';
		$.each(data.goodsByLimit, function(n,obj) {
			console.log(obj.merchantProxyId);
			if(obj.merchantProxyId==0){
				status = '待代理';
				
			}else{
				status = '已代理';
//				$('.agentState').css('background','#999');
			}
			str += '<dl class="agent'+obj.id+'"><dt><img src="'+imgUrl+obj.goodsImg+'"/></dt><dd><h4>'+obj.goodsName+'</h4><div><span>￥'+obj.goodsMoney+'</span><span>月销售<i>'+obj.sales+'</i>份</span></div></dd><div class="agentState"><span>'+status+'</span><span>￥'+obj.agencyFees+'</span></div></dl>';
		});
		$("section").html(str);
		
		$.each(data.goodsByLimit, function(n,obj) {
			console.log(obj.merchantProxyId);
			if(obj.merchantProxyId==0){
				$('.agent'+obj.id).find('.agentState').css('background','red');
			}else{
				$('.agent'+obj.id).find('.agentState').css('background','#999');
			}
			$('.agent'+obj.id).click(function(){
				window.location.href = "brandAgent.html?goodsId="+obj.id;
			})
		});
//		var cf = '<div class="clearfloat"></div>';
//		$("section").append(cf);
		
		var pagetime =0 ;
		//到底部，加载更多
		$(document).scroll(function(){
			var bheight = document.documentElement.clientHeight ;//获取窗口高度
			var sheight = $("body")[0].scrollHeight;//获取总高度，[0]是为了把jq对象转化为js对象
			var stop = $("body").scrollTop();//滚动条距离顶部的距离
			if(stop>=sheight-bheight){//当滚动条到顶部的距离等于滚动条高度减去窗口高度时
				console.log("到底部，加载更多");
                pagetime++;
				moreGoods(pagetime);//加载更多，获取数据
			}
		});
	}
});

//加载更多，获取数据
function moreGoods(pagetime){
	$.ajax({
	    url: webUrl+"/proxy/homepage1.do?pagetime="+pagetime,
	    type: "get",
	    dataType: "json",
	    success: function(data) {
            console.log(data);
            var more = '';
			$.each(data, function(n,obj) {
				console.log(obj.merchantProxyId);
				if(obj.merchantProxyId==0){
					status = '待代理';
					
				}else{
					status = '已代理';
//					$('.agentState').css('background','#999');
				}
				more += '<dl class="agent'+obj.id+'"><dt><img src="'+imgUrl+obj.goodsImg+'"/></dt><dd><h4>'+obj.goodsName+'</h4><div><span>￥'+obj.goodsMoney+'</span><span>月销售<i>'+obj.sales+'</i>份</span></div></dd><div class="agentState"><span>'+status+'</span><span>￥'+obj.agencyFees+'</span></div></dl>';
			});
			$("section").append(more);
			
			$.each(data, function(n,obj) {
				console.log(obj.merchantProxyId);
				if(obj.merchantProxyId==0){
					$('.agent'+obj.id).find('.agentState').css('background','red');
				}else{
					$('.agent'+obj.id).find('.agentState').css('background','#999');
				}
				$('.agent'+obj.id).click(function(){
					window.location.href = "brandAgent.html?goodsId="+obj.id;
				})
			});
			var cf = '<div class="clearfloat"></div>';
			$("section").append(cf);
	    },
	    error: function() {
	        console.log("未获取");
	    }
	});
}


//登录信息
if(localStorage.getItem("login_count") == null){
    login();
    localStorage.setItem("login_count","110");
}
function GetQueryStrings(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
function login(){
    //获取登录信息
    var ua = navigator.userAgent.toLowerCase();
    //如果是微信登录
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        var code = getQueryString('code');
        localStorage.setItem("wxCode",code);
        console.log(code);
        // var scode = GetQueryStrings('sign');
        var scode = '';
        console.log(scode);
        $.ajax({
            type : "get",
            url : "https://www.freshfun365.com/wz_pay/wx/wx_access.php?method=getWXUserInfo&code="+code,
            dataType : "JSON",
            success : function(response){
                var res = eval(response);
                console.log(response);
                var openid = res.openid;
                localStorage.setItem("openid",openid);
                console.log(res.headimgurl);
                localStorage.setItem("headImage",res.headimgurl);
                console.log(res.nickname);
                localStorage.setItem("nickname",res.nickname);
                console.log(res);
                $.ajax({
                    type : "post",
                    contentType: 'application/json;charset=utf-8',
                    dataType : "JSON",
                    url : webUrl+"/login/wzLogin.do",
                    data : JSON.stringify({
                        province : res.province,
                        openid : res.openid,
                        headimgurl : res.headimgurl,
                        language : res.language,
                        city : res.city,
                        country : res.country,
                        unionid : res.unionid,
                        nickname : res.nickname,
                        code : scode
                    }),
                    success : function(data){
                        console.log(data);
                        localStorage.setItem("userId",data);
                    },
                    error : function(){
                    }
                })
            },
            error : function(response){

            }
        });

    }
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}