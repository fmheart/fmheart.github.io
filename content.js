$(document).ready(function () {
    var jqLi = $("#header-right>ul>li:eq(0)");
    jqLi.mouseenter(function () {
        $(this).addClass("current");
    });
    jqLi.mouseleave(function () {
        $(this).removeClass("current");
    });
    var jqLi = $("#header-right>ul>li:eq(1)");
    jqLi.mouseenter(function () {
        $(this).addClass("current");
        $("ol:eq(0)").stop().slideDown(1000);
    });
    jqLi.mouseleave(function () {
        $(this).removeClass("current");
        $("ol:eq(0)").stop().slideUp();
    });
    var jqLi = $("#header-right>ul>li:eq(2)");
    jqLi.mouseenter(function () {
        $(this).addClass("current");
        $("ol:eq(1)").stop().slideDown(1000);
    });
    jqLi.mouseleave(function () {
        $(this).removeClass("current");
        $("ol:eq(1)").stop().slideUp();
    });
    var jqLi = $("#header-right>ul>li:eq(3)");
    jqLi.mouseenter(function () {
        $(this).addClass("current");
        $("ol:eq(2)").stop().slideDown(1000);
    });
    jqLi.mouseleave(function () {
        $(this).removeClass("current");
        $("ol:eq(2)").stop().slideUp();
    });
    var jqLi = $("#header-right>ul>li:eq(4)");
    jqLi.mouseenter(function () {
        $(this).addClass("current");
        $("ol:eq(3)").stop().slideDown(1000);
    });
    jqLi.mouseleave(function () {
        $(this).removeClass("current");
        $("ol:eq(3)").stop().slideUp();
    });
    var jqLi = $("#header-right>ul>li:eq(5)");
    jqLi.mouseenter(function () {
        $(this).addClass("current");
        $("ol:eq(4)").stop().slideDown(1000);
    });
    jqLi.mouseleave(function () {
        $(this).removeClass("current");
        $("ol:eq(4)").stop().slideUp();
    });
});
// 搜索框
$(document).ready(function () {
    $("#small>img:eq(0)").on("click",function () {
        if ($("#box").is(":hidden")){
            $("#box").show();
        }else {
            $("#box").hide();
        }
    });
});

// banner轮播开始
//1.获取元素
window.onload = function () {
    var banner = document.getElementById("banner");
    var ul = banner.children[0];
    var imgWidth = banner.offsetWidth;
    var ol = banner.children[1];
    var arrow = banner.children[2];
    var spanArr = arrow.children;

//2.复制第一张图片所在的li，添加到ul最后面
    var ulNewLi = ul.children[0].cloneNode(true);
    ul.appendChild(ulNewLi);
//3.给ol添加li，ul中的个数-1个，并点亮第一个按钮
    for (var i = 0; i < ul.children.length - 1; i++) {
        var olNewLi = document.createElement('li');
        // olNewLi.innerHTML = i+1;
        ol.appendChild(olNewLi);
    }
    var olLiArr = ol.children;
    olLiArr[0].className = 'current';

//4.鼠标放到ol让图片切换
    for (var i = 0; i < olLiArr.length; i++) {
        olLiArr[i].index = i;
        olLiArr[i].onmouseover = function () {
            for (var j = 0; j < olLiArr.length; j++) {
                olLiArr[j].className = ''
            }
            this.className = 'current';
            //鼠标放到小的方块上的时候索引值和key以及square同步
            key = square = this.index;
            //移动盒子
            ul.style.transform = 'translateX(' + this.index * imgWidth * -1 + 'px)';
        }
    }
//5.添加定时器
    var timer = setInterval(autoPlay, 3000);

//固定向右切换图片
//两个定时器（一个记录图片，一个记录小方块）
    var key = 0;
    var square = 0;

    function autoPlay() {
        //通过控制key的自增模拟图片的索引值，移动图片
        key++;
        if (key > olLiArr.length) {//key最大值是3，大于3立刻让他回到最原始，并且切换到第二张key=1
            ul.style.left = 0;
            key = 1;
        }
        ul.style.transform = 'translateX(' + key * imgWidth * -1 + 'px)';
        //通过控制square的自增模拟小方块的索引值，点亮盒子
        square++;
        if (square > olLiArr.length - 1) {//square最大值是2，大于2重新回到0
            square = 0
        }
        for (var i = 0; i < olLiArr.length; i++) {
            olLiArr[i].className = ''
        }
        //不用this，因为没有事件的绑定，移到哪个小方块就显示哪个小方块
        olLiArr[square].className = 'current';
    }

    banner.onmouseover = function () {
        clearInterval(timer);
        arrow.style.display = 'block'
    };
    banner.onmouseout = function () {
        timer = setInterval(autoPlay, 3000);
        arrow.style.display = 'none'
    };
//6.左右切换图片（鼠标放上去显示，离开隐藏）
    spanArr[0].onclick = function () {
        key--;
        if (key < 0) {
            //先移动到最后一张，紧接着key取前一张的值
            ul.style.left = -(olLiArr.length) * imgWidth + 'px';
            key = olLiArr.length - 1;
        }
        ul.style.transform = 'translateX(' + key * imgWidth * -1 + 'px)';
        //通过控制square的自增模拟小方块的索引值，点亮盒子
        square--;
        if (square < 0) {
            square = olLiArr.length - 1;
        }
        for (var i = 0; i < olLiArr.length; i++) {
            olLiArr[i].className = ''
        }
        //不用this，因为没有事件的绑定，移到哪个小方块就显示哪个小方块
        olLiArr[square].className = 'current';
    };
    spanArr[1].onclick = function () {
        autoPlay();
    }
};
// banner轮播结束

