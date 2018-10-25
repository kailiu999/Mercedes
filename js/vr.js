$(function () {
    let vrCar = $.ajax({
        type: 'get',
        url: "json/vrCar.json"
    })
    let index = 0;
    let dotX = 0, dotY = 0,
        stepX = 0, stepY = 0;
    let flag = true;
    let choseColor = '';
    let seaArr = location.search.split('='),
        m = seaArr[1];
    let time = null;

    iniImg();//初始化页面；

    $('.color p').click(function () {//点击切换颜色；

        $('.color p').removeClass('act');
        $(this).addClass('act');
        choseColor = $(this).attr('data-color');

        $('.colorName p').css({
            "background-color": `${choseColor}`
        })

        updateImg();

    })
    let vrPath = null;

    function iniImg() {  //初始化页面；
        vrCar.then((data) => {

            for (let i = 0; i < data.length; i++) {
                if (data[i].model == m) {
                    $('.carModel').html(`${data[i].modelName}`)
                    let colorArr = data[i].group;
                    choseColor = colorArr[0].color;
                    for (let n = 0; n < colorArr.length; n++) {
                        if (colorArr[n].color == choseColor) {
                            vrPath = colorArr[n].img;
                            $('#box').html('');
                            for (let j = 0; j < 30; j++) {
                                $(`<li><img  src="${vrPath.srcD}${j + 1}.png" alt=""></li>`).appendTo('#box');
                            }
                        }
                    }
                    break;
                }
            }
            $('img').mousedown((e) => {
                e.preventDefault();
            })
        })
    }

    function updateImg() {  //切换颜色；

        vrCar.then((data) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].model == m) {
                    let colorArr = data[i].group;
                    for (let n = 0; n < colorArr.length; n++) {
                        if (colorArr[n].color == choseColor) {
                            $('.colorName span').html('')
                                .html(`${colorArr[n].colorName}`)
                            vrPath = colorArr[n].img;
                            $('#box').html('');
                            for (let j = 0; j < 30; j++) {
                                $(`<li><img  src="${vrPath.srcD}${j + 1}.png" alt=""></li>`).appendTo('#box');
                            }
                            break;//找到后跳出循环；
                        } else {
                            $('.colorName span').html('')
                                .html("无")
                        }
                    }
                }
            }

            $('img').mousedown((e) => {
                e.preventDefault();
            })
            if (flag) {
                $('#box li img').each((n, el) => {
                    el.src = `${vrPath.srcD}${n + 1}.png`
                })
            } else {
                $('#box li img').each((n, el) => {
                    el.src = `${vrPath.srcT}${n + 1}.png`
                })
            }
            $('#box li').hide()
                .eq(index).show();

            $('.colorName').css({
                opacity: 1,
                transition: "0s"
            })
            clearTimeout(time);//清除前一个定时器；

            time = setTimeout(function () {
                $('.colorName').css({
                    opacity: 0,
                    transition: "1s"
                })
            }, 2000)
        });
    }


    $('body').mousedown((e) => {
        e = e || window.event;
        //打点；
        dotX = e.clientX;
        dotY = e.clientY;

        $('body').mousemove((e) => {
            e = e || window.event;
            //测距；
            stepX = dotX - e.clientX;
            stepY = dotY - e.clientY;

            if (stepY < 0) {
                if (Math.abs(stepY) > 30) {
                    flag = false;
                    //更新打点
                    dotX = e.clientX;
                    dotY = e.clientY;
                    $('#box li img').each((n, el) => {
                        el.src = `${vrPath.srcT}${n + 1}.png`
                    })
                }
            } else if (stepY > 30) {
                flag = true;
                //更新打点
                dotX = e.clientX;
                dotY = e.clientY;
                $('#box li img').each((n, el) => {
                    el.src = `${vrPath.srcD}${n + 1}.png`
                })
            }
            if (stepX > 0) {
                if (stepX > 20) {
                    //更新打点
                    dotX = e.clientX;
                    dotY = e.clientY;
                    if (index >= $('#box li').length - 1) {
                        index = -1;
                    }
                    index++;
                    $('#box li').hide()
                        .eq(index).show();
                }
            } else if (stepX < 0) {
                if (Math.abs(stepX) > 20) {
                    //更新打点
                    dotX = e.clientX;
                    dotY = e.clientY;
                    if (index <= 0) {
                        index = $('#box li').length;
                    }
                    index--;
                    $('#box li').hide()
                        .eq(index).show();
                }
            }
        })
    }).mouseup((e) => {
        $('body').off('mousemove');
    })

})

//点赞；
let zan = 2599;
$('#zan span').html(`${zan}`);

$('#zan i').hover(function () {//两个函数：鼠标移入
    $(this).css({
        transform: "scale(1.2)"
    })
}, function () {            //鼠标移出；
    $(this).css({
        transform: "scale(1)"
    })
})

$('#zan').click(function () {
    zan++;
    $('#zan span').html(`${zan}`);
    $('#zan i').css({
        transition: "0s",
        backgroundPositionX: "-240px",
        transform: "scale(1)"
    })
        .unbind('mouseenter').unbind('mouseleave');//取消hover事件；
    $(this).off('click');       //取消点击事件；
})