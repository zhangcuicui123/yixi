var id = GetQueryString("id");
//console.log(id);
$.ajax({
    type: 'get',
    dataType: 'json',
    data: { id: id },
    url: 'api/lectureId.php',
    success: function(data) {
        var obj = data.data;
        var tagStr = '';
        var lectureBannerStr = `
        <li class="active item">
            <div class="secondBnnerForDetail" href="/" style="background-image:url(${obj.lecturer.background})">
                <div class="detailHeadBox">
                    <img src="${obj.lecturer.pic}">
                </div>
                <span class="speakerName">${obj.lecturer.nickname}</span>
                <span class="speakerIntr">${obj.lecturer.desc}</span>
            </div>
        </li>
        `
        $('.carousel-inner').append(lectureBannerStr);

        var lecFirSecStr = `
            <h2>${obj.title}</h2>
            <span class="detailTitleTime">${obj.time}</span>
            <span class="detailTitlePlace">${obj.site}</span>
        `
        $('.lecFirSec').append(lecFirSecStr);
        $('.lecturesOverView').html(obj.desc);

        var viewStr = `
        <object type="application/x-shockwave-flash" data="http://player.youku.com/player.php/sid/${obj.video}/isAutoPlay/false/partnerid/0aaf8dfc6c213dc4/v.swf" width="100%" height="100%" id="youku-player">
            <param name="allowFullScreen" value="true">
            <param name="allowScriptAccess" value="always">
            <param name="movie" value="http://player.youku.com/player.php/sid/${obj.video}/isAutoPlay/false/partnerid/0aaf8dfc6c213dc4/v.swf">
            <param name="flashvars" value="imglogo=&amp;partnerId=0aaf8dfc6c213dc4&amp;styleid=0">
        </object>
        `
        $("#youkuplayer").append(viewStr);

        var videoControlStr = `
        <li class="play">${obj.viewnum}</li>
        <li class="like">${obj.likenum}</li>
        <li class="review">${obj.cmtnum}</li>
        `
        $(".videoControl").append(videoControlStr);
        $(".commTit").html("已有" + obj.cmtnum + "条评论");

        //tag
        $.each(obj.tags, function(idx, val) {
            tagStr = `
            <li><a href="">${val.name}</a></li>
            `
            $('.tagList').append(tagStr);
        })

        //purecontent-完整图文
        var pureStr = `
        <h2>${obj.title}</h2>
        <span class="speaker">${obj.lecturer.nickname}</span>
        <span class="date">${obj.time}</span>
        <p>${obj.purecontent}</p>
        <p>&nbsp;</p>
        `
        $('.wholeSpeechContent').append(pureStr);

    }
})

function gaodu() {
    var width = $('.detailVideoContent').width();
    $('.detailVideoContent').height(width * 9 / 16);
}
window.onload = gaodu();
window.onresize = gaodu();
//评论分页
var page = 1;

function getPage(page) {
    $.ajax({
        type: 'get',
        dataType: 'json',
        data: { id: id, page: page },
        url: 'api/lecComm.php',
        success: function(data) {
            var obj = data.data;
            var commStr = '';
            var newStr;
            $.each(obj, function(idx, val) {
                //console.log(val);
                commStr += `
                <li class="baseCommentListBox">
                    <div class="commentHeadBox">
                        <img src="${val.user.pic}">
                    </div>
                    <div class="wordBox">
                        <div class="title">
                            <span>${val.user.nickname}</span>
                            <span class="created_time">${val.created_at}</span>
                        </div>
                        <div class="commentDetail">${val.content}</div>
                        <div class="buttonBox buttonNotShow">
                            <input type="text" class="commentInput" placeholder="回复..." cmtid="${val.id}" userid="${val.user.id}">
                        </div>
                    </div>
                </li>
                `

            })
            $('#commentContainer').html(commStr);
            $(".commentHeadBox>img").each(function() {
                if ($(this).attr('src') == '') {
                    $(this).attr('src', './img/head_black90@2x.png');
                }
            })
            $(".wordBox>.title>.created_time").each(function() {
                //console.log($(this).html());
                $(this).html($(this).html().substring(0, 10));
            })
        }

    })
}
getPage(page);
$(".pageSelectList>a").each(function() {
    $(this).click(function(ev) {
        ev.preventDefault();
    })

})
$('.prev').click(function() {

    if (page == 1) {
        $(this).addClass('disabled');
    } else {
        $(this).removeClass('disabled');
        page--;
        $(".pageSelectList>a.pageNum").each(function() {
            if ($(this).html() == page) {
                $(this).addClass("active");
                $(this).siblings().removeClass("active");
            }
        })
        getPage(page);
    }
})
$('.next').click(function() {
    if (page == 4) {
        $(this).addClass('disabled');
    } else {
        $(this).removeClass('disabled');
        page++;
        $(".pageSelectList>a.pageNum").each(function() {
            if ($(this).html() == page) {
                $(this).addClass("active");
                $(this).siblings().removeClass("active");
            }
        })
        getPage(page);
    }
})
$(".pageSelectList>a.pageNum").each(function() {
    $(this).click(function() {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        page = $(this).html();
        getPage(page);
    })
})

//wechat popout
$('#shareToWechat').click(function() { return false; });
$('#shareToWeiBo').click(function() { return false; });
$('#shareToQQ').click(function() { return false; });
$("#shareToWechat").on('mouseover', function() {
    $(".wechatPopOut").css('height', '320px').css('opacity', '1');
});
$('#shareToWechat').mouseleave(function() {
    $('.wechatPopOut').css('height', '0px').css('opacity', '0');
});

// 完整图文
$('.wholeSpeechButton').click(function() {
    $('.wholeSpeechContent').css('top', '0px').css('opacity', '1');
    $('.wholeSpeechCloseButton').css('top', '3%');
    $('body').css('overflow', 'hidden').css('height', $(window).height());
    return false;
})
$('.wholeSpeechCloseButton').click(function() {
    $('.wholeSpeechContent').css('top', '100%').css('opacity', '0');
    $('.wholeSpeechCloseButton').css('top', '103%');
    $('body').css('overflow', 'visible').css('height', 'auto');
    return false;
})

//演讲相关
$.ajax({
    type: 'get',
    url: 'api/related.php',
    dataType: 'json',
    data: { id: id },
    success: function(data) {
        var obj = data.data;
        var relatedStr = '';
        //console.log(obj);
        $.each(obj, function(idx, val) {
            relatedStr = `
            <li>
                <a href="lectureId.html?id=${val.id}" class="clearfix">
                    <div class="relatedHeadBox">
                        <img src="${val.lecturer.pic}">
                    </div>
                    <div class="relatedWordBox fl">
                        <span class="title">${val.title}</span>
                        <span class="name">${val.lecturer.nickname}</span>
                    </div>
                </a>
            </li>
            `
            $('.baseRelatedList').append(relatedStr);
        })

    }
})