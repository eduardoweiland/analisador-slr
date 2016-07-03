import { module, test } from 'qunit';
import { SymbolType } from 'analisador-slr/classes/symbol';
import { CanonicItem, Grammar, ParsingTable, Production, Sentence, Symbol } from 'analisador-slr/classes';

let S, A, a;
let p1, p2, p3;
let ci1, ci2, ci3, ci4;
let grammar, canonicItems;

module('Unit | Class | parsing table', {
  setup() {
    S = Symbol.create({ name: 'S', type: SymbolType.NON_TERMINAL });
    A = Symbol.create({ name: 'A', type: SymbolType.NON_TERMINAL });
    a = Symbol.create({ name: 'a', type: SymbolType.TERMINAL });

    p1 = Production.create({ leftSide: S, rightSide: Sentence.create({ symbols: [A] }) });
    p2 = Production.create({ leftSide: A, rightSide: Sentence.create({ symbols: [a] }) });
    p3 = Production.create({ leftSide: A, rightSide: Sentence.create({ symbols: [a, A] }) });

    ci1 = CanonicItem.create({ endState: 0, inputSymbol: S, parameters: [p1], productions: [p1, p2]});
    ci2 = CanonicItem.create({ startState: 0, endState: 1, inputSymbol: A, parameters: [p2], productions: [p2, p3]});
    ci3 = CanonicItem.create({ startState: 0, endState: 2, inputSymbol: a, parameters: [p3], productions: [p2, p3]});
    ci4 = CanonicItem.create({ startState: 1, inputSymbol: A, parameters: [p2, p3], alias: ci2});

    canonicItems = [ci1, ci2, ci3, ci4];

    grammar = Grammar.create({
      terminalSymbols: [a],
      nonTerminalSymbols: [S, A],
      startSymbol: S,
      productions: [p1, p2, p3]
    });
  }
});

test('creates rows for all states', function(assert) {
  assert.expect(2);

  let table = ParsingTable.create({ grammar, canonicItems });
  assert.equal(table.get('rows.length'), 3);
  assert.deepEqual(table.get('rows').mapBy('state'), [0, 1, 2]);
});

test('creates columns for all actions', function(assert) {
  assert.expect(2);

  let table = ParsingTable.create({ grammar, canonicItems });
  assert.equal(table.get('actionColumns.length'), 2);
  assert.deepEqual(table.get('actionColumns').mapBy('valuePath'), ['action_a', 'action_$']);
});

test('creates columns for all deviations', function(assert) {
  assert.expect(2);

  let table = ParsingTable.create({ grammar, canonicItems });
  assert.equal(table.get('deviateColumns.length'), 2);
  assert.deepEqual(table.get('deviateColumns').mapBy('valuePath'), ['action_S', 'action_A']);
});
