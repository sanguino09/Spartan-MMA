/*  ---------------------------------------------------
  Template Name: Gym
  Description:  Gym Fitness HTML Template
  Author: Colorlib
  Author URI: https://colorlib.com
  Version: 1.0
  Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Canvas Menu
    $(".canvas-open").on('click', function () {
        $(".offcanvas-menu-wrapper").css("display", "block").addClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".canvas-close, .offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("show-offcanvas-menu-wrapper").css("display", "none");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    // Search model
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    //Masonary
    $('.gallery').masonry({
        itemSelector: '.gs-item',
        columnWidth: '.grid-sizer',
        gutter: 10
    });

    // QR option and overlay
    $('.nav-menu > ul li, .canvas-menu > ul li').filter(function () {
        return $(this).text().trim() === 'QR';
    }).remove();
    var qrNavItem = '<li><a href="#" class="qr-nav" aria-label="Código QR"><i class="fa fa-qrcode"></i></a></li>';
    $('.nav-menu > ul, .canvas-menu > ul').append(qrNavItem);
    var qrOverlay = '<div id="qr-overlay"><div class="qr-content"><img src="img/spartamma_qr.jpeg" alt="QR Sparta MMA"><p>Usa este enlace para entrar en la academia en MAAT y reservar <a href="https://maat-app.link/olDAAYpz7Vb" target="_blank">https://maat-app.link/olDAAYpz7Vb</a></p></div></div>';
    $('body').append(qrOverlay);

    $(document).on('click', '.qr-nav', function (e) {
        e.preventDefault();
        $('#qr-overlay').fadeIn();
    });

    $('#qr-overlay').on('click', function () {
        $('#qr-overlay').fadeOut();
    });

    /*------------------
                Navigation
        --------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap'
    });

    /*------------------
        Carousel Slider
    --------------------*/
    if ($(".hs-slider").length) {
        var hero_s = $(".hs-slider");
        var heroConfig = {
            loop: true,
            margin: 0,
            nav: true,
            items: 1,
            dots: false,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            autoHeight: false
        };

        if ($(window).width() < 768) {
            heroConfig.autoplay = true;
            heroConfig.smartSpeed = 600;
            heroConfig.autoplayTimeout = 3000;
        } else {
            heroConfig.smartSpeed = 1200;
            heroConfig.autoplay = false;
        }

        hero_s.owlCarousel(heroConfig);
    }

    /*------------------
        Team Slider
    --------------------*/
    $(".ts-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            320: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            }
        }
    });

    /*------------------
        Testimonial Slider
    --------------------*/
    $(".ts_slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------
        Brand Slider
    --------------------*/
    $('.brand-carousel').owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        autoplayTimeout: 1500,
        autoplayHoverPause: true,
        responsive: {
            0: { items: 2 },
            576: { items: 3 },
            768: { items: 4 },
            992: { items: 5 }
        }
    });

    /*------------------
        Image Popup
    --------------------*/
    $('.image-popup').magnificPopup({
        type: 'image'
    });

    /*------------------
        Video Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        Barfiller
    --------------------*/
    $('#bar1').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar2').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar3').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });

    $('.table-controls ul li').on('click', function () {
        var tsfilter = $(this).data('tsfilter');
        if (tsfilter === undefined) {
            return;
        }
        $('.table-controls ul li').removeClass('active');
        $(this).addClass('active');

        if (tsfilter == 'all') {
            $('.class-timetable').removeClass('filtering');
            $('.ts-meta').removeClass('show');
        } else {
            $('.class-timetable').addClass('filtering');
        }
        $('.ts-meta').each(function () {
            $(this).removeClass('show');
            if ($(this).data('tsmeta') == tsfilter) {
                $(this).addClass('show');
            }
        });
    });

})(jQuery);


function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}


const table_limite = document.getElementById('limite_table');
const table_toledo = document.getElementById('toledo_table');
const locationSwitch = document.querySelectorAll('#location-switch li');

function setActive(index){
    locationSwitch.forEach((el, i) => {
        if(i === index){
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

/*
function limiteHorario(){
    console.log('limite');
    unfade(table_limite);
    table_toledo.style.display = 'none';
    setActive(1);
}
*/

function toledoHorario(){
    console.log('toledo');
    unfade(table_toledo);
    if (table_limite) {
        table_limite.style.display = 'none';
    }
    setActive(0);
}


function downloadSchedule(wrapperId, filename) {
    var wrapper = document.getElementById(wrapperId);
    if (!wrapper) {
        console.warn('No se encontró el contenedor del horario con id:', wrapperId);
        return;
    }

    var table = wrapper.querySelector('table');
    if (!table) {
        console.warn('No se encontró la tabla dentro del contenedor:', wrapperId);
        return;
    }

    var scale = Math.max(window.devicePixelRatio || 1, 2);

    html2canvas(table, {
        backgroundColor: '#000',
        scale: scale,
        useCORS: true
    }).then(function (canvas) {
        var link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = filename || 'horario.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(function (error) {
        console.error('No se pudo generar la imagen del horario:', error);
    });
}




