//通过rem实现自适应屏幕大小
	var html = document.getElementById('html');
	var owidth = document.body.clientWidth || document.documentElement.clientWidth;
	html.style.fontSize = owidth /750 * 100 + "px";
	window.onload = window.onresize = function () {
	    var html = document.getElementById('html');
	    var owidth = document.body.clientWidth || document.documentElement.clientWidth;
	    html.style.fontSize = owidth /750 * 100 + "px";
	}