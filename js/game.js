;(function (Game) {
'use strict';

function render () {
  requestAnimationFrame(render)
}

function startGame (callback) {
  requestAnimationFrame(callback)
}

Game.play = function () {
  var $ = window.jQuery
    , html = '<div id="deck"></div>'

  $('#world').html(html)

  startGame(render)
}

})(window.Game = window.Game || {})

Game.play()
