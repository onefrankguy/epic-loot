// **Darcy's Dungeon** is a role-playing game at heart. Like every good RPG,
// it's all about you. So before we even get to the dungeon crawling, let's talk
// about you. Who are you, and why are you wondering through this forest?
const Character = (function character() {
  const has = Object.prototype.hasOwnProperty;
  const roles = {};
  let hero = 'author';
  // Oh, I see. You're a hero and an author. But maybe not all the time? If
  // you where a full time author, you'd be a `const hero`, and you're not. So
  // you must be one of these other things.

  // The Penitent is a cleric .
  roles.penitent = { str: 4, bdy: 4, dex: 6, int: 8, wil: 8, chr: 6 };
  // The Soldier is a figher .
  roles.soldier = { str: 8, bdy: 6, dex: 4, int: 6, wil: 6, chr: 6 };
  // The Sailor is a rogue .
  roles.sailor = { str: 6, bdy: 8, dex: 8, int: 6, wil: 4, chr: 4 };
  // The Painter is a wizard .
  roles.painter = { str: 6, bdy: 4, dex: 6, int: 8, wil: 8, chr: 4 };
  // The Savage is a barbarian .
  roles.savage = { str: 8, bdy: 8, dex: 4, int: 6, wil: 4, chr: 6 };
  // THe Lunatic is a druid .
  roles.lunatic = { str: 4, bdy: 1, dex: 4, int: 9, wil: 9, chr: 9 };
  // The Author is a monk.
  roles.author = { str: 4, bdy: 9, dex: 8, int: 5, wil: 9, chr: 1 };
  // The Watchman is a paladin.
  roles.watchman = { str: 6, bdy: 6, dex: 4, int: 4, wil: 8, chr: 8 };
  // The Hunter is a ranger.
  roles.hunter = { str: 6, bdy: 6, dex: 8, int: 6, wil: 6, chr: 4 };
  // The Merchant is a sorcerer.
  roles.merchant = { str: 4, bdy: 2, dex: 5, int: 9, wil: 8, chr: 8 };
  // The Bard is a bard.
  roles.bard = { str: 5, bdy: 4, dex: 6, int: 8, wil: 5, chr: 8 };

  // So you can be anything you want to be. Except maybe a townsperson.
  // Townsperson does not appear to be a class in this RPG, or most any RPG for
  // that matter.
  //
  // Looks like the dungeon has a way to figure out how strong and smart and
  // clever you are. I have a sneaking suspicion you'll need to be very strong
  // and smart and clever to defeat this dungeon.
  function get() {
    if (has.call(roles, hero)) {
      return Object.assign({ role: hero }, roles[hero]);
    }

    return hero;
  }

  // Here's how you change what you are. It's cyclic. If you go forward, you
  // stop being an Author and start being a Watchman. If you go
  // backward, you become a Lunatic. Hmm... Probably best not to go
  // backward.
  function next() {
    const keys = Object.keys(roles);
    let index = keys.indexOf(hero);
    if (index > -1) {
      index = (index + 1) % keys.length;
      hero = keys[index];
    } else {
      hero = 'author';
    }
  }

  function prev() {
    const keys = Object.keys(roles);
    let index = keys.indexOf(hero);
    if (index > -1) {
      if (index - 1 < 0) {
        index = keys.length;
      }
      hero = keys[index - 1];
    } else {
      hero = 'author';
    }
  }


  // And if you ever get tired of what you are, you can go back to being
  // yourself, a heroic author. Though personally, I think you aught to try
  // being a Bard. That role was the only one that wasn't also a something else.
  function reset() {
    hero = 'author';
  }

  return {
    get,
    next,
    prev,
    reset,
  };
}());

