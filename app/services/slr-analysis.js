import Ember from 'ember';
import { Action, CanonicItem, Production, Sentence, SentenceEndSymbol, Symbol, ItemMarker } from 'analisador-slr/classes';
import { SymbolType } from 'analisador-slr/classes/symbol';
import { ActionType } from 'analisador-slr/classes/action';
import ParsingTable from 'analisador-slr/classes/parsing-table';

const { A, Service, copy, isNone } = Ember;

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

  _isSameProduction(a, b, ignoreMarker = false) {
    if (a.get('leftSide.name') !== b.get('leftSide.name')) {
      return false;
    }

    let symbolsA = a.get('rightSide.symbols');
    let symbolsB = b.get('rightSide.symbols');

    if (ignoreMarker) {
      symbolsA = symbolsA.filter((symbol) => symbol.get('type') !== SymbolType.ITEM_MARKER);
      symbolsB = symbolsB.filter((symbol) => symbol.get('type') !== SymbolType.ITEM_MARKER);
    }

    if (symbolsA.get('length') !== symbolsB.get('length')) {
      return false;
    }

    for (let i = 0; i < symbolsA.get('length'); ++i) {
      if (symbolsA[i].get('name') !== symbolsB[i].get('name')) {
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
  },

  first(symbol, grammar) {
    let first = A();

    grammar.getProductionsFor(symbol).forEach((production) => {
      let right = production.get('rightSide.symbols');

      right.forEach((sentenceSymbol) => {
        // If symbol is a terminal, append it to first and stop processing this production
        if (sentenceSymbol.get('isTerminal')) {
          first.pushObject(sentenceSymbol);
          return false;
        }

        // If symbol is a non-terminal, append the first of it to first
        if (sentenceSymbol.get('isNonTerminal') && sentenceSymbol.get('name') !== symbol.get('name')) {
          first.pushObjects(this.first(sentenceSymbol, grammar));

          // As we don't support empty sentence now, there is no need to look for next symbols...
          return false;
        }
      });
    });

    return first;
  },

  follow(symbol, grammar, cache = {}) {
    let follow = A();
    let symbolName = symbol.get('name');

    if (cache[symbolName]) {
      return cache[symbolName];
    }

    cache[symbolName] = follow;

    if (symbolName === grammar.get('startSymbol.name')) {
      follow.pushObject(SentenceEndSymbol.create());
    }

    grammar.get('productions').forEach((production) => {
      let left = production.get('leftSide');
      let right = production.get('rightSide.symbols');

      right.forEach((sentenceSymbol, index) => {
        if (symbolName === sentenceSymbol.get('name')) {
          // If symbol is at the end of the production, append follow of leftSide
          if (index === right.get('length') - 1) {
            if (left.get('name') !== symbolName) {
              follow.pushObjects(this.follow(left, grammar, cache));
            }
            return;
          }

          // If symbol is followed by a terminal, append it to follow
          if (right[index + 1].get('isTerminal')) {
            follow.pushObject(right[index + 1]);
            return;
          }

          // If symbol is followed by a non-terminal, append the first of it to follow
          if (right[index + 1].get('isNonTerminal')) {
            follow.pushObjects(this.first(right[index + 1], grammar));

            // As we don't support empty sentence now, there is no need to look for next symbols...
          }
        }
      });
    });

    return follow;
  },

  buildParsingTable(grammar, canonicItems) {
    let table = ParsingTable.create({ grammar, canonicItems });

    canonicItems.forEach((item) => {
      let endState = isNone(item.get('alias')) ? item.get('endState') : item.get('alias.endState');

      // Add DEVIATE actions
      if (item.get('inputSymbol.isNonTerminal')) {
        table.addAction(item.get('startState'), item.get('inputSymbol'), Action.create({
          type: ActionType.DEVIATE,
          toState: endState
        }));
      }

      // Add SHIFT actions
      if (item.get('inputSymbol.isTerminal')) {
        table.addAction(item.get('startState'), item.get('inputSymbol'), Action.create({
          type: ActionType.SHIFT,
          toState: endState
        }));
      }

      // Add REDUCE and ACCEPT actions
      item.get('productions').forEach((production) => {
        if (production.get('rightSide').indexOfMarker() === production.get('rightSide.symbols.length') - 1) {
          if (!grammar.get('productions').findBy('leftSide.name', production.get('leftSide.name'))) {
            // Augmented production -> ACCEPT sentence
            table.addAction(item.get('endState'), SentenceEndSymbol.create(), Action.create({
              type: ActionType.ACCEPT
            }));
          }
          else {
            let follow = this.follow(production.get('leftSide'), grammar);

            grammar.get('productions').forEach((grammarProduction, index) => {
              if (this._isSameProduction(production, grammarProduction, true)) {
                follow.forEach((symbol) => {
                  table.addAction(item.get('endState'), symbol, Action.create({
                    type: ActionType.REDUCE,
                    useProduction: index + 1
                  }));
                });
              }
            });
          }
        }
      });
    });

    return table;
  }
});
