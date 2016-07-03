import { formatAction } from 'analisador-slr/helpers/format-action';
import { module, test } from 'qunit';
import Action, { ActionType } from 'analisador-slr/classes/action';

module('Unit | Helper | format action');

test('format shift actions', function(assert) {
  assert.expect(2);

  let action = Action.create({ type: ActionType.SHIFT, toState: 2 });
  let result = formatAction([action]);

  assert.notEqual(result.toLowerCase().indexOf('empilhar'), -1);
  assert.notEqual(result.indexOf('2'), -1);
});

test('format reduce actions', function(assert) {
  assert.expect(2);

  let action = Action.create({ type: ActionType.REDUCE, useProduction: 3 });
  let result = formatAction([action]);

  assert.notEqual(result.toLowerCase().indexOf('reduzir'), -1);
  assert.notEqual(result.indexOf('3'), -1);
});

test('format deviate actions', function(assert) {
  assert.expect(2);

  let action = Action.create({ type: ActionType.DEVIATE, toState: 4 });
  let result = formatAction([action]);

  assert.notEqual(result.toLowerCase().indexOf('desviar'), -1);
  assert.notEqual(result.indexOf('4'), -1);
});

test('format accept actions', function(assert) {
  assert.expect(1);

  let action = Action.create({ type: ActionType.ACCEPT });
  let result = formatAction([action]);

  assert.notEqual(result.toLowerCase().indexOf('aceitar'), -1);
});
