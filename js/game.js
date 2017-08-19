// **GAME** is based on [_Tinker, Sailor, Soldier, Spy_][tsss], a deck-building
// game by Mike Richey for the [Decktet][].
//
// [tsss]: http://wiki.decktet.com/game:tinker-sailor-soldier-spy "Mike Richey (The Decktet Wiki) "Tinker, Sailor, Soldier, Spy"
// [Decktet]: http://www.decktet.com/ "P.D. Magnus: The Decktet"
const Decktet = (function Decktet() {
  const cards = {};

  function get(name) {
    return cards[name];
  }

  // **GAME** is a RPG at heart.
  function attributes() {
    return [
      'strength', 'body', 'quickness', 'intelligence', 'willpower', 'charisma',
    ];
  }

  // The suit of Suns (ᛒ) is strength.
  cards.strength = { value: 1, suits: ['suns'] };

  // The suit of Leaves (ᚦ) is body.
  cards.body = { value: 1, suits: ['leaves'] };

  // The suit of Waves (ᚲ) is quickness.
  cards.quickness = { value: 1, suits: ['waves'] };

  // The suit of Knots (ᚠ) is intelligence.
  cards.intelligence = { value: 1, suits: ['knots'] };

  // The suit of Moons (ᚷ) is willpower.
  cards.willpower = { value: 1, suits: ['moons'] };

  // The suit of Wyrms (ᛆ) is charisma.
  cards.charisma = { value: 1, suits: ['wyrms'] };

  // You start the game with four personalities, the Excuse, the Sailor,
  // the Soldier, and the Diplomat. This gives you one of each suit.
  cards.excuse = { value: 0, suits: [] };
  cards.sailor = { value: 4, suits: ['waves', 'leaves'] };
  cards.soldier = { value: 5, suits: ['wyrms', 'knots'] };
  cards.diplomat = { value: 8, suits: ['moons', 'suns'] };

  // You encounter the remaining eleven personalities during your journey.
  // Successfully persuading a personality to join your quest adds it to your
  // hand.
  function personalities() {
    return [
      'author', 'painter', 'savage', 'lunatic', 'penitent', 'merchant',
      'watchman', 'light keeper', 'consul', 'bard', 'huntress',
    ];
  }

  cards.author = { value: 2, suits: ['moons', 'knots'] };
  cards.painter = { value: 3, suits: ['suns', 'knots'] };
  cards.savage = { value: 3, suits: ['leaves', 'wyrms'] };
  cards.lunatic = { value: 6, suits: ['moons', 'waves'] };
  cards.penitent = { value: 6, suits: ['suns', 'wyrms'] };
  cards.merchant = { value: 9, suits: ['leaves', 'knots'] };
  cards.watchman = { value: 11, suits: ['moons', 'wyrms', 'knots'] };
  cards['light keeper'] = { value: 11, suits: ['suns', 'waves', 'knots'] };
  cards.consul = { value: 12, suits: ['moons', 'waves', 'knots'] };
  cards.bard = { value: 10, suits: ['suns'] };
  cards.huntress = { value: 10, suits: ['moons'] };

  // If you don't persuade the personality you encouter...
  function events() {
    return [
      'journey', 'battle', 'discovery', 'market', 'chance meeting', 'betrayal',
      'pact', 'harvest', 'rite', 'calamity', 'windfall',
    ];
  }

  cards.journey = { value: 3, suits: ['moons', 'waves'] };
  cards.battle = { value: 4, suits: ['wyrms', 'knots'] };
  cards.discovery = { value: 5, suits: ['suns', 'waves'] };
  cards.market = { value: 6, suits: ['leaves', 'knots'] };
  cards['chance meeting'] = { value: 7, suits: ['moons', 'leaves'] };
  cards.betrayal = { value: 8, suits: ['wyrms', 'knots'] };
  cards.pact = { value: 9, suits: ['moons', 'suns'] };
  cards.harvest = { value: 11, suits: ['moons', 'suns', 'leaves'] };
  cards.rite = { value: 12, suits: ['moons', 'leaves', 'wyrms'] };
  cards.calamity = { value: 10, suits: ['wyrms'] };
  cards.windfall = { value: 10, suits: ['knots'] };

  // Any personality you choose not to persuade or event you choose not to
  // assist is consumed by the ???. It mixes with the locations to become an
  // obstacle you must face in the second half of the game.
  function locations() {
    return [
      'desert', 'mountain', 'forest', 'castle', 'cave', 'mill', 'darkness',
      'borderland', 'island', 'window', 'sea',
    ];
  }

  cards.desert = { value: 2, suits: ['suns', 'wyrms'] };
  cards.mountain = { value: 4, suits: ['moons', 'suns'] };
  cards.forest = { value: 5, suits: ['moons', 'leaves'] };
  cards.castle = { value: 7, suits: ['suns', 'knots'] };
  cards.cave = { value: 7, suits: ['waves', 'wyrms'] };
  cards.mill = { value: 8, suits: ['waves', 'leaves'] };
  cards.darkness = { value: 9, suits: ['waves', 'wyrms'] };
  cards.borderland = { value: 11, suits: ['waves', 'leaves', 'wyrms'] };
  cards.island = { value: 12, suits: ['suns', 'waves', 'wyrms'] };
  cards.window = { value: 12, suits: ['suns', 'leaves', 'knots'] };
  cards.sea = { value: 10, suits: ['waves'] };

  // The Origin marks the transition from the first half of the game to the
  // second.
  cards.origin = { value: 2, suits: ['waves', 'leaves'] };

  // The End marks the end of the game.
  cards.end = { value: 10, suits: ['leaves'] };

  return {
    attributes,
    personalities,
    events,
    locations,
    get,
  };
}());

