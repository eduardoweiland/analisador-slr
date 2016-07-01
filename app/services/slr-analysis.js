import Ember from 'ember';
import { Production, Sentence, Symbol, ItemMarker } from 'analisador-slr/classes';
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
      rightSide: Sentence.create({ symbols: [startSymbol] })
    });

    output.get('nonTerminalSymbols').unshiftObject(newSymbol);
    output.get('productions').unshiftObject(newProduction);
    output.set('startSymbol', newSymbol);

    return output;
  },

  /**
   * Adds the canonic item to the beginning of all productions of the grammar.
   *
   * @method addItemMarkers
   * @param {Grammar} grammar Grammar to be modified.
   * @public
   */
  addItemMarkers(grammar) {
    let output = copy(grammar, true);
    output.get('productions').forEach((production) => {
      production.get('rightSide.symbols').unshiftObject(ItemMarker.create());
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

      let rightSide = testProductions[i].get('rightSide.symbols');
      let afterItem = null;
      for (let j = 0; j < rightSide.length && !afterItem; ++j) {
        if (rightSide[j].get('type') === SymbolType.ITEM_MARKER) {
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
