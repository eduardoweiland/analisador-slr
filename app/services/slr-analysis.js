import Ember from 'ember';
import { CanonicItem, Production, Sentence, Symbol, ItemMarker } from 'analisador-slr/classes';
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
    let testProductions = copy(productions);
    let nonTerminalTested = A();

    for (let i = 0; i < testProductions.length; ++i) {
      if (!output.contains(testProductions[i])) {
        output.pushObject(testProductions[i]);
      }

      let afterItem = testProductions[i].get('rightSide').symbolAfterMarker();
      if (afterItem && afterItem.get('isNonTerminal') && !nonTerminalTested.contains(afterItem)) {
        testProductions.pushObjects(grammar.getProductionsFor(afterItem));
        nonTerminalTested.pushObject(afterItem);
      }
    }

    return output;
  },

  _isSameProduction(a, b) {
    if (a.get('leftSide.name') !== b.get('leftSide.name')) {
      return false;
    }

    if (a.get('rightSide.symbols.length') !== b.get('rightSide.symbols.length')) {
      return false;
    }

    let symbolsA = a.get('rightSide.symbols').mapBy('name');
    let symbolsB = b.get('rightSide.symbols').mapBy('name');
    for (let i = 0; i < symbolsA.length; ++i) {
      if (symbolsA[i] !== symbolsB[i]) {
        return false;
      }
    }

    return true;
  },

  _isCanonicItemIncluded(canonicItem, canonicSet) {
    let found = null;
    let itemProductions = canonicItem.get('parameters');

    canonicSet.forEach((item) => {
      if (item.get('alias')) {
        return;
      }
      let params = item.get('parameters');
      if (params.length === itemProductions.length) {
        for (let i = 0; i < itemProductions.length; ++i) {
          if (!this._isSameProduction(itemProductions[i], params[i])) {
            return;
          }
        }
        found = item;
      }
    });

    return found;
  },

  _getNextItems(item) {
    let productions = item.get('productions');
    let executionSet = A();

    for (let i = 0; i < productions.length; ++i) {
      let next = copy(productions[i], true);
      if (next.get('rightSide').advanceItemMarker()) {
        let inputSymbol = productions[i].get('rightSide').symbolAfterMarker();

        let existingItem = executionSet.findBy('inputSymbol.name', inputSymbol.get('name'));
        if (!existingItem) {
          existingItem = CanonicItem.create({
            inputSymbol: inputSymbol,
            startState: item.get('endState'),
            parameters: A()
          });
          executionSet.pushObject(existingItem);
        }

        existingItem.get('parameters').pushObject(next);
      }
    }

    return executionSet;
  },

  buildCanonicSet(grammar) {
    let resultingSet = A();
    let executionSet = [];
    let firstProduction = grammar.getProductionsFor(grammar.get('startSymbol'))[0];

    let firstItem = CanonicItem.create({
      parameters: A([firstProduction]),
      productions: this.closure([firstProduction], grammar)
    });

    executionSet.push(firstItem);

    let endState = 0;
    for (let i = 0; i < executionSet.length && i < 30; ++i) {
      let alreadyIncludedItem = this._isCanonicItemIncluded(executionSet[i], resultingSet);
      if (alreadyIncludedItem) {
        executionSet[i].set('alias', alreadyIncludedItem);
      }
      else {
        executionSet[i].set('endState', endState++);
        executionSet[i].set('productions', this.closure(executionSet[i].get('parameters'), grammar));
        executionSet.pushObjects(this._getNextItems(executionSet[i]));
      }
      resultingSet.pushObject(executionSet[i]);
    }

    return resultingSet;
  }
});
