

var goodsName = decodeURI(window.location.href.split('?')[1].split('&')[0].split('=')[1]);

var agencyFees = window.location.href.split('?')[1].split('&')[1].split('=')[1];
$('.good').html("代理产品："+goodsName);

$('.money').html("代理费用："+agencyFees);


$(".button").bind('click', function() {
	window.location.href = "myBrand.html";
});
$(".left-arrow").bind('click', function() {
	window.location.href = "brandAgent.html";
});