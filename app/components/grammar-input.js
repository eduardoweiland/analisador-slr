import Ember from 'ember';
import { Grammar, Production } from 'analisador-slr/classes';

const { Component, assert } = Ember;

const GrammarInput = Component.extend({
  grammar: null,

  init() {
    this._super(...arguments);
    assert('You must pass a grammar object as parameter to grammar-input', this.get('grammar') instanceof Grammar);
  },

  actions: {
    addProduction() {
      let production = Production.create();
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
