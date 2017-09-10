# Epic Loot #

Epic Loot is a mobile and desktop game for the [2017 js13kGames competition][js13k].
It's a game about wondering through a forest, picking mushrooms, and scaring
away monsters by throwing loot at them. But not that boring junk loot you
usually find in a RPG. This is epic loot. The kind of loot where your helmet is
a Greater Leather Coif of Smiting with +6 Strength and +6 Charm.

Also, if you're left handed, make sure you pick up the Dual Wielding skill.

There's a rambling soft of "why things are the way they are" comemntary in
[the documentation][docs]. It's full of design decision points and is worth
reading if you like developer diaries.

## Credits ##

Epic Loot is based on Mike Richey's [Decktet][] game [Tinker, Sailor, Soldier, Spy][tsss].
Here's the salient bits that changed:

* You start with nine tokens of each suit instead of six.
* You get your pick of aces when it's time to add one to your deck.
* If you exhausted your deck at least once during an encounter, you add an ace to your deck at the end of that encounter.
* You get a token of the same suit when adding an ace to your deck.
* You can have a maximum of nine tokens of each suit.
* Every play from your deck costs a token, even the first one.
* You can no longer flee from encounters with Personalities or Events.
* You start your deck with four Personalities of your choice.
* The four Personalities you start with must have at least one of each suit between them.
* For purposes of encounters, the Excuse counts as a zero value Personality.
* Locations start shuffled, so you don't know when the Origin or End will show up.
* You draw Locations two at a time and pick one to encounter.
* Unencountered Locations are shuffled back into the Locations pile once it's exhausted.
* You can look at the cards in your deck at any time.
* You must shuffle your deck after looking at the cards in it.

These changes where driven by several design goals:

* Available choices should be consistent through the life of the game.
* Losses should feel like "I made the wrong choice" not "I drew bad cards".

### Technology ###

Epic Loot uses a pseudo random number generator based on the one described in the paper,
_A New Class of Invertible Mappings_, by Alexander Klimov and Adi Shamer. The `shuffle()`
function is the same Fisher-Yates shuffle that [Mike Bostock delightfully animates][fys].

### Graphics ###

The sprites are edits and recolors of [Jerom's 32x32 fantasy tileset][sprites].
They're under the same [CC BY-SA 3.0][ccas] license as the originals. All the
other graphics were created with HTML5 and CSS3. The paper design comes from
[Craig Butler's tutorial on drawing paper curls][paper]. The random offsets on
gems come from [Paul Underwood's randomized photographs][offset]. The gems
themselves are based on [F. Stephen Kirschbaum's CSS LED lights][led], but
without the glow effect. The dice are my own design.

### Colors ###

Colors for the gems were chosen from [Martin Krzywinski's notes on palettes for
color blindness][color].

## Compatibility ##

Epic Loot works in the following browsers:

### Mobile (iOS)  ###

* Chrome 61.0.3163.73
* Safari 10.0
* Firefox 8.3
* Opera 16.0.1

### Desktop ###

* Chrome 61.0.3163.79
* Safari 10.1.2
* Firefox 55.0.3
* Opera 47.0

## License ##

All code is licensed under a MIT license. See the LICENSE file for more details.
Most graphics are licensed under some form of Creative Commons license. See the
"Graphics" section of this README for more details. The game and text are licensed
under the same [CC BY-NC-SA 3.0][ccans] license as the [Decktet][].


[js13k]: http://2017.js13kgames.com/ "Andrzej (js13kGames): HTML5 and JavaScript Game Development Competition in just 13 kilobytes"
[docs]: https://onefrankguy.github.io/epic-loot/ "Frank Mitchell (GitHub): Documentation for Epic Loot"
[fys]: https://bost.ocks.org/mike/shuffle/ "Mike Bostock: Fisher-Yates Shuffle"
[sprites]: https://opengameart.org/content/32x32-fantasy-tileset "Jerom (OpenGameArt): 32x32 Fantasy Tileset"
[ccas]: http://creativecommons.org/licenses/by-sa/3.0/ "Creative Commons - Attribution-ShareAlike 3.0 Unported"
[paper]: https://www.sitepoint.com/pure-css3-paper-curls/ "Craig Butler (SitePoint): How to Create CSS3 Paper Curls Without Images"
[offset]: https://paulund.co.uk/create-polaroid-image-with-css "Paul Underwood (Paulund): Create Polaroid Image with CSS"
[led]: https://codepen.io/fskirschbaum/pen/MYJNaj "F. Stephen Kirschbaum (CodePen): CSS LED Lights"
[color]: http://mkweb.bcgsc.ca/colorblind/ "Martin Krzywinski (Genome Sciences Center): Color Palettes for Color Blindness"
[ccans]: https://creativecommons.org/licenses/by-nc-sa/3.0/ "Creative Commons - Attribution-NonCommercial-ShareAlike 3.0 Unported"
[Decktet]: http://www.decktet.com/ "P.D. Magnus (The Decktet): A unique deck of cards"
[tsss]: http://wiki.decktet.com/game:tinker-sailor-soldier-spy "Mike Richey (The Decktet Wiki): Tinker, Sailor, Soldier, Spy"
