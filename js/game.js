// **Darcy's Dungeon** is a role-playing game at heart. Like every good RPG,
// it's all about you. So before we even get to the dungeon crawling, let's talk
// about you. Who are you, and why are you wondering through this forest?
const Character = (function character() {
  let hero = 'watchman';

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
      hero = 'watchman';
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
      hero = 'watchman';
    }
  }


  // And if you ever get tired of what you are, you can go back to being
  // yourself, a heroic painter. Though personally, I think you aught to try
  // being a Bard. That role was the only one that wasn't also a something else.
  function reset() {
    hero = 'watchman';
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

  function personalities() {
    return [
      'excuse', 'author', 'painter', 'savage', 'sailor', 'soldier', 'lunatic',
      'penitent', 'diplomat', 'merchant', 'watchman', 'light keeper', 'consul',
      'bard', 'huntress',
    ];
  }

  cards.excuse = { value: 0, suits: [] };
  cards.author = { value: 2, suits: ['moons', 'knots'] };
  cards.painter = { value: 3, suits: ['suns', 'knots'] };
  cards.savage = { value: 3, suits: ['leaves', 'wyrms'] };
  cards.sailor = { value: 4, suits: ['waves', 'leaves'], title: 'dex / bdy' };
  cards.soldier = { value: 5, suits: ['wyrms', 'knots'], title: 'chr / int' };
  cards.lunatic = { value: 6, suits: ['moons', 'waves'] };
  cards.penitent = { value: 6, suits: ['suns', 'wyrms'] };
  cards.diplomat = { value: 8, suits: ['moons', 'suns'], title: 'wil / str' };
  cards.merchant = { value: 9, suits: ['leaves', 'knots'] };
  cards.watchman = { value: 10, suits: ['moons', 'wyrms', 'knots'] };
  cards['light keeper'] = { value: 10, suits: ['suns', 'waves', 'knots'] };
  cards.consul = { value: 11, suits: ['moons', 'waves', 'knots'] };
  cards.bard = { value: 12, suits: ['suns'] };
  cards.huntress = { value: 12, suits: ['moons'] };

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
  cards.harvest = { value: 10, suits: ['moons', 'suns', 'leaves'] };
  cards.rite = { value: 11, suits: ['moons', 'leaves', 'wyrms'] };
  cards.calamity = { value: 12, suits: ['wyrms'] };
  cards.windfall = { value: 12, suits: ['knots'] };

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
    if (state === undefined) {
      seed();
    }

    state += (state * state) | 5;
    return (state >>> 32) / max;
  }

  // https://bost.ocks.org/mike/shuffle/
  function shuffle(array) {
    if (state === undefined) {
      seed();
    }

    let m = array.length;
    let t;
    let i;

    while (m > 0) {
      i = Math.floor(random() * m);
      m -= 1;
      t = array[m];
      array[m] = array[i]; // eslint-disable-line no-param-reassign
      array[i] = t; // eslint-disable-line no-param-reassign
    }
  }

  return {
    seed,
    random,
    shuffle,
  };
}());

