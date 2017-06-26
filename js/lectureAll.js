// 加载flag
var loading = false;
// 最多可加载的条目
var maxItems = 72;
// 加载页数
var page = 1;
// 每次加载添加多少条目
var itemsPerLoad = 12;

function addItems(page, number, lastIndex) {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: 'api/home.php',
        success: function(data) {
            var obj = data.data;
            //console.log(obj);
            var lecStr = '';
            //console.log(obj);
            for (var i = lastIndex; i < lastIndex + number; i++) {
                lecStr += `
            <li>
                <div class="baseVideoBox">
                    <div class="videoContent" style="background-image: url(${obj[i].lectures[0].cover})">
                        <div class="videoCover">
                            <a href="lectureId.html?id=${obj[i].lectures[0].id}">
                                <div class="videoHeadBox">
                                    <div class="baseHeadContent videopos">
                                        <img src="${obj[i].lectures[0].lecturer.pic}">
                                    </div>
                                </div>
                                <span class="name">${obj[i].lectures[0].lecturer.nickname}</span>
                                <span class="speakersDescription">${obj[i].lectures[0].lecturer.desc}</span> 
                                <ul class="playInfoList">
                                    <li class="playTime">${obj[i].lectures[0].viewnum}</li>
                                    <li class="liked">${obj[i].lectures[0].likenum}</li>
                                    <li class="comment">${obj[i].lectures[0].cmtnum}</li>
                                </ul>
                            </a>
                        </div>
                    </div>
                    <span class="videoTitle">${obj[i].lectures[0].title}</span>
                </div>
            </li>
            `
            }
            $(".baseVideoList").html(lecStr);

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
    })

}
//预先加载12条
addItems(page, itemsPerLoad, 0);
//上次加载的序号
var lastIndex = 12;
$(".pageSelectList>a").each(function() {
    $(this).click(function(ev) {
        ev.preventDefault();
    })
})
$('.prev').click(function() {
    if (page == 1) {
        $(this).addClass('disabled');
        lastIndex = 0;
    } else {
        $(this).removeClass('disabled');
        page--;
        $(".pageSelectList>a.pageNum").each(function() {
            if ($(this).html() == page) {
                $(this).addClass("active");
                $(this).siblings().removeClass("active");
            }
        })
        lastIndex = (page - 1) * itemsPerLoad;
        addItems(page, itemsPerLoad, lastIndex);
        //console.log("page:" + page + "itemsPerLoad:" + itemsPerLoad + "lastIndex:" + lastIndex);
    }
})
$('.next').click(function() {
    if (page == 6) {
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
        lastIndex = (page - 1) * itemsPerLoad;
        addItems(page, itemsPerLoad, lastIndex);
        //console.log("page:" + page + "itemsPerLoad:" + itemsPerLoad + "lastIndex:" + lastIndex);
    }
})
$(".pageSelectList>a.pageNum").each(function() {
    $(this).click(function() {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        page = $(this).html();
        lastIndex = (page - 1) * itemsPerLoad;
        addItems(page, itemsPerLoad, lastIndex);
        //console.log("page:" + page + "itemsPerLoad:" + itemsPerLoad + "lastIndex:" + lastIndex);
    })
})

$('.listChangesBox>ul>li').each(function() {
    $(this).click(function() {
        $(this).addClass('select');
        $(this).siblings().removeClass('select');
    })
})

// $.ajax({
//     type: 'get',
//     url: 'api/catory.php',
//     dataType: 'json',
//     success: function(data) {
//         var obj = data.data;
//         var cayStr = '';
//         $.each(obj, function(idx, val) {
//             cayStr += `
//             <li cay-id='${val.id}'><a href="">${val.name}</a></li>
//             `
//         })
//         $('#TimeList').append(cayStr);
//     }
// })
// $('.dropDownListTime').click(function() {
//     $(this).find('#TimeList').toggle();
// });