import Ember from 'ember';

const CanonicItemsSet = Ember.Component.extend({
  classNames: ['canonic-items-set', 'table-responsive'],
  canonicItems: null
});

CanonicItemsSet.reopenClass({
  positionalParams: ['canonicItems']
});

export default CanonicItemsSet;
