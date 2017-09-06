'use strict';

(function ($) {
    $(document).ready(function () {



        /* Init Wow.js plugin
        ---------------------------------*/
        new WOW().init();


        /* EasyPieChart plugin init
        -----------------------------------*/
        (function () {

            var chart = $('.chart');

            chart.easyPieChart({
                size: 50,
                animate: 5000,
                lineCap: 'butt',
                scaleColor: false,
                barColor: 'rgba(250,250,250, 1)',
                trackColor: 'rgba(250,250,250, .3)',
                lineWidth: 2

            });


            /* Progress bar for main slider
            ------------------------------------*/
            $('#mainSlider').on('init afterChange', function (ev, slick) {
                var currentSlide        = slick.currentSlide,
                    indexCurrentSlide   = chart.get(currentSlide);

                $(chart).removeClass('active');
                $(indexCurrentSlide).addClass('active');

                chart.each(function () {
                    if ($(this).hasClass('active')) {
                        $(this).data('easyPieChart').update(100);
                        $(this).data('easyPieChart').options.animate.duration = 5000;
                    }
                    else {
                        $(this).data('easyPieChart').update(0);
                        $(this).data('easyPieChart').options.animate.duration = 500;
                    }
                })
            });
        })();






        /* main slider plugin init
        -------------------------------------*/
        (function () {
            $('#mainSlider').slick({
                infinite: true,
                autoplay: true,
                dots: true,
                arrows: false,
                autoplaySpeed: 5000,
                slidesToShow: 1,
                slidesToScroll: 1,
                pauseOnHover: false,
                pauseOnDotsHover: false,
                pauseOnFocus: false,
                appendDots: $('.dots')
            });

        })()




    })
})(jQuery);

