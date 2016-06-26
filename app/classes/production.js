import Ember from 'ember';

const { A, computed, isEmpty } = Ember;

export default Ember.Object.extend({
  leftSide: A(),
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

  isValid: computed.and('isValidLeftSide', 'isValidRightSide')
});
