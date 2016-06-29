import Ember from 'ember';
import { Production, Symbol, CanonicItem } from 'analisador-slr/classes';
import { SymbolType } from 'analisador-slr/classes/symbol';

const { A, Service, copy } = Ember;

/**
 * SLR Analysis implementation.
 *
 * @class SlrAnalysys
 * @extends Ember.Service
 */
export default Service.extend({
  /**
   * Original grammar used for the analysis.
   * @property grammar
   * @type Grammar
   * @public
   */
  grammar: null,

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
  },

  /**
   * Implementation of the closure function in the analyzer.
   *
   * @param {Production[]} productions Array with productions to apply the closure function.
   * @param {Grammar} grammar Grammar with all production rules available.
   * @return {Production[]} Array with productions after applying the closure function.
   */
  closure(productions, grammar) {
    let output = A();
    let testProductions = productions;

    for (let i = 0; i < testProductions.length; ++i) {
      if (!output.contains(testProductions[i])) {
        output.pushObject(testProductions[i]);
      }

      let rightSide = testProductions[i].get('rightSide');
      let afterItem = null;
      for (let j = 0; j < rightSide.length; ++j) {
        if (rightSide[j].get('type') === SymbolType.ITEM) {
          afterItem = rightSide[j + 1];
        }
      }

      if (afterItem && afterItem.get('isNonTerminal')) {
        testProductions.pushObjects(grammar.getProductionsFor(afterItem));
      }
    }

    return output;
  }
});
