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
  cards.suns = { value: 1, suits: ['suns'] };

  // The suit of Leaves is body.
  cards.leaves = { value: 1, suits: ['leaves'] };

  // The suit of Waves is quickness.
  cards.waves = { value: 1, suits: ['waves'] };

  // The suit of Knots is intellect.
  cards.knots = { value: 1, suits: ['knots'] };

  // The suit of Moons is will.
  cards.moons = { value: 1, suits: ['moons'] };

  // The suit of Wyrms is charm.
  cards.wyrms = { value: 1, suits: ['wyrms'] };

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
  cards.sailor = { value: 4, suits: ['waves', 'leaves'] };
  cards.soldier = { value: 5, suits: ['wyrms', 'knots'] };
  cards.lunatic = { value: 6, suits: ['moons', 'waves'] };
  cards.penitent = { value: 6, suits: ['suns', 'wyrms'] };
  cards.diplomat = { value: 8, suits: ['moons', 'suns'] };
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
      return { type: 'mushrooms', variety: 0, title: 'mushrooms', article: 'some', pronoun: 'them' };
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

    return { type, variety: variations[type], article: 'a', pronoun: 'it' };
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

    const rarity = maybeOneOf(['epic', 'greater', 'lesser']);
    if (rarity) {
      item.title = `${rarity} ${item.title}`;
    }
    if (rarity === 'epic') {
      item.article = 'an';
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

    const low = (phase === 1) ? ['rat', 'millipede'] : ['vampire bat', 'scorpion'];
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
  const starting = [];
  let cards = [];
  let discards = [];
  let hand = [];
  let backpack = [];
  let maxed = false;

  function get() {
    const attributes = [];
    const swag = [].concat(backpack).reverse();

    [].concat(cards, discards).forEach((card) => {
      if (Decktet.attributes().indexOf(card) > -1) {
        attributes.push(card);
      }
    });

    return { cards: cards.length, discards: discards.length, attributes, backpack: swag };
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
      backpack.push(card);
      if (Decktet.attributes().indexOf(card) > -1) {
        maxed = false;
      }
    }
  }

  function combinations(list, k) {
    const result = [];
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
          const card = Decktet.get(name);
          suits = suits.concat(card.suits);
        });

        suits = new Set(suits);
        if (suits.size === 6) {
          PRNG.shuffle(collection);
          starting.push(collection);
        }
      });
      PRNG.shuffle(starting);
    }

    cards = starting.pop();
    discards = [];
    hand = [];
    backpack = [].concat(cards, discards);
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

