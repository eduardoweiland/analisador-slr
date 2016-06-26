import { module, test } from 'qunit';
import { SymbolType } from 'analisador-slr/classes/symbol';
import { CanonicItem } from 'analisador-slr/classes';

module('Unit | Class | canonic item');

test('canonic item has correct type', function(assert) {
  let item = CanonicItem.create();
  assert.equal(item.get('type'), SymbolType.ITEM);
});
