import { module, test } from 'qunit';
import { SymbolType } from 'analisador-slr/classes/symbol';
import { ItemMarker } from 'analisador-slr/classes';

module('Unit | Class | item marker');

test('canonic item marker has correct type', function(assert) {
  assert.expect(1);

  let item = ItemMarker.create();
  assert.equal(item.get('type'), SymbolType.ITEM_MARKER);
});
