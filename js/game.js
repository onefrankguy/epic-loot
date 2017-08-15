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

var Gems = (function () {
'use strict';

var $ = window.jQuery
  , dirty = 1
  , moons = 6
  , suns = 6
  , waves = 6
  , leaves = 6
  , wyrms = 6
  , knots = 6
  , gems = {}

gems.reset = function () {
  moons = 6
  suns = 6
  waves = 6
  leaves = 6
  wyrms = 6
  knots = 6

  dirty |= 1
}

gems.render = function () {
  if (dirty & 1) {
    $('#moons-gem').html(moons)
    $('#suns-gem').html(suns)
    $('#waves-gem').html(waves)
    $('#leaves-gem').html(leaves)
    $('#wyrms-gem').html(wyrms)
    $('#knots-gem').html(knots)
  }

  dirty = 0
}

gems.spend = function (suit) {
  switch (suit) {
    case 'moons':
      moons -= 1
      if (moons < 0) {
        moons = 0
      }
      dirty |= 1
      break;
    case 'suns':
      suns -= 1
      if (suns < 0) {
        suns = 0
      }
      dirty |= 1
      break;
    case 'waves':
      waves -= 1
      if (waves < 0) {
        waves = 0
      }
      dirty |= 1
      break;
    case 'leaves':
      leaves -= 1
      if (leaves < 0) {
        leaves = 0
      }
      dirty |= 1
      break;
    case 'wyrms':
      wyrms -= 1
      if (wyrms < 0) {
        wyrms = 0
      }
      dirty |= 1
      break;
    case 'knots':
      knots -= 1
      if (knots < 0) {
        knots = 0
      }
      dirty |= 1
      break;
    default:
      break;
  }
}

return gems
}())

function offMoons () {
  Gems.spend('moons')
}

function offSuns () {
  Gems.spend('suns')
}

function offWaves () {
  Gems.spend('waves')
}

function offLeaves () {
  Gems.spend('leaves')
}

function offWyrms () {
  Gems.spend('wyrms')
}

function offKnots () {
  Gems.spend('knots')
}

function render () {
  requestAnimationFrame(render)

  Spells.render()
  Gems.render()
}

function startGame (callback) {
  requestAnimationFrame(callback)
}

Game.play = function () {
  var $ = window.jQuery

  $('#moons-gem').touch(undefined, offMoons)
  $('#suns-gem').touch(undefined, offSuns)
  $('#waves-gem').touch(undefined, offWaves)
  $('#leaves-gem').touch(undefined, offLeaves)
  $('#wyrms-gem').touch(undefined, offWyrms)
  $('#knots-gem').touch(undefined, offKnots)

  startGame(render)
}

}(window.Game = window.Game || {}))

Game.play()
