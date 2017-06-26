//获取url地址参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

// backToTop
$(window).scroll(function() {
    var scrollValue = $(window).scrollTop();
    scrollValue > 1500 ? $('#backToTop').fadeIn() : $('#backToTop').fadeOut();
});
$('#backToTop').click(function() {
    $("html,body").animate({ scrollTop: 0 }, 300);
});