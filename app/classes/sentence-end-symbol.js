import Symbol, { SymbolType } from 'analisador-slr/classes/symbol';

export default Symbol.extend({
  name: '$',
  type: SymbolType.SENTENCE_END
});
