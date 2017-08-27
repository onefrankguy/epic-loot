// **Darcy's Dungeon** is a role-playing game at heart. Like every good RPG,
// it's all about you. So before we even get to the dungeon crawling, let's talk
// about you. Who are you, and why are you wondering through this forest?
const Character = (function character() {
  let hero = 'painter';

  // Oh, I see. You're a hero and an painter. But maybe not all the time? If
  // you where a full time painter, you'd be a `const hero`, and you're not. So
  // you must be one of these other things.
  const roles = [
    // The Light Keeper is a rogue .
    'light keeper',
    // THe Lunatic is a druid .
    'lunatic',
    // The Painter is a wizard .
    'painter',
    // The Watchman is a paladin.
    'watchman',
    // The Savage is a barbarian .
    'savage',
    // The Huntress is a ranger.
    'huntress',
    // The Merchant is a sorcerer.
    'merchant',
    // The Bard is a bard.
    'bard',
  ];

  // So you can be anything you want to be. Except maybe a townsperson.
  // Townsperson does not appear to be a class in this RPG, or most any RPG for
  // that matter.
  function get() {
    return { role: hero };
  }

  // Here's how you change what you are. It's cyclic. If you go forward, you
  // stop being a Painter and start being a Watchman. If you go
  // backward, you become a Lunatic. Hmm... Probably best not to go
  // backward.
  function next() {
    let index = roles.indexOf(hero);
    if (index > -1) {
      index = (index + 1) % roles.length;
      hero = roles[index];
    } else {
      hero = 'painter';
    }
  }

  function prev() {
    let index = roles.indexOf(hero);
    if (index > -1) {
      if (index - 1 < 0) {
        index = roles.length;
      }
      hero = roles[index - 1];
    } else {
      hero = 'painter';
    }
  }


  // And if you ever get tired of what you are, you can go back to being
  // yourself, a heroic painter. Though personally, I think you aught to try
  // being a Bard. That role was the only one that wasn't also a something else.
  function reset() {
    hero = 'painter';
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
      return Object.assign({ name, title: name, text: '' }, cards[name]);
    }

    return undefined;
  }

  // **GAME** is a RPG at heart.
  function attributes() {
    return [
      'suns', 'leaves', 'waves', 'knots', 'moons', 'wyrms',
    ];
  }

  // The suit of Suns is strength.
  cards.suns = { value: 1, suits: ['suns'], title: 'str' };

  // The suit of Leaves is body.
  cards.leaves = { value: 1, suits: ['leaves'], title: 'bdy' };

  // The suit of Waves is dexterity.
  cards.waves = { value: 1, suits: ['waves'], title: 'dex' };

  // The suit of Knots is intellect.
  cards.knots = { value: 1, suits: ['knots'], title: 'int' };

  // The suit of Moons is will.
  cards.moons = { value: 1, suits: ['moons'], title: 'wil' };

  // The suit of Wyrms is charm.
  cards.wyrms = { value: 1, suits: ['wyrms'], title: 'chr' };

  // You start the game with four personalities, the Excuse, the Sailor,
  // the Soldier, and the Diplomat. This gives you one of each suit.
  cards.excuse = { value: 0, suits: [] };
  cards.sailor = { value: 4, suits: ['waves', 'leaves'], title: 'dex / bdy' };
  cards.soldier = { value: 5, suits: ['wyrms', 'knots'], title: 'chr / int' };
  cards.diplomat = { value: 8, suits: ['moons', 'suns'], title: 'wil / str' };

  // You encounter the remaining eleven personalities during your journey.
  // Successfully persuading a personality to join your quest adds it to your
  // hand.
  function personalities() {
    return [
      'author', 'painter', 'savage', 'lunatic', 'penitent', 'merchant',
      'watchman', 'light keeper', 'consul', 'bard', 'huntress',
    ];
  }

  cards.author = { value: 2, suits: ['moons', 'knots'], title: 'rat' };
  cards.painter = { value: 3, suits: ['suns', 'knots'], title: 'spiders' };
  cards.savage = { value: 3, suits: ['leaves', 'wyrms'], title: 'spiders' };
  cards.lunatic = { value: 6, suits: ['moons', 'waves'], title: 'rabbit' };
  cards.penitent = { value: 6, suits: ['suns', 'wyrms'], title: 'rabbit' };
  cards.merchant = { value: 9, suits: ['leaves', 'knots'], title: 'snake' };
  cards.watchman = { value: 10, suits: ['moons', 'wyrms', 'knots'], title: 'wolf' };
  cards['light keeper'] = { value: 10, suits: ['suns', 'waves', 'knots'], title: 'wolf' };
  cards.consul = { value: 11, suits: ['moons', 'waves', 'knots'], title: 'boar' };
  cards.bard = { value: 12, suits: ['suns'], title: 'bear' };
  cards.huntress = { value: 12, suits: ['moons'], title: 'bear' };

  // If you don't persuade the personality you encouter...
  function events() {
    return [
      'journey', 'battle', 'discovery', 'market', 'chance meeting', 'betrayal',
      'pact', 'harvest', 'rite', 'calamity', 'windfall',
    ];
  }

  cards.journey = { value: 3, suits: ['moons', 'waves'], title: 'spiders' };
  cards.battle = { value: 4, suits: ['wyrms', 'knots'], title: 'lizard' };
  cards.discovery = { value: 5, suits: ['suns', 'waves'], title: 'arachnid' };
  cards.market = { value: 6, suits: ['leaves', 'knots'], title: 'rabbit' };
  cards['chance meeting'] = { value: 7, suits: ['moons', 'leaves'], title: 'mushrooms' };
  cards.betrayal = { value: 8, suits: ['wyrms', 'knots'], title: 'bat' };
  cards.pact = { value: 9, suits: ['moons', 'suns'], title: 'snake' };
  cards.harvest = { value: 10, suits: ['moons', 'suns', 'leaves'], title: 'wolf' };
  cards.rite = { value: 11, suits: ['moons', 'leaves', 'wyrms'], title: 'boar' };
  cards.calamity = { value: 12, suits: ['wyrms'], title: 'bear' };
  cards.windfall = { value: 12, suits: ['knots'], title: 'bear' };

  // Any personality you choose not to persuade or event you choose not to
  // assist is consumed by the ???. It mixes with the locations to become an
  // obstacle you must face in the second half of the game.
  function locations() {
    return [
      'desert', 'mountain', 'forest', 'castle', 'cave', 'mill', 'darkness',
      'borderland', 'island', 'window', 'sea', 'origin', 'end',
    ];
  }

  cards.desert = { value: 2, suits: ['suns', 'wyrms'] };
  cards.mountain = { value: 4, suits: ['moons', 'suns'] };
  cards.forest = { value: 5, suits: ['moons', 'leaves'] };
  cards.castle = { value: 7, suits: ['suns', 'knots'] };
  cards.cave = { value: 7, suits: ['waves', 'wyrms'] };
  cards.mill = { value: 8, suits: ['waves', 'leaves'] };
  cards.darkness = { value: 9, suits: ['waves', 'wyrms'] };
  cards.borderland = { value: 10, suits: ['waves', 'leaves', 'wyrms'] };
  cards.island = { value: 11, suits: ['suns', 'waves', 'wyrms'] };
  cards.window = { value: 11, suits: ['suns', 'leaves', 'knots'] };
  cards.sea = { value: 12, suits: ['waves'] };

  // The Origin marks the transition from the first half of the game to the
  // second.
  cards.origin = { value: 2, suits: ['waves', 'leaves'] };

  // The End marks the end of the game.
  cards.end = { value: 12, suits: ['leaves'] };

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

  function size() {
    return cards.length;
  }

  function reset() {
    cards = Decktet.personalities();
    discards = [];
    PRNG.shuffle(cards);
  }

  function remove(name) {
    let index = cards.indexOf(name);
    if (index > -1) {
      cards.splice(index, 1);
    }

    index = discards.indexOf(name);
    if (index > -1) {
      discards.splice(index, 1);
    }
  }

  return {
    deal,
    size,
    reset,
    remove,
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

  function size() {
    return cards.length;
  }

  function reset() {
    let index = -1;

    cards = Decktet.locations();
    discards = [];

    index = cards.indexOf('origin');
    if (index > -1) {
      cards.splice(index, 1);
    }

    index = cards.indexOf('end');
    if (index > -1) {
      cards.splice(index, 1);
    }

    PRNG.shuffle(cards);
    cards.push('origin');
    cards.unshift('end');
  }

  return {
    deal,
    size,
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
      if (loc) {
        active = [loc, loc];
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
      active = active.splice(index, 1);
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

  function remaining() {
    const last = active.length > 0 ? 1 : 0;
    if (phase === 1) {
      return Personalities.size() + Locations.size() + last;
    }
    if (phase === 2) {
      return Locations.size() + last;
    }
    return last;
  }

  function stage() {
    return phase;
  }

  function reset() {
    Personalities.reset();
    Events.reset();
    Locations.reset();

    phase = 1;
  }

  return {
    get,
    deal,
    pick,
    use,
    defeated,
    remaining,
    stage,
    reset,
  };
}());

const Deck = (function deck() {
  let cards = [];
  let discards = [];
  let hand = [];

  function get() {
    const attributes = [];

    cards.forEach((card) => {
      if (Decktet.attributes().indexOf(card) > -1) {
        attributes.push(card);
      }
    });

    discards.forEach((card) => {
      if (Decktet.attributes().indexOf(card) > -1) {
        attributes.push(card);
      }
    });

    return { cards: cards.length, discards: discards.length, attributes };
  }

  function empty() {
    return cards.length <= 0;
  }

  function shuffle() {
    cards = [].concat(cards, discards, hand);
    discards = [];
    hand = [];
    PRNG.shuffle(cards);
  }

  function deal() {
    const card = cards.pop();

    if (card) {
      discards.push(card);
    }

    return card;
  }

  function add(card) {
    if (card && Decktet.locations().indexOf(card) < 0) {
      hand.push(card);
    }
  }

  function reset() {
    cards = ['sailor', 'soldier', 'diplomat'];
    discards = [];
    hand = [];
  }

  return {
    get,
    empty,
    shuffle,
    deal,
    add,
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
        defaults[attribute] = 9;
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

  function size() {
    return Object.values(counts).reduce((total, num) => total + num, 0);
  }

  return {
    get,
    set,
    count,
    spend,
    reset,
    size,
  };
}());

const Renderer = (function renderer() {
  let playedCards = [];
  let playedTokens = [];
  let dirty = true;

  function renderRole() {
    const $ = window.jQuery;
    const hero = Character.get();
    const card = Decktet.get(hero.role);
    $('#role').html(hero.role);

    const attributes = Deck.get().attributes;

    Decktet.attributes().forEach((attr) => {
      let html = '';
      let value = 1 + attributes.filter(name => name === attr).length;
      if (card.suits.indexOf(attr) > -1) {
        value += 1;
      }
      html += `<span class="stat">${value}`;
      html += `<span class="${attr} gem"></span>`;
      html += '</span>';
      $(`#starting-${attr}`).html(html.trim());
      $(`#in-game-${attr}`).html(html.trim());
    });

    $('#starting-portrait').klass(`pixelated portrait ${hero.role}`);
    $('#in-game-portrait').klass(`pixelated portrait ${hero.role}`);
  }

  function renderExperience() {
    const $ = window.jQuery;
    const deck = Deck.get();
    const points = deck.discards;
    const needed = deck.discards + deck.cards;

    if (Obstacles.stage() === 1) {
      $('#world').add('day');
      $('#world').remove('night');
    } else {
      $('#world').add('night');
      $('#world').remove('day');
    }

    $('#xp-points').html(points);
    $('#xp-needed').html(needed);
    $('#this-level').html(deck.attributes.length + 1);
    $('#next-level').html(deck.attributes.length + 2);
    $('#xp-progress').style('width', `${(points * 100) / needed}%`);

    if (Deck.empty()) {
      $('#collection').add('hidden');
      $('#signpost').add('hidden');
      $('#level-up').remove('hidden');
    } else {
      $('#collection').remove('hidden');
      $('#signpost').remove('hidden');
      $('#level-up').add('hidden');
    }
  }

  function renderCard(card, isDeck) {
    let html = '';

    if (card) {
      html += `<span class="value">${card.value}</span>`;
      html += `<span class="name">${card.name}</span>`;
      html += '<div class="gems">';
      if (isDeck) {
        for (let i = card.suits.length; i < 3; i += 1) {
          html += '<span class="invisible gem"></span>';
        }
      }
      card.suits.forEach((suit) => {
        html += `<span class="${suit} gem"></span>`;
      });
      html += '</div>';
    }

    return html;
  }

  function renderDeck() {
    const $ = window.jQuery;
    let html = '';
    playedTokens.forEach((type) => {
      html += '<span class="box">';
      html += `<span class="${type} gem"></span>`;
      html += '</span>';
    });
    for (let i = playedTokens.length; i < 9; i += 1) {
      html += '<span class="box"></span>';
    }
    $('#used-gems').html(html);

    html = '';
    playedCards.slice(-5).forEach((name) => {
      const card = Decktet.get(name);
      if (card) {
        html += '<div class="spell">';
        html += renderCard(card, true);
        html += '</div>';
      }
    });
    $('#spells').html(html);
  }

  function renderObstacle(card, mini) {
    let klass = 'sign';
    if (mini) {
      klass += ' mini';
    }

    let html = '';
    if (card) {
      html += `<div class="${klass}">`;
      html += `<span class="value">${card.value}</span>`;
      html += '<div class="body">';
      html += `<span class="pixelated monster portrait ${card.title}"></span>`;
      html += '<span class="text">';
      html += `<span class="iconic title">${card.title}</span>`;
      html += card.text;
      html += '</span>';
      html += '</div>';
      html += '<div class="gems">';
      card.suits.forEach((suit) => {
        html += `<span class="${suit} gem"></span>`;
      });
      html += '</div>';
      html += '</div>';
    }

    return html;
  }

  function renderObstacles() {
    const $ = window.jQuery;
    const obstacles = Obstacles.get();
    const mini = obstacles.length > 1;

    $('#sign1').html(renderObstacle(obstacles[0], mini)).remove('hidden');
    $('#sign2').html(renderObstacle(obstacles[1], mini)).remove('hidden');

    if (!mini || Obstacles.stage() === 2) {
      $('#sign2').add('hidden');
    }
  }

  function renderTokens() {
    const $ = window.jQuery;
    const tokens = Tokens.get();

    Object.keys(tokens).forEach((type) => {
      let html = '';
      for (let i = 0; i < 9; i += 1) {
        html += '<span class="box">';
        let gem = false;
        gem = gem || (i === 0 && tokens[type] >= 7);
        gem = gem || (i === 1 && tokens[type] >= 6);
        gem = gem || (i === 2 && tokens[type] >= 5);
        gem = gem || (i === 3 && tokens[type] >= 8);
        gem = gem || (i === 4 && tokens[type] >= 1);
        gem = gem || (i === 5 && tokens[type] >= 4);
        gem = gem || (i === 6 && tokens[type] >= 9);
        gem = gem || (i === 7 && tokens[type] >= 2);
        gem = gem || (i === 8 && tokens[type] >= 3);
        if (gem) {
          html += `<span class="${type} gem"></span>`;
        }
        html += '</span>';
      }
      $(`#${type}`).html(html.trim());
    });
  }

  function render() {
    if (dirty) {
      renderRole();
      renderExperience();
      renderDeck();
      renderObstacles();
      renderTokens();
      dirty = false;
    }

    requestAnimationFrame(render);
  }

  function invalidate() {
    dirty = true;
  }

  function playCard(card) {
    playedCards.push(card);
    invalidate();
  }

  function playToken(type) {
    playedTokens.push(type);
    invalidate();
  }

  function clearPlayed() {
    playedCards = [];
    playedTokens = [];
    invalidate();
  }

  function reset() {
    playedCards = [];
    playedTokens = [];
    dirty = true;
  }

  return {
    render,
    invalidate,
    playCard,
    playToken,
    clearPlayed,
    reset,
  };
}());

const Game = (function game() {
  let color;

  function newColor() {
    let hash = color;

    do {
      hash = Math.floor(Math.random() * 16777216);
      hash = (`000000${hash.toString(16)}`).substr(-6);
    } while (hash === color);

    color = hash;
  }

  function onToken(element) {
    if (Deck.empty()) {
      return;
    }

    if (Obstacles.defeated()) {
      return;
    }

    const type = element.unwrap().id;

    if (Obstacles.get().length === 1 && Tokens.count(type) > 0) {
      Tokens.spend(type);
      Obstacles.use(type);
      Renderer.playToken(type);

      const card = Deck.deal();
      Obstacles.use(card);
      Renderer.playCard(card);
    }
  }

  function onSpells() {
    if (Deck.empty()) {
      return;
    }

    if (Obstacles.defeated()) {
      Deck.add(Obstacles.get()[0].name);
      Obstacles.deal();
      Renderer.clearPlayed();
      return;
    }

    if (Tokens.size() <= 0 || Locations.size() <= 0) {
      const $ = window.jQuery;
      $('#world').add('hidden');
      $('#character').remove('hidden');
      newColor();
      window.location.hash = color;
    }
  }

  function onSign(element) {
    if (Deck.empty()) {
      return;
    }

    const sign = element.unwrap().id;

    if (Obstacles.get().length >= 2) {
      let type = sign;
      if (type === 'sign1') {
        type = Obstacles.get()[0].name;
      }
      if (type === 'sign2') {
        type = Obstacles.get()[1].name;
      }
      Obstacles.pick(type);
      Renderer.invalidate();
    }
  }

  function onRolePrev() {
    Character.prev();
    Renderer.invalidate();
  }

  function onRoleNext() {
    Character.next();
    Renderer.invalidate();
  }

  function onLevelStat(element) {
    if (Deck.empty()) {
      const stat = element.unwrap().id;
      Decktet.attributes().forEach((attr) => {
        if (stat.indexOf(attr) > -1) {
          Deck.add(attr);
          Deck.shuffle();
          Renderer.invalidate();
        }
      });
    }
  }

  function onStart() {
    const $ = window.jQuery;
    $('#character').add('hidden');
    $('#world').remove('hidden');

    const hero = Character.get();

    Deck.add(hero.role);
    Deck.shuffle();

    Personalities.remove(hero.role);
    Obstacles.deal();

    Tokens.set({});

    Renderer.invalidate();
  }

  function resetGame() {
    const $ = window.jQuery;
    $('#world').add('hidden');
    $('#character').remove('hidden');

    Obstacles.reset();
    Deck.reset();
    Tokens.reset();
    Renderer.reset();
  }

  function onHashChange() {
    const hash = window.location.hash.substring(1);

    if (/^[0-9A-F]{6}$/i.test(hash)) {
      color = hash;
      PRNG.seed(parseInt(color, 16));
    }

    resetGame();
  }

  function startGame() {
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

    Renderer.render();
  }

  function play() {
    const $ = window.jQuery;

    $('#moons').touch(undefined, onToken);
    $('#suns').touch(undefined, onToken);
    $('#waves').touch(undefined, onToken);
    $('#leaves').touch(undefined, onToken);
    $('#wyrms').touch(undefined, onToken);
    $('#knots').touch(undefined, onToken);

    $('#spells').touch(undefined, onSpells);
    $('#sign1').touch(undefined, onSign);
    $('#sign2').touch(undefined, onSign);

    $('#start').touch(undefined, onStart);

    $('#role-prev').touch(undefined, onRolePrev);
    $('#role-next').touch(undefined, onRoleNext);

    $('#level-up-moons').touch(undefined, onLevelStat);
    $('#level-up-suns').touch(undefined, onLevelStat);
    $('#level-up-waves').touch(undefined, onLevelStat);
    $('#level-up-leaves').touch(undefined, onLevelStat);
    $('#level-up-wyrms').touch(undefined, onLevelStat);
    $('#level-up-knots').touch(undefined, onLevelStat);

    $(window).on('hashchange', onHashChange);

    startGame();
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

  Fn.prototype.klass = function klass(value) {
    if (this.element) {
      this.element.className = value;
    }

    return this;
  };

  Fn.prototype.style = function style(key, value) {
    if (this.element) {
      if (!value) {
        return this.element.style[key];
      }

      this.element.style[key] = value;
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
