;(function (Game) {
'use strict';

var Deck = (function () {
'use strict';

function makeStartingHand () {
  return [{
    name: 'the Excuse',
    value: 0
  },{
    name: 'the Sailor',
    value: 4,
    suit1: 'waves',
    suit2: 'leaves'
  },{
    name: 'the Soldier',
    value: 5,
    suit1: 'wyrms',
    suit2: 'knots'
  },{
    name: 'the Diplomat',
    value: 5,
    suit1: 'suns',
    suit2: 'moons'
  }]
}

function makeAces () {
  return [{
    name: 'Moons',
    value: 1,
    suit1: 'moons'
  },{
    name: 'Suns',
    value: 1,
    suit1: 'suns'
  },{
    name: 'Waves',
    value: 1,
    suit1: 'waves'
  },{
    name: 'Leaves',
    value: 1,
    suit1: 'leaves'
  },{
    name: 'Wyrms',
    value: 1,
    suit1: 'wyrms'
  },{
    name: 'Knots',
    value: 1,
    suit1: 'knots'
  }]
}

var hand = makeStartingHand()
  , aces = makeAces()
  , position = 0
  , deck = {}

deck.reset = function () {
  hand = makeStartingHand()
  aces = makeAces()
  position = 0
}

deck.render = function () {
}

deck.deal = function () {
  if (position > -1 && position < hand.length) {
    position += 1
    return hand[position - 1]
  }

  var ace = aces.pop()
  if (ace) {
    hand.push(ace)
  }

  position = 1
  return hand[position - 1]
}

return deck
}())

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
      if (spell.suit1) {
        html += '<span class="gem '+spell.suit1+'"></span>'
      }
      if (spell.suit2) {
        html += '<span class="gem '+spell.suit2+'"></span>'
      }
      if (spell.suit3) {
        html += '<span class="gem '+spell.suit3+'"></span>'
      }
      html += '</p>'
    }

    $('#spells').html(html)
  }

  dirty = 0
}

spells.cast = function (spell) {
  if (spell) {
    casted.push(spell)
    dirty |= 1
  }
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
    $('#moons').html(moons)
    $('#suns').html(suns)
    $('#waves').html(waves)
    $('#leaves').html(leaves)
    $('#wyrms').html(wyrms)
    $('#knots').html(knots)
  }

  dirty = 0
}

gems.spend = function (suit) {
  var spent = false

  switch (suit) {
    case 'moons':
      if (moons > 0) {
        spent = true
        moons -= 1
        dirty |= 1
      }
      break;
    case 'suns':
      if (suns > 0) {
        spent = true
        suns -= 1
        dirty |= 1
      }
      break;
    case 'waves':
      if (waves > 0) {
        spent = true
        waves -= 1
        dirty |= 1
      }
      break;
    case 'leaves':
      if (leaves > 0) {
        spent = true
        leaves -= 1
        dirty |= 1
      }
      break;
    case 'wyrms':
      if (wyrms > 0) {
        spent = true
        wyrms -= 1
        dirty |= 1
      }
      break;
    case 'knots':
      if (knots > 0) {
        spent = true
        knots -= 1
        dirty |= 1
      }
      break;
    default:
      break;
  }

  return spent
}

return gems
}())

function offGem (element) {
  var type = element.unwrap().id

  if (Gems.spend(type)) {
    Spells.cast(Deck.deal())
  }
}

function render () {
  requestAnimationFrame(render)

  Deck.render()
  Spells.render()
  Gems.render()
}

function startGame (callback) {
  requestAnimationFrame(callback)
}

Game.play = function () {
  var $ = window.jQuery

  $('#moons').touch(undefined, offGem)
  $('#suns').touch(undefined, offGem)
  $('#waves').touch(undefined, offGem)
  $('#leaves').touch(undefined, offGem)
  $('#wyrms').touch(undefined, offGem)
  $('#knots').touch(undefined, offGem)

  startGame(render)
}

}(window.Game = window.Game || {}))

Game.play()
