// **GAME** is based on [_Tinker, Sailor, Soldier, Spy_][tsss], a deck-building
// game by Mike Richey for the [Decktet][].
//
// [tsss]: http://wiki.decktet.com/game:tinker-sailor-soldier-spy "Mike Richey (The Decktet Wiki) "Tinker, Sailor, Soldier, Spy"
// [Decktet]: http://www.decktet.com/ "P.D. Magnus: The Decktet"
const Decktet = (function Decktet() {
  const has = Object.prototype.hasOwnProperty;
  const cards = {};

  function get(name) {
    if (has.call(cards, name)) {
      return Object.assign({ name }, cards[name]);
    }

    return undefined;
  }

  // **GAME** is a RPG at heart.
  function attributes() {
    return [
      'suns', 'leaves', 'waves', 'knots', 'moons', 'wyrms',
    ];
  }

  // The suit of Suns (ᛒ) is strength.
  cards.suns = { value: 1, suits: ['suns'] };

  // The suit of Leaves (ᚦ) is body.
  cards.leaves = { value: 1, suits: ['leaves'] };

  // The suit of Waves (ᚲ) is quickness.
  cards.waves = { value: 1, suits: ['waves'] };

  // The suit of Knots (ᚠ) is intelligence.
  cards.knots = { value: 1, suits: ['knots'] };

  // The suit of Moons (ᚷ) is willpower.
  cards.moons = { value: 1, suits: ['moons'] };

  // The suit of Wyrms (ᛆ) is charisma.
  cards.wyrms = { value: 1, suits: ['wyrms'] };

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

const Blighted = (function blighted() {
  let cards = [];

  function deal() {
    return cards.pop();
  }

  function add(card) {
    cards.push(card);
    PRNG.shuffle(cards);
  }

  function reset() {
    cards = [];
  }

  return {
    deal,
    add,
    reset,
  };
}());

const Obstacles = (function obstacles() {
  let phase = 1;
  let active = [];
  let challenger;

  function get() {
    if (challenger) {
      return [challenger];
    }

    return active.map(name => Decktet.get(name));
  }

  function deal() {
    active = [];
    challenger = undefined;

    if (phase === 1) {
      const per = Personalities.deal();
      const evt = Events.deal();
      if (per && evt) {
        active = [per, evt];
      } else {
        phase = 2;
      }
    }

    if (phase === 2) {
      const loc = Locations.deal();
      const blt = Blighted.deal();
      if (loc && blt) {
        active = [loc, blt];
      }
    }

    PRNG.shuffle(active);
  }

  function pick(name) {
    if (challenger) {
      return;
    }

    const index = active.indexOf(name);
    if (index > -1) {
      const selected = active.splice(index, 1);
      active.forEach(card => Blighted.add(card));
      active = selected;
      challenger = Decktet.get(name);
    }
  }

  function use(name) {
    if (!challenger) {
      return;
    }

    const card = Decktet.get(name);
    if (!card) {
      return;
    }

    let match = false;
    card.suits.forEach((suit) => {
      if (challenger.suits.indexOf(suit) > -1) {
        match = true;
      }
    });

    if (match) {
      challenger.value -= card.value;
      if (challenger.value < 0) {
        challenger.value = 0;
      }
    }
  }

  function defeated() {
    return challenger && challenger.value <= 0;
  }

  function reset() {
    Personalities.reset();
    Events.reset();
    Locations.reset();
    Blighted.reset();

    phase = 1;
    deal();
  }

  return {
    get,
    deal,
    pick,
    use,
    defeated,
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

  function size() {
    return cards.length + discards.length;
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
    size,
    reset,
  };
}());

const Tokens = (function tokens() {
  const has = Object.prototype.hasOwnProperty;
  let counts = {};

  function get() {
    return counts;
  }

  function count(name) {
    if (has.call(counts, name)) {
      return counts[name];
    }

    return 0;
  }

  function spend(name) {
    if (has.call(counts, name) && counts[name] > 0) {
      counts[name] -= 1;
    }
  }

  function reset() {
    counts = {};

    Decktet.attributes().forEach((attribute) => {
      counts[attribute] = 6;
    });
  }

  return {
    get,
    count,
    spend,
    reset,
  };
}());

const Game = (function game() {
  let color;
  let played = [];
  let dirty = true;

  function onToken(element) {
    if (Obstacles.defeated()) {
      return;
    }

    const type = element.unwrap().id;

    if (Obstacles.get().length === 1 && Tokens.count(type) > 0) {
      Tokens.spend(type);
      Obstacles.use(type);
      played.push(type);

      if (!Obstacles.defeated()) {
        const card = Deck.deal();
        Obstacles.use(card);
        played.push(card);
      }

      dirty = true;
    }
  }

  function onSign(element) {
    if (Obstacles.defeated()) {
      if (Deck.size() < 22) {
        Deck.add(Obstacles.get()[0].name);
      }
      Obstacles.deal();
      played = [];
      dirty = true;
      return;
    }

    if (Obstacles.get().length >= 2) {
      let type = element.unwrap().id;
      if (type === 'sign1') {
        type = Obstacles.get()[0].name;
      }
      if (type === 'sign2') {
        type = Obstacles.get()[1].name;
      }
      Obstacles.pick(type);

      const card = Deck.deal();
      Obstacles.use(card);
      played.push(card);
      dirty = true;
    }
  }

  function renderCard(card) {
    let html = '';

    if (card) {
      html += `<span>${card.name}</span>`;
      html += `<span>${card.value}</span>`;
      card.suits.forEach((suit) => {
        html += `<span class="${suit} gem"></span>`;
      });
    }

    return html;
  }

  function renderDeck() {
    const $ = window.jQuery;
    let html = '';

    played.forEach((name) => {
      const card = Decktet.get(name);
      if (card) {
        html += '<p class="spell">';
        html += renderCard(card);
        html += '</p>';
      }
    });

    $('#spells').html(html);
  }

  function renderObstacles() {
    const $ = window.jQuery;
    const obstacles = Obstacles.get();
    $('#sign1').html(renderCard(obstacles[0]));
    $('#sign2').html(renderCard(obstacles[1]));
  }

  function renderTokens() {
    const $ = window.jQuery;
    const tokens = Tokens.get();

    Object.keys(tokens).forEach((type) => {
      $(`#${type}`).html(tokens[type]);
    });
  }

  function render() {
    if (dirty) {
      renderDeck();
      renderObstacles();
      renderTokens();
      dirty = false;
    }

    requestAnimationFrame(render);
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
    Obstacles.reset();
    Deck.reset();
    Tokens.reset();
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

  function play() {
    const $ = window.jQuery;

    $('#moons').touch(undefined, onToken);
    $('#suns').touch(undefined, onToken);
    $('#waves').touch(undefined, onToken);
    $('#leaves').touch(undefined, onToken);
    $('#wyrms').touch(undefined, onToken);
    $('#knots').touch(undefined, onToken);

    $('#sign1').touch(undefined, onSign);
    $('#sign2').touch(undefined, onSign);

    $(window).on('hashchange', onHashChange);

    startGame(render);
  }

  return {
    play,
  };
}());

(function $() {
  function Fn(selector) {
    if (selector instanceof Fn) {
      return selector;
    }

    this.element = selector;

    if (typeof selector === 'string') {
      if (selector.indexOf('#') === 0) {
        this.element = document.getElementById(selector.slice(1));
      }
    }

    return this;
  }

  Fn.prototype.html = function html(value) {
    if (this.element) {
      if (value === undefined) {
        return this.element.innerHTML;
      }

      this.element.innerHTML = value;
    }

    return this;
  };

  Fn.prototype.on = function on(message, callback) {
    if (this.element) {
      this.element.addEventListener(message, callback, false);
    }

    return this;
  };

  Fn.prototype.touch = function touch(start, end) {
    const self = this;

    if (this.element) {
      if ('ontouchstart' in document.documentElement === false) {
        this.element.onmousedown = function onmousedown(mouseDownEvent) {
          if (start) {
            start(self, mouseDownEvent);
          }
          document.onmousemove = function onmousemove(e) {
            e.preventDefault();
          };
          document.onmouseup = function onmouseup(e) {
            if (end) {
              end(self, e);
            }
            document.onmousemove = undefined;
            document.onmouseup = undefined;
          };
        };
      } else {
        this.element.ontouchstart = function ontouchstart(touchStartEvent) {
          if (start) {
            start(self, touchStartEvent);
          }
          document.ontouchmove = function ontouchmove(e) {
            e.preventDefault();
          };
          document.ontouchend = function ontouchend(e) {
            if (end) {
              end(self, e);
            }
            document.ontouchmove = undefined;
            document.ontouchend = undefined;
          };
        };
      }
    }

    return this;
  };

  Fn.prototype.unwrap = function unwrap() {
    return this.element;
  };

  function root(selector) {
    return new Fn(selector);
  }

  window.jQuery = root;
}());

Game.play();
