import Symbol, { SymbolType } from 'analisador-slr/classes/symbol';

/**
 * @class ItemMarker
 * @extends Symbol
 * @module classes
 */
export default Symbol.extend({
  name: '\u2022',
  type: SymbolType.ITEM_MARKER
});