const PRNG = (function prng() {
  const max = 2 ** 32;
  let state;

  function seed(value) {
    if (value !== undefined) {
      state = parseInt(value, 10);
    }

    if (isNaN(state)) {
      state = Math.floor(Math.random() * max);
    }

    return state;
  }

  function random() {
    state += (state * state) | 5;
    return (state >>> 32) / max;
  }

  function shuffle(array) {
    let i;
    let j;
    let temp;

    if (state === undefined) {
      seed();
    }

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(random() * (i + 1));
      temp = array[i];
      array[i] = array[j]; // eslint-disable-line no-param-reassign
      array[j] = temp; // eslint-disable-line no-param-reassign
    }
  }

  return {
    seed,
    random,
    shuffle,
  };
}());

const Personalities = (function personalities() {
  let cards = [];
  let discards = [];

  function deal() {
    const card = cards.pop();

    if (card) {
      discards.push(card);
    }

    return card;
  }

  function reset() {
    cards = Decktet.personalities();
    discards = [];
    PRNG.shuffle(cards);
  }

  return {
    deal,
    reset,
  };
}());

const Events = (function events() {
  let cards = [];
  let discards = [];

  function deal() {
    const card = cards.pop();

    if (card) {
      discards.push(card);
    }

    return card;
  }

  function reset() {
    cards = Decktet.events();
    discards = [];
    PRNG.shuffle(cards);
  }

  return {
    deal,
    reset,
  };
}());

const Locations = (function locations() {
  let cards = [];
  let discards = [];

  function deal() {
    const card = cards.pop();

    if (card) {
      discards.push(card);
    }

    return card;
  }

  function reset() {
    cards = Decktet.locations();
    discards = [];
    PRNG.shuffle(cards);
  }

  return {
    deal,
    reset,
  };
}());

const Deck = (function deck() {
  let cards = [];
  let discards = [];

  function shuffle() {
    cards = cards.concat(discards);
    discards = [];
    PRNG.shuffle(cards);
  }

  function deal() {
    let card = cards.pop();

    if (!card) {
      shuffle();
      card = cards.pop();
    }

    if (card) {
      discards.push(card);
    }

    return card;
  }

  function add(card) {
    if (card) {
      discards.push(card);
    }
  }

  function reset() {
    cards = ['excuse', 'sailor', 'soldier', 'diplomat'];
    discards = [];
    shuffle();
  }

  return {
    shuffle,
    deal,
    add,
    reset,
  };
}());

