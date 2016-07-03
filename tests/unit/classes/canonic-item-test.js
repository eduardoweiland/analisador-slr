import { module, test } from 'qunit';
import CanonicItem from 'analisador-slr/classes/canonic-item';

module('Unit | Class | canonic item');

test('can create a canonic item', function(assert) {
  assert.expect(1);
  assert.ok(CanonicItem.create());
});
