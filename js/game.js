// **Epic Loot** is a game about wondering through a forest, picking mushrooms,
// and scaring away wild animals by throwing loot at them. But not that boring
// junk loot you usually find in a RPG. This is epic loot. The kind of loot
// where your helmet is a _Greater Leather Coif of Smiting with +6 Strength and
// +6 Charm_.
//
// The way you do all this mushroom picking, animal finding, and loot chucking
// is through deck-building. The deck you use is a [Decktet][], which is usually
// described as
//
// > It is the kind of tarot deck they use in the alternate universe where Charlemange was a badger, if you can imagine such a thing.
//
// [Decktet]: http://www.decktet.com/ "P.D. Magnus: The Decktet"
//
// Because you are reading developer notes for a RPG called **Epic Loot**, where
// a _Greater Leather Coif of Smiting with +6 Strength and +6 Charm_ is a
// perfectly reasonable staring item, you can probably imagine such a thing.
const Decktet = (function decktet() {
  const has = Object.prototype.hasOwnProperty;
  const cards = {};

  function get(name) {
    if (has.call(cards, name)) {
      return Object.assign({ name, title: name, text: '' }, cards[name]);
    }

    return undefined;
  }

  // The Decktet has six suits: suns, leaves, waves, knots, moons, and wyrms.
  // **Epic Loot** replaces those with more traditional RPG attributes:
  // strength, boldness, quickness, intellect, will, and charm. They're then
  // shortened to three letter abbreviations, becuase this is the kind of game
  // where bytes matter.
  //
  // As an aside, "boldness" was originally "body", because I'm overly fond of
  // _Shadowrun_ as a RPG. But I couldn't come up with a verb to describe "body"
  // as an attribute, so I settled on "boldness".
  function attributes() {
    return [
      'str', 'bld', 'qck', 'int', 'wil', 'chr',
    ];
  }

  cards.str = { value: 1, suits: ['str'] };
  cards.bld = { value: 1, suits: ['bld'] };
  cards.qck = { value: 1, suits: ['qck'] };
  cards.int = { value: 1, suits: ['int'] };
  cards.wil = { value: 1, suits: ['wil'] };
  cards.chr = { value: 1, suits: ['chr'] };

  // Like the attributes, the personalities of the Decktet all use abbreviated
  // names. So the Bard is "bar", the Lunatic is "lun", and the Excuse is "exc".
  // Yes, the Excuse is a personality in **Epic Loot**. Actually, the Excuse is
  // mushrooms, but that comes later.
  function personalities() {
    return [
      'exc', 'aut', 'pai', 'sav', 'sai', 'sol', 'lun',
      'pen', 'dip', 'mer', 'wat', 'lgt', 'con',
      'bar', 'hun',
    ];
  }

  cards.exc = { value: 0, suits: [] };
  cards.aut = { value: 2, suits: ['int', 'wil'] };
  cards.pai = { value: 3, suits: ['str', 'int'] };
  cards.sav = { value: 3, suits: ['bld', 'chr'] };
  cards.sai = { value: 4, suits: ['bld', 'qck'] };
  cards.sol = { value: 5, suits: ['int', 'chr'] };
  cards.lun = { value: 6, suits: ['qck', 'wil'] };
  cards.pen = { value: 6, suits: ['str', 'chr'] };
  cards.dip = { value: 8, suits: ['str', 'wil'] };
  cards.mer = { value: 9, suits: ['bld', 'int'] };
  cards.wat = { value: 10, suits: ['int', 'wil', 'chr'] };
  cards.lgt = { value: 10, suits: ['str', 'qck', 'int'] };
  cards.con = { value: 11, suits: ['qck', 'int', 'wil'] };
  cards.bar = { value: 12, suits: ['str'] };
  cards.hun = { value: 12, suits: ['wil'] };

  // Events are abbreviated too, and the Market counts as an event, instead of a
  // location.
  function events() {
    return [
      'jou', 'bat', 'dis', 'mar', 'cha', 'bet',
      'pac', 'har', 'rit', 'cal', 'win',
    ];
  }

  cards.jou = { value: 3, suits: ['qck', 'wil'] };
  cards.bat = { value: 4, suits: ['int', 'chr'] };
  cards.dis = { value: 5, suits: ['str', 'qck'] };
  cards.mar = { value: 6, suits: ['bld', 'int'] };
  cards.cha = { value: 7, suits: ['bld', 'wil'] };
  cards.bet = { value: 8, suits: ['int', 'chr'] };
  cards.pac = { value: 9, suits: ['str', 'wil'] };
  cards.har = { value: 10, suits: ['str', 'bld', 'wil'] };
  cards.rit = { value: 11, suits: ['bld', 'wil', 'chr'] };
  cards.cal = { value: 12, suits: ['chr'] };
  cards.win = { value: 12, suits: ['int'] };

  // Locations are abbreviated likewise, and both the Origin and the End count
  // as locatios, instead of events.
  function locations() {
    return [
      'ori', 'des', 'mou', 'for', 'cas', 'cav', 'mil',
      'drk', 'bor', 'isl', 'dow', 'sea', 'end',
    ];
  }

  cards.ori = { value: 2, suits: ['bld', 'qck'] };
  cards.des = { value: 2, suits: ['str', 'chr'] };
  cards.mou = { value: 4, suits: ['str', 'wil'] };
  cards.for = { value: 5, suits: ['bld', 'wil'] };
  cards.cas = { value: 7, suits: ['str', 'int'] };
  cards.cav = { value: 7, suits: ['qck', 'chr'] };
  cards.mil = { value: 8, suits: ['bld', 'qck'] };
  cards.drk = { value: 9, suits: ['qck', 'chr'] };
  cards.bor = { value: 10, suits: ['bld', 'qck', 'chr'] };
  cards.isl = { value: 11, suits: ['str', 'qck', 'chr'] };
  cards.dow = { value: 11, suits: ['str', 'bld', 'int'] };
  cards.sea = { value: 12, suits: ['qck'] };
  cards.end = { value: 12, suits: ['bld'] };

  return {
    attributes,
    personalities,
    events,
    locations,
    get,
  };
}());

