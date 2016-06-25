import { moduleForModel, test } from 'ember-qunit';
import { SymbolType } from 'analisador-slr/models/symbol';

moduleForModel('symbol', 'Unit | Model | symbol', {
  // Specify the other units that are required for this test.
  needs: []
});

test('empty symbol name is invalid', function(assert) {
  assert.expect(3);

  let model = this.subject({
    name: '',
    type: SymbolType.TERMINAL
  });

  assert.notOk(model.get('isValidName'));
  assert.ok(model.get('isValidType'));
  assert.notOk(model.get('isValid'));
});

test('empty type is invalid', function(assert) {
  assert.expect(3);

  let model = this.subject({
    name: 'a',
    type: ''
  });

  assert.ok(model.get('isValidName'));
  assert.notOk(model.get('isValidType'));
  assert.notOk(model.get('isValid'));
});

test('invalid type', function(assert) {
  assert.expect(3);

  let model = this.subject({
    name: 'a',
    type: 'INVALID'
  });

  assert.ok(model.get('isValidName'));
  assert.notOk(model.get('isValidType'));
  assert.notOk(model.get('isValid'));
});

test('valid terminal symbol', function(assert) {
  assert.expect(3);

  let model = this.subject({
    name: 'a',
    type: SymbolType.TERMINAL
  });

  assert.ok(model.get('isValidName'));
  assert.ok(model.get('isValidType'));
  assert.ok(model.get('isValid'));
});

test('valid non-terminal symbol', function(assert) {
  assert.expect(3);

  let model = this.subject({
    name: 'A',
    type: SymbolType.NON_TERMINAL
  });

  assert.ok(model.get('isValidName'));
  assert.ok(model.get('isValidType'));
  assert.ok(model.get('isValid'));
});
