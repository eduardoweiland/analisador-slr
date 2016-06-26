import Ember from 'ember';

const { computed } = Ember;

export const SymbolType = {
  TERMINAL: 't',
  NON_TERMINAL: 'nt'
};

export default Ember.Object.extend({
  name: '',
  type: '',

  isValidName: computed.notEmpty('name'),

  isTerminal: computed.equal('type', SymbolType.TERMINAL),
  isNonTerminal: computed.equal('type', SymbolType.NON_TERMINAL),
  isValidType: computed.or('isTerminal', 'isNonTerminal'),

  isValid: computed.and('isValidName', 'isValidType')
});
