// 滑动实现轮播
function banner() {
    var carousel = document.querySelector('.carousel');
    var startX = 0;
    var moveX = 0;
    var distance = 0;
    //绑定触屏事件
    carousel.addEventListener('touchstart', function(e) {
        //记录触屏开始的数据
        startX = e.targetTouches[0].clientX;
    })
    carousel.addEventListener('touchmove', function(e) {
            //记录触屏开始的数据
            moveX = e.targetTouches[0].clientX;
            distance = moveX - startX;
        })
        //绑定触屏结束事件
    carousel.addEventListener('touchend', function(e) {
        if (distance > 0) {
            $(this).carousel('prev');
        }
        if (distance < 0) {
            $(this).carousel('next');
        }
        //数据重置
        startX = 0;
        moveX = 0;
        distance = 0;
    })
}
banner();

//ajax调用banner模块接口
var oLiLen = $(".carousel-indicators").children().length;
//console.log(oLiLen);
$.ajax({
    type: 'get',
    dataType: 'json',
    url: 'api/home.php',
    success: function(data) {
        var obj = data.data;
        var bannerStr = '';
        var topicStr = '';
        var lectureStr = '';
        //console.log(obj);
        //banner
        for (var i = 0; i < oLiLen; i++) {
            //console.log(obj[i].lectures[0]);
            bannerStr += `
                <li class="item">
                    <a href="/" style="background-image:url(${obj[i].lectures[0].background})"></a>
                    <div class="carousel-cap">
                        <div class="cap-box clearfix">
                            <a href="lectureId.html?id=${obj[i].lectures[0].id}" class="clearfix">
                                <div class="cap-img fl"><img class="fl" src="${obj[i].lectures[0].lecturer.pic}" /></div>
                                <div class="cap-word fl">
                                    <span class="title">${obj[i].lectures[0].title}</span>
                                    <span class="name">${obj[i].lectures[0].lecturer.nickname}</span>
                                    <span class="brief">${obj[i].lectures[0].desc}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </li>
                `
        }
        //console.log(bannerStr);
        $(".carousel-inner").append(bannerStr);
        $(".carousel-inner li:first").addClass("active");

        // Topic
        for (var i = 0; i < 2; i++) {
            //console.log(obj[i].lectures[0]);
            topicStr += `
                <li data-id="" class="col-md-6 topic-item" style="background-image:url(${obj[i].background})">
                    <div class="topic-cover" style="top: -100%;">
                        <a href="albumId.html?id=${obj[i].lectures[0].id}">
                            <h2>${obj[i].title}</h2>
                            <span class="topic-desc">${obj[i].desc}</span>
                            <div class="headbox"><span class="title">您可以看到以下讲者的视频</span>
                                <ul class="topicBoxHeadBoxList">
                                    <li>
                                        <div class="baseHeadContent"><img src="${obj[i].lectures[0].lecturer.pic}"></div>
                                        <span class="name">${obj[i].lectures[0].lecturer.nickname}</span>
                                    </li>
                                </ul>
                            </div>
                        </a>
                    </div>
                    <a href="" class="topic-link">${obj[i].title}</a>
                </li>
                `
        }
        //console.log(topicStr);
        $('.topic-list').append(topicStr);
        $(".topic-link").on('click', function(ev) {
            ev.preventDefault();
        });
        $(".topic-link").on('mouseover', function() {
            $(this).siblings('.topic-cover').css('top', '0px');
        });
        $('.topic-item').mouseleave(function() {
            $(this).find('.topic-cover').css('top', '-100%');
        });


        // lecture
        for (var i = 0; i < 6; i++) {
            lectureStr += `
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
        }
        $(".baseVideoList").append(lectureStr);

        function gaodu() {
            $(".topic-item").each(function() {
                var _this = $(this);
                var width = _this.width();
                //console.log(width);
                _this.height(width * 9 / 16);
            })
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

})