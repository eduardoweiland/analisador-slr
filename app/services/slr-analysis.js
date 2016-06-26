import Ember from 'ember';
import { Production, Symbol } from 'analisador-slr/classes';
import { SymbolType } from 'analisador-slr/classes/symbol';

const { Service } = Ember;

/**
 * SLR Analysis implementation.
 *
 * @class SlrAnalysys
 * @extends Ember.Service
 */
export default Service.extend({
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

    let newSymbol = Symbol.create({
      name: `${startSymbol.get('name')}'`,
      type: SymbolType.NON_TERMINAL
    });

    let newProduction = Production.create({
      leftSide: newSymbol,
      rightSide: [startSymbol]
    });

    grammar.get('nonTerminalSymbols').unshiftObject(newSymbol);
    grammar.get('productions').unshiftObject(newProduction);
    grammar.set('startSymbol', newSymbol);
  }
});
