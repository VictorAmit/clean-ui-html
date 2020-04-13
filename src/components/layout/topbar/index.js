/////////////////////////////////////////////////////////////////////////////////////////
// "cui-topbar" module scripts

; (function ($) {
  'use strict'
  $(function () {
    ///////////////////////////////////////////////////////////
    // livesearch scripts

    var livesearch = $('.cui-topbar-livesearch')
    var close = $('.cui-topbar-livesearch-close')
    var visibleClass = 'cui-topbar-livesearch-visible'
    var input = $('#livesearch-input')
    var inputInner = $('#livesearch-input-inner')

    function setHidden() {
      livesearch.removeClass(visibleClass)
    }
    function handleKeyDown(e) {
      const key = event.keyCode.toString()
      if (key === '27') {
        setHidden()
      }
    }
    input.on('focus', function () {
      livesearch.addClass(visibleClass)
      setTimeout(function () {
        inputInner.focus()
      }, 200)
    })
    close.on('click', setHidden)
    document.addEventListener('keydown', handleKeyDown, false)
  })
})(jQuery)
