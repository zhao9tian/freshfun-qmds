var webUrl = 'https://www.freshfun365.com/FreshFun';
var imgUrl = "http://pic1.freshfun365.com"

var checkLogin = {
    /**
     * @desc 获取链接参数的值
     * @param  {string} name 参数名字
     * @param  {string} [url] 链接url，为空的时候取location.href
     * @return {string} 参数
     */
    getQueryString: function (name, url) {
        url = (url == null) ? window.location.href : url;
        url = url.split('#')[0];

        var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
        return reg.test(url) ? RegExp.$2.replace(/\+/g, " ") : '';
    },
    /**
     * @desc 跳转到微信登录授权界面
     */
    goWXLogin: function() {
        var url = encodeURIComponent(window.location.href);
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
            "appid=wx9820b9bacf3ba98a" + "&redirect_uri=" + url + "&response_type=code" +
            "&scope=snsapi_userinfo" + "&state=STATE#wechat_redirect";
    },
    /**
     * @desc 检查用户是否登录
     */
    checkLogin: function(){
        var _this = this;
        var promise = $.ajax({
            url: 'https://www.freshfun365.com/FreshFun/login/checkLogin.do',
            type: 'get',
            data: {
                code: this.getQueryString('code') || ''
            },
            dataType: 'json',
            success: function(res){
                if(res.status.code == 1022){
                  _this.goWXLogin();
                } else if(res.status.code == 1001) {
                    window.userId = res.data.userId;
                    getGoods();
                } else {
                    alert(res.status.msg);
                    _this.goWXLogin();
                }
            },
            error: function(){
                console.log('获取登录信息失败');
                _this.goWXLogin();
            }
        });
        return promise;
    }
};
checkLogin.checkLogin();

//动态加载商品
var getGoods = function(){
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
}
	