const Tokens = (function tokens() {
  const has = Object.prototype.hasOwnProperty;
  let counts = {};

  function count(name) {
    if (has.call(counts, name)) {
      return counts[name];
    }

    return 0;
  }

  function reset() {
    counts = {};

    Decktet.attributes().forEach((attribute) => {
      counts[attribute] = 6;
    });
  }

  return {
    count,
    reset,
  };
}());

const TDeck = (function () { // eslint-disable-line func-names
  function makeStartingHand() {
    const cards = [{
      name: 'the Excuse',
      value: 0,
    }, {
      name: 'the Sailor',
      value: 4,
      suit1: 'waves',
      suit2: 'leaves',
    }, {
      name: 'the Soldier',
      value: 5,
      suit1: 'wyrms',
      suit2: 'knots',
    }, {
      name: 'the Diplomat',
      value: 5,
      suit1: 'suns',
      suit2: 'moons',
    }];

    PRNG.shuffle(cards);
    return cards;
  }

  function makeAces() {
    const cards = [{
      name: 'Moons',
      value: 1,
      suit1: 'moons',
    }, {
      name: 'Suns',
      value: 1,
      suit1: 'suns',
    }, {
      name: 'Waves',
      value: 1,
      suit1: 'waves',
    }, {
      name: 'Leaves',
      value: 1,
      suit1: 'leaves',
    }, {
      name: 'Wyrms',
      value: 1,
      suit1: 'wyrms',
    }, {
      name: 'Knots',
      value: 1,
      suit1: 'knots',
    }];

    PRNG.shuffle(cards);
    return cards;
  }

  let hand = makeStartingHand();
  let aces = makeAces();
  let position = 0;
  const deck = {};

  deck.reset = function reset() {
    hand = makeStartingHand();
    aces = makeAces();
    position = 0;
  };

  deck.render = function render() {
  };

  deck.deal = function deal() {
    if (position > -1 && position < hand.length) {
      position += 1;
      return hand[position - 1];
    }

    const ace = aces.pop();
    if (ace) {
      hand.push(ace);
    }
    PRNG.shuffle(hand);

    position = 1;
    return Object.assign({}, hand[position - 1], { shuffled: true });
  };

  deck.add = function add(spell) {
    if (spell) {
      hand.unshift({
        name: spell.name,
        value: spell.value,
        suit1: spell.suit1,
        suit2: spell.suit2,
        suit3: spell.suit3,
      });
      position += 1;
    }
  };

  return deck;
}());

