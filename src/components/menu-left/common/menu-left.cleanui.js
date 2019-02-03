/////////////////////////////////////////////////////////////////////////////////////////
// "menu-right" module scripts

;(function($) {
  'use strict'
  $(function() {
    /////////////////////////////////////////////////////////////////////////////////////////
    // set active menu item

    var url = window.location.href
    var page = url.substr(url.lastIndexOf('/') + 1)
    var currentItem = $('.menu-left__list--root').find('a[href="' + page + '"]')
    currentItem.parent().toggleClass('menu-left__item--active')
    currentItem
      .closest('.menu-left__submenu')
      .addClass('menu-left__submenu--toggled')
      .find('> .menu-left__list')
      .slideToggle(0)

    /////////////////////////////////////////////////////////////////////////////////////////
    // add backdrop

    $('.menu-left').after('<div class="menu-left__backdrop"><!-- --></div>')

    /////////////////////////////////////////////////////////////////////////////////////////
    // menu logic

    $('.menu-left__trigger--action').on('click', function() {
      $('body').toggleClass('menu-left--toggled')
    })

    var isTabletView = false

    function toggleMenu() {
      if (!isTabletView) {
        $('body').addClass('menu-left--toggled')
      }
    }

    if ($(window).width() < 992) {
      toggleMenu()
      isTabletView = true
    }

    $(window).on('resize', function() {
      if ($(window).width() <= 992) {
        toggleMenu()
        isTabletView = true
      } else {
        isTabletView = false
      }
    })

    $('.menu-left__handler, .menu-left__backdrop').on('click', function() {
      $('body').toggleClass('menu-left--toggled-mobile')
    })

    /////////////////////////////////////////////////////////////////////////////////////////
    // submenu

    $('.menu-left__submenu > a').on('click', function() {
      if ($('body').hasClass('menu-left--toggled') && !($('body').width() < 768)) {
        return
      }
      if ($('body').find('.menu-left').length) {
        var parent = $(this).parent(),
          opened = $('.menu-left__submenu--toggled')

        if (
          !parent.hasClass('menu-left__submenu--toggled') &&
          !parent.parent().closest('.menu-left__submenu').length
        )
          opened
            .removeClass('menu-left__submenu--toggled')
            .find('> .menu-left__list')
            .slideUp(200)

        parent.toggleClass('menu-left__submenu--toggled')
        parent.find('> .menu-left__list').slideToggle(200)
      }
    })

    /////////////////////////////////////////////////////////////////////////////////////////
    // custom scroll init

    if ($('body').find('.menu-left').length) {
      if (!/Mobi/.test(navigator.userAgent) && jQuery().perfectScrollbar) {
        $('.menu-left__scroll').perfectScrollbar({
          theme: 'cleanui',
        })
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////
    // colorful menu

    var colorfulClasses =
        'menu-left--colorful--primary menu-left--colorful--secondary menu-left--colorful--primary menu-left--colorful--default menu-left--colorful--info menu-left--colorful--success menu-left--colorful--warning menu-left--colorful--danger menu-left--colorful--yellow',
      colorfulClassesArray = colorfulClasses.split(' ')

    function setColorfulClasses() {
      $('.menu-left__list--root > .menu-left__item').each(function() {
        var randomClass =
          colorfulClassesArray[Math.floor(Math.random() * colorfulClassesArray.length)]
        $(this).addClass(randomClass)
      })
    }

    function removeColorfulClasses() {
      $('.menu-left__list--root > .menu-left__item').removeClass(colorfulClasses)
    }

    if ($('body').hasClass('menu-left--colorful')) {
      setColorfulClasses()
    }

    $('body').on('setColorfulClasses', function() {
      setColorfulClasses()
    })

    $('body').on('removeColorfulClasses', function() {
      removeColorfulClasses()
    })
  })
})(jQuery)
