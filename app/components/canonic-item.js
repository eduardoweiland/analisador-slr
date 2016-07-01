import Ember from 'ember';
import { formatSentence } from 'analisador-slr/helpers/format-sentence';

const { Component, computed, isEmpty, typeOf } = Ember;

const CanonicItem = Component.extend({
  item: null,
  arrow: '\u2192',

  showGoto: computed('item.startState', 'item.inputSymbol', function() {
    if (typeOf(this.get('item.startState')) === 'number' && !isEmpty(this.get('item.inputSymbol'))) {
      return true;
    }
    return false;
  }),

  _productionsDisplay: computed('item.productions.[]', function() {
    return this.get('item.productions').map((production) => {
      let right = formatSentence([production.get('rightSide')]);
      return [production.get('leftSide.name'), this.get('arrow'), right].join(' ');
    }).join(', ');
  })
});

CanonicItem.reopenClass({
  positionalParams: ['item']
});

export default CanonicItem;
