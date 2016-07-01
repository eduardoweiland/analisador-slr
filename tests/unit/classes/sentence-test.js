import { module, test } from 'qunit';
import { SymbolType } from 'analisador-slr/classes/symbol';
import { ItemMarker, Sentence, Symbol } from 'analisador-slr/classes';

module('Unit | Class | sentence');

test('advanceItemMarker advances the marker by one symbol', function(assert) {
  assert.expect(2);

  let item = ItemMarker.create();
  let a = Symbol.create({ name: 'a', type: SymbolType.TERMINAL });
  let b = Symbol.create({ name: 'b', type: SymbolType.TERMINAL });
  let sentence = Sentence.create({ symbols: [a, item, b] });

  assert.ok(sentence.advanceItemMarker(), 'advanceItemMarker returned true');
  assert.deepEqual(sentence.get('symbols'), [a, b, item], 'symbols in the sentence are in the correct order');
});

test('advanceItemMarker returns false when the marker is at the end', function(assert) {
  assert.expect(2);

  let item = ItemMarker.create();
  let a = Symbol.create({ name: 'a', type: SymbolType.TERMINAL });
  let b = Symbol.create({ name: 'b', type: SymbolType.TERMINAL });
  let sentence = Sentence.create({ symbols: [a, b, item] });

  assert.notOk(sentence.advanceItemMarker(), 'advanceItemMarker returned false');
  assert.deepEqual(sentence.get('symbols'), [a, b, item], 'symbols in the sentence are in the correct order');
});
