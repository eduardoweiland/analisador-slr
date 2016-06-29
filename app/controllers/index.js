import Ember from 'ember';
import { Grammar, Production, Symbol } from 'analisador-slr/classes';
import { SymbolType } from 'analisador-slr/classes/symbol';

export default Ember.Controller.extend({
  provider: Ember.inject.service('provider'),
  grammar: Ember.computed.alias('provider.grammar'),

  actions: {
    next() {
      this.transitionToRoute('analysis');
    },

    loadExample() {
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

      let p1 = Production.create({ leftSide: ntS, rightSide: [tWhile, ntE, tDo, ntS] });
      let p2 = Production.create({ leftSide: ntS, rightSide: [tBegin, ntL, tEnd] });
      let p3 = Production.create({ leftSide: ntS, rightSide: [tA] });
      let p4 = Production.create({ leftSide: ntL, rightSide: [ntL, tComma, ntS] });
      let p5 = Production.create({ leftSide: ntL, rightSide: [ntS] });
      let p6 = Production.create({ leftSide: ntE, rightSide: [tB] });

      let grammar = Grammar.create({
        nonTerminalSymbols: [ntS, ntL, ntE],
        terminalSymbols: [tWhile, tDo, tBegin, tEnd, tA, tB, tComma],
        startSymbol: ntS,
        productions: [p1, p2, p3, p4, p5, p6]
      });

      this.set('grammar', grammar);
    }
  }
});