// Are we dungeon crawling yet? No! Because before you can crawl into a dungeon,
// you have to find a dungeon to crawl into, and findng a dungeon is not an easy
// thing. After all, if it was easy, they wouldn't need a hero to do it.
//
// **Darcey's Dungeon** is a game about finding a dungeon, and the way you do
// that is through deck-building. The deck you use is a [Decktet][], which is
// usually described as
//
// > It is the kind of tarot deck they use in the alternate universe where Charlemange was a badger, if you can imagine such a thing.
//
// [Decktet]: http://www.decktet.com/ "P.D. Magnus: The Decktet"
const Decktet = (function decktet() {
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
  let defaults = {};

  function get() {
    return counts;
  }

  function reset() {
    counts = Object.assign({}, defaults);
  }

  function set(values) {
    defaults = {};

    Decktet.attributes().forEach((attribute) => {
      if (has.call(values, attribute)) {
        defaults[attribute] = Math.abs(parseInt(values[attribute], 10));
      } else {
        defaults[attribute] = 6;
      }
    });

    reset();
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

  return {
    get,
    set,
    count,
    spend,
    reset,
  };
}());

const Game = (function game() {
  let color;
  let picked;
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

      const card = Deck.deal();
      Obstacles.use(card);
      played.push(card);

      dirty = true;
    }
  }

  function onSign(element) {
    const sign = element.unwrap().id;

    if (Obstacles.defeated() && sign === picked) {
      if (Deck.size() < 22) {
        Deck.add(Obstacles.get()[0].name);
      }
      Obstacles.deal();
      played = [];
      dirty = true;
      return;
    }

    if (Obstacles.get().length >= 2) {
      let type = sign;
      picked = sign;
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

  function onRolePrev() {
    Character.prev();
    dirty = true;
  }

  function onRoleNext() {
    Character.next();
    dirty = true;
  }

  function onStart() {
    const $ = window.jQuery;
    $('#character').add('hidden');
    $('#world').remove('hidden');

    const hero = Character.get();

    Tokens.set({
      suns: hero.str,
      leaves: hero.bdy,
      waves: hero.dex,
      knots: hero.int,
      moons: hero.wil,
      wyrms: hero.chr,
    });

    dirty = true;
  }

  function renderRole() {
    const $ = window.jQuery;
    const hero = Character.get();
    $('#role').html(hero.role);

    ['str', 'bdy', 'dex', 'int', 'wil', 'chr'].forEach((attr) => {
      const html = `<span class="${attr} stat">${hero[attr]}</span>`;
      $(`#${attr}`).html(html.trim());
    });
  }

  function renderCard(card, gem) {
    let html = '';

    if (card) {
      html += `<span class="name">${card.name}</span>`;
      html += `<span class="value">${card.value}</span>`;
      if (gem) {
        html += '<div class="gems">';
      }
      card.suits.forEach((suit) => {
        html += `<span class="${suit} gem"></span>`;
      });
      if (gem) {
        html += '</div>';
      }
    }

    return html;
  }

  function renderDeck() {
    const $ = window.jQuery;
    let html = '';

    played.slice(-11).forEach((name) => {
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

    let title = '';
    let id0 = '#sign1';
    let id1 = '#sign2';
    if (obstacles.length < 2) {
      title = obstacles[0].name;
      if (picked === 'sign2') {
        id0 = '#sign2';
        id1 = '#sign1';
      }
    }

    $(id0).html(renderCard(obstacles[0], true));
    $(id1).html(renderCard(obstacles[1], true));
    $('#flavor-title').html(title);
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
      renderRole();
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

    $('#start').touch(undefined, onStart);

    $('#role-prev').touch(undefined, onRolePrev);
    $('#role-next').touch(undefined, onRoleNext);

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

  Fn.prototype.add = function add(klass) {
    if (this.element) {
      this.element.classList.add(klass);
    }

    return this;
  };

  Fn.prototype.remove = function remove(klass) {
    if (this.element) {
      this.element.classList.remove(klass);
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

// Design & dev by Frank Mitchell for [Js13kGames 2017][js13k].
// **Darcy's Dungeon** is based on [_Tinker, Sailor, Soldier, Spy_][tsss], by
// Mike Richey.
//
// [js13k]: http://2017.js13kgames.com/ "Andrzej (js13kGames): HTML5 and JavaScript Game Development Competition in just 13 kilobytes"
// [tsss]: http://wiki.decktet.com/game:tinker-sailor-soldier-spy "Mike Richey (The Decktet Wiki): Tinker, Sailor, Soldier, Spy"
