import Ember from 'ember';
import { Symbol } from 'analisador-slr/classes';

const { A, Copyable, copy, computed, isEmpty } = Ember;

const Production = Ember.Object.extend(Copyable, {
  /**
   * Left side of the production.
   *
   * @property leftSide
   * @type Symbol
   * @public
   */
  leftSide: null,

  /**
   * Right side of the production.
   *
   * @property rightSide
   * @type Sentence
   * @public
   */
  rightSide: null,

  isValidLeftSide: computed.and('leftSide.isValid', 'leftSide.isNonTerminal'),

  isValidRightSide: computed('rightSide.symbols.@each.isValid', function() {
    let rightSide = this.get('rightSide.symbols');
    let invalid = rightSide.filterBy('isValid', false);

    if (isEmpty(rightSide) || !isEmpty(invalid)) {
      return false;
    }

    return true;
  }),

  isValid: computed.and('isValidLeftSide', 'isValidRightSide'),

  errors: computed('leftSide', 'rightSide.symbols.[]', function() {
    let errors = A();
    let leftSide = this.get('leftSide');

    if (!leftSide) {
      errors.push(`Símbolo do lado esquerdo da produção não pode ficar vazio`);
    }
    else if (!(leftSide instanceof Symbol)) {
      errors.push(`Símbolo ${leftSide} não é válido`);
    }

    if (this.get('rightSide.symbols.length') === 0) {
      errors.push(`Lado direito da produção não pode ficar vazio`);
    }
    else {
      this.get('rightSide.symbols').forEach((symbol) => {
        if (!(symbol instanceof Symbol)) {
          errors.push(`Símbolo ${symbol} não é válido`);
        }
      });
    }

    return errors;
  }),

  copy(deep) {
    let { leftSide, rightSide } = this.getProperties(['leftSide', 'rightSide']);

    if (deep) {
      leftSide = copy(leftSide, deep);
      rightSide = copy(rightSide, deep);
    }

    return Production.create({
      leftSide,
      rightSide
    });
  }
});

export default Production;
