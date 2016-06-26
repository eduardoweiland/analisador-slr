import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import { SymbolType } from 'analisador-slr/models/symbol';

const { run } = Ember;

let grammar;

moduleFor('service:slr-analysis', 'Unit | Service | slr analysis', {
  // Specify the other units that are required for this test.
  needs: ['model:grammar', 'model:production', 'model:symbol'],

  setup() {
    let store = this.container.lookup('service:store');
    let S, A, B, a, b;
    let p1, p2, p3, p4, p5, p6;

    run(() => {
      S = store.createRecord('symbol', { name: 'S', type: SymbolType.NON_TERMINAL });
      A = store.createRecord('symbol', { name: 'A', type: SymbolType.NON_TERMINAL });
      B = store.createRecord('symbol', { name: 'B', type: SymbolType.NON_TERMINAL });
      a = store.createRecord('symbol', { name: 'a', type: SymbolType.TERMINAL });
      b = store.createRecord('symbol', { name: 'b', type: SymbolType.TERMINAL });
    });

    run(() => {
      p1 = store.createRecord('production', { leftSide: S, rightSide: [A, B] });
      p2 = store.createRecord('production', { leftSide: A, rightSide: [a, B] });
      p3 = store.createRecord('production', { leftSide: A, rightSide: [b] });
      p4 = store.createRecord('production', { leftSide: B, rightSide: [A, b] });
      p5 = store.createRecord('production', { leftSide: B, rightSide: [b] });
      p6 = store.createRecord('production', { leftSide: B, rightSide: [A] });
    });

    run(() => {
      grammar = store.createRecord('grammar', {
        terminalSymbols: [a, b],
        nonTerminalSymbols: [S, A, B],
        productions: [p1, p2, p3, p4, p5, p6],
        startSymbol: S
      });
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
