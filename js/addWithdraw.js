var userId = localStorage.getItem("userId");
console.log(userId);
//var userId = 1;
var withdrawChannel;
var withdrawAccount = '';
var webUrl = 'https://www.freshfun365.com/FreshFun';
//选择是否默认样式修改
$(".info-name").text("微信账号");
$(".isChecked").click(function(event) {
    $("#infoNum").val('');
    $input = $(this).find('.input');
    if($input.hasClass('input-false')){
        $input.addClass('input-true').parent().parent().siblings().find(".input").removeClass('input-true');
    }
    else if($input.hasClass('input-true')){
        $input.addClass('input-false').parent().parent().siblings().find(".input").removeClass('input-false');
    }
    var infoName = $(".input-true").parents().siblings('span').text();
    $(".info-name").text(infoName);
});
$(".confirm").click(function() {
    var infoName = $(".input-true").parents().siblings('span').text();
    var infoImg = $(".input-true").parent().parent().css("background-image");
    var infoNum = $("#infoNum").val();
    withdrawAccount = infoNum;
    if (infoNum.length == 0){
        alert("您输入的信息有误，请重新输入！")
    }else{
        localStorage.setItem("infoName", infoName);
        localStorage.setItem("infoImg", infoImg);
        localStorage.setItem("infoNum", infoNum);
        window.location.href = 'withdraw.html';
    }
});