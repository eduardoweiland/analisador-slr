import Ember from 'ember';
import { Symbol } from 'analisador-slr/classes';

const { A, computed, isEmpty } = Ember;

export default Ember.Object.extend({
  leftSide: null,
  rightSide: A(),

  isValidLeftSide: computed.and('leftSide.isValid', 'leftSide.isNonTerminal'),

  isValidRightSide: computed('rightSide.@each.isValid', function() {
    let rightSide = this.get('rightSide');
    let invalid = rightSide.filterBy('isValid', false);

    if (isEmpty(rightSide) || !isEmpty(invalid)) {
      return false;
    }

    return true;
  }),

  isValid: computed.and('isValidLeftSide', 'isValidRightSide'),

  errors: computed('leftSide', 'rightSide.[]', function() {
    let errors = A();
    let leftSide = this.get('leftSide');

    if (!leftSide) {
      errors.push(`Símbolo do lado esquerdo da produção não pode ficar vazio`);
    }
    else if (!(leftSide instanceof Symbol)) {
      errors.push(`Símbolo ${leftSide} não é válido`);
    }

    if (this.get('rightSide.length') === 0) {
      errors.push(`Lado direito da produção não pode ficar vazio`);
    }
    else {
      this.get('rightSide').forEach((symbol) => {
        if (!(symbol instanceof Symbol)) {
          errors.push(`Símbolo ${symbol} não é válido`);
        }
      });
    }

    return errors;
  })
});
