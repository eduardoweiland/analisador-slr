import { module, test } from 'qunit';
import { SymbolType } from 'analisador-slr/classes/symbol';
import { Grammar, Production, Sentence, Symbol } from 'analisador-slr/classes';

let S, A, B, a, b;
let p1, p2, p3, p4, p5, p6;

module('Unit | Class | grammar', {
  setup() {
    S = Symbol.create({ name: 'S', type: SymbolType.NON_TERMINAL });
    A = Symbol.create({ name: 'A', type: SymbolType.NON_TERMINAL });
    B = Symbol.create({ name: 'B', type: SymbolType.NON_TERMINAL });
    a = Symbol.create({ name: 'a', type: SymbolType.TERMINAL });
    b = Symbol.create({ name: 'b', type: SymbolType.TERMINAL });

    p1 = Production.create({ leftSide: S, rightSide: Sentence.create({ symbols: [A, B] }) });
    p2 = Production.create({ leftSide: A, rightSide: Sentence.create({ symbols: [a, B] }) });
    p3 = Production.create({ leftSide: A, rightSide: Sentence.create({ symbols: [b] }) });
    p4 = Production.create({ leftSide: B, rightSide: Sentence.create({ symbols: [A, b] }) });
    p5 = Production.create({ leftSide: B, rightSide: Sentence.create({ symbols: [b] }) });
    p6 = Production.create({ leftSide: B, rightSide: Sentence.create({ symbols: [A] }) });
  }
});

test('grammar is valid', function(assert) {
  assert.expect(4);

  let model = Grammar.create({
    terminalSymbols: [a, b],
    nonTerminalSymbols: [S, A, B],
    startSymbol: S,
    productions: [p1, p2, p3, p4, p5, p6]
  });

  assert.equal(model.get('terminalSymbols.length'), 2);
  assert.equal(model.get('nonTerminalSymbols.length'), 3);
  assert.equal(model.get('startSymbol.name'), 'S');
  assert.equal(model.get('productions.length'), 6);
});
