$(function () {

        let index = -1;
        let timer = setInterval(next, 5000);

        function next() {
            if (index >= $('.opacity ul li').length-1) {
                index = -1;
            }
            index++;
            for (let i = 0; i < $('.opacity ul li').length; i++) {
                $('.opacity ul li').eq(i).removeClass('act');
                $('.opacity ol li').eq(i).removeClass('ac_dot start');
            }
            $('.opacity ul li').eq(index).addClass('act')
            $('.opacity ol li').eq(index).addClass('ac_dot')

        }

        $('#next').click(function () {
            clearInterval(timer);
            next();
            timer = setInterval(next, 5000);

        });

        $('#pre').click(function () {
            clearInterval(timer);
            if (index <=0) {
                index = $('.opacity ul li').length ;
            }
            index--;
            for (let i = 0; i < $('.opacity ul li').length; i++) {
                $('.opacity ul li').eq(i).removeClass('act');
                $('.opacity ol li').eq(i).removeClass('ac_dot start');
            }
            $('.opacity ul li').eq(index).addClass('act')
            $('.opacity ol li').eq(index).addClass('ac_dot')

            timer = setInterval(next, 5000);

        })

        $('.opacity ol li').click(function () {
            clearInterval(timer);
            index = $(this).index()-1;
            next();
            timer = setInterval(next, 5000);

        })

    })