const Signpost = (function () { // eslint-disable-line func-names
  function makePersonalities() {
    const cards = [{
      name: 'the Author',
      value: 2,
      suit1: 'moons',
      suit2: 'knots',
    }, {
      name: 'the Painter',
      value: 3,
      suit1: 'suns',
      suit2: 'knots',
    }, {
      name: 'the Savage',
      value: 3,
      suit1: 'leaves',
      suit2: 'wyrms',
    }, {
      name: 'the Lunatic',
      value: 6,
      suit1: 'moons',
      suit2: 'waves',
    }, {
      name: 'the Penitent',
      value: 6,
      suit1: 'suns',
      suit2: 'wyrms',
    }, {
      name: 'the Merchant',
      value: 9,
      suit1: 'leaves',
      suit2: 'knots',
    }, {
      name: 'the Watchman',
      value: 11,
      suit1: 'moons',
      suit2: 'wyrms',
      suit3: 'knots',
    }, {
      name: 'the Light Keeper',
      value: 11,
      suit1: 'suns',
      suit2: 'waves',
      suit3: 'knots',
    }, {
      name: 'the Consul',
      value: 12,
      suit1: 'moons',
      suit2: 'waves',
      suit3: 'knots',
    }, {
      name: 'the Bard',
      value: 10,
      suit1: 'suns',
    }, {
      name: 'the Huntress',
      value: 10,
      suit1: 'moons',
    }];

    PRNG.shuffle(cards);
    return cards;
  }

  function makeEvents() {
    const cards = [{
      name: 'the Journey',
      value: 3,
      suit1: 'moons',
      suit2: 'waves',
    }, {
      name: 'Battle',
      value: 4,
      suit1: 'wyrms',
      suit2: 'knots',
    }, {
      name: 'Discovery',
      value: 5,
      suit1: 'suns',
      suit2: 'waves',
    }, {
      name: 'the Market',
      value: 6,
      suit1: 'leaves',
      suit2: 'knots',
    }, {
      name: 'the Chance Meeting',
      value: 7,
      suit1: 'moons',
      suit2: 'leaves',
    }, {
      name: 'Betrayal',
      value: 8,
      suit1: 'wyrms',
      suit2: 'knots',
    }, {
      name: 'the Pact',
      value: 9,
      suit1: 'moons',
      suit2: 'suns',
    }, {
      name: 'the Harvest',
      value: 11,
      suit1: 'moons',
      suit2: 'suns',
      suit3: 'leaves',
    }, {
      name: 'the Rite',
      value: 12,
      suit1: 'moons',
      suit2: 'leaves',
      suit3: 'wyrms',
    }, {
      name: 'Calamity',
      value: 10,
      suit1: 'wyrms',
    }, {
      name: 'Windfall',
      value: 10,
      suit1: 'knots',
    }];

    PRNG.shuffle(cards);
    return cards;
  }

  function makeLocations() {
    const cards = [{
      name: 'the Desert',
      value: 2,
      suit1: 'suns',
      suit2: 'wyrms',
    }, {
      name: 'the Mountain',
      value: 4,
      suit1: 'moons',
      suit2: 'suns',
    }, {
      name: 'the Forest',
      value: 5,
      suit1: 'moons',
      suit2: 'leaves',
    }, {
      name: 'the Castle',
      value: 7,
      suit1: 'suns',
      suit2: 'knots',
    }, {
      name: 'the Cave',
      value: 7,
      suit1: 'waves',
      suit2: 'wyrms',
    }, {
      name: 'the Mill',
      value: 8,
      suit1: 'waves',
      suit2: 'leaves',
    }, {
      name: 'the Darkness',
      value: 9,
      suit1: 'waves',
      suit2: 'wyrms',
    }, {
      name: 'the Borderland',
      value: 11,
      suit1: 'waves',
      suit2: 'leaves',
      suit3: 'wyrms',
    }, {
      name: 'the Island',
      value: 12,
      suit1: 'suns',
      suit2: 'waves',
      suit3: 'wyrms',
    }, {
      name: 'the Window',
      value: 12,
      suit1: 'suns',
      suit2: 'leaves',
      suit3: 'knots',
    }, {
      name: 'the Sea',
      value: 10,
      suit1: 'waves',
    }];

    PRNG.shuffle(cards);

    return [].concat([{
      name: 'the Origin',
      value: 2,
      suit1: 'waves',
      suit2: 'leaves',
    }], cards, [{
      name: 'the End',
      value: 10,
      suit1: 'knots',
    }]);
  }

  function makeSignHTML(sign) {
    let html = '';

    html += `<span class="name">${sign.name}</span>`;
    html += `<span class="value">${sign.value}</span>`;

    if (sign.suit1) {
      html += `<span class="gem ${sign.suit1}"></span>`;
    }

    if (sign.suit2) {
      html += `<span class="gem ${sign.suit2}"></span>`;
    }

    if (sign.suit3) {
      html += `<span class="gem ${sign.suit3}"></span>`;
    }

    return html;
  }

  const $ = window.jQuery;
  let dirty = 1;
  let personalities = makePersonalities();
  let personalitiesIndex = 0;
  let events = makeEvents();
  let eventsIndex = 0;
  let locations = makeLocations();
  let locationsIndex = 0;
  let selected;
  let selectedSign;
  let stage = 1;
  const signpost = {};

  signpost.reset = function reset() {
    personalities = makePersonalities();
    personalitiesIndex = 0;
    events = makeEvents();
    eventsIndex = 0;
    locations = makeLocations();
    locationsIndex = 0;
    selected = undefined;
    selectedSign = undefined;
    stage = 1;
    dirty = 1;
  };

  signpost.render = function render() {
    if (dirty & 1) {
      let sign1 = { name: '', value: '' };
      let sign2 = { name: '', value: '' };

      if (stage === 1) {
        sign1 = personalities[personalitiesIndex];
        sign2 = events[eventsIndex];
      }

      if (stage === 2) {
        sign1 = locations[locationsIndex];
      }

      $('#sign1').html(makeSignHTML(sign1));
      $('#sign2').html(makeSignHTML(sign2));
    }

    if (dirty & 2) {
      if (selected === 'sign1') {
        $('#sign2').html('');
      }
      if (selected === 'sign2') {
        $('#sign1').html('');
      }
    }

    dirty = 0;
  };

  signpost.select = function select(sign) {
    selected = sign;
    dirty |= 2;
  };

  signpost.active = function active() {
    if (selectedSign) {
      return selectedSign;
    }

    let sign;

    if (stage === 1) {
      if (selected === 'sign1') {
        sign = personalities[personalitiesIndex];
      }

      if (selected === 'sign2') {
        sign = events[eventsIndex];
      }
    }

    if (stage === 2) {
      sign = locations[locationsIndex];
    }

    if (sign) {
      selectedSign = Object.assign({}, sign, { points: sign.value });
    }

    return selectedSign;
  };

  signpost.cast = function cast(spell) {
    if (spell && this.active() && selectedSign.points > 0) {
      const suits = [selectedSign.suit1, selectedSign.suit2, selectedSign.suit3];

      if (spell.suit1 && suits.indexOf(spell.suit1) > -1) {
        selectedSign.points -= spell.value;
      }

      if (spell.suit2 && suits.indexOf(spell.suit2) > -1) {
        selectedSign.points -= spell.value;
      }

      if (spell.suit3 && suits.indexOf(spell.suit3) > -1) {
        selectedSign.points -= spell.value;
      }
    }

    if (this.active() && selectedSign.points <= 0) {
      TDeck.add(selectedSign);

      selected = undefined;
      selectedSign = undefined;

      if (stage === 1) {
        personalitiesIndex += 1;
        eventsIndex += 1;
      }

      if (stage === 2) {
        locationsIndex += 1;
      }

      dirty |= 1;
    }
  };

  return signpost;
}());

