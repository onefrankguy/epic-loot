;(function (Game) {
'use strict';

function render () {
  requestAnimationFrame(render)
  console.log('render()')
}

function startGame (callback) {
  requestAnimationFrame(callback)
}

Game.play = function () {
  startGame(render)
}

})(window.Game = window.Game || {})

Game.play()
