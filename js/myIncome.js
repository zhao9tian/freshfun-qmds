$('.point').click(function(){
	$('.pointBlock').css('display','block');
})
$('.pointBlock').click(function(){
	$('.pointBlock').css('display','none');
})
$('.btn').click(function(){
	window.location.href = "withdraw.html";
})
var webUrl = 'https://www.freshfun365.com/FreshFun';
//获取收益信息
$.ajax({
    url: webUrl+"/withdrawController/getMyMoneyB.do",
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
