'use strict';

(function ($) {
    $(document).ready(function () {




        /* Scroll off top
        --------------------------------------*/


        (function () {
            // var chechScroll = true;
            
            $(".trigger-down").click(function () {
                $('html, body').animate({
                    scrollTop: $("#elementtoScrollToID").offset().top - 133
                }, 1500);
            });


            // $(window).on('scroll ', function (e) {
            //
            //     var scrollTopVal = $(window).scrollTop();
            //
            //     if ( scrollTopVal > 1 && chechScroll ) {
            //         e.stopPropagation();
            //
            //         $('html, body').animate({
            //             scrollTop: $("#elementtoScrollToID").offset().top - $('.top-menu').height() - 45
            //         }, 1500);
            //         chechScroll = false;
            //     }
            //
            //     if( scrollTopVal === 0 &&   scrollTopVal < 100){
            //         chechScroll = true;
            //     }
            //     e.preventDefault();
            //
            //     return chechScroll;
            //
            //
            // })

        })();




        /* Init AOS.js plugin
        ---------------------------------*/


        (function () {
            AOS.init({
                offset: 250,
                duration: 500,
                easing: 'ease-in-sine',
                disable: function () {
                    var maxWidth = 767;
                    return window.innerWidth < maxWidth;
                }
            });

        })();




        /* EasyPieChart plugin init
        -----------------------------------*/
        (function () {

             var chart = $('.chart');

            chart.easyPieChart({
                size: 45,
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
        })();




        /* Trigger click to slider dods
        -------------------------------------*/


        (function () {
           $('.main-slider .static-content .progress-bar_list li').on('click',function () {
               var curentPointId = $('.main-slider .static-content .progress-bar_list li').index($(this))
               $('#slick-slide0' + curentPointId).click()
           }) 
        })();



        /* mobile menu
         -------------------------------------*/
        (function () {
            $('.menu-icon').on('click', function () {
                $('header, body').addClass('open')
            });
            $(' header .closed-icon').on('click', function () {
                $('header , body').removeClass('open')
            });
        })();




        (function () {
            $(window).on('scroll load resize', function () {
                var scrollTopVal    = $(window).scrollTop(),
                    windowsWidth    = (window.innerWidth),
                    offsetTopVal    = 200,
                    maxWinWidth     = 1279;

                if (scrollTopVal > offsetTopVal && windowsWidth > maxWinWidth) {
                    $('header').addClass('fixed')
                }
                else {
                    $('header').removeClass('fixed  hiden')
                }
            })
        })();

    })
})(jQuery);

