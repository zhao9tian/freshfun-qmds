
var goodsName = decodeURI(window.location.href.split('?')[1].split('&')[0].split('=')[1]);

var agencyFees = window.location.href.split('?')[1].split('&')[1].split('=')[1];
$('.good').html("代理商品："+goodsName);

$('.money').html("代理费用："+agencyFees);