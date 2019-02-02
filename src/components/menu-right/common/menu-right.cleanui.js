/////////////////////////////////////////////////////////////////////////////////////////
// "menu-right" module scripts
;(function($) {
  'use strict'
  $(function() {
    /////////////////////////////////////////////////////////////////////////////////////////
    // toggle right menu

    $('.menu-right__action--menu-toggle').on('click', function() {
      $('body').toggleClass('menu-right--visible')
    })

    /////////////////////////////////////////////////////////////////////////////////////////
    // custom scroll init

    if (!/Mobi/.test(navigator.userAgent) && jQuery().jScrollPane) {
      $('.menu-right').each(function() {
        $(this).jScrollPane({
          contentWidth: '0px',
          autoReinitialise: true,
          autoReinitialiseDelay: 100,
        })
        var api = $(this).data('jsp'),
          throttleTimeout
        $(window).on('resize', function() {
          if (!throttleTimeout) {
            throttleTimeout = setTimeout(function() {
              api.reinitialise()
              throttleTimeout = null
            }, 50)
          }
        })
      })
    }

    /////////////////////////////////////////////////////////////////////////////////////////
    // options scripts

    $('.menu-right--example-option').each(function() {
      var inputs = $(this).find('input'),
        buttons = $(this).find('.btn')

      // detect current options and set active buttons
      var found = false
      inputs.each(function() {
        if ($('body').hasClass($(this).val())) {
          $(this)
            .parent()
            .trigger('click')
          found = true
        }
      })
      if (!found) {
        $(this)
          .find('input[value=""]')
          .parent()
          .trigger('click')
        $('.menu-right .jspPane').css({ top: 0 })
      }

      // change options on click
      $(this)
        .find('.btn')
        .on('click', function() {
          var removeClasses = '',
            addClass = $(this)
              .find('input')
              .val()

          buttons.removeClass('active')
          $(this).addClass('active')

          inputs.each(function() {
            removeClasses += $(this).val() + ' '
          })

          $('body')
            .removeClass(removeClasses)
            .addClass(addClass)

          if (
            $(this)
              .find('input')
              .attr('name') == 'options-colorful' &&
            $(this)
              .find('input')
              .val() == 'menu-left--colorful'
          ) {
            $('body').trigger('removeColorfulClasses')
            $('body').trigger('setColorfulClasses')
          }

          if (
            $(this)
              .find('input')
              .attr('name') == 'options-colorful' &&
            $(this)
              .find('input')
              .val() == ''
          ) {
            $('body').trigger('removeColorfulClasses')
          }
        })
    })
  })
})(jQuery)
