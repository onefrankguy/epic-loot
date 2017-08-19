const PRNG = (function () { // eslint-disable-line func-names
  const rng = {};
  const max = 2 ** 32;
  let state;

  rng.seed = function seed(value) {
    if (value !== undefined) {
      state = parseInt(value, 10);
    }

    if (isNaN(state)) {
      state = Math.floor(Math.random() * max);
    }

    return state;
  };

  rng.random = function random() {
    state += (state * state) | 5;
    return (state >>> 32) / max;
  };

  rng.shuffle = function shuffle(array) {
    let i = 0;
    let j = 0;
    let temp;

    if (state === undefined) {
      this.seed();
    }

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(this.random() * (i + 1));
      temp = array[i];
      array[i] = array[j]; // eslint-disable-line no-param-reassign
      array[j] = temp; // eslint-disable-line no-param-reassign
    }
  };

  return rng;
}());

const Deck = (function () { // eslint-disable-line func-names
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
      Deck.add(selectedSign);

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

(function (Game) { // eslint-disable-line func-names
  let color;

  function offGem(element) {
    const type = element.unwrap().id;

    if (Gems.spend(type)) {
      Spells.cast(Deck.deal());
    }
  }

  function offSign(element) {
    const type = element.unwrap().id;
    Signpost.select(type);
    Spells.cast(Deck.deal());
  }

  function render() {
    requestAnimationFrame(render);

    Deck.render();
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
    Deck.reset();
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

  Game.play = function play() { // eslint-disable-line no-param-reassign
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
}(window.Game = window.Game || {}));

window.Game.play();
