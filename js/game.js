;(function (Game) {
'use strict';

var Deck = (function () {
'use strict';

function makeStartingDeck () {
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

var cards = makeStartingDeck()
  , position = -1
  , deck = {}

deck.reset = function () {
  cards = makeStartingDeck()
  position = -1
}

deck.render = function () {
}

deck.deal = function () {
  position += 1
  if (position > cards.length) {
    position = cards.length
  }
  if (position < 0) {
    position = 0
  }

  if (position < cards.length) {
    return cards[position]
  }

  return undefined
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
  casted.push(spell)
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
  var spell = Deck.deal()
  if (spell) {
    Gems.spend('moons')
    Spells.cast(spell)
  }
}

function offSuns () {
  var spell = Deck.deal()
  if (spell) {
    Gems.spend('suns')
    Spells.cast(spell)
  }
}

function offWaves () {
  var spell = Deck.deal()
  if (spell) {
    Gems.spend('waves')
    Spells.cast(spell)
  }
}

function offLeaves () {
  var spell = Deck.deal()
  if (spell) {
    Gems.spend('leaves')
    Spells.cast(spell)
  }
}

function offWyrms () {
  var spell = Deck.deal()
  if (spell) {
    Gems.spend('wyrms')
    Spells.cast(spell)
  }
}

function offKnots () {
  var spell = Deck.deal()
  if (spell) {
    Gems.spend('knots')
    Spells.cast(spell)
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
