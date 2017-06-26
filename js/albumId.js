var id = GetQueryString("id");
console.log(id);
$.ajax({
    type: 'get',
    dataType: 'json',
    url: 'api/home.php',
    success: function(data) {
        var obj = data.data;
        console.log(obj);
        for (var i = 0; i < 75; i++) {
            if (obj[i].lectures[0].id == id) {
                var albumBannerStr = `
                <li class="active item">
                    <div class="thirdBnnerForDetail" href="/" style="background-image:url(${obj[i].background})"></div>
                </li>
            `
                $('.carousel-inner').append(albumBannerStr);
                var albFirSecStr = `
                <h2>${obj[i].title}</h2>
                <span class="detailTitleTime">${obj[i].lectures[0].created_at}</span>
        `
                $('.albFirSec').append(albFirSecStr);
                $('.detailTitleTime').html($(".detailTitleTime").html().substring(0, 10));
                $('.topicOverView').html(obj[i].desc);
                var topicStr = `
                <p>${obj[i].purecontent}</p>
                <p></p>
                ${obj[i].webcontent}
                `
                $('.topicMainWord').append(topicStr);

                var videoStr = `
                <li>
                    <div class="baseVideoBox">
                        <div class="videoContent" style="background-image:url(${obj[i].lectures[0].cover})"> 
                            <!--video cover start-->
                            <div class="videoCover" style="top: -100%;">
                                <a href="lectureId.html?id=${obj[i].lectures[0].id}">
                                <div class="videoHeadBox">
                                    <div class="baseHeadContent videopos"><img src="${obj[i].lectures[0].lecturer.pic}"></div>
                                </div>
                                <span class="name">${obj[i].lectures[0].lecturer.nickname}</span>
                                <span class="speakersDescription">${obj[i].lectures[0].lecturer.desc}</span> 
                                <!--play info-->
                                <ul class="playInfoList">
                                    <li class="playTime">${obj[i].lectures[0].viewnum}</li>
                                    <li class="liked">${obj[i].lectures[0].likenum}</li>
                                    <li class="comment">${obj[i].lectures[0].cmtnum}</li>
                                </ul>
                                </a></div>
                            <!--video cover over--> 
                        </div>
                        <span class="videoTitle">${obj[i].lectures[0].title}</span>
                    </div>
                </li>
                `
                $(".baseVideoList").append(videoStr);

                function gaodu() {
                    $(".videoContent").each(function() {
                        var _this = $(this);
                        var width = _this.width();
                        _this.height(width * 9 / 16);
                    });
                }
                window.onload = gaodu();
                window.onresize = gaodu();
                $(".videoContent").on('mouseover', function() {
                    $(this).find(".videoCover").css('top', '0px');
                });
                $('.videoContent').mouseleave(function() {
                    $(this).find('.videoCover').css('top', '-100%');
                });

            }
        }
    }
})