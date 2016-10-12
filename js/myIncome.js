$('.point').click(function(){
	$('.pointBlock').css('display','block');
})
$('.pointBlock').click(function(){
	$('.pointBlock').css('display','none');
})
$('.btn').click(function(){
	window.location.href = "withdraw.html";
})
var userId = localStorage.getItem("userId");
// console.log(userId);
// console.log(typeof userId);
var webUrl = 'https://www.freshfun365.com/FreshFun';
//var userId = 1 ;
//获取收益信息
// var userId = 556677;
$.ajax({
    url: webUrl+"/withdrawController/getMyMoneyB.do?userId=" + userId,
    // url: "http://192.168.3.28:8080/withdrawController/getMyMoneyB.do?userId=" + userId,
    type: "get",
    dataType: "json",
    success: function(data) {
        console.log(data);
		if(data.data.totalMoney==''){
			$('.totalIncome').html('0.0');
		}else{
			$('.totalIncome').html(data.data.totalMoney);
		}
    	if(data.data.unrecordMoney==''){
    		$('.unrecorded').html('0.0');
    	}else{
    		$('.unrecorded').html(data.data.unrecordMoney);
    	}
		localStorage.setItem("withdrawCash", data.data.withdrawCash);
    },
    error: function() {
        console.log('未获取');
    }
});
