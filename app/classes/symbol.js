import Ember from 'ember';

const { Copyable, computed } = Ember;

export const SymbolType = {
  TERMINAL: 't',
  NON_TERMINAL: 'nt',
  ITEM: 'i'
};

const Symbol = Ember.Object.extend(Copyable, { // jshint ignore:line
  name: '',
  type: '',

  isValidName: computed.notEmpty('name'),

  isTerminal: computed.equal('type', SymbolType.TERMINAL),
  isNonTerminal: computed.equal('type', SymbolType.NON_TERMINAL),
  isValidType: computed.or('isTerminal', 'isNonTerminal'),

  isValid: computed.and('isValidName', 'isValidType'),

  copy() {
    return Symbol.create({
      name: this.get('name'),
      type: this.get('type')
    });
  }
});

export default Symbol;