const Gems = (function gems() {
  const has = Object.prototype.hasOwnProperty;
  let counts = {};

  function get() {
    return counts;
  }

  function reset() {
    counts = {};

    Decktet.attributes().forEach((attribute) => {
      counts[attribute] = 100;
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

  function onEncumbered(message) {
    if (message === 'reroll') {
      Deck.reset();
    }

    if (message === 'start') {
      Deck.get().backpack.forEach((name) => {
        Personalities.remove(name);
      });
      Deck.shuffle();
      Obstacles.deal();
      state = 'choice';
    }

    return this;
  }

  function onChoice(message) {
    const obstacles = Obstacles.get();

    if (obstacles.length < 2) {
      return this;
    }

    if (message === 'sign1') {
      Obstacles.pick(obstacles[0].name);
      state = 'combat';
    }

    if (message === 'sign2') {
      Obstacles.pick(obstacles[1].name);
      state = 'combat';
    }

    return this;
  }

  function onLoot(message) {
    if (message !== 'items') {
      return this;
    }

    let obstacles = Obstacles.get();
    if (obstacles.length < 1) {
      return this;
    }

    Deck.add(obstacles[0].name);
    Obstacles.deal();
    obstacles = Obstacles.get();

    if (obstacles.length < 1) {
      state = 'victory';
      return this;
    }

    if (Deck.empty()) {
      state = 'level-up';
      return this;
    }

    state = 'choice';
    return this;
  }

  function onLevelUp(message) {
    const part = message.split('-');
    if (part[0] !== 'level') {
      return this;
    }

    if (Decktet.attributes().indexOf(part[1]) < 0) {
      return this;
    }

    if (!Deck.empty()) {
      return this;
    }

    Deck.add(part[1]);
    Deck.shuffle();
    state = 'choice';
    return this;
  }

  function next(message) {
    const obstacles = Obstacles.get();

    if (state === 'encumbered') {
      return onEncumbered(message);
    }

    if (state === 'choice') {
      return onChoice(message);
    }

    if (state === 'combat') {
      if (message === 'items') {
        if (Obstacles.defeated()) {
          state = 'loot';
          return this;
        }

        if (Gems.size() <= 0) {
          state = 'madness';
          return this;
        }
      }
      return this;
    }

    if (state === 'loot') {
      return onLoot(message);
    }

    if (state === 'level-up') {
      return onLevelUp(message);
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
  let playedGems = [];
  let dirty = true;

  function renderBackpack() {
    const $ = window.jQuery;
    let html = '';

    html += '<div class="col">';
    Deck.get().backpack.forEach((name) => {
      const loot = Loot.get(name);
      html += '<div class="row item">';
      html += `<span class="pixelated icon loot ${loot.type}${loot.variety}"></span>`;
      html += `<span>${loot.title}</span>`;
      html += '</div>';
    });
    html += '</div>';

    $('#backpack').html(html);
  }

  function renderHero() {
    const $ = window.jQuery;
    const hero = 'watchman';
    const attributes = Deck.get().attributes;

    Decktet.attributes().forEach((attr) => {
      const value = 1 + attributes.filter(name => name === attr).length;
      let html = '';
      html += `<span class="stat">${value}`;
      html += `<span class="${attr} gem"></span>`;
      html += '</span>';
      $(`#in-game-${attr}`).html(html.trim());
    });

    $('#in-game-portrait').klass(`pixelated portrait ${hero}`);
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

    if (Stage.get() === 'level-up') {
      $('#level-up').remove('hidden');
      $('#collection').add('hidden');
    } else {
      $('#collection').remove('hidden');
      $('#level-up').add('hidden');
    }
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
        if (Obstacles.stage() === 1) {
          card = Decktet.get(obstacles[0].name);
          loot = Loot.get(obstacles[0].name);
          if (card && loot) {
            html += '<div class="spell">';
            html += renderCard(card, loot);
            html += '</div>';
          }
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

    if (Stage.get() === 'combat') {
      html = '';
      playedGems.forEach((type) => {
        html += '<span class="box">';
        html += `<span class="${type} gem"></span>`;
        html += '</span>';
      });
      for (i = playedGems.length; i < 9; i += 1) {
        html += '<span class="box"></span>';
      }
      $('#used-gems').html(html);
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

  function renderGems() {
    const $ = window.jQuery;
    const gems = Gems.get();

    Object.keys(gems).forEach((type) => {
      let html = '';
      for (let i = 0; i < 9; i += 1) {
        html += '<span class="box">';
        let gem = false;
        gem = gem || (i === 0 && gems[type] >= 7);
        gem = gem || (i === 1 && gems[type] >= 6);
        gem = gem || (i === 2 && gems[type] >= 5);
        gem = gem || (i === 3 && gems[type] >= 8);
        gem = gem || (i === 4 && gems[type] >= 1);
        gem = gem || (i === 5 && gems[type] >= 4);
        gem = gem || (i === 6 && gems[type] >= 9);
        gem = gem || (i === 7 && gems[type] >= 2);
        gem = gem || (i === 8 && gems[type] >= 3);
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
        html = 'You are encumbered! You empty your bag on the ground and dig through the items you&rsquo;ve collected, looking for epic loot.';
        break;

      case 'choice':
        html = 'The path twists and turns. Pick a direction.';
        break;

      case 'combat':
        if (playedCards.length > 0) {
          loot = Loot.get(playedCards[playedCards.length - 1]);
          html = `You pull ${loot.article} ${loot.title} from your bag and throw ${loot.pronoun} at the ${obstacles[0].title}.`;
        } else if (obstacles[0].title === 'mushrooms') {
          html = 'You find some mushrooms growing in the forest.';
        } else {
          html = `A ${obstacles[0].title} appears!`;
        }
        break;

      case 'loot':
        loot = Loot.get(obstacles[0].name);
        if (loot.type === 'mushrooms') {
          html = 'You pick the mushrooms and put them in your bag.';
        } else if (Obstacles.stage() === 1) {
          html = `The ${obstacles[0].title} flees, leaving behind ${loot.article} ${loot.title}.`;
        } else {
          html = `The ${obstacles[0].title} flees. It&rsquo;s too dark to find any loot.`;
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

  function renderButtons() {
    const $ = window.jQuery;

    switch (Stage.get()) {
      case 'encumbered':
        $('#buttons').remove('hidden');
        break;

      default:
        $('#buttons').add('hidden');
        break;
    }
  }

  function render() {
    if (dirty) {
      renderHero();
      renderBackpack();
      renderUsedItems();
      renderUsedGems();
      renderObstacles();
      renderGems();
      renderExperience();
      renderNarrative();
      renderButtons();
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

  function playGem(type) {
    playedGems.push(type);
    invalidate();
  }

  function clearPlayed() {
    playedCards = [];
    invalidate();
  }

  function reset() {
    playedCards = [];
    playedGems = [];
    dirty = true;
  }

  return {
    render,
    invalidate,
    playCard,
    playGem,
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

  function onGem(element) {
    Stage.next('gems');

    if (Obstacles.defeated()) {
      return;
    }

    const type = element.unwrap().id;

    if (Obstacles.get().length === 1 && Gems.count(type) > 0) {
      Gems.spend(type);
      Obstacles.use(type);
      Renderer.playGem(type);

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

  function onChoice(element) {
    Stage.next(element.unwrap().id);
    Renderer.invalidate();
  }

  function onReroll() {
    Stage.next('reroll');
    Renderer.invalidate();
  }

  function onLevelUp(element) {
    Stage.next(element.unwrap().id);
    Renderer.invalidate();
  }

  function onStart() {
    Stage.next('start');
    Renderer.invalidate();
  }

  function resetGame() {
    const $ = window.jQuery;
    $('#signpost').add('hidden');
    $('#buttons').remove('hidden');

    Loot.reset();
    Obstacles.reset();
    Deck.reset();
    Gems.reset();
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

    $('#moons').touch(undefined, onGem);
    $('#suns').touch(undefined, onGem);
    $('#waves').touch(undefined, onGem);
    $('#leaves').touch(undefined, onGem);
    $('#wyrms').touch(undefined, onGem);
    $('#knots').touch(undefined, onGem);

    $('#used-items').touch(undefined, onUsedItems);
    $('#sign1').touch(undefined, onChoice);
    $('#sign2').touch(undefined, onChoice);

    $('#start').touch(undefined, onStart);
    $('#reroll').touch(undefined, onReroll);

    $('#level-moons').touch(undefined, onLevelUp);
    $('#level-suns').touch(undefined, onLevelUp);
    $('#level-waves').touch(undefined, onLevelUp);
    $('#level-leaves').touch(undefined, onLevelUp);
    $('#level-wyrms').touch(undefined, onLevelUp);
    $('#level-knots').touch(undefined, onLevelUp);

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
