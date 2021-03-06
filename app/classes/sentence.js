import Ember from 'ember';
import { SymbolType } from 'analisador-slr/classes/symbol';

const { A, Copyable, copy, isNone } = Ember;

/**
 * @class Sentence
 * @extends Ember.Object
 * @uses Ember.Copyable
 * @module classes
 */
const Sentence = Ember.Object.extend(Copyable, {
  /**
   * Array of symbols that build this sentence.
   *
   * @property symbols
   * @type Symbol[]
   * @public
   */
  symbols: A(),

  /**
   * Finds the position of the item marker in this sentence.
   *
   * @method indexOfMarker
   * @return {Number} Index of the item marker or -1 if not found.
   */
  indexOfMarker() {
    let marker = this.get('symbols').findBy('type', SymbolType.ITEM_MARKER);

    if (marker) {
      return this.get('symbols').indexOf(marker);
    }

    return -1;
  },

  /**
   * Advances the item marker inside the sentence, if it is not already in
   * the end.
   *
   * @return {Boolean} Returns `true` if the marker was advanced or `false`
   * if it was already in the end of the sentence.
   */
  advanceItemMarker() {
    let symbols = this.get('symbols');
    let index = this.indexOfMarker();

    if ((index > -1) && (index < symbols.length - 1)) {
      let marker = symbols.objectAt(index);
      symbols.removeAt(index, 1);
      symbols.insertAt(index + 1, marker);
      return true;
    }

    return false;
  },

  /**
   * Finds the symbol that is after the canonic item marker.
   *
   * @return {Symbol} The symbol after the item marker, or `null` if nothing is found.
   */
  symbolAfterMarker() {
    let symbols = this.get('symbols');

    for (let i = 0; i < symbols.length; ++i) {
      if ((symbols[i].get('type') === SymbolType.ITEM_MARKER) && !isNone(symbols[i + 1])) {
        return symbols[i + 1];
      }
    }

    return null;
  },

  copy(deep) {
    let symbols = this.get('symbols');

    if (deep) {
      symbols = copy(symbols, deep);
    }

    return Sentence.create({
      symbols
    });
  }
});

export default Sentence;
