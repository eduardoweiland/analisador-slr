import { module, test } from 'qunit';
import Action, { ActionType } from 'analisador-slr/classes/action';

module('Unit | Class | action');

test('can create an action', function(assert) {
  assert.expect(1);
  assert.ok(Action.create({
    type: ActionType.ACCEPT
  }));
});

test('throws an error when no type is specified on create', function(assert) {
  assert.expect(1);
  assert.throws(() => Action.create());
});
