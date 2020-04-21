/////////////////////////////////////////////////////////////////////////////////////////
// "cui-menu-right" module scripts
; (function ($) {
  'use strict'
  $(function () {
    /////////////////////////////////////////////////////////////////////////////////////////
    // hide non top menu related settings
    if ($('.cui__menuTop').length) {
      $('.hideIfMenuTop').css({
        pointerEvents: 'none',
        opacity: 0.4,
      })
    }

    /////////////////////////////////////////////////////////////////////////////////////////
    // toggle
    $('.cui__sidebar__actionToggle').on('click', function () {
      $('body').toggleClass('cui__sidebar--toggled')
    })

    /////////////////////////////////////////////////////////////////////////////////////////
    // toggle theme
    $('.cui__sidebar__actionToggleTheme').on('click', function () {
      if ($('body').hasClass('kit__dark')) {
        $('body').removeClass('kit__dark cui__menuLeft--gray cui__menuTop--gray cui__menuLeft--dark cui__menuTop--dark')
        return
      }

      $('body').removeClass('cui__menuLeft--gray cui__menuTop--gray cui__menuLeft--dark cui__menuTop--dark')
      $('body').addClass('kit__dark cui__menuLeft--dark cui__menuTop--dark')
    })

    /////////////////////////////////////////////////////////////////////////////////////////
    // switch
    $('.cui__sidebar__switch input').on('change', function () {
      var el = $(this)
      var checked = el.is(':checked')
      var to = el.attr('to')
      var setting = el.attr('setting')
      if (checked) {
        $(to).addClass(setting)
      } else {
        $(to).removeClass(setting)
      }
    })

    $('.cui__sidebar__switch input').each(function () {
      var el = $(this)
      var to = el.attr('to')
      var setting = el.attr('setting')
      if ($(to).hasClass(setting)) {
        el.attr('checked', true)
      }
    })

    /////////////////////////////////////////////////////////////////////////////////////////
    // colors
    $('.cui__sidebar__select__item').on('click', function () {
      var el = $(this)
      var parent = el.parent()
      var to = parent.attr('to')
      var setting = el.attr('setting')
      var items = parent.find('> div')
      var classList = ''
      items.each(function () {
        var setting = $(this).attr('setting')
        if (setting) {
          classList = classList + ' ' + setting
        }
      })
      items.removeClass('cui__sidebar__select__item--active')
      el.addClass('cui__sidebar__select__item--active')
      $(to).removeClass(classList)
      $(to).addClass(setting)
    })

    $('.cui__sidebar__select__item').each(function () {
      var el = $(this)
      var parent = el.parent()
      var to = parent.attr('to')
      var setting = el.attr('setting')
      var items = parent.find('> div')
      if ($(to).hasClass(setting)) {
        items.removeClass('cui__sidebar__select__item--active')
        el.addClass('cui__sidebar__select__item--active')
      }
    })

    /////////////////////////////////////////////////////////////////////////////////////////
    // type
    $('.cui__sidebar__type__items input').on('change', function () {
      var el = $(this)
      var checked = el.is(':checked')
      var to = el.attr('to')
      var setting = el.attr('setting')
      $('body').removeClass('cui__menu--compact cui__menu--flyout cui__menu--nomenu')
      if (checked) {
        $(to).addClass(setting)
      } else {
        $(to).removeClass(setting)
      }
    })

    $('.cui__sidebar__type__items input').each(function () {
      var el = $(this)
      var to = el.attr('to')
      var setting = el.attr('setting')
      if ($(to).hasClass(setting)) {
        el.attr('checked', true)
      }
    })
  })
})(jQuery)
