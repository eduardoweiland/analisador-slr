import Ember from 'ember';

const { Component, assert, inject } = Ember;

const GrammarInput = Component.extend({
  store: inject.service('store'),
  grammar: null,

  init() {
    this._super(...arguments);
    assert('You must pass a grammar object as parameter to grammar-input component', this.get('grammar'));
  },

  actions: {
    addProduction() {
      let production = this.get('store').createRecord('production');
      this.get('grammar.productions').pushObject(production);
    },

    removeProduction(production) {
      this.get('grammar.productions').removeObject(production);
    }
  }
});

GrammarInput.reopenClass({
  positionalParams: ['grammar']
});

export default GrammarInput;