//活动，公告开始
$(window).ready(function () {
    // 鼠标放到那个li上，让该li添加active类，下面的对应的div添加selected
$(".tab>li").mouseenter(function () {
    // 当前的li添加active类，其他的删除active类
    $(this).addClass("active").siblings("li").removeClass("active");
    //对应索引值的div添加selected类，其他的删除selected类
    $(".wrapper>div").eq($(this).index()).addClass("selected")
        .siblings("div").removeClass("selected");
});
});
//活动，公告结束

// 服务项目开始
$(function () {
    $(".service-list-part:nth-child(2n-1)").mouseenter(function () {
        $(".service-list-part:nth-child(2n-1) img").animate({left:"-10%"},2000);
        $(".service-list-part:nth-child(2n-1) .line-odd").animate({left:"-50%"},2000);
        $(".service-list-part:nth-child(2n-1) .odd").animate({left:"100%"},2000);
    });
    $(".service-list-part:nth-child(2n-1)").mouseleave(function () {
        $(".service-list-part:nth-child(2n-1) img").stop().animate({left:"50%"},2000);
        $(".service-list-part:nth-child(2n-1) .line-odd").stop().animate({left:"10%"},2000);
        $(".service-list-part:nth-child(2n-1) .odd").stop().animate({left:"50%"},2000);
    });
    $(".service-list-part:nth-child(2n)").mouseenter(function () {
        $(".service-list-part:nth-child(2n) img").animate({left:"120%"},2000);
        $(".service-list-part:nth-child(2n) .line").animate({left:"120%"},2000);
        $(".service-list-part:nth-child(2n) .even").animate({left:"-10%"},2000);
    });
    $(".service-list-part:nth-child(2n)").mouseleave(function () {
        $(".service-list-part:nth-child(2n) img").stop().animate({left:"50%"},2000);
        $(".service-list-part:nth-child(2n) .line").stop().animate({left:"60%"},2000);
        $(".service-list-part:nth-child(2n) .even").stop().animate({left:"50%"},2000);
    });
});
// 服务项目结束


// 专家介绍开始
//1.获取元素
window.addEventListener("load",function () {
    var experts = document.getElementById("experts");
    var expertsImages = experts.children[1].children[0];
    var screen = experts.children[1];
    var imgWidth = screen.offsetWidth;
    var ol = experts.children[2];
    var olLiArr = ol.children;

//2.复制前五张图片所在的li，添加到 expertsImages 最后面
    for (var i = 0; i < 5; i++) {
        var expertsImagesNewLi = expertsImages.children[i].cloneNode(true);
        expertsImages.appendChild(expertsImagesNewLi);
    }
// 4.鼠标放到ol ,让图片切换
    for (var i = 0; i < olLiArr.length; i++) {
        olLiArr[i].index = i;
        olLiArr[i].onmouseover = function () {
            for (var j = 0; j < olLiArr.length; j++) {
                olLiArr[j].className = ''
            }
            this.className = 'current';
            //鼠标放到小圆圈上的时候索引值和key以及square同步
            key = square = this.index;
            //移动盒子
            expertsImages.style.transform = 'translateX(' + this.index * imgWidth * -1 + 'px)';
        }
    }
//5.添加定时器
    var timer = setInterval(autoPlay, 3000);

//固定向右切换图片
//两个定时器（一个记录图片，一个记录小圆圈）
    var key = 0;
    var square = 0;

    function autoPlay() {
        //通过控制key的自增模拟图片的索引值，移动图片
        key++;
        if (key > olLiArr.length) {//key最大值是7，大于7立刻让他回到最原始，并且切换到第二张key=1
            expertsImages.style.left = 0;
            key = 1;
        }
        expertsImages.style.transform = 'translateX(' + key * imgWidth * -1 + 'px)';
        //通过控制square的自增模拟小圆圈的索引值，点亮盒子
        square++;
        if (square > olLiArr.length - 1) {//square最大值是6，大于6重新回到0
            square = 0
        }
        for (var i = 0; i < olLiArr.length; i++) {
            olLiArr[i].className = ''
        }
        //不用this，因为没有事件的绑定，移到哪个小圆圈就显示哪个小圆圈
        olLiArr[square].className = 'current';
    }
})
// 专家介绍结束