// Random number generators lie at the heart of good RPGs. Dice and decks of
// cards are common in a pen-and-paper world. But the digital world of **Epic
// Loot** uses a mathematical function.
const PRNG = (function prng() {
  const max = 2 ** 32;
  let state = Math.floor(Math.random() * max);

  function random() {
    state += (state * state) | 5;
    return (state >>> 32) / max;
  }

  // https://bost.ocks.org/mike/shuffle/
  function shuffle(array) {
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

  function pick(array) {
    const index = Math.floor(random() * array.length);
    return array[index];
  }

  return {
    random,
    shuffle,
    pick,
  };
}());

const Loot = (function loot() {
  const has = Object.prototype.hasOwnProperty;
  let places = [];
  let actions = [];
  let helmets = [];
  let armour = [];
  let bottles = [];
  let items = {};
  let variations = {};

  function getVariation(name) {
    const card = Decktet.get(name);
    if (!card || card.suits.length <= 0 || card.value <= 0) {
      return { type: 'mushrooms', variety: '', title: 'mushrooms', article: 'some', pronoun: 'them' };
    }

    if (Decktet.locations().indexOf(name) > -1) {
      return { type: 'gold', variety: '', title: 'some gold', article: '', pronoun: '' };
    }

    let type = card.suits[1];
    if (!type) {
      type = card.suits[0];
    }

    const loots = {
      str: 'armour',
      bld: 'bow',
      qck: 'staff',
      int: 'sword',
      wil: 'helmet',
      chr: 'helmet',
    };

    type = loots[type];
    if (!type || card.value <= 1) {
      type = 'bottle';
    }

    const max = { helmet: 3, armour: 3, sword: 3, bow: 2, staff: 3, bottle: 1 };
    if (!has.call(variations, type)) {
      variations[type] = 0;
    } else {
      variations[type] += 1;
      variations[type] %= max[type];
    }

    return { type, variety: variations[type], article: 'a', pronoun: 'it' };
  }

  function getWhere() {
    if (places.length <= 0) {
      places = [
        'wonder through the forest',
        'come to a clearing in the forest',
        'halt at a glade in the forest',
        'arrive at a fork in the road',
      ];
      PRNG.shuffle(places);
    }

    return places.pop();
  }

  function getWhat() {
    if (actions.length <= 0) {
      actions = [
        'blinks', 'growls', 'hisses', 'howls', 'glares',
      ];
      PRNG.shuffle(actions);
    }

    return actions.pop();
  }

  function getHow(name) {
    const card = Decktet.get(name);
    if (card) {
      const verbs = {
        str: 'strong',
        bld: 'bold',
        qck: 'quick',
        int: 'intelligent',
        wil: 'wilful',
        chr: 'charming',
      };

      const how = card.suits.map(suit => verbs[suit]);
      let text = '';

      while (how.length > 0) {
        const verb = how.shift();
        if (verb) {
          text += ` ${verb}`;
          if (how.length > 1) {
            text += ',';
          }
          if (how.length === 1) {
            text += ' and';
          }
        }
      }

      return text.trim();
    }

    return undefined;
  }

  function getHelmet() {
    if (helmets.length <= 0) {
      helmets = ['coif', 'helmet', 'helm'];
      PRNG.shuffle(helmets);
    }

    let title = helmets.pop();

    const material = PRNG.pick(['plate', 'mail', 'leather', undefined]);
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

    const material = PRNG.pick(['plate', 'mail', 'leather', undefined]);
    if (material) {
      title = `${material} ${title}`;
    }

    return title;
  }

  function getWeapon(type) {
    let title = type;

    const material = PRNG.pick(['metal', 'glass', 'bone', undefined]);
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

    const attribute = PRNG.pick(['sticky', 'noxious', 'fragrent', undefined]);
    if (attribute) {
      title = `${attribute} ${title}`;
    }

    return title;
  }

  function generate(name) {
    const item = getVariation(name);

    item.where = getWhere();
    item.what = getWhat();
    item.how = getHow(name);

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

    const rarity = PRNG.pick(['epic', 'greater', 'lesser', undefined]);
    if (rarity) {
      item.title = `${rarity} ${item.title}`;
    }
    if (rarity === 'epic') {
      item.article = 'an';
    }

    const bonus = PRNG.pick([
      'healing', 'casting', 'shocking', 'poisoning', 'burning', 'freezing',
      'archery', 'smiting', 'wondering', undefined,
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
    places = [];
    actions = [];
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

  function deal() {
    return cards.pop();
  }

  function size() {
    return cards.length;
  }

  function remove(name) {
    const index = cards.indexOf(name);
    if (index > -1) {
      cards.splice(index, 1);
    }
  }

  function reset() {
    cards = Decktet.personalities();
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

  function deal() {
    return cards.pop();
  }

  function size() {
    return cards.length;
  }

  function reset() {
    cards = Decktet.events();
    PRNG.shuffle(cards);
  }

  return {
    deal,
    size,
    reset,
  };
}());

const Locations = (function locations() {
  let cards = [];
  let discards = [];

  function add(name) {
    if (Decktet.locations().indexOf(name) > -1) {
      discards.push(name);
    }
  }

  function shuffle() {
    cards = cards.concat(discards);
    discards = [];
    PRNG.shuffle(cards);
  }

  function deal() {
    return cards.pop();
  }

  function size() {
    return cards.length + discards.length;
  }

  function reset() {
    cards = Decktet.locations();
    discards = [];
    PRNG.shuffle(cards);
  }

  return {
    add,
    shuffle,
    deal,
    size,
    reset,
  };
}());

const Obstacles = (function obstacles() {
  let phase = 1;
  let animals = [];
  let monsters = [];
  let active = [];
  let challenger;

  function get() {
    let results = active;
    if (challenger) {
      results = [challenger];
    }
    return results.map(o => Object.assign({}, o));
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
      let loc1 = Locations.deal();
      if (!loc1) {
        Locations.shuffle();
        loc1 = Locations.deal();
      }
      if (loc1) {
        active.push(loc1);
      }

      let loc2 = Locations.deal();
      if (!loc2) {
        Locations.shuffle();
        loc2 = Locations.deal();
      }
      if (loc2) {
        active.push(loc2);
      }
    }

    PRNG.shuffle(active);
    active = active.map(name => Decktet.get(name));

    for (let i = 0; i < active.length; i += 1) {
      if (active[i].value <= 0) {
        active[i].title = 'mushrooms';
      } else if (phase === 1) {
        if (animals.length <= 0) {
          animals = ['rabbit', 'arachnid', 'bat', 'snake', 'boar'];
          PRNG.shuffle(animals);
        }
        active[i].title = animals.pop();
      } else {
        if (monsters.length <= 0) {
          monsters = ['scorpion', 'ghost', 'skeleton', 'eye', 'octo'];
          PRNG.shuffle(monsters);
        }
        active[i].title = monsters.pop();
      }
    }
  }

  function pick(name) {
    if (challenger || active.length < 1) {
      return;
    }

    if (active.length < 2) {
      challenger = active[0];
      return;
    }

    if (active[0].name === name) {
      Locations.add(active[1].name);
      challenger = active[0];
    }

    if (active[1].name === name) {
      Locations.add(active[0].name);
      challenger = active[1];
    }

    active = [challenger];
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

  function stage() {
    return phase;
  }

  function reset() {
    Personalities.reset();
    Events.reset();
    Locations.reset();

    phase = 1;
    animals = [];
    monsters = [];
    active = [];
    challenger = undefined;
  }

  return {
    get,
    deal,
    pick,
    use,
    defeated,
    stage,
    reset,
  };
}());

const Deck = (function deck() {
  const starting = [];
  let cards = [];
  let discards = [];
  let hand = [];
  let bag = [];
  let maxed = false;

  function get() {
    const attributes = [];
    const swag = [].concat(bag).reverse();

    [].concat(cards, discards).forEach((card) => {
      if (Decktet.attributes().indexOf(card) > -1) {
        attributes.push(card);
      }
    });

    return { cards: cards.length, discards: discards.length, attributes, bag: swag };
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
      bag.push(card);
      if (Decktet.attributes().indexOf(card) > -1) {
        maxed = false;
      }
    }
  }

  function used(name) {
    return cards.indexOf(name) < 0;
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
    bag = [].concat(cards, discards);
    maxed = false;
  }

  return {
    get,
    empty,
    shuffle,
    deal,
    add,
    used,
    reset,
  };
}());

const Gems = (function gems() {
  const has = Object.prototype.hasOwnProperty;
  const cap = 9;
  let counts = {};

  function get() {
    return counts;
  }

  function reset() {
    counts = {};

    Decktet.attributes().forEach((attribute) => {
      counts[attribute] = cap;
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

  function add(name) {
    if (has.call(counts, name) && counts[name] < cap) {
      counts[name] += 1;
    }
  }

  function max() {
    return cap;
  }

  function size() {
    return Object.values(counts).reduce((total, num) => total + num, 0);
  }

  return {
    get,
    count,
    spend,
    add,
    max,
    reset,
    size,
  };
}());

const Stage = (function stage() {
  let usedItems = [];
  let state = 'encumbered';

  function get() {
    return state;
  }

  function reset() {
    Loot.reset();
    Obstacles.reset();
    Deck.reset();
    Gems.reset();

    usedItems = [];
    state = 'encumbered';
  }

  function onEncumbered(message) {
    if (message === 'd6') {
      Deck.reset();
    }

    if (message === 'items') {
      Deck.get().bag.forEach((name) => {
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
    if (obstacles.length < 1) {
      return this;
    }

    let index;
    if (message === 'd6') {
      index = Math.floor(PRNG.random() * obstacles.length);
    }
    if (message === 'sign1') {
      index = 0;
    }
    if (message === 'sign2') {
      index = 1;
    }
    if (index === undefined) {
      return this;
    }
    if (index >= obstacles.length) {
      index = 0;
    }

    Obstacles.pick(obstacles[index].name);
    state = 'combat';
    return this;
  }

  function onCombat(message) {
    const part = message.split('-');

    if (message === 'd6') {
      const attributes = Decktet.attributes();
      PRNG.shuffle(attributes);
      part[0] = 'gems';
      part[1] = attributes.pop();
      while (part[1] && Gems.count(part[1]) <= 0) {
        part[1] = attributes.pop();
      }
    }

    if (part[0] === 'gems') {
      const type = part[1];

      if (Gems.count(type) <= 0) {
        return this;
      }

      if (Obstacles.defeated()) {
        return this;
      }

      if (Obstacles.get().length !== 1) {
        return this;
      }

      Gems.spend(type);
      Obstacles.use(type);

      let card = Deck.deal();
      if (!card) {
        Deck.shuffle();
        card = Deck.deal();
      }
      Obstacles.use(card);
      usedItems.push(card);
    }

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

    usedItems = [];

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

    if (message === 'd6') {
      const attributes = Decktet.attributes();
      const index = Math.floor(PRNG.random() * attributes.length);
      part[0] = 'level';
      part[1] = attributes[index];
    }

    if (part[0] !== 'level') {
      return this;
    }

    if (Decktet.attributes().indexOf(part[1]) < 0) {
      return this;
    }

    if (!Deck.empty()) {
      return this;
    }

    Gems.add(part[1]);
    Deck.add(part[1]);
    state = 'choice';
    return this;
  }

  function next(message) {
    if (state === 'encumbered') {
      return onEncumbered(message);
    }

    if (state === 'choice') {
      return onChoice(message);
    }

    if (state === 'combat') {
      return onCombat(message);
    }

    if (state === 'loot') {
      return onLoot(message);
    }

    if (state === 'level-up') {
      return onLevelUp(message);
    }

    if (state === 'victory' || state === 'madness') {
      if (message === 'items') {
        reset();
      }
    }

    return this;
  }

  function items() {
    return [].concat(usedItems);
  }

  return {
    get,
    next,
    items,
    reset,
  };
}());

const Renderer = (function renderer() {
  let dirty = true;

  function renderBag() {
    const $ = window.jQuery;
    const swag = Deck.get().bag;
    const used = swag.filter(name => Deck.used(name));
    const unused = swag.filter(name => !Deck.used(name));

    let html = '';
    [].concat(unused, ['end'], used).forEach((name) => {
      const card = Decktet.get(name);
      const loot = Loot.get(name);
      html += '<div class="row item">';
      html += `<span class="pixelated icon loot ${loot.type}${loot.variety}"></span>`;
      html += `<span class="name">${loot.title}</span>`;
      if (loot.type !== 'gold') {
        html += '<span class="info">';
        html += `<span class="value">${card.value}</span>`;
        card.suits.forEach((type) => {
          html += `<span class="${type} gem"></span>`;
        });
        for (let i = card.suits.length; i < 3; i += 1) {
          html += '<span class="invisible gem"></span>';
        }
      }
      html += '</span>';
      html += '</div>';
    });

    $('#bag').html(html);
  }

  function renderHero() {
    const $ = window.jQuery;

    Decktet.attributes().forEach((name) => {
      const max = Gems.max();
      let value = max - Gems.count(name);
      if (value < 1) {
        value = 1;
      }
      if (value > max) {
        value = max;
      }
      let html = '';
      html += `<span class="stat">${value}`;
      html += `<span class="${name} gem"></span>`;
      html += '</span>';
      $(`#stats-${name}`).html(html.trim());
    });
  }

  function renderExperience() {
    const $ = window.jQuery;
    const deck = Deck.get();
    const stage = Stage.get();
    let points = deck.discards;
    let needed = deck.discards + deck.cards;
    let percent = (points * 100) / needed;

    if (Deck.empty()) {
      points = '??';
      needed = '??';
      percent = 100;
    }

    $('#xp-points').html(points);
    $('#xp-needed').html(needed);
    $('#this-level').html(deck.attributes.length + 1);
    $('#next-level').html(deck.attributes.length + 2);
    $('#xp-progress').style('width', `${percent}%`);

    if (Obstacles.stage() === 1) {
      $('#world').add('day');
      $('#world').remove('night');
    } else {
      $('#world').add('night');
      $('#world').remove('day');
    }

    if (stage === 'encumbered' || stage === 'loot') {
      let html = '<span class="celestial"></span>';
      let i = 0;
      needed = Decktet.events().length + Decktet.locations().length;
      points = needed - Events.size() - Locations.size();
      for (i = 0; i < points; i += 1) {
        html += '<span class="filled diamond"></span>';
      }
      for (i = points; i < needed; i += 1) {
        html += '<span class="diamond"></span>';
      }
      $('#game-progress').html(html);
    }
  }

  function renderItem(card, loot, mini) {
    let html;

    if (card) {
      let klass = 'col sign';
      if (mini || loot) {
        klass += ' mini';
      }
      if (loot) {
        klass += ' loot';
      }

      let icon = card.title;
      if (loot) {
        icon = `${loot.type}${loot.variety}`;
      }

      let type = 'gems';
      if (loot && loot.type === 'gold') {
        type += ' gold';
      }

      html = '';
      html += `<div class="${klass}">`;
      html += `<span class="value">${card.value}</span>`;
      html += '<div class="row">';
      html += `<span class="pixelated icon ${icon}"></span>`;
      html += '<span class="text">';
      html += `<span class="iconic title">${card.title}</span>`;
      html += '</span>';
      html += '</div>';
      html += `<div class="row ${type}">`;
      card.suits.forEach((suit) => {
        html += `<span class="${suit} gem"></span>`;
      });
      html += '</div>';
      html += '</div>';
    }

    return html;
  }

  function renderLevelUp() {
    const $ = window.jQuery;

    let html;
    let card;
    let loot;

    switch (Stage.get()) {
      case 'level-up':
        Decktet.attributes().forEach((name) => {
          card = Decktet.get(name);
          loot = Loot.get(name);
          html = renderItem(card, loot, true);
          $(`#level-${name}`).html(html);
        });
        $('#level-up').remove('hidden');
        $('#used-items').add('hidden');
        break;

      default:
        $('#used-items').remove('hidden');
        $('#level-up').add('hidden');
        break;
    }
  }

  function renderUsedItems() {
    const $ = window.jQuery;
    let html;
    let card;
    let loot;

    switch (Stage.get()) {
      case 'encumbered':
        html = '';
        Deck.get().bag.forEach((name) => {
          card = Decktet.get(name);
          loot = Loot.get(name);
          if (card && loot) {
            html += renderItem(card, loot, true);
          }
        });
        $('#used-items').remove('hidden').html(html);
        break;

      case 'combat':
        html = '';
        Stage.items().slice(-6).forEach((name) => {
          card = Decktet.get(name);
          loot = Loot.get(name);
          if (card && loot) {
            html += renderItem(card, loot, true);
          }
        });
        $('#used-items').remove('hidden').html(html);
        break;

      case 'loot':
      case 'victory':
      case 'madness':
        $('#used-items').remove('hidden').html('');
        break;

      default:
        $('#used-items').add('hidden').html('');
        break;
    }
  }

  function renderObstacles() {
    const $ = window.jQuery;
    const obstacles = Obstacles.get();
    let sign1;
    let sign2;
    let card;
    let loot;

    switch (Stage.get()) {
      case 'encumbered':
        sign1 = '<div class="col sign"></div>';
        break;

      case 'combat':
        sign1 = renderItem(obstacles[0], undefined, false);
        break;

      case 'choice':
        sign1 = renderItem(obstacles[0], undefined, true);
        sign2 = renderItem(obstacles[1], undefined, true);
        if (obstacles.length === 1) {
          sign2 = sign1;
        }
        break;

      case 'loot':
        card = Decktet.get(obstacles[0].name);
        loot = Loot.get(obstacles[0].name);
        sign1 = renderItem(card, loot, true);
        break;

      default:
        break;
    }

    if (sign1 || sign2) {
      $('#signpost').remove('hidden');
    } else {
      $('#signpost').add('hidden');
    }

    if (sign1) {
      $('#sign1').remove('hidden').html(sign1);
    } else {
      $('#sign1').add('hidden').html('');
    }

    if (sign2) {
      $('#sign2').remove('hidden').html(sign2);
    } else {
      $('#sign2').add('hidden').html('');
    }
  }

  function renderGems() {
    const $ = window.jQuery;
    const gems = Gems.get();

    if (Stage.get() === 'encumbered') {
      $('#gems').add('invisible');
    } else {
      $('#gems').remove('invisible');
    }

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
      $(`#gems-${type}`).html(html.trim());
    });
  }

  function renderNarrative() {
    const $ = window.jQuery;
    const obstacles = Obstacles.get();

    let html = '';
    let loot;
    let items;

    switch (Stage.get()) {
      case 'encumbered':
        html = 'You are encumbered! You empty your bag on the ground and pick through the items you&rsquo;ve collected, looking for <span class="iconic">epic loot</span>.';
        break;

      case 'choice':
        loot = Loot.get(obstacles[0].name);
        if (Obstacles.stage() === 1) {
          html = `You ${loot.where}. Wild animals block your path. You&rsquo;ll have to scare one of them away. Pick an animal or roll the dice.`;
        } else {
          html = `You ${loot.where}. Monsters block your path. You&rsquo;ll have to scare one of them away. Pick a monster or roll the dice.`;
        }
        break;

      case 'combat':
        items = Stage.items();
        if (items.length > 0) {
          loot = Loot.get(items.slice(-1)[0]);
          html = `You pull ${loot.article} ${loot.title} from your bag and throw ${loot.pronoun} at the ${obstacles[0].title}, which`;
          if (Obstacles.defeated()) {
            html += ' flees.';
          } else {
            html += ` ${loot.what} at you.`;
          }
        } else if (obstacles[0].title === 'mushrooms') {
          html = 'You find some mushrooms growing in the forest.';
        } else {
          loot = Loot.get(obstacles[0].name);
          html = `The ${obstacles[0].title} ${loot.what} at you.`;
          if (loot.how) {
            html += ` If you are ${loot.how}, you may be able to scare it away.`;
          }
          html += ' Pick a gem or roll the dice.';
        }
        break;

      case 'loot':
        loot = Loot.get(obstacles[0].name);
        if (loot.type === 'mushrooms') {
          html = 'The mushrooms look delicious.';
        } else {
          html = `You find ${loot.article} ${loot.title}!`;
        }
        break;

      case 'level-up':
        html = 'You have gained in experience. Level up! Pick a bottle or roll the dice.';
        break;

      case 'victory':
        html = 'You are victorious! You heft your bag of <span class="iconic">epic loot</span> and realize&hellip;';
        break;

      case 'madness':
        html = 'The monsters chew a hole in your bag and take some of your <span class="iconic">epic loot</span>. But that&rsquo;s okay. You were starting to feel like&hellip;';
        break;

      default:
        break;
    }

    $('#narrative').html(html);
  }

  function renderButton() {
    const $ = window.jQuery;
    let html;

    switch (Stage.get()) {
      case 'encumbered':
        html = 'take';
        break;

      case 'combat':
        if (Gems.size() <= 0) {
          html = 'flee';
        }
        if (Obstacles.defeated()) {
          html = 'loot';
        }
        break;

      case 'loot':
        html = 'take';
        break;

      case 'victory':
      case 'madness':
        html = 'rest';
        break;

      default:
        break;
    }

    if (html) {
      $('#button').remove('hidden').html(html);
    } else {
      $('#button').add('hidden').html('');
    }
  }

  function renderPickable() {
    const $ = window.jQuery;
    const pickable = new Set(['#button', '#d6']);
    const gems = Decktet.attributes().map(name => `#gems-${name}`);
    const levels = Decktet.attributes().map(name => `#level-${name}`);

    switch (Stage.get()) {
      case 'choice':
        pickable.add('#sign1');
        pickable.add('#sign2');
        break;

      case 'combat':
        if (!Obstacles.defeated()) {
          gems.forEach(id => pickable.add(id));
        }
        break;

      case 'level-up':
        levels.forEach(id => pickable.add(id));
        break;

      default:
        break;
    }

    const controls = new Set(['#d6', '#button', '#sign1', '#sign2'].concat(gems, levels));
    pickable.forEach((id) => {
      $(id).add('pickable');
      controls.delete(id);
    });
    controls.forEach((id) => {
      $(id).remove('pickable');
    });
  }

  function render() {
    if (dirty) {
      renderHero();
      renderBag();
      renderUsedItems();
      renderObstacles();
      renderGems();
      renderExperience();
      renderLevelUp();
      renderNarrative();
      renderButton();
      renderPickable();
      dirty = false;
    }

    requestAnimationFrame(render);
  }

  function invalidate() {
    dirty = true;
  }

  return {
    render,
    invalidate,
  };
}());

const Game = (function game() {
  let dice = [];

  function setPicked(element) {
    element.add('picked');
  }

  function onGems(element) {
    element.remove('picked');
    Stage.next(element.unwrap().id);
    Renderer.invalidate();
  }

  function onLevelUp(element) {
    element.remove('picked');
    Stage.next(element.unwrap().id);
    Renderer.invalidate();
  }

  function onButton(element) {
    element.remove('picked');
    Stage.next('items');
    Renderer.invalidate();
  }

  function onChoice(element) {
    element.remove('picked');
    Stage.next(element.unwrap().id);
    Renderer.invalidate();
  }

  function rollDice() {
    if (dice.length <= 0) {
      dice = ['d1', 'd2', 'd3', 'd4'];
      PRNG.shuffle(dice);
    }
    return dice.pop();
  }

  function onD6(element) {
    let html = '';
    html += `<span class="${rollDice()}"></span>`;
    html += `<span class="${rollDice()}"></span>`;
    element.html(html).remove('picked');
    Stage.next('d6');
    Renderer.invalidate();
  }

  function onDW() {
    const $ = window.jQuery;
    $('#world').toggle('dw');
  }

  function play() {
    const $ = window.jQuery;

    Decktet.attributes().forEach((name) => {
      $(`#gems-${name}`).touch(setPicked, onGems);
      $(`#level-${name}`).touch(setPicked, onLevelUp);
    });

    $('#button').touch(setPicked, onButton);
    $('#sign1').touch(setPicked, onChoice);
    $('#sign2').touch(setPicked, onChoice);
    $('#d6').touch(setPicked, onD6);
    $('#dw').touch(undefined, onDW);

    Stage.reset();
    Renderer.invalidate();
    Renderer.render();
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
      this.element.innerHTML = value;
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

  Fn.prototype.toggle = function toggle(klass) {
    if (this.element && this.element.classList) {
      this.element.classList.toggle(klass);
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
// **Epic Loot** is based on [_Tinker, Sailor, Soldier, Spy_][tsss], by
// Mike Richey.
//
// [js13k]: http://2017.js13kgames.com/ "Andrzej (js13kGames): HTML5 and JavaScript Game Development Competition in just 13 kilobytes"
// [tsss]: http://wiki.decktet.com/game:tinker-sailor-soldier-spy "Mike Richey (The Decktet Wiki): Tinker, Sailor, Soldier, Spy"
