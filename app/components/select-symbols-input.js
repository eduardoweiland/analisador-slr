import Ember from 'ember';
import OneWayInputComponent from 'ember-one-way-controls/components/one-way-input';
import SymbolInput from 'analisador-slr/mixins/symbol-input';

const { A, run } = Ember;

export default OneWayInputComponent.extend(SymbolInput, {
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

  init() {
    this._super(...arguments);
    this._availableSymbols = this.get('availableSymbols').mapBy('name');
    this._updateInputFromSymbols();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this._updateInputFromSymbols();

    if (this._availableSymbolsHasChanged()) {
      run.next(() => {
        this._updateSymbolsFromInput(this._sanitizedValue);
      });
    }
  },

  _availableSymbolsHasChanged() {
    let availableSymbols = this.get('availableSymbols').mapBy('name');
    if (availableSymbols.length !== this._availableSymbols.length) {
      this._availableSymbols = availableSymbols;
      return true;
    }
    for (let i = 0; i < availableSymbols.length; ++i) {
      if (availableSymbols[i] !== this._availableSymbols[i]) {
        this._availableSymbols = availableSymbols;
        return true;
      }
    }
    return false;
  },

  _updateInputFromSymbols() {
    if (this.get('single')) {
      this.set('symbols', [this.get('symbol')]);
    }
    this._super(...arguments);
  },

  _updateSymbolsFromInput(value) {
    let names = value.match(/([^\s]+)/g) || A();
    let symbols = A();

    names.forEach((name) => {
      let symbol = this.get('availableSymbols').findBy('name', name);

      if (symbol) {
        symbols.pushObject(symbol);
      }
      else {
        symbols.pushObject(name);
      }
    });

    if (this.get('single')) {
      this.sendAction('symbolChanged', symbols[0]);
    }
    else {
      this.sendAction('symbolsChanged', symbols);
    }
  }
});
