$(function () {

    /* #region  MENU */
    $('#navMenu a').mouseenter(function () {
        $(this).css('color', 'var(--corHoverMenu)');
        $(this).parent('li').css('background-size', '100% 2px');
    })
    $('#navMenu a').mouseleave(function () {
        if ($(this).parent('li').hasClass('menuActive')) {
            $(this).css('color', 'var(--corHoverMenu)');
        } else {
            $(this).css('color', 'var(--corTxtMenu)');
        }
        $(this).parent('li').css('background-size', '0 2px');
    })

    function animationMenu() {
        if ($(window).scrollTop() != 0) {

            $('header').css('backdrop-filter', 'blur(1rem)');

            if (tema == 'escuro') {
                $(':root').css('--corFundoMenu', 'rgb(0,0,0,0.5)');
                $(':root').css('--corHoverMenu', 'white');

            } else {//se tema claro
                $(':root').css('--corFundoMenu', 'rgb(0,0,0,0.15)');
                $(':root').css('--corHoverMenu', 'black');

            }
            $(':root').css('--corTxtMenu', 'var(--corTxtSec)');
            $('#centerHeader a').css('color', 'var(--corTxtMenu)');
            $('#centerHeader i').css('color', 'var(--corTxtMenu)');

        } else { //menu na pos 0 as configurações são as mesmas para os dois temas
            $(':root').css('--corFundoMenu', 'transparent');
            $('header').css('backdrop-filter', 'none');
            $('#centerHeader a').css('color', 'var(--corTxtMenu)');
            $('#centerHeader i').css('color', 'var(--corTxtMenu)');
            $(':root').css('--corHoverMenu', 'var(--azulSec)');
            $(':root').css('--corTxtMenu', 'var(--azulPrim)');

        }
    }
    animationMenu();
    $(window).scroll(function () {
        animationMenu();
    })
    /* #endregion */

    /* #region  EFEITO SCROLL */
    function verificacaoScroll() {

        var sumario = $('#navMenu a');

        sumario.each(function () {

            var sessaoId = $(this).attr('href');
            var topWindow = $(window).scrollTop();
            var windowHeight = $(window).height();
            var topEl = $(sessaoId).offset().top;
            var elHeigth = $(sessaoId).height();

            if (topWindow >= topEl - windowHeight / 2 && topWindow < topEl + elHeigth - windowHeight / 2) {
                sumario.parent('li').removeClass('menuActive');
                sumario.css('color', 'var(--corTxtMenu)');

                $(this).parent('li').addClass('menuActive');
                $(this).css('color', 'var(--corHoverMenu)');
            } else {

                $(this).parent('li').removeClass('menuActive');
                $(this).css('color', 'var(--corTxtMenu)');
            }

        })

    }

    verificacaoScroll();

    $(window).scroll(function () {
        verificacaoScroll();
    })

    function moveScroll(el) {
        var elId = $(el).attr('href');

        var posScrollTop = $(elId).offset().top - parseFloat($('header').css('height'));

        $('html,body').animate({
            scrollTop: posScrollTop
        }, 300);
        return false;
    }

    //links menu desktop
    $('#navMenu a').click(function (e) {
        moveScroll($(this));
        e.preventDefault();
    })

    //links menu mobile
    $('#listaMenuMobile a').click(function (e) {
        moveScroll($(this));
        e.preventDefault();
    })

    //rolar ao topo
    $('#upScroll').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 300);
    })
    function upScroll() {
        if ($(window).scrollTop() > 600) {
            $('#upScroll').fadeIn(100);
        } else {
            $('#upScroll').fadeOut(100);
        }
    }
    upScroll();
    $(window).scroll(function () {
        upScroll();
    })
    /* #endregion */

    /* #region  ALTERAÇÃO DO TEMA */
    var tema = 'escuro';

    $('#contTema').click(function () {
        if ($('#circleTema').css('left') == '3px') {
            //aplicando tema claro
            $('#circleTema').css('left', 'calc(100% - 35px)');
            tema = 'claro';
            animationMenu();
            $(':root').css('--corTxtPrim', 'black');
            $(':root').css('--corTxtSec', 'rgb(50,50,50)');
            $(':root').css('--corFundoPrim', 'rgb(240,240,240)');
            $(':root').css('--corFundoSec', 'white');
            $(':root').css('--shadowFoto', '1px 1px 10px rgba(0, 0, 0, 0.3)')

        } else {
            //aplicando tema escuro
            $('#circleTema').css('left', '3px');
            tema = 'escuro';
            animationMenu();
            $(':root').css('--corTxtPrim', 'white');
            $(':root').css('--corTxtSec', 'rgb(210, 210, 210)');
            $(':root').css('--corFundoPrim', 'rgb(15, 15, 15)');
            $(':root').css('--corFundoSec', 'rgb(30, 30, 30)');
            $(':root').css('--shadowFoto', '1px 1px 10px rgba(255, 255, 255, 0.3)')

        }
    })
    /* #endregion */

    /* #region  MENU MOBILE */
    function abrirMenuMobile(el) {
        $(el).removeClass('fa-bars');
        $(el).addClass('fa-x');
        $('#contMenuMobile').css('left', '100%');
        $('#contMenuMobile').css('display', 'flex');
        setTimeout(() => {
            $('#contMenuMobile').css('left', '0');
        }, 50);
        $('body,html').css('overflow', 'hidden');
    }

    function fecharMenuMobile(el) {
        $(el).removeClass('fa-x');
        $(el).addClass('fa-bars');
        $('#contMenuMobile').css('left', '100%');
        setTimeout(() => {
            $('#contMenuMobile').css('display', 'none');
        }, 500);
        $('body,html').css('overflow', 'auto');
    }

    $('#btMenuMobile').click(function () {
        if ($(this).hasClass('fa-bars')) {//abrindo menu mobile
            abrirMenuMobile($(this));
        } else {//fechando menu mobile
            fecharMenuMobile($(this));
        }
    })

    if ($('#contMenuMobile').css('display') != 'none') {
        $(window).scroll(function () {
            if($('#contMenuMobile').css('display') != 'none'){
                fecharMenuMobile($('#btMenuMobile'));
            }
        })

        $(window).resize(function () {
            if($('#contMenuMobile').css('display') != 'none'){
                fecharMenuMobile($('#btMenuMobile'));
            }
        })
    }
    /* #endregion */

    /* #region  ITEM PROJETO */
    //Ver mais do projeto
    $('.itemProjetos').mouseenter(function () {
        if($(window).width() <= 768){
            setTimeout(() => {
                $(this).find('.verMais').fadeIn(200).css('display', 'flex');
            }, 100);
        }else{
            $(this).find('.verMais').fadeIn(200).css('display', 'flex');
        }

    })
    $('.itemProjetos').mouseleave(function () {
        $(this).find('.verMais').fadeOut(200);
    })

    //abrir modal
    $('.verDescLonga').click(function () {
        

        $('#descLongaModal').html($(this).closest('.itemProjetos').find('.descLonga').html());
        $('.contModalProj').fadeIn(200).css('display', 'flex');
    })

    //fechar modal
    $(window).scroll(function () {
        if ($('.contModalProj').css('display') != 'none') {
            $('.contModalProj').fadeOut(200);
        }
    })
    $('.contModalProj').click(function (e) {
        if (e.target === this) {
            $('.contModalProj').fadeOut(200);
        }
    })
    $('.fecharModalProj').click(function () {
        $('.contModalProj').fadeOut(200);
    })
    /* #endregion */


})