import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
import { SymbolType } from 'analisador-slr/models/symbol';

const { run } = Ember;

moduleForModel('grammar', 'Unit | Model | grammar', {
  // Specify the other units that are required for this test.
  needs: ['model:production', 'model:symbol'],

  setup() {
    let store = this.store();
    let S, A, B, a, b;

    run(() => {
      S = store.createRecord('symbol', { name: 'S', type: SymbolType.NON_TERMINAL });
      A = store.createRecord('symbol', { name: 'A', type: SymbolType.NON_TERMINAL });
      B = store.createRecord('symbol', { name: 'B', type: SymbolType.NON_TERMINAL });
      a = store.createRecord('symbol', { name: 'a', type: SymbolType.TERMINAL });
      b = store.createRecord('symbol', { name: 'b', type: SymbolType.TERMINAL });
    });

    run(() => {
      store.createRecord('production', { leftSide: S, rightSide: [A, B] });
      store.createRecord('production', { leftSide: A, rightSide: [a, B] });
      store.createRecord('production', { leftSide: A, rightSide: [b] });
      store.createRecord('production', { leftSide: B, rightSide: [A, b] });
      store.createRecord('production', { leftSide: B, rightSide: [b] });
      store.createRecord('production', { leftSide: B, rightSide: [A] });
    });
  }
});

test('grammar is valid', function(assert) {
  assert.expect(4);

  let symbols = this.store().peekAll('symbol');

  let model = this.subject({
    terminalSymbols: symbols.filterBy('isTerminal'),
    nonTerminalSymbols: symbols.filterBy('isNonTerminal'),
    startSymbol: symbols.filterBy('isNonTerminal')[0],
    productions: this.store().peekAll('production')
  });

  assert.equal(model.get('terminalSymbols.length'), 2);
  assert.equal(model.get('nonTerminalSymbols.length'), 3);
  assert.equal(model.get('startSymbol.name'), 'S');
  assert.equal(model.get('productions.length'), 6);
});
