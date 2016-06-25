import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

const { computed } = Ember;

export const SymbolType = {
  TERMINAL: 't',
  NON_TERMINAL: 'nt'
};

export default Model.extend({
  name: attr('string'),
  type: attr(),

  isValidName: computed.notEmpty('name'),

  isTerminal: computed.equal('type', SymbolType.TERMINAL),
  isNonTerminal: computed.equal('type', SymbolType.NON_TERMINAL),
  isValidType: computed.or('isTerminal', 'isNonTerminal'),

  isValid: computed.and('isValidName', 'isValidType')
});