const Spells = (function () { // eslint-disable-line func-names
  const $ = window.jQuery;
  let dirty = 0;
  let casted = [];
  const spells = {};

  spells.reset = function reset() {
    casted = [];
    dirty |= 1;
  };

  spells.render = function render() {
    if (dirty & 1) {
      let html = '';
      const visible = casted.slice(-10);

      for (const spell of visible) { // eslint-disable-line no-restricted-syntax
        html += '<p class="spell">';
        html += `<span class="name">${spell.name}</span>`;
        html += `<span class="power">${spell.value}</span>`;
        if (spell.suit1) {
          html += `<span class="gem ${spell.suit1}"></span>`;
        }
        if (spell.suit2) {
          html += `<span class="gem ${spell.suit2}"></span>`;
        }
        if (spell.suit3) {
          html += `<span class="gem ${spell.suit3}"></span>`;
        }
        html += '</p>';
      }

      $('#spells').html(html);
    }

    dirty = 0;
  };

  spells.cast = function cast(spell) {
    if (spell) {
      Signpost.cast(spell);
      if (spell.shuffled) {
        casted = [];
      }
      casted.push(spell);
      dirty |= 1;
    }
  };

  return spells;
}());

const Gems = (function () { // eslint-disable-line func-names
  const $ = window.jQuery;
  let dirty = 1;
  let moons = 6;
  let suns = 6;
  let waves = 6;
  let leaves = 6;
  let wyrms = 6;
  let knots = 6;
  const gems = {};

  gems.reset = function reset() {
    moons = 6;
    suns = 6;
    waves = 6;
    leaves = 6;
    wyrms = 6;
    knots = 6;

    dirty |= 1;
  };

  gems.render = function render() {
    if (dirty & 1) {
      $('#moons').html(moons);
      $('#suns').html(suns);
      $('#waves').html(waves);
      $('#leaves').html(leaves);
      $('#wyrms').html(wyrms);
      $('#knots').html(knots);
    }

    dirty = 0;
  };

  gems.spend = function spend(suit) {
    let spent = false;

    if (!Signpost.active()) {
      return spent;
    }

    switch (suit) {
      case 'moons':
        if (moons > 0) {
          spent = true;
          moons -= 1;
          dirty |= 1;
        }
        break;
      case 'suns':
        if (suns > 0) {
          spent = true;
          suns -= 1;
          dirty |= 1;
        }
        break;
      case 'waves':
        if (waves > 0) {
          spent = true;
          waves -= 1;
          dirty |= 1;
        }
        break;
      case 'leaves':
        if (leaves > 0) {
          spent = true;
          leaves -= 1;
          dirty |= 1;
        }
        break;
      case 'wyrms':
        if (wyrms > 0) {
          spent = true;
          wyrms -= 1;
          dirty |= 1;
        }
        break;
      case 'knots':
        if (knots > 0) {
          spent = true;
          knots -= 1;
          dirty |= 1;
        }
        break;
      default:
        break;
    }

    if (spent) {
      Signpost.cast({ value: 1, suit1: suit });
    }

    return spent;
  };

  return gems;
}());

