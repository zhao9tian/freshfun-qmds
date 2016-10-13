var webUrl = 'https://www.freshfun365.com/FreshFun';
var imgUrl = 'http://pic1.freshfun365.com';
var webUrl2 = 'http://192.168.3.28:8080';
var withdrawCash = '';
$.ajax({
    url: webUrl+"/withdrawController/getMyMoneyB.do",
    type: "get",
    dataType: "json",
    success: function(data) {
        console.log(data);
        $('.theMoney').text(data.data.withdrawCash);
    },
    error: function() {
        console.log('未获取');
    }
});

if (localStorage.getItem("infoName") != null){
    var blockInfo = '<div class="block"><span>' + localStorage.getItem("infoName") + ':</span><span id="content">' + localStorage.getItem("infoNum") + '</span></div>';
    $(".fill").html(blockInfo);
    $('.block').css('background-image', localStorage.getItem("infoImg"));
    $(".confirm").bind('click', function() {
        var paymentAccount = localStorage.getItem("infoNum");
        var money = $('#withdrawMoney').val();
        var paymentMethod = localStorage.getItem("infoName");
        $.ajax({
            type:'post',
            url:webUrl+'/withdrawController/applyWithdrawB.do',
            dataType:'JSON',
            contentType : 'application/json;charset=utf-8',
            data: JSON.stringify({
                payway: paymentMethod,
                account: paymentAccount,
                money: money
            }),
            success:function(data){
                console.log(data.status.code);
                if(data.status.code == 1001){
                    window.location.href = "withdrawSucceed.html";
                }
                else if (data.status.code == 1004) {
                    alert(data.status.msg);
                    window.location.href = "withdraw.html";
                }

            },
            error:function(){
                console.log("错误");
            }
        });
    });
}else{
    $("#addWithdraw").html("您还未添加任何提现渠道，快去添加吧！");
    $(".confirm").bind('click', function() {
        var paymentAccount = localStorage.getItem("infoNum");
        var money = $('#withdrawMoney').val();
        var paymentMethod = localStorage.getItem("infoName");
        $.ajax({
            type:'post',
            url:webUrl+'/withdrawController/applyWithdrawB.do',
            dataType:'JSON',
            contentType : 'application/json;charset=utf-8',
            data: JSON.stringify({
                payway: paymentMethod,
                account: paymentAccount,
                money: money
            }),
            success:function(data){
                console.log(data.status.code);
                if(data.status.code == 1001){
                    window.location.href = "withdrawSucceed.html";
                }
                else if (data.status.code == 1004) {
                    alert(data.status.msg);
                    window.location.href = "withdraw.html";
                }
            },
            error:function(){
                console.log("错误");
            }
        });
    });
}
$(".withdraw-method").click(function() {
    window.location.href = "addWithdraw.html";
});

