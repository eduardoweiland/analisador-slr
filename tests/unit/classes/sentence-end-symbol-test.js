import { module, test } from 'qunit';
import { SymbolType } from 'analisador-slr/classes/symbol';
import { SentenceEndSymbol } from 'analisador-slr/classes';

module('Unit | Class | sentence end symbol');

test('sentence end symbol has correct name and type', function(assert) {
  assert.expect(2);

  let symbol = SentenceEndSymbol.create();
  assert.equal(symbol.get('type'), SymbolType.SENTENCE_END);
  assert.equal(symbol.get('name'), '$');
});
