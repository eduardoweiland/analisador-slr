import Ember from 'ember';
import Model from 'ember-data/model';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { computed, isEmpty } = Ember;

export default Model.extend({
  leftSide: belongsTo('symbol', { inverse: null, async: false }),
  rightSide: hasMany('symbol', { inverse: null, async: false }),

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
