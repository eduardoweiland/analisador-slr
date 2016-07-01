import { formatSentence } from 'analisador-slr/helpers/format-sentence';
import { module, test } from 'qunit';
import { Sentence, Symbol } from 'analisador-slr/classes';
import { SymbolType } from 'analisador-slr/classes/symbol';

module('Unit | Helper | format sentence');

test('format sentence with object symbols', function(assert) {
  assert.expect(1);

  let a = Symbol.create({ name: 'a', type: SymbolType.TERMINAL });
  let b = Symbol.create({ name: 'b', type: SymbolType.TERMINAL });
  let sentence = Sentence.create({ symbols: [a, b] });

  let result = formatSentence([sentence]);
  assert.equal(result, 'a b');
});

test('format sentence with string symbols', function(assert) {
  assert.expect(1);

  let sentence = Sentence.create({ symbols: ['a', 'b'] });

  let result = formatSentence([sentence]);
  assert.equal(result, 'a b');
});

test('format with object and string symbols mixed', function(assert) {
  assert.expect(1);

  let a = Symbol.create({ name: 'a', type: SymbolType.TERMINAL });
  let sentence = Sentence.create({ symbols: [a, 'b'] });

  let result = formatSentence([sentence]);
  assert.equal(result, 'a b');
});