(function (TGame) { // eslint-disable-line func-names
  let color;

  function offGem(element) {
    const type = element.unwrap().id;

    if (Gems.spend(type)) {
      Spells.cast(TDeck.deal());
    }
  }

  function offSign(element) {
    const type = element.unwrap().id;
    Signpost.select(type);
    Spells.cast(TDeck.deal());
  }

  function render() {
    requestAnimationFrame(render);

    TDeck.render();
    Signpost.render();
    Spells.render();
    Gems.render();
  }

  function newColor() {
    let hash = color;

    do {
      hash = Math.floor(Math.random() * 16777216);
      hash = (`000000${hash.toString(16)}`).substr(-6);
    } while (hash === color);

    color = hash;
  }

  function resetGame() {
    TDeck.reset();
    Signpost.reset();
    Spells.reset();
    Gems.reset();
  }

  function onHashChange() {
    const hash = window.location.hash.substring(1);

    if (/^[0-9A-F]{6}$/i.test(hash)) {
      color = hash;
      PRNG.seed(parseInt(color, 16));
    }

    resetGame();
  }

  function startGame(callback) {
    const hash = window.location.hash.substring(1);
    let reloaded = true;

    if (/^[0-9A-F]{6}$/i.test(hash)) {
      if (color === hash) {
        reloaded = true;
      } else {
        color = hash;
        PRNG.seed(parseInt(color, 16));
      }
    } else {
      newColor();
      PRNG.seed(parseInt(color, 16));
    }

    if (window.location.hash.substring(1) !== color) {
      window.location.hash = color;
    } else if (reloaded) {
      resetGame();
    }

    requestAnimationFrame(callback);
  }

  TGame.play = function play() { // eslint-disable-line no-param-reassign
    const $ = window.jQuery;

    $('#moons').touch(undefined, offGem);
    $('#suns').touch(undefined, offGem);
    $('#waves').touch(undefined, offGem);
    $('#leaves').touch(undefined, offGem);
    $('#wyrms').touch(undefined, offGem);
    $('#knots').touch(undefined, offGem);

    $('#sign1').touch(undefined, offSign);
    $('#sign2').touch(undefined, offSign);

    $(window).on('hashchange', onHashChange);

    startGame(render);
  };
}(window.TGame = window.TGame || {}));

window.TGame.play();
