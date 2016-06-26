import Ember from 'ember';

const ProductionInput = Ember.Component.extend({
  production: null,
  classNames: ['production-input'],

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
