import Ember from 'ember';
import { Symbol } from 'analisador-slr/classes';

const { A, Mixin, assert } = Ember;

export default Mixin.create({
  symbols: A(),
  paramValue: '',

  sanitizeInput(value) {
    return value.trim();
  },

  _updateInputFromSymbols() {
    let symbolNames = [];
    let paramSymbols = this.get('symbols');

    if (paramSymbols) {
      paramSymbols.forEach((symbol) => {
        if (symbol instanceof Symbol) {
          symbolNames.push(symbol.get('name'));
        }
        else {
          symbolNames.push(symbol);
        }
      });
    }

    this.set('paramValue', symbolNames.join(' '));
  },

  _processNewValue(method, rawValue) {
    let value = this.sanitizeInput(rawValue);
    if (value === this._sanitizedValue) {
      return;
    }

    this._sanitizedValue = value;
    this._updateSymbolsFromInput(value);
  },

  _updateSymbolsFromInput() {
    assert('Must override in component');
  }
});
