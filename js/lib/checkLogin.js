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
