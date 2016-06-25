import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
import { SymbolType } from 'analisador-slr/models/symbol';

const { run } = Ember;

moduleForModel('production', 'Unit | Model | production', {
  // Specify the other units that are required for this test.
  needs: ['model:symbol']
});

test('left side must be a non-terminal', function(assert) {
  assert.expect(2);

  let nonTerminalSymbol, terminalSymbol;

  run(() => {
    nonTerminalSymbol = this.store().createRecord('symbol', {
      name: 'S',
      type: SymbolType.NON_TERMINAL
    });

    terminalSymbol = this.store().createRecord('symbol', {
      name: 'a',
      type: SymbolType.TERMINAL
    });
  });

  let model = this.subject({
    leftSide: nonTerminalSymbol
  });

  assert.ok(model.get('isValidLeftSide'), 'left side is valid with non-terminal');

  run(() => {
    model.set('leftSide', terminalSymbol);
    assert.notOk(model.get('isValidLeftSide'), 'left side is invalid with terminal');
  });
});

test('right side is invalid when empty', function(assert) {
  assert.expect(1);

  let model = this.subject({
    rightSide: []
  });

  assert.notOk(model.get('isValidRightSide'));
});

test('right side is invalid when it contains an invalid symbol', function(assert) {
  assert.expect(1);

  let valid, invalid;

  run(() => {
    valid = this.store().createRecord('symbol', {
      name: 'S',
      type: SymbolType.NON_TERMINAL
    });

    invalid = this.store().createRecord('symbol', {
      name: '',
      type: SymbolType.TERMINAL
    });
  });

  let model = this.subject({
    rightSide: [valid, invalid]
  });

  assert.notOk(model.get('isValidRightSide'));
});