const Loot = (function loot() {
  const has = Object.prototype.hasOwnProperty;
  let helmets = [];
  let armour = [];
  let bottles = [];
  let items = {};
  let variations = {};

  function getVariation(name) {
    const card = Decktet.get(name);
    if (!card || card.suits.length <= 0 || card.value <= 0) {
      return { type: 'mushrooms', variety: 0, title: 'a mushroom' };
    }

    let type = card.suits[1];
    if (!type) {
      type = card.suits[0];
    }

    if (type === 'wyrms' || type === 'moons') {
      type = 'helmet';
    } else if (type === 'suns') {
      type = 'armour';
    } else if (type === 'knots') {
      type = 'sword';
    } else if (type === 'leaves') {
      type = 'bow';
    } else if (type === 'waves') {
      type = 'staff';
    } else {
      type = 'bottle';
    }

    if (card.value <= 1) {
      type = 'bottle';
    }

    if (!has.call(variations, type)) {
      variations[type] = 0;
    } else {
      variations[type] += 1;
    }

    return { type, variety: variations[type] };
  }

  function randomRangeInclusive(min, max) {
    return Math.floor(PRNG.random() * (max + -min + 1)) + min;
  }

  function maybeOneOf(things) {
    const index = randomRangeInclusive(0, things.length);
    return things[index];
  }

  function getHelmet() {
    if (helmets.length <= 0) {
      helmets = ['coif', 'helmet', 'helm'];
      PRNG.shuffle(helmets);
    }

    let title = helmets.pop();

    const material = maybeOneOf(['plate', 'mail', 'leather']);
    if (material) {
      title = `${material} ${title}`;
    }

    return title;
  }

  function getArmour() {
    if (armour.length <= 0) {
      armour = ['brigandine', 'hauberk', 'cuirass', 'plackart'];
      PRNG.shuffle(armour);
    }

    let title = armour.pop();

    const material = maybeOneOf(['plate', 'mail', 'leather']);
    if (material) {
      title = `${material} ${title}`;
    }

    return title;
  }

  function getWeapon(type) {
    let title = type;

    const material = maybeOneOf(['metal', 'glass', 'bone']);
    if (material) {
      title = `${material} ${title}`;
    }

    return title;
  }

  function getBottle() {
    if (bottles.length <= 0) {
      bottles = ['potion', 'tonic', 'salve'];
      PRNG.shuffle(bottles);
    }

    let title = bottles.pop();

    const attribute = maybeOneOf(['sticky', 'noxious', 'fragrent']);
    if (attribute) {
      title = `${attribute} ${title}`;
    }

    return title;
  }

  function generate(name) {
    const item = getVariation(name);
    if (item.title) {
      return item;
    }

    if (item.type === 'helmet') {
      item.title = getHelmet();
    } else if (item.type === 'armour') {
      item.title = getArmour();
    } else if (item.type === 'bottle') {
      item.title = getBottle();
    } else {
      item.title = getWeapon(item.type);
    }

    const rarity = maybeOneOf(['an epic', 'a greater', 'a lesser']);
    if (rarity) {
      item.title = `${rarity} ${item.title}`;
    } else {
      item.title = `a ${item.title}`;
    }

    const bonus = maybeOneOf([
      'healing', 'casting', 'shocking', 'poisoning', 'burning', 'freezing',
      'archery', 'smiting', 'wondering',
    ]);
    if (bonus) {
      item.title = `${item.title} of ${bonus}`;
    }

    return item;
  }

  function get(name) {
    if (!has.call(items, name)) {
      items[name] = generate(name);
    }

    return items[name];
  }

  function reset() {
    helmets = [];
    armour = [];
    bottles = [];
    items = {};
    variations = {};
  }

  return {
    get,
    reset,
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

  function reset() {
    cards = Decktet.personalities();
    remove('sailor');
    remove('soldier');
    remove('diplomat');
    discards = [];
    PRNG.shuffle(cards);
  }

  return {
    deal,
    size,
    remove,
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

    return active;
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
    active = active.map(name => Decktet.get(name));

    const low = (phase === 1) ? ['rat', 'spiders'] : ['vampire bat', 'scorpion'];
    PRNG.shuffle(low);

    const med = (phase === 1) ? ['lizard', 'arachnid', 'rabbit'] : ['octo', 'ghost', 'eye'];
    PRNG.shuffle(med);

    const high = (phase === 1) ? ['snake', 'bat'] : ['goblin', 'skeleton', 'orc'];
    PRNG.shuffle(high);

    const epic = (phase === 1) ? ['wolf', 'boar', 'bear'] : ['cyclops', 'demon'];
    PRNG.shuffle(epic);

    for (let i = 0; i < active.length; i += 1) {
      if (active[i].value <= 0) {
        active[i].title = 'mushrooms';
      } else if (active[i].value <= 3) {
        active[i].title = low.pop();
      } else if (active[i].value <= 6) {
        active[i].title = med.pop();
      } else if (active[i].value <= 9) {
        active[i].title = high.pop();
      } else {
        active[i].title = epic.pop();
      }
    }
  }

  function pick(name) {
    if (challenger) {
      return;
    }

    let index = 0;
    for (index = 0; index < active.length; index += 1) {
      if (active[index].name === name) {
        break;
      }
    }

    if (index < active.length) {
      challenger = active[index];
      active = active.splice(index, 1);
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
    active = [];
    challenger = undefined;
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
  let starting = [];
  let cards = [];
  let discards = [];
  let hand = [];
  let maxed = false;

  function get() {
    const attributes = [];
    const backpack = [].concat(cards, discards);

    backpack.forEach((card) => {
      if (Decktet.attributes().indexOf(card) > -1) {
        attributes.push(card);
      }
    });

    return { cards: cards.length, discards: discards.length, attributes, backpack };
  }

  function empty() {
    return maxed;
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

    if (!card) {
      maxed = true;
    }

    return card;
  }

  function add(card) {
    if (card && Decktet.locations().indexOf(card) < 0) {
      hand.push(card);
      if (Decktet.attributes().indexOf(card) > -1) {
        maxed = false;
      }
    }
  }

  function combinations(list, k) {
    let result = [];
    let i;
    let j;
    let sub;
    let next;

    for (i = 0; i < list.length; i += 1) {
      if (k === 1) {
        result.push([list[i]]);
      } else {
        sub = combinations(list.slice(i + 1, list.length), k - 1);
        for (j = 0; j < sub.length; j += 1) {
          next = sub[j];
          next.unshift(list[i]);
          result.push(next);
        }
      }
    }

    return result;
  }

  function reset() {
    if (starting.length <= 0) {
      const possible = combinations(Decktet.personalities(), 4);
      possible.forEach((collection) => {
        let suits = [];
        collection.forEach((name) => {
          suits = suits.concat(Decktet.get(name).suits);
        });
        suits = new Set(suits);
        if (suits.size === 6) {
          starting.push(collection);
        }
      });
      PRNG.shuffle(starting);
    }

    cards = starting.pop();
    discards = [];
    hand = [];
    maxed = false;
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

  function get() {
    return counts;
  }

  function reset() {
    counts = {};

    Decktet.attributes().forEach((attribute) => {
      counts[attribute] = 9;
    });
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
    count,
    spend,
    reset,
    size,
  };
}());

const Stage = (function stage() {
  let state = 'encumbered';

  function get() {
    return state;
  }

  function next(message) {
    const obstacles = Obstacles.get();

    if (state === 'encumbered') {
      if (message === 'start') {
        state = 'choice';
      }
      return this;
    }

    if (state === 'choice') {
      if (message === 'items') {
        if (Locations.size() <= 0) {
          state = 'victory';
          return this;
        }
      }
      if (message === 'sign1' || message === 'sign2') {
        if (obstacles.length > 0) {
          state = 'combat';
          return this;
        }
      }
      return this;
    }

    if (state === 'combat') {
      if (message === 'items') {
        if (Obstacles.defeated()) {
          state = 'loot';
          return this;
        }

        if (Tokens.size() <= 0) {
          state = 'madness';
          return this;
        }
      }
      return this;
    }

    if (state === 'loot') {
      if (message === 'items') {
        if (Deck.empty()) {
          state = 'level-up';
        } else {
          state = 'choice';
        }
      }
      return this;
    }

    if (state === 'level-up') {
      if (message === 'level') {
        state = 'choice';
      }
      return this;
    }

    if (state === 'victory') {
      if (message === 'items') {
        state = 'encumbered';
      }
      return this;
    }

    if (state === 'madness') {
      if (message === 'items') {
        state = 'encumbered';
      }
    }

    return this;
  }

  function reset() {
    state = 'encumbered';
  }

  return {
    get,
    next,
    reset,
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
      $(`#in-game-${attr}`).html(html.trim());
    });

    $('#in-game-portrait').klass(`pixelated portrait ${hero.role}`);
  }

  function renderExperience() {
    const $ = window.jQuery;
    const deck = Deck.get();
    let points = deck.discards;
    let needed = deck.discards + deck.cards;
    let percent = (points * 100) / needed;

    if (Deck.empty()) {
      points = '??';
      needed = '??';
      percent = 100;
    }

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
    $('#xp-progress').style('width', `${percent}%`);
  }

  function renderCard(card, loot) {
    let html = '';

    html += '<div class="sign mini loot">';
    html += `<span class="value">${card.value}</span>`;
    html += `<span class="pixelated loot portrait ${loot.type}${loot.variety}"></span>`;
    html += '<div class="gems">';
    card.suits.forEach((suit) => {
      html += `<span class="${suit} gem"></span>`;
    });
    html += '</div>';
    html += '</div>';

    return html;
  }

  function renderUsedItems() {
    const $ = window.jQuery;
    const obstacles = Obstacles.get();
    let html;
    let card;
    let loot;

    switch (Stage.get()) {
      case 'encumbered':
        html = '';
        Deck.get().backpack.forEach((name) => {
          card = Decktet.get(name);
          loot = Loot.get(name);
          if (card && loot) {
            html += '<div class="spell">';
            html += renderCard(card, loot);
            html += '</div>';
          }
        });
        $('#used-items').remove('hidden').html(html);
        break;

      case 'combat':
        html = '';
        playedCards.slice(-10).forEach((name) => {
          card = Decktet.get(name);
          loot = Loot.get(name);
          if (card && loot) {
            html += '<div class="spell">';
            html += renderCard(card, loot);
            html += '</div>';
          }
        });
        $('#used-items').remove('hidden').html(html);
        break;

      case 'loot':
        html = '';
        card = Decktet.get(obstacles[0].name);
        loot = Loot.get(obstacles[0].name);
        if (card && loot) {
          html += '<div class="spell">';
          html += renderCard(card, loot);
          html += '</div>';
        }
        $('#used-items').remove('hidden').html(html);
        break;

      case 'victory':
      case 'madness':
        $('#used-items').remove('hidden').html('');
        break;

      default:
        $('#used-items').add('hidden');
        break;
    }
  }

  function renderUsedGems() {
    const $ = window.jQuery;
    let html;
    let i;

    switch (Stage.get()) {
      case 'combat':
        html = '';
        playedTokens.forEach((type) => {
          html += '<span class="box">';
          html += `<span class="${type} gem"></span>`;
          html += '</span>';
        });
        for (i = playedTokens.length; i < 9; i += 1) {
          html += '<span class="box"></span>';
        }
        $('#used-gems').remove('hidden').html(html);
        break;

      default:
        $('#used-gems').add('hidden').html('');
        break;
    }
  }

  function renderObstacle(card, mini) {
    let klass = 'sign';
    if (mini) {
      klass += ' mini';
    }

    let html = '';
    if (card) {
      html += `<div class="${klass} ${card.title}">`;
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

    switch (Stage.get()) {
      case 'choice':
      case 'combat':
      case 'loot':
        $('#signpost').remove('hidden');
        $('#sign1').html(renderObstacle(obstacles[0], mini)).remove('hidden');
        $('#sign2').html(renderObstacle(obstacles[1], mini)).remove('hidden');
        if (!mini || Obstacles.stage() === 2) {
          $('#sign2').add('hidden');
        }
        break;

      default:
        $('#signpost').add('hidden');
        break;
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

  function renderNarrative() {
    const $ = window.jQuery;
    const obstacles = Obstacles.get();

    let html = '';
    let loot;

    switch (Stage.get()) {
      case 'encumbered':
        html = 'You are encumbered! You empty your bag on the ground and dig through the items you&rsquo;ve collected, looking for anything useful.';
        break;

      case 'choice':
        html = 'The path twists and turns. Pick a direction.';
        break;

      case 'combat':
        if (playedCards.length > 0) {
          loot = Loot.get(playedCards[playedCards.length - 1]);
          html = `You pull ${loot.title} from your bag and throw it at the ${obstacles[0].title}.`;
        } else {
          if (obstacles[0].title === 'mushrooms') {
            html = 'You find some mushrooms growing in the forest.';
          } else {
            html = `A wild ${obstacles[0].title} appears!`;
          }
        }
        break;

      case 'loot':
        loot = Loot.get(obstacles[0].name);
        if (loot.type === 'mushrooms') {
          html = 'You pick the mushrooms and put them in your bag.';
        } else {
          html = `The ${obstacles[0].title} flees, leaving behind ${loot.title}.`;
        }
        break;

      case 'level-up':
        html = 'You have gained experience. Level up!';
        break;

      case 'victory':
        html = 'You are victorious.';
        break;

      case 'madness':
        html += 'The monsters eat your dreams and you descend into madness.';
        break;

      default:
        break;
    }

    $('#narrative').html(html);
  }

  function render() {
    if (dirty) {
      renderRole();
      renderUsedItems();
      renderUsedGems();
      renderObstacles();
      renderTokens();
      renderExperience();
      renderNarrative();
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
    Stage.next('gems');

    if (Obstacles.defeated()) {
      return;
    }

    const type = element.unwrap().id;

    if (Obstacles.get().length === 1 && Tokens.count(type) > 0) {
      Tokens.spend(type);
      Obstacles.use(type);
      Renderer.playToken(type);

      let card = Deck.deal();
      if (!card) {
        Deck.shuffle();
        card = Deck.deal();
      }
      Obstacles.use(card);
      Renderer.playCard(card);
    }
  }

  function onUsedItems() {
    switch (Stage.get()) {
      case 'loot':
        Deck.add(Obstacles.get()[0].name);
        Obstacles.deal();
        Renderer.clearPlayed();
        break;

      case 'victory':
      case 'madness':
        newColor();
        window.location.hash = color;
        break;

      default:
        break;
    }

    Stage.next('items');
    Renderer.invalidate();
  }

  function onSign(element) {
    const sign = element.unwrap().id;
    Stage.next(sign);

    if (Deck.empty()) {
      return;
    }

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

  function onReroll() {
    if (Stage.get() === 'encumbered') {
      Deck.reset();
      Stage.next('reroll');
      Renderer.invalidate();
    }
  }

  function onLevelStat(element) {
    Stage.next('level');
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
    $('#buttons').add('hidden');
    $('#signpost').remove('hidden');

    const hero = Character.get();

    Deck.add(hero.role);
    Deck.shuffle();

    Personalities.remove(hero.role);
    Obstacles.deal();

    Renderer.invalidate();
    Stage.next('start');
  }

  function resetGame() {
    const $ = window.jQuery;
    $('#signpost').add('hidden');
    $('#buttons').remove('hidden');

    Loot.reset();
    Obstacles.reset();
    Deck.reset();
    Tokens.reset();
    Stage.reset();
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

    $('#used-items').touch(undefined, onUsedItems);
    $('#sign1').touch(undefined, onSign);
    $('#sign2').touch(undefined, onSign);

    $('#start').touch(undefined, onStart);
    $('#reroll').touch(undefined, onReroll);

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
    if (this.element && this.element.classList) {
      this.element.classList.add(klass);
    }

    return this;
  };

  Fn.prototype.remove = function remove(klass) {
    if (this.element && this.element.classList) {
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
