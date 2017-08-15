;(function (Game) {
'use strict';

var Spells = (function () {
'use strict';

var $ = window.jQuery
  , dirty = 0
  , casted = []
  , spells = {}

spells.reset = function () {
  casted = []
  dirty |= 1
}

spells.render = function () {
  if (dirty & 1) {
    var html = ''

    for (var spell of casted) {
      html += '<p class="spell">'
      html += '<span class="name">'+spell.name+'</span>'
      html += '<span class="power">'+spell.value+'</span>'
      html += '<span class="gem '+spell.suit1+'"></span>'
      html += '<span class="gem '+spell.suit2+'"></span>'
      html += '</p>'
    }

    $('#spells').html(html)
  }

  dirty = 0
}

spells.cast = function () {
  casted.push({name: 'Magic Missile', value: 3, suit1: 'suns', suit2: 'moons'})
  dirty |= 1
}

return spells
}())

function render () {
  requestAnimationFrame(render)

  Spells.render()
}

function startGame (callback) {
  requestAnimationFrame(callback)
}

Game.play = function () {
  Spells.cast()
  Spells.cast()

  startGame(render)
}

})(window.Game = window.Game || {})

Game.play()
