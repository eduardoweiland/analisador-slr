import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import { SymbolType } from 'analisador-slr/classes/symbol';
import { Grammar, Production, Symbol } from 'analisador-slr/classes';

const { run } = Ember;

let grammar;
let S, A, B, a, b;
let p1, p2, p3, p4, p5, p6;

moduleFor('service:slr-analysis', 'Unit | Service | slr analysis', {
  // Specify the other units that are required for this test.
  needs: [],

  setup() {
    S = Symbol.create({ name: 'S', type: SymbolType.NON_TERMINAL });
    A = Symbol.create({ name: 'A', type: SymbolType.NON_TERMINAL });
    B = Symbol.create({ name: 'B', type: SymbolType.NON_TERMINAL });
    a = Symbol.create({ name: 'a', type: SymbolType.TERMINAL });
    b = Symbol.create({ name: 'b', type: SymbolType.TERMINAL });

    p1 = Production.create({ leftSide: S, rightSide: [A, B] });
    p2 = Production.create({ leftSide: A, rightSide: [a, B] });
    p3 = Production.create({ leftSide: A, rightSide: [b] });
    p4 = Production.create({ leftSide: B, rightSide: [A, b] });
    p5 = Production.create({ leftSide: B, rightSide: [b] });
    p6 = Production.create({ leftSide: B, rightSide: [A] });

    grammar = Grammar.create({
      terminalSymbols: [a, b],
      nonTerminalSymbols: [S, A, B],
      productions: [p1, p2, p3, p4, p5, p6],
      startSymbol: S
    });
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('augmented grammar', function(assert) {
  assert.expect(7);

  let service = this.subject();

  run(() => {
    service.augmentGrammar(grammar);
  });

  assert.equal(grammar.get('nonTerminalSymbols.length'), 4, 'New non-terminal symbol created');
  assert.equal(grammar.get('nonTerminalSymbols.0.name'), "S'", 'New symbol name is corret');
  assert.equal(grammar.get('productions.length'), 7, 'New production rule created');

  let firstProduction = grammar.get('productions').objectAt(0);
  let firstSymbolOnRight = firstProduction.get('rightSide').objectAt(0);
  assert.equal(firstProduction.get('leftSide.name'), "S'", 'The first production is the new one');
  assert.equal(firstProduction.get('rightSide.length'), 1, 'The new production has only one symbol');
  assert.equal(firstSymbolOnRight.get('name'), 'S', 'The new production generates the old start symbol');

  assert.equal(grammar.get('startSymbol.name'), "S'", 'Start symbol is the new symbol');
});
