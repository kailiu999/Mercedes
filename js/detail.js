$(function () {
    let sea = location.search,
        arr = sea.split('&'),
        nameArr = arr[0].split('='),
        idArr = arr[1].split('='),
        name = nameArr[1],
        id = idArr[1];
    let deData = $.ajax({
        type: 'get',
        url: `json/${name}-detail.json`,
    })
    deData.then((data) => {
        let carData = null;
        let dArr = data;
        for (let i = 0; i < dArr.length; i++) {
            if (dArr[i].id == id) {
                carData = dArr[i];
            }
        }
        let aCar = carData.detail;

        $('.bg').css({
            "background": `url(img/detailCar/${aCar.bg_img}) no-repeat center/1550px`
        })
        $('.bg_title').html(`<img src="img/detailCar/${aCar.bg_title_img}"/>`)
        $('.bg_txt').html(`${aCar.bg_title_txt}`)
        $('.geju_text').html(`${aCar.geju}`)
        $('.car_d >ul li:nth-of-type(1)').css({
            "background": `url(img/detailCar/${aCar.geju_bg1}) no-repeat center/1550px`
        })
        $('.car_d >ul li:nth-of-type(2)').css({
            "background": `url(img/detailCar/${aCar.geju_bg2}) no-repeat center/1550px`
        })
        $('.car_d >ul li:nth-of-type(3)').css({
            "background": `url(img/detailCar/${aCar.geju_bg3}) no-repeat center/1550px`
        })
        $('.car_d ol li:nth-of-type(1)').css({
            "background": `url(img/detailCar/${aCar.geju_con_img1}) no-repeat center/450px`
        })
        $('.car_d ol li:nth-of-type(2)').css({
            "background": `url(img/detailCar/${aCar.geju_con_img2}) no-repeat center/450px`
        })
        $('.car_d ol li:nth-of-type(3)').css({
            "background": `url(img/detailCar/${aCar.geju_con_img3}) no-repeat center/450px`
        })
    });

    $('.car_d dl dd').click(function () {

        $('.car_d >ul li').removeClass('act_bg')
            .eq($(this).index()).addClass('act_bg');

        $('.car_d ol li').removeClass('act_ol')
            .eq($(this).index()).addClass('act_ol');

        $('.car_d dl dd').removeClass('act_dd')
            .eq($(this).index()).addClass('act_dd');

        $('.geju_content  li').removeClass('act_li')
            .eq($(this).index()).addClass('act_li');
    })


    $('.mod_t button').click(function () {
        $(this).siblings('.hide').slideToggle();
    })

    $('.mod_t .nav li').click(function () {
        $('.mod_t .nav li').removeClass('act_li');
        $(this).addClass('act_li');
        $('.nav_con_ul >li').hide()
            .eq($(this).index()).show();
    })


//透明轮播
    let index = 0;

    function next(n) {
        if (n >= $('.show_con ul li').length - 1) {
            n = $('.show_con ul li').length - 2;
        }
        n++;
        $('.show_con ul li').removeClass('act')
            .eq(n).addClass('act');
        if (n >= $('.show_con ul li').length - 1) {
            n = -1;
        }
        return n;
    }

    $('#next').click(function () {
        index = next(index);

    })

    $('#pre').click(function () {
        if (index < 0) {
            index = $('.show_con ul li').length - 1;
        }
        index--;
        if (index < 0) {
            index = $('.show_con ul li').length - 1;
        }
        $('.show_con ul li').removeClass('act')
            .eq(index).addClass('act');

    })

//点击显示；
    $('.nav_con_ul img, .nav_con_ul .over').click(function () {
        $('.show').show();
        let n = $(this).attr('data-index');

        index = next(n - 1);

    })
    $('#off').click(function () {
        $('.show').hide();
    })



    $('body,html').on('mousewheel', function () {
        if ($(this).scrollTop() >= $('#a').offset().top) {
            $('.m_nav').addClass('fixedNav')
        }else {
            $('.m_nav').removeClass('fixedNav')
        }

        if($(this).scrollTop() >= $('#a').offset().top){
            $('.m_nav ul li a').css({
                color:'black'
            })
                .eq(0).css({
                color:'deepskyblue'
            })
            if($(this).scrollTop() >= $('#b').offset().top){
                $('.m_nav ul li a').css({
                    color:'black'
                })
                    .eq(1).css({
                    color:'deepskyblue'
                })
                if($(this).scrollTop() >= $('#c').offset().top){
                    $('.m_nav ul li a').css({
                        color:'black'
                    })
                        .eq(2).css({
                        color:'deepskyblue'
                    })
                    if($(this).scrollTop() >= $('#d').offset().top){
                        $('.m_nav ul li a').css({
                            color:'black'
                        })
                            .eq(3).css({
                            color:'deepskyblue'
                        })
                    }
                }
            }
        }
    })

})
