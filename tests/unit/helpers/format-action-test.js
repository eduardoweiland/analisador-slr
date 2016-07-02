import { formatAction } from 'analisador-slr/helpers/format-action';
import { module, test } from 'qunit';
import Action, { ActionType } from 'analisador-slr/classes/action';

module('Unit | Helper | format action');

test('format shift actions', function(assert) {
  assert.expect(2);

  let action = Action.create({ type: ActionType.SHIFT, toState: 2 });
  let result = formatAction([action]);

  assert.ok(result.toLowerCase().contains('empilhar'));
  assert.ok(result.contains('2'));
});

test('format reduce actions', function(assert) {
  assert.expect(2);

  let action = Action.create({ type: ActionType.REDUCE, useProduction: 3 });
  let result = formatAction([action]);

  assert.ok(result.toLowerCase().contains('reduzir'));
  assert.ok(result.contains('3'));
});

test('format deviate actions', function(assert) {
  assert.expect(2);

  let action = Action.create({ type: ActionType.DEVIATE, toState: 4 });
  let result = formatAction([action]);

  assert.ok(result.toLowerCase().contains('desviar'));
  assert.ok(result.contains('4'));
});

test('format accept actions', function(assert) {
  assert.expect(1);

  let action = Action.create({ type: ActionType.ACCEPT });
  let result = formatAction([action]);

  assert.ok(result.toLowerCase().contains('aceitar'));
});
