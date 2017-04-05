$(document).ready(function () {
	var user_access_ip = document.getElementById('user_access_ip').value;

	var t = parseInt(getCookie(user_access_ip));
	if(isNaN(t))
	{
		return false;
	}
	var loadTimer = setInterval(loadFunction, t*1000);
	function loadFunction() {
		clearInterval(loadTimer);
		$.ajax({
			async: false,
			url: "sign.html",
			type: "post",
			data:'act=click_reward&t=' + new Date().getTime(),
			success: function(result){
				result = $.parseJSON(result);
			}
		});
	}
});

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}