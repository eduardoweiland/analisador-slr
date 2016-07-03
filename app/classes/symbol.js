import Ember from 'ember';

const { Copyable, computed } = Ember;

/**
 * @class SymbolType
 * @module classes
 * @submodule symbol
 */
export const SymbolType = {
  /**
   * @property TERMINAL
   * @type String
   * @static
   * @final
   */
  TERMINAL: 't',

  /**
   * @property NON_TERMINAL
   * @type String
   * @static
   * @final
   */
  NON_TERMINAL: 'nt',

  /**
   * @property ITEM_MARKER
   * @type String
   * @static
   * @final
   */
  ITEM_MARKER: 'i',

  /**
   * @property SENTENCE_END
   * @type String
   * @static
   * @final
   */
  SENTENCE_END: '$'
};

/**
 * @class Symbol
 * @extends Ember.Object
 * @uses Ember.Copyable
 * @module classes
 */
const Symbol = Ember.Object.extend(Copyable, { // jshint ignore:line
  /**
   * @property name
   * @type String
   * @public
   */
  name: '',

  /**
   * @property type
   * @type SymbolType
   * @public
   */
  type: '',

  /**
   * @property isValidName
   * @type Boolean
   * @public
   */
  isValidName: computed.notEmpty('name'),

  /**
   * @property isTerminal
   * @type Boolean
   * @public
   */
  isTerminal: computed.equal('type', SymbolType.TERMINAL),

  /**
   * @property isNonTerminal
   * @type Boolean
   * @public
   */
  isNonTerminal: computed.equal('type', SymbolType.NON_TERMINAL),

  /**
   * @property isValidType
   * @type Boolean
   * @public
   */
  isValidType: computed.or('isTerminal', 'isNonTerminal'),

  /**
   * @property isValid
   * @type Boolean
   * @public
   */
  isValid: computed.and('isValidName', 'isValidType'),

  copy() {
    return Symbol.create({
      name: this.get('name'),
      type: this.get('type')
    });
  }
});

export default Symbol;
