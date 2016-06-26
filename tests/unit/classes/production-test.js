import { module, test } from 'qunit';
import { SymbolType } from 'analisador-slr/classes/symbol';
import { Production, Symbol } from 'analisador-slr/classes';

module('Unit | Class | production');

test('left side must be a non-terminal', function(assert) {
  assert.expect(2);

  let nonTerminalSymbol = Symbol.create({
    name: 'S',
    type: SymbolType.NON_TERMINAL
  });

  let terminalSymbol = Symbol.create({
    name: 'a',
    type: SymbolType.TERMINAL
  });

  let model = Production.create({
    leftSide: nonTerminalSymbol
  });

  assert.ok(model.get('isValidLeftSide'), 'left side is valid with non-terminal');

  model.set('leftSide', terminalSymbol);
  assert.notOk(model.get('isValidLeftSide'), 'left side is invalid with terminal');
});

test('right side is invalid when empty', function(assert) {
  assert.expect(1);

  let model = Production.create({
    rightSide: []
  });

  assert.notOk(model.get('isValidRightSide'));
});

test('right side is invalid when it contains an invalid symbol', function(assert) {
  assert.expect(1);

  let valid = Symbol.create({
    name: 'S',
    type: SymbolType.NON_TERMINAL
  });

  let invalid = Symbol.create({
    name: '',
    type: SymbolType.TERMINAL
  });

  let model = Production.create({
    rightSide: [valid, invalid]
  });

  assert.notOk(model.get('isValidRightSide'));
});
