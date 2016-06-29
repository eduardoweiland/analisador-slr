import Ember from 'ember';

const { Mixin, observer } = Ember;

export default Mixin.create({
  symbol: null,
  symbols: null,

  init() {
    this._super(...arguments);
    if (this.get('symbol')) {
      this.set('value', this.get('symbol.name'));
    }
    else if (this.get('symbols')) {
      this.set('value', this.get('symbols').mapBy('name').join(' '));
    }
  },

  symbolDidChange: observer('symbol', function() {
    this.set('value', this.get('symbol.name'));
  }),

  symbolsDidChange: observer('symbols.[]', function() {
    this.set('value', this.get('symbols').mapBy('name').join(' '));
  })
});
