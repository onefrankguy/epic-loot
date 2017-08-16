var PRNG = (function () {
'use strict';

var rng = {}
  , max = Math.pow(2, 32)
  , state = undefined

rng.seed = function (value) {
  if (value !== undefined) {
    state = parseInt(value, 10)
  }

  if (isNaN(state)) {
    state = Math.floor(Math.random() * max)
  }

  return state
}

rng.random = function () {
  state += (state * state) | 5
  return (state >>> 32) / max
}

rng.shuffle = function (array) {
  var i = 0
    , j = 0
    , temp = undefined

  if (state === undefined) {
    this.seed()
  }

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(this.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

return rng
}())

;(function (Game) {
'use strict';


var Deck = (function () {
'use strict';

function makeStartingHand () {
  var cards = [{
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

  PRNG.shuffle(cards)
  return cards
}

function makeAces () {
  var cards = [{
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

  PRNG.shuffle(cards)
  return cards
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
  PRNG.shuffle(hand)

  position = 1
  return hand[position - 1]
}

return deck
}())

var Signpost = (function () {

function makePersonalities () {
  var cards = [{
    name: 'the Author',
    value: 2,
    suit1: 'moons',
    suit2: 'knots'
  },{
    name: 'the Painter',
    value: 3,
    suit1: 'suns',
    suit2: 'knots'
  },{
    name: 'the Savage',
    value: 3,
    suit1: 'leaves',
    suit2: 'wyrms'
  },{
    name: 'the Lunatic',
    value: 6,
    suit1: 'moons',
    suit2: 'waves'
  },{
    name: 'the Penitent',
    value: 6,
    suit1: 'suns',
    suit2: 'wyrms'
  },{
    name: 'the Merchant',
    value: 9,
    suit1: 'leaves',
    suit2: 'knots'
  },{
    name: 'the Watchman',
    value: 11,
    suit1: 'moons',
    suit2: 'wyrms',
    suit3: 'knots'
  },{
    name: 'the Light Keeper',
    value: 11,
    suit1: 'suns',
    suit2: 'waves',
    suit3: 'knots'
  },{
    name: 'the Consul',
    value: 12,
    suit1: 'moons',
    suit2: 'waves',
    suit3: 'knots'
  },{
    name: 'the Bard',
    value: 10,
    suit1: 'suns'
  },{
    name: 'the Huntress',
    value: 10,
    suit1: 'moons'
  }]

  PRNG.shuffle(cards)
  return cards
}

function makeEvents () {
  var cards = [{
    name: 'the Journey',
    value: 3,
    suit1: 'moons',
    suit2: 'waves'
  },{
    name: 'Battle',
    value: 4,
    suit1: 'wyrms',
    suit2: 'knots'
  },{
    name: 'Discovery',
    value: 5,
    suit1: 'suns',
    suit2: 'waves'
  },{
    name: 'the Market',
    value: 6,
    suit1: 'leaves',
    suit2: 'knots'
  },{
    name: 'the Chance Meeting',
    value: 7,
    suit1: 'moons',
    suit2: 'leaves'
  },{
    name: 'Betrayal',
    value: 8,
    suit1: 'wyrms',
    suit2: 'knots'
  },{
    name: 'the Pact',
    value: 9,
    suit1: 'moons',
    suit2: 'suns'
  },{
    name: 'the Harvest',
    value: 11,
    suit1: 'moons',
    suit2: 'suns',
    suit3: 'leaves'
  },{
    name: 'the Rite',
    value: 12,
    suit1: 'moons',
    suit2: 'leaves',
    suit3: 'wyrms'
  },{
    name: 'Calamity',
    value: 10,
    suit1: 'wyrms'
  },{
    name: 'Windfall',
    value: 10,
    suit1: 'knots'
  }]

  PRNG.shuffle(cards)
  return cards
}

function makeLocations () {
  var cards = [{
    name: 'the Desert',
    value: 2,
    suit1: 'suns',
    suit2: 'wyrms'
  },{
    name: 'the Mountain',
    value: 4,
    suit1: 'moons',
    suit2: 'suns'
  },{
    name: 'the Forest',
    value: 5,
    suit1: 'moons',
    suit2: 'leaves'
  },{
    name: 'the Castle',
    value: 7,
    suit1: 'suns',
    suit2: 'knots'
  },{
    name: 'the Cave',
    value: 7,
    suit1: 'waves',
    suit2: 'wyrms'
  },{
    name: 'the Mill',
    value: 8,
    suit1: 'waves',
    suit2: 'leaves'
  },{
    name: 'the Darkness',
    value: 9,
    suit1: 'waves',
    suit2: 'wyrms'
  },{
    name: 'the Borderland',
    value: 11,
    suit1: 'waves',
    suit2: 'leaves',
    suit3: 'wyrms'
  },{
    name: 'the Island',
    value: 12,
    suit1: 'suns',
    suit2: 'waves',
    suit3: 'wyrms'
  },{
    name: 'the Window',
    value: 12,
    suit1: 'suns',
    suit2: 'leaves',
    suit3: 'knots'
  },{
    name: 'the Sea',
    value: 10,
    suit1: 'waves'
  }]

  PRNG.shuffle(cards)

  return [].concat([{
    name: 'the Origin',
    value: 2,
    suit1: 'waves',
    suit2: 'leaves'
  }], cards, [{
    name: 'the End',
    value: 10,
    suit1: 'knots'
  }])
}

function makeSignHTML (sign) {
  var html = ''
  html += '<span class="name">'+sign.name+'</span>'
  html += '<span class="value">'+sign.value+'</span>'
  if (sign.suit1) {
    html += '<span class="gem '+sign.suit1+'"></span>'
  }
  if (sign.suit2) {
    html += '<span class="gem '+sign.suit2+'"></span>'
  }
  if (sign.suit3) {
    html += '<span class="gem '+sign.suit3+'"></span>'
  }
  return html
}

var $ = window.jQuery
  , dirty = 1
  , personalities = makePersonalities()
  , personalities_index = 0
  , events = makeEvents()
  , events_index = 0
  , locations = makeLocations()
  , locations_index = 0
  , selected = undefined
  , stage = 1
  , signpost = {}

signpost.reset = function () {
  personalities = makePersonalities()
  personalities_index = 0
  events = makeEvents()
  events_index = 0
  locations = makeLocations()
  locations_index = 0
  selected = undefined
  stage = 1
  dirty = 1
}

signpost.render = function () {
  if (dirty & 1) {
    var sign1 = {name: '', value: ''}
      , sign2 = {name: '', value: ''}

    if (stage === 1) {
      sign1 = personalities[personalities_index]
      sign2 = events[events_index]
    }

    if (stage === 2) {
      sign1 = locations[locations_index]
    }

    $('#sign1').html(makeSignHTML(sign1))
    $('#sign2').html(makeSignHTML(sign2))
  }

  if (dirty & 2) {
    if (selected === 'sign1') {
      $('#sign2').html('')
    }
    if (selected === 'sign2') {
      $('#sign1').html('')
    }
  }

  dirty = 0
}

signpost.select = function (sign) {
  selected = sign
  dirty |= 2
}

return signpost
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
      , visible = casted.slice(-10)

    for (var spell of visible) {
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

function offSign (element) {
  var type = element.unwrap().id
  Signpost.select(type)
}

function render () {
  requestAnimationFrame(render)

  Deck.render()
  Signpost.render()
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

  $('#sign1').touch(undefined, offSign)
  $('#sign2').touch(undefined, offSign)

  startGame(render)
}

}(window.Game = window.Game || {}))

Game.play()
