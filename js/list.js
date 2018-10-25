$(function () {

//ajax请求；
let coupe = $.ajax({
    type: 'get',
    url: "json/coupe.json"
})
let suv = $.ajax({
    type: 'get',
    url: "json/suv.json"
})
let sport = $.ajax({
    type: 'get',
    url: "json/sport.json"
})
let mpv = $.ajax({
    type: 'get',
    url: "json/mpv.json"
})

append(coupe, 'coupe');
append(suv, 'suv');
append(sport, 'sport');
append(mpv, 'mpv');

function append(obj, c_Name) {//填充数据；
    obj.then((data) => {
        let obj = data;
        let cArr = obj.data;
        for (let i = 0; i < cArr.length; i++) {
            $(`<li>
                     <div class="one">
                           <p class="car_img"><img src="img/listCar/${c_Name}/${cArr[i].imgSrc}" alt=""></p>
                            <h1>${cArr[i].title}</h1>
                            <p>${cArr[i].price}</p>
                            <p>${cArr[i].month}</p>
                        </div>
                        <div class="two">
                            <p onclick="window.open('detailCar.html?name=${obj.carName}&id=${cArr[i].id}')"><a href="" >了解更多</a></p>
                            <p><a href="">车型配置</a></p>
                            <p> <a href="">车型规格</a></p>
                            <p onclick="window.open('VRCar.html?model=${cArr[i].model}')"><a >全景看车</a></p>
                        </div>
                    </li>`).appendTo($(`#${c_Name} .box ul`));
        }
    })
}


//筛选功能
let modeArr = [];//储存筛选数据

$('.carMode dl dd').click(function () {
    $('.carMode dl dd').eq(0).removeClass('chose');
    $(this).toggleClass('chose');
    if ($('.carMode .chose').length == 0) {
        $('.carMode dl dd').eq(0).addClass('chose');
        // modeArr = [];
    }
})

$('#sure').click(function () {
    console.log('------------');
    modeArr = [];          //清空上一次数据；

    $('.carMode .chose').each((n, el) => {//存储筛选数据；
        if ($(el).attr('data-mod')) {
            modeArr[n] = $(el).attr('data-mod');
        }
    })
    // console.log(modeArr);
    if (modeArr.length != 0) {
        //创建列表
        adBox('coupe');
        adBox('suv');
        adBox('sport');
        adBox('mpv');

        //添加数据
        chMod(coupe, modeArr, 'coupe');
        chMod(suv, modeArr, 'suv');
        chMod(mpv, modeArr, 'mpv');
        chMod(sport, modeArr, 'sport');
    } else {
        //创建列表
        adBox('coupe');
        adBox('suv');
        adBox('sport');
        adBox('mpv');

        //添加数据
        append(coupe, 'coupe');
        append(suv, 'suv');
        append(sport, 'sport');
        append(mpv, 'mpv');

    }
    $('.carMode').slideUp();
});

$('#reset').click(function () {//重置筛选数据
    $('.carMode dl dd').removeClass('chose')
        .eq(0).addClass('chose');
    modeArr = [];
});

$('.carMode .chose').click(function () {
    console.log(1);
    $('.carMode dl dd').removeClass('chose')
        .eq(0).addClass('chose');
    modeArr = [];
});

function chMod(obj, modArr, c_Name) {//筛选数据

    $(`#${c_Name} .box ul`).html('');//清空列表数据

    obj.then((el) => {
        let obj = el;
        let carArr = el.data;
        for (let i = 0; i < modArr.length; i++) {
            for (let j = 0; j < carArr.length; j++) {

                let reg = new RegExp(`^${modArr[i]}($|[^A-Za-z]+.*$)|^.*[^A-Za-z]+${modArr[i]}($|[^A-Za-z]+.*$)`);

                if (carArr[j].model.match(reg)) { //添加符合条件的数据；

                    if ($(`#${c_Name} .box ul li`).attr('data-id') != carArr[j].model) {//防止同一数据添加两次

                        console.log(carArr[j].model);

                        $(`<li data-id="${carArr[j].model}">
                        <div class="one">
                            <p class="car_img"><img src="img/listCar/${c_Name}/${carArr[j].imgSrc}" alt=""></p>
                            <h1>${carArr[j].title}</h1>
                            <p>${carArr[j].price}</p>
                            <p>${carArr[j].month}</p>
                        </div>
                        <div class="two">
                            <p onclick="window.open('detailCar.html?name=${obj.carName}&id=${carArr[j].id}')"><a href="" >了解更多</a></p>
                            <p><a href="">车型配置</a></p>
                            <p> <a href="">车型规格</a></p>
                            <p onclick="window.open('VRCar.html?model=${carArr[j].model}')"><a >全景看车</a></p>
                        </div>
                    </li>`).appendTo($(`#${c_Name} .box ul`))
                    }
                }
            }
        }
        if (!$(`#${c_Name} .box ul`).html()) {//删除空列表
            $(`#${c_Name}`).html('')
        }
    })
}

function adBox(c_Name) {//创建列表
    $(`#${c_Name}`).html(` <p class="title"></p>
            <span></span>
            <div class="box">
            <ul class="flex">
            </ul>
            </div>`);
    if (c_Name == 'coupe') {
        $(`#${c_Name} .title`).html('轿车');
    } else if (c_Name == 'suv') {
        $(`#${c_Name} .title`).html('SUV');
    } else if (c_Name == 'mpv') {
        $(`#${c_Name} .title`).html('MPV');
    } else if (c_Name == 'sport') {
        $(`#${c_Name} .title`).html('轿跑车&敞篷车');
    }
}

$('#xuan').click(function () {
    $('.carMode').slideToggle();
})

//一键置顶；
$('#scro').mouseover(function () {
    $(this).css({
        "background-position": "0px -50px"
    })
})
    .mouseout(function () {
        $(this).css({
            "background-position": "0px 0px"
        })
    })
    .click(function () {
        let num = document.documentElement.scrollTop;
        let timer = setInterval(() => {
            num -= 50;
            window.document.documentElement.scrollTop = num;
            if (num < 50) {
                window.document.documentElement.scrollTop = 0;
                clearInterval(timer);
            }
        }, 1)
    })

})


