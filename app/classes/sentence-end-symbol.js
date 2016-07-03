import Symbol, { SymbolType } from 'analisador-slr/classes/symbol';

/**
 * @class SentenceEndSymbol
 * @extends Symbol
 * @module classes
 */
export default Symbol.extend({
  name: '$',
  type: SymbolType.SENTENCE_END
});
