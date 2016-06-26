import Ember from 'ember';

const { A, computed } = Ember;

const ProductionInput = Ember.Component.extend({
  production: null,
  classNames: ['production-input'],
  classNameBindings: ['hasError'],

  hasError: computed.notEmpty('production.errors'),

  nonTerminalSymbols: A(),
  terminalSymbols: A(),

  allSymbols: computed('nonTerminalSymbols.[]', 'terminalSymbols.[]', function() {
    return this.get('nonTerminalSymbols').concat(this.get('terminalSymbols'));
  }),

  actions: {
    remove() {
      this.sendAction('remove', this.get('production'));
    }
  }
});

ProductionInput.reopenClass({
  positionalParams: ['production']
});

export default ProductionInput;
