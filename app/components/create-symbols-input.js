import Ember from 'ember';
import SymbolInput from 'analisador-slr/mixins/symbol-input';
import { Symbol } from 'analisador-slr/classes';

const { A, TextField, observer } = Ember;

export default TextField.extend(SymbolInput, {
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

  valueDidChange: observer('value', function() {
    let names = this.get('value').match(/([^\s]+)/g) || A();
    let type = this.get('symbolType');
    let symbols = A();

    names.forEach((name) => {
      symbols.pushObject(Symbol.create({ name, type }));
    });

    this.sendAction('symbolsChanged', symbols);
  })
});
