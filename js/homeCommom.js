$.ajax({
    type: 'get',
    dataType: 'json',
    url: 'api/homeCommom.php',
    success: function(data) {
        var obj = data.data;
        var commomStr = '';
        //console.log(obj);
        for (var i = 0; i < 4; i++) {
            commomStr += `
            <li class="clearfix">
                <div class="headBox">
                    <div class="head"><img src="${obj[i].user.pic}"></div>
                </div>
                <div class="wordBox">
                    <span class="name">${obj[i].user.nickname}</span>
                    <span class="common">
                        <a href="lectureId.html?${obj[i].lecture.id}">${obj[i].content}</a>
                    </span>
                </div>
            </li>
            `

        }
        $('.newCommonList').append(commomStr);
        $('.headBox>div>img').each(function() {
            if ($(this).attr('src') == '') {
                $(this).attr('src', './img/head_black90@2x.png');
            }
        })
    }

})