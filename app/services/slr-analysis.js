import Ember from 'ember';
import { Production, Symbol, CanonicItem } from 'analisador-slr/classes';
import { SymbolType } from 'analisador-slr/classes/symbol';

const { Service, copy } = Ember;

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
    let output = copy(grammar, true);
    let startSymbol = output.get('startSymbol');

    let newSymbol = Symbol.create({
      name: `${startSymbol.get('name')}'`,
      type: SymbolType.NON_TERMINAL
    });

    let newProduction = Production.create({
      leftSide: newSymbol,
      rightSide: [startSymbol]
    });

    output.get('nonTerminalSymbols').unshiftObject(newSymbol);
    output.get('productions').unshiftObject(newProduction);
    output.set('startSymbol', newSymbol);

    return output;
  },

  /**
   * Adds the canonic item to the beginning of all productions of the grammar.
   *
   * @method addCanonicItems
   * @param {Grammar} grammar Grammar to be modified.
   * @public
   */
  addCanonicItems(grammar) {
    let output = copy(grammar, true);
    output.get('productions').forEach((production) => {
      production.get('rightSide').unshiftObject(CanonicItem.create());
    });
    return output;
  }
});
