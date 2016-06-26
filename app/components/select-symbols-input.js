import Ember from 'ember';

const { A, TextField, observer } = Ember;

export default TextField.extend({
  classNames: ['form-control'],

  /**
   * Available symbols to be selected in this component.
   *
   * @property availableSymbols
   * @type Symbol[]
   * @public
   */
  availableSymbols: A(),

  /**
   * Configures if should be possible to select only one symbol (i.e. disable
   * selecting multiple symbols).
   *
   * @property single
   * @type Boolean
   * @public
   */
  single: false,

  keyDown(e) {
    if (e.keyCode === 32 && this.get('single')) {
      return false;
    }
  },

  valueDidChange: observer('availableSymbols.[]', 'value', function() {
    let names = this.get('value').match(/([^\s]+)/g) || A();
    let symbols = A();

    names.forEach((name) => {
      let symbol = this.get('availableSymbols').findBy('name', name);

      if (symbol) {
        symbols.pushObject(symbol);
      }
      else {
        symbols.pushObject(null);
      }
    });

    if (this.get('single')) {
      this.sendAction('symbolChanged', symbols[0]);
    }
    else {
      this.sendAction('symbolsChanged', symbols);
    }
  })
});
