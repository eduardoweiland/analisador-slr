import Ember from 'ember';
import OneWayInputComponent from 'ember-one-way-controls/components/one-way-input';
import SymbolInput from 'analisador-slr/mixins/symbol-input';
import { Symbol } from 'analisador-slr/classes';

const { A } = Ember;

export default OneWayInputComponent.extend(SymbolInput, {
  classNames: ['form-control'],

  /**
   * Type of symbol to be created in this component (egg.
   * SymbolType.TERMINAL or SymbolType.NON_TERMINAL).
   *
   * @property symbolType
   * @type String
   * @public
   */
  symbolType: null,

  init() {
    this._super(...arguments);
    this._updateInputFromSymbols();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this._updateInputFromSymbols();
  },

  _updateSymbolsFromInput(value) {
    let names = value.match(/([^\s]+)/g) || A();
    let type = this.get('symbolType');
    let symbols = A();

    names.forEach((name) => {
      symbols.pushObject(Symbol.create({ name, type }));
    });

    this.sendAction('symbolsChanged', symbols);
  }
});
