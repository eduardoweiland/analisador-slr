import Ember from 'ember';
import { SymbolType } from 'analisador-slr/models/symbol';

const { Service, inject } = Ember;

/**
 * SLR Analysis implementation.
 *
 * @class SlrAnalysys
 * @extends Ember.Service
 */
export default Service.extend({
  store: inject.service('store'),

  /**
   * Modifies the grammar to be an augmented grammar (i.e. adds a new
   * production replacing the start symbol).
   *
   * @method augmentGrammar
   * @param {Grammar} grammar Grammar to be augmented.
   * @public
   */
  augmentGrammar(grammar) {
    let startSymbol = grammar.get('startSymbol');

    let newSymbol = this.get('store').createRecord('symbol', {
      name: `${startSymbol.get('name')}'`,
      type: SymbolType.NON_TERMINAL
    });

    let newProduction = this.get('store').createRecord('production', {
      leftSide: newSymbol,
      rightSide: [startSymbol]
    });

    grammar.get('nonTerminalSymbols').unshiftObject(newSymbol);
    grammar.get('productions').unshiftObject(newProduction);
    grammar.set('startSymbol', newSymbol);
  }
});
