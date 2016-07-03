import Ember from 'ember';
import { Grammar, Production, Sentence, Symbol } from 'analisador-slr/classes';
import { SymbolType } from 'analisador-slr/classes/symbol';

const { Controller, computed, copy, inject: { service } } = Ember;

export default Controller.extend({
  provider: service('provider'),
  grammar: computed.alias('provider.grammar'),

  example1: computed(function() {
    let ntS = Symbol.create({ name: 'S', type: SymbolType.NON_TERMINAL });
    let ntL = Symbol.create({ name: 'L', type: SymbolType.NON_TERMINAL });
    let ntE = Symbol.create({ name: 'E', type: SymbolType.NON_TERMINAL });

    let tWhile = Symbol.create({ name: 'while', type: SymbolType.TERMINAL });
    let tDo = Symbol.create({ name: 'do', type: SymbolType.TERMINAL });
    let tBegin = Symbol.create({ name: 'begin', type: SymbolType.TERMINAL });
    let tEnd = Symbol.create({ name: 'end', type: SymbolType.TERMINAL });
    let tA = Symbol.create({ name: 'a', type: SymbolType.TERMINAL });
    let tB = Symbol.create({ name: 'b', type: SymbolType.TERMINAL });
    let tComma = Symbol.create({ name: ';', type: SymbolType.TERMINAL });

    let p1 = Production.create({ leftSide: ntS, rightSide: Sentence.create({ symbols: [tWhile, ntE, tDo, ntS] }) });
    let p2 = Production.create({ leftSide: ntS, rightSide: Sentence.create({ symbols: [tBegin, ntL, tEnd] }) });
    let p3 = Production.create({ leftSide: ntS, rightSide: Sentence.create({ symbols: [tA] }) });
    let p4 = Production.create({ leftSide: ntL, rightSide: Sentence.create({ symbols: [ntL, tComma, ntS] }) });
    let p5 = Production.create({ leftSide: ntL, rightSide: Sentence.create({ symbols: [ntS] }) });
    let p6 = Production.create({ leftSide: ntE, rightSide: Sentence.create({ symbols: [tB] }) });

    let grammar = Grammar.create({
      nonTerminalSymbols: [ntS, ntL, ntE],
      terminalSymbols: [tWhile, tDo, tBegin, tEnd, tA, tB, tComma],
      startSymbol: ntS,
      productions: [p1, p2, p3, p4, p5, p6]
    });

    return grammar;
  }),

  example2: computed(function() {
    let ntS = Symbol.create({ name: 'S', type: SymbolType.NON_TERMINAL });
    let ntL = Symbol.create({ name: 'L', type: SymbolType.NON_TERMINAL });

    let tA = Symbol.create({ name: 'a', type: SymbolType.TERMINAL });
    let tOpen = Symbol.create({ name: '[', type: SymbolType.TERMINAL });
    let tClose = Symbol.create({ name: ']', type: SymbolType.TERMINAL });
    let tComma = Symbol.create({ name: ';', type: SymbolType.TERMINAL });

    let p1 = Production.create({ leftSide: ntS, rightSide: Sentence.create({ symbols: [tA] }) });
    let p2 = Production.create({ leftSide: ntS, rightSide: Sentence.create({ symbols: [tOpen, ntL, tClose] }) });
    let p3 = Production.create({ leftSide: ntL, rightSide: Sentence.create({ symbols: [ntL, tComma, ntS] }) });
    let p4 = Production.create({ leftSide: ntL, rightSide: Sentence.create({ symbols: [ntS] }) });

    let grammar = Grammar.create({
      nonTerminalSymbols: [ntS, ntL],
      terminalSymbols: [tA, tOpen, tClose, tComma],
      startSymbol: ntS,
      productions: [p1, p2, p3, p4]
    });

    return grammar;
  }),

  actions: {
    next() {
      this.transitionToRoute('analysis');
    },

    loadExample(grammar) {
      this.set('grammar', copy(grammar, true));
    }
  }
});